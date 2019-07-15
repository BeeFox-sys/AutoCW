const Discord = require("discord.js")
const mongoose = require("mongoose")
const fs = require("fs")

const Client = new Discord.Client()
Client.config = require("../config.json")
Client.utils = require("./utils.js")


mongoose.connect(Client.config.db, {
    useNewUrlParser: true,
    // retry to connect for 60 times
    reconnectTries: 60,
    // wait 1 second before retrying
    reconnectInterval: 1000
});
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.warn("Connected to database")
});

const schemas = require("./schemas.js")
const ChannelModel = mongoose.model('channels', schemas.channel)
const GuildModel = mongoose.model('guilds', schemas.guild)


//Get commands from bot/commands
Client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./bot/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    Client.commands.set(command.name, command);
}


Client.on("ready", () => {
    console.log(`Connected as ${Client.user.tag}`)
})



Client.on("message", async(message) => {
    var channel = await Client.utils.getById(message.channel.id, ChannelModel) //Channel DB entry
    var guild = await Client.utils.getById(message.guild.id, GuildModel) //Guild DB entry

    //get command
    if (!message.content.startsWith(guild.prefix)) return
    var commandArguments = message.content.substr(Client.config.prefix.length).trim().split(" ")
    var commandName = commandArguments.shift()
    var command = Client.commands.get(commandName)
        //find alias
    if (!command) {
        command = Client.commands.find(command => command.alias.indexOf(commandName) != -1)
    }
    if (!command) return

    //run command
    try {
        command.main(Client, guild, channel, commandArguments, message)
    } catch (err) {
        message.channel.send(err)
    }
})

Client.login(Client.config.token)

// Graceful exit
process.on('SIGINT', function() {
    gracefulExit()
})
process.on('SIGTERM', function() {
    gracefulExit()
})


// Close client & db connections and exit gracefully
function gracefulExit() {
    console.warn("\nGracefully shutting down...");
    Client.destroy(function() {
        console.warn("\nLogged out of Discord")
    });
    db.close(function() {
        console.warn("\nClosed database connection")
    });
    console.warn("Goodbye");
    process.exit();
}