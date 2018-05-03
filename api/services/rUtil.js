const passwordValidator = require('password-validator');

module.exports = {

  errorResponse: function (err, req, res, route) {
    let msg = '';
    if(_.isString(err.error))
      msg = err.error;
    else msg = err.error ? err.error.err : err.message;

    if(!_.isString(msg))
      msg = "There was a problem setting your ethereum address. Please contact us at pete@triforcetokens.io or telegram https://t.me/triforcetokens and we will resolve the issue as soon as possible.";

    req.addFlash('errors', msg);

    if(err.statusCode === 401){
      delete req.session.token;
      delete req.session.user;
    }

    let rsp = {};
    if (err instanceof Error) {
      rsp = {err: err.message};
    } else {
      rsp = err;
    }



    if(!route) return res.serverError();
    res.redirect(route);

  },
  
  	
	isValidPassword: function(password){
		var schema = new passwordValidator();
 
		// Add properties to it
		schema
		.is().min(7)                                    // Minimum length 8
		.is().max(100)                                  // Maximum length 100
		.has().uppercase()                              // Must have uppercase letters
		.has().lowercase()                              // Must have lowercase letters
		.has().digits()                                 // Must have digits
		.has().not().spaces();							// Should not have spaces
		
		return schema.validate(password);
	},
	
	stringToJson: function(item) {
		item = typeof item !== "string" ? JSON.stringify(item) : item;

		try {
			item = JSON.parse(item);
		} catch (e) {
			return false;
		}

		if (typeof item === "object" && item !== null) {
			return item;
		}

		return false;
	},
}
;
