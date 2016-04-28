/* ------- Interface2 -------- */
var lessonMouseOver;
var autoCompleteNum = 0;
var autoCompleteMatch  = false;
var lessonName;
var trayMouseOver = false;
var doorTime = 200;
var doorNum = 0;
var editorialNum = 0;
var lessonRead;
var timerHowto;

/* Interface 2 */
function listAllUserNames(){
	var listNames = new cookieList("nfhpNames"); 
	var nfhpNames = listNames.items();
	if(nfhpNames.length > 0){
		$('#autoComplete').show();
		$('#autoComplete').empty();
		for(i = 0; i < nfhpNames.length; i++){
			$('#autoComplete').append('<div id="autoComplete'+i+'" class="autoComplete-texts"></div>');
			$('#autoComplete #autoComplete'+i).html(nfhpNames[i]);
		}
	}
}

function updateLastLocButton(){
	var listNames = new cookieList("nfhpNames"); 
	var nfhpNames = listNames.items();
	userNameText = $('input#fullName').val();
	var oldUser = false;
	for(var i in nfhpNames){
		if(userNameText == nfhpNames[i]){
			oldUser = true;
			nfhpId = parseInt(i)+1;
			break;
		}
	}
	if(!oldUser){
		$('#last-leave-icon').hide();
	}else{
		var printStatus = new cookieList("nfhpPrintStatus");
		var nfhpScores = new cookieList("nfhpScores");
		var scores = nfhpScores.items();
		var status = printStatus.items();
		if(scores[nfhpId-1] == NUM_OF_EXERCISES && status[nfhpId-1] == 0){  //left to print
			$('#print-now-icon').show();
			$('#last-leave-icon').hide();	
		}
	}
}

function createTray(){
	lessonRead = 8;
	if(!isLoggedIn()){
		lessonRead= 8;
	}
	else{
		var lessonId;
		var score = getScore();
		lessonId = 1;
		for(i=0;i<NUM_OF_LESSONS;i++){
			if(score >= maxExerciseNumber[i]){
				lessonId = i+1;
			}else {
				lessonId = i+1;
				break;
			}
		}
		lessonRead = lessonId;
	}
	$('#tray').empty();
	$('#tray').html('<div id="frame"></div>');
	$('#tray').append('<div id="frame-bg"></div>');
	// put the lesson text 
	for(i = 1; i<=NUM_OF_LESSONS; i++){
		var topText = 17 + (i-1)*60;
		lessonTextCss = {
			'top': 	topText + 'px',
			'left' : 40 + 'px',
			'background' : 'url(images/toc/lesson'+i+'.png)'
		};
		$('#tray'+' #frame').append('<div id= "lesson'+i+'" class="lesson-text" ></div>');
		if(i>lessonRead){
			$('#tray'+' #frame #lesson'+i).css(lessonTextCss).css('opacity',0.5);
		}else{
			$('#tray'+' #frame #lesson'+i).css(lessonTextCss);	
		}
	}
	//sub menu generation
	for(i =0 ;i<NUM_OF_LESSONS; i++){
		subLessonId = i+1;
		$('#tray').append('<div id="subLesson'+subLessonId+'" class="sub-lesson"></div>');
		//$('#subLesson'+subLessonId).html();
		var newSubLessonCss = {
				'width' : tocInfo["tocSubBackground"]["width"] + 'px',
				'height':tocInfo["tocSubBackground"]["height"][i] + 'px',
				'top' : tocInfo["tocSubBackground"]["top"][i] +'px' ,
				'left': tocInfo["tocSubBackground"]["left"] +'px' ,
				'background': 'url(images/toc/'+tocInfo["tocSubBackground"]["images"][i]+'.png)'
		};
		$('#tray' +' #subLesson'+subLessonId).css(newSubLessonCss)
		$('#tray' +' #subLesson'+subLessonId).append('<div class = "sub-lesson-text" id = "lesson'+subLessonId+'Area"></div>');
		$('#tray' +' #subLesson'+subLessonId+' #lesson'+subLessonId+'Area').html($('#sublessons'+subLessonId).html());
		$('#tray' +' #subLesson'+subLessonId).hide();
	}
	$('#tray').hide();
}

