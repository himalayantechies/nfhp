/*
 * event.js
 * ALl the global events
 */
$(function(){
		$('#slides p.hoverPara,#slides div.hoverPara').live('click',function(){
			if(interfaceObj.mode == "Training"){
				$('#overlayLayerNoOpacity').show();
				$('#paragraphZoom').show();
				$('#paragraphZoom').html('<p class="zoomedPara"></p>');
				$('#paragraphZoom p.zoomedPara').html($(this).html());
				$('#paragraphZoom p.zoomedPara p').removeClass('hoverPara');
				overlayOn = true;
			}
		});

		$('#paragraphZoom').live('click',function(){
			$('#paragraphZoom').empty();
			$('#paragraphZoom').hide();
			$('#overlayLayerNoOpacity').hide();
			overlayOn = false;
		});
	$(".checkBox,.checkBoxTick").live('click',function(){
		playSound(sounds["click"]["button"]);
	    if ($(this).hasClass("checkBox")){
	    	$(this).removeClass("checkBox");
	    	$(this).addClass("checkBoxTick");
	    }else{
	    	$(this).removeClass("checkBoxTick");
	        $(this).addClass("checkBox");
	    }
	    var numOptionChecked = $('.checkBoxTick').length;
	    if(numOptionChecked == lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]["correctOptions"]){
	    	var optionCounter = 0;
	    	$('.checkBoxTick').each(function(index) {
	    		optionRelId = $(this).attr('rel');
	    		optionRelId = optionRelId.substring(6);
	    		opVal = Math.floor(numOptionChecked/optionRelId);
	    		if( opVal >= 1 ){
	    			optionCounter++;
	    		}
	    	  });
	    	if(optionCounter == numOptionChecked)
	    		popRightAnswer();	
	    	else
	    		popWrongAnswer();
	    }
	});

	/* Login page */
	$('#autoComplete .autoComplete-texts').live('click',function(){
		$('input#fullName').focus();
		$('input#fullName').val($(this).html());
		$('#content-icon').show();
		$('#last-leave-icon').show();
		updateLastLocButton();
		userId = $(this).attr('id');
		userId = userId.substring(12);
		var listPositions = new cookieList("nfhpPositions");
		var positions = listPositions.items();
		var position;
		if(positions.length == 1)
			position = positions;
		else
			position = positions[userId];
		$('input#position').val(position);
		$('#autoComplete').hide();
		$('#howto-cd-icon').hide();
	});

	$('input#fullName').live('focus',function(){
		if($(this).val() == ''){
			listAllUserNames();
			$('#howto-cd-icon').hide();
			$('#content-icon').hide();
		}
	});
	$('input#fullName').live('blur',function(e){
		if($(this).val() == ''){
			$('#howto-cd-icon').show();
			//$('#autoComplete').hide();
			// CD show
		}
	});
	$('#login-info').live('click',function(){
		if(interfaceObj.interface2 == 'login')
			$('#autoComplete').hide();
	});
	$('input#fullName').live('keyup',function(e){
		$('input#position').val('');
		autoCompleteNum = $('input#fullName').val();
		if(autoCompleteNum.length == 0){
			listAllUserNames();
			$('#print-now-icon').hide();
		}else{
			var listNames = new cookieList("nfhpNames"); 
			var nfhpNames = listNames.items();
			if(nfhpNames.length > 0){
				autoCompleteMatch = false;
				$('#autoComplete').empty();
				for(i = 0; i < nfhpNames.length; i++){
					var match = true;
					for(j=0;j<autoCompleteNum.length;j++){
						if( autoCompleteNum[j] != nfhpNames[i][j]){
							match = false;
						}
					}
					if(match){
						$('#autoComplete').append('<div id="autoComplete'+i+'" class="autoComplete-texts"></div>');
						$('#autoComplete #autoComplete'+i).html(nfhpNames[i]);
						autoCompleteMatch = true;
						break;
					}
				}
			}
			$('#howto-cd-icon').hide();
			$('#print-now-icon').hide();
			if(!autoCompleteMatch){
				$('#autoComplete').hide();
			}else{
				$('#autoComplete').show();
			}
		}
		
		if($(this).val !=''){
			$('#content-icon').show();
			$('#last-leave-icon').show();
			updateLastLocButton();
		}else{
			$('#content-icon').hide();
			$('#last-leave-icon').hide();
		}
		
	});
	
	/* Intro page and howto page */
	$('#interface2 #slides img').live('click',function(){
		if(interfaceObj.interface2 == "howto"){
			overlayOn = true;
			playSound(sounds["popup"]["pop"]);
			timerHowto = setTimeout("removeHowtoPopUp()",7000);
			$('#overlayLayer').show();
			$('#howto-popup').show();
		}
	});
	
	$('#howto-popup .howto-text-bg .howto-text').live('click',function(){
		playSound(sounds["click"]["button"]);
		removeHowtoPopUp();
	});
	$('#link1 #button-text').live('click',function(){
		playSound(sounds["click"]["button"]);
		interface2('entry');
	});
	$('#link2 #button-text').live('click',function(){
		playSound(sounds["click"]["button"])
		interface2('howto');
	});
	
	/* Lesson Events */
	$('#trayHover').live('mouseover',function(){
		playSound(sounds["hover"]["toc"]);
	});
	$('#trayHover').live('click',function(){
		playSound(sounds["click"]["toc"]);
		animateToc();
	});
	$('.printer-icon,.printer-icon2').live('click',function(){
		//url = nfhpUrl + 'resources/prints/forms/'+interfaceObj.lessonName+'/page-'+interfaceObj.pageNum+'/index.html';
		url = 'resources/prints/forms/'+interfaceObj.lessonName+'/page-'+interfaceObj.pageNum+'/index.html';
		window.open(url, "print certificate","height=700, width=700");
		//pwin = window.open(url,"print form","height=600, width=900");
  	  	//pwin.onload = function () {window.print(); window.close();
	});
	$('#overLayTray').live('click',function(){
		playSound(sounds["click"]["toc"]);
		tocBack();
	});

	/* Popup events  */
	// Print certificate
	$('.print-now').live('click',function(){
		overlayOn = false;
		playSound(sounds["click"]["button"]);
		url = 'resources/prints/certificate/index.html';
		window.open(url, "print certificate","height=700, width=700");
	});
	$('.print-now-text').live('click',function(){
		overlayOn = false;
		playSound(sounds["click"]["button"]);
		if(checkCookie()){
			printCertificate();
		}else{
			popWrongInput();
		}
	});
	
	$('.print-success').live('click',function(){
		overlayOn = false;
		playSound(sounds["click"]["button"]);
		var printStatus = new cookieList("nfhpPrintStatus");
		var status = printStatus.items();
		var newStatus='';
		var nfhpId = $.cookie('nfhpId'); 
		if(status.length == 1){
			newStatus = 1;
		}else{
			status[nfhpId-1] = 1;
			for(i=0;i<status.length;i++){
				newStatus += status[i];
				if(i == status.length-1){
					newStatus+='';
				}else{
					newStatus+=',';
				}
			}
		}
		$.cookie('nfhpPrintStatus',newStatus,{expires: expireDays,path:'/'});
		nfhpExit();
	});
	
	$('.print-later').live('click',function(){
		overlayOn = false;
		playSound(sounds["click"]["button"]);
		nfhpExit();
	});
	
	// pop wrong answer
	$('.retry-exercise').live('click',function(){
		overlayOn = false;
		playSound(sounds["click"]["button"]);
		exercise();
	});
	$('.re-read-lesson').live('click',function(){
		overlayOn = false;
		playSound(sounds["click"]["button"]);
		lessonManage(interfaceObj.lessonNum,1);
	});
	
	// Exit pop up
	$('.exit-yes-no .exit-yes').live('click',function(){
		overlayOn = false;
		playSound(sounds["click"]["button"]);
		nfhpExit();
	});
	$('.exit-yes-no .exit-no').live('click',function(){
		overlayOn = false;
		playSound(sounds["click"]["button"]);
		if(interfaceObj.mode == 'Exercise')
			$('#score-sheet').show();
		
		$('#overlayLayer').hide();
		$('#exit-popup').hide();
	});
	
	// Access Denied popup
	$('.access-user').live('click',function(){
		overlayOn = false;
		playSound(sounds["click"]["button"]);
		$('#overlayLayer').hide();
		$('#access-denied').hide();
		interface2('login');
	});
	
	$('.access-visitor').live('click',function(){
		overlayOn = false;
		playSound(sounds["click"]["button"]);
		$('#overlayLayer').hide();
		$('#access-denied').hide();
	});

	// Wrong Input
	$('.wrong-input-next-text').live('click',function(){
		overlayOn = false;
		playSound(sounds["click"]["button"]);
		$('#overlayLayer').hide();
		$('#wrong-input').hide();
	});
	// Pop max user
	$('.max-user-next-text').live('click',function(){
		overlayOn = false;
		playSound(sounds["click"]["button"]);
		$('#overlayLayer').hide();
		$('#max-user').hide();
		$('#wrong-input').hide();
		toc();
	});
	//Pop right answer
	$('.right-answer-next-text').live('click',function(){
		overlayOn = false;
		playSound(sounds["click"]["button"]);
		nextExercise();
	});
	$('.right-answer-next-lesson').live('click',function(){
		overlayOn = false;
		playSound(sounds["click"]["button"]);
		nextLesson();
	});
	
	//howto cd link
	$('.howto-cd-text').live('click',function(){
		overlayOn = false;
		playSound(sounds["click"]["button"]);
		$('#howto-cd-icon').hide();
		howto();
	});
	//print popup
	$('#pop-certificate .pop-certificate').live('click',function(){
		playSound(sounds["click"]["button"]);
		$('#pop-certificate').hide();
		printCertificate();
	});
	//Exam passed link
	$('#exams-passed .exams-passed-exit').live('click',function(){
		$('#exams-passed').hide();
		overlayOn = false;
		playSound(sounds["click"]["button"]);
		nfhpExit();
	});
	$('#exams-passed .exams-passed-toc').live('click',function(){
		$('#exams-passed').hide();
		overlayOn = false;
		playSound(sounds["click"]["button"]);
		interface2("toc");
		
	});
	//Visiotor last link
	$('#visitor-last .visitor-last-exit').live('click',function(){
		$('#visitor-last').hide();
		overlayOn = false;
		playSound(sounds["click"]["button"]);
		nfhpExit();
	});
	$('#visitor-last .visitor-last-user').live('click',function(){
		$('#visitor-last').hide();
		overlayOn = false;
		playSound(sounds["click"]["button"]);
		interface2("login");
		
	});
	/*Exit confirm page*/
	$('#exit-page #exit-1 #exit-confirm-icon #exit-confirm-text').live('click',function(){
		overlayOn = false;
		playSound(sounds["click"]["button"]);
		exitCD();
	});
			
	/* ------- Global Events -------- */
	$('#navigation-top .help').live('click',function(ev){
		overlayOn = false;
		ev.stopPropagation();
		playSound(sounds["click"]["button"]);
		if(interfaceObj.id == 3){
			interface2('howto');
		}else{
			howto();
		}
	});
	$('#navigation-top .exit').live('click',function(){
		overlayOn = false;
		playSound(sounds["click"]["button"]);
		popExit();
	});

	$('#navigation-bottom .left').live('click',function(){
		truckLeft();
	});
	$('#navigation-bottom .right').live('click',function(){
		truckRight();
	});
	$('#last-leave-icon').live('click',function(ev){
		playSound(sounds["click"]["button"]);
		ev.stopPropagation();
		if(interfaceObj.interface2 == "login"){
			if($('input#fullName').val() !='' && $('input#position').val() !='' && $('input#citizenNum').val() !=''){
				if(checkCookie()){
					gotoLastLoc();
				}else{
					popWrongInput();
				}
			}else{
				popWrongInput();
			}
		}else{
			if(isLoggedIn()){
				gotoLastLoc();
			}else{
				popWrongInput();
			}
		}
		
	});

	$('#content-icon .content-text').live('click',function(){
		playSound(sounds["click"]["button"]);
		//if the user successfully logs in or it is his first time
		 if($('input#fullName').val() !='' && $('input#position').val() !='' && $('input#citizenNum').val() !=''){
			if(checkCookie()){
				toc();
			}else{
				popWrongInput();  //clear userid until it is logged in
			}
		 }else{
			 popWrongInput();
		 }
	});
	$('#old-user-icon').live('click',function(){
		playSound(sounds["click"]["button"]);
		login();
	});
	$('#user-icon').live('click',function(){
		playSound(sounds["click"]["button"]);
		login();
	});
	$('#visitor-icon').live('click',function(){
		playSound(sounds["click"]["button"]);
		if($.cookie('nfhpId')!= null)
			$.cookie('nfhpId',null,{expires:expireDays,path:'/'});
		toc();
	});
	/* ------- End Global Events -------- */
});
