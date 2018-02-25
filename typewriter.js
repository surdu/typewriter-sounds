const path = require("path");
const pressed = {};

const returnKeyDownSound = new Audio(path.join(__dirname, "audio/return.mp3"));

function handleKeyDown(event) {
	if (!pressed[event.keyCode]) {
		pressed[event.keyCode] = true;

		var key_down = new Audio(path.join(__dirname, "audio/key_down.mp3"));
		key_down.play();

		if (event.keyCode === 13) {
			returnKeyDownSound.pause();
			returnKeyDownSound.currentTime = 0.
			returnKeyDownSound.play();
		}
	}
}

function handleKeyUp(event) {
	pressed[event.keyCode] = false;

	const key_up = new Audio(path.join(__dirname, "audio/key_up.mp3"));
	key_up.play();
}

module.exports = {
	activate: function(state) {
		atom.workspace.observeTextEditors(function(editor) {
			const editorView = atom.views.getView(editor);

			editorView.addEventListener('keydown', handleKeyDown);
			editorView.addEventListener('keyup', handleKeyUp);
		});
	},

	deactivate: function () {
		atom.workspace.observeTextEditors(function(editor) {
			const editorView = atom.views.getView(editor);

			editorView.removeEventListener('keydown', handleKeyDown);
			editorView.removeEventListener('keyup', handleKeyUp);
		});
	}
};
