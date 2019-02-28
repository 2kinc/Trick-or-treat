var $ = (d)=>{
    return document.querySelector(d)
}
var c = (d,l)=>{
    return document.querySelector('#c' + d + '_' + l)
}
new mdc.ripple.MDCRipple($('#shopButton'));
new mdc.tabBar.MDCTabBar($('.mdc-tab-bar'));
var sdialog = new mdc.dialog.MDCDialog(document.querySelector('#shop-dialog'))
$('#shopButton').addEventListener('click', ()=>{
	sdialog.open();
});
new mdc.ripple.MDCRipple($('.menu')).unbounded = true;
if (localStorage.getItem('tot') !== null) {
    this.tot = JSON.parse(localStorage.getItem('tot'));
} else {
    this.tot = {
        candy: 0,
        max_candy:100,
        pump: 10,
        max_pump: 10,
        tot_ers:0,
        x: 0,
        y: 0,
        shift: {
            x: 10,
            y: 9
        },
        yawtth: [],
        seed: Math.random(),
        cl: '',
	      mult:1
    }
}
document.querySelectorAll('.mdc-tab')[0].addEventListener('click', function() {$('#upgrades').classList.add("is-active");$('#boosts').classList.remove("is-active");$('#hire').classList.remove("is-active");});
document.querySelectorAll('.mdc-tab')[1].addEventListener('click', function() {$('#upgrades').classList.remove("is-active");$('#boosts').classList.add("is-active");$('#hire').classList.remove("is-active");});
document.querySelectorAll('.mdc-tab')[2].addEventListener('click', function() {$('#upgrades').classList.remove("is-active");$('#boosts').classList.remove("is-active");$('#hire').classList.add("is-active");});
setInterval(function() {tot.candy+=Math.floor(Math.random()*tot.mult+1)*tot.tot_ers;$('#hmc').innerHTML=beautify(tot.candy);localStorage.setItem(JSON.stringify('tot'),tot);})
var beautify = function (number) {
    var range = [
        { start: 3, end: 6, suffix: "K" },
        { start: 6, end: 9, suffix: "M" },
        { start: 9, end: 12, suffix: "B" },
        { start: 12, end: 15, suffix: "T" },
        { start: 15, end: 18, suffix: "q" },
        { start: 18, end: 21, suffix: "Q" },
        { start: 21, end: 24, suffix: "s" },
        { start: 24, end: 27, suffix: "S" },
        { start: 27, end: 30, suffix: "O" },
        { start: 30, end: 33, suffix: "N" },
        { start: 33, end: 36, suffix: "D" },
		    { start: 36, end: 39, suffix: "uD" },
		    { start: 39, end: 42, suffix: "D" },
		    { start: 42, end: 45, suffix: "tD" },
		    { start: 45, end: 48, suffix: "qD" },
		    { start: 48, end: 51, suffix: "QD" },
		    { start: 51, end: 54, suffix: "sD" },
		    { start: 54, end: 57, suffix: "SD" },
		    { start: 57, end: 60, suffix: "oD" },
		    { start: 60, end: 63, suffix: "nD" },
		    { start: 63, end: 66, suffix: "V" }
    ];

    var r = range.filter(v => {
        var a = Math.log10(number);
        return a >= v.start && a < v.end;
    });

    if (r && r.length) {
        var y = number / Math.pow(10, r[0].start);
        y = Math.floor(y * 100) / 100;
        y = y.toFixed(2);
        return y + r[0].suffix;
    }
    else return number;
};
var ih = false;
var im = false;
var ig = false;
var ttt=()=>{tot.candy+=Math.floor(Math.random()*tot.mult+1);$('#hmc').innerHTML=beautify(tot.candy);localStorage.setItem('tot',tot);}
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
		$('#hmc').innerHTML = beautify(tot.candy);
		tot.yawtth=[];
		tot.mult++;
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
