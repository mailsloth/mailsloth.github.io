function mailsoth_submit(elem, key) {
	function placeholder(msg) {
		elem.value = '';
		elem.placeholder = msg;
	}
	
	var url = 'https://lazymailchimp.azurewebsites.net/api/add'; // 'https://api.mailsloth.net/add';
	var req = new XMLHttpRequest();
	var body = JSON.stringify({
		Id: key,
		Email: elem.value,
		SourceUri: window.location.href
	});
	
	req.onreadystatechange = () => {
		if (req.readyState == 4) { // Done
			if (req.status == 200) { // OK 
				placeholder('Subscribed!');
			}
		}
	};
	
	req.onerror = (e, status, xhr) => {
		console.log(status);
		console.log(xhr);
		console.log(e);
		placeholder(req.responseText);
	};
	
	req.open('POST', url, true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	req.send(body);
	
	placeholder('Sending...');
}

(function(){ // Install email forms
	
	var elements = document.getElementsByClassName("mailsloth-form");
	for (var i = 0; i < elements.length; i++) {
		var e = elements[i];
		var key = e.getAttribute("data-bind");
		var id = 'ms_input_' + i;
		e.innerHTML = 
		`<form> \
			<input id='${id}' name='ms-email' type='email' placeholder='Enter email address'></input> \
			<button onclick="mailsoth_submit(${id}, '${key}')" class='ms-submit' type='button'>Subscribe</button> \
			<br /> \
			<sup>easy mailing lists by <a href='https://mailsloth.net'>mailsloth</a></sup> \
		</form>`;
	}
}())

function download() {
	var url = 'https://lazymailchimp.azurewebsites.net/api/retrieve'; // 'https://api.mailsloth.net/add';
	var req = new XMLHttpRequest();
	var key = 'vpRbPJD4ko';
	
	req.onreadystatechange = () => {
		if (req.readyState == 4) { // Done
			if (req.status == 200) { // OK 
				placeholder('Subscribed!');
			}
		}
	};
	
	req.open('GET', url, true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	req.send(body);
	
	placeholder('Sending...');
}