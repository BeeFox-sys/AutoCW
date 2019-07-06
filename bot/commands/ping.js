const Discord = require("discord.js")


module.exports = {
    name:"ping",
    alias:[],
    help:`Responds to the command`,
    main: async (client, guild, channel, args, message)=>{
        return message.channel.send("Pong!")
    }
}