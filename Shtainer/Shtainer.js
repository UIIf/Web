var Dots = [];
var Size = window.innerWidth/ 100;
function setup() {
    createCanvas(window.innerWidth,window.innerHeight);
	background(210);
}

function LineCircleItersection(Center, BigEllipseSize,K,B) {
    var
        a = 1 + K ** 2,
        b = -2 * Center[0] + 2 * K * B- 2 * K * Center[1],
        c = -(BigEllipseSize ** 2) + (B - Center[1]) ** 2 + Center[0] ** 2,
        d = b ** 2 - 4 * a * c;

    if (d < 0) {
        return [];
    }
    let
        x1 = (-b - Math.sqrt(d)) / (2 * a),
        x2 = (-b + Math.sqrt(d)) / (2 * a);

    return [
        [x1, K * x1 + B],
        [x2, K * x2 + B],
    ]
}

function Shtainer(){
	{
		var CurDots = [0,1];
		var Other = 2;
		var Min = Math.pow(Dots[0][0] - Dots[1][0],2) + Math.pow(Dots[0][1] - Dots[1][1],2);

		if(Math.pow(Dots[0][0] - Dots[2][0],2) + Math.pow(Dots[0][1] - Dots[2][1],2) < Min){
			Min = Math.pow(Dots[0][0] - Dots[2][0],2) + Math.pow(Dots[0][1] - Dots[2][1],2);
			CurDots = [0,2];
			Other = 1;
		}
		if(Math.pow(Dots[1][0] - Dots[2][0],2) + Math.pow(Dots[1][1] - Dots[2][1],2) < Min){
			Min = Math.pow(Dots[1][0] - Dots[2][0],2) + Math.pow(Dots[1][1] - Dots[2][1],2);
			CurDots = [1,2];
			Other = 0;
		}

		//Findings 3rd point of tringles	
		var Pick = []
		Pick.push([(Dots[CurDots[1]][0] - Dots[CurDots[0]][0]) /2 - (Dots[CurDots[1]][1] - Dots[CurDots[0]][1]) * Math.sin(Math.PI/3) + Dots[CurDots[0]][0],(Dots[CurDots[1]][0] - Dots[CurDots[0]][0])* Math.sin(Math.PI/3) + (Dots[CurDots[1]][1] - Dots[CurDots[0]][1]) /2 + Dots[CurDots[0]][1]]);
		Pick.push([(Dots[CurDots[1]][0] - Dots[CurDots[0]][0])* Math.cos(-Math.PI/3) - (Dots[CurDots[1]][1] - Dots[CurDots[0]][1]) * Math.sin(-Math.PI/3) + Dots[CurDots[0]][0],(Dots[CurDots[1]][0] - Dots[CurDots[0]][0])* Math.sin(-Math.PI/3) + (Dots[CurDots[1]][1] - Dots[CurDots[0]][1]) * Math.cos(-Math.PI/3) + Dots[CurDots[0]][1]]);


		//Finding NEEDED pick
		var CurPick;
		if(Math.pow(Pick[0][0] - Dots[Other][0],2) + Math.pow(Pick[0][1] - Dots[Other][1],2) > Math.pow(Pick[1][0] - Dots[Other][0],2) + Math.pow(Pick[1][1] - Dots[Other][1],2)){
			CurPick= Pick[0];
		}
		else{
			CurPick = Pick[1];
		}

		//Finding center of triangle
		var Center = ([(Dots[CurDots[0]][0] + Dots[CurDots[1]][0] + CurPick[0])/3,
					  (Dots[CurDots[0]][1] + Dots[CurDots[1]][1] + CurPick[1])/3]);

		//Finding Size of circle
		var BigEllipseSize = (Math.sqrt(Math.pow(CurPick[0] - Center[0],2) + Math.pow(CurPick[1] - Center[1],2)));

		//Finding points of PErpendicular of tringle
		var K = (Dots[Other][1] - CurPick[1])/(Dots[Other][0] - CurPick[0]);
		var B = (CurPick[0]*CurPick[1] - CurPick[0]*Dots[Other][1])/(Dots[Other][0] - CurPick[0]) + CurPick[1];
		var Shtainer = LineCircleItersection(Center, BigEllipseSize,K,B);
	//
		if(Shtainer != []){
			if((Shtainer[0][0]-Dots[Other][0])**2 + (Shtainer[0][1]-Dots[Other][1])**2 <
			  (Shtainer[1][0]-Dots[Other][0])**2 + (Shtainer[1][1]-Dots[Other][1])**2){
				Shtainer = Shtainer[0];
			}
			else{
				Shtainer = Shtainer[1];
			}
		};

		stroke(170);

		//Conect all the points
		line(Dots[CurDots[0]][0],Dots[CurDots[0]][1],Dots[CurDots[1]][0],Dots[CurDots[1]][1]);
		line(Dots[CurDots[0]][0],Dots[CurDots[0]][1],CurPick[0],CurPick[1]);
		line(CurPick[0],CurPick[1],Dots[CurDots[1]][0],Dots[CurDots[1]][1]);
		line(CurPick[0],CurPick[1],Shtainer[0],Shtainer[1]);

		stroke(0);
		line(Dots[CurDots[0]][0],Dots[CurDots[0]][1],Shtainer[0],Shtainer[1]);
		line(Shtainer[0],Shtainer[1],Dots[Other][0],Dots[Other][1]);
		line(Shtainer[0],Shtainer[1],Dots[CurDots[1]][0],Dots[CurDots[1]][1]);

		stroke(170);

		//Draw Center of tringle
		noFill();
		ellipse(Center[0],Center[1],Size/2,Size/2);


		//Draw Largest circle
		ellipse(Shtainer[0],Shtainer[1],Size,Size);
		ellipse(Center[0],Center[1],BigEllipseSize*2,BigEllipseSize*2);
	//	
		//Drawing points
		fill(0,200,50,20);
		ellipse(CurPick[0],CurPick[1],Size,Size);

		//Draw Shtainer Point
		fill(50, 98, 110);
		ellipse(Shtainer[0],Shtainer[1],Size,Size);

		//Draw other points
	}
}

