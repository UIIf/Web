var CurWidth, CurHeigth, g, SpeedOfEnemy, GlobalTimer, GlobalMaxTime;
var A, Bullets, Enemys, bullet_size;
var Pause, USix, PauseTemp;

var Setting_MaxCD = 60, SettingDMGColor = 30;
var Name = ',';

var AllLeaderBoard;
var ShowLeaderBoard = false;
var IsGatingName = false;


//Other Function
var audio = new Audio('Shot.mp3');


function reboot() {
  CurWidth = document.documentElement.clientWidth;
  CurHeigth = document.documentElement.clientHeight;
  g = CurWidth / 10000;
  SpeedOfEnemy = 0.7;
  GlobalTimer = -100;
  GlobalMaxTime = 150;
  A = new MAinCharacter(CurWidth, CurHeigth);
  Bullets = [];
  Enemys = [];
  bullet_size = A.size / 10;
  Pause = true;
  
  USix = new UIX();
}

function GetLeaderBoard(){
  if(document.cookie != ""){
    AllLeaderBoard = document.cookie.split("; ");
    let TempStr;
    
    for(let i = 0; i < 9; i ++)
      for(let j = 0; j < 9 - i; j++){
        if(int(AllLeaderBoard[j].slice(0,1)) > int(AllLeaderBoard[j+1][0].slice(0,1))){
          TempStr = AllLeaderBoard[j];
          AllLeaderBoard[j] = AllLeaderBoard[j+1];
          AllLeaderBoard[j+1] = TempStr;
        }
      }
    for(let i = 0; i < AllLeaderBoard.length; i++)
    {
      AllLeaderBoard[i] = AllLeaderBoard[i].slice(2,);
      AllLeaderBoard[i] = AllLeaderBoard[i].split(":");
    }
  }
  else
    AllLeaderBoard = [];
}


function EnterInLeaderBoard()
{
  if(document.cookie == ""){
    for (var i = 0; i < 10; i ++){
      document.cookie = str(i) + "=A:-1";
    }
    document.cookie =str(0)+"="+ str(Name) + ":"+ str(A.Score);
  }
  else{
    let LeaderBoard = document.cookie.split("; ");
    
    let TempStr;
    
    
    for(let i = 0; i < 9; i ++)
      for(let j = 0; j < 9 - i; j++){
        if(int(LeaderBoard[j].slice(0,1)) > int(LeaderBoard[j+1][0].slice(0,1))){
          TempStr = LeaderBoard[j];
          LeaderBoard[j] = LeaderBoard[j+1];
          LeaderBoard[j+1] = TempStr;
        }
      }
    
    for(let i = 0; i < LeaderBoard.length; i++)
    {
      LeaderBoard[i] = LeaderBoard[i].slice(2,);
      
      LeaderBoard[i] = LeaderBoard[i].split(":");
    }
    
    if(int(LeaderBoard[9][1]) < A.Score)
    {
      LeaderBoard[9][0] = Name;
      LeaderBoard[9][1] = str(A.Score);
      for(let i = 8; i > -1; i--){
        if(int(LeaderBoard[i][1]) < int(LeaderBoard[i+1][1]))
        {
          TempStr = LeaderBoard[i][0];
          LeaderBoard[i][0] = LeaderBoard[i+1][0];
          LeaderBoard[i+1][0] = TempStr;
          TempStr = LeaderBoard[i][1];
          LeaderBoard[i][1] = LeaderBoard[i+1][1];
          LeaderBoard[i+1][1] = TempStr;
        }
        else
          break;
      }
    }
    
    for(let i = 0; i < 10; i++)
      document.cookie = str(i) + "=" + LeaderBoard[i][0] + ":"+ LeaderBoard[i][1];
  }

}


function GetNAme()
{
  IsGatingName = true;
  PauseTemp = Pause;
  Pause = false;
  background('rgba(51,51,51, 0.40)');
  var a = document.getElementsByTagName("form")[0];
  a.classList.toggle("hidden");
  document.getElementsByTagName("body")[0].append(a);
}

function ConfirmName()
{
  var Text = $("input").val();
  if(Text.indexOf(':') == -1 && Text.indexOf(';') == -1 && Text.length < 10 && Text.length>0)
    {
      Name = Text;
      DenyName();
    }
  else{
    alert("Incorect");
  }
}

function DenyName()
{
  IsGatingName = false;
  Pause = true;
  document.getElementById("forms").classList.toggle("hidden");
}


//Class Main Character


class MAinCharacter{
  constructor(w,h)
  {
    this.size = h/20;
    this.pos = [0,h/2];
    this.Exp = 0;
    this.lvl = 1;
    this.needForLvl = 15;
    this.vel = 0;
    this.slow = 20
    this.countdown = 0;
    this.maxcountdown = Setting_MaxCD;
    this.HP = 10;
    this.textSize = CurHeigth/20;
    this.Score = 0;
  } 
  
