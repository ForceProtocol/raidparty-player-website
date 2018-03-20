/**
 * Artemis API Service
 *
 * @description :: Server-side logic for managing Pages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
 
const request = require('request-promise'),
	fs = require('fs');

module.exports = {

	
	/**
	* Collate user ID retweets against a tweet
	*/
	submitIndividual: function (ssic,ssoc,onboardingMode,paymentMode,productServiceComplexity,
								firstName,lastName,email,nationality,country,gender,dateOfBirth,userId) {
	
		return new sails.bluebird(function(resolve, reject) {
						
			// Format gender
			if(gender == 'female'){
				gender = 'FEMALE';
			}else{
				gender = 'MALE';
			}
			
			// Submit signup request to API server
			request({
				uri: sails.ARTEMIS_API_URL + '/default/individual_risk',
				method: 'POST',
				json: true,
				headers: {"Content-Type":"application/json","WEB2PY-USER-TOKEN":sails.ARTEMIS_API_TOKEN},
				body: {
					domain_name:sails.ARTEMIS_TFT_DOMAIN,
					rfrID: userId,
					ssic_code: ssic,
					ssoc_code: ssoc,
					onboarding_mode: onboardingMode,
					payment_mode: paymentMode,
					product_service_complexity: productServiceComplexity,
					first_name: firstName,
					last_name: lastName,
					nationality: nationality,
					country_of_residence: country,
					gender:gender,
					date_of_birth:dateOfBirth
				},
			}).then((rsp)=> {
				return resolve(rsp);
			}).catch(err=> {
				return reject(err);
			});
		
		});
		
	},
	
	
	/**
	* Collate user ID retweets against a tweet
	*/
	docPostApi: function (userId,fileLocation,fileName,contentType) {
	
		return new sails.bluebird(function(resolve, reject) {

			// Submit signup request to API server
			var req = request({
				uri: sails.ARTEMIS_API_URL + '/api/individual_doc',
				method: 'POST',
				json: true,
				headers: {"Content-Type":"application/json","WEB2PY-USER-TOKEN":sails.ARTEMIS_API_TOKEN},
				formData: {
					domain_name:sails.ARTEMIS_TFT_DOMAIN,
					cust_rfr_id: userId,
					file: {
						value: fs.createReadStream(fileLocation),
						options: {
							filename:fileName,
							contentType: contentType
						}
					}
				},
			}).then((rsp)=> {
			
				if(rsp.errors.length > 0){
					return reject(rsp.errors);
				}
				
				return resolve(rsp);
			}).catch(err=> {
				console.log("error.statusCodeError is:",err.StatusCodeError);
				return reject(err);
			});
			
		});
		
	},
	
	
	
	/**
	* Perform Face Recognition check
	*/
	facePostApi: function (userId,docId,selfieId) {
		
		return new sails.bluebird(function(resolve, reject) {

			// Submit signup request to API server
			var req = request({
				uri: sails.ARTEMIS_API_URL + '/api/individual_face',
				method: 'POST',
				json: true,
				headers: {"Content-Type":"application/json","WEB2PY-USER-TOKEN":sails.ARTEMIS_API_TOKEN},
				formData: {
					domain_name:sails.ARTEMIS_TFT_DOMAIN,
					cust_rfr_id: userId,
					source_doc_id:docId,
					target_doc_id:selfieId
				},
			}).then((rsp)=> {
			
				if(typeof rsp.errors == 'undefined' || rsp.errors == null){
					return resolve(rsp);
				}
				
				sails.log.error("rejected errors:",rsp);
				
				return reject(rsp.errors);
			}).catch(err=> {
			
				sails.log.error("rejected errors 2:",err);
					
				// It tried to match - but failed
				if(typeof err.error !== 'undefined' && typeof err.error.errors !== 'undefined' && typeof err.error.errors.comparison !== 'undefined'){
					if(err.error.errors.comparison.indexOf("undetected") != -1){
						return reject("<p>Please try uploading different images as the facial recognition could not be matched.</p>");
					}
				}
				
				return reject(err.error.errors);
			});
			
		});
		
	},
	
	
	
	/**
	* Perform Face Recognition check
	*/
	finalReportCheckApi: function (userId) {
		
		return new sails.bluebird(function(resolve, reject) {

			// Submit signup request to API server
			var req = request({
				uri: sails.ARTEMIS_API_URL + '/api/individual_customer_report',
				method: 'POST',
				json: true,
				headers: {"Content-Type":"application/json","WEB2PY-USER-TOKEN":sails.ARTEMIS_API_TOKEN},
				formData: {
					domain_name:sails.ARTEMIS_TFT_DOMAIN,
					cust_rfr_id: userId
				},
			}).then((rsp)=> {
			
				if(typeof rsp.errors == 'undefined' || rsp.errors == null){
					return resolve(rsp);
				}
				
				return reject(rsp.errors);
			}).catch(err=> {
				return reject(err);
			});
			
		});
		
	},
	
	
	/**
	* Check individuals who are pending if their status changed and facematch done
	*/
	checkIndividualStatus: function () {

		return new sails.bluebird(function(resolve, reject) {
				
			// Submit signup request to API server
			request({
				method: 'POST',
				json: true,
				body: {
					approvalStatus: 'PENDING',
					faceMatchResult: 'MATCH'
				},
				uri: sails.config.API_URL + 'get-pending-whitelist-users'
			}).then((rsp)=> {
			
				rsp.users.forEach(function(user){
				
					// Submit signup request to API server
					var req = request({
						uri: sails.ARTEMIS_API_URL + '/default/check_status.json',
						method: 'GET',
						json: true,
						headers: {"Content-Type":"application/json","WEB2PY-USER-TOKEN":sails.ARTEMIS_API_TOKEN},
						qs: {
							domain_name:sails.ARTEMIS_TFT_DOMAIN,
							rfrID: user.id
						},
					}).then((rsp)=> {
						if(typeof rsp.errors == 'undefined' || rsp.errors == null){
							// Update user to passed
							if(rsp.approval_status == 'CLEARED' || rsp.approval_status == 'ACCEPTED'){
								
								// DO THE BELOW ON THE API SERVER - TO UPDATE THE USERS TO BEING APPROVED
								/**User.update({id:rsp.rfrID},{approvalStatus:rsp.approval_status}).exec(function(err,updated){
									if(err || typeof updated == 'undefined'){
									}else{
										var text = "Hi " + user.firstName + ",<br /><br /> We are please to let you know your KYC/AML process has been <strong>cleared</strong> and you can now participate in the token sale scheduled for <strong>20th February at 12:30pm UTC</strong>.<br />You can login to your account using the below link when the token sale is open:<br /><br /><a href=\"https://triforcetokens.io/login\">Login Here</a><br /><br />Kind Regards,<br />The TriForce Tokens Team";
										MailchimpService.sendMandrillEmail(user.email,'no-reply@triforcetokens.io','Congratulations you have been approved to buy FORCE tokens',text);
									}
								});**/
								
							}else if(rsp.approval_status == 'REJECTED'){
							
								// DO THE BELOW IN THE API SERVER - REJECT THE USER
								/**
								var text = "Hi " + user.firstName + ",<br /><br /> We are sorry to let you know your KYC/AML process has been <strong>rejected</strong>.<br />If you strongly feel this is in error please get in touch with us in telegram or you can login to your account and use the support chat channel there.<br /><br /><a href=\"https://triforcetokens.io/login\">Login Here</a><br /><br />Kind Regards,<br />The TriForce Tokens Team";
								User.update({id:rsp.rfrID},{approvalStatus:rsp.approval_status}).exec(function(err,updated){
								});**/
							}
							
						}else{
							sails.log.error("Artemis Cron Check Individual error rsp: ",rsp.errors);
						}
					}).catch(err=> {
						sails.log.error("Artemis Cron Check Individual error rsp22: ",err);
						return reject(err);
					});
				});
				
			}).catch(err=> {
				console.log("failed to get valid response for artemisapiservice - checkindividualstatus");
				resolve( {status:'error',errMsgs:["<p></p>"]});
			});
		});
		
	},
	
};

