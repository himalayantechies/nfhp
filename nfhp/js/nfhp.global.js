$(function(){  
	var listNames = new cookieList("nfhpNames");
	if(listNames.items() == null || listNames.items() == ''){
		firstTimeUse = true;
	}else{ firstTimeUse = false;}
});

/* Audio and Image preloader */
function loadImage(uri){
    var img = new Image();
    img.onload = isAppLoaded;
    img.src = uri;
    return img;
}

function loadAudio(uri){
    var audio = new Audio();
    audio.addEventListener('canplaythrough', isAppLoaded, false); // It works!!
    audio.src = uri;
    return audio;
}
function isAppLoaded(){}
/* Audio and Image preloader ends */

var cookieList = function(cookieName) {
	//When the cookie is saved the items will be a comma seperated string
	//So we will split the cookie by comma to get the original array
	var cookie = $.cookie(cookieName);
	//Load the items or a new array if null.
	var items = cookie ? cookie.split(/,/) : new Array();
	return {
	    "add": function(val) {
	        items.push(val);
	        $.cookie(cookieName, items.join(','),{expires : expireDays,path:'/'});
	    },
	    "clear": function() {
	        items = null;
	        $.cookie(cookieName, null);
	    },
	    "items": function() {
	        return items;
	    }    	
	  }
}  

//check if any user is logged in
function isLoggedIn(){
	nfhpId = $.cookie('nfhpId');
	if(nfhpId == null || nfhpId == '')
		return false;
	else 
		return true;
}
function isLastExercise(){  //check whether the given exercise is last or not
	if(interfaceObj.exerciseNum >= numExercises[interfaceObj.lessonNum-1] ){
		return true;
	}else{
		return false;
	}
}
function getScore(){
	var scoreLists = new cookieList('nfhpScores');
	var scoreNums = scoreLists.items();
	var userScore = scoreNums[nfhpId-1]; 
	userScore = parseInt(userScore);
	return userScore;
}
function gotoLastLoc(){
	var listLastLoc = new cookieList('nfhpLastLoc');
	var locs = listLastLoc.items();
	var currentLoc = locs[nfhpId-1];
	splittedLoc = currentLoc.split('-');
	var lessonNum =  splittedLoc[0];
	var lessonName = 'lesson'+lessonNum;
	pageNum = parseInt(splittedLoc[1]);
	if(pageNum > lessonInfo[lessonName]['totalPages']){
		var exerciseNum = pageNum - lessonInfo[lessonName]['totalPages'];
		interface3(lessonNum,exerciseNum,true);
	}else{
		interface3(lessonNum,pageNum);
	}
} 

function checkCookie(){
	//get all the cookies
	var listNames = new cookieList("nfhpNames"); 
	var listPositions = new cookieList("nfhpPositions");
	var listCitizenNums = new cookieList("nfhpCitizenNums");
	var listScores = new cookieList("nfhpScores");
	var listLastLoc = new cookieList("nfhpLastLoc");
	var printStatus = new cookieList("nfhpPrintStatus");

	var nfhpNames = listNames.items();
	var nfhpPositions = listPositions.items();
	var nfhpCitizenNums = listCitizenNums.items();
	
	if(listNames != null || listNames == ''){
		noCookie = false;
	}else{
		noCookie = true;
	}
	
	if(interfaceObj.interface2 == "login"){
		form_fullName = $('input#fullName').val();
		form_position = $('input#position').val();
		form_citizenNum = $('input#citizenNum').val();
		var userId;
		for(i = 0;i < nfhpNames.length;i++){
			if(nfhpNames[i] == form_fullName){
				userId = i+1;
				$.cookie('nfhpId',userId,{expires:expireDays,path:'/'});
				break;
			}
		}
		if(!userId){
			if(nfhpNames.length != MAX_USERS){
				if($.inArray(form_citizenNum, nfhpCitizenNums) != -1){
					return false;
				}else{
					listNames.add(form_fullName);
					listPositions.add(form_position);
					listCitizenNums.add(form_citizenNum);
					listScores.add(0);
					listLastLoc.add('1-1');
					printStatus.add(0);
					$.cookie('nfhpId',nfhpNames.length,{expires : expireDays,path:'/'});
					return true;
				}
			}else{
				$.cookie('nfhpId',null);  //clear userid until it is logged in
				popMaxUser();
			}
		}else{
			if(nfhpCitizenNums[userId-1] == form_citizenNum){
				return true;
			}else{
				return false;
			}
		}
	}
}
/* ------- End Cookie Functions -------- */

