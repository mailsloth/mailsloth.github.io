(function(){
	const inputCss = 'mailsloth-form-email';
	const formHereCss = 'mailsloth-form-here';
	const url = 'https://api.mailsloth.net/add';

	function mailsoth_submit(elem, key) {
		console.log('submitting');
		function placeholder(msg) {
			elem.value = '';
			elem.placeholder = msg;
		}
		
		var req = new XMLHttpRequest();
		var body = JSON.stringify({
			Id: key,
			Email: elem.value,
			SourceUri: window.location.href
		});
		
		console.log(body);
		
		req.onreadystatechange = function () {
			if (req.readyState == 4) { // Done
				if (req.status == 400) {
					var json = req.responseText;
					var msg = JSON.parse(json);
					placeholder(msg);
				}
				if (req.status == 200) { // OK 
					placeholder('Subscribed!');
				}
			}
		};
		
		req.onerror = function(e, status, xhr) {
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

	function createForms() {
		var elements = document.getElementsByClassName(formHereCss);
		for (var i = 0; i < elements.length; i++) {
			var e = elements[i];
			var key = e.getAttribute("data-bind");
			var id = 'mailsloth_input_' + i;
			e.innerHTML = 
			`<form> \
				<input class='${inputCss}' id='${id}' name='ms-email' type='email' data-bind='${key}' placeholder='Enter email address'></input> \
				<button type='submit'>Subscribe</button> \
				<br /> \
				<sup>easy mailing lists by <a href='https://mailsloth.net' target='_blank'>mailsloth</a></sup> \
			</form>`;
		}
	}

	function editForms() {
		function callback(element, key) {
			return function(event) {
				mailsoth_submit(element, key);
				event.preventDefault();
			}
		}
		var elements = document.getElementsByClassName(inputCss);
		for (var i = 0; i < elements.length; i++) {
			var element = elements[i];
			var key = element.getAttribute('data-bind');
			var form = element.form;

			if (form) {
				form.onsubmit = callback(element, key);
			}
		}
	}

	createForms();
	editForms();
}())