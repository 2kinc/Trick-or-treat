function Game(T,o,t) {
  var that = this;
  //beautify thing (to make the display of things way easier)
  function beautify(t) {var f=[{start:3,end:6,suffix:"K"},{start:6,end:9,suffix:"M"},{start:9,end:12,suffix:"B"},{start:12,end:15,suffix:"T"},{start:15,end:18,suffix:"q"},{start:18,end:21,suffix:"Q"},{start:21,end:24,suffix:"s"},{start:24,end:27,suffix:"S"},{start:27,end:30,suffix:"O"},{start:30,end:33,suffix:"N"},{start:33,end:36,suffix:"D"},{start:36,end:39,suffix:"uD"},{start:39,end:42,suffix:"dD"},{start:42,end:45,suffix:"tD"},{start:45,end:48,suffix:"qD"},{start:48,end:51,suffix:"QD"},{start:51,end:54,suffix:"sD"},{start:54,end:57,suffix:"SD"},{start:57,end:60,suffix:"oD"},{start:60,end:63,suffix:"nD"},{start:63,end:66,suffix:"V"},{start:66,end:69,suffix:"uV"},{start:69,end:72,suffix:"dV"},{start:72,end:75,suffix:"tV"},{start:75,end:78,suffix:"qV"},{start:78,end:81,suffix:"QV"},{start:81,end:84,suffix:"sV"},{start:84,end:87,suffix:"SV"},{start:87,end:90,suffix:"oV"},{start:90,end:93,suffix:"nV"},{start:93,end:96,suffix:"T"},{start:96,end:99,suffix:"uT"},{start:99,end:102,suffix:"dT"},{start:102,end:105,suffix:"tT"},{start:105,end:108,suffix:"qT"}].filter(f=>{var s=Math.log10(t);return s>=f.start&&s<f.end});if(f&&f.length){var s=t/Math.pow(10,f[0].start);return(s=(s=Math.floor(100*s)/100).toFixed(2))+f[0].suffix}return t};
  //getter thing
  function $(thing) {
      var el = document.querySelectorAll(thing);
      el = (el.length == 1) ? el[0] : el.length == 0 ? null : el;
      return el;
  }
  (function status(str) {
    $('#status').innerHTML = str;
  }) ('Trick or treat!');
  //If browser does not support local storage:
  if (!window.localStorage) {
    throw 'Hey! Get a better browser that supports local storage!';
  }
  //All of the firebase stuff
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
  //material design components stuff
  //  Ripples
  new mdc.ripple.MDCRipple($('#shopButton'));
  new mdc.tabBar.MDCTabBar($('.mdc-tab-bar'));
  new mdc.ripple.MDCRipple($('#tot-btn'));
  var drawer = new mdc.drawer.MDCDrawer($('.mdc-drawer')); // drawer
  $('.menu').addEventListener('click', function() {drawer.open = true});
  //normal stuff
  this.elems = {
    candy:$('#hmc'),
    max_candy:$('#mx-candy'),
    pumpkin:$('#hmp'),
    max_pumpkins:$('#mx-pump'),
    signinbtn:$('#sign-in-btn'),
    name:$('#name'),
    tot_ers:$('#jobs'),
    max_tot_ers:$('#max-jobs'),
    farmers:$('#farmers'),
    max_farmers:$('#max-farmers'),
    costumes:$('#multiplier'),
    max_costumes:$('#max-mult'),
  }
  this.obj = localStorage.getItem('trickOrTreat') || {
    candy: 0, // candy
    max_candy: 70000, // max candy
    pump: 10, //pumpkins
    max_pump: 10, // max pumpkins
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
    name: Math.floor(Math.random() * 1000000 + 10000).toString(36), // name to display
  }
  this.onesecond = setInterval(function(){ //Runs every second

  },1000);
  this.shsecond = setInterval(function(){ //Runs every seven and a half second (farmers do this)

  },7500);
  this.elems.signinbtn.addEventListener('click', function() {
    auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    //this.obj = auth.
  });
}
var game = new Game();
