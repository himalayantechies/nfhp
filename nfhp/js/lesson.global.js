var dragId;  //object Id being currently dragged
// Keep Track of the training numbers and number of pages in it.
var exerciseName;
var animToc = false;
var animScore = false;
var draggedCounter = 0;
var topPos,leftPos,navTop,navLeft;
var imgWidth,imgHeight;
var animTime = 500,animTop = 200,animLeft = 200;
var stopDown; // for table zoom with scrolling
var stopUp; // for table zoom with scrolling
var optionCounter=0;
var dragLimit ="#interface3 #slides";
function exercise(){
	document.title = 'Lesson'+interfaceObj.lessonNum+' : Exercise '+interfaceObj.exerciseNum;
	interfaceObj.exerciseName = "exercise"+interfaceObj.exerciseNum;
	$('.exerciseTitle').html('cEof; '+ exerciseNumbers[interfaceObj.exerciseNum]);
	controlElements("Exercise");
	$('#interface3 #slides #'+interfaceObj.lessonName).html('<div id="'+interfaceObj.exerciseName+'" class="exercises"></div>');
	$('#interface3 #slides #'+interfaceObj.lessonName+' #'+interfaceObj.exerciseName).html($('#lessons #'+interfaceObj.lessonName+' #'+interfaceObj.exerciseName).html());
	
	interfaceObj.lessonNum = parseInt(interfaceObj.lessonNum);
	interfaceObj.exerciseNum = parseInt(interfaceObj.exerciseNum);
	switch(interfaceObj.lessonNum){
		case 1:
			if( interfaceObj.exerciseNum == 1){
				lesson1_exercise1();
			}
			break;
		case 2:
			if( interfaceObj.exerciseNum == 1)
				createDragDropLesson();
			else if(interfaceObj.exerciseNum == 2)
				createCheckBoxLessons();
			break;
		case 3:
			if( interfaceObj.exerciseNum == 1)
				createDragDropLesson();
			else if(interfaceObj.exerciseNum == 2)
				lesson3_exercise2();
			else if(interfaceObj.exerciseNum == 3)
				createDragDropLesson();
			else if( interfaceObj.exerciseNum == 4){
				defineDragDropArea(true);
				createDragDropObjects();
			}
			break;
		case 4:
			if(interfaceObj.exerciseNum == 1)
				exercise2Check();
			else if(interfaceObj.exerciseNum == 2)
				lesson4_exercise2();
			break;
		case 5:
			if( interfaceObj.exerciseNum == 1){
				defineDragDropArea(true);
				createDragDropObjects();	
			}
			else if(interfaceObj.exerciseNum == 2){
				defineDragDropArea(true);
				createDragDropObjects();
			}
			else if(interfaceObj.exerciseNum == 3)
				createCheckBoxLessons();
			else if(interfaceObj.exerciseNum == 4)
				createCheckBoxLessons();
			else if(interfaceObj.exerciseNum == 5)
				createDragDropLesson();
			else if(interfaceObj.exerciseNum == 6)
				createDragDropLesson();
			else if(interfaceObj.exerciseNum == 7)
				createDragDropLesson();
			else if(interfaceObj.exerciseNum == 8)
				createDragDropLesson();
			break;
		case 6:
			if( interfaceObj.exerciseNum == 1)
				createCheckBoxLessons();
			else if(interfaceObj.exerciseNum == 2)
				createCheckBoxLessons();
			break;
		case 7:
			if( interfaceObj.exerciseNum == 1)
				createCheckBoxLessons();
			else if(interfaceObj.exerciseNum == 2){
				defineDragDropArea(true);
				createDragDropObjects();
			}
			else if( interfaceObj.exerciseNum == 3)
				createCheckBoxLessons();
			break;
		case 8:
			if( interfaceObj.exerciseNum == 1)
				createCheckBoxLessons();
			else if(interfaceObj.exerciseNum == 2)
				createCheckBoxLessons();
			break;
	}
}

