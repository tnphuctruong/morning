var express = require('express');
var router = express.Router();
// Run cmd command
const {exec} = require('child_process');
const constant = require('./constant').default;
const msg = require('./constant').msg;
// svn.match(/At revision (.*).\n/)[1]
// `svn log --limit 1 ${constant.fullpath}`
router.get('/lock', function(req, res, next) {
	var err;
	exec(`svn lock -m \"${msg.lockfile}\" ${constant.fullpath}`, (error, stdout, stderr) => {
		var result = null;
		if (error) {
				//console.log(`error: ${error.message}`);
				result = error.message;
				err = error.message;
		}
		else if (stderr) {
				//console.log(`stderr: ${stderr}`);
				result = stderr;
		} else {
			//console.log(`stdout: ${stdout}`);
			result = stdout;
		}
		console.log(`result::: ${result}`);
		res.send({error: err, result: {data: result}});
	});
});

router.get('/unlock', function(req, res, next) {
	var err;
	exec(`svn unlock ${constant.fullpath}`, (error, stdout, stderr) => {
		var result = null;
		if (error) {
				//console.log(`error: ${error.message}`);
				result = error.message;
				err = error.message;
		}
		else if (stderr) {
				//console.log(`stderr: ${stderr}`);
				result = stderr;
		} else {
			//console.log(`stdout: ${stdout}`);
			result = stdout;
		}
		console.log(`result::: ${result}`);
		res.send({error: err, result: {data: result}});
	});
});

router.get('/update', function(req, res, next) {
	var err;
	exec(`svn update ${constant.fullpath}`, {timeout: 3000},(error, stdout, stderr) => {
		if (error) {
			//console.log(`error: ${error.message}`);
			result = error.message;
			err = error.message;
		}
		else {
			result = stdout || stderr;
			console.log(`else: ${result}`);
		}
		res.send({error: err, result: {data: result}});
	});
});

router.get('/commit', function(req, res, next) {
	var err;
	exec(`svn commit ${constant.fullpath}`, {timeout: 3000},(error, stdout, stderr) => {
		if (error) {
			//console.log(`error: ${error.message}`);
			result = error.message;
			err = error.message;
		}
		else {
			result = stdout || stderr;
			console.log(`else: ${result}`);
		}
		res.send({error: err, result: {data: result}});
	});
});
module.exports = router;
