import { Bot } from '../mod.ts'


const bot = new Bot('YOUR_TOKEN')


bot.use((ctx, next) => {
    console.log(ctx.type);
    next()
})

bot.on("message", async (ctx, next) => {

    //echo function
    //@ts-ignore we are sure that there is a text here
    ctx.replyText(ctx.message.text)

})





//start server (i recommend to use webhook instead)
bot.poll()