function animateToc(){
	animToc = true;
	//$('#interface3 #overLayTray').show();
	createTray();
	$('#overLayTray').show();
	var tocImage = '#interface3 #toc-image';
	var tocImage1 = '#interface3 #toc-image-1';
	$(tocImage1).animate({left: '-52px'},1000,function(){
		$(tocImage1).animate({rotate: '0deg'}, 155,function(){
			//new Image
			$(tocImage1).hide();
			$(tocImage).show();
			$(tocImage).animate({rotate: '15deg'}, 200,function(){
				$(tocImage).animate({rotate: '0deg'}, 30,function(){
					$(tocImage).hide();
					$(tocImage1).show();
					$(tocImage1).animate({rotate: '-5deg'}, 100,function(){
						$(tocImage1).animate({rotate: '0deg'}, 50,function(){
							$(tocImage1).hide();
							$('#tray').show();
							animToc = false;
						});
					});
				});
				
			});
		});
	});
}
function tocBack(){
	if(!animToc){
		$('#tray').hide();
		var tocImage = '#interface3 #toc-image';
		var tocImage1 = '#interface3 #toc-image-1';
		$(tocImage1).show();
		$(tocImage1).animate({rotate: '-30deg'}, 500,function(){
			$(tocImage1).animate({left: '-542px'},1000,function(){
				$('#overLayTray').hide();
			});	
		});
	}
}
function tableZoom(){
	//Table zoom
	$('#interface3 #score-text').hide();
	$('#interface3 #toc-image-1').hide();
	$('#interface3 #trayHover').hide();
	$('#navigation-bottom').hide();
	$('.bottom-line').hide();
	$('#interface3 #slides').hide();
	$('#interface3 #table-zoom').show();
	imgWidth = $('#interface3 #table-zoom img').css('width');
	imgHeight = $('#interface3 #table-zoom img').css('height');
	imgWidth = parseInt(imgWidth);
	imgHeight = parseInt(imgHeight);
	if(imgWidth <= 1024 && imgHeight <= 685){
		newHeight = imgHeight;
		if(imgHeight < 685/1.5)
			newHeight = 500;
		
		var newLeft = 3+((1024/imgWidth-1)*400);
		var newTop = 90+((685/newHeight-1)*300);
		tableCss = {
				top : newTop+'px',
				left : newLeft+'px',
				width : imgWidth+'px',
				height : imgHeight+'px'
		};
		$('#interface3 #table-zoom').css(tableCss);
	}
	else if(imgHeight >= 540 && imgWidth <= 865){
		stopDown = false;
		stopUp = true;
		$('#interface3').append('<div id="table-navigation-up-down"></div>');
		$('#table-navigation-up-down').append('<div id="table-up" class="arrow-up"></div>');
		$('#table-navigation-up-down').append('<div id="table-down" class="arrow-down"></div>');
		var newLeft = 3+((865/imgWidth-1)*8000);
		if(newLeft>500){
			newLeft = 20; 
		}
		var newTop = 90;
		tableCss = {
				width : '865px',
				height : '670px',
				top : newTop+'px',
				left : newLeft+'px' 
		};
		$('#interface3 #table-zoom').css(tableCss);
	}else if(imgHeight < 540 && imgWidth > 865){
		$('#interface3').append('<div id="table-navigation-left-right"></div>');
		$('#table-navigation-left-right').append('<div id="table-left" class="arrow-left"></div>');
		$('#table-navigation-left-right').append('<div id="table-right" class="arrow-right"></div>');
		//$('#table-navigation-left-right').append('<div id="table-print-down" class="printer-icon"></div>');
		var newLeft = 3;
		var newTop = 90+((540/imgHeight-1)*300);
		tableCss = {
				width : '1024px',
				height : '540px',
				top : newTop+'px',
				left : newLeft+'px' 
		};
		$('#interface3 #table-zoom').css(tableCss);
	}
	topPos = $('#interface3 #table-zoom').css('top');
	leftPos = $('#interface3 #table-zoom').css('left');
	topPos = parseInt(topPos);
	leftPos = parseInt(leftPos);
	navTop= topPos,navLeft = leftPos;
}

function lessonManage(lessonNum,pageNum,exerciseFlag){
		interfaceObj.lessonNum = lessonNum;
		voiceNum = interfaceObj.lessonNum - 1;
		interfaceObj.lessonName = "lesson"+interfaceObj.lessonNum;
		$('#interface3 #slides').html('<div id="'+interfaceObj.lessonName+'"></div>');
		var titleSrc = 'images/lessons/'+interfaceObj.lessonName+'/title.png';
		$('#interface3 #header #lesson-title img').attr('src',titleSrc);
		numTrials = 0;
		if(exerciseFlag){
			interfaceObj.mode = 'Exercise';
			interfaceObj.exerciseNum = pageNum;
			exercise();
		}else{
			interfaceObj.mode = 'Training';
			interfaceObj.pageNum = pageNum;
			if(interfaceObj.pageNum == 1){
				playSound(sounds["voices"]["lessons"][voiceNum]);
			}
			controlElements("Training");
			nextTraining();
		}
}

function createDragDropLesson(){
	defineDragDropArea();
	createDragDropObjects();	
}

function defineDragDropArea(noDropArea){ 
	exerciseName = "exercise"+interfaceObj.exerciseNum;
	var dragAreaCss = {
			position : 'absolute',
			left: lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dragArea'][0] +'px',
			top : lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dragArea'][1] + 'px',
			width: lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dragArea'][2] + 'px',
			height : lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dragArea'][3] + 'px'
	};
	$('#dragArea').css(dragAreaCss);
	
	var dropAreaCss = {
			position : 'absolute',
			left: lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dropArea'][0] +'px',
			top : lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dropArea'][1] + 'px',
			width: lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dropArea'][2] + 'px',
			height : lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dropArea'][3] + 'px'
	};
	$('#dropArea').css(dropAreaCss);
	if(!noDropArea)
		$('#dropArea').css('background','url(images/lessons/'+interfaceObj.lessonName+'/exercise'+interfaceObj.exerciseNum+'/dropArea.png)');
	if(lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dropObjBackgrounds']){
		var numDrops= lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dropObjects'];
		for(i = 0;i<numDrops;i++){
			$('#dropArea').append('<div id ="dropBack'+i+'"></div>');
			dropObjectCss = {
					'position' : 'absolute',
					'top': lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dropObjBackgrounds']["top"][i] + 'px',
					'left': lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dropObjBackgrounds']["left"][i] + 'px',
					'width':  lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dropObjBackgrounds']["width"]+'px',
					'height': lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dropObjBackgrounds']["height"]+'px',
					'z-index':1,
					'background' : 'url(images/lessons/'+interfaceObj.lessonName+'/exercise'+interfaceObj.exerciseNum+'/'+lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]["dropObjBackgrounds"]["background"][i]+'.png)',
			};
			$('#dropBack'+i).css(dropObjectCss);
		}
	}
}

