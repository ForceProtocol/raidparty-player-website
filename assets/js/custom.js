window.addEventListener("load", function(){
window.cookieconsent.initialise({
  "palette": {
    "popup": {
      "background": "#efefef",
      "text": "#404040"
    },
    "button": {
      "background": "#8ec760",
      "text": "#ffffff"
    }
  },
  "theme": "classic",
  "position": "bottom-left",
  "content": {
    "href": "/cookie-policy"
  }
})});

$(document).ready(function(){
			
	if(typeof spacesLeft !== 'undefined'){
		$('.spaces-left').html(spacesLeft);
		$('.spaces-left').attr("data-spaces-left-int",spacesLeft);
	}
	
	/** Toggle the join form on homepage */
	$('body').on('click','.display-join-form',function(){
		$('.hide-join-form').slideToggle("medium");
	});
	
	
	// Validate email input
	$('input[name="email"]').focusout(function(){
		validateEmailField();
	});
	
	
	// Check passwords entered on signup forms are valid
	$('input[name="password"]').focusout(function(){
		validatePasswordField();
	});
	
	$('input[name="password"]').keyup(function(){
		var password = $('input[name="password"]').val();
		
		if(password.length < 6){
			return;
		}
		
		validatePasswordField();
	});
	
	
	// Check passwords match
	$('input[name="passwordCheck"]').focusout(function(){
		// If passwords match, now check if the original password is correct
		if(validatePasswordsMatch()){
			validatePasswordField();
		}
	});
	
	$('input[name="passwordCheck"]').keyup(function(){
		var passwordCheck = $('input[name="passwordCheck"]').val();
		
		if(passwordCheck.length < 6){
			return;
		}
		
		// If passwords match, now check if the original password is correct
		if(validatePasswordsMatch()){
			validatePasswordField();
		}
	});

	
	function validateEmailField(){
		// Validate the email
		var email = $('input[name="email"]').val();
		
		if(!validateEmail(email)){
			$('label[data-label="email"]').parent().removeClass("success").addClass("error");
			$('label[data-label="email"] .fa-times').show();
			$('label[data-label="email"] .fa-check').hide();
			return false;
		}else{
			$('label[data-label="email"]').parent().removeClass("error").addClass("success");
			$('label[data-label="email"] .fa-times').hide();
			$('label[data-label="email"] .fa-check').show();
			return true;
		}
	}
	
	
	function validatePasswordField(){
		// Validate the password
		// Must be greater than 6 characters, contain one capital and one digit
		var password = $('input[name="password"]').val();
		
		if(!validatePassword(password)){
			$('label[data-label="password"]').parent().removeClass("success").addClass("error");
			$('label[data-label="password"] .fa-times').show();
			$('label[data-label="password"] .fa-check').hide();
			return false;
		}else{
			$('label[data-label="password"]').parent().removeClass("error").addClass("success");
			$('label[data-label="password"] .fa-times').hide();
			$('label[data-label="password"] .fa-check').show();
			return true;
		}
	}
	
	function validatePasswordsMatch(){
		var password = $('input[name="password"]').val();
		var passwordCheck = $('input[name="passwordCheck"]').val();
		
		if(password != passwordCheck){
			$('label[data-label="password"], label[data-label="passwordCheck"]').parent().removeClass("success").addClass("error");
			$('label[data-label="passwordCheck"] .fa-times').show();
			$('label[data-label="passwordCheck"] .fa-check').hide();
			return false;
		}else{
			$('label[data-label="passwordCheck"]').parent().removeClass("error").addClass("success");
			$('label[data-label="passwordCheck"] .fa-times').hide();
			$('label[data-label="passwordCheck"] .fa-check').show();
			return true;
		}
	}
	
	function validatePassword(str) {
		if (str.length < 7) {
			return false;
		} else if (str.length > 99) {
			return false;
		} else if (str.search(/\d/) == -1) {
			return false;
		} else if (str.search(/[a-z]/) == -1) {
			return false;
		} else if (str.search(/[A-Z]/) == -1) {
			return false;
		}
		return true;
	}
	
	
	function validateEmail(email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

	/** SOCKET REQUESTS */
	// A new player joined
	io.socket.on('players/joined', playerJoinedAnnouncement);
	var playerJoinedUnix = new Date().getTime(),
	playerLastJoinedUnix = new Date().getTime(),
	playerJoinedMsgCount = 0;
	
	function playerJoinedAnnouncement(data){
	
		if($('.spaces-left')){
			var spacesLeft = parseInt($('.spaces-left').attr("data-spaces-left-int"));
			spacesLeft--;
			
			if(spacesLeft < 1){
				spacesLeft = 0;
			}
			
			$('.spaces-left').html(spacesLeft);
			$('.spaces-left').attr("data-spaces-left-int",spacesLeft);
		}
		
		playerJoinedMsgCount++;
		playerJoinedUnix = new Date().getTime();
		
		if((playerJoinedUnix - playerLastJoinedUnix > 1000) ||
		playerJoinedMsgCount < 4){
			$.jnoty("A new player just joined the party!", {
				header: 'New Player',
				theme: 'jnoty-success',
				icon: 'fa fa-check-circle',
				life: 2000
			});
		}
		
		playerLastJoinedUnix = new Date().getTime();
	}

});