var sliderSizeM = 1200;
var sliderSizeX = 800;
var sliderSizeS = 300;
var resposiveCarousel;






(function () {
	resposiveCarousel = function () {
		var sliderHeight = arguments[0];
		var slider = $("" + arguments[1] + " .slider");
		var slide = $("" + arguments[1] + " .slide");
		var items = $("" + arguments[1] + " .item");
		var buttons = $("" + arguments[1] + " .buttons button");
		if(arguments[3]!=null){
			var dots = $(""+ arguments[1]+" .dots");
		}		
		var slideCout = arguments[2];
		var seenItems;
		var dotsCheck = true;




		function responsiveSize() {
			$(slider).css({
				width: sliderSizeM + "px",
				height: sliderHeight + "px",
				margin: "0px auto",
				overflow: "hidden",
				position: "relative"
			});
			$(buttons).parent().css({
				position: "absolute",
				top: "45%",
				left: "0px",
				width: "100%"
			})

			if ($(window).width() >= sliderSizeM) {
				$(slider).css("width", sliderSizeM);
				$(slide).css({
					width: (sliderSizeM) / 4 * items.length + "px",
					height: "100%"
				})
				for (var i = 0; i < items.length; i++) {
					$(items[i]).css({
						width: sliderSizeM / 4 + "px",
						height: sliderHeight + "px",
						float: "left"
					})
				}
				seenItems = 4;
			}
			if ($(window).width() <= sliderSizeM) {
				$(slider).css("width", sliderSizeX);
				$(slide).css({
					width: (sliderSizeX) / 3 * items.length + "px",
					height: "100%"
				})
				for (var i = 0; i < items.length; i++) {
					$(items[i]).css({
						width: sliderSizeX / 3 + "px",
						height: sliderHeight + "px",
						float: "left"
					})
				}
				seenItems = 3;
			}
			if ($(window).width() <= sliderSizeX) {
				$(slider).css("width", sliderSizeS);
				$(slide).css({
					width: (sliderSizeS * items.length) + "px",
					height: "100%"
				})
				for (var i = 0; i < items.length; i++) {
					$(items[i]).css({
						width: sliderSizeS + "px",
						height: sliderHeight + "px",
						float: "left"
					})
				}
				seenItems = 1;
			}


			
			if(dotsCheck == true){
				dotsCheck = false;
				if(seenItems == 1){
					for(var i = 0; i < items.length; i++){
						$(dots).append("<span></span>");
					}
				}else{
					for(var i = 0; i < seenItems - 1; i++){
						$(dots).append("<span></span>");
					}
				}
			}
			
		}
		responsiveSize();

		for(var a = 0; a < $(dots).children().length; a++){
			$(dots).children()[a].addEventListener("click", function(){
				if($(dots).children().length == 3){
					$(slide).animate({
						marginLeft: -$(this).index()*$(items[0]).width()+"px"
					})
				}
				if($(dots).children().length == 2){
					$(slide).animate({
						marginLeft: -$(this).index()*($(items[0]).width()*3)+"px"
					})
				}
				if($(dots).children().length == $(items).length){
					$(slide).animate({
						marginLeft: -$(this).index()*$(items[0]).width()+"px"
					})
				}

			})
		}



		$(window).on("resize", function () {
			responsiveSize();
		})

		var checkSlide = true;
		var count = 0;
		$(buttons[0]).on("click", function () {
			if (count < items.length - seenItems) {
				if (checkSlide == true) {
					checkSlide = false;
					$(slide).animate({
						marginLeft: "-=" + $(items[0]).width() * slideCout + "px"
					}, function () {
						checkSlide = true;
					});
					count += slideCout;
				}
			} else {
				$(slide).css({
					marginLeft: "0px"
				});
				count = 0;
			}

		})

		$(buttons[1]).on("click", function () {
			if (count > 0) {
				if (checkSlide == true) {
					checkSlide = false;
					$(slide).animate({
						marginLeft: "+=" + $(items[0]).width() * slideCout + "px"
					}, function () {
						checkSlide = true;
					});
					count -= slideCout;
				}
			} else {

				$(slide).css({
					marginLeft: "-" + $(items[0]).width() * (items.length - seenItems) + "px"
				});
				count = items.length - seenItems;
			}

		})

	}





})()





// argiments[0] height
// arguments[1] parent element
// arguments[2] slide count;
// arguments[3] dots if you want;
// -----------------------------------------------{ EXAMPLE JS }-------------------------------------//
// var exampleSlider = new resposiveCarousel(500, "#carousel", 1, true)


// -----------------------------------------------{ EXAMPLE HTML }-------------------------------------//

//<div class="slider">
	//<div class="slide">
		//<div class="item"></div>
		//<div class="item"></div>
		//<div class="item"></div>


		//<div class="buttons">
			//<button id="next"><i class="fa fa-chevron-right"></i></button>
			//<button id="prev"><i class="fa fa-chevron-left"></i></button>
		//</div>

		//<div class="dots"></div>
	//</div>
//</div>