function createDragDropObjects(drag_drop,withinDropArea){
	exerciseName = "exercise"+interfaceObj.exerciseNum;
	var numDrags= lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dragObjects'];
	var numDrops= lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dropObjects'];
	dragObjs = generateRandomNumbers(numDrags);
	$('#dragArea').empty();
	for(i = 0;i<numDrags;i++){
		$('#dragArea').append('<div id ="dragObject'+i+'" class="dragObject"></div>');
		dragObjectCss = {
				'position' : 'absolute',
				'cursor': 'pointer',
				'width':  lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dragObjPositions']["width"],
				'height': lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dragObjPositions']["height"],
				'top': lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dragObjPositions']["top"][i] + 'px',
				'left' : lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dragObjPositions']["left"][i] + 'px',
				'background' : 'url(images/lessons/'+interfaceObj.lessonName+'/exercise'+interfaceObj.exerciseNum+'/'+lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]["questions"][dragObjs[i]]+'.png)',
				'background-repeat' : 'no-repeat',
				'z-index':2
		};
		$('#dragObject'+i).css(dragObjectCss).attr('rel','drag'+dragObjs[i]);
	}
	for(i = 0;i<numDrops;i++){
		if(withinDropArea)
			$('#dropArea').append('<div id ="dropObject'+i+'" class="dragObject dropObject"></div>');
		else
			$('#dragArea').append('<div id ="dropObject'+i+'" class="dragObject dropObject"></div>');
		dropObjectCss = {
				'position' : 'absolute',
				'top': lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dropObjPositions']["top"][i] + 'px',
				'left': lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dropObjPositions']["left"][i] + 'px',
				'width':  lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dropObjPositions']["width"]+'px',
				'height': lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dropObjPositions']["height"]+'px',
				'z-index':1
				//'background' : 'url(images/lessons/'+interfaceObj.lessonName+'/exercise'+interfaceObj.exerciseNum+'/'+lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]["questions"][dragObjs[i]]+'.png)'
				//'border' : '2px solid red'
		};
		$('#dropObject'+i).css(dropObjectCss);
	}
	if(!drag_drop){
		exercise_simple_drag_drop();
	}
}
function exercise_simple_drag_drop() {
	var tol;
	tol = 'touch';
	//'#lesson5 #exercise5 #dragLimit'
	dragLimit ="#interface3 #slides";
	if(interfaceObj.lessonNum == 5){
		if(interfaceObj.exerciseNum == 5 || interfaceObj.exerciseNum == 6 || interfaceObj.exerciseNum == 7 || interfaceObj.exerciseNum == 8)
			dragLimit = '#lesson5 #'+interfaceObj.exerciseName+' #dragLimit';
	}
	if(interfaceObj.lessonNum == 5 && (interfaceObj.exerciseNum == 1 || interfaceObj.exerciseNum == 2))
		tol = 'intersect';
	if(interfaceObj.lessonNum == 7 && interfaceObj.exerciseNum == 2 )
		tol = 'intersect';
	draggedCounter = 0;
	var dragId;
	$( ".dragObject" ).draggable({
		containment: dragLimit,
		start: function() {
			var dropObject,dId;
			dragId = $(this).attr('id');
			dropObject = $(this).attr('drop');
			if(dropObject){
				dId = dropObject.substring(4);
				$('#dropObject'+dId).droppable('enable');
				$(this).removeAttr('drop');
				draggedCounter--;
			}
		}
		//revert if not dropped 
	});
	$( ".dropObject" ).droppable({
		tolerance: tol,
		drop: function(event, ui){
			draggedCounter++;
			var dragObj = $('#'+dragId).attr('rel');
			var draggedId = dragObj.substring(4);
			var newDropCss='';
			if(interfaceObj.lessonNum == 5 && (interfaceObj.exerciseNum == 5 || interfaceObj.exerciseNum == 6 || interfaceObj.exerciseNum == 7 || interfaceObj.exerciseNum == 8)){
				newDropCss = {
						'background' : 'url(images/lessons/lesson5/exercise'+interfaceObj.exerciseNum+'/drop'+draggedId+'.png)',
						'background-repeat':'no-repeat',
						'background-color' : '#fff'
					};
			}
			else{
				newDropCss = {
					'background' : 'url(images/lessons/'+interfaceObj.lessonName+'/'+interfaceObj.exerciseName+'/'+lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]["questions"][draggedId]+'.png)',
					'background-repeat':'no-repeat'
				};
			}
			dropObj = $(this).attr('id');
			droppedId = dropObj.substring(10);
			playSound(sounds["drop"]["dropped"]);
			if(interfaceObj.lessonNum == 5 && (interfaceObj.exerciseNum == 5 || interfaceObj.exerciseNum == 6 || interfaceObj.exerciseNum == 7 || interfaceObj.exerciseNum == 8)){
				$('#'+dragId).hide();
				$(this).css(newDropCss);
			}else if(interfaceObj.lessonNum == 3 && interfaceObj.exerciseNum == 2){
				if(droppedId < 3){
					bottomPos = -70;
				}else{
					bottomPos = -293; 
				}
				newDragCss = {
						bottom : bottomPos + 'px',
						top : 'auto'
				};
				$('#'+dragId).css(newDragCss).attr('drop','drop'+droppedId);
			}else{
				newDragCss = {
						top : $('#dropObject'+droppedId).css('top'),
						left : $('#dropObject'+droppedId).css('left')
						
				};
				$('#'+dragId).css(newDragCss).attr('drop','drop'+droppedId);
			}
			$(this).attr('rel',dragObj);
			
			$(this).droppable('disable');
			answers =  lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]["answers"];
			var numObjects = lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]["dropObjects"];
			
			if ( draggedCounter == numObjects) {
				wrong = false;
				if(interfaceObj.lessonNum == 3 && interfaceObj.exerciseNum == 4){
					if(($('#dropObject0').attr('rel') == answers[0] && $('#dropObject1').attr('rel') == answers[1]) || ($('#dropObject0').attr('rel') == answers[1] && $('#dropObject1').attr('rel')== answers[0])){
						 wrong = false;
						 drag1Rel = $('#dropObject0').attr('rel');
						 drag2Rel = $('#dropObject1').attr('rel');
						 dragObj1 = $('.dragObject[rel='+drag1Rel+']').attr('id');
						 dragObj2 = $('.dragObject[rel='+drag2Rel+']').attr('id');
						 $('.dragObject').css('z-index',1);
						 $('.dropObject').css('z-index',2);
						 $('#dropBack0').animate({'left':'-500px'},2000);
						 $('#'+dragObj1).animate({'left':'-270px'},2000,function(){
							 $('#dropBack1').animate({'left':'-500px'},2800);
							 $('#'+dragObj2).animate({'left':'-260px'},2800,function(){
								 popRightAnswer();
							 });	 
						 });
					}else{
						wrong = true;
						popWrongAnswer();
					}
				}else{
					for (i = 0; i < numObjects; i++) {
						dragObjectRel = $('#dropObject' + i).attr('rel');
						/*dragRelId = dragObjectRel.substring(4);
						if(exerciseName == "exercise4"){
							dragRelId = 6 - dragRelId;
						}*/
						if (answers[i] != dragObjectRel) {
							wrong = true;
							break;
						}
					}
					if (wrong) {
						popWrongAnswer();
					}
					else {
						popRightAnswer();
					}
				}
				
			}
		}
		
	});
}