/* ------- Global Functions -------- */
//function for updating icons according to the current actions 

//generate random numbers between 0 to maxNumber excluding MaxNumber
function generateRandomNumbers(maxNumber){
	arr = [];
	while(arr.length < maxNumber){
		var randomnumber=Math.floor(Math.random()*maxNumber);
	     var found=false;
	     for(var i=0;i<arr.length;i++){
	       if(arr[i]==randomnumber){found=true;break}
	     }
	     if(!found)arr[arr.length]=randomnumber;
  }
	return arr;
}
function generateRandomNumber(maxNumber){
	var randomnumber=Math.floor(Math.random()*maxNumber);
	return randomnumber;
}
function updateLinkIcons(){ //for howto and editorial
	$('#interface2 #old-user-direction-text').hide();
	if(isLoggedIn()) {  //he is already logged in
		$('#last-leave-icon').show().css('bottom','88px');
		$('#old-user-icon').hide();
	}else if(firstTimeUse){
		$('#old-user-icon').hide();
		$('#last-leave-icon').hide();
	}else{
		$('#old-user-icon').show();
		$('#last-leave-icon').hide();
	}
}
function updateIcons(){
	$('#interface2 #slides').empty();
	$('#slides').css({'top':0, 'left':'170px'});
	$('#tray').hide();
	$('#interface2 #login-form').hide();
	$('#interface2 #old-user-direction-text').hide();
	$('#interface2 #last-leave-icon').hide();
	$('#interface2 #content-icon').hide();
	$('#interface2 #user-icon').hide();
	$('#interface2 #visitor-icon').hide();
	$('#overlayLayer').hide();
	$('#print-now-icon').hide();
	$('#old-user-icon').hide();
	if(interfaceObj.id == 2){  //interface2
		if(interfaceObj.interface2 == "howto"){
			document.title = 'NFHP : How to use CD';
			$('#navigation-bottom').show();
		}else if(interfaceObj.interface2 == "editorial"){
			document.title = 'NFHP : Editorial';
			$('#navigation-bottom').show();
			$('#old-user-icon').show();
			$('#user-icon').hide();
			$('#visitor-icon').hide();
			$('#navigation-bottom .right').show();
		}else if(interfaceObj.interface2 == "entry"){
			document.title = 'NFHP : Entry Page';
			$('#navigation-bottom').hide();
			$('#interface2 #user-icon').show();
			$('#interface2 #visitor-icon').show();
		}else if(interfaceObj.interface2 == "login"){
			document.title = 'NFHP : Login Page';
			$('#interface2 #login-form').show();
			$('#navigation-bottom').hide();
			$('#old-user-icon').hide();
			$('#user-icon').hide();
			$('#visitor-icon').hide();
		}else if(interfaceObj.interface2 == "toc"){
			$('#interface2 #tray').show();
			document.title = 'NFHP : Table of Contents';
			$('#navigation-bottom').hide();
		}
	}
	
}
	
//show picture inside given div
function showPicture(divName,imgName,topPos,leftPos){
	var imgCss = {
			'position':'absolute',
			'top':topPos+'px',
			'left':leftPos+'px'
		};
	$(divName).css(imgCss).html(imgName);
}
function playSound(sound,load){
	if(interfaceObj.id == "2"){
		for(i=0;i<sounds["voices"]["editorial"].length;i++)
			sounds["voices"]["editorial"][i].pause();
	}else if(interfaceObj.id == "3"){
		sounds["voices"]["lessons"][interfaceObj.lessonNum-1].pause();
		sounds["hover"]["scoresheet"].pause();
		sounds["drop"]["dropped"].pause();
	}
	sounds["click"]["exercise"].pause();
	sounds["click"]["training"].pause();
	for(i=0;i<sounds["voices"]["others"].length;i++)
		sounds["voices"]["others"][i].pause();
	sounds["click"]["button"].pause();
	sounds["click"]["truck"].pause();
	sounds["click"]["toc"].pause();
	
	sounds["hover"]["toc"].pause();
	
	sounds["popup"]["pop"].pause();
	if(!load)
		sound.currentTime = 0;
	sound.play();
}

