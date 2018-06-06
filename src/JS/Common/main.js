/*
    The main purpose of this file is
    to act as a single source of all the common
    components and utilities in the project 
*/


import Select from './Components/select';
import Button from './Components/button';
import Checkbox from './Components/checkbox';
import Loader from './Components/loader';
import Utils from './utils'

import '../../CSS/Common/main.less';

const Core = {
	Components: {
		Select: Select,
		Button: Button,
		Checkbox: Checkbox,
		Loader: Loader
	},
	Utils: Utils
}

export default Core;