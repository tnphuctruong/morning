// config
const constant = {
	path: "C:\\Users\\ASUS\\Desktop",
	excel: {
		name: "tigerbeer.xlsx",
		sheet: "ALIBA"
	},
	get fullpath() {
		return [constant.path, constant.excel.name].join('\\');
	},
}
module.exports.default = constant