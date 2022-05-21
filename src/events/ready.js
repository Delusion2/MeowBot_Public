const prefix = require("../../config.json").prefix;
const corpusPath = require("../../config.json").corpusPath;

const text_logo = `,--.   ,--.                         ,-----.           ,--.  \r\n|   \`.\'   | ,---.  ,---. ,--.   ,--.|  |) \/_  ,---. ,-\'  \'-.\r\n|  |\'.\'|  || .-. :| .-. ||  |.\'.|  ||  .-.  \\| .-. |\'-.  .-\'\r\n|  |   |  |\\   --.\' \'-\' \'|   .\'.   ||  \'--\' \/\' \'-\' \'  |  |  \r\n\`--\'   \`--\' \`----\' \`---\' \'--\'   \'--\'\`------\'  \`---\'   \`--\'  \r\n                                                            `;
const banners = [`                               |        |\r\n                               |\\      \/|\r\n                               | \\____\/ |\r\n                               |  \/\\\/\\  |\r\n                              .\'___  ___\`.\r\n                             \/  \\|\/  \\|\/  \\\r\n            _.--------------( ____ __ _____)\r\n         .-\' \\  -. | | | | | \\ ----\\\/---- \/\r\n       .\'\\  | | \/ \\\` | | | |  \`.  -\'\`-  .\'\r\n      \/\`  \` \` \'\/ \/ \\ | | | | \\  \`------\'\\\r\n     \/-  \`-------.\' \`-----.       -----. \`---.\r\n    (  \/ | | | |  )\/ | | | )\/ | | | | | ) | | )\r\n     \`._________.\'_____,,,\/\\_______,,,,\/_,,,,\/  MWBot`,
`                                     ,\r\n              ,-.       _,---._ __  \/ \\\r\n             \/  )    .-\'       \`.\/ \/   \\\r\n            (  (   ,\'            \`\/    \/|\r\n             \\  \`-\"             \\\'\\   \/ |\r\n              \`.              ,  \\ \\ \/  |\r\n               \/\`.          ,\'-\`----Y   |\r\n              (            ;        |   \'\r\n              |  ,-.    ,-\'         |  \/\r\n              |  | (   |         mw | \/\r\n              )  |  \\  \`.___________|\/\r\n              \`--\'   \`--\'`,
`         ,_         _,\r\n         |\\\\.-\"\"\"-.\/\/|\r\n         \\\`         \`\/\r\n        \/    _   _    \\\r\n        |    a _ a    |\r\n        \'.=    Y    =.\'\r\n          >._  ^  _.<\r\n         \/   \`\`\`\`\`   \\\r\n         )           (\r\n        ,(           ),\r\n       \/ )   \/   \\   ( \\\r\n       ) (   )   (   ) (\r\n       ( )   (   )   ( )\r\n       )_(   )   (   )_(-.._\r\n      (  )_  (._.)  _(  )_, \`\\\r\n       \`\`(   )   (   )\`\` .\' .\'\r\n       mw  \`\`\`     \`\`\`   ( (\`\r\n                         \'-\'`,
`            _             _\r\n           | \'-.       .-\' |\r\n            \\\'-.\'-\"\"\"-\'.-\'\/    _\r\n             |= _:\'.\':_ =|    \/:\`)\r\n             \\ <6>   <6> \/   \/  \/\r\n             |=   |_|   =|   |:\'\\\r\n             >\\:.  \"  .:\/<    ) .|\r\n              \/\'-._^_.-\'\\    \/.:\/\r\n             \/::.     .::\\  \/\' \/\r\n           .| \'::.  .::\'  |;.:\/\r\n          \/\`\\:.         .:\/\`\\(\r\n         |:. | \':.   .:\' | .:|\r\n         | \` |:.;     ;.:| \` |\r\n          \\:.|  |:. .:|  |.:\/\r\n           \\ |:.|     |.:| \/\r\n      mwb  \/\'|  |\\   \/|  |\`\\\r\n          (,,\/:.|.-\'-.|.:\\,,)\r\n            (,,,\/     \\,,,)`,
`             *     ,MMM8&&&.            *\r\n                  MMMM88&&&&&    .\r\n                 MMMM88&&&&&&&\r\n     *           MMM88&&&&&&&&\r\n                 MMM88&&&&&&&&\r\n                 \'MMM88&&&&&&\'\r\n                   \'MMM8&&&\'      *\r\n          |\\___\/|\r\n          )     (             .              \'\r\n         =\\     \/=\r\n           )===(       *\r\n          \/     \\\r\n          |     |\r\n         \/       \\\r\n         \\       \/\r\n  _\/\\_\/\\_\/\\__  _\/_\/\\_\/\\_\/\\_\/\\_\/\\_\/\\_\/\\_\/\\_\/\\_\r\n  |  |  |  |( (  |  |  |  |  |  |  |  |  |  |\r\n  |  |  |  | ) ) |  |  |  |  |  |  |  |  |  |\r\n  |  |  |  |(_(  |  |  |  |  |  |  |  |  |  |\r\n  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |\r\n  mwb|  |  |  |  |  |  |  |  |  |  |  |  |  |`,
`                                                _\r\n                   |\\___\/|                      \\\\\r\n                   )     (    |\\_\/|              ||\r\n                  =\\     \/=   )a a \`,_.-\"\"\"\"-.  \/\/\r\n                    )===(    =\\Y_= \/          \\\/\/\r\n                   \/     \\     \`\"\`\\       \/    \/\r\n                   |     |         |    \\ |   \/\r\n                  \/       \\         \\   \/- \\  \\\r\n                  \\       \/         || |  \/\/ \/\`\r\n        mwb_\/\\_\/\\_\/\\_   _\/_\/\\_\/\\_\/\\_((_|\\((_\/\/\\_\/\\_\/\\_\/\\_`
];

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        const c = client.features.get('console');
        let random_banner = banners[Math.floor(Math.random() * banners.length)];
        c.banner(random_banner);
        c.banner(text_logo);

        // display all banners
        // for (let b = 0; b <= banners.length-1; b++) {
        //     c.banner(banners[b]);
        // }

        const Guilds = client.guilds.cache.map(guild => [guild.id, guild.name, guild.memberCount, guild.presences, guild.joinedAt, guild.systemChannel]);
        let totalUsers = 0;
        let totalServers = Guilds.length;
        for (let g of Guilds) {
            c.server(client, `Connected`.padEnd(24, " ") + ` ${g[1]}`.padEnd(26) + ` users: ${g[2]}`);
            totalUsers += g[2];
        }
        c.server(client, `Ready`.padEnd(24, " ") + ` servers: ${totalServers}`.padEnd(26, " ") + ` users: ${totalUsers}`);

        const ai = client.features.get('ai');
        ai.init(client, corpusPath);

        client.user.setActivity(`${prefix}help`);
    },
};