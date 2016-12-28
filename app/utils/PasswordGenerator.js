/**
 * Created by ssilvestri on 12/25/16.
 */
const uuid    = require('uuid');
const Encrypt = require('./Encrypt');

const SECOND_LAYER = "po8bvfy54";

class PasswordGenerator {
	static hash(query) {
		const SALT           = this.getSalt(query);
		const securePassword = Encrypt.hex_sha256(query + SALT + SECOND_LAYER).substring(0, 16);
		this.persist(query, SALT);
		return securePassword;
	}

	static getSalt = query => localStorage.getItem(query) || uuid.v4();
	static persist = (key, value) => localStorage.setItem(key, value);

}

export default PasswordGenerator;