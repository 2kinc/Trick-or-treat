// Update 1.9.4 of...

// The one and only...

//   T R I C K  O R  T R E A T ! ^ _ ^

//  Please, please, pleaaase do not copy this code. That is not nice.
//  And plus, why are you looking at our code? Creeps.
function Game(H,a,ll,o,w,ee,n) {
  var that = this;
  //beautify thing (to make the display of things way easier)
  function beautify(t) {var f=[{start:3,end:6,suffix:"K"},{start:6,end:9,suffix:"M"},{start:9,end:12,suffix:"B"},{start:12,end:15,suffix:"T"},{start:15,end:18,suffix:"q"},{start:18,end:21,suffix:"Q"},{start:21,end:24,suffix:"s"},{start:24,end:27,suffix:"S"},{start:27,end:30,suffix:"O"},{start:30,end:33,suffix:"N"},{start:33,end:36,suffix:"D"},{start:36,end:39,suffix:"uD"},{start:39,end:42,suffix:"dD"},{start:42,end:45,suffix:"tD"},{start:45,end:48,suffix:"qD"},{start:48,end:51,suffix:"QD"},{start:51,end:54,suffix:"sD"},{start:54,end:57,suffix:"SD"},{start:57,end:60,suffix:"oD"},{start:60,end:63,suffix:"nD"},{start:63,end:66,suffix:"V"},{start:66,end:69,suffix:"uV"},{start:69,end:72,suffix:"dV"},{start:72,end:75,suffix:"tV"},{start:75,end:78,suffix:"qV"},{start:78,end:81,suffix:"QV"},{start:81,end:84,suffix:"sV"},{start:84,end:87,suffix:"SV"},{start:87,end:90,suffix:"oV"},{start:90,end:93,suffix:"nV"},{start:93,end:96,suffix:"T"},{start:96,end:99,suffix:"uT"},{start:99,end:102,suffix:"dT"},{start:102,end:105,suffix:"tT"},{start:105,end:108,suffix:"qT"}].filter(f=>{var s=Math.log10(t);return s>=f.start&&s<f.end});if(f&&f.length){var s=t/Math.pow(10,f[0].start);return(s=(s=Math.floor(100*s)/100).toFixed(2))+f[0].suffix}return t};
  //getter thing
  function $(thing) {
      var el = document.querySelectorAll(thing);
      el = (el.length == 1) ? el[0] : el.length == 0 ? null : el;
      return el;
  }
  function rand(max, min) {min = min || 0;
    return Math.floor(Math.random()*max+min);
  }
  (function status(str) {
    $('#status').innerHTML = str;
  }) ('Trick or treat!');
  //If browser does not support local storage:
  if (!window.localStorage) {
    throw 'Hey! Get a better browser that supports local storage!';
  }
  //material design components stuff
  //  Ripples
  new mdc.ripple.MDCRipple($('#shopButton'));
  new mdc.tabBar.MDCTabBar($('.mdc-tab-bar'));
  new mdc.ripple.MDCRipple($('#tot-btn'));
  var drawer = new mdc.drawer.MDCDrawer($('.mdc-drawer')); // drawer
  $('#menu').addEventListener('click', function() {drawer.open = true});
  this.dialogs = { //popup things
    shop:new mdc.dialog.MDCDialog($('#shop-dialog')),
    leaderboard:new mdc.dialog.MDCDialog($('#ldrbrd-dialog')),
  };
  $('#shopButton').addEventListener('click',()=>this.dialogs.shop.open());
  $('#ldrbrd-btn').addEventListener('click',()=>this.dialogs.leaderboard.open())
  //normal stuff
  this.elems = {
    candy:$('#hmc'),
    max_candy:$('#mx-candy'),
    pumpkins:$('#hmp'),
    max_pumpkins:$('#mx-pump'),
    signinbtn:$('#sign-in-btn'),
    name:$('#name'),
    tot_ers:$('#jobs'),
    max_tot_ers:$('#max-jobs'),
    farmers:$('#farmers'),
    max_farmers:$('#max-farmers'),
    costumes:$('#multiplier'),
    max_costumes:$('#max-mult'),
    tot_button:$('#tot-btn'),
    name:$('#name'),
    newgame:$('#newgame'),
    leaderboard:$('#ldrbrd-list'),
  };this.ducks = {bestthinginworld:true};
  this.readSaved = function() {
    return JSON.parse(H.atob(localStorage.TrickOrTreat));
  }
  this.normalobj = {
    candy: 13, // candy
    max_candy: 70000, // max candy
    pump: 25, //pumpkins
    max_pump: 100, // max pumpkins
    tot_ers: 0, //trick or treaters
    max_tot_ers: 50, // max trick or treaters
    firsttime: true, // first time or not
    x: 0, // x of player (for adventures)
    y: 0, // y of player
    shift: { //shift for player
        x: 10,
        y: 9
    },
    yawtth: [], // houses that have already been went to
    seed: Math.random(), // seed for perlin noise (adventure mode)
    cl: '', // current letter in adventure mode
    costumes: 1, //costumes
    maxCostumes: 200, // max costumes
    farmers: 0, // farmers
    maxFarmers: 100, //max farmers
    name: Math.floor(Math.random() * 100000000000).toString(36), // name to display
    increments:[1,10,100,1000],
  }
  this.obj = this.readSaved() || this.normalobj;
  this.save = function() {
    localStorage.setItem('TrickOrTreat', H.btoa(JSON.stringify(this.obj)));
  };
  this.newgame = function() {
    localStorage.TrickOrTreat = undefined; //restart game
    this.obj = this.normalobj;
    auth.signOut().then(function() { //sign out
      console.log('Signed Out');
    },function(error) { // if its an error
      console.error('Sign Out Error:', error);
    });
    location.reload(); //and finally reload
  };
  //this.elems.newgame.addEventListener('click',this.newgame);
  (this.updateElements = function() {
    that.elems.candy.innerText = beautify(that.obj.candy);
    that.elems.pumpkins.innerText = beautify(that.obj.pump);
    that.elems.max_pumpkins.innerText = 'Max Pumpkins: ' + beautify(that.obj.max_pump);
    that.elems.max_candy.innerText = 'Max Candy: ' + beautify(that.obj.max_candy);
    that.elems.tot_ers.innerText = 'Trick or treaters: ' + beautify(that.obj.tot_ers);
    that.elems.max_tot_ers.innerText = 'Max TOT-ers: ' + beautify(that.obj.max_tot_ers);
    that.elems.costumes.innerText = 'Costumes: ' + beautify(that.obj.costumes);
    that.elems.max_costumes.innerText = 'Max Costumes: ' + beautify(that.obj.maxCostumes);
    that.elems.farmers.innerText = 'Farmers: ' + beautify(that.obj.farmers);
    that.elems.max_farmers.innerText = 'Max Farmers: ' + beautify(that.obj.maxFarmers);
    that.elems.name.innerText = 'Name: ' + that.obj.name;
  })();
  this.trickOrTreat = function() { // Trick or treat function
    that.obj.candy += rand(that.obj.costumes,1);
    that.updateElements();
  };
  this.elems.tot_button.addEventListener('click',this.trickOrTreat);
  this.onesecond = setInterval(function(){ //Runs every second
    that.updateElements();
    that.save();
    var add = rand(that.obj.costumes,1) * that.obj.tot_ers; //assign variable to add to candy based on tot_ers
    that.obj.candy =
      (that.obj.candy + add <= that.obj.max_candy) ? //if the sum is less than or equal to max amount of candy
        that.obj.candy + add : //continue onward
        that.obj.max_candy;// otherwise make the candy that max amount
  },1000);
  this.shsecond = setInterval(function(){ //Runs every seven and a half second (farmers do this)
    var add = Math.floor(rand(2,1) * that.obj.farmers / 4); //assign variable to add to pumpkins based on farmers
    that.obj.pump = //heh i copied this from onesecond interval
      (that.obj.pump + add <= that.obj.max_pump) ? //if the sum is less than or equal to max amount of pumpkins
        that.obj.pump + add : //continue onward
        that.obj.max_pump;// otherwise make the pumpkins that max amount
  },7500);
  H.onunload = function () {
    that.save();
  }
}
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
var game = new Game(window);
game.elems.signinbtn.addEventListener('click', function() { // firebase sign in
  auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
});//leaderboard reset maybe!!!
database.orderByChild('candy').on('child_changed', function (snapshot) { //vodka rules
  var obj = snapshot.val();
  var element = document.createElement('li');
  game.elems.leaderboard.prepend(element);
  element.outerHTML =`<li class="mdc-list-item"><span class="mdc-list-item__text" style="width:25%">` + d.name + `</span>
  <span class="mdc-list-item__text" style="width:25%">` + beautify(d.candy) + `</span>
  <span class="mdc-list-item__text" style="width:25%">` + beautify(d.pump) + `</span>
  <span class="mdc-list-item__text" style="width:25%">` + beautify(d.tot_ers * d.costumes) + `</span></li>`;
}); // whenever the leaderboard changes. Can we make leaderboard reset
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      database.child(auth.currentUser.uid).once('value').then(function(snapshot) {
        game.obj = snapshot.val();
      });console.log('yuh mamie math calculations ham.')
    } else {
        console.log('Sign in to save your progress!');
    }
});
