const fs = require('fs');
const markov = require('../markov.js');
const prototypes = require("../prototypes.js");
const codeBlockRegex = /(```)(.*?)(```)/gims;
const newLineRegex = /(\n)/g;
const whitespaceRegex = /\s\s+/g;
const corpusIdRegex = /(\\n|([\d]+,)+)/g;


let bot, MarkovGeneratorWord;
let corpus;
let randomResponseChance, randomResponseCooldown;
let ignoreBots, learnFromBots;
let ignoreDirectMessages, learnFromDirectMessages;
let timeCheck = new Date().getTime();
let lastAuthorId;
let c;

module.exports = {
    name: "ai",

    init: (client, corpusFile) => {
        corpus = corpusFile;
        MarkovGeneratorWord = markov.MarkovGeneratorWord;
        bot = new MarkovGeneratorWord(2, 60);

        randomResponseChance = require("../../config.json").randomResponseChance / 100 || 0.015;
        randomResponseCooldown = require("../../config.json").randomResponseCooldown * 1000 || 360;

        ignoreBots = require("../../config.json").ignoreBots;
        learnFromBots = require("../../config.json").learnFromBots;

        ignoreDirectMessages = require("../../config.json").ignoreDirectMessages;
        learnFromDirectMessages = require("../../config.json").learnFromDirectMessages;

        let lines = fs.readFileSync(corpus).toString().split('\n');
        if (!lines.length) return;
        lines.forEach((line) => {
            line = line.split(',');
            line.splice(0, 3);
            line = line.join(' ');
            if (!line == "") {
                bot.feed(line.trim());
            }
        });
        c = client.features.get('console');
        c.server(client, `AI`.padEnd(24, " ") + ` load corpus`.padEnd(26, " ") + ` lines: ${lines.length - 1}`);
    },

    // data [message.guild.id, message.channel.id, message.author.id, message.content]);
    learn: (data) => {
        try {
            let guild, channel, author, message, lines, text;
            guild = data[0];
            channel = data[1];
            author = data[2];
            message = data[3];

            // the following is to split each line of user message into
            // very own corpus entry. will this work better? dont know
            text = "";
            lines = message.split("\n");
            lines.forEach((line) => {
                if (!line == "") {
                    let words = line.split(" ");
                    if (words.length >= 2) {
                        let tokens = line.tokenize();
                        text += `${guild},${channel},${author},${tokens.join(" ")}\n`;
                    }
                }
            });
            fs.appendFile(corpus, `${text}`, (err) => {
                if (err) console.log(err);
            });
        }
        catch (error) {
            console.log(error);
        }
    },


    feed(message) {
        if (message.author.bot && !learnFromBots) return c.out(message.client, `*learning from bots is disabled, and ${message.author.username} is a bot..`);
        if (message.guild === null && !learnFromDirectMessages) return c.out(message.client, `*learning from direct messages is disabled, and ${message.author.username} sent a direct message.. "${message.content}"`);

        let line = message.content
            .replace(codeBlockRegex, '')
            .replace(newLineRegex, ' ')
            .replace(whitespaceRegex, '')
            .replace(`<@${message.client.user.id}>`, '')
            .newLine();

        if (!line.trim() == "") {
            this.learn([message.guild.id, message.channel.id, message.author.id, line.trim()]);
            bot.feed(line.trim());
        }
    },

    forceFeed(message, count) {
        let line = message.trim()
            .replace(codeBlockRegex, '')
            .replace(newLineRegex, ' ')
            .replace(whitespaceRegex, '')
            .newLine();
        if (!line.trim() == "") {
            console.log(`forceFeeding line #${count}: ${line.trim()}`);
            bot.feed(line.trim());
        }
    },

    async run(client, message) {
        try {
            let banter;
            this.feed(message);

            if (message.author.bot && ignoreBots) return c.out(client, `*ignoring bot ${message.author.username}`);
            if (message.guild === null && ignoreDirectMessages) return c.out(client, `*ignoring direct messages. ${message.author.username}: "${message.content}"`);

            if (message.mentions.has(client.user)) {
                if (timeCheck < new Date().getTime() - randomResponseCooldown) {
                    banter = await this.generate(client, message);
                    if (!banter.trim() == "") {
                        message.reply(banter);
                    }
                    timeCheck = new Date().getTime();
                }
            }

            const chance = message.author.id === lastAuthorId ? randomResponseChance * 0.75 : randomResponseChance;

            if (Math.random() < chance) {
                if (timeCheck < new Date().getTime() - randomResponseCooldown) {
                    banter = await this.generate(client, message);
                    if (!banter.trim() == "") {
                        message.reply(banter);
                    }
                    timeCheck = new Date().getTime();
                }
            }

            lastAuthorId = message.author.id;
        }
        catch (error) {
            console.log(error);
        }
    },

    async generate(client, message) {
        try {
            let input = message.content.trim();
            const banter = await bot.generate(input.tokenize().choice());
            c.write(client, `> ${banter}`);
            return banter;
        }
        catch (error) {
            console.log(error);
        }
    },

    getWords() {
        try {
            const corpusText = fs.readFileSync(corpus).toString();
            return corpusText.replace(corpusIdRegex, ' ').replace(newLineRegex, ' ').split(' ');
        }
        catch (error) {
            console.log(error);
        }
    },

    getStats() {
        try {
            const corpusText = fs.readFileSync(corpus).toString();
            const lines = corpusText.split('\n');
            const words = corpusText.replace(corpusIdRegex, ' ').replace(newLineRegex, ' ').split(' ');

            return {
                lines: lines.prettyCount(),
                words: words.prettyCount(),
                unique: bot.getUniqueWords().prettyCount(),
                nGrams: bot.getNGrams().toString().prettyCount()
            }
        }
        catch (error) {
            console.log(error);
        }


    }
};