function createCheckBoxLessons(){
	optionCounter = 0;
	var numOptions= lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['numOptions'];
	$('.ques-options').empty();
	var optionObjs = generateRandomNumbers(numOptions);
	for(i = 0; i < numOptions; i++){
		$('.ques-options').append('<label for "option'+i+'"><span class="optionNe">'+nepaliAlpha[i]+'_ '+lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]["options"][optionObjs[i]]+'</span></label>');
		$('.ques-options').append('<div id ="option'+i+'" class="checkBox">&nbsp;</div>');
		var optionRel = optionObjs[i]+1;
		$('#option'+i).attr('rel','option'+optionRel);
	}
}

function controlElements(domElement){
	overlayOn = false;
	$('#overlayLayer').hide();
	$('.pop-up-box').hide();
	$('#score-sheet').hide();
	$('#interface3 #table-zoom').hide();
	
	$('#navigation-bottom').show();
	$('#navigation-bottom .left').show();
	$('#navigation-bottom .right').show();
	
	$('#trayHover').hide();
	$('#overLayTray').hide();
	if(domElement == 'Exercise'){
		$('#interface3 #slides').css({height:'604px',width: '953px'});
		interfaceObj.mode="Exercise";
		$('#slide-icon #Exercise').attr('class','slide-down');
		$('#slide-icon #Training').attr('class','slide-up');
		$('#slide-virtual #Exercise').attr('class','slide-down');
		$('#slide-virtual #Training').attr('class','slide-up');
		
		$('#slide-virtual .exercise-text-down').show();
		$('#slide-virtual .exercise-text-up').hide();
		$('#slide-virtual .training-text-up').show();
		$('#slide-virtual .training-text-down').hide();
		
		$('#interface3 #toc-image-1').hide();
		$('#navigation-bottom').hide();
		$('.exerciseTitle').show();
		
		$('#score-text').show();
		$('#score-sheet').show();
		
	}else if(domElement = "Training"){
		$('#interface3 #slides').css({height:'auto',width: '888px'}); //820
		interfaceObj.mode="Training";
		$('#slide-icon #Exercise').attr('class','slide-up');
		$('#slide-icon #Training').attr('class','slide-down');
		$('#slide-virtual #Exercise').attr('class','slide-up');
		$('#slide-virtual #Training').attr('class','slide-down');
		
		$('#slide-virtual .exercise-text-up').show();
		$('#slide-virtual .exercise-text-down').hide();
		$('#slide-virtual .training-text-down').show();
		$('#slide-virtual .training-text-up').hide();
		$('#interface3 #toc-image-1').show();
		
		$('.exerciseTitle').hide();
		$('#score-text').hide();
		$('#trayHover').show();
		//Control the inactiveness of the truck
		if(interfaceObj.pageNum == 1){
			$('#navigation-bottom .left').hide();
		}
	}
}

/* lessons functions */
function lesson1_exercise1(){
	//if(!exercisePassed()){
		draggedCounter = 0;
		interfaceObj.exerciseNum = 1;
		controlElements('Exercise');
		defineDragDropArea();
		//drag Area
		var numDrags = lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dragObjects'];
		var numRanDrags= lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['randPositions'];
		dragPos = generateRandomNumber(numRanDrags);
		$('#dragArea').empty();
		for(i = 0;i<numDrags;i++){
			$('#dragArea').append('<div id ="dragObject'+i+'" class="dragObject correct"></div>');
			dragObjectCss = {
					'position' : 'absolute',
					'cursor': 'pointer',
					'width':  lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dragObjPositions']["width"][i] + 'px',
					'height': lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dragObjPositions']["height"][i] + 'px',
					'top': lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dragObjPositions'][dragPos]["top"][i] + 'px',
					'left' : lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dragObjPositions'][dragPos]["left"][i] + 'px',
					'background' : 'url(images/lessons/'+interfaceObj.lessonName+'/exercise'+interfaceObj.exerciseNum+'/drag'+i+'.png)',
					'z-index':2
			};
			$('#dragObject'+i).css(dragObjectCss).attr('rel','drag'+i);
		}
		
		//drop Area
		var numDrops= lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dropObjects'];
		for(i = 0;i<numDrops;i++){
			$('#dropArea').append('<div id ="dropObject'+i+'" class="dropObject"></div>');
			$('#dragArea').append('<div id ="drop'+i+'"></div>');
			dropCss = {
					'position' : 'absolute',
					'top': lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dropPositions']["top"][i] + 'px',
					'left': lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dropPositions']["left"][i] + 'px',
					'width':  lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dropPositions']["width"][i]+'px',
					'height': lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dropPositions']["height"][i]+'px',
					'z-index':1
					
			};
			$('#drop'+i).css(dropCss);
			dropObjectCss = {
					'position' : 'absolute',
					'top': lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dropObjPositions']["top"][i] + 'px',
					'left': lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dropObjPositions']["left"][i] + 'px',
					'width':  lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dropObjPositions']["width"][i]+'px',
					'height': lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dropObjPositions']["height"][i]+'px',
					'z-index':1
			};
			$('#dropObject'+i).css(dropObjectCss);
		}
		lesson1_exercise_1_drag_drop();
	}

