module.exports.routes = {

	/** Public Routes */
	'GET /': 'PagesController.getHomePage',
	'GET /privacy': 'PagesController.getPrivacyPage',
	'GET /privacy-policy.html': 'PagesController.redirectPrivacy',
	
	'GET /developer': 'PagesController.getDeveloperHomePage',
	'GET /developer-terms': 'PagesController.getDeveloperTerms',

};
