$=(d)=>{return document.querySelector(d)};
c=(d, l)=>{return document.querySelector('#c'+d+'_'+l)}
new mdc.ripple.MDCRipple($('#shopButton'));
new mdc.ripple.MDCRipple($('.menu')).unbounded=true;
if (localStorage.getItem('tot')!==null||localStorage.getItem('tot')!=='') {
	this.tot=JSON.parse(localStorage.getItem('tot'));
} else {
		this.tot = {
		candy:0,
		pumpkins:100, 
		x:0,
		y:0,
		shift: {
			x:10,
			y:9	
		},
		seed:Math.floor(Math.random()*100)
	}
}
var tile = function(co, ct) {
	this.x = co.x;
	this.y = co.y;
	this.ct = ct;
	c(co.x, co.y).innerHTML=ct;
} 
draw=()=>{
	box.innerHTML = "";
	for (y=17-tot.shift.y;y>0-tot.shift.y;y--) {
		r=document.createElement('tr')
		r.id='y'+y;
		box.appendChild(r);
		for (x=0-tot.shift.x;x<21-tot.shift.x;x++) {
			l=document.createElement('td')
			l.id='c'+x+'_'+y;
			l.style.height='10px';
			l.style.width='10px';
			l.innerHTML=',';
			l.style.fontSize='90%';
			l.style.textAlign='center';
			$('#y'+y).appendChild(l);
			
		}
	}
	for (var x = 0-tot.shift.x; x < 21-tot.shift.x; x++) {
		for (var y = 0-tot.shift.y+1; y < 17-tot.shift.y+1; y++) {
			var value = noise.simplex2(x / 100, y / 100);
			//console.log((x-tot.shift.x) + ',' + (y-tot.shift.y+1) + ',' + value);
			if (value < 0) {
				value = Math.abs(value);
			}
			if (value < 0.2) {
				new tile({x:x,y:y}, ',') 
			}
			if (value > 0.5&&value<0.55||value > 0.2&&value<0.25||value>0.425&&value<0.433||value>0.575&&value<0.483||value>0.7&&value<0.8||value>0.85&&value<0.95||value>0.3&&value<0.4) {
				new tile({x:x,y:y}, 'H') 
			}
			
		}
	}
	new tile({x:tot.x, y:tot.y}, '%');
	localStorage.setItem('tot', JSON.stringify(tot));
}
noise.seed(tot.seed);
draw();
move=(d)=> {
	if (d=='s'){tot.y--;tot.shift.y++;draw();}
	if (d=='w'){tot.x--;tot.shift.x++;draw();}
	if (d=='n'){tot.y++;tot.shift.y--;draw();}
	if (d=='e'){tot.x++;tot.shift.x--;draw();}
	localStorage.setItem('tot', JSON.stringify(tot));
}
document.onkeydown=(e)=>{	
	if (e.key=='w'){move('n')}
	if (e.key=='a'){move('w')}
	if (e.key=='s'){move('s')}
	if (e.key=='d'){move('e')}
}
$('#hmc').innerHTML=tot.candy;
$('#hmp').innerHTML=tot.pumpkins;
window.cls=()=>{localStorage.setItem('tot', JSON.stringify(tot));}