function lesson1_exercise_1_drag_drop(){ 
	var draggedCounter = 0;
	var dragCorrect;
	var topPos,leftPos,dropIn,dragId;
	$( ".dragObject" ).draggable({
		containment: "#interface3 #slides",
		//revert: 'valid',
		start: function() {
			dragCorrect = true;
			dragId = $(this).attr('id');
			topPos = $(this).css('top');
			leftPos = $(this).css('left');
			dropObject = $(this).attr('drop');
			if(dropObject){
				dId = dropObject.substring(4);
				$('#dropObject'+dId).droppable('enable');
				$(this).removeAttr('drop');
				draggedCounter--;
			}
		}
		
	});
	$( ".dropObject" ).droppable({
		//tolerance: 'touch',
		//accept : '.drag',
		over: function(e, ui){
			dragObj = $('#'+dragId).attr('rel');
			draggedId = dragObj.substring(4);
			dropObj = $(this).attr('id');
			droppedId = dropObj.substring(10);
			if(draggedId == 7)
					dropIn = 1;
			else if(draggedId == 8)
					dropIn = 4;
			else
					dropIn = draggedId;
			if(droppedId != dropIn){
				dragCorrect = false;
			}else{
				dragCorrect = true;
			}
	    },
		drop: function(event, ui){
			if(!dragCorrect){
				$('#'+dragId).css({top:topPos, left: leftPos});
			}else{
				draggedCounter++;
				dragObj = $('#'+dragId).attr('rel');
				draggedId = dragObj.substring(4);
				dropObj = $(this).attr('id');
				droppedId = dropObj.substring(10);
				/*newDropCss = {
					'background' : 'url(images/'+exerciseName+'/drag'+draggedId+'.png)'
				};
				*/
				playSound(sounds["drop"]["dropped"]);
				//$('#drop'+dropIn).css(newDropCss).attr('rel',dragObj);
				$('#drop'+dropIn).attr('rel',dragObj);
				newDragCss = {
						top : $('#drop'+droppedId).css('top'),
						left : $('#drop'+droppedId).css('left')
						
				};
				$('#'+dragId).css(newDragCss).attr('drop','drop'+droppedId);
				$(this).attr('rel',dragObj);
				$(this).droppable('disable');
				
				//$('#'+dragId).hide();
				answers =  lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]["answers"];
				var numObjects = lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]["dropObjects"];
				if ( draggedCounter == numObjects) {
					wrong = false;
					for (i = 0; i < numObjects; i++) {
						dragRel = $('#drop' + i).attr('id');
						dragRelId = dragRel.substring(4);
						dropRel = $('#drop' + i).attr('rel');
						dropRelId = dropRel.substring(4);
						if (dragRelId != dropRelId) {
							wrong = true;
							break;
						}
					}
					if (wrong) {
						popWrongAnswer();
					}
					else {
						popRightAnswer();
					}
				}
			}
	    }
		
	});
}
function supplyCycleLesson(){
	$('#supply-text-area').html($('#supplyText0').html());
	var supplyCycleClick = {
		"top" : [0,168,338,168,168,57,68,314,304],
		"left" : [214,423,214,3,213,93,383,383,86],
		"width" : [140,140,140,140,140,90,90,90,90],
		"height" : [115,115,115,115,115,90,90,90,90]
	};
	$('#supply-cycle').empty();
	$('#supply-cycle').append("<div id='text-1' class='text'><span class='ne'>gLltx?</span>");
	$('#supply-cycle').append("<div id='text-2' class='text'><span class='ne'>cg's'ng ug'{</span>");
	for(i = 0 ;i<9;i++){
		hoverId = i+1;
		$('#supply-cycle').append('<div id="supply'+hoverId+'" class="supply-hover"></div>');
		hoverCss = {
				'position' : 'absolute',
				'top'      : supplyCycleClick["top"][i] + 'px',
				'left'     : supplyCycleClick["left"][i] + 'px',
				'width'    : supplyCycleClick["width"][i] + 'px',
				'height'   : supplyCycleClick["height"][i] + 'px'
		};
		$("#supply"+hoverId).css(hoverCss);
	}
}
function symbolMouseOver(){
	var symbolPos = 0;
	$('#symbolArea').empty();
	$('#symbolZoomArea').empty();
	for(i = 0; i < 3; i++ ){
		topPos = 170 * i;
		$('#symbolZoomArea').append('<div id="symbolZoom'+i+'" class="symbolZoom"></div');
		$('#symbolZoom'+i).css('top',topPos+'px');
	};
	for(i = 0; i < 9; i++ ){
		topPos = 55 * i;
		$('#symbolArea').append('<div id="symbol'+i+'" class="symbols"></div');
		$('#symbolArea #symbol'+i).css('top',topPos+'px');
	}
}