  move()
  {
    if(mouseY > 0 && mouseY < CurHeigth -this.textSize*6/5){
      this.vel  = (mouseY -this.size/2 - this.pos[1])/this.slow;
    }
    this.pos[1] += this.vel;
    if(this.pos[1] > CurHeigth - this.size - this.textSize*6/5)
    {
      this.pos[1] = CurHeigth - this.size - this.textSize*6/5;
      this.vel = 0;
    }
    if(this.pos[1] < 0)
    {
      this.vel = 0;
      this.pos[1] = 0;
    }
  }
  
  draw()
  {
    fill(150);
    rect(0,CurHeigth - this.textSize*6/5,CurWidth, this.textSize*6/5)
    fill(130);
    rect(this.pos[0],this.pos[1], this.size, this.size);
    fill(102);
    rect(this.pos[0],this.pos[1], this.size*this.countdown/this.maxcountdown, this.size);
    noStroke();
    textSize(this.textSize);
    textAlign(RIGHT);
    text(str(this.Exp) + '/' + str(this.needForLvl) ,CurWidth - this.textSize/10, CurHeigth - this.textSize / 5);
    textAlign(CENTER);
    text("Score: "+str(this.Score),CurWidth/2, this.textSize + CurHeigth/1000);
    textAlign(LEFT);
    text(str(this.HP),this.textSize / 10, CurHeigth - this.textSize / 5);
    stroke(60);
  }
}


//Class Bullets


class Bullet{
  constructor(w,h,size,speedX,speedY)
  {
    this.pos = [w,h];
    this.speed = [speedX,speedY];
    this.size = size;
  }
  move()
  {
    this.speed[1] += g;
    this.pos[0] += this.speed[0];
    this.pos[1] += this.speed[1];
    for(let i = 0; i  < Enemys.length;i++)
    {
      if(Math.pow(this.pos[0] - Enemys[i].pos[0],2) + Math.pow(this.pos[1] - Enemys[i].pos[1],2) <= this.size * this.size/4 + Enemys[i].size * Enemys[i].size/4)
      {
        Enemys[i].HP --;
        Enemys[i].color += SettingDMGColor;
        A.Score += 1;
        let temp = Enemys[i].size;
        //LEVEL_UP
        if(Enemys[i].HP == 0)
        {
          A.Exp += Enemys[i].Exp;
          if(A.Exp > A.needForLvl)
          {
            A.lvl += 1;
            A.HP = 10 + A.lvl-1;
            A.Exp -= A.needForLvl;
            A.needForLvl = int(A.needForLvl*1.5);
            A.maxcountdown = Setting_MaxCD - A.lvl;
            if(A.lvl < 6)
              bullet_size +=  A.lvl*2;
            if(A.maxcountdown < 20)
              A.maxcountdown = 20
          }
          Enemys.splice(i,1);
        }
        if(this.size < temp)
        return 1;
      }
    }
    if(this.pos[0] > CurWidth + this.size || this.pos[1] > CurHeigth + this.size)
      return 1;
    else
      return 0;
  }
  draw()
  {
    fill(102);
    ellipse(this.pos[0], this.pos[1], this.size, this.size);
  }
}


//Class Enemy


class Enemy{
  constructor(size,speed,hp)
  {
    this.pos = [CurWidth, Math.random()*(CurHeigth - size*2 - A.textSize*12/5) + size + A.textSize*7/5];
    this.size = size;
    this.speed = speed;
    this.HP = hp;
    this.Exp = hp;
    this.color = 200 - hp*SettingDMGColor;
  }
  
  move()
  {
    this.pos[0] -= SpeedOfEnemy + this.speed;
    
    if(this.pos[0] < 0)
      return 1;
    else
      return 0;
  }
  
  draw(){
    fill(this.color);
    ellipse(this.pos[0],this.pos[1],this.size,this.size);
  }
}


//Class UIX


class UIX{
  constructor(){
    this.BtnSize = CurHeigth/20;
    this.BtnPausePos = [CurWidth-this.BtnSize*6/5,this.BtnSize/5];
    this.BtnPerson = [CurWidth-this.BtnSize*12/5,this.BtnSize/5];
    this.TabPos = [CurWidth/2-this.BtnSize*3/2, CurHeigth - this.BtnSize *5.5/ 5]
  }
  draw(){
    fill(150);
    rect(this.BtnPausePos[0],this.BtnPausePos[1],this.BtnSize,this.BtnSize);
    rect(this.BtnPerson[0],this.BtnPerson[1],this.BtnSize,this.BtnSize);
    fill(170);
    noStroke();
    
    triangle(this.TabPos[0],this.TabPos[1] + this.BtnSize*3/4,this.TabPos[0] + this.BtnSize*3/2, this.TabPos[1] + this.BtnSize/4, this.TabPos[0] + this.BtnSize*3,this.TabPos[1] + this.BtnSize*3/4)
    
    ellipse(this.BtnPerson[0] + this.BtnSize/2,this.BtnPerson[1] + this.BtnSize/2.5,this.BtnSize/2.5,this.BtnSize/2.5);
//    ellipse(this.BtnPerson[0] + this.BtnSize/2,this.BtnPerson[1] + this.BtnSize*8/9,this.BtnSize/1.2,this.BtnSize/1.5);
    arc(this.BtnPerson[0] + this.BtnSize/2,this.BtnPerson[1] + this.BtnSize*8/9,this.BtnSize/1.3,this.BtnSize/1.5,Math.PI,0,OPEN);
    
    rect(this.BtnPausePos[0] + this.BtnSize/5, this.BtnPausePos[1] + this.BtnSize/8,this.BtnSize/6,this.BtnSize*6/8);
    rect(this.BtnPausePos[0] + this.BtnSize*3/5, this.BtnPausePos[1] + this.BtnSize/8,this.BtnSize/6,this.BtnSize*6/8);
    stroke(60);
  }
}


