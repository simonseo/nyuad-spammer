const config = require('config');

const TeleBot = require('telebot');
const bot = new TeleBot(config.get('access_token'));


bot.on(['/start'], (msg) => {
	return bot.sendMessage(
		msg.from.id, `Hello, ${ msg.from.first_name }! Welcome to the NYUAD Spammer Chatbot`
	);
});

bot.start();