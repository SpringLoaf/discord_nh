process.stdout.write('\u001B[2J\u001B[0;0f');

const { TOKEN, CALL } = require("./config.json");
const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require("axios");
const { channel } = require("diagnostics_channel");

const nURL = 'https://nhentai.net/g/';
const nAPI = 'https://nhentai.net/api/gallery/'; 

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

client.on("ready", () => 
{
    client.user.setActivity('pota malapit na yung exam', {type: 5});
    console.log('INIT');
});

client.on('message', (message) => 
{
    if (!message.content.startsWith(CALL) || message.author.bot) return;

    const args = message.content.slice(CALL.length).trim().split(' ');
	const command = args.shift().toLowerCase();
    console.log(`Checking ${args[0]}...`)    

    if (command === 'n') 
    {
        var codes = parseInt(args[0]);
        if (!args.length || args.length >= 2) 
        {
            message.channel.send('Please enter a valid code')
		}
        else if (!isNaN(codes) && args[0].length <= 6) 
        {
            var rawUrl = nAPI + args[0];
            console.log(rawUrl);
            axios.get(rawUrl).then(data => 
                {
                    const cont = data.data;
                    client.user.setActivity(`Reading ${args[0]}...`, {type: 5});
                    console.log(data.status);
                    console.log(cont.title.english);
                    console.log(cont.title.pretty);
                    var nhembed = new Discord.MessageEmbed()
                        .setColor(`${getRandomColor()}`)
                        .setTitle(`${cont.title.english}`)
                        .setDescription(`${cont.title.pretty + '\n' + cont.title.japanese}`)
                        .setURL(`${nURL + args[0]}`)
                        .setThumbnail('https://static.nhentai.net/img/logo.090da3be7b51.svg')
                        .setImage(`https://t.nhentai.net/galleries/${cont.media_id}/cover.jpg`)
                        .setTimestamp(`${+ new Date()}`);
                    message.channel.send(nhembed);
                }).catch(err => 
                    {
                        console.debug(`Error Caught\t${args[0] + '\nSTATUS:\t' + err.status}`);
                        message.channel.send('404. Perhaps an incorrect code?');
                    });
        }
        else 
        {
            console.error('error in parsing command and argument');
            message.channel.send('Improper usage.\nPlease use this format: ``' + CALL + 'n [nHentai Code]``.');
        }
    }
    else if (command === 'h') 
    {
        var help = new Discord.MessageEmbed()
            .setColor(`${getRandomColor()}`)
            .setTitle(`"Help me step-user, I'm stuck!"`)
            .setDescription(`Simple Help Guide`)
            .addFields(
                {name: '!h', value: 'call this command'},
                {name: '!n', value: 'embed sauce'},
                {name: '!r', value: 'reset history (activity)'}            )
            .setTimestamp(`${new Date()}`);
        message.channel.send(help);
    }
    else if (command === 'r') 
    {
        client.user.setActivity('Check out our new coffee shop! https://eja.chule-latte.com', {type: 3});
        message.channel.send('https://tenor.com/view/dance-moves-dancing-singer-groovy-gif-17029825');
    }
    else
    {
        message.channel.send(`Use ${CALL}h for information on how to use the bot.\nAlternatively, send a message to <@&887179555977171014>`)
    }

});

client.login(TOKEN);
