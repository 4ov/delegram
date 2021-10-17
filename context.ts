import Core from './core.ts'

export default class Context{
    type : UpdateType;
    subtype : UpdateSubtype;
    chat_id : number;
    message : Message
    // result : null | RegExpExecArray
    constructor(public telegram : Core, public update : Update, metaData : MetaDataResult){
        this.type = metaData.updateType
        this.subtype = metaData.updateSubtype
        this.chat_id = (update[this.type] as Message)?.chat?.id ?? null
        this.message = this.update[this.type] as Message
        // this.result = extra.regResult
    }


    async sendMessage(text : string, extra? : Omit<SendMessage, 'text' | 'chat_id'>){
        return await this.telegram.sendMessage({
            chat_id : this.chat_id,
            text,
            ...extra
        })
    }

    async replyText(text : string, extra? : Omit<SendMessage, 'text' | 'chat_id' | 'reply_to_message_id'>){
        return await this.telegram.sendMessage({
            chat_id : this.chat_id,
            reply_to_message_id : this.message.message_id,
            text,
            ...extra
        })
    }

    async deleteMessage(){
        return await this.telegram.deleteMessage({
            chat_id : this.chat_id,
            message_id : this.message.message_id
        })
    }
}