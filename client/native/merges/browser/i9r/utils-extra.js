try {
	if (i9r.config.env === 'dev') {
		nw.Window.get().showDevTools();
	}
} catch (e) {}


nw.App.registerGlobalHotKey(new nw.Shortcut({
	key: "F11",
	active: function () {
		nw.Window.get().toggleFullscreen();
	}
}));


/**
 * OVerride filesystem API
 */
const fs = nw.require('fs');
i9r.util.getFile = function (file_path) {
	return new Promise(function (res, rej) {
		try {
			fs.exists(
				file_path.replace(window.location.origin + '/', ''),
				(result) => result ? res(file_path) : rej('NOT_FOUND')
			);
		} catch (err) {
			rej(err);
		}
	});
};


i9r.util.readFile = function (file_path) {
	return new Promise(function (res, rej) {
		try {
			fs.readFile(
				file_path.replace(window.location.origin + '/', ''),
				'utf-8',
				(error, content) => error ? rej(error) : res(content)
			);
		} catch (err) {
			rej(err);
		}
	});
};


i9r.util.writeFile = function (file_path, content) {
	return new Promise(function (res, rej) {
		try {
			fs.writeFile(
				file_path.replace(window.location.origin + '/', ''),
				content,
				(error) => error ? rej(error) : res(file_path)
			);
		} catch (err) {
			rej(err);
		}
	});
};
