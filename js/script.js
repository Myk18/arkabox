function randomangle(){
	// randomize angle
	if (Math.random(0,1)*10 >= 5){
		side = '';
		}else{
		side = '-';
		}
	return side+Math.floor(Math.random(0,1)*10);
}
function getTanDeg(deg){
	  return Math.tan(deg * Math.PI/180);
}
function ball(width, height, speed, angle){
	var angle1 = document.getElementById("angle");
	var speed1 = document.getElementById("speed");
    this.width = width;  
    this.height = height;
    this.angle = angle;
    this.speed = speed;
	this.width_max = 200;
	this.width_min = 0;
	this.height_max = 200;
	this.height_min = 0;
    this.move = function(x,y) {
					zone = Math.floor(y/90);
					grad = y%90;
					b1 = x/Math.sqrt(1+(Math.pow(getTanDeg(grad),2)));
					a1 = b1*getTanDeg(grad);
					this.speed = x;
					this.angle = y;					
					switch (zone) {
						case 0:
							this.width = this.width + a1; 
							this.height = this.height + b1;
						break;
						case 1:
							this.width = this.width + b1; 
							this.height = this.height - a1;
						break;
						case 2:
							this.width = this.width - a1; 
							this.height = this.height - b1;
						break;
						case 3:
							this.width = this.width - b1; 
							this.height = this.height + a1;
						break;
					}					
				}
	this.incheck = function (bobj) {if ((bobj.ws <= this.width) && (this.width <= bobj.wf) && (bobj.hs <= this.height) && (this.height <= bobj.hf)) {
					//alert('incheck');
					//alert(' ws-'+bobj.ws+' wf-'+bobj.wf+' hs-'+bobj.hs+' hf-'+bobj.hf);
					//alert(' w-'+Math.floor(this.width)+' h-'+Math.floor(this.height));
					return true;
					}else{
					return false;
					}				
				}
	this.collide = function (bobj) {if ( (bobj.ws <= this.width) && (this.width <= bobj.wf) && (bobj.hs == Math.floor(this.height) || bobj.hf == Math.floor(this.height)+1)){
										//alert(' ws-'+bobj.ws+' wf-'+bobj.wf+' hs-'+bobj.hs+' hf-'+bobj.hf);	
											if (this.angle<=180){
												this.angle = 180-this.angle+parseInt(randomangle());
												angle1.value = this.angle;
												}else{
												this.angle = 360-(this.angle-180)+parseInt(randomangle());
												angle1.value = this.angle;
												}
								}else if ( (bobj.hs <= this.height) && (this.height <= bobj.hf) && (bobj.ws == Math.floor(this.width) ||  bobj.wf == Math.floor(this.width)+1) ){
											//alert(' ws-'+bobj.ws+' wf-'+bobj.wf+' hs-'+bobj.hs+' hf-'+bobj.hf);							
											this.angle = 360-this.angle+parseInt(randomangle());
											angle1.value = this.angle;											
								}
				}
}
function field(width, height){
    this.width = width;  
    this.height = height;
	this.inborders = function(x,y) {
				if ( 0<=x && this.width>=x && 0<=y && this.height>=y ){
				return true;
				}else{
				return false;
				}
	}
}
function borde(widths, heights, widthf, heightf){
    this.widths = widths;  
    this.heights = heights;
    this.widthf = widthf;  
    this.heightf = heightf;
	this.line = function (x, y) {				
				//xnew = ((y-this.heights)*(this.widthf-this.widths)/(this.heightf-this.heights))+this.widths;
				if (this.widths <=x && this.widthf >= x && this.heights<=y && this.heightf>=y){
				return true;
				}else{
				return false;
				}
	}
	this.move = function (x,y,z,w) {
		    this.widths = x;  
			this.heights = y;
			this.widthf = z;  
			this.heightf = w;
		
	}
}
function brick(ws, hs){
    this.ws = ws;  
    this.hs = hs;
    this.wf = this.ws + 60;  
    this.hf = this.hs + 20;
	this.inbrick = function (x, y) {				
				//xnew = ((y-this.heights)*(this.widthf-this.widths)/(this.heightf-this.heights))+this.widths;
				if (this.widths <=x && this.widthf >= x && this.heights<=y && this.heightf>=y){
				return true;
				}else{
				return false;
				}
	}
}
function render(rendobj,x,y){
	rendobj.style.left = x;
	rendobj.style.bottom = y;
}
function desk(){			// old
	this.long = 50;
}
function step(){			// step
// step start
bw.innerHTML=Math.floor(point.width);
bh.innerHTML=Math.floor(point.height);
bs.innerHTML=point.speed;
ba.innerHTML=point.angle;
render(bullet,point.width,point.height);

// borders collide
	if (line0.line(Math.floor(point.width), Math.floor(point.height))) {
		//alert('0');
		if (point.angle<=180){
			point.angle = 180-point.angle;
			angle.value = point.angle;
			}else{
			point.angle = 360-(point.angle-180);
			angle.value = point.angle;
			}
	}
	if (line1.line(Math.floor(point.width), Math.floor(point.height))) {
		alert('Game Over');
		point.angle = 360-point.angle;
		angle.value = point.angle;	
	}
	if (line2.line(Math.floor(point.width), Math.floor(point.height))) {
		//alert('2');
		if (point.angle<=180){
			point.angle = 180-point.angle;
			angle.value = point.angle;
			}else{
			point.angle = 360-(point.angle-180);
			angle.value = point.angle;
			}
	}
	if (line3.line(Math.floor(point.width), Math.floor(point.height))) {
		//alert('3');
		point.angle = 360-point.angle; 
		angle.value = point.angle;
	}
	if (line4.line(Math.floor(point.width), Math.floor(point.height))) {     // desk
		point.angle = 360-point.angle;
		angle.value = point.angle;	
	}
	
// bricks collide
bricks.forEach(function(item, i, bricks){
				if (point.incheck(window['brickobj'+[i]])){	
						point.collide(window['brickobj'+[i]]);
					}
});


point.move(speed.value,angle.value);
}
function left(){
		//alert("left");
		if (document.getElementById("angle").value-5 < 0) {
			newangl1 = 360 - document.getElementById("angle").value - 5;
		} else {
			newangl1 = document.getElementById("angle").value - 5;
		}
		document.getElementById("angle").value = newangl1;	
}
function right(){
		//alert("right");
		//newangl1 = document.getElementById("angle").value;
		if (5 + parseInt(document.getElementById("angle").value) > 360) {
			newangl1 = parseInt(document.getElementById("angle").value) - 355;
		} else {
			newangl1 = parseInt(document.getElementById("angle").value) + 5;
		}
		document.getElementById("angle").value = newangl1;	
}
function movement2(){     // old
	this.left1 = function() {
		alert("left");
		document.getElementById("angle").value = document.getElementById("angle")-5;
	}
	this.right1 = function() {
		alert("right");
		document.getElementById("angle").value = document.getElementById("angle")+5;
	}
}
function checkKey(e){     // controls
    e = e || window.event;
    if (e.keyCode == '38') {
        // up arrow
    }
    else if (e.keyCode == '40') {
        // down arrow
    }
    else if (e.keyCode == '37') {
       left(); // left arrow
    }
    else if (e.keyCode == '39') {
       right(); // right arrow
    }
}
function movement(){	  // time
	var t;
	this.start = function start() {
	t+=1;
	timers[t] = setInterval(step,30);
	startbut.disabled = true;
	stopbut.disabled = false;
	}
	this.stop = function stop() {	
	clearInterval(timers[t]);
	//for (var i = 0; i < timers.length; i++) clearInterval(timers[i]);
	t = 0;
	startbut.disabled = false;
	stopbut.disabled = true;	
	}	
	this.move = function move() {
		step();
	}
	
	
}

