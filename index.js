var $ = (d)=>{
    return document.querySelector(d)
}
var c = (d,l)=>{
    return $('#c' + d + '_' + l)
}
new mdc.ripple.MDCRipple($('#shopButton'));
new mdc.tabBar.MDCTabBar($('.mdc-tab-bar'));
new mdc.ripple.MDCRipple($('#tot-btn'));
var drawer = new mdc.drawer.MDCDrawer($('.mdc-drawer'));
$('.menu').addEventListener('click', ()=> {
  drawer.open = true;
});
var sdialog = new mdc.dialog.MDCDialog($('#shop-dialog'));;
new mdc.textField.MDCTextField($('.mdc-text-field'));
$('#shopButton').addEventListener('click', ()=>{
    sdialog.open();
});
var ndialog = new mdc.dialog.MDCDialog($('#name-dialog'));
new mdc.ripple.MDCRipple($('.menu')).unbounded = true;
this.tot = JSON.parse(localStorage.getItem('tot')) || {
  candy: 0,
  max_candy: 70000,
  pump: 10,
  max_pump: 10,
  tot_ers: 0,
  max_tot_ers: 50,
  firsttime: true,
  x: 0,
  y: 0,
  shift: {x:10,y:9},
  yawtth: [],
  seed: Math.random(),
  cl: '',
  idAdven: false,
  costumes: 1,
  maxCostumes: 200,
  farmers:0,
  maxFarmers:100,
  name:'Guest '+Math.floor(Math.random()*10000+1000)
}
if (tot.firsttime) {
  ndialog.open();
  $('#nmntrbtn').addEventListener('click', () => {
    tot.name = $('#nmtxt').value;
    $('#name').innerHTML = 'Name: '+tot.name;
  });
  document.onkeydown=(e)=>{if(e.key.toLowerCase()=='enter'){tot.name=$('#nmtxt').value;$('#name').innerHTML='Name: '+tot.name;ndialog.close();}}
  tot.firsttime = false;
}
var candies = ["Snickers(stop that, will you?)", "Reese's", "Milky Way(the chocolate, not  the galaxy)", "Three Musketeers(the candy though)", "Kit Kat", "Kisses (the chocolate, duh)", "Smarties!", "M&M's", "Skittles", "Bubble Gum", "Gummy Bears(99.99% vegetarian)",];;
$('#jobs').innerHTML = 'TOT-ers: '+tot.tot_ers;
$('#max-jobs').innerHTML = 'Max TOT-ers:'+tot.max_tot_ers;
$('#farmers').innerHTML = 'Farmers: '+tot.farmers;
$('#multiplier').innerHTML = 'Multiplier: '+tot.costumes;
$('#max-mult').innerHTML = 'Max multiplier: '+tot.maxCostumes;
$('#max-farmers').innerHTML = 'Max Farmers: '+tot.maxFarmers;
$('#name').innerHTML = 'Name: ' + tot.name;
$('#cps').innerHTML = 'Candy Per Second: ' + tot.costumes*tot.tot_ers;
$('#new-game').addEventListener('click', ()=> {
  localStorage.clear();
  location.reload();
});
$('#toters-btn').addEventListener('click', ()=>{
    if (tot.candy >= 100 && tot.tot_ers+1 < tot.max_tot_ers) {
        tot.candy -= 100;
        $('#hmc').innerHTML = beautify(tot.candy);
        tot.tot_ers++;
        $('#jobs').innerHTML = 'TOT-ers: '+tot.tot_ers++;
        $('#cps').innerHTML = 'Candy Per Second: ' + tot.costumes*tot.tot_ers;
    } else if (tot.tot_ers+1 > tot.max_tot_ers) {
        $('#status').innerHTML = 'Reached the max amount of TOT-ers';
    } else {
        $('#status').innerHTML = 'You do not have enough money.'
    }
}
);
document.querySelectorAll('.mdc-tab')[0].addEventListener('click', ()=>{
    $('#upgrades').classList.add("is-active");
    $('#boosts').classList.remove("is-active");
    $('#hire').classList.remove("is-active");
}
);
document.querySelectorAll('.mdc-tab')[1].addEventListener('click', ()=>{
    $('#upgrades').classList.remove("is-active");
    $('#boosts').classList.add("is-active");
    $('#hire').classList.remove("is-active");
}
);
document.querySelectorAll('.mdc-tab')[2].addEventListener('click', ()=>{
    $('#upgrades').classList.remove("is-active");
    $('#boosts').classList.remove("is-active");
    $('#hire').classList.add("is-active");
}
);
setInterval(function() {
  add = Math.floor(Math.random() * tot.costumes + 1)*tot.tot_ers;
  if (tot.candy+add <= tot.max_candy) {
    tot.candy+=add;
  } else {tot.candy=tot.max_candy}
    $('#hmc').innerHTML = beautify(tot.candy);
    localStorage.setItem('tot', JSON.stringify(tot));
}, 1000);
var beautify = function(number) {
    var range = [{
        start: 3,
        end: 6,
        suffix: "K"
    }, {
        start: 6,
        end: 9,
        suffix: "M"
    }, {
        start: 9,
        end: 12,
        suffix: "B"
    }, {
        start: 12,
        end: 15,
        suffix: "T"
    }, {
        start: 15,
        end: 18,
        suffix: "q"
    }, {
        start: 18,
        end: 21,
        suffix: "Q"
    }, {
        start: 21,
        end: 24,
        suffix: "s"
    }, {
        start: 24,
        end: 27,
        suffix: "S"
    }, {
        start: 27,
        end: 30,
        suffix: "O"
    }, {
        start: 30,
        end: 33,
        suffix: "N"
    }, {
        start: 33,
        end: 36,
        suffix: "D"
    }, {
        start: 36,
        end: 39,
        suffix: "uD"
    }, {
        start: 39,
        end: 42,
        suffix: "D"
    }, {
        start: 42,
        end: 45,
        suffix: "tD"
    }, {
        start: 45,
        end: 48,
        suffix: "qD"
    }, {
        start: 48,
        end: 51,
        suffix: "QD"
    }, {
        start: 51,
        end: 54,
        suffix: "sD"
    }, {
        start: 54,
        end: 57,
        suffix: "SD"
    }, {
        start: 57,
        end: 60,
        suffix: "oD"
    }, {
        start: 60,
        end: 63,
        suffix: "nD"
    }, {
        start: 63,
        end: 66,
        suffix: "V"
    }];

    var r = range.filter(v=>{
        var a = Math.log10(number);
        return a >= v.start && a < v.end;
    }
    );

    if (r && r.length) {
        var y = number / Math.pow(10, r[0].start);
        y = Math.floor(y * 100) / 100;
        y = y.toFixed(2);
        return y + r[0].suffix;
    } else
        return number;
};
var ttt = (m)=>{
    add = (m =='mansion') ? Math.floor(Math.random() * tot.costumes * 3000 + 1) : Math.floor(Math.random() * tot.costumes + 1);
    if (tot.candy+add <= tot.max_candy) {
      tot.candy+=add;
    } else {tot.candy = tot.max_candy;}
    $('#hmc').innerHTML = beautify(tot.candy);
    $('#status').innerHTML = candies[Math.floor(Math.random()*candies.length)];
    localStorage.setItem(JSON.stringify('tot'), tot);
}
if (tot.isAdven) {
  $('#checkbox-1').checked = true;
} else {$('#checkbox-1').checked = false}
var tile = function(co, ct) {
    this.x = co.x;
    this.y = co.y;
    this.ct = ct;
    c(co.x, co.y).innerHTML = ct;
}
var doaction = ()=>{
    if (ih) {
        tot.yawtth.push({
            x: tot.x,
            y: tot.y
        });
        ttt();
    }
    draw()
}
var draw = ()=>{
    box.innerHTML = "";
    for (y = 17 - tot.shift.y; y > 0 - tot.shift.y; y--) {
        r = document.createElement('tr')
        r.id = 'y' + y;
        box.appendChild(r);
        for (x = 0 - tot.shift.x; x < 21 - tot.shift.x; x++) {
            l = document.createElement('td');
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
            if (value > 0.9999999) {
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
    if (document.body.contains($('#status-btn'))) {
        $('#status-btn').addEventListener('click', doaction)
    }
    localStorage.setItem('tot', JSON.stringify(tot));
}
(Everything = ()=>{
    if (!$('#checkbox-1').checked) {
        $('#status').innerHTML='Lets go safe for now.'
        $('#reg-div').style.display = 'block';
        $('#adven-div').style.display = 'none';
        $('#tot-btn').addEventListener('click', () => {$('#tot-btn').classList.add('pumplit');ttt();setTimeout(() => {$('#tot-btn').classList.remove('pumplit')}, 400)});
        tot.isAdven=false;
    }
    else {
        $('#reg-div').style.display = 'none';
        $('#adven-div').style.display = 'block';
        var ih = false;
        var im = false;
        var ig = false;
        noise.seed(tot.seed);
        draw();
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
            e.key = e.key.toLowerCase();
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
        tot.isAdven=true;
        $('#status').innerHTML='Lets go a little dangerous.'
    }
})()
$('#checkbox-1').addEventListener('click', Everything);
$('#cs-btn').addEventListener('click', ()=>{
    if (tot.candy >= 100 && tot.costumes+1<tot.maxCostumes) {
      tot.candy -= 100;
      $('#hmc').innerHTML = beautify(tot.candy);
      tot.yawtth = [];
      tot.costumes++;
      $('#multiplier').innerHTML = 'Multiplier: ' + tot.costumes;
      $('#cps').innerHTML = 'Candy Per Second: ' + tot.costumes*tot.tot_ers;
      if ($('#checkbox-1').checked) {
        draw();
      }
    } else if (tot.costumes+1>tot.maxCostumes) {
      $('#status').innerHTML = "Max amount of costumes!"
    } else {
      $('#status').innerHTML = "Not enough candy."
    }
});
var upgrade = (what, hwmch, tf, cost) => {
  if (tot.candy >= cost) {
    tot.candy -= cost
    $('#status').inerHTML = 'You got a' + what + '!';
    if (tf == 'toters') {
      tot.max_tot_ers = hwmch;
    } else if (tf == 'strg') {
      tot.max_candy = hwmch;
    }
  } else {
    $('#status').innerHTML = 'Not enough candy.';
  }
}
$('#hmc').innerHTML = tot.candy;
$('#hmp').innerHTML = tot.pump;
window.cls = ()=>{
    localStorage.setItem('tot', JSON.stringify(tot));
}
