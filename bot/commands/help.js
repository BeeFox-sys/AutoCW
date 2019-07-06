const Discord = require("discord.js")


module.exports = {
    name:"help",
    alias:[],
    help:`Lists all commands or provides a help page for a specified command`,
    main: async (Client, guild, channel, args, message)=>{
        if(args.length > 0){
            var command = Client.commands.get(args.shift())
            if(command){
                return message.channel.send(command.help)
            }
        }
        var helpMessage = "List of commands:"
        Client.commands.tap(command => helpMessage += `\n${guild.prefix}${command.name}`)
        message.channel.send(helpMessage)
    }
}