function toc(){
	interfaceObj.interface2 = "toc";
	updateIcons();
	var infobar = {
			'position': 'absolute',
			'left': -21 + 'px',
			'top': 78 + 'px',
			'width' : 177 + 'px',
			'height' :49 + 'px' ,
			'background' : 'url(images/interface2/infobar-content-bg.png)'
	};
	$('#interface2 #infobar-heading').css(infobar);
	$('#interface2 #infobar-heading img').attr('src',"images/interface2/infobar-content-text.png");
	
	createTray();
	//toc animation starts
	playSound(sounds["click"]["toc"]);
	var tocImage = '#interface2 #toc-image';
	$(tocImage).css({'left': 'auto','right':'-542px','top':'180px'});
	$(tocImage).show();
	var tocImage1 = '#interface2 #toc-image-1';
	$(tocImage).animate({rotate: '30deg'}, 1,function(){
		$(tocImage).animate({left: '233px'},950,function(){
			$(tocImage).animate({rotate: '0deg'}, 155,function(){
				//new Image
				$(tocImage).hide();
				$(tocImage1).show();
				$(tocImage1).animate({rotate: '-15deg'}, 200,function(){
					$(tocImage1).animate({rotate: '0deg'}, 30,function(){
						$(tocImage1).hide();
						$(tocImage).show();
						$(tocImage).animate({rotate: '5deg'}, 100,function(){
							$(tocImage).animate({rotate: '0deg'}, 50,function(){
								$(tocImage).hide();
								$('#tray').show();
								$(tocImage).animate({rotate: '0deg'}, 1000,function(){
									playSound(sounds["voices"]["others"][2]);
									$('#interface2 #infobar-heading').animate({'left':'122px'},400,function(){
										$('#interface2 #infobar-heading').animate({'left':'112px'},100);
									});
								});
								
							});
						});
					});
					
				});
			});
		});
	});
}

function login(){
	interfaceObj.interface2 = "login";
	updateIcons();
	var infobar = {
			'position': 'absolute',
			'left': 0 + 'px',
			'top': 78 + 'px',
			'width' : 200 + 'px',
			'height' :49 + 'px' ,
			'background' : 'url(images/interface2/infobar-login-bg.png)'
	};
	$('#interface2 #infobar-heading').css(infobar);
	$('#interface2 #infobar-heading img').attr('src',"images/interface2/infobar-login-text.png");
	$('#interface2 #slides').html($('#login-page').html());
	$('#interface2 #infobar-heading').animate({'left':'+=136px'},600,function(){
		$('#interface2 #infobar-heading').animate({'left':'-=10px'},100,function(){
			 playSound(sounds["voices"]["others"][3]);
		});
	});
	$('#howto-cd-icon').show();
}

function entry(){
	interfaceObj.interface2 = "entry";
	updateIcons();
	var infobar = {
			'position': 'absolute',
			'left': 0 + 'px',
			'top': 78 + 'px',
			'width' : 177 + 'px',
			'height' :49 + 'px' ,
			'background' : 'url(images/interface2/infobar-entry-bg.png)'
	};
	$('#interface2 #infobar-heading').css(infobar);
	$('#interface2 #infobar-heading img').attr('src',"images/interface2/infobar-entry-text.png");
	$('#interface2 #slides').css({'top':'150px','left':'268px'});
	$('#interface2 #slides').html($('#entry-text').html());
	$('#interface2 #infobar-heading').animate({'left':'77px'},600,function(){
		$('#interface2 #infobar-heading').animate({'left':'67px'},100,function(){
			playSound(sounds["voices"]["others"][1]);
		});
	});
}
function editorial(){
	interfaceObj.interface2 = "editorial";
	interfaceObj.imageNum = 0;
	editorialNum = 0;
	updateIcons();
	pageId = interfaceObj.imageNum+1;
	$('#interface2 #slides').html($('#editorial-pages #page-'+pageId).html());
	$('#interface2 #slides').css({'top':'150px','left':'268px'});
	animateHeading('editorial');
}

function howto(imgNum){
	interfaceObj.interface2 = "howto";
	if(imgNum != null){
		interfaceObj.imageNum = imgNum;
	}else{
		interfaceObj.imageNum = 0;	
	}
	$('#howto-cd-icon').hide();
	updateIcons();
	updateLinkIcons();
	if(!isLoggedIn() && !firstTimeUse && !imgNum){
		$('#interface2 #old-user-direction-text').show();
	}
	showPicture('#interface2 #slides','<img src="images/interface2/how-to/howto-'+interfaceObj.imageNum+'.gif" />',interface2positions["top"][interfaceObj.imageNum],interface2positions["left"][interfaceObj.imageNum]);
	animateHeading('howto');
}

