function getDateTime() {
    const date = new Date();
    const today = date.toLocaleDateString();
    const time = `${date.getHours()}`.padStart(2, '0') + ":" + `${date.getMinutes()}`.padStart(2, '0') + ":" + `${date.getSeconds()}`.padStart(2, '0');
    return `${today} ${time}`;
}

module.exports = {
    name: "console",

    banner: (message) => {
        try {
            console.log(`\n${message}`);
            return;
        }
        catch (error) {
            console.log(error);
        }
    },

    // print to console only, do not write to log
    out: (client, message) => {
        try {
            const log = client.features.get('log');
            const line = (tag, d, m) => `${d.padEnd(20, " ")} ` + `[${tag}]`.padEnd(12, " ") + ` ${m}`;
            const msg = line("PRINT", getDateTime(), `${message}`.newLine());
            console.log(msg);
            log.write(msg);
            return;
        }
        catch (error) {
            console.log(error);
        }
    },

    // write anything to console and logfile.
    write: (client, message) => {
        try {
            const log = client.features.get('log');
            const line = (tag, d, m) => `${d.padEnd(20, " ")} ` + `[${tag}]`.padEnd(12, " ") + ` ${m}`;
            const msg = line("BANTER", getDateTime(), `${message}`.newLine());
            console.log(msg);
            log.write(msg);
            return;
        }
        catch (error) {
            console.log(error);
        }
    },

    // write chat message to console and log
    msg: (client, message) => {
        try {
            const log = client.features.get('log');
            const line = (tag, d, gu, ch, au, co) => `${d.padEnd(20, " ")} ` + `[${tag}]`.padEnd(12, " ") + ` ${gu.padEnd(24, " ")} #${ch.padEnd(24, " ")} ` + `${au}:`.padEnd(24, " ") + ` "${co.replaceAll("\\n", " _ ")}"`;
            const msg = line("MESSAGE", getDateTime(), message.guild.name, message.channel.name, message.author.username, `${message.content}`.newLine());
            console.log(msg);
            log.write(msg);
            return;
        }
        catch (error) {
            console.log(error);
        }
    },

    cmd: (client, message) => {
        try {
            const log = client.features.get('log');
            const line = (tag, d, gu, ch, au, co) => `${d.padEnd(20, " ")} ` + `[${tag}]`.padEnd(12, " ") + ` ${gu.padEnd(24, " ")} #${ch.padEnd(24, " ")} ` + `${au}:`.padEnd(24, " ") + ` ${co.trim()}`;
            const msg = line("COMMAND", getDateTime(), message.guild.name, message.channel.name, message.author.username, `${message.content}`.newLine());
            console.log(msg);
            log.write(msg);
            return;
        }
        catch (error) {
            console.log(error);
        }
    },


    // write any of the framework output to console and log
    // this is intended for server events like "CONNECTED TO SERVER"
    server: (client, message) => {
        try {
            const log = client.features.get('log');
            const line = (tag, d, m) => `${d.padEnd(20, " ")} ` + `[${tag}]`.padEnd(12, " ") + ` ${m}`;
            const msg = line("CONSOLE", getDateTime(), `${message}`.newLine());
            console.log(msg);
            log.write(msg);
            return;
        }
        catch (error) {
            console.log(error);
        }
    },

    // write to console, log, and message the specified logchan.
    service: (client, message) => {
        try {
            const logchan = require("../../config.json").logging.channel;
            const log = client.features.get('log');
            const chan = client.channels.cache.get(logchan);
            const line = (tag, d, co) => `${d.padEnd(20, " ")} ` + `[${tag}]`.padEnd(12, " ") + ` ${co.padStart(16, " ")}`;
            const msg = line("LOGCHAN", getDateTime(), `${message}`.newLine());
            console.log(msg);
            log.write(msg);
            chan.send(`${message}`.newLine());
            return;
        }
        catch (error) {
            console.log(error);
        }
    }
};
