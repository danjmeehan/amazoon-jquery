$(document).ready(function(){
  
	$('form').on('submit', function(event){
		event.preventDefault();


	// Check that each required field is not empty

	var requiredField = $('.form-control[required]');
	var isValid = true;

	$(requiredField).each(function(){
		
		// If a required field is empty then its parent should be red
		if ($(this).val().length === 0) {
			$(this).parent().addClass('has-error');
			isValid = false;
		
		} else {
			$(this).parent().removeClass('has-error');
		}
	});

	if(isValid){
		$('.error-message').hide();
		alert('Form successfully submitted!')
	} else {
		$('.error-message').show();
	}

	});

});
