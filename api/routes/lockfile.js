var express = require('express');
var router = express.Router();
// Run cmd command
const {exec} = require('child_process');

router.get('/', function(req, res, next) {
	exec("dir", (error, stdout, stderr) => {
		var result = null;
		if (error) {
				//console.log(`error: ${error.message}`);
				result = error.message;
		}
		else if (stderr) {
				//console.log(`stderr: ${stderr}`);
				result = stderr;
		} else {
			//console.log(`stdout: ${stdout}`);
			result = stdout;
		}
		res.send({error: false, result: {name: "TURONG", age: 22}});
	});
});
module.exports = router;
