module.exports.routes = {

	/** Public Routes */
	'GET /': 'PagesController.getHomePage',
	'GET /terms-of-service': 'PagesController.getTermsOfService',
	'GET /privacy': 'PagesController.getPrivacyPage',
	'GET /faq': 'PagesController.getFaqPage',
	'GET /cookie-policy': 'PagesController.getCookiePolicyPage',
	'GET /privacy-policy.html': 'PagesController.redirectPrivacy',
	'GET /developer': 'PagesController.getDeveloperHomePage',
	'GET /developer-terms': 'PagesController.getDeveloperTerms',
	'GET /winners': 'PagesController.getWinners',
	'GET /how-to-play': 'PagesController.getHowToPlay',
	'POST /check-game-country': 'PagesController.gameLinkCountryCheck',
	'GET /game-not-available': 'PagesController.getGameNotAvailablePage',
	
	/** Pre Join Landing Page **/
	'GET /join': 'PagesController.getJoinPage',
	'GET /join-success': 'PagesController.getJoinSuccessPage',
	'POST /join': 'PagesController.postJoinPage',
	'POST /subscribe': 'PagesController.postSubscribe',
};
