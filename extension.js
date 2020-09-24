// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const axios = require('axios').default

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */

function getQuote(context, show) {
	const url = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
	axios.get(url).then(res => {
		let date = new Date()
		let key = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
		let val = context.globalState.get(key)
		if (show || !val) {
			vscode.window.showInformationMessage(res.data.quoteText);
			context.globalState.update(key, true)
		}
	});
}

function activate(context) {
	
	let disposable = vscode.commands.registerCommand('quote-of-the-day.quote', function () {
		getQuote(context, true)
	});

	context.subscriptions.push(getQuote);
	context.subscriptions.push(disposable);

	getQuote(context, false)
}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
