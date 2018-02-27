function VM() {
	const endpoint = "http://api.mailsloth.net/";
	this.email = ko.observable("");
	this.sending = ko.observable(false);
	this.privateKey = ko.observable("");
	this.publicKey = ko.observable("");
	this.captcha = ko.observable("captcha");
	this.error = ko.observable();
	this.success = ko.observable(false);
	this.error = ko.observable("");
	
	this.codeSnippet = ko.computed(() => {
		if (this.publicKey()) {
			var str =  "&lt;script src='sloth.js'&gt;&lt;/script&gt;";
			return $("<div/>").text(str).html();
		}
		
		return "// Enter an email address and click submit."
	});
	
	this.formSnippet = ko.computed(() => {
		if (this.publicKey()) {
			return "&lt;div class='mailsloth-form' data-bind='" + this.publicKey() + "'/&gt;";
		}
		
		return "// Enter an email address and click submit."
	});
	
	this.downloadSnippet = ko.computed(() => {
		if (this.privateKey()) {
			return "wget '" + endpoint + "retrieve?key=" + this.privateKey() + "'";
		}
		
		return "// enter an email address and click submit.";
	});
	
	this.submit = () => {
		this.sending(true);
		this.success(false);

		var post = JSON.stringify({
			Email: this.email(),
			Capthcha: this.captcha()
		});
		
		var url = endpoint + "create2";
		
		$.ajax({
			url: url,
			data: post,
			method: "POST",
			contentType: "application/json",
			success: (d, status, xhr) => {
				this.publicKey(d.PublicKey);
				this.privateKey(d.PrivateKey);
				this.success(true);
				this.error("");
			},
			complete: () => {
				this.sending(false);
			},
			error: (err) => {
				console.error(err);
				this.success(false);	
				this.error(error.msg);
			}
		});
	}
}

ko.applyBindings(new VM());