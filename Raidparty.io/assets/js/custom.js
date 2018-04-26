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
			$('.spaces-left').html(spacesLeft);
			$('.spaces-left').attr("data-spaces-left-int",spacesLeft);
		}
		
		playerJoinedMsgCount++;
		playerJoinedUnix = new Date().getTime();
		
		if((playerJoinedUnix - playerLastJoinedUnix > 1000) ||
		playerJoinedMsgCount < 2){
			$.jnoty("A new player just joined the party!", {
				header: 'New Player',
				sticky: true,
				theme: 'jnoty-success',
				icon: 'fa fa-check-circle',
				life: 2000
			});
		}
		
		playerLastJoinedUnix = new Date().getTime();
	}


});