var express = require('express');
var router = express.Router();
// Read excel file
const CONST = require('./constant').default;
const Utils = require('./utils');

var Excel = require('exceljs');
var path = require('path');
const { default: constant } = require('./constant');
var filePath = path.resolve(CONST.path, CONST.excel.name);

// Default row to set data
const CELL = constant.excel.cell;
const COL = constant.excel.col;
const DEFAULT_VALUE = constant.excel.default_value;

router.post('/', async function(req, res, next) {
	var result = {
		error: null,
		data: null
	};
	// return to the request
	var excel_data = {};

	var wb = new Excel.Workbook();
	try {
		const {project, task_report} = req.body;
		if (!project) throw {msg: 'Tên project không được để trống'};
		if (!task_report) throw {msg: 'Không tìm thấy task để logtime'};

		await wb.xlsx.readFile(filePath);

		var sh = wb.getWorksheet(CONST.excel.sheet);
		// Get today's row
		// const currRowNum = Utils.getCurrentRow();
		const currRowNum = 56;
		const currRow = sh.getRow(currRowNum);
		const lastRow = sh.getRow(currRowNum - 1);
		// Set value for today's row
		currRow.getCell(COL.work_place).value = DEFAULT_VALUE.work_place;
		currRow.getCell(COL.work_time_start).value = DEFAULT_VALUE.work_time_start;
		currRow.getCell(COL.work_time_end).value = DEFAULT_VALUE.work_time_end;
		currRow.getCell(COL.work_time_off).value = DEFAULT_VALUE.work_time_off;
		currRow.getCell(COL.total_work_time).value = DEFAULT_VALUE.total_work_time;
		currRow.getCell(COL.report).value = task_report;
		currRow.getCell(COL.project).value = project;

		await wb.xlsx.writeFile(CONST.fullpath);

		// return to the request
		excel_data = {
			sheet: CONST.excel.sheeteet_name,
			position: CELL.cell,
			// data: cell.value
		}
		result.data = excel_data;
	} catch(e) {
		console.error(e);
		result.error = e;
	}
	res.send(result);
});
module.exports = router;
