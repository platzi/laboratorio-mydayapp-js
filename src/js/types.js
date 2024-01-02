/**
 * Enum for keys code.
 * @readonly
 * @enum {string}
 */
export const Keys = {
	Enter: 'Enter',
	NumpadEnter: 'NumpadEnter',
	Escape: 'Escape',
};

Object.freeze(Keys);

/**
 * Enum for type operation.
 * @readonly
 * @enum {string}
 */
export const Operation = {
	Plus: 'Plus',
	Minus: 'Minus',
};

/**
 * Enum for status tasks.
 * @readonly
 * @enum {string}
 */
export const StatusTask = {
	Completed: 'completed',
	Pending: 'pending',
};

Object.freeze(StatusTask);

/**
 * Enum for footer counter suffixes.
 * @readonly
 * @enum {string}
 */
export const SuffixesCounterItems = {
	one: 'item left',
	other: 'items left',
};

Object.freeze(SuffixesCounterItems);
