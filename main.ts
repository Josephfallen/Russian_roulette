const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '!'; // You can change this to your preferred bot prefix

let isLoaded = false;
let bulletPosition = -1;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity('!help for commands');
});

client.on('message', (message) => {
    if (message.author.bot) return; // Ignore messages from other bots
    if (!message.content.startsWith(prefix)) return; // Ignore messages that don't start with the prefix

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'loadroulette') {
        if (isLoaded) {
            message.channel.send('Roulette is already loaded.');
        } else {
            bulletPosition = Math.floor(Math.random() * 6);
            isLoaded = true;
            message.channel.send('Russian Roulette has been loaded. Use `!fire` to pull the trigger.');
        }
    }

    if (command === 'fire') {
        if (!isLoaded) {
            message.channel.send('You need to load the gun first with `!loadroulette`.');
        } else {
            const user = message.author;
            if (Math.floor(Math.random() * 6) === bulletPosition) {
                // Bullet fired - user loses
                message.channel.send(`${user} pulled the trigger and got shot! 💥🔫`);
            } else {
                // Bullet not fired - user survives
                message.channel.send(`${user} pulled the trigger and survived! 🍀`);
            }
            isLoaded = false;
        }
    }
});

const TOKEN = 'YOUR_BOT_TOKEN'; // Replace with your bot token
client.login(TOKEN);
