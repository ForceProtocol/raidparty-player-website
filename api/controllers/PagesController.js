/**
 * PagesController
 *
 * @description :: Server-side logic for managing Pages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

const request = require('request-promise'),
	Recaptcha = require('recaptcha-v2').Recaptcha,
	fs = require('fs');

var RECAPTCHA_PUBLIC_KEY  = '6LejfD8UAAAAAIuIZcStpaeaazsQH5brs32sDWza',
    RECAPTCHA_PRIVATE_KEY = '6LejfD8UAAAAAKmBbSB5Jss5CiQQ5fOhh1QRvCfD';

Recaptcha.prototype.toHTML = function(callbackFunction) {

  if(typeof callbackFunction === 'undefined'){
    callbackFunction = '';
  }

  return '<div class="g-recaptcha" data-callback="' + callbackFunction + '" data-sitekey="' + this.public_key + '"></div>';
};

module.exports = {


	/**
	* Return the home page
	*/
	getHomePage: function (req, res) {
		return res.view('public/home', {
			layout: 'public/layout',
			title: 'RaidParty, Play Share and Earn FORCE',
			metaDescription: 'Play Share and Earn while playing amazing games you\'ll love.'
		});
	},
	
	
	
	/**
	* Redirect to privacy policy page
	*/
	redirectPrivacy: function (req, res) {
		return res.redirect("/privacy");
	},


	/**
	* Return the privacy policy page
	*/
	getPrivacyPage: function (req, res) {
		return res.view('public/privacy', {
			layout: 'public/layout',
			title: 'RaidParty Privacy Policy',
			metaDescription: ''
		});
	},
	
	
	/**
	* Return the developer home page
	*/
	getDeveloperHomePage: function (req, res) {
		return res.view('public/developer', {
			layout: 'public/layout',
			title: 'RaidParty, Play Share and Earn FORCE',
			metaDescription: 'Drive real players to your games and reduce player attrition.'
		});
	},
	
	
	/**
	* Return the developer terms
	*/
	getDeveloperTerms: function (req, res) {
		return res.view('public/developer-terms', {
			layout: 'public/layout',
			title: 'Game developer terms of service with RaidParty',
			metaDescription: 'Important information about using the RaidParty technology and services for indie game developers'
		});
	},
	
	
	/**
	* Return the winners
	*/
	getWinners: function (req, res) {
	
		return res.view('public/winners', {
			layout: 'public/layout',
			title: 'All the winners of RaidParty Rewards!',
			metaDescription: 'Check out all the latest winners for players on the RaidParty gamer network'
		});
	},
	
	
	/**
	* Return the how to play guide for players
	*/
	getHowToPlay: function (req, res) {
		return res.view('public/how-to-play', {
			layout: 'public/layout',
			title: 'How to play on the RaidParty game reward network',
			metaDescription: 'Find out how to earn big prizes and rewards for playing great games on the RaidParty gaming reward network'
		});
	},
};
