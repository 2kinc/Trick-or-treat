(function () {
var beautify = function(t) {
    var f = [{
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
        suffix: "dD"
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
    }, {
        start: 66,
        end: 69,
        suffix: "uV"
    }, {
        start: 69,
        end: 72,
        suffix: "dV"
    }, {
        start: 72,
        end: 75,
        suffix: "tV"
    }, {
        start: 75,
        end: 78,
        suffix: "qV"
    }, {
        start: 78,
        end: 81,
        suffix: "QV"
    }, {
        start: 81,
        end: 84,
        suffix: "sV"
    }, {
        start: 84,
        end: 87,
        suffix: "SV"
    }, {
        start: 87,
        end: 90,
        suffix: "oV"
    }, {
        start: 90,
        end: 93,
        suffix: "nV"
    }, {
        start: 93,
        end: 96,
        suffix: "T"
    }, {
        start: 96,
        end: 99,
        suffix: "uT"
    }, {
        start: 99,
        end: 102,
        suffix: "dT"
    }, {
        start: 102,
        end: 105,
        suffix: "tT"
    }, {
        start: 105,
        end: 108,
        suffix: "qT"
    }].filter(f=>{
        var s = Math.log10(t);
        return s >= f.start && s < f.end
    }
    );
    if (f && f.length) {
        var s = t / Math.pow(10, f[0].start);
        return (s = (s = Math.floor(100 * s) / 100).toFixed(2)) + f[0].suffix
    }
    return t
};
var $ = (d)=>{
    var e = document.querySelectorAll(d);
    e = (e.length == 1) ? e[0] : e.length == 0 ? null : e;
    return e;
}
var save = ()=>localStorage.setItem('tot', JSON.stringify(tot))
//firebase stuff
var config = {
    apiKey: "AIzaSyADD6YWKrzibRMwJNi1FwUR0jcR0GitZPI",
    authDomain: "k-inc-232222.firebaseapp.com",
    databaseURL: "https://k-inc-232222.firebaseio.com",
    projectId: "k-inc-232222",
    storageBucket: "",
    messagingSenderId: "827804821456"
};
var app = firebase.initializeApp(config);
var database = app.database().ref().child('tot');
var auth = app.auth();
var storage = app.storage();
var sign;
$('#sign-in-btn').addEventListener('click', ()=>{
    auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    tot.name = auth.currentUser.displayName;
});
//mdc stuff
new mdc.ripple.MDCRipple($('#shopButton'));
new mdc.tabBar.MDCTabBar($('.mdc-tab-bar'));
new mdc.ripple.MDCRipple($('#tot-btn'));
var drawer = new mdc.drawer.MDCDrawer($('.mdc-drawer'));
$('.menu').addEventListener('click', ()=>drawer.open = true);
var sdialog = new mdc.dialog.MDCDialog($('#shop-dialog'));
for(i=0;i<$('.mdc-text-field').length;i++) {
  new mdc.textField.MDCTextField($('.mdc-text-field')[i]);
}
$('#shopButton').addEventListener('click', ()=>sdialog.open());
var ldialog = new mdc.dialog.MDCDialog($('#ldrbrd-dialog'));
$('#ldrbrd-btn').addEventListener('click', ()=>ldialog.open());
var ndialog = new mdc.dialog.MDCDialog($('#name-dialog'));
new mdc.ripple.MDCRipple($('.menu')).unbounded = true;
var adialog = new mdc.dialog.MDCDialog($('#adven-dialog'));
new mdc.select.MDCSelect($('#increment'));
var idialog = new mdc.dialog.MDCDialog($('#incre-dialog'));
//normal stuff
function adv(title, text, op1, op2, one) {
  el = $('#adven-op1'),elClone = el.cloneNode(true);
  el.parentNode.replaceChild(elClone, el);
  $('#adven-title').innerHTML = title;
  $('#adven-desc').innerHTML = text;
  $('#adven-op1').innerHTML = op1;
  $('#adven-op2').innerHTML = op2;
  $('#adven-op1').addEventListener('click',one);
  $('#adven-op2').addEventListener('click',()=>adialog.close());
}
function Adventure(name) {
  var that = this;
  this.name = name;
  this.dialogue = new Map();
  this.Dialogue = function (text, id, title, action, action2, branches, if_statement) {
    var dialogueThat = this;
    this.text = text || "Ducks are awesome. It's a true fact.";
    this.branches = branches; //array with dialogue ids
    this.id = id;
    this.title = title;
    this.if_statement = if_statement;
    this.action = action;
    this.forward = function (branch) {
      that.dialogue.get(branch).display(); //branch id
    };
    (this.attach = function() {
      that.dialogue.set(this.id, this);
    })();
    this.display = function () {
      adialog.open();
      adv(this.title, this.text, this.action[0], this.action[1]);
    };
  }
} //book bat bhat bonster!
var someAdventure = new Adventure('Duckland.');
var somedialogue = new someAdventure.Dialogue('WHAT IS LOVE BABY DON"T HURT ME BECAUSE IM A DUCK yeAAAAh', 'love baby', 'd', ['d', 'non']);
var d = new someAdventure.Dialogue('d.', 'd', 'd'); //kavin can you please go into the call i want to see
var no = new someAdventure.Dialogue('NO!!!!!!', 'NO!', 'd');
/*function adventure(what) {
    adialog.open();
    if (what == 'graveyard') {
      this.dialogues = [ //right a new function
        ['The graveyard glows softly in the night', 'Go in.', 'THATS CRAZY'],
        ["The gate slowly creaked open, as if inviting you to your doom. Inside, the graves stood old and broken, all containing unreadable descriptions of their owner's deaths. Suddenly, out of one of the many graves, came a beast like human, with rotting flesh and some terribly worn pants.", "Kill it!", "Run away from this terribly clothed beast."],
      ];
      this.adven = 'graveyard';//KEN!! HOW ARE WE GOING TO DO THE IFS AND ELSES with pro skillz
      $('#adven-title').innerHTML = 'Graveyard';
      adv('The graveyard glows softly in the night', 'Go in.', 'THATS CRAZY',
      ()=>{//typical horror movies
        adv("The gate slowly creaked open, as if inviting you to your doom. Inside, the graves stood old and broken, all containing unreadable descriptions of their owner's deaths. Suddenly, out of one of the many graves, came a beast like human, with rotting flesh and some terribly worn pants.", "Kill it!", "Run away from this terribly clothed beast.",
        ()=>{ //now is the only good time my dad can help me so sorry if i cant be on for 100% of the setTimeout(function () {ds

        }, 10);
          if (Math.random() >= 0.8) {
            tot.candy+=Math.floor(Math.random()*10+1);
            $('#hmc').innerHTML=tot.candy;
            adv("Before you stands a tall and unforgiving looking house, windows emitting a faint yellow light. ", "Be dumb and don't go back", "Yeah, that's enough.",
            ()=>{
              adv("A tall and scary looking door stands before you, a door knocker sitting just within reach.", 'Knock', 'Run away from the door, doors are too dangerous',
              ()=>{
                adv("You knock on the door and it slides open, not a creak to be heard. Inside, you see a room lit by a fancy chandelier on the ceiling. Suddenly, from your left, a transparent looking creature emerges from behind a pair of curtains.", 'Tackle this monster of a bed sheet!', "I'm out of here, floating stuff creepy.",
                ()=>{
                  if (Math.random() >= 0.9) {
                    tot.candy+=Math.floor(Math.random()*30+10);
                    adv("You bring the floating sheet down and leave it runnning away, down a hallway.", 'Keep on going', 'Be satisfied with defeating a bed sheet and go.',
                    ()=>{ //this is so confusing


                    });
                  } else {
                    adv("You see a fancy-looking door standing in front of you. It shows no signs of previous use at all.", 'Go through the door!', 'One door was enough.',
                    ()=>{
                      adv("The room looks unused, with only a dusty bed and a table. The only other thing in it is a large, lonely box. A large padlock is attached to it.", 'Pick the lock!', 'Leave.',
                      ()=>{
                        adv("The lock looks like a simple door lock. You look around for a pin, and find one hiding behind the box. You wonder how it got there, but don't care. You insert the pin into the padlock, and it unlocks.","Open it","It could be a trap!",
                        ()=>{
                          if (Math.random() >= 0.75) {
                            adv("The lock springs open, revealing a huge stash of candy. You reach to grab it, but suddenly a skeleton leaps out at you from underneath", 'Fight the pile of bones', 'RUN!',
                            ()=>{
                              if (Math.random() >= (2/3)) {
                                adv("All that remains of the skeleton are a skull and some leg bones. You snatch the candy and get out of this creepy house.", '', '',)
                                tot.candy+=Math.floor(Math.random()*500+1000); //reward??
                                setTimeout(()=>adialog.close(),1000);
                              }//i know
                              else{
                                adv("The skeleton brings a suprisingly powerful blow to your forehead, knocking you out cold. Ow.", "", "");
                                setTimeout(()=>adialog.close(),1000);
                              }
                            }); //
                          } else { //lets do it
                            alert("Good job you didn't die!"");
                          }
                        });//right a new function
                      });
                    });
                  }
                })
              });
            });
          } else {
            adv("The beast is too strong, pushing you back. You hit the ground really, really hard. The world turns black, blacker than it already was.",'','');
            setTimeout(()=>adialog.close(),1000);
          }
        });
      };
}*/
var tot = JSON.parse(localStorage.getItem('tot')) || {
    candy: 0,
    max_candy: 70000,
    pump: 10,
    max_pump: 10,
    tot_ers: 0,
    max_tot_ers: 50,
    firsttime: true,
    x: 0,
    y: 0,
    shift: {
        x: 10,
        y: 9
    },
    yawtth: [],
    seed: Math.random(),
    cl: '',
    idAdven: false,
    costumes: 1,
    maxCostumes: 200,
    farmers: 0,
    maxFarmers: 100,
    name: Math.floor(Math.random() * 1000000 + 10000).toString(36),
    btgame: false
}
if (tot.btgame == true) {
    tot.btgame == false;
}
if (tot.firsttime) {
    ndialog.open();
    $('#nmntrbtn').addEventListener('click', ()=>{
        tot.name = $('#nmtxt').value;
        $('#name').innerHTML = 'Name: ' + tot.name;
    });
    $('#nmtxt').onkeydown = (e)=>{
        if (e.key.toLowerCase() == 'enter') {
            tot.name = $('#nmtxt').value;
            $('#name').innerHTML = 'Name: ' + tot.name;
            ndialog.close();
        }
    }
    tot.firsttime = false;
}
var increment = Number($('#increment_value').value);
function ninc(v) {
	cost = v**2;
	if (tot.candy >= cost && v > 1000 && v < 1000000000000000000) {
		tot.candy -= cost;
    $('#hmc').innerHTML = beautify(tot.candy);
		e = document.createElement('option');
		e.value = v;
		e.innerHTML = v;
		$('#increment_value').appendChild(e);
	} else if (v > 1000 && v < 1000000000000000000) {
    $('#status').innerHTML = "That is too high or too low!";
  } else {
		$('#status').innerHTML = 'Not enough candy!';
	}
};
$('#ninctext').onkeydown = e => {
  $('#cost').innerHTML = 'Cost: ' + beautify(Number($('#ninctext').value)**2);
  if (e.key.toLowerCase() == 'enter') ninc(Number($('#ninctext').value));
};
$('#incre-lnd').addEventListener('click',() => {
  var cost = tot.maxFarmers / 20;
  if (tot.candy >= cost) {
    tot.candy -= cost;
    $('#hmc').innerHTML = beautify(tot.candy);
    tot.maxFarmers *= 2;
    $('#max-farmers').innerHTML = 'Max Farmers:' + beautify(tot.maxFarmers);
  } else {
    $('#status').innerHTMl = 'Not enough candy!';
  }
})
$('#confninc').addEventListener('click',()=>ninc(Number($('#ninctext').value)));
var candies = ["Snickers(stop that, will you?)", "A rubber duck", "Milky Way(the chocolate, not  the galaxy)", "Three Musketeers(the candy though)", "Kit Kat", "Kisses (the chocolate, duh)", "Smarties!", "M&M's", "Skittles", "Bubble Gum", "Gummy Bears(99.99% vegetarian)", ];
$('#jobs').innerHTML = 'TOT-ers: ' + beautify(tot.tot_ers);
$('#max-jobs').innerHTML = 'Max TOT-ers:' + beautify(tot.max_tot_ers);
$('#farmers').innerHTML = 'Farmers: ' + beautify(tot.farmers);
$('#multiplier').innerHTML = 'Costumes: ' + beautify(tot.costumes);
$('#max-mult').innerHTML = 'Max Costumes: ' + beautify(tot.maxCostumes);
$('#max-farmers').innerHTML = 'Max Farmers: ' + beautify(tot.maxFarmers);
$('#name').innerHTML = 'Name: ' + tot.name;
$('#cps').innerHTML = 'Candy Per Second: ' + beautify(tot.costumes * tot.tot_ers);
$('#mx-pump').innerHTML = 'Max Pumpkins: ' + beautify(tot.max_pump);
$('#mx-candy').innerHTML = 'Max Candy: ' + beautify(tot.max_candy);
var newgame = ()=>{
    localStorage.clear();
    tot = {
        candy: 0,
        max_candy: 70000,
        pump: 10,
        max_pump: 10,
        tot_ers: 0,
        max_tot_ers: 50,
        firsttime: true,
        x: 0,
        y: 0,
        shift: {
            x: 10,
            y: 9
        },
        yawtth: [],
        seed: Math.random(),
        cl: '',
        idAdven: false,
        costumes: 1,
        maxCostumes: 200,
        farmers: 0,
        maxFarmers: 100,
        name: Math.floor(Math.random() * 1000000 + 10000).toString(36),
        btgame: false
    }
    clearInterval(cint);
    clearInterval(pint);
    location.reload();
}
$('#new-game').addEventListener('click',newgame);
$('#btnew-game').addEventListener('click',newgame);
$('#btcontinue').addEventListener('click',()=>{
  $('#btgame').style.display = "none";
});
$('#toters-btn').addEventListener('click', ()=>{
    if (tot.candy >= 100*increment && tot.tot_ers < tot.max_tot_ers) {
        tot.candy -= 100*increment;
        $('#hmc').innerHTML = beautify(tot.candy);
        tot.tot_ers+=increment;
        $('#jobs').innerHTML = 'TOT-ers: ' + tot.tot_ers++;
        $('#cps').innerHTML = 'Candy Per Second: ' + beautify(tot.costumes * tot.tot_ers);
    } else if (tot.tot_ers >= tot.max_tot_ers && tot.max_tot_ers != 'Infinity') {
        $('#status').innerHTML = 'Max amount of TOT-ers!';
        tot.tot_ers = tot.max_tot_ers;
    } else {
        $('#status').innerHTML = 'You do not have enough candy.'
    }
    save();
}
);
$('#frm-btn').addEventListener('click', ()=>{
    if (tot.pump >= 5*increment && tot.farmers < tot.maxFarmers) {
        tot.pump -= 5*increment;
        $('#hmp').innerHTML = beautify(tot.pump);
        tot.farmers+=increment;
        $('#farmers').innerHTML = 'Farmers: ' + beautify(tot.farmers);
    } else if (tot.farmers >= tot.maxFarmers) {
        $('#status').innerHTML = 'Max amount of farmers!';
        tot.farmers = tot.maxFarmers;
    } else {
        $('#status').innerHTML = 'You do not have enough candy.'
    }
    save();
}
);
$('.mdc-tab')[0].addEventListener('click', ()=>{
    $('#upgrades').classList.add("is-active");
    $('#boosts').classList.remove("is-active");
    $('#hire').classList.remove("is-active");
}
);
$('.mdc-tab')[1].addEventListener('click', ()=>{
    $('#upgrades').classList.remove("is-active");
    $('#boosts').classList.add("is-active");
    $('#hire').classList.remove("is-active");
}
);
$('.mdc-tab')[2].addEventListener('click', ()=>{
    $('#upgrades').classList.remove("is-active");
    $('#boosts').classList.remove("is-active");
    $('#hire').classList.add("is-active");
}
);
var cint = setInterval(()=>{
    increment = $('#increment_value').value == 'newincre' ? 'newincre' : Number($('#increment_value').value);
    if (increment == 'newincre') {
      idialog.open();
      sdialog.close();
      $('#increment_value').options.selectedIndex=1;
    }
    tot.incres = $('#increment_value').options;
    add = Math.floor(Math.random() * tot.costumes + 1) * tot.tot_ers;
    if (tot.candy + add <= tot.max_candy) {
        tot.candy += add;
    } else {
        tot.candy = tot.max_candy
    }
    $('#hmc').innerHTML = beautify(tot.candy);
    if (auth.currentUser != null) {
        database.child(auth.currentUser.uid).set(tot);
        tot.name = auth.currentUser.displayName;
    }
    $('#ldrbrd-list').innerHTML = ``;
    database.orderByChild('candy').on('child_added', (snapshot)=>{
        var d = snapshot.val();
        var e = document.createElement('li');
        $('#ldrbrd-list').prepend(e);
        e.outerHTML = `
      <li class="mdc-list-item"><span class="mdc-list-item__text" style="width:25%">` + d.name + `</span>
      <span class="mdc-list-item__text" style="width:25%">` + beautify(d.candy) + `</span>
      <span class="mdc-list-item__text" style="width:25%">` + beautify(d.pump) + `</span>
      <span class="mdc-list-item__text" style="width:25%">` + beautify(d.tot_ers * d.costumes) + `</span></li>`;
    }
    );
    $('#ldrbrd-list').firstElementChild.classList.add('first-place');
    if (tot.candy == Infinity) {
        tot.btgame = true;
        $('#btgame').style.display = "block";
        localStorage.clear();
        tot = {
            candy: 0,
            max_candy: 70000,
            pump: 10,
            max_pump: 10,
            tot_ers: 0,
            max_tot_ers: 50,
            firsttime: true,
            x: 0,
            y: 0,
            shift: {
                x: 10,
                y: 9
            },
            yawtth: [],
            seed: Math.random(),
            cl: '',
            idAdven: false,
            costumes: 1,
            maxCostumes: 200,
            farmers: 0,
            maxFarmers: 100,
            name: Math.floor(Math.random() * 1000000 + 10000).toString(36),
            btgame: false
        }
        clearInterval(cint);
        clearInterval(pint);
    }
}
, 1000);
var pint = setInterval(()=>{
    add = Math.floor(Math.floor(Math.random() * 2 + 1) * tot.farmers / 4);
    if (tot.pump + add <= tot.max_pump) {
        tot.pump += add;
    } else {
        tot.pump = tot.max_pump
    }
    $('#hmp').innerHTML = beautify(tot.pump);
    save();
}
, 7500);
var c = (d,l)=>{
    return $('#c' + d + '_' + l)
}
var ttt = (m)=>{
    add = (m == 'mansion') ? Math.floor(Math.random() * tot.costumes + 1) * 3000 : Math.floor(Math.random() * tot.costumes + 1);
    if (tot.candy + add <= tot.max_candy) {
        tot.candy += add;
    } else {
        tot.candy = tot.max_candy;
    }
    $('#hmc').innerHTML = beautify(tot.candy);
    $('#status').innerHTML = candies[Math.floor(Math.random() * candies.length)];
    if (tot.candy == Infinity) {
        tot.btgame = true;
        $('#btgame').style.display = "block";
        localStorage.clear();
    }
    localStorage.setItem(JSON.stringify('tot'), tot);
}
if (tot.isAdven) {
    $('#checkbox-1').checked = true;
} else {
    $('#checkbox-1').checked = false
}
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
    if (im) {
        tot.yawtth.push({
            x: tot.x,
            y: tot.y
        });
        ttt('mansion');
    }
    if (ig) {
        //new adventure('graveyard');
    }
    draw();
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
            if (value > 0.9995) {
                new tile({
                    x: x,
                    y: y
                },'G');
            }
        }
    }
    for (i = 0; i < tot.yawtth.length; i++) {
        if (c(tot.yawtth[i].x, tot.yawtth[i].y) !== null) {
            c(tot.yawtth[i].x, tot.yawtth[i].y).innerHTML = 'h';
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
    if (tot.cl == "h") {
        $('#status').innerHTML = "The people recognize you here.";
        ih = false;
        im = false;
        ig = false;
    }
    if (tot.cl == "G") {
        $('#status').innerHTML = 'Huh. A foggy graveyard. Odd.'/*+'<button class="mdc-button mdc-button--dense" id="status-btn">Go in</button>'*/;
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
    if (document.body.contains($('#status-btn')) && ih && im && ig) {
        $('#status-btn').addEventListener('click', doaction)
    }
    save();
}
(Everything = ()=>{
    if (!$('#checkbox-1').checked) {
        $('#status').innerHTML = 'Lets go safe for now.'
        $('#reg-div').style.display = 'block';
        $('#adven-div').style.display = 'none';
        document.onkeyup = null;
        document.onkeydown=e=>{
            if (e.key == ' ') {
                $('#tot-btn').classList.add('pumplit');
                ttt();
                setTimeout(()=>$('#tot-btn').classList.remove('pumplit'), 400)
            }
        }
        $('#tot-btn').addEventListener('click', ()=>{
            $('#tot-btn').classList.add('pumplit');
            ttt();
            setTimeout(()=>$('#tot-btn').classList.remove('pumplit'), 400)
        });
        tot.isAdven = false;
    } else {
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
            save();
        }
        document.onkeyup = (e)=>{
            e.key = e.key.toLowerCase();
            if (e.key == 'w') {
                move('n');
            }
            if (e.key == 'a') {
                move('w');
            }
            if (e.key == 's') {
                move('s');
            }
            if (e.key == 'd') {
                move('e');
            }
            if (e.key == 'q' || e.key == ' ') {
                doaction();
            }
        }
        tot.isAdven = true;
        $('#status').innerHTML = 'Lets go a little dangerous.';
    }
}
)();
$('#checkbox-1').addEventListener('click', Everything);
$('#cs-btn').addEventListener('click', ()=>{
    if (tot.candy >= 100*increment && tot.costumes + 1 < tot.maxCostumes) {
        tot.candy -= 100*increment;
        $('#hmc').innerHTML = beautify(tot.candy);
        tot.yawtth = [];
        tot.costumes+=increment;  //OKAY INCREMENTS
        $('#multiplier').innerHTML = 'Costumes: ' + beautify(tot.costumes);
        $('#cps').innerHTML = 'Candy Per Second: ' + beautify(tot.costumes * tot.tot_ers);
        if($('#checkbox-1').checked){draw()};
    } else if (tot.costumes >= tot.maxCostumes) {
        tot.costumes = tot.maxCostumes;
        $('#multiplier').innerHTML = 'Costumes: ' + beautify(tot.costumes);
        $('#status').innerHTML = "Max amount of costumes!"; //even its the end of the code still add a semicolon
    } else {
        $('#status').innerHTML = "Not enough candy.";
    }
}
);
var upgrade = (what,hwmch,tf,cost,btn)=>{
    console.log(btn);
    $(btn).addEventListener('click', ()=>{
        if (tot.candy >= cost) {
            tot.candy -= cost
            $('#status').innerHTML = 'You got ' + what + '!';
            if (tf == 'toters') {
                tot.max_tot_ers += hwmch;
                $('#max-jobs').innerHTML = 'Max TOT-ers: ' + beautify(tot.max_tot_ers);
            } else if (tf == 'strg') {
                tot.max_candy += hwmch;
                tot.max_pump += hwmch / 10000;
                $('#mx-pump').innerHTML = 'Max Pumpkins: ' + beautify(tot.max_pump);
                $('#mx-candy').innerHTML = 'Max Candy: ' + beautify(tot.max_candy);
            }
        } else {
            $('#status').innerHTML = 'Not enough candy.';
        }
        save();
    }
  );
}
upgrade('a phone', 100, 'toters', 500, '#phone-btn');
upgrade('ai', Infinity, 'toters', 99000, '#ai-btn');
upgrade('a computer', 957, 'toters', 5000, '#compu-btn');
upgrade('a house', 1000000, 'strg', 70000, '#hse-btn');
upgrade('a mansion', 100000000000, 'strg', 1000000, '#mnsn-btn');
upgrade('a warehouse', 70000000000000000000, 'strg', 100000000000, '#wrhse-btn');
upgrade('a sky scraper', 10000000000000000000000000000, 'strg', 70000000000000000000, '#sksc-btn');
upgrade('portal storage', Infinity, 'strg', 10000000000000000000000000000, '#ptlstg-btn');
$('#bc-btn').addEventListener('click', ()=>{
    if (tot.pump >= 1250) {
        tot.pump -= 1250;
        $('#hmp').innerHTML = beautify(tot.pump);
        tot.maxCostumes *= 2;
        $('#max-mult').innerHTML = 'Max Costumes: ' + beautify(tot.maxCostumes);
    } else {
        $('#status').innerHTML = 'Not enough candy.';
    }
}
)
$('#ce-btn').addEventListener('click', ()=>{
    if (tot.pump >= 2500) {
        tot.pump -= 2500;
        $('#hmp').innerHTML = beautify(tot.pump);
        tot.tot_ers *= 2;
        tot.max_tot_ers *= 2;
        $('#jobs').innerHTML = 'TOT-ers: ' + beautify(tot.tot_ers);
        $('#max-jobs').innerHTML = 'Max TOT-ers: ' + beautify(tot.max_tot_ers);
    } else {
        $('#status').innerHTML = 'Not enough candy.';
    }
}
)
$('#ucc-btn').addEventListener('click', ()=>{
    if (tot.pump >= 5000) {
        tot.pump -= 5000;
        $('#hmp').innerHTML = beautify(tot.pump);
        tot.candy *= 2;
        tot.maxCandy *= 2;
        $('#hmc').innerHTML = beautify(tot.candy);
        $('#mx-candy').innerHTML = beautify(tot.max_candy);
    } else {
        $('#status').innerHTML = 'Not enough candy.';
    }
}
)
$('#hmc').innerHTML = beautify(tot.candy);
$('#hmp').innerHTML = beautify(tot.pump);
if (auth.currentUser !== null) {
    database.child(auth.currentUser.uid).set({
        candy: tot.candy,
        pumpkins: tot.pump,
        cps: tot.costumes * tot.tot_ers
    })
}
window.onunload = ()=>{
    tot.costumes = (tot.costumes != Infinity) ? (tot.costumes) : 'Infinity';
    tot.farmers = (tot.farmers != Infinity) ? (tot.farmers) : 'Infinity';
    tot.tot_ers = (tot.tot_ers != Infinity) ? (tot.tot_ers) : 'Infinity';
    tot.max_tot_ers = (tot.max_tot_ers != Infinity) ? (tot.max_tot_ers) : 'Infinity';
    tot.maxCostumes = (tot.maxCostumes != Infinity) ? (tot.maxCostumes) : 'Infinity';
    tot.maxFarmers = (tot.maxFarmers != Infinity) ? (tot.costumes) : 'Infinity';
    tot.candy = (tot.candy != Infinity) ? (tot.candy) : 'Infinity';
    tot.pump = (tot.pump != Infinity) ? (tot.pump) : 'Infinity';
    tot.max_pump = (tot.max_pump != Infinity) ? (tot.max_pump) : 'Infinity';
    tot.max_candy = (tot.max_candy != Infinity) ? (tot.max_candy) : 'Infinity';
    save();
}
})();
