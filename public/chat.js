window.onload = function() {

    var messages = [];
    var socket = io.connect('http://localhost:3700');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
	var name = document.getElementById("name");
	
	$(document).ready(function() {
		$("#field").keyup(function(e) {
			if(e.keyCode == 13) {
				sendMessage();
			}
		});
	});
    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
            var html = '';
            for(var i=0; i<messages.length; i++) {
				console.log(messages[i]);
				html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ":  </b>";
                html += messages[i].message + '<br />';
            }
            content.innerHTML = html;
        } else {
            console.log("There is a problem:", data);
        }
    });

    sendButton.onclick = sendMessage = function() {
		console.log(name.value)
		if (name.value == "") {
			alert("Please type your name!")
		} else {
			var text = field.value;
			socket.emit('send', { message: text, username: name.value });
			field.value = "";
		}
    };

}