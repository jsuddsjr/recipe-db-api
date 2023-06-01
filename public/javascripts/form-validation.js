;(function () {
	// Fetch all the forms we want to apply custom Bootstrap validation styles to
	// eslint-disable-next-line no-undef
	for (const form of document.querySelectorAll('form.needs-validation')) {
		form.addEventListener(
			'submit',
			event => {
				if (!form.checkValidity()) {
					event.preventDefault()
					event.stopPropagation()
				}

				form.classList.add('was-validated')
			},
			false,
		)
	}

	// eslint-disable-next-line no-undef
	for (const button of document.querySelectorAll('button[type="reset"]'))
		button.addEventListener(
			'click',
			() => {
				button.form.classList.remove('was-validated')
			},
			false,
		)
})()
