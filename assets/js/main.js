/*
	Landed by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);

			//More information for hubble picture
			$(".trigger_popup_fricc").click(function(){
				$('.hover_bkgr_fricc').show();
			 });
			 $('.hover_bkgr_fricc').click(function(){
				 $('.hover_bkgr_fricc').hide();
			 });
			 $('.popupCloseButton').click(function(){
				 $('.hover_bkgr_fricc').hide();
			 });
		});

	// Touch mode.
		if (browser.mobile)
			$body.addClass('is-touch');

	// Scrolly links.
		$('.scrolly').scrolly({
			speed: 2000
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			alignment: 'right',
			hideDelay: 350
		});

	// Nav.

		// Title Bar.
			$(
				'<div id="titleBar">' +
					'<a href="#navPanel" class="toggle"></a>' +
					'<span class="title">' + $('#logo').html() + '</span>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

	// Parallax.
	// Disabled on IE (choppy scrolling) and mobile platforms (poor performance).
		var loaded = [false, false, false]
	
		if (browser.name == 'ie'
		||	browser.mobile) {

			$.fn._parallax = function() {

				return $(this);

			};

		}
		else {

			$.fn._parallax = function() {

				$(this).each(function() {

					var $this = $(this),
						on, off;

					on = function() {

						$this
							.css('background-position', 'center 0px');

						$window
							.on('scroll._parallax', function() {

								var pos = parseInt($window.scrollTop()) - parseInt($this.position().top);

								$this.css('background-position', 'center ' + (pos * -0.15) + 'px');

							});

					};

					off = function() {

						$this
							.css('background-position', '');

						$window
							.off('scroll._parallax');

					};

					breakpoints.on('<=medium', off);
					breakpoints.on('>medium', on);

				});

				return $(this);

			};

			$window
				.on('load resize', function() {
					$window.trigger('scroll');
				});

		}

	// Spotlights.
		var $spotlights = $('.spotlight');

		$spotlights
			._parallax()
			.each(function() {
				
				var $this = $(this),
					on, off;

				// Use main <img>'s src as this spotlight's background.
				//	$this.css('background-image', 'url("' + $this.find('.image.main > img').attr('src') + '")');			
				
				if($this.find('.image.main > img#apodPic').length && !loaded[0]){
					loaded[0] = true
					//element one ----------nasa astronomy picture of the day---------
					console.log("NASA APOD called")
					fetch(`https://api.nasa.gov/planetary/apod?api_key=KtlSFp9zsFZPcR50w1UX0I3D1bWz0xf1yC2gZTgI&date=2022-04-23`)
					.then(res => res.json())
					.then (data => {
						$this.css('background-image', 'url("' + data.hdurl + '")');
						document.querySelector("#apodPic").src = data.hdurl
						document.querySelector("#apodTitle").innerHTML = data.title
						document.querySelector("#apodDescription").innerHTML = data.explanation
						console.log("NASA APOD loaded")
					})
					.catch(err => {
						console.log(`error ${err}`)
					})
				}else if($this.find('.image.main > img#marsPic').length && !loaded[1]){
					loaded[1] = true
					//element two ------Picures of Mars from Curiosity--------
					console.log("Mars photo called")
					fetch("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=KtlSFp9zsFZPcR50w1UX0I3D1bWz0xf1yC2gZTgI")
					.then(res => res.json())
					.then (data => {
						let photo = data.photos[Math.floor(Math.random() * data.photos.length)]                       
						$this.css('background-image', 'url("' + photo.img_src + '")');
						document.querySelector("#marsPic").src = photo.img_src 
						document.querySelector("#marsTitle").innerHTML = `A shot of Mars from the ${photo.rover.name} rover`
						document.querySelector("#marsSubTitle").innerHTML = `This photo as taken on ${photo.earth_date} from the ${photo.camera.full_name}`
						console.log("Mars photo loaded")
					})
					.catch(err => {
						console.log(`error ${err}`)
					})
				}else if($this.find('.image.main > img#hubblePic').length && !loaded[2]){
					loaded[2] = true
					//element three ------Hubble Telescope keyword: nebula--------
					console.log("Hubble photo called")
					fetch(`https://hubblesite.azurewebsites.net/images/tags/nebula`)
					.then(res => res.json())
					.then (data => {       
						let photo, maxRes = 0, i = 0;
						while(!maxRes){
							photo = data[Math.floor(Math.random() * data.length)]     
							for (i = 0; i < photo.imgWithRes.length; i++){
								let currentRes = photo.imgWithRes[i][1].split(" ")[0]
								if(currentRes >= 2000 && currentRes < 4500){
									maxRes = currentRes
									break
								} 
							}
						}
						$this.css('background-image', 'url("' + photo.imgWithRes[i][0] + '")');
						document.querySelector("#hubblePic").src = photo.imgWithRes[i][0]
						document.querySelector("#hubbleTitle").innerHTML = photo.title
						document.querySelector("#hubbleSubTitle").innerHTML = photo.date								
						document.querySelector("#hubbleInfo").innerHTML = photo.info.slice(0, Math.min(400, photo.info.length)).concat("....")
						document.querySelector("#hubbleCompleteInfo").innerHTML = photo.info
						console.log("Hubble photo loaded")					
					})
					.catch(err => {
						console.log(`error ${err}`)
					})
				}else{
					//everything else
					//for some reason this function is called twice for each spotlight class.  Since I have prevented the API calls being made
					//twice this will get hit three times from the avoided duplicate API calls.  It doesn't do anything.
					//console.log("everything else") 
					//$this.css('background-image', 'url("' + $this.find('.image.main > img').attr('src') + '")');
				}

				on = function() {

					var top, bottom, mode;

					// Side-specific scrollex tweaks.
						if ($this.hasClass('top')) {

							mode = 'top';
							top = '-20%';
							bottom = 0;

						}
						else if ($this.hasClass('bottom')) {

							mode = 'bottom-only';
							top = 0;
							bottom = '20%';

						}
						else {

							mode = 'middle';
							top = 0;
							bottom = 0;

						}

					// Add scrollex.
						$this.scrollex({
							mode:		mode,
							top:		top,
							bottom:		bottom,
							initialize:	function(t) { $this.addClass('inactive'); },
							terminate:	function(t) { $this.removeClass('inactive'); },
							enter:		function(t) { $this.removeClass('inactive'); },

							// Uncomment the line below to "rewind" when this spotlight scrolls out of view.

							//leave:	function(t) { $this.addClass('inactive'); },

						});

				};

				off = function() {

					// Clear spotlight's background.
						$this.css('background-image', '');

					// Remove scrollex.
						$this.unscrollex();

				};

				breakpoints.on('<=medium', off);
				breakpoints.on('>medium', on);

			});

	// Wrappers.
		var $wrappers = $('.wrapper');

		$wrappers
			.each(function() {

				var $this = $(this),
					on, off;

				on = function() {

					$this.scrollex({
						top:		250,
						bottom:		0,
						initialize:	function(t) { $this.addClass('inactive'); },
						terminate:	function(t) { $this.removeClass('inactive'); },
						enter:		function(t) { $this.removeClass('inactive'); },

						// Uncomment the line below to "rewind" when this wrapper scrolls out of view.

						//leave:	function(t) { $this.addClass('inactive'); },

					});

				};

				off = function() {
					$this.unscrollex();
				};

				breakpoints.on('<=medium', off);
				breakpoints.on('>medium', on);

			});

	// Banner.
		var $banner = $('#banner');

		$banner
			._parallax();

})(jQuery);