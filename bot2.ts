import { extractMeta } from './utils/major.ts'
import { asArray } from './utils/conv.ts'
import Middleware from './utils/middleware.ts'
import Context from './context.ts'


import Core from './core.ts'
class Bot {
    telegram: Core
    offset = 0
    rules: Rule[] = []

    constructor(private token: string) {
        this.telegram = new Core(token)
    }

    private inject_rule(rule : Rule){
        this.rules.push(rule)
    }


    on(updateType : UpdateType | UpdateType[], ...callbacks : Callback[]){
        const updateTypes = asArray(updateType)
        updateTypes.forEach(updateType=>{
            this.inject_rule({
                callbacks,
                chatType : null,
                subtype : null,
                type : updateType
            })
        })
    }

    use(...callbacks : Callback[]){

        this.inject_rule({
            callbacks,
            chatType : null,
            subtype : null,
            type : null
        })
    }



    #matchedRules(metaData : MetaDataResult){
            let result = this.rules.filter(rule=>{
                return (rule.chatType == metaData.chatType || rule.chatType == null) &&
                (rule.subtype == metaData.updateSubtype || rule.subtype == null) &&
                (rule.type == metaData.updateType || rule.type == null )
            })

            return result
            
        
    }


    handle(update: Update) {
        
        const metaData = extractMeta(update)
        let rules = this.#matchedRules(metaData)       
        const callbacks = rules.map(rule=>rule.callbacks).flat()
        const MiddleInstance = new Middleware()
        callbacks.forEach(MiddleInstance.use.bind(MiddleInstance))
        const context = new Context(this.telegram, update, metaData)
        MiddleInstance.go.bind(MiddleInstance)(context, ()=>{})
        
        

    }

    async poll(config? : Omit<GetUpdates, 'offset'>) {
        await this.telegram
            .getUpdates({
                offset: this.offset,
               ...config
            })
            .then((updates) => {
                updates.forEach((update) => {
                    this.offset = update.update_id + 1;
                    this.handle(update);
                });
            })
            .finally(() => {
                this.poll(config);
            });
    }
}


export default Bot