//Generate Function


function EnemyGenerate()
{
  let temp = Math.random()*(47 + A.lvl);
    if(temp < 30)
    {
      Enemys.push(new Enemy(A.size,CurWidth/500,1))
    }
    else if(temp < 50)
    {
      Enemys.push(new Enemy(A.size*1.3,CurWidth/1000,2))
    }
    else
    {
      Enemys.push(new Enemy(A.size*1.5,CurWidth/700,3))}
}





function setup() {
  reboot();
  createCanvas(CurWidth, CurHeigth);
  // if(document.cookie.indexOf( "_ga") != -1){
  //      deleteAllCookies();
  //    }
//  console.log(document.cookie);
  if(Name == ',')
    GetNAme();
  
}

// var Name = prompt("Введите имя","NagiBator2007");

//T == 84
// R == 82
// P == 80

$(document.body).on('keydown', function(e) {
    if(IsGatingName == false)
    {
      switch(e.which){
        case 82:
          EnterInLeaderBoard();
          setup();
          break;
        case 81:
          Pause = !Pause;
          break;
        case 84:
          ShowLeaderBoard = !ShowLeaderBoard;
          if(ShowLeaderBoard)
            GetLeaderBoard();
          break;
      }
    }
});

$(document.body).on('click', function(e) {
    //Buttons
    if(IsGatingName == false){
      if(mouseY > USix.BtnPausePos[1] && mouseY < USix.BtnPausePos[1] + USix.BtnSize){
        if(mouseX > USix.BtnPausePos[0] && mouseX < USix.BtnPausePos[0] + USix.BtnSize)
          Pause = !Pause;
        else if(mouseX > USix.BtnPerson[0] && mouseX < USix.BtnPerson[0] + USix.BtnSize)
          GetNAme();
      }
      else if(USix.TabPos[0] < mouseX && USix.TabPos[0] + USix.BtnSize*3 > mouseX)
        if(USix.TabPos[1]< mouseY && USix.TabPos[1] + USix.BtnSize > mouseY){
          ShowLeaderBoard = !ShowLeaderBoard;
          if(ShowLeaderBoard)
            GetLeaderBoard();
        }
    }

});



function draw() {
  if(Pause){
    background(220);
    
    if(ShowLeaderBoard){
      
      noStroke();
      fill(170);
      textAlign(CENTER);
      let NowWidth = CurWidth/2;
      let NowHeight = CurHeigth/6;
      let Size = (CurHeigth - NowHeight*2)/10;
      textSize(Size);
      
      for(let i = 0; i < AllLeaderBoard.length; i ++){
        if(int(AllLeaderBoard[i][1]) != -1)
        text(AllLeaderBoard[i][0]+':'+AllLeaderBoard[i][1],NowWidth,NowHeight + Size*i);
        else break;
      }
      textAlign(LEFT);
      stroke(60);
    }
    
    A.move();
    
    //Timers
    if(A.countdown > 0)
        A.countdown --;

    GlobalTimer += 1;    
    
    //Shots
    if(A.countdown == 0 && mouseIsPressed)
    {
      audio.play();
      if(CurWidth/40 + A.lvl < A.size)
      Bullets.push(new Bullet(A.pos[0],A.pos[1] + A.size/2,bullet_size,CurWidth/80 + A.lvl,0))
      else
        Bullets.push(new Bullet(A.pos[0],A.pos[1] + A.size/2,bullet_size,A.size,0))
      A.countdown = A.maxcountdown;
    }

    //Bulets Mecanics
    for (let i = 0; i < Bullets.length;i++)
    {

      if(Bullets[i].move())
      {
        Bullets.splice(i,1);
        i--;
        continue;
      }
      Bullets[i].draw();
    }

    //Enemy Generate
    if(GlobalTimer == GlobalMaxTime - A.lvl){
      GlobalTimer = 0;
      EnemyGenerate();
    }

    //Enemy move
    for(let i = 0; i < Enemys.length;i++){
      if(Enemys[i].move())
      {
        A.HP -= 1;
        Enemys.splice(i,1);
        i--;
      }
      else
        Enemys[i].draw();
    }

    //Death
    if(A.HP <= 0){
      document.getElementById("defaultCanvas0").remove();
      EnterInLeaderBoard();
      GetLeaderBoard();
      
      setup();
    }

    A.draw();
    
    USix.draw();
  }
  
}