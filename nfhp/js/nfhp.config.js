/*
 * config.js
 * javascript file for the all the global variables and configuration
 * 18 July 2011
 * @ Ashok Basnet (http://ashokbasnet.com.np)
*/

/* ------- Variables Declaration and Initialization -------- */
var NUM_OF_LESSONS = 8;
var NUM_OF_EXERCISES = 24;
var MAX_USERS = 10;  //max users for the CD
// Global varibles for keeping track of pages , interfaces
var interfaceObj = new Object();
interfaceObj.id = 1;
interfaceObj.imageNum = 1;
interfaceObj.editorial = false;  // 0 means false 1 means true
interfaceObj.lessonNum = 1;
interfaceObj.lessonName = '';
interfaceObj.exerciseName = '';
interfaceObj.pageNum = 0;
interfaceObj.exerciseNum = 1;
interfaceObj.mode;  // mode for exercise or training
interfaceObj.interface2 = "";
var trainingPages = [4,4];
var visitor = false; //flag for visitor
var animateStatus = true;   //status for animation
var nfhpId; // userid of currently logged in person
var currentWindow;
var varTimer; //for timer
var maxExerciseNumber = [1,3,7,9,17,19,22,24]; 
//var tocScore = [0,1,3,6,9,17,19,22];
var numExercises = [1,2,4,2,8,2,3,2];
var firstTimeUse;
var numTrials;  // number of trials for user to give
var overlayOn = false;  // for movement of truck when something is zoomed is overlayed
//All lessons info
var lessonInfo = {
		"lesson1" : {
				"numExercises" : 1, "totalPages" : 5,"pages" : [1],
				"exercise1" : {
					"numTrials" : 2,"dragObjects" : 9, "dropObjects" : 7, "randPositions" : 2,
					"dragArea" : [-20,96,445,473],  // left , top , width, height
					"dropArea" : [529,103,344,341], 
					"dragObjPositions" : {
						"width" : [145,144,117,114,143,142,113,141,144],
						"height" : [113,111,145,142,112,112,142,111,112],
						"0":{
							"top": [0,10,17,291,186,107,288,250,135],
							"left":[331,45,210,96,191,24,241,372,337]
						},
						"1":{
							"top": [193,311,162,89,24,225,317,72,355],
							"left":[326,189,162,260,210,22,338,8,65]
						}
					},
					"dropObjPositions" : {
						"width" : [73,73,64,64,73,73,63],
						"height" : [64,64,73,73,64,64,73],
						"top": [101,177,248,248,177,100,13],
						"left":	[251,251,180,100,20,20,100]
					},
					"dropPositions" : {
						"width" : [145,144,117,114,143,145,113,115,144],
						"height" : [113,111,145,142,112,116,143,143,112],
						"top": [60,182,203,205,184,61,6],
						"left":	[747,749,724,604,548,549,604]
					}
				}
		},
		"lesson2" : {
			"numExercises" : 2, "totalPages" : 7, "pages" : [1,3,6],
			"exercise1" : {
				"numTrials" : 2,
				"dragObjects" : 5,
				"dropObjects" : 5,
				"dragArea" : [-20,63,347,473],  // left , top , width, height
				"dropArea" : [408,103,502,401], // left , top , width, height
				"dragObjPositions" : {
					"width" : 135 ,  //width of the dragObject
					"height" : 111 ,  //height of the dragObject
					"top": [40,158,196,325,353],
					"left":	[150,-17,198,10,198]
				},
				"dropObjPositions" : {
					"width" : 135 ,  //width of the dropObject
					"height" : 111 ,  //height of the dropObject
					"top": [36,183,333,183,183],
					"left":	[610,795,611,423,610]
				},
				"questions" : ["drag0","drag1","drag2","drag3","drag4"],
				"answers" : ["drag0","drag1","drag2","drag3","drag4"]
			},
			"exercise2":{
				"numTrials" : 2,
				"numOptions" : 8,
				"correctOptions" : 6,
				"options" : ["7Ls ;fdfg","7Ls cj:yfdf","7Ls :yfgdf","7Ls kl/df0fdf","7Ls ;dodf",'7Ls d"Nodf',"7Ls Koflsª","7Ls lbgdf"]
			}
		},
		"lesson3" : {
			"numExercises" : 3,	"totalPages" : 12,"pages" : [1,3,4,5,6,7,8,9,10,12,12],
			"exercise1" : {
				"numTrials" : 2, "dragObjects" : 7, "dropObjects" : 7,
				"dragArea" : [-20,235,218,334], 
				"dropArea" : [263,280,690,310], 
				"dragObjPositions" : {
					"width" : 66 , "height" : 86 ,
					"top": [40,158,192,261,259,20,140],
					"left":	[150,-17,107,10,198,40,200]
				},
				"dropObjPositions" : {
					"width" : 66 , "height" : 86 , 
					"top":   [80,80,80,80,80,80,80], 
					"left":  [486,554,623,693,762,831,900] 
				},
				"questions" : ["drag0","drag1","drag2","drag3","drag4","drag5","drag6"],
				"answers" : ["drag0","drag1","drag2","drag3","drag4","drag5","drag6"]
			},
			"exercise2" : {
				"numTrials" : 2,"dragObjects" : 8,"dropObjects" : 8,"randPositions" : 4,
				"dragArea" : [-43,63,958,211],  // left , top , width, height
				"dropArea" : [-39,257,958,318], // left , top , width, height
				"dragObjPositions":  { 
					"width" : [83,165,123,129,176,87,103,58],
					"height" : [82,126,68,71,95,78,90,78], 
					"0":{
						"top": [92,41,109,87,2,4,-10,0],
						"left":[75,237,541,748,371,575,812,108]
					},
					"1":{
						"top": [103,11,6,13,106,61,116,-5],
						"left":[823,513,772,78,338,181,690,393]
					},
					"2":{
						"top": [90,33,29,105,34,5,-2,-4],
						"left":[517,74,604,382,742,209,406,518]
					},
					"3":{
						"top": [-1,65,104,94,-9,90,10,1],
						"left":[221,729,233,376,378,20,796,600]
					}			
					},
				"dropObjPositions" : {
						"width" : [129,160,184,159,171,115,97,109],  //width of the dropObject
						"height" : [76,76,76,76,76,76,76,76], //height of the dropObject
						"top":   [197,197,197,417,417,417,417,417], //initial top 
						"left":  [339,507,712,713,510,361,241,96]      //initial left
				},
				"questions" : ["drag0","drag1","drag2","drag3","drag4","drag5","drag6","drag7"],
				"answers" : ["drag0","drag1","drag2","drag3","drag4","drag5","drag6","drag7"]
			},
			"exercise3" : {
				"numTrials" : 2,"dragObjects" : 6,"dropObjects" : 6,
				"dragArea" : [697,76,200,500], 
				"dropArea" : [80,70,505,498], 
				"dragObjPositions" : {
					"width" : 77 , "height" : 76 , 
					"top": [78,158,220,325,413,10],
					"left":	[70,-67,57,-40,90,-50]
				},
				"dropObjPositions" : {
					"width" : 77,"height" : 76,
					"top": [-2,82,163,246,328,412],
					"left":	[-194,-194,-194,-194,-194,-194]
				},
				"questions" : ["drag0","drag1","drag2","drag3","drag4","drag5"],
				"answers" : ["drag0","drag1","drag2","drag3","drag4","drag5"]
			},
			"exercise4" : {
				"numTrials" : 2,"dragObjects" : 4,"dropObjects" : 2,
				"dragArea" : [-20,95,218,490],
				"dropArea" : [231,168,662,413],
				"dragObjPositions" : {
					"width" : 76, "height" : 112 ,
					"top": [47,143,220,296],
					"left":	[159,10,190,48]
				},
				"dropObjPositions" : {
					"width"  : 76 ,"height" : 112 ,"top":   [106,106],"left":  [376,600]
				},
				"dropObjBackgrounds":{
					"width"  : 191 ,"height" : 413 ,  
					"top":   [14,14],"left":  [122,346],"background":["drop0","drop0"]
				},
				"questions" : ["drag0","drag1","drag2","drag3"],
				"answers" : ["drag0","drag1"]
			}
		},
		"lesson4" : {
			"numExercises" : 4,"totalPages" : 9,"pages" : [1,3,4,5,6,7,8,9],
			"exercise1" : {
				"numTrials" : 1,
			},
			"exercise2" : {
				"numTrials" : 2,"dragObjects" : 12,"dropObjects" : 4,
				"dragArea" : [-16,95,940,197],  
				"dropArea" : [54,310,780,233], 
				"dragObjPositions" : {
					"width" : 125 , "height" :37 ,  
					"top":  [67,2,71,75,150,75,2,150,137,6,29,137],
					"left":	[76,208,597,236,136,404,390,329,533,564,733,730]
				},
				"dropObjPositions" : {
					"width"  : 164,"height" : 208,
					"top":   [10,10,10,10],	"left":  [11,214,423,630],
				},
				"dropObjBackgrounds":{
					"width"  : 164 ,"height" : 208 , 
					"top":   [10,10,10,10],"left":  [14,214,423,630],
					"background":["drop0","drop1","drop2","drop3"]
				},
				"questions" : ["drag0","drag1","drag2","drag3","drag4","drag5","drag6","drag7","drag8","drag9","drag10","drag11"]
			}
		},
		"lesson5" : {
			"numExercises" : 8,	"totalPages" : 19,
			"pages" : [1,3,4,6,7,8,9,11,16],
			"exercise1" : {
				"numTrials" : 1,"dragObjects" : 3,"dropObjects" : 2,
				"dragArea" : [439,283,495,360], 
				"dropArea" : [27,77,370,360],
				"dragObjPositions" : {
					"width" : 422, "height" : 117,"top": [0,146,146],"left":[0,-400,68]
				},
				"dropObjPositions" : {
					"width" : 422,"height" : 117,"top": [-196,-36],"left":	[-130,-130]
				},
				"dropObjBackgrounds":{
					"width"  : 315,"height" : 117,"top":   [10,170],"left":  [10,10],
					"background":["drop0","drop1"]
				},
				"questions" : ["drag0","drag1","drag2"],
				"answers" : ["drag0","drag1","drag2"]
			},
			"exercise2" : {
				"numTrials" : 1,"dragObjects" : 3,"dropObjects" : 2,
				"dragArea" : [439,283,495,360],
				"dropArea" : [27,77,370,360],
				"dragObjPositions" : {
					"width" : 422,"height" : 116,"top": [20,166,166],"left":	[0,-400,40]
				},
				"dropObjPositions" : {
					"width" : 422,"height" : 116,"top": [-196,-36],	"left":	[-130,-130]
				},
				"dropObjBackgrounds":{
					"width"  : 316,"height" : 116,"top":[10,170],"left":[10,10],
					"background":["drop0","drop1"]
				},
				"questions" : ["drag0","drag1","drag2"],
				"answers" : ["drag0","drag1","drag2"]
			},
			"exercise3":{
				"numTrials" : 2,"numOptions" : 7,"correctOptions" : 5,
				"options" : [";xL cf}iflw",";xL 9+un]<span class='en'> (Rational Use)</span>",";xL la/fdLnfO{",';xL d"Nodf',';xL ;dodf',';xL xftdf',';xL gfkmfsf nflu']
			},
			"exercise4":{
				"numTrials" : 1,"numOptions" : 4,"correctOptions" : 2,
				"options" : ["clwstd :jLs[t df}Hbft kl/df0f, <span class='enOption'>ASL</span> % dlxgfsf] x'G5 .",
				             "cfsl:ds dfu ljGb', <span class='enOption'>EOP </span> ! dlxgfsf] x'G5 .",
				             "t];|f] q}dfl;s– j}zfv @) b]lv– @% ut] ;Dd",
				             "rf}yf] q}dfl;s– >fj0f & b]lv– !$ ut] ;Dd"
				             ]
			},
			"exercise5" : {
				"numTrials" : 1,"dragObjects" : 3,"dropObjects" : 1,
				"dragArea" : [709,97,180,41], 
				"dropArea" : [20,155,868,419],
				"dragObjPositions" : {
					"width" : 35 ,"height" : 35 ,"top": [5,5,5],"left":	[20,65,115]
				},
				"dropObjPositions" : {
					"width" : 35 ,"height" : 35,"top": [70],"left":	[65]
				},
				"questions" : ["drag0","drag1","drag2"],
				"answers" : ["drag0"]
			},
			"exercise6" : {
				"numTrials" : 1,"dragObjects" : 3,"dropObjects" : 1,
				"dragArea" : [705,97,180,41], 
				"dropArea" : [-4,155,922,425],
				"dragObjPositions" : {
					"width" : 35 ,"height" : 35 ,"top": [5,5,5],"left":	[20,65,115]
				},
				"dropObjPositions" : {
					"width" : 35 , 	"height" : 35 ,	"top": [76],"left":	[64]
				},
				"questions" : ["drag0","drag1","drag2"],
				"answers" : ["drag0"]
			},
			"exercise7" : {
				"numTrials" : 1,"dragObjects" : 3,"dropObjects" : 1,
				"dragArea" : [660,469,256,62], 
				"dropArea" : [105,147,849,305],
				"dragObjPositions" : {
					"width" : 71,"height" : 53,"top": [5,5,5],"left":	[20,105,187]
				},
				"dropObjPositions" : {
					"width" : 71 ,"height" : 53 ,"top": [-99],"left":	[186]
				},
				"questions" : ["drag0","drag1","drag2"],
				"answers" : ["drag0"]
			},
			"exercise8" : {
				"numTrials" : 1,"dragObjects" : 3,"dropObjects" : 1,
				"dragArea" : [435,469,256,62],
				"dropArea" : [-69,147,763,305],
				"dragObjPositions" : {
					"width" : 71,"height" : 53 ,"top": [5,5,5],"left":	[20,105,187]
				},
				"dropObjPositions" : {
					"width" : 71,"height" : 53 ,"top": [-99],"left":[137]
				},
				"questions" : ["drag0","drag1","drag2"],
				"answers" : ["drag0"]
			}
		},"lesson6" : {
			"numExercises" : 2,"totalPages" : 24,
			"pages" : [1,3,4,5,6,7,8],
			"exercise1":{
				"numTrials" : 1,"numOptions" : 3,"correctOptions" : 1,
				"options" : ["d=n]=k= kmf/d g+= %@ -lhG;Lvftf_","d=n]=k= kmf/d g+= %! -dfu kmf/d_","d=n]=k= kmf/d g+= $& -lhG;Lvftf_"]
			},
			"exercise2":{
				"numTrials" : 1,"numOptions" : 4,"correctOptions" : 1,
				"options" : ["eljiodf cfjZos kg{] cf}iflwsf] cg'dfg ug{ .","ut jif{sf] gfkmf gf]S;fgsf] lx;fj ug{ .",
				             "k|of]u gePsf cf}iflwsf] ;+Vof kQf nufpg .",
				             "cfufdL jif{sf] :jf:Yo sfo{qmdsf nflu cfjZos kg{] ah]6sf] n]vfhf]vf ug{ ."]
			}
		},"lesson7" : {
			"numExercises" : 3,	"totalPages" : 12,
			"pages" : [1,3,3,4,5,5,6,6,7,8,10],
			"exercise1":{
				"numTrials" : 1,"numOptions" : 6,"correctOptions" : 5,
				"options" : ['sfo{stf{n] sfd ul//x¿ a]nf cjnf]sg u/]/',"sfo{stf{;+u s'/fsfgL u/]/","clen]vx¿ cWoog u/]/ ",";]jf kfPsf vf; JolQmx¿;+u ;f]wk'5 u/]/","hg;d'bfo ;+u ;f]wk'5 u/]/","sfo{ k|ult ljj/0f dfu]/"]
			},
			"exercise2" : {
				"numTrials" : 1,"dragObjects" : 3,"dropObjects" : 3,
				"dragArea" : [705,183,140,360],
				"dropArea" : [104,77,140,360],
				"dragObjPositions" : {
					"width" : 98 ,"height" : 104 ,"top": [10,120,230],"left":	[-150,-270,-150]
				},
				"dropObjPositions" : {
					"width" : 98 , "height" : 104 ,"top": [-96,34,164],"left":	[-503,-503,-503]
				},
				"dropObjBackgrounds":{
					"width"  : 138,"height" : 104,"top":   [10,140,270],"left":  [10,10,10],
					"background":["drop0","drop1","drop2"]
				},
				"questions" : ["drag0","drag1","drag2"],
				"answers" : ["drag0","drag1","drag2"]
			},
			"exercise3":{
				"numTrials" : 1,"numOptions" : 3,"correctOptions" : 1,
				"options" : ["lhNnf :t/jf6","s]Gb|af6","Kf|fylds :jf:Yo s]Gb| tyf :jf:Yo rf}sLx? :jo+af6"]
			}
		},"lesson8" : {
			"numExercises" : 2,"totalPages" : 5,"pages" : [1],
			"exercise1":{
				"numTrials" : 1,
				"numOptions" : 3,
				"correctOptions" : 1,
				"options" : ["k|To]s q}dfl;sdf","k|To]s rf}dfl;sdf","jif{sf] b'O{ k6s"]
			},
			"exercise2":{
				"numTrials" : 1,
				"numOptions" : 3,
				"correctOptions" : 1,
				"options" : ["!% lbg leqdf","& lbg leqdf","klxnf] dlxgfsf] d;fGt ;Dddf"]
			}
		}
};
var interface2positions =  {
			"top" :  [204,204,204,171,204,163,166,182,186,179,178],
			"left" : [268,268,268,268,285,268,240,284,284,253,283]
		}; //positions for interface2 slides (how to)
