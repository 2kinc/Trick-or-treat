var $ = (d)=>{
    return document.querySelector(d)
}
var c = (d,l)=>{
    return document.querySelector('#c' + d + '_' + l)
}
new mdc.ripple.MDCRipple($('#shopButton'));
var sdialog = new mdc.dialog.MDCDialog(document.querySelector('#shop-dialog'))
$('#shopButton').addEventListener('click', ()=>{
	sdialog.open();
});
new mdc.ripple.MDCRipple($('.menu')).unbounded = true;
if (localStorage.getItem('tot') !== null && localStorage.getItem('tot') !== '') {
    this.tot = JSON.parse(localStorage.getItem('tot'));
} else {
    this.tot = {
        candy: 0,
        pump: 100,
        x: 0,
        y: 0,
        shift: {
            x: 10,
            y: 9
        },
        yawtth: [],
        seed: Math.floor(Math.random() * 64334),
        cl: '',
		multi:1
    }
}
var ih = false;
var im = false;
var ig = false;
var ttt=()=>{tot.candy+=Math.floor(Math.random()*2+1)*tot.multi;$('#hmc').innerHTML=tot.candy;localStorage.setItem('tot',tot);}
var doaction=()=>{if (ih) {tot.yawtth.push({x: tot.x,y: tot.y});ttt();}draw()};
var tile = function(co, ct) {
    this.x = co.x;
    this.y = co.y;
    this.ct = ct;
    c(co.x, co.y).innerHTML = ct;
}
var draw=()=>{
    box.innerHTML = "";
    for (y = 17 - tot.shift.y; y > 0 - tot.shift.y; y--) {
        r = document.createElement('tr')
        r.id = 'y' + y;
        box.appendChild(r);
        for (x = 0 - tot.shift.x; x < 21 - tot.shift.x; x++) {
            l = document.createElement('td')
            l.id = 'c' + x + '_' + y;
            l.style.height = '10px';
            l.style.width = '10px';
            l.innerHTML = '-';
            l.style.fontSize = '90%';
            l.style.textAlign = 'center';
            $('#y' + y).appendChild(l);
        }
    }
    for (var x = 0 - tot.shift.x; x < 21 - tot.shift.x; x++) {
        for (var y = 1 - tot.shift.y; y < 18 - tot.shift.y; y++) {
            var value = noise.simplex2(x / 100, y / 100);
            if (value < 0) {
                value = 1 - Math.abs(value);
            }
            if (value < 0.2) {
                new tile({
                    x: x,
                    y: y
                },'-')
            }
            if (value > 0.5 && value < 0.53 || value > 0.2 && value < 0.25 || value > 0.425 && value < 0.433 || value > 0.575 && value < 0.483 || value > 0.7 && value < 0.75 || value > 0.85 && value < 0.90 || value > 0.3 && value < 0.4) {
                new tile({
                    x: x,
                    y: y
                },'H')
            }
            if (value > 0.434 && value < 0.435) {
                new tile({
                    x: x,
                    y: y
                },'M');
            }
            if (value > 0.9999959) {
                new tile({
                    x: x,
                    y: y
                },'G');
            }
        }
    }
    for (i = 0; i < tot.yawtth.length; i++) {
        if (c(tot.yawtth[i].x, tot.yawtth[i].y) !== null) {
            c(tot.yawtth[i].x, tot.yawtth[i].y).innerHTML = 'R';
        }
    }
	tot.cl = c(tot.x, tot.y).innerHTML;
    new tile({
        x: tot.x,
        y: tot.y
    },'%');
    if (tot.cl == "-") {
        $('#status').innerHTML = 'Nothing to see here. ';
        ih = false;
        im = false;
        ig = false;
    }
    if (tot.cl == "H") {
        $('#status').innerHTML = 'A normal house. <button class="mdc-button mdc-button--dense" id="status-btn">Take candy</button>';
        ih = true;
        im = false;
        ig = false;
        new mdc.ripple.MDCRipple($('#status-btn'));
    }
	if (tot.cl == "R") {
        $('#status').innerHTML = 'Looks like the people recognize you.';
        ih = false;
        im = false;
        ig = false;
    }
    if (tot.cl == "G") {
        $('#status').innerHTML = 'Huh. A foggy graveyard. <button class="mdc-button mdc-button--dense" id="status-btn">Go in</button>';
        ih = false;
        im = false;
        ig = true;
        new mdc.ripple.MDCRipple($('#status-btn'));
    }
    if (tot.cl == "M") {
        $('#status').innerHTML = 'A big mansion. <button class="mdc-button mdc-button--dense" id="status-btn">Take candy</button>';
        ih = false;
        im = true;
        ig = false;
        new mdc.ripple.MDCRipple($('#status-btn'));
    }
    if (document.body.contains(document.querySelector('#status-btn'))) {$('#status-btn').addEventListener('click', doaction)}
    localStorage.setItem('tot', JSON.stringify(tot));
}
noise.seed(tot.seed);
draw();
$('#cs-btn').addEventListener('click', ()=>{
	if (tot.candy>=100) {
		tot.candy-=100;
		$('#hmc').innerHTML = tot.candy;
		tot.yawtth=[];
		tot.multi++;
		draw();
	} else {$('#status').innerHTML="Not enough candy."}
});
var move = (d)=>{
    if (d == 's') {
        tot.y--;
        tot.shift.y++;
        draw();
    }
    if (d == 'w') {
        tot.x--;
        tot.shift.x++;
        draw();
    }
    if (d == 'n') {
        tot.y++;
        tot.shift.y--;
        draw();
    }
    if (d == 'e') {
        tot.x++;
        tot.shift.x--;
        draw();
    }
    localStorage.setItem('tot', JSON.stringify(tot));
}
document.onkeydown = (e)=>{
	e.key=e.key.toLowerCase();
    if (e.key == 'w') {
        move('n')
    }
    if (e.key == 'a') {
        move('w')
    }
    if (e.key == 's') {
        move('s')
    }
    if (e.key == 'd') {
        move('e')
    }
    if (e.key == 'q') {
        doaction()
    }
}
;
$('#hmc').innerHTML = tot.candy;
$('#hmp').innerHTML = tot.pump;
window.cls = ()=>{
    localStorage.setItem('tot', JSON.stringify(tot));
}