// init

var bbox1 = document.getElementById("bbox");
var bscroll1 = document.getElementById("bscroll");
var tscroll1 = document.getElementById("tscroll");

// init ball
point = new ball(5,5,1,45);
var bull1 = document.createElement("div");
bull1.setAttribute("id", "bullet");
bbox1.appendChild(bull1);

// init controlslider
var slide1 = document.createElement("div");
slide1.setAttribute("id", "slide");
bbox1.appendChild(slide1);

var pad1 = document.createElement("pad");
pad1.setAttribute("id", "pad");
slide1.appendChild(pad1);

// init deskmove
document.getElementById("slide").onscroll = function(){
	//var pad2 = document.getElementById("slide");
	tsvalue = document.getElementById("slide").scrollTop;
	//alert (tsvalue);
	document.getElementById("bscroll").innerHTML = Math.floor(tsvalue/2600*240);
	
	desk1.style.top = tsvalue/2600*240;
	line4.move(440,210-tsvalue/2600*240,440,240-tsvalue/2600*240);
	
}

var desk1 = document.createElement("desk");
desk1.setAttribute("id", "desk");
bbox1.appendChild(desk1);

// init objects
var objlist = ['acord','bcord','angle','speed','bw','bh','bs','ba','bullet','bbox','desk'];
objlist.forEach(function(item,i,objlist){
	name = objlist[i];
	window['name'] = document.getElementById(name);
	if (objlist[i] == 'bullet'){
			bullet.style.width = "15px";
			bullet.style.height = "15px";
			bullet.style.background = "yellow";
			bullet.style.position = "absolute";
			bullet.style.zIndex="3";		
	}
	if (objlist[i] == 'bbox'){
			bbox.style.width = "480px";
			bbox.style.height = "240px";
			bbox.style.background = "rgba(128, 128, 128, 0)";
			bbox.style.position = "relative";
			bbox.style.zIndex="1";
	}
	if (objlist[i] == 'desk'){
			desk1.style.width = "10px";
			desk1.style.height = "30px";
			desk1.style.background = "blue";
			desk1.style.position = "absolute";
			desk1.style.left = "440px";
			desk1.style.zIndex="4";
			desk1.style.border ="2px";
	}	
});

