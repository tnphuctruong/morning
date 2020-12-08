// config
const constant = {
	path: "C:\\KZ-task\\97.Zurich\\source\\dev59(1)",
	excel: {
		name: "pt3在宅勤務期間作業報告_Kz.xlsx",
		sheet: "チュオン",
		cell: {
			col: 'A',
			row: 255,
			get name() {return this.col + this.row},
			value: new Date('2020-12-02')
		},
		col: {
			get date() { return 'A' },
			get work_place() { return 'B' },
			get work_time_start() { return 'C' },
			get work_time_end() { return 'D' },
			get work_time_off() { return 'E' },
			get total_work_time() { return 'F' },
			get report() { return 'G' },
			get comment() { return 'H' },
			get project() { return 'I' },
		},
		default_value: {
			get work_place() { return '社内'; },
			get work_time_start() {
				var today = new Date();
				today.setHours(15, 0, 0, 0);
				return today;
			},
			get work_time_end() {
				var today = new Date();
				today.setHours(0, 0, 0, 0);
				return today;
			},
			get work_time_off() {
				var today = new Date();
				today.setHours(8, 0, 0, 0);
				return today;
			},
			get total_work_time() { return 8 },
		}
	},
	get fullpath() {
		return [constant.path, constant.excel.name].join('\\');
	},
}
module.exports.default = constant
const message = {
	get lockfile() {
		return `Xin lỗi tôi lock xíu`;
	},
}

module.exports.msg = message;