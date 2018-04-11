module.exports =  {

	id: 'about',
	defaultConfig: {
		messageTypes: ['text'],
		message: 'This bot was developed as part of the Software Engineering project. It has the purpose of providing students with information from Student Portal.'
	},

	plugin(bot, pluginConfig) {

		bot.on('text', (msg) => {

			if (msg.text == 'about' || msg.text == 'About'){
				return bot.sendMessage(
					msg.from.id, pluginConfig.message
				);
			}

		});
	}
};