var interface2editorials =  {
		"animWidth" : [131,119,110,105,106,138,138],
		"width" : [523,321,177,177,177,597,597],
		"top" :  [78,78,78,78,78,78,78],
		"left" : [-393,-111,28,28,28,-393,-393],
		"heading" : ["aboutcd","1-heading","2-heading","3-heading","4-heading","5-heading","6-heading"]
	}; //positions for interface2 slides (editorials)
var scoreNumbers = ["))",")!",")@",")#",")$",")%",")^",")&",")*",")(","!)",
                    "!!","!@","!#","!$","!%","!^","!&","!*","!(","@)",
                    "@!","@@","@#","@$"];
var exerciseNumbers = [")","!","@","#","$","%","^","&","*","(","!)",
                       "!!","!@","!#","!$","!%","!^","!&","!*","!(","@)",
                       "@!","@@","@#","@$"];
var nepaliAlpha = ['s','v','u','3','ª','r','5','h'];
var tocInfo = {
		"tocSubBackground" : { 
				"width" : 472,
				"height" : [131,198,407,321,344,285,420,122],
				"images" : ["introduction","logistic-management","store","inventory","distribution","reporting","supervision","responsibility"],
				"top" : [0,41,46,97,161,156,80,361],
				"left" : 286
		}
};
var interface2headings = ["howto","preface","entry","login","content"];
var fullName,position,citizenNum,password;  //cookie global variables
var noCookie = false;   //flag for visitor 
var expireDays = 365;  //expirary date for cookies in browser

/* ------- End Variables Declaration and Initialization -------- */
var sounds = {
		"click" : ["button","truck","toc","exercise","training"],
		"drop" : ["dropped"],
		"hover" : ["scoresheet","toc"],
		"popup" : ["pop"],
		"door" : ["close"],
		"voices" : {
			"lessons":["lesson1","lesson2","lesson3","lesson4","lesson5","lesson6","lesson7","lesson8"],
			"editorial" : ["aboutcd","dosro","prakkathan","dui-shabd","mantavya","pathyakram"],
			"others" : ["cdkasari","pravesh","vishaysuchi","prayogkarta","disclaimer"]
		},
		"intro" : ["intro"]
};

//var nfhpUrl =  "resource://app/"; //url of the parent
//var nfhpUrl = "http://localhost/nfhp/nfhp/";