function truckLeft(){
	$("#paragraphZoom").hide();
	if(interfaceObj.id == 2){
			//truckSound();
			playSound(sounds["click"]["truck"]);
			$('#navigation-bottom .left').animate({right:'+=700px'},1000,function(){
				interface2Prev();
				repositionTruck('left');
			});
	}else{
		if(interfaceObj.pageNum != 1){
			playSound(sounds["click"]["truck"]);
			$('#navigation-bottom .left').animate({'right':'+=900px'},1000,function(){
					interfaceObj.pageNum--;
					if(interfaceObj.pageNum < 1){
						interfaceObj.pageNum = 1;
					}
					prevTraining();
					repositionTruck('left');
			});
		}
	}
}
function truckRight(){
	$("#paragraphZoom").hide();
	if(interfaceObj.id == 2){
			playSound(sounds["click"]["truck"]);
			$('#navigation-bottom .right').animate({right:'-=132px'},400,function(){
					sounds["click"]["truck"].pause();
					interface2Next();
					repositionTruck('right');
			});
	}else{
		if(interfaceObj.lessonNum == NUM_OF_LESSONS && interfaceObj.pageNum >= lessonInfo[interfaceObj.lessonName]["totalPages"] && !isLoggedIn()){
			popVisitorLast();
		}
		else if(interfaceObj.pageNum != lessonInfo[interfaceObj.lessonName]["totalPages"]){
			playSound(sounds["click"]["truck"]);
			$('#navigation-bottom .right').animate({'right':'-=132px'},400,function(){
					sounds["click"]["truck"].pause();
					interfaceObj.pageNum = interfaceObj.pageNum + 1;
					repositionTruck('right');
					nextTraining();
			});
		}else{
			user = $.cookie('nfhpId');
			if(user == null || user ==''){
				nextLesson();	
			}else{
				playSound(sounds["click"]["exercise"]);
				updateLastLoc('exercise');
				exercise();
			}
		}
	}
}
function repositionTruck(truck){
	if(truck == 'right'){
		var truckRightCss = {
				'position':'absolute',  'bottom': '21px', 'right':'36px',
				'z-index':2
		}
		$('#navigation-bottom .right').css(truckRightCss);
	}else{
		var truckLeftCss = {
				'position':'absolute',  'bottom': '21px', 'right':'145px',
				'z-index':2
		}
		$('#navigation-bottom .left').css(truckLeftCss);
	}
}
function nfhpExit(){
	if($.cookie('nfhpId')!=null)
		$.cookie('nfhpId',null,{expires:expireDays,path:'/'});
	exitConfirm();
}

function updateLastLoc(exercise){
	if(isLoggedIn){
		var lastLocLists = new cookieList('nfhpLastLoc');
		var locs = lastLocLists.items();
		var newLocs = '';
		nfhpId = $.cookie('nfhpId');
		//var userLastLoc = locs[nfhpId-1];
		var newUserLoc;
		if(exercise == 'exercise'){
			newPage = lessonInfo[interfaceObj.lessonName]['totalPages'] + interfaceObj.exerciseNum;
			newUserLoc = interfaceObj.lessonNum +'-'+newPage;
		}else{
			newUserLoc = interfaceObj.lessonNum +'-'+interfaceObj.pageNum;
		}
		if(locs.length == 1){
			newLocs = newUserLoc;
		}else{
			locs[nfhpId-1] = newUserLoc;
			for(i=0;i<locs.length;i++){
				newLocs += locs[i];
				if(i == locs.length-1){
					newLocs+='';
				}else{
					newLocs+=',';
				}
			}
		}
		$.cookie('nfhpLastLoc',newLocs,{expires: expireDays,path:'/'});
	}
	
}
function updateScore(){
	var scoreLists = new cookieList('nfhpScores');
	var scoreNums = scoreLists.items();
	var newScore = '';
	nfhpId = $.cookie('nfhpId');
	var userScore = scoreNums[nfhpId-1]; 
	userScore = parseInt(userScore);
	var currentExNum = 0;
	for(i=0;i<NUM_OF_LESSONS;i++){
		if(i == interfaceObj.lessonNum-1){
			break;
		}
		currentExNum += numExercises[i];
	}
	currentExNum = parseInt(currentExNum);
	x = parseInt(interfaceObj.exerciseNum);
	var myExNum = currentExNum + x;
	if(userScore <= myExNum-1){
		if(scoreNums.length == 1){
			newScore = parseInt(scoreNums) + 1;
		}else{
			scoreNums[nfhpId-1] = userScore+1;
			for(i=0;i<scoreNums.length;i++){
				newScore += scoreNums[i];
				if(i == scoreNums.length-1){
					newScore+='';
				}else{
					newScore+=',';
				}
			}
		}
		$.cookie('nfhpScores',newScore,{expires: expireDays,path:'/'});
	}
	updateLastLoc('exercise');
}

