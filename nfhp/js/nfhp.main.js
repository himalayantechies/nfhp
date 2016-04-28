/*
 * nfhp.main.js
 * Main control part of the program
 */
//exit variables
var motion = 0;
var topPosMan = 220;
var leftPosMan = -80; //-50
var manAnim = {
		"width": [59,43,39,33,37,54],
		"height":[125,125,125,125,125,125]
};
var t;
var numAnimations = 0;
var maxAnimations = 16;
var animExitTime = 80; // 35
var doorNum = 0;
var doorTime = 100;
var manPicChangeTime = 8;  //6

$(function(){
	varTimer = setTimeout('programLoading()',2000);
});
function programLoading(){
	clearTimeout(varTimer);
	$('#pop-up-load').show();
	$('#overlayLayer').show();
	$('#interface1').hide();
	$('#interface').hide();
	varTimer = setTimeout('interface1()',10000);
}
function interface1(){
	interfaceObj.id = 1;
	controlInterfaces();
	intro();
}
function interface2(page){
	interfaceObj.id = 2;
	interfaceObj.imageNum = 0;
	controlInterfaces();
	switch(page){
		case "howto":
			howto();
			break;
		case "editorial":
			editorial();
			break;
		case "entry":
			entry();
			break;
		case "login":
			login();
			break;
		case "toc":
			toc();
			break;
		default:
			howto();
			break;
	}
}
function interface3(lessonNum,pageNum,exerciseFlag){
	interfaceObj.id = 3;
	controlInterfaces();
	interfaceObj.lessonNum = lessonNum;
	interfaceObj.lessonName = "lesson"+interfaceObj.lessonNum;
	interfaceObj.exerciseNum = 1;
	lessonManage(lessonNum,pageNum,exerciseFlag);
}
function controlInterfaces(){
	$('#overlayLayer').hide();
	$("#loadingProgram").hide();
	if(interfaceObj.id == 1){
		clearTimeout(varTimer);
		$('#interface1').show();
		$('#interface').hide();
	}else if(interfaceObj.id == 2){
		$('#interface1').hide();
		$('#interface').show();
		$('#interface3').hide();
		$('#interface2').show();
		//createTray();
	}else{
		$('#interface1').hide();
		$('#interface').show();
		$('#interface2').hide();
		$('#interface3').show();
		var tocImage = '#interface3 #toc-image';
		var tocImage1 = '#interface3 #toc-image-1';
		$(tocImage).hide();
		$(tocImage1).show().css('left','-542px');
		$('#tray').hide();
		$(tocImage1).animate({rotate: '-30deg'}, 1);
	}
}
/* Interface 1 Intro */
function intro(){
	//$('#first-page').hide();
	//$('#second_page_first_row').show();
	//$('img.element,img.path').show();
	//$('img').draggable();
	$('img.element,img.path').hide();
	$("img#logo-main").fadeIn(4000, function(){  //7000
		playSound(sounds["intro"]["intro"],true);
		$("img#text-2").fadeIn(1000, function(){  //2
			$("#logo-main").animate({rotate: "-90deg"}, 1000);
			$("img#text-2").animate({rotate: "-90deg"},{queue:false, duration: 1000});
			$("#logo-main").animate({left: "-1100px"}, { 			 //, height: "toggle"
				queue: false,
				duration:2000,
				complete: function(){
					$("#logo-main").remove();
				}
			});
			$("img#text-2").animate({left: '900px', top: '360px'},{
				queue: true, duration: 2000,
				complete : function(){
					startIntroObjects();
				}
			});
			$("img#text-2").animate({left: "-220px"},2000,function(){
				$("img#text-2").remove();
			});
		});
	});
}
function startIntroObjects(){
	var ptime=1000, itime=500;
	$("#sliding_text").show().animate({left: '326px'},3000,function(){
		$('div#second_page_first_row').show();
		$("img#img_01").delay(90).fadeIn(10,function(){
			$("img#path_01").delay(550).fadeIn(10,function(){
				$("img#img_02").delay(313).fadeIn(10,function(){
					$("img#img_03").delay(400).fadeIn(10,function(){
						$("img#path_02").delay(616).fadeIn(10,function(){
							$("img#img_04").delay(719).fadeIn(10,function(){
									$("img#img_05").delay(675).fadeIn(10,function(){
										$("img#path_03").delay(399).fadeIn(10,function(){
											$("img#img_06").delay(423).fadeIn(10,function(){
												$("img#img_07").delay(590).fadeIn(10,function(){
													$("img#path_04").delay(685).fadeIn(10,function(){ // itime
														$("img#img_08").delay(610).fadeIn(10,function(){ //500
															$("img#img_09").delay(665).fadeIn(10,function(){ //300
																$("img#path_05").delay(767).fadeIn(10,function(){ //400
																	$("img#img_10").delay(995).fadeIn(10,function(){ //300
																		$("img#img_11").delay(253).fadeIn(10,function(){ //400
																			setTimeout("next_page()",3800);
																		});
																	});
																});
															});
													});
												});
											});
										});
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
function next_page(){
	$('img.element,img.path').hide();
		$('img#sliding_text').animate({left:'111px',top: '40px', width:'287px', height:'180px'},2000);
		$('#third_page').show();
		$("#back_slide").show().animate({top:'436px', width: '1024px'}, 2000,function(){
			$("div#options").show();
			$("div#options-hide").show();
							$("div#options #button2-bg").show().animate({top: '73px'}, 1000,function(){
								$("div#options #button2-bg").animate({top: '67px'}, 500, function(){
									$("div#options #button1-bg").show().animate({top: '73px'}, 1000, function(){
										$("div#options #button1-bg").animate({top: '67px'}, 500, function(){
											$("#options #button1-bg #button-text").hide();
											$("#options #button2-bg #button-text").hide();
											$("div#links").show();
											playSound(sounds["voices"]["others"][4]);
											if($.cookie('nfhpId')!=null)
												$.cookie('nfhpId',null,{expires:expireDays,path:'/'});
										});
									});
								});
							});
		});
}

function exitConfirm(){
	$('#container').hide();
	$('#exit-page').show();
	$('#exit-page #exit-2').hide();
	$('#exit-page #exit-1').show();
	$('#exit-page #exit-1 #supported-by-drop').delay(200).show().animate({top :'466px'},1500,function(){
		$('#exit-page #exit-1 #supported-by-1').show();
		$('#exit-page #exit-1 #supported-by-2').show();
		$('#exit-page #exit-1 #supported-by-drop').animate({top :'462px'},500);
	});
}
function exitCD(){
	$('#exit-page').show();
	$('#exit-page #exit-1').hide();
	$('#exit-page #exit-2').show();
	$('#container').hide();
	$('#designed-at-drop').delay(500).show().animate({top :'275px'},1000,function(){
		$('#umbrello').show();
		$('#designed-at-drop').show().animate({top :'271px'},500);
		$('#programmed-at-drop').show().animate({top :'275px'},1000,function(){
			$('#programmed-at-drop').animate({top :'271px'},500);
			$('#ht').show();
			animateMan();
		});
		
	});
}

function newImage(){
	leftPosMan += manPicChangeTime;
	var newCss = {
			'position' : 'absolute',
			'top': topPosMan + 'px',
			'left' : leftPosMan + 'px',
			'width' : manAnim["width"][motion] + 'px',
			'height' : manAnim["height"][motion] + 'px',
			'background' : 'url(images/exit/man-'+motion+'.png)',
			'z-index' : 3
		};
	$('#man-anim').css(newCss);
	motion++;
}
function animateMan(){
	motion = 0;
	newImage();
	$('#man-anim').animate({left : leftPosMan+'px'},animExitTime,function(){
		newImage();
		$('#man-anim').animate({left : leftPosMan+'px'},animExitTime,function(){
			newImage();
			$('#man-anim').animate({left : leftPosMan+'px'},animExitTime,function(){
				newImage();
				$('#man-anim').animate({left : leftPosMan+'px'},animExitTime,function(){
					newImage();
					$('#man-anim').animate({left : leftPosMan+'px'},animExitTime,function(){
						newImage();
						$('#man-anim').animate({left : leftPosMan+'px'},animExitTime,function(){
							numAnimations++;
							if(numAnimations != maxAnimations){
								leftPosMan += manPicChangeTime;
								animateMan();
							}else{
								//close the CD
								$('#man-anim').hide();
								animateDoor();
							}
						});
					});
				});
			});
			
		});
	});
}
function changeDoor(){
	if(doorNum>4)
		doorNum = 4;
	var newCss = {
			'width' : '111px',
			'height' : '172px',
			'background' : 'url(images/exit/door-'+doorNum+'.png)',
			'z-index' : 4
		};
	$('#exit-door').css(newCss);
	doorNum++;
}

function animateDoor(){
	playSound(sounds["door"]["close"]);
	doorNum = 1;
	$('#exit-door').animate({left:'+=0px'},doorTime,function(){
		changeDoor();
		$('#exit-door').animate({left:'+=0px'},doorTime,function(){
			changeDoor();
			$('#exit-door').animate({left:'+=0px'},doorTime,function(){
				changeDoor();
					$('#exit-door').animate({left:'+=0px'},doorTime,function(){
						changeDoor();
						window.exit();
					});
			});
		});
	});
}

