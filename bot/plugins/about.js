module.exports =  {

	id: 'about',
	defaultConfig: {
		messageTypes: ['text'],
	},

	plugin(bot, pluginConfig) {

		bot.on('text', (msg) => {

		let message = 'This bot was developed as part of the Software Engineering class.'
		let message_1 = 'It has the purpose of helping students access Student Portal faster and more efficiently.'
		let message_2 = 'Please type "/commands" or "commands" to see what type of information is available.';

			if (msg.text == 'about' || msg.text == 'About' || msg.text == '/about'){

				return bot.sendMessage(msg.chat.id, message).then(() => {
					bot.sendMessage(msg.chat.id, message_1).then(() => {
						bot.sendMessage(msg.chat.id, message_2);
					});
				});

			};

		});

	}

};



