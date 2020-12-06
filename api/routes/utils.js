/*
 * Calculate the height of cell to autofit text
 * author: Turong
 * @param: cell: Excel Cell
 * @return: the height (as pixel)
 */
const heightCal = (cell) => {
	console.log(cell);
	//var lineNum = cell.value.split('\n').length + 1;
	//var fontSize = cell.font.size;
	//var cellWidth = cell.width;
	return 50;
}
const utils = {
	heightCal: heightCal
}
module.exports = utils;