const config = require('config');

const TeleBot = require('telebot');

const bot = new TeleBot({
	token: config.get('access_token'),
	usePlugins: ['about'],
	pluginFolder: '../../../plugins/'
});

bot.on(['/start'], (msg) => {
	return bot.sendMessage(
		msg.from.id, `Hello, ${ msg.from.first_name }!` 
	).then(re => {
		bot.sendMessage(msg.from.id, 'Welcome to the NYUAD Spammer Bot');
	});
});

bot.start();