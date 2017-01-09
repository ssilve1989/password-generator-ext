/**
 * Created by ssilvestri on 12/25/16.
 */
const uuid    = require('uuid');
const Encrypt = require('./Encrypt');

const SECOND_LAYER = "po8bvfy54";

class PasswordGenerator {
	static async hash(query = "") {
		const SALT = await this.getSalt(query) || uuid.v4();
		const securePassword = Encrypt.hex_sha256(query + SALT + SECOND_LAYER).substring(0, 16);
		await this.persist(query, SALT);
		return securePassword;
	}

	static getSalt = async query => {
		return new Promise(resolve => chrome.storage.sync.get(query, items => {
			resolve(items[query]);
		})
	)};

	static persist = async (key, value) => new Promise((resolve, reject) => chrome.storage.sync.set({ [key] : value }, function() {
		if(chrome.runtime.lastError) {
			reject(chrome.runtime.lastError);
		}
		else {
			resolve();
		}
	}));
}

export default PasswordGenerator;