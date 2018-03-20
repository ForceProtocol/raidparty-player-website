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
	* Return the privacy policy page
	*/
	getPrivacyPage: function (req, res) {
		return res.view('public/login', {
			layout: 'public/layout',
			title: 'RaidParty Privacy Policy',
			metaDescription: ''
		});
	},


};