/* popups*/
function removeHowtoPopUp(){
	$('#overlayLayer').hide();
	$('#howto-popup').hide();
	clearTimeout(timerHowto);
}
function popExamsPassed(){
	overlayOn = true;
	$('#overlayLayer').show();
	playSound(sounds["popup"]["pop"]);
	$('#exams-passed').show();
}
function popVisitorLast(){
	overlayOn = true;
	playSound(sounds["popup"]["pop"]);
	$('#overlayLayer').show();
	$('#visitor-last').show();
}
function popCertificate(){
	overlayOn = true;
	$('#overlayLayer').show();
	playSound(sounds["popup"]["pop"]);
	$('#pop-certificate').show();
}
function popAccessDenied(){
	overlayOn = true;
	playSound(sounds["popup"]["pop"]);
	$('#overlayLayer').show();
	$('#access-denied').show();
}
function printCertificate(){
	overlayOn = true;
	playSound(sounds["popup"]["pop"]);
	//$('#interface'+interfaceObj.id).append('<div id="overlayLayer"></div>');	
	$('#overlayLayer').show();
	$('#print-certificate').show();
}
function popWrongInput(){
	overlayOn = true;
	playSound(sounds["popup"]["pop"]);
	//$('#interface'+interfaceObj.id).append('<div id="overlayLayer"></div>');	
	$('#overlayLayer').show();
	$('#wrong-input').show();
}
function popMaxUser(){
	overlayOn = true;
	playSound(sounds["popup"]["pop"]);
	//$('#interface'+interfaceObj.id).append('<div id="overlayLayer"></div>');	
	$('#overlayLayer').show();
	$('#max-user').show();
}
function popRightAnswer(){
	overlayOn = true;
	playSound(sounds["popup"]["pop"]);
	updateScore();
	var printStatus = new cookieList("nfhpPrintStatus");
	var nfhpScores = new cookieList("nfhpScores");
	var scores = nfhpScores.items();
	var status = printStatus.items();
	if(interfaceObj.lessonNum == NUM_OF_LESSONS && interfaceObj.exerciseNum == 2){ 
		if(status[nfhpId-1] == 1)
			popExamsPassed();
		else
			popCertificate();
	}else{	
		$('#overlayLayer').show();
		$('#right-answer').show();
		if(isLastExercise()) 
			$('.right-answer-next').html('<div class="right-answer-next-lesson"></div>');
		else
			$('.right-answer-next').html('<div class="right-answer-next-text"></div>');
	}
}

function popWrongAnswer(){
	numTrials = numTrials + 1;
	if(numTrials >= lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]["numTrials"]){
		$('#wrong-answer .retry-texts #retryExercise').hide();
		$('#wrong-answer .retry-texts #readLesson').css('margin-left','124px');
	}else{
		$('#wrong-answer .retry-texts #readLesson').css('margin-left','20px');
		$('#wrong-answer .retry-texts #retryExercise').show();
	}
	overlayOn = true;
	playSound(sounds["popup"]["pop"]);
	$('#overlayLayer').show();
	$('#wrong-answer').show();		
}

function popExit(){
	overlayOn = true;
	playSound(sounds["popup"]["pop"]);
	$('#overlayLayer').show();
	$('#exit-popup').show();
}

function popToc(){
	overlayOn = true;
	playSound(sounds["popup"]["pop"]);
	$('#overlayLayer').show();
	$('#toc-popup').show();
}
$('.toc-text-bg .toc-text').live('click',function(){
	playSound(sounds["click"]["button"]);
	$('#overlayLayer').hide();
	$('#toc-popup').hide();
});





/* ------- End Global Functions -------- */


