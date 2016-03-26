$(function (){
	var $logo = $('.logo'),
		$logo_a = $logo.find('a');

	var $tab1 = $('.tab-1');

	$('.item').each(function(index, el) {
		var $this = $(this);


		if(index >= 1) {
			$this.on('click', function(event) {

				$logo.animate({
					'marginTop': 0
				},300, function() {
					$logo_a.animate({
						'left': 0,
						'marginLeft': 0
					},300, function() {
						$tab1.hide();
					});	
				});

				$('.tab').eq(index).slideDown().siblings('.tab').hide();
			});			
		} 

		$('.home').click(function(event) {
			
			$logo_a.animate({
				'marginLeft': -50 + 'px',
				'left': 50 + '%'
			},300, function() {
				$logo.animate({
					'marginTop': 100 + 'px'
				},300, function() {
					$tab1.slideDown();
				});	
			});

			$tab1.siblings('.tab').hide();
		});

		

	})		
});
