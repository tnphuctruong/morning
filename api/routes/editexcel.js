var express = require('express');
var router = express.Router();
// Read excel file
const CONST = require('./constant').default;
const Utils = require('./utils');

var Excel = require('exceljs');
var path = require('path');
var filePath = path.resolve(CONST.path, CONST.excel.name);

const CELL = 'E5';

router.post('/', async function(req, res, next) {
	var result = {
		error: null,
		data: null
	};
	// return to the request
	var excel_data = {};

	var wb = new Excel.Workbook();
	try {
		const cellValue = req.body.cellValue;
		if (!cellValue) throw 'Cell value must not be empty';
	
		await wb.xlsx.readFile(filePath);

		var sh = wb.getWorksheet(CONST.excel.sheet);
		var cell = sh.getCell(CELL);
		cell.value = cellValue + '\n' + cellValue + '\n' + cellValue;
		cell.alignment = { wrapText: true };
		const row = sh.getRow(12)
		//row.height = Utils.heightCal(cell);

		await wb.xlsx.writeFile(CONST.fullpath);
		// return to the request
		excel_data = {
			sheet: CONST.excel.sheeteet_name,
			position: CELL,
			data: cell.value
		}
		result.data = excel_data;
	} catch(e) {
		console.error(e);
		result.error = e;
	}
	res.send(result);
});
module.exports = router;
