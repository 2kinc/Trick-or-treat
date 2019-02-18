new mdc.ripple.MDCRipple(document.querySelector('#shopButton'));
new mdc.ripple.MDCRipple(document.querySelector('.menu')).unbounded=true;
var sdialog = mdc.dialog.MDCDialog.attachTo(document.querySelector('#statsDialog'));

function setCookie(cname, cvalue) {
  var d = new Date();
  d.setTime(d.getTime() + (30*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
var tbl = ['<table><tr>'];
for (var i = 0; i < 400; i++) {
    tbl.push("<td id='t" + i + "'></td>");
    if ((i + 1) % 25 == 0)
        tbl.push('</tr><tr>');
}
tbl.push('</tr></table>');
box.innerHTML = tbl.join('');
var tds = document.querySelectorAll('td');
var currentCell = 210;
var possible = ['H', ' ', ' ', ' ', ' ', ' ', ' ', 'G'];
map='';
var currentLetter=map.charAt(currentCell);
if (getCookie('map')!=='') {
	map = getCookie('map');
} 
if (getCookie('currentCell')!=='') {
	currentCell=Number(getCookie('currentCell'));
}
draw=()=> {
	if (map == '') {
		for (i=0;i<tds.length;i++) {
			tds[i].innerHTML = possible[Math.floor(Math.random()*7.02)];
			map+=tds[i].innerHTML;map.replace(/.$/, "H")
		};
		setCookie('map', map)
	} else {
		for (i=0;i<tds.length;i++) {
			tds[i].innerHTML = map.charAt(i);
		};
	}tds[currentCell].innerText = "%";
}
draw();
function move(it) {
	if (it=='up') {currentCell=(currentCell>25) ? currentCell-25:currentCell;}
	else if (it=='down') {currentCell=(currentCell<375) ? currentCell+25:currentCell;}
	else if (it=='right') {currentCell = (((currentCell + 1) % 25 != 0) ? currentCell + 1 : currentCell);}
	else if (it=='left') {currentCell = (((currentCell + 1) % 25 != 1) ? currentCell - 1 : currentCell);}
	currentLetter=map.charAt(currentCell);setCookie('currentCell', currentCell);
	draw();
}
window.cls=()=>{setCookie('map', map);setCookie('currentCell', currentCell);}
document.onkeyup=(e)=>{
	e.key=e.key.toLowerCase();
	if (e.key=='arrowup'||e.key=='w') {move('up')}
	if (e.key=='arrowdown'||e.key=='s') {move('down')}
	if (e.key=='arrowleft'||e.key=='a') {move('left')}
	if (e.key=='arrowright'||e.key=='d') {move('right')}
}


