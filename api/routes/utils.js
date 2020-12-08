const constant = require('./constant').default;

/**
 * Calculate days between 2 Date objects
 * @author Turong
 * @param {dayfrom} firstDate
 * @param {dayto} secondDate
 * @return {diffDays} diffDays
 */
const getDaysBetween = (firstDate, secondDate) => {
	const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
	var Difference_In_Time = secondDate.getTime() - firstDate.getTime(); 
	// To calculate the no. of days between two dates 
	var diffDays = Difference_In_Time / (1000 * 3600 * 24); 
	console.log(diffDays);
	console.log(parseInt(diffDays));

	return parseInt(diffDays);
}

/**
 * Format date to YYYY-MM-DD
 * 1899-12-30T09:00:00.000Z
 * @param {*} date 
 */
const formatDate = (date) => {

}

/**
 * Get today's row in excel
 */
const getCurrentRow = () => constant.excel.cell.row + getDaysBetween(constant.excel.cell.value, new Date());

const utils = {
	getCurrentRow: getCurrentRow
}
module.exports = utils;