function lesson3_exercise2(){
	defineDragDropArea();
	//drag Area
	var numDrags= lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dragObjects'];
	$('#dragArea').empty();
	var numRanDrags= lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['randPositions'];
	var dragPos = generateRandomNumber(numRanDrags);
	for(i = 0;i<numDrags;i++){
		$('#dragArea').append('<div id ="dragObject'+i+'" class="dragObject"></div>');
		dragObjectCss = {
				'position' : 'absolute',
				'cursor': 'pointer',
				'width':   lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dragObjPositions']["width"][i]+'px',
				'height':  lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dragObjPositions']["height"][i]+'px',
				'top':  lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dragObjPositions'][dragPos]["top"][i] + 'px',
				'left' :  lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dragObjPositions'][dragPos]["left"][i] + 'px',
				'background' : 'url(images/lessons/'+interfaceObj.lessonName+'/'+interfaceObj.exerciseName+'/drag'+i+'.png)',
				'z-index':2
		};
		$('#dragObject'+i).css(dragObjectCss).attr('rel','drag'+i);
	}
	//drop Area
	var numDrops=  lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dropObjects'];
	for(i = 0;i<numDrops;i++){
		$('#dragArea').append('<div id ="dropObject'+i+'" class="dragObject dropObject"></div>');
		dropObjectCss = {
				'position' : 'absolute',
				'top':  lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dropObjPositions']["top"][i] + 'px',
				'left':  lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dropObjPositions']["left"][i] + 'px',
				'width':   lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dropObjPositions']["width"][i] + 'px',
				'height':  lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]['dropObjPositions']["height"][i] + 'px',
				'z-index':1
				//'border' : '2px solid red'
				//'background' : 'url(images/exercise'+interfaceObj.exerciseNum+'/drag'+i+'.png)'
		};
		$('#dropObject'+i).css(dropObjectCss);
	}
	exercise_simple_drag_drop();
}

//lesson 4
function lesson4_exercise2(){
	defineDragDropArea(true);
	createDragDropObjects(true,true);
	var monthId = 0;
	for(i = 0; i < 4; i++){
		var topDrop = 375;
		var leftDrop  = 105 + i*205;
		for(j = 0; j < 3; j++){
			topDrop = 375 - 38 * j;
			var monthsDrop = {
					position : 'absolute',
					top : topDrop + 'px',
					left : leftDrop + 'px',
					width: '125px',
					height : '37px'
			};
			$("#dragArea").append('<div id="dropMonth'+monthId+'"></div>');
			$('#dropMonth'+monthId).css(monthsDrop).attr('rel','');
			monthId++;
		}
	}
	lesson4_exercise_2_drag_drop();
}
function lesson4_exercise_2_drag_drop() {
	var answers;
	var dropCounter = [0,3,6,9];  //drop Counter
	var dropCounterMax = [3,6,9,12];  //drop Counter
	var draggedCounter = 0;
	var currentDragBack;
	var wrongDropped = false;
	var currentDragTop;
	var currentDragLeft;
	var numObjects = lessonInfo[interfaceObj.lessonName][interfaceObj.exerciseName]["dropObjects"];
	$( ".dragObject" ).draggable({
		containment: dragLimit,
		start: function() {
			$('.dragObject').removeClass('notDroppable');
			$('.dragObject').addClass('droppable');
			dragId = $(this).attr('id');
			currentDragTop = $(this).css('top');
			currentDragLeft = $(this).css('left');
			dropObject = $(this).attr('drop');
			if(dropObject){
				var dId = dropObject.substring(4);
				$('#dropObject'+dId).droppable('enable');
				$(this).removeAttr('drop');
				currentDragBack = $('#'+dragId).attr('title');
				draggedCounter--;
				dropCounter[dId] = dropCounter[dId]-1;
				$('#dragArea #dropMonth'+currentDragBack).attr('rel','');
				
				$('#'+dragId).removeClass('droppable');
				$('#'+dragId).addClass('notDroppable');
			}
		}
	});
	$( ".dropObject" ).droppable({
		accept : '.droppable',
		drop: function(event, ui){
			dragObj = $('#'+dragId).attr('rel');
			draggedId = dragObj.substring(4);
			drag0bjId = $('#'+dragId).attr('id');
			drag0bjId = drag0bjId.substring(10);
			dropObj = $(this).attr('id');
			droppedId = dropObj.substring(10);
			if(dropCounter[droppedId] >= dropCounterMax[droppedId]){
				var newDropCss = {
						'top' : currentDragTop,
						'left' : currentDragLeft
				};
				$('#'+dragId).css(newDropCss);
			}
			else{	
				draggedCounter++;
				$('#'+dragId).attr('drop','drop'+droppedId);
				playSound(sounds["drop"]["dropped"]);
				for(i=0;i<3;i++){
					currentDragBack = i + 3 * droppedId;
					var monthAttr = $('#dragArea #dropMonth'+currentDragBack).attr('rel');
					if(monthAttr[0] != 'm'){
						var newDropCss = {
								'top' : $('#dragArea #dropMonth'+currentDragBack).css('top'),
								'left' : $('#dragArea #dropMonth'+currentDragBack).css('left')
						};
						break;
					}
				}
				$('#'+dragId).css(newDropCss);
				$('#dragArea #dropMonth'+currentDragBack).attr('rel','month'+draggedId);
				$('#dragArea #'+dragId).attr('title',currentDragBack);
				
				if(draggedCounter == 12){
					var rightCount = 0;
					wrongDropped = false;
					for(i=0;i<12;i++){
						dragRelId = $('#dragArea #dropMonth'+i).attr('rel');
						dragRelId = dragRelId.substring(5);
						if(i >= 0 && i < 3){
							if(dragRelId >=3 && dragRelId < 6  ){
								rightCount++;
							}else{
								break;
							}
						}
						else if(i >= 3 && i < 6){
							if(dragRelId >=6 && dragRelId < 9  ){
								rightCount++;
							}else{
								break;
							}
						}else if(i >= 6 && i < 9){
							if(dragRelId >=9 && dragRelId < 12  ){
								rightCount++;
							}else{
								break;
							}
						}else if(i >= 9 && i < 12){
							if(dragRelId >=0 && dragRelId < 3  ){
								rightCount++;
							}else{
								break;
							}
						}
					}
					if(rightCount == 12)
						popRightAnswer();
					else 
						popWrongAnswer();
				}
				dropCounter[droppedId] = dropCounter[droppedId] + 1;
			}
		}
	});
}
function exercise2Check(){
	var exercise2Rightcounter = 0;
	var draggedCounter = 0;
	$('#lesson4 #exercise1 div.options').attr('rel','notClicked');
	$('#lesson4 #exercise1 #option1 div.button-bg div#button-1').removeClass('noHoverButton1');
	$('#lesson4 #exercise1 #option1 div.button-bg div#button-2').removeClass('noHoverButton1');
	$('#lesson4 #exercise1 #option2 div.button-bg div#button-1').removeClass('noHoverButton2');
	$('#lesson4 #exercise1 #option2 div.button-bg div#button-2').removeClass('noHoverButton2');
	$('#'+interfaceObj.lessonName+' #exercise1 div.options[rel=clicked] div.button-bg div').live('mouseover',function(){
		var optionId = $(this).attr('id');
		if(optionId == 'button-1'){
			$(this).removeClass('right-text');
			$(this).addClass('noHoverButton1');
		}
		else{
			$(this).removeClass('wrong-text');
			$(this).addClass('noHoverButton2');
		}
	});
	$('#'+interfaceObj.lessonName+' #exercise1 div.options[rel=notClicked] div.button-bg div').live('click',function(){
		buttonId = $(this).attr('id');
		$(this).parent('div.button-bg').css('background','url(images/lessons/lesson4/exercise1/disabled-bg.png)');
		if(buttonId == 'button-1' || buttonId == 'button-2'){
			if(buttonId == 'button-1')
				exercise2Rightcounter++;
			$('#exercise1 div#option1 ').attr('rel','clicked');
		}else{
			if(buttonId == 'button-4')
				exercise2Rightcounter++;
			$('#exercise1 div#option2').attr('rel','clicked');
		}
		draggedCounter++;
		if(draggedCounter == 2){
			if(exercise2Rightcounter == 2)
				popRightAnswer();
			else
				popWrongAnswer();
		}
	});
}

