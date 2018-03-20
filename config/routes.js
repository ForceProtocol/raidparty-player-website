module.exports.routes = {

	/** Public Routes */
	'GET /': 'PagesController.getHomePage',
	'GET /privacy': 'PagesController.getPrivacyPage',
	'GET /privacy-policy.html': 'PagesController.redirectPrivacy'

};