function animateHeading(page){
	var animate;
	if(page =='howto'){
		if(interfaceObj.imageNum == 0){
			$('#navigation-bottom .left').hide();
			animate = true;
		}
		else{
			animate = false;
		}
		var infobar = {
				'position': 'absolute',
				'left': -227 + 'px',
				'top': 78 + 'px',
				'width' : 427 + 'px',
				'height' :49 + 'px' ,
				'background' : 'url(images/interface2/infobar-howto-bg.png)'
		};
		$('#interface2 #infobar-heading').css(infobar);
		$('#interface2 #infobar-heading img').attr('src',"images/interface2/infobar-howto-text.png");
		if(!animate)
			$('#interface2 #infobar-heading').css({'left':'48px'});
		else{
			$('#interface2 #infobar-heading').delay(100).animate({'left':'63px'},600,function(){
				$('#interface2 #infobar-heading').animate({'left':'53px'},100,function(){
					 playSound(sounds["voices"]["others"][0]);
				});
			});
		}
	}else if(page == 'editorial'){
		animate = false;
		if(interfaceObj.imageNum >= 0 && interfaceObj.imageNum <= 4){
			editorialNum = 0;
			$('#old-user-icon').hide();
			$('#last-leave-icon').hide();
		}else if(interfaceObj.imageNum >= 5 && interfaceObj.imageNum <= 6 ){
			editorialNum = 1;
		}else if(interfaceObj.imageNum >= 7 && interfaceObj.imageNum <= 8){
			editorialNum = 2;
		}else if(interfaceObj.imageNum >= 9 && interfaceObj.imageNum <= 11){
			editorialNum = 3;
		}else if(interfaceObj.imageNum >= 12 && interfaceObj.imageNum <= 13){
			editorialNum = 4;
		}else if(interfaceObj.imageNum == 14){
			editorialNum = 5;
		}else if(interfaceObj.imageNum == 15){
			editorialNum = 6;
		}
		if(interfaceObj.imageNum == 0 || interfaceObj.imageNum == 5 || interfaceObj.imageNum == 7 || interfaceObj.imageNum == 9 || interfaceObj.imageNum == 12 || interfaceObj.imageNum == 14 ){
			animate = true;
		}
		var infobar = {
			'position': 'absolute',
			'left': interface2editorials["left"][editorialNum] + 'px',
			'top': interface2editorials["top"][editorialNum] + 'px',
			'width' : interface2editorials["width"][editorialNum] + 'px',
			'height' :49 + 'px' ,
			'background' : 'url(images/interface2/editorial/'+ interface2editorials["heading"][editorialNum]+'-bg.png)'
		};
		$('#interface2 #infobar-heading').css(infobar);
		$('#interface2 #infobar-heading img').attr('src','images/interface2/editorial/'+interface2editorials["heading"][editorialNum]+'.png');
		if(!animate)
			$('#interface2 #infobar-heading').css({'left':interface2editorials["animWidth"][editorialNum]+'px'});
		else{
			$('#interface2 #infobar-heading').animate({'left':interface2editorials["animWidth"][editorialNum]+10+'px'},600,function(){
				$('#interface2 #infobar-heading').animate({'left':interface2editorials["animWidth"][editorialNum]+'px'},100,function(){
					playSound(sounds["voices"]["editorial"][editorialNum]);
				});
			});
		}
	}
}

function interface2Prev(){
	updateLinkIcons();
	if(interfaceObj.interface2 == "howto"){
			if(interfaceObj.imageNum <= 11)
				$('#navigation-bottom .right').show();
				
			interfaceObj.imageNum = interfaceObj.imageNum - 1;
			if(interfaceObj.imageNum < 0)
				interfaceObj.imageNum = 0;
			if(interfaceObj.imageNum == 0)
				$('#interface2 #old-user-direction-text').hide();
			animateHeading('howto');
			showPicture('#interface2 #slides','<img src="images/interface2/how-to/howto-'+interfaceObj.imageNum+'.gif" />',interface2positions["top"][interfaceObj.imageNum],interface2positions["left"][interfaceObj.imageNum]);
	}
	else if(interfaceObj.interface2 == "editorial"){
		if(interfaceObj.imageNum == 0){
			howto(10);
		}else{
			interfaceObj.imageNum = interfaceObj.imageNum - 1;
			animateHeading('editorial');
			
			pageId = interfaceObj.imageNum+1;
			$('#interface2 #slides').html($('#editorial-pages #page-'+pageId).html());
		}
	}
}

function interface2Next(){
	updateLinkIcons();
	if(interfaceObj.interface2 == "howto"){
		if(interfaceObj.imageNum != 10){
			$('#navigation-bottom .left').show();
			if(interfaceObj.imageNum == 10 && isLoggedIn()){
				$('#navigation-bottom .right').hide();
			}else{
				$('#navigation-bottom .left').show();
				$('#navigation-bottom .right').show();
			}
			interfaceObj.imageNum = interfaceObj.imageNum + 1;
			//animateHeading('howto');
			showPicture('#interface2 #slides','<img src="images/interface2/how-to/howto-'+interfaceObj.imageNum+'.gif" />',interface2positions["top"][interfaceObj.imageNum],interface2positions["left"][interfaceObj.imageNum]);
		}else{
			editorial();
		}
	}
	else if(interfaceObj.interface2 == "editorial"){
		if(interfaceObj.imageNum != 15){
			interfaceObj.imageNum = interfaceObj.imageNum + 1;
			animateHeading('editorial');
			pageId = interfaceObj.imageNum+1;
			$('#interface2 #slides').html($('#editorial-pages #page-'+pageId).html());
		}else{
			entry();
		}
	}
}
function showLoading(){
	$('.pop-up-box').hide();
	$('#loading').show();
	$('#interface3 #slides').empty();
	$('#score-sheet').hide();
	$('#overLaylayer').hide()
	$('#slides').html('<img id="" src="images/loading.gif">');
}
/* ------- End Interface2 -------- */

