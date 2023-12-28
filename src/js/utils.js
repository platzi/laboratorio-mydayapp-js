export const sayHello = (text) => {
	return text;
};

/**
 * @param {string[]} keys Receive an array of string.
 * @returns {{[key: string]: string}} Returns an object that "mirrors" the array of strings keys as values.
 */
export function createMirrorObject(keys) {
	/** @type {{[key: string]: string}} */
	const NEW_OBJECT = {};

	for (const VALUES of keys) {
		NEW_OBJECT[VALUES] = VALUES;
	}

	return NEW_OBJECT;
}
