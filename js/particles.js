var canvas = document.querySelector("#sceneparticles"),
  ctx = canvas.getContext("2d"),
  particles = [],
  amount = 0,
  mouse = {x:1000,y:1000},
  radius = 3;

var colors = ["#FFFFFF","#FFFFF0", "#FFFFD0","#FFFFE0", "#FFFFAF"];

var copy = "Doge Multiverse";// document.querySelector("#copy");

var ww = canvas.width = window.innerWidth;
var wh = canvas.height = window.innerHeight; 
function Particle(x,y){
  this.x =  (10*(Math.random()-0.5))+x;
  this.y =  (300*(Math.random()-0.5))+y;
  this.dest = {
    x : x,
    y: y
  };
  this.r =  Math.random()*0.5 + 7;
  this.vx = (Math.random()-0.5)*30;
  this.vy = (Math.random()-0.5)*30;
  this.accX = 0;
  this.accY = 0;
  this.friction =  0.23991975974;//Math.random()*0.05 +

  this.color = colors[Math.floor(Math.random()*6)];
}

Particle.prototype.render = function() {
  this.accscale = 50;
  this.accX = (this.dest.x - this.x)/this.accscale;
  this.accY = (this.dest.y - this.y)/this.accscale;

  this.vx += this.accX -this.vx*this.friction;
  this.vy += this.accY-this.vy*this.friction;
  this.x += this.vx+Math.random()*1.95;
  this.y +=  this.vy+Math.random()*1.95;

  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
  ctx.fill();

  var a = this.x - mouse.x;
  var b = this.y - mouse.y;

  var distance2 = ( a*a + b*b );
  if(distance2<((radius*70)*(radius*70))){
    this.accX = (this.x - mouse.x)/80;
    this.accY = (this.y - mouse.y)/80;
    this.vx += this.accX;
    this.vy += this.accY;
  }

}

function onMouseMove(e){
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}

function onTouchMove(e){
  if(e.touches.length > 0 ){
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
  }
}

function onTouchEnd(e){
mouse.x = -9999;
mouse.y = -9999;
}

function initScene(){
  ww = canvas.width = window.innerWidth;
  wh = canvas.height = window.innerHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.font = "bold "+(ww/10)+"px sans-serif";
  ctx.textAlign = "center";
  ctx.transform(1,0,0,5,0,0);
  ctx.fillText(copy, ww/2, wh/8);
  
  var data  = ctx.getImageData(0, 0, ww, wh).data;
  ctx.setTransform(1,0,0,1,0,0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "screen";

  particles = [];
  scale=50;
  for(var i=0;i<ww;i+=Math.round(ww/scale/3)){
    for(var j=0;j<wh;j+=Math.round(wh/scale/1.5)){
      if(data[ ((i + j*ww)*4) + 3] > 10){ 
        particles.push(new Particle(i,j));
      }
    }
  }
  amount = particles.length;

}

function renderer(a) {
  requestAnimationFrame(renderer);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < amount; i++) {
    particles[i].render();
  }
};

//copy.addEventListener("keyup", initScene);
window.addEventListener("resize", initScene);
window.addEventListener("mousemove", onMouseMove);
window.addEventListener("touchmove", onTouchMove); 
window.addEventListener("touchend", onTouchEnd);
initScene();
requestAnimationFrame(renderer);