/* Events */
$('.supply-hover').live('mouseover',function(){
	supplyId = $(this).attr('id');
	supplyId = supplyId.substring(6);
	if(supplyId>6)
		supplyId = 6;
	$('#supply-text-area').html($('#supplyText'+supplyId).html());
});
$('.supply-hover').live('mouseout',function(){
	$('#supply-text-area').html($('#supplyText0').html());
});
$('#symbolArea .symbols').live('mouseover',function(){
	var symbolId = $(this).attr('id');
	var symId = symbolId.substring(6); 
	if(symId >= 0 && symId < 3)
		zoomId  = 0;
	else if(symId >= 3 && symId < 6)
		zoomId  = 1;
	else
		zoomId = 2;
	$('#symbolZoom'+zoomId).css('background','url(images/lessons/lesson3/page10/symbol'+symId+'.png) no-repeat');
	$('#symbolZoom'+zoomId).addClass('border-shadow');
});
$('#symbolArea .symbols').live('mouseout',function(){
	$('.symbolZoom').css('background','none');
	$('.symbolZoom').removeClass('border-shadow');
});
$('#interface3 #score-text').live('mouseover',function(){
	$(this).css({'width':'391px','height':'129px'});
	playSound(sounds["hover"]["scoresheet"]);
	var listScores = new cookieList("nfhpScores");
	var listNames = new cookieList("nfhpNames");
	var nfhpNames = listNames.items();
	var numUsers = nfhpNames.length;
	var scoreNums = listScores.items();
	var nfhpId = $.cookie('nfhpId');
	if(scoreNums == ''){
		var newScore = '';
		for(i=0;i<numUsers;i++){
			newScore += '0';
			if((i == numUsers-1)){
				newScore+='';
			}else{
				newScore+=',';
			}
		}
		$.cookie('nfhpScores',newScore,{expires: expireDays,path:'/'});
	}
	listScores = new cookieList("nfhpScores");
	scoreNums = listScores.items();
	var score;
	if(numUsers == 1){
		score = scoreNums;
	}else{
		score = scoreNums[nfhpId-1];
	}
	$('#score-sheet').html('<div class="score-number">'+scoreNumbers[score]+'</div>');
	var rightS,topS;
	for(i = 0; i< score ;i++){
		if(i<12){
			rightS = 350 - i * 24;
			topS = 57;
		}
		else{
			rightS = 350 - (i-12) * 24;
			topS = 82;
		}
		scoreCss = {
			'top': topS +'px',
			'right':  rightS + 'px'
		};
		$('#score-sheet').append('<div id="score'+i+'" class="score-tick"></div>');
		$('#score'+i).css(scoreCss);
	}
	$('#overlayLayer').show();
	animScore = true;
	$('#score-sheet').animate({'right':'-13px'},600);
});
$('#interface3 #score-text').live('mouseout',function(){
	$(this).css({'width':'42px','height':'58px'});
	playSound(sounds["hover"]["scoresheet"]);
		$('#score-sheet').animate({'right':'-403px'},600,function(){
			$('#overlayLayer').hide();
			animScore = false;
		});
});

