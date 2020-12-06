var express = require('express');
var router = express.Router();
const {exec} = require('child_process');

/* GET users listing. */
router.get('/', function(req, res, next) {
	exec("dir", (error, stdout, stderr) => {
		var result = null;
		if (error) {
				console.log(`error: ${error.message}`);
				result = error.message;
		}
		else if (stderr) {
				console.log(`stderr: ${stderr}`);
				result = stderr;
		} else {
			console.log(`stdout: ${stdout}`);
			result = stdout;
		}
		res.send(result);
	});
	//res.send('respond with a resource');
});

module.exports = router;
