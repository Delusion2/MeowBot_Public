const fs = require('fs');
const logging = require("../../config.json").logging;

module.exports = {
    name: "log",
    write: (message) => {
        try {
            const level = 0;
            if (logging.enabled) {
                fs.appendFile(`${logging.dir}/${logging.levels[level]}.log`, message.oneLine(), (err) => {
                    if (err) console.log(err);
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    },
};