

/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

    connections : {
        mysqlDbProd: {
            adapter: 'sails-mysql',
            host: '178.62.109.184',
            user: 'triforcer236',
            password: 'ji4Zr56Bu72FY',
            database: 'raidparty_live'
        }
    },
    models: {
        connection: 'mysqlDbProd'
    },
    sockets: {
		adapter: '@sailshq/socket.io-redis',
		host: '167.99.196.128',
		port: 6379,
		db: 'sails',
		pass: '0zgH9C-987c8Dv7d-b8wb8J',
    },


    mandrillApiKey: 'pScbI1GG5IjISeRbQIvzXg',		// PRODUCTION KEY
    mandrillTestApiKey: '57Ev-Hbw1O4KoVnCT3UfnQ', 	// TEST KEY

    hookTimeout: 120000,
	
	API_HOST: 'https://staging.hub.raidparty.io',
    APP_HOST: 'https://app.raidparty.io'

};
