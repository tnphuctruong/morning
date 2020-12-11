import ICON_SUCCESS from '../assets/check.svg';
import ICON_ERROR from '../assets/error.svg';
import ICON_WARNING from '../assets/warning.svg';
import ICON_INFO from '../assets/info.svg';

const CONSTANT = {
	project_options: [
		null,
		'LegacyReplacePh1対応',
		'LegacyReplacePh3対応',
		'NGP／SMT対応',
		'非対面PPL',
		'SFA改修+ｴﾝﾊﾝｽﾒﾝﾄ対応(SMT)'
	],
	msg: {
		executing: 'Đang thực hiện',
	},
	variant: {
		SUCCESS: 'success',
		ERROR: 'danger',
		INFO: 'info',
		WARNING: 'warning',
	},
	icon: {
		SUCCESS: ICON_SUCCESS,
		ERROR: ICON_ERROR,
		WARNING: ICON_WARNING,
		INFO: ICON_INFO,
	}
}
export default CONSTANT;