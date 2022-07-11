const { Client, Intents, MessageActionRow, MessageButton, Collection } = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES] })
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config()
var http = require('http');
var messages = []


var server = http.createServer(function (req, res) {   //create web server
    if (req.url == '/') { //check the URL of the current request

        // set response header
        res.writeHead(200, { 'Content-Type': 'text/html' });

        // set response content    
        res.write('This is home Page.');
        res.end();

    }
    else if (req.url == "/messages") {

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(messages.join("\r\n"));
        res.end();

    }
    else if (req.url == "/admin") {

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<html><body><p>This is admin Page.</p></body></html>');
        res.end();

    }
    else
        res.end('Invalid Request!');

});

server.listen(5000, "127.0.0.1"); //6 - listen for any incoming requests
console.log('Node.js web server at port 5000 is running..')

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
    client.user.setActivity("activity", { type: "PLAYING" })


    rest.put(Routes.applicationCommands(client.user.id), { body: commands })
        .then(() => console.log('Successfully registered application commands.'))
        .catch(console.error);

    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;
        if (interaction.commandName === 'add') {
            interaction.reply("fuck you")
        }
    });

    client.on("messageCreate" , async message => {
        messages.push(message.author.username + ": " + message.content)
        console.log(messages)
    }
    )



})




const commands = [
    new SlashCommandBuilder().setName('time').setDescription('Deine verbrachte Zeit in einem Channel'),
    new SlashCommandBuilder().setName('add').setDescription('Registriert dich für die Studie'),

]
client.commands = commands


const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);



client.login(process.env.DISCORD_TOKEN)