/* ------- Interface3 -------- */
function nextLesson(){
	//showLoading();
	var lessNo = parseInt(interfaceObj.lessonNum) + 1;
	if(lessNo > NUM_OF_LESSONS){
		lessNo = NUM_OF_LESSONS;
	}
	interfaceObj.exerciseNum = 1;
	lessonManage(lessNo,1);
}
function exercisePassed(){
	var newScore = '';
	var userScore = getScore();
	
	var totalExerciseNum = 0;
	for(i = 0;i < interfaceObj.lessonNum-1;i++){
		totalExerciseNum += lessonInfo[interfaceObj.lessonName]['numExercises'];
	}
	totalExerciseNum += interfaceObj.exerciseNum;
	if(totalExerciseNum > userScore)
		return false;
	else
		return true;
}
function nextExercise(){
	interfaceObj.exerciseNum = interfaceObj.exerciseNum + 1;
	exercise();
}
function prevTraining(){
	document.title = 'Lesson'+interfaceObj.lessonNum+' : Page '+interfaceObj.pageNum;
	$('#navigation-bottom .right').show();
	if(interfaceObj.pageNum == 1){
		$('#navigation-bottom .left').hide();
	}
	$('#interface3 #slides #'+interfaceObj.lessonName).html($('#lessons #'+interfaceObj.lessonName+' #training #page-'+interfaceObj.pageNum).html());
	if(interfaceObj.lessonNum == 2 && interfaceObj.pageNum == 7){
		supplyCycleLesson();
	}else if(interfaceObj.lessonNum == 3 && interfaceObj.pageNum == 11){
		symbolMouseOver();
	}
	updateLastLoc('Training');
}
function nextTraining(){
	//controlElements('Training');
	if(interfaceObj.pageNum == 1)
		$('#navigation-bottom .left').hide();
	else
		$('#navigation-bottom .left').show();
/*	if(interfaceObj.lessonNum == NUM_OF_LESSONS && interfaceObj.pageNum == lessonInfo[interfaceObj.lessonName]["totalPages"] && !isLoggedIn()){
		$('#navigation-bottom .right').hide();
	}*/
	document.title = 'Lesson'+interfaceObj.lessonNum+' : Page '+interfaceObj.pageNum;
	$('#interface3 #slides #'+interfaceObj.lessonName).html($('#lessons #'+interfaceObj.lessonName+' #training #page-'+interfaceObj.pageNum).html());
	if(interfaceObj.lessonNum == 2 && interfaceObj.pageNum == 7){
		supplyCycleLesson();
	}else if(interfaceObj.lessonNum == 3 && interfaceObj.pageNum == 11){
		symbolMouseOver();
	}
	updateLastLoc();
}
/* ------- End Interface3 -------- */

/* TOC */
/* Interface2 */
$('.sub-lesson .sub-lesson-text .sub-texts').live('click',function(){
	var subLessonNum = $(this).attr('id');
	subLessonNum = subLessonNum.substring(7);
	if(lessonId > lessonRead){
		popToc();
	}else{
		$('#tray').hide();
		lessonNum = lessonName.substring(6);
		interface3(lessonNum,lessonInfo[lessonName]["pages"][subLessonNum]);
	}
});
$('#frame .lesson-text').live('mouseover',function(){
	lessonName = $(this).attr('id');
	backgroundName = lessonName + '-mouseover';
	$(this).css('background','url(images/toc/'+backgroundName+'.png)');
	lessonId = lessonName.substring(6);
	$('.sub-lesson').hide();
	$('#subLesson'+lessonId).show();
});

$('#frame .lesson-text').live('click',function(){
		lessonName = $(this).attr('id');
		backgroundName = lessonName + '-mouseover';
		lessonId = lessonName.substring(6);
		$('.sub-lesson').hide();
		if(lessonId > lessonRead){
			popToc();
		}else{
			$('#tray').hide();
			interface3(lessonId,1);
			//$('#subLesson'+lessonId).show();
		}
});
$('#frame .lesson-text').live('mouseout',function(){
	$(this).css('background','url(images/toc/'+lessonName+'.png)');
});

