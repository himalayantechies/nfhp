$(function(){
	$.preloadCssImages();  //images of css preload
	//preload sounds
	sounds["intro"]["intro"] = loadAudio('resources/sounds/intro.ogg'); 
	sounds["drop"]["dropped"] = loadAudio('resources/sounds/drop.ogg');
	
	sounds["click"]["exercise"] = loadAudio('resources/sounds/voices/abhyas.ogg');
	sounds["click"]["training"] = loadAudio('resources/sounds/voices/taleem.ogg');
	sounds["click"]["button"] = loadAudio('resources/sounds/click.ogg');
	sounds["click"]["truck"] = loadAudio('resources/sounds/truck-move.ogg');
	sounds["click"]["toc"] = loadAudio('resources/sounds/toc.ogg');
	
	sounds["door"]["close"] = loadAudio('resources/sounds/door-close.ogg');
	
	sounds["hover"]["scoresheet"] = loadAudio('resources/sounds/scoresheet.ogg');
	sounds["hover"]["toc"] = loadAudio('resources/sounds/toc-mouseover.ogg');
	 
	sounds["popup"]["pop"] = loadAudio('resources/sounds/popup.ogg');
	 
	// All lessons voices 
	for(i=0;i<NUM_OF_LESSONS;i++){
		lesno = i+1;
		sounds["voices"]["lessons"][i] = loadAudio('resources/sounds/voices/lesson/'+sounds["voices"]["lessons"][i]+'.ogg');
		titleSrc = 'images/lessons/lesson'+ lesno + '/title.png';
	}
	for(i=0;i<6;i++){
		 sounds["voices"]["editorial"][i] = loadAudio('resources/sounds/voices/editorial/'+sounds["voices"]["editorial"][i]+'.ogg');
	 }
	for(i=0;i<sounds["voices"]["others"].length;i++){
		 sounds["voices"]["others"][i] = loadAudio('resources/sounds/voices/'+sounds["voices"]["others"][i]+'.ogg');
	}
	/* preload Images SECTION */
	// TOC
	for(i=0;i<NUM_OF_LESSONS;i++){
		myImage = loadImage('images/toc/'+tocInfo["tocSubBackground"]["images"][i]+'.png');
		newI = i+1;
		myImageLessons = loadImage('images/toc/lesson'+newI+'.png');
		myImageLessonsMO = loadImage('images/toc/lesson'+newI+'-mouseover.png');
	}
	myImage = loadImage('images/toc/toc-animation.png');
	myImage = loadImage('images/toc/toc-animation-1.png');
	myImage = loadImage('images/toc/frame.png');
	myImage = loadImage('images/toc/frame-bg.png');
	
	for(i = 0 ;i < 11; i++){
		myImage = loadImage('images/interface2/how-to/howto-'+i+'.gif');
	}
	//howto infobar
	howtoInfobar = loadImage('images/interface2/infobar-howto-bg.png');
	howtoInfobarText = loadImage('images/interface2/infobar-howto-text.png');
	//editorial page
	for(i=1;i<7;i++){
		myHeading = loadImage('images/interface2/editorial/'+i+'-heading.png');
	myHeadingBG = loadImage('images/interface2/editorial/'+i+'-heading-bg.png');
	}
	myHeading = loadImage('images/interface2/editorial/aboutcd.png');
	myHeadingBG = loadImage('images/interface2/editorial/aboutcd-bg.png');
	//entry
	myHeading = loadImage('images/interface2/infobar-login-bg.png');
	myHeadingBG = loadImage('images/interface2/infobar-login-text.png');
	//login
	myHeading = loadImage('images/interface2/infobar-entry-bg.png');
	myHeadingBG = loadImage('images/interface2/infobar-entry-text.png');
	//toc
	myHeading = loadImage('images/interface2/infobar-content-bg.png');
	myHeadingBG = loadImage('images/interface2/infobar-content-text.png');
	//lesson 1
	for(i = 0 ;i < 9; i++){
		myImage = loadImage('images/lessons/lesson1/exercise1/drag'+i+'.png');
	}
	myImage = loadImage('images/lessons/lesson1/exercise1/dropArea.png');
	//lesson 2
	for(i = 0 ;i < 5; i++){
		myImage = loadImage('images/lessons/lesson2/exercise1/drag'+i+'.png');
	}
	myImage = loadImage('images/lessons/lesson2/exercise1/dropArea.png');
	//Lesson 3
	for(i = 0 ;i < 9; i++){
		myImage = loadImage('images/lessons/lesson3/page10/symbol'+i+'.png');
	}
	myImage = loadImage('images/lessons/lesson3/page6/storage_mechanism_thumb.png');
	myImage = loadImage('images/lessons/lesson3/page6/storage_mechanism.png');
	myImage = loadImage('images/lessons/lesson3/page10/symbolArea.png');
	for(i = 0 ;i < 8; i++){
		myImage = loadImage('images/lessons/lesson3/exercise2/drag'+i+'.png');
	}
	myImage = loadImage('images/lessons/lesson3/exercise2/dropArea.png');
	//Lesson4
	myImage = loadImage('images/lessons/lesson4/exercise1/disabled-bg.png');
	//lesson5
	for(i = 0 ;i < 2; i++){
		myImage = loadImage('images/lessons/lesson5/exercise1/drag'+i+'.png');
		myImage1 = loadImage('images/lessons/lesson5/exercise1/drop'+i+'.png');
		myImage2 = loadImage('images/lessons/lesson5/exercise2/drag'+i+'.png');
		myImage3 = loadImage('images/lessons/lesson5/exercise2/drop'+i+'.png');
	}
	for(i = 0 ;i < 3; i++){
		myImage = loadImage('images/lessons/lesson5/exercise5/drop'+i+'.png');
	}
	for(i = 0 ;i < 3; i++){
		myImage = loadImage('images/lessons/lesson5/exercise6/drop'+i+'.png');
	}
	for(i = 0 ;i < 3; i++){
		myImage = loadImage('images/lessons/lesson5/exercise7/drop'+i+'.png');
	}
	for(i = 0 ;i < 3; i++){
		myImage = loadImage('images/lessons/lesson5/exercise8/drop'+i+'.png');
	}
	myImage = loadImage('images/lessons/lesson5/exercise5/dropArea.png');
	myImage = loadImage('images/lessons/lesson5/exercise6/dropArea.png');
	myImage = loadImage('images/lessons/lesson5/exercise7/dropArea.png');
	myImage = loadImage('images/lessons/lesson5/exercise8/dropArea.png');
	
	///Lesson7
	for(i = 0 ;i < 3; i++){
		myImage = loadImage('images/lessons/lesson7/exercise2/drag'+i+'.png');
		myImage1 = loadImage('images/lessons/lesson7/exercise2/drop'+i+'.png');
	}
	myImage = loadImage('images/lessons/lesson7/page7/check_list.png');
	myImage = loadImage('images/lessons/lesson7/page8/extra_detail.png');
	
	//exit
	for(i = 0; i < 5; i++){
		myImage = loadImage('images/exit/door-'+i+'.png');
	}
	for (i = 0; i < 6; i++) {
		myImage = loadImage('images/exit/man-'+i+'.png');
	}
});