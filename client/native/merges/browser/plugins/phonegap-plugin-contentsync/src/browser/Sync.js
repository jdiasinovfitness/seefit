cordova.define("phonegap-plugin-contentsync.Sync", function (require, exports, module) {
	(function () {
		const archive = 'archive.zip';

		const fs = nw.require('fs');
		const Zip = nw.require('adm-zip');
		const https = nw.require('https');

		/* Allow insecure requests when in development mode */
		if (i9r.config.env === 'dev') {
			process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
		}

		function _sync (src, application) {
			return _download(src).then(file => {
				return _unzip(file, application);
			}).then(() => {
				return { localPath: cordova.file.applicationDirectory + application + '/' };
			});
		}

		function _download (url) {
			const file = fs.createWriteStream(archive);

			return new Promise((res, rej) => {
				https.get(url, function (response) {
					file.on('finish', function () {
						file.close(() => res(file.path));
					});

					response.pipe(file);
				}).on('error', function (err) {
					rej(err);
				});
			});
		}


		function _unzip (filename, target_dir) {
			try {
				const archive = new Zip(filename);
				archive.extractAllTo(target_dir, true);
				return Promise.resolve(target_dir);

			} catch (err) {
				console.error('Unable to extract archive', err);
				return Promise.reject(err);
			}
		}

		require('cordova/exec/proxy').add('Sync', {

			sync: function (onSuccess, onError, args) {
				_sync(args[0], args[1]).then(data => {
					if (onSuccess && typeof onSuccess === 'function') {
						onSuccess(data);
					}
				}).catch(err => {
					if (onError && typeof onError === 'function') {
						onError(err);
					}
				});
			},

			download: function (onSuccess, onError, args) {
				_download(args[0]).then(data => {
					if (onSuccess && typeof onSuccess === 'function') {
						onSuccess(data);
					}
				}).catch(err => {
					if (onError && typeof onError === 'function') {
						onError(err);
					}
				});
			}
		});

		require('cordova/exec/proxy').add('Zip', {

			unzip: function (onSuccess, onError, args) {
				_unzip(args[0], args[1]).then(data => {
					if (onSuccess && typeof onSuccess === 'function') {
						onSuccess(data);
					}
				}).catch(err => {
					if (onError && typeof onError === 'function') {
						onError(err);
					}
				});
			}
		});
	})();

});
