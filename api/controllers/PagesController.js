/**
 * PagesController
 *
 * @description :: Server-side logic for managing Pages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

const request = require('request-promise'),
	Recaptcha = require('recaptcha-v2').Recaptcha,
	fs = require('fs'),
	emailValidator = require("email-validator");

var RECAPTCHA_PUBLIC_KEY  = '6LfCVFUUAAAAAH1IxJRQDIn_F2PQ5mmijN-LJIGA',
    RECAPTCHA_PRIVATE_KEY = '6LfCVFUUAAAAAJGxUQksgqpheaEdjJSRpGiT4t-f';

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
	async getHomePage (req, res) {
		
		try{
		
			if(req.param('subscribe')){
				req.addFlash('success', sails.__("Thank you for confirming your subscription. You are now subscribed to RaidParty."));
			}
			
			let locale = req.getLocale().trim();
			
			let reqOptions = {
				uri: sails.config.API_HOST + '/players/count',
				headers: {
					'User-Agent': 'Request-Promise'
				},
				json: true
			};
			
			let totalPlayers = await request(reqOptions),
			totalSpaces = 150000,
			spacesLeft;
			
			spacesLeft = totalSpaces - totalPlayers.totalPlayers;
			
			if(spacesLeft < 0){
				spacesLeft = 0;
			}
			
			
			// Get list of all active games to display
			reqOptions = {
				uri: sails.config.API_HOST + '/games/active?locale=' + locale,
				headers: {
					'User-Agent': 'Request-Promise'
				},
				json: true
			};
			
			let games = await request(reqOptions);
			
			var recaptcha = new Recaptcha(RECAPTCHA_PUBLIC_KEY, RECAPTCHA_PRIVATE_KEY);
			
			return res.view('public/home', {
				layout: 'public/layout',
				title: sails.__("RaidParty, Play Share and Earn FORCE"),
				metaDescription: sails.__("Play Share and Earn while playing amazing games you\'ll love."),
				totalSpaces: totalSpaces,
				totalPlayers: totalPlayers.totalPlayers,
				spacesLeft: spacesLeft,
				games:games,
				recaptchaForm:recaptcha.toHTML()
			});
		}catch(err){
			sails.log.error("getHomePage failed: ",err);
			var recaptcha = new Recaptcha(RECAPTCHA_PUBLIC_KEY, RECAPTCHA_PRIVATE_KEY);
			return res.view('public/home', {
				layout: 'public/layout',
				title: sails.__("RaidParty, Play Share and Earn FORCE"),
				metaDescription: sails.__("Play Share and Earn while playing amazing games you\'ll love."),
				totalSpaces: 150000,
				totalPlayers: 31745,
				spacesLeft: 118255,
				games:[],
				recaptchaForm:recaptcha.toHTML()
			});
		}
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
	* Return the faq page
	*/
	getFaqPage: function (req, res) {
		return res.view('public/faq', {
			layout: 'public/layout',
			title: 'RaidParty FAQ',
			metaDescription: ''
		});
	},
	
	
	/**
	* Return the privacy policy page
	*/
	getCookiePolicyPage: function (req, res) {
		return res.view('public/cookie-policy', {
			layout: 'public/layout',
			title: 'RaidParty Cookie Policy',
			metaDescription: ''
		});
	},
	
	
	/**
	* Return the players terms of service
	*/
	getTermsOfService: function (req, res) {
		return res.view('public/terms-of-service', {
			layout: 'public/layout',
			title: 'RaidParty Terms of Service for our players',
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
	
	
	/**
	* Return the join landing page
	*/
	async getJoinPage (req, res) {
	
		try {
			let reqOptions = {
					uri: sails.config.API_HOST + '/players/count',
					headers: {
						'User-Agent': 'Request-Promise'
					},
					json: true
				};
				
				let totalPlayers = await request(reqOptions),
				totalSpaces = 150000,
				spacesLeft;
				
				spacesLeft = totalSpaces - totalPlayers.totalPlayers;
				
				if(spacesLeft < 0){
					spacesLeft = 0;
				}
				
			var recaptcha = new Recaptcha(RECAPTCHA_PUBLIC_KEY, RECAPTCHA_PRIVATE_KEY);
			return res.view('public/join', {
				layout: 'public/layout',
				title: sails.__("Claim your seat in the free-to-play RaidParty competition for a chance to win over 50ETH!"),
				metaDescription: sails.__("Enter our free-to-play competition for a chance to win over 50ETH!"),
				totalSpaces: totalSpaces,
				totalPlayers: totalPlayers.totalPlayers,
				spacesLeft: spacesLeft,
				recaptchaForm:recaptcha.toHTML()
			});
		}catch(err){
			sails.log.error("getJoinPage failed: ",err);
			var recaptcha = new Recaptcha(RECAPTCHA_PUBLIC_KEY, RECAPTCHA_PRIVATE_KEY);
			return res.view('public/join', {
				layout: 'public/layout',
				title: sails.__("Claim your seat in the free-to-play RaidParty competition for a chance to win over 50ETH!"),
				metaDescription: sails.__("Enter our free-to-play competition for a chance to win over 50ETH!"),
				totalSpaces: 150000,
				totalPlayers: 31745,
				spacesLeft: 118255,
				recaptchaForm:recaptcha.toHTML()
			});
		}
	},
	
	
	/**
	* Submit the join page
	*/
	async postJoinPage(req, res) {
	
		try { 
			let firstName = req.param('firstName'),
			lastName = req.param('lastName'),
			email = req.param('email'),
			password = req.param('password'),
			passwordCheck = req.param('passwordCheck'),
			locale = req.getLocale(),
			errors = [];
			
			
			// Confirm send data is correct
			if(!firstName){
				errors.push(sails.__("Your first name must be entered"));
			}
			
			if(!lastName){
				errors.push(sails.__("Your surname must be entered"));
			}
			
			if(!email){
				errors.push(sails.__("You must enter your email"));
			}
			
			if(!password){
				errors.push(sails.__("You must enter a valid password"));
			}
			
			if(password != passwordCheck){
				errors.push(sails.__("Your passwords do not match"));
			}
			
			if(!emailValidator.validate(email)){
				email = '';
				errors.push(sails.__("You provided an invalid email"));
			}
			
			if(!rUtil.isValidPassword(password)){
				errors.push(sails.__("You did not provide a valid password. It must be greater than 6 characters, contain one uppercase character and at least one digit"));
			}
			
			let formDataUrl = '?firstName=' + firstName + '&lastName=' + lastName + '&email=' + email;
			
			if(errors.length > 0){
				req.addFlash('errors', errors);
				return res.redirect("/join" + formDataUrl);
			}
			
			// Confirm recapture success
			var data = {
				remoteip: req.connection.remoteAddress,
				response: req.param("g-recaptcha-response"),
				secret: RECAPTCHA_PRIVATE_KEY
			};

			var recaptcha = new Recaptcha(RECAPTCHA_PUBLIC_KEY, RECAPTCHA_PRIVATE_KEY, data);
			
			recaptcha.verify(function (success, error_code) {

				if (success) {
					request({
						method: 'POST',
						uri: sails.config.API_HOST + '/app/player',
						json: true,
						body: {
							firstName:firstName,
							lastName:lastName,
							email:email,
							password:password,
							locale:locale,
							device_type: 'unknown'
						}
					}).then((rsp)=> {
						req.addFlash('success', 'Well done! You have claimed your space to be entered into the competition');
						return res.redirect("/join-success");
					}).catch(err=> {
						if(typeof err.response.body.err != 'undefined'){
							req.addFlash('errors', err.response.body.err);
						}else{
							req.addFlash('errors',"There was a server error. Please try again later.");
						}
						sails.log.debug('Post Join Submit was an error');
						return res.redirect("/join" + formDataUrl);
					});
					
				} else {
					sails.log.debug("error code:", error_code);
					req.addFlash('errors', 'There was a problem subscribing you due to a technical issue.');
					return res.redirect("/join" + formDataUrl);
				}
			});
		}catch(err){
			sails.log.error("postJoinPage failed: ",err);
			return res.redirect("/join");
		}
	},
	
	
	/**
	* Return the join success landing page
	*/
	getJoinSuccessPage: function (req, res) {
		return res.view('public/join-success', {
			layout: 'public/layout',
			title: 'Congratulations! Your space has been reserved',
			metaDescription: 'Enter our free-to-play competition for a chance to win over 16ETH!',
		});
	},
	
	
	/**
	* Subscribe to maillist
	*/
	postSubscribe: function (req, res) {
	
		var email = req.param("email"),
			locale = req.getLocale();
			
		sails.log.debug("locale is:",locale);
		
		// Confirm recapture success
		var data = {
			remoteip: req.connection.remoteAddress,
			response: req.param("g-recaptcha-response"),
			secret: RECAPTCHA_PRIVATE_KEY
		};

		var recaptcha = new Recaptcha(RECAPTCHA_PUBLIC_KEY, RECAPTCHA_PRIVATE_KEY, data);

		recaptcha.verify(function (success, error_code) {

			if (success) {
			
				request({
					method: 'POST',
					uri: sails.config.API_HOST + '/app/subscribe',
					json: true,
					body: {
						email:email,
						locale:locale
					}
				}).then((rsp)=> {
					req.addFlash('success', 'You are now subscribed to RaidParty!');
					return res.redirect("/");
				}).catch(err=> {
					sails.log.debug('Post Subscribe Err: ', err);
					return res.redirect("/");
				});
				
			} else {
				console.log("error code:", error_code);
				req.addFlash('errors', 'There was a problem subscribing you due to a technical issue.');
				return res.redirect("/");
			}
		});
		
	},
};
