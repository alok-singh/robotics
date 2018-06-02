const Utils = {
	generateID: () => {
		return (new Date().getTime().toString(36));
	}
}

export default Utils;