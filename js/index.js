var passiveMeBox = function(activeBox, text) {
	activeBox.parent().before(
		'<div class="passiveMeBox"><p>'
		+ text.split("\n").join("<br/>")
		+ '</p></div>'
	);
}

window.onload = function(){

	setInterval(function(){
		jQuery.ajax({
	        type: "GET",
	        url: "/init",
	        async: "true",
	        success: function (data) {
	        	console.log(JSON.parse(data));
	        	$('.passiveMeBox').remove();
	        	JSON.parse(data).forEach(function(message, i, arr){
	        		passiveMeBox($("#activeBox textarea"), message);
	        	})
	        }
	    });
	}, 500);

	$("#activeBox textarea").focus(function(){
		if ($(this).val() == "Введите текст сообщения...") {
			$(this).val("");
		}
	});

	ctrl = false;
	myNode = $("#activeBox");

	$("#activeBox textarea").keydown(function(event) {

		if(event.keyCode == 17) {
			ctrl = true;
		}

		if(event.keyCode == 13) {
			if(ctrl) {
				$(this).val($(this).val() + "\n");
			}
			else {
				if ($(this).val() != ""
					&& !/^\s+$/.test($(this).val())
					&& $(this).val() != "Введите текст сообщения...") {
					jQuery.ajax({
	                    type: "POST",
	                    data: "post=" + $(this).val(),
	                    url: "/messages"
	                });
					passiveMeBox($(this), $(this).val());
					$(this).val("");
				}
			}
		}
	});

	$("#activeBox textarea").keyup(function(event){

		if(event.keyCode == 17) {
			ctrl = false;
		}

		if(!ctrl && event.keyCode == 13 && /^\s+$/.test($(this).val()))
			$(this).val("");
	});

}