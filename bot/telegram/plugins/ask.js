'use strict';

const userList = {};

module.exports = {

    id: 'ask',
    defaultConfig: {
        messageTypes: ['text']
    },

    plugin(bot, pluginConfig) {

        const indx = pluginConfig.messageTypes.indexOf('*');
        if (indx > -1) {
            console.error('ERROR using askUser plugin: type \'*\' is not allowed, it cause a bug. removing');
            pluginConfig.messageTypes.splice(indx, 1);
        }
        if (pluginConfig.messageTypes.length===0) {
            console.error('ERROR using askUser plugin: you must specify at least one valid type. adding type \'text\'');
            pluginConfig.messageTypes.push('text');
        }

        bot.on(pluginConfig.messageTypes, (msg, props) => {
            const id = msg.chat.id;
            const ask = userList[id];
            if (!ask) return;
            delete userList[id];
            bot.event('ask.' + ask, msg, props);
        });

        bot.on('sendMessage', (args) => {
            const id = args[0];
            const opt = args[2] || {};
            const ask = opt.ask;
            if (ask) userList[id] = ask;
        });
    }
};
