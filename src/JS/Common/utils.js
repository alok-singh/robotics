/*
    The main purpose of this file is
    to contain all the common functions
    which are used in multiple projects
*/

const Utils = {
	generateID: () => {
		return (new Date().getTime().toString(36));
	}
}

export default Utils;