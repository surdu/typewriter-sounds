var path = require("path");
var pressed = {};

function handleKeyDown(event) {
	if (!pressed[event.keyCode]) {
		pressed[event.keyCode] = true;

		var key_down = new Audio(path.join(__dirname, "audio/key_down.mp3"));
		key_down.play();

		if (event.keyCode === 13) {
			var key_down = new Audio(path.join(__dirname, "audio/return.mp3"));
			key_down.play();
		}
	}
}

function handleKeyUp(event) {
		pressed[event.keyCode] = false;

		var key_up = new Audio(path.join(__dirname, "audio/key_up.mp3"));
		key_up.play();
}

module.exports = {
	activate: function(state) {
		atom.workspace.observeTextEditors(function(editor) {
			var editorView = atom.views.getView(editor);

			editorView.addEventListener('keydown', handleKeyDown);
			editorView.addEventListener('keyup', handleKeyUp);
		});
	},

	deactivate: function () {
		atom.workspace.observeTextEditors(function(editor) {
			var editorView = atom.views.getView(editor);

			editorView.removeEventListener('keydown', handleKeyDown);
			editorView.removeEventListener('keyup', handleKeyUp);
		});
	}
};
