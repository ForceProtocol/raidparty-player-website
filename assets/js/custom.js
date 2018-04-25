$(document).ready(function(){

	if(typeof spacesLeft !== 'undefined'){
		$('.spaces-left').html(spacesLeft);
		$('.spaces-left').attr("data-spaces-left-int",spacesLeft);
	}
	
	/** SOCKET REQUESTS */
	
	// A new player joined
	io.socket.on('players/joined', playerJoinedAnnouncement);
	
	function playerJoinedAnnouncement(data){
		
		console.log("A new player joined announcement web socket req: ",data);
		
		if($('.spaces-left')){
			var spacesLeft = parseInt($('.spaces-left').attr("data-spaces-left-int"));
			spacesLeft--;
			$('.spaces-left').html(spacesLeft);
			$('.spaces-left').attr("data-spaces-left-int",spacesLeft);
		}
	}


});