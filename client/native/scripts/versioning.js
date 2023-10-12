#!/usr/bin/env node
// Adjusted from: https://gist.github.com/ohh2ahh/f35ff6e0d9f8b4268cdb

const fs = require('fs');
const xml2js = require('xml2js');

const filename = 'config.xml';
const builder = new xml2js.Builder();

const build_version = process.env.BUILD_BUILDNUMBER || '1.0';
const build_number = process.env.BUILD_BUILDID || '1';
const current_env = [ 'dev', 'tst', 'pp', 'prd' ].indexOf(process.env.npm_config_env || 'dev').toString();

const version_code = [build_number, current_env].join('');

xml2js.parseString(fs.readFileSync(filename, 'utf8'), function (err, obj) {
	if (err) {
		return console.error('Unable to parse config.xml', err);
	}

	obj[ 'widget' ][ '$' ][ 'ios-CFBundleVersion' ] = version_code;
	obj[ 'widget' ][ '$' ][ 'android-versionCode' ] = version_code;

	obj[ 'widget' ][ '$' ][ 'version' ] = [build_version, build_number].join('.');

	fs.writeFileSync(filename, builder.buildObject(obj));
});
