const Discord = require("discord.js")


module.exports = {
    name:"global",
    alias:[],
    help:`Responds to the command`,
    main: async (Client, guild, channel, args, message)=>{
        switch(args.shift()){

            default:
                listGlobalContentWarnings(guild,message)
        }
    }
}

async function listGlobalContentWarnings(guild,message){
    if(guild.disallowed.length == 0) return message.channel.send(`There are no global disallowed words or phrases, add one with \`${guild.prefix}global add [Phrase]\``)
    var GlobalList = "**Global Dissalowed Phrases:**"
    guild.disallowed.forEach((phrase) => {
        GlobalList += `\n||${phrase[0]}||(${phrase[1]})`
    })
    message.channel.send(GlobalList)
}