// init borders
var lines = [
	[0,0,480,0],   			// down
	[480,0,480,240],  		 //  right
	[0,240,480,240],  		 //   up
	[0,0,0,240],     		  //   left
	[440,240,440,210],  		 //  right desk
];
lines.forEach(function(item, i, lines)  {
window["line"+i] = new borde(lines[i][0],lines[i][1],lines[i][2],lines[i][3]);
});

// init bricks    1 - height   2 - width
var bricks = [
	[50,90],
	[30,170],
	[100,40],
	[130,130],
	[175,190],
	[210,20],
	[260,100],
	[305,70],
	[320,170],
	[355,90],
	[370,20],

];
bricks.forEach(function(item, i, bricks)  {
	window["brickobj"+i] = new brick(bricks[i][0],bricks[i][1]);
	name = "brickobj"+i;
	var para = document.createElement("div");
	para.setAttribute("id", name);
	var element = document.getElementById("bbox");
	element.appendChild(para);
	para = "";
	element="";
	bbrickz = document.getElementById(name);
	name = '';
	bbrickz.style.border ="2px";
	bbrickz.style.width = window["brickobj"+i].wf - window["brickobj"+i].ws;
	bbrickz.style.height = window["brickobj"+i].hf - window["brickobj"+i].hs;
	bbrickz.style.bottom = window["brickobj"+i].hs;
	bbrickz.style.left = window["brickobj"+i].ws;
	bbrickz.style.background = "brown";
	bbrickz.style.position = "absolute";
	bbrickz.style.zIndex="2";
	brickz = '';
});

// set buttons
startbut = document.getElementById('start');
stopbut = document.getElementById('stop');

startbut.disabled = false;
stopbut.disabled = true;

// init controls
document.onkeydown = checkKey;

// init time
var timers = [];
time1 = new movement;

//start time
time1.start();


