module.exports.routes = {

	/** Public Routes */
	'GET /': 'PagesController.getHomePage',
	'GET /terms-of-service': 'PagesController.getTermsOfService',
	'GET /privacy': 'PagesController.getPrivacyPage',
	'GET /privacy-policy.html': 'PagesController.redirectPrivacy',
	'GET /developer': 'PagesController.getDeveloperHomePage',
	'GET /developer-terms': 'PagesController.getDeveloperTerms',
	'GET /winners': 'PagesController.getWinners',
	'GET /how-to-play': 'PagesController.getHowToPlay',
	
	
	'POST /subscribe': 'PagesController.postSubscribe',

};