function DrawFunc(){
	background(210);
	
	AB = [Dots[1][0] - Dots[0][0], Dots[1][1] - Dots[0][1]];
	ABlen = Math.sqrt(AB[0]*AB[0] + AB[1]*AB[1]);
	AC = [Dots[2][0] - Dots[0][0], Dots[2][1] - Dots[0][1]];
	AClen = Math.sqrt(AC[0]*AC[0] + AC[1]*AC[1]);
	BC  = [Dots[2][0] - Dots[1][0], Dots[2][1] - Dots[1][1]];
	BClen = Math.sqrt(BC[0]*BC[0] + BC[1]*BC[1]);
	
	angel = 180/Math.PI;
	
	A = Math.acos((AB[0]*AC[0] + AB[1]*AC[1])/(ABlen*AClen))*angel;
	B = Math.acos((-AB[0]*BC[0] - AB[1]*BC[1])/(ABlen*BClen))*angel;
	C = Math.acos((AC[0]*BC[0] + AC[1]*BC[1])/(AClen*BClen))*angel;
	
	
	console.log(A,B,C);
	if(A < 120 && B < 120 && C < 120)
		Shtainer();
	else{
		fill(0);
		if(isNaN(A))
			A = 0;
		if(isNaN(B))
			B = 0;
		if(isNaN(C))
			C = 0;
		text(String(Math.round(A)),Dots[0][0]+20,Dots[0][1]);
		text(String(Math.round(B)),Dots[1][0]+20,Dots[1][1]);
		text(String(Math.round(C)),Dots[2][0]+20,Dots[2][1]);
		stroke(0);
		if(A < 120)
			line(Dots[1][0],Dots[1][1],Dots[2][0],Dots[2][1]);
		if(B < 120)
			line(Dots[0][0],Dots[0][1],Dots[2][0],Dots[2][1]);
		if(C < 120)
			line(Dots[1][0],Dots[1][1],Dots[0][0],Dots[0][1]);
	}
	fill(0,240,50);
	
	for(var i = 0; i < 3; i++){
		ellipse(Dots[i][0],Dots[i][1],Size,Size);
	}
}

$(document.body).on('click',function(e){
	if(Dots.length > 2){
		Dots.splice(0,1);
	}
	Dots.push([mouseX,mouseY]);
	fill(0,240,50);
	ellipse(mouseX,mouseY,Size,Size);
	if(Dots.length == 3){
		DrawFunc();
	}
});



//function draw() {
//  background(210);
//}