/* Table Zoom */
$('#table-up').live('click',function(ev){
	ev.stopPropagation();
	if(!stopUp){
		newanimTop = animTop;
		stopDown = false;
		if((navTop + animTop) > 90){
			newanimTop = 90;
			stopUp = true;
			$('#interface3 #table-zoom').animate({top:newanimTop+'px',height:'670px'},animTime);
		}else{
			$('#interface3 #table-zoom').animate({top:'+='+newanimTop+'px',height:'-='+newanimTop+'px'},animTime);
		}
		navTop += newanimTop;
	}
});
$('#table-down').live('click',function(ev){
	//single click   stop Multiple clicks
	ev.stopPropagation();
	if(!stopDown){
		var newanimTop = animTop;
		divHeight = $('#interface3 #table-zoom').css('height');
		divHeight = parseInt(divHeight);
		net = imgHeight-divHeight;
		stopUp = false;
		if(net < 273){
			newanimTop = net;
			stopDown = true;
			divTop = $('#interface3 #table-zoom').css('top');
			divTop = parseInt(divTop);
			divLastTop = divTop - newanimTop ;
			$('#interface3 #table-zoom').animate({top:divLastTop+'px',height:imgHeight+'px'},animTime);
			navTop = divLastTop;
		}else{
			$('#interface3 #table-zoom').animate({top:'-='+newanimTop+'px',height:'+='+newanimTop+'px'},animTime);
			navTop -= newanimTop;
		}
		
	}
});
$(function(){
	/*
	 * lesson.training.js
	 * Training Related Functions and events
	 */
		$('#interface3 #slide-virtual .training-text-up').live('mouseover',function(){
			if(!overlayOn){
				$('#slide-icon #Training').animate({'margin-top':'+=5px'},200);
			}
		});
		$('#interface3 #slide-virtual .training-text-up').live('mouseout',function(){
			if(!overlayOn){
				$('#slide-icon #Training').animate({'margin-top':'-=5px'},200);
			}
		});
		$('#interface3 #slide-virtual .exercise-text-up').live('mouseover',function(){
			if(!overlayOn){
				$('#slide-icon #Exercise').animate({'margin-top':'+=5px'},200);
			}
		});
		$('#interface3 #slide-virtual .exercise-text-up').live('mouseout',function(){
			if(!overlayOn){
				$('#slide-icon #Exercise').animate({'margin-top':'-=5px'},200);
			}
		});
		$('#slide-virtual .exercise-text-up').live('click',function(){
			if(!overlayOn){
				$('#slide-icon #Exercise').animate({'margin-top':'5px'},200);
				user = $.cookie('nfhpId');
				if(user == null || user ==''){
					popAccessDenied();	
				}else{
						playSound(sounds["click"]["exercise"]);
						updateLastLoc('exercise');
						exercise();
				}
			}
		});

		$('#slide-virtual .training-text-up').live('click',function(){
			if(!overlayOn){
				$('#slide-icon #Training').animate({'margin-top':'5px'},200);
				playSound(sounds["click"]["training"]);
				controlElements('Training');
				interfaceObj.pageNum = 1;
				nextTraining();
			}
		});
		$('a').live('click',function(ev){
			ev.preventDefault();
			theURL = $(this).attr('href');
			window.open(theURL, 'new window', 'fullscreen=yes,scrollbars=yes,resizable=yes');
		});
		$("img[rel=zoom]").live('mouseover',
				  function () {
						$(this).addClass("hoverPara");
				  },
				  function () {
				    $(this).removeClass("hoverPara");
				  }
				);
		$("#image_load img,#interface3 #table-zoom img").live('mouseover',
				  function () {
						$(this).addClass("cancelZoom");
				  },
				  function () {
				    $(this).removeClass("cancelZoom");
				  }
				);
		
		$('img[rel=zoom]').live('click',function(ev){
			ev.preventDefault();
			$('#image_load').show();
			$('#overlayLayer').show();
			$('#image_load img').attr('src',$(this).attr('src'));
			overlayOn = true;
		});
		$('#image_load img').live('click',function(ev){
			$('#image_load').hide();
			$('#overlayLayer').hide();
		});
		
		$("img[rel=table]").live('mouseover',
				  function () {
						$(this).addClass("hoverPara");
				  },
				  function () {
				    $(this).removeClass("hoverPara");
				  }
				);
		$('#interface3 img[rel=table]').live('click',function(ev){
			overlayOn = true;
			//var newSrc = '';
			if($(this).hasClass('thumb')){
				newSrc = $(this).attr('src').replace('_thumb','')
				$('#interface3 #table-zoom img').attr('src',newSrc);
				setTimeout("tableZoom()",300);
				//newSrc = 'images/lessons/'+interfaceObj.lessonName+'/page'+interfaceObj.pageNum+'/form.png';
				//newSrc = $(this).attr('title');
			}else{
				newSrc = $(this).attr('src');
				$('#interface3 #table-zoom img').attr('src',newSrc);
				tableZoom();
			}
		});

		$('#interface3 #table-zoom img').live('click',function(ev){
			overlayOn = false;
			$('#interface3 #slides').show();
			$("#interface3 #table-zoom").hide();
			$('#interface3 #table-zoom img').attr('src','');
			$("#table-navigation-up-down").remove();
			$('#interface3 #trayHover').show();
			$('#interface3 #toc-image-1').show();
			$('#navigation-bottom').show();
			$('.bottom-line').show();
		});
		
		$("#interface3 #slides p,#interface3 div.zoom").live('hover',
				  function () {
					if(interfaceObj.mode == "Training")
						$(this).addClass("hoverPara");
				  },
				  function () {
				    $(this).removeClass("hoverPara");
				  }
				);
		$("#paragraphZoom").live('hover',
				  function () {
				    $(this).addClass("cancelZoom");
				  },
				  function () {
				    $(this).removeClass("cancelZoom");
				  }
				);
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
});

