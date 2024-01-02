import { Keys } from './types';

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

export const ENTER_KEYS = [Keys.Enter, Keys.NumpadEnter];

/**
 * @typedef {object} Pluralize
 * @property {Intl.PluralRules} pluralize Pluralize rule.
 * @property {{[x: string]: string}} suffixes Suffixes for the pluralize.
 * @property {number} number Guide for use pluralize rule as appropriate.
 */
/**
 * @typedef {function(Pluralize): string} FormatTextPluralize
 */
/**
 * @type {FormatTextPluralize}
 */
export function formatTextPluralize({ pluralize, suffixes, number }) {
	const rule = pluralize.select(number);
	const suffix = suffixes[rule];

	return `<strong>${number}</strong> ${suffix}`;
}
