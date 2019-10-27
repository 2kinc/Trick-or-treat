//  R E G U L A R   F U N C T I O N S

var $ = s => document.querySelectorAll(s).length == 1 ? document.querySelector(s) : document.querySelectorAll(s);

//  D A T A

var data = {
    main: {
        candy: 0,
        pumpkins: 0,
        activecostume: [0, 0],
        toters: 0,
        speed: 1,
        storageIncrease: 1,
    },
    currentTab: 1,
    upgrades: [{
        name: 'Gotta go fast',
        description: 'Speed + 1, therfore get to houses faster',
        affects: 'speed',
        add: 1,
        price: 10,
        pricem: 1.2,
    }, {
        name: 'Storage Repairs',
        description: 'Increase current storage space by 10%',
        affects: 'storageIncrease',
        multiply: 1.1,
        price: 15,
        pricem: 1.5,
    }],
    costumes: [
        [{
            name: 'Ghost',
            description: 'Oh. SOO scary. A mattress sheet that\'s trying to scare me.',
            min: 1,
            max: 2,
            price: 0,
            bought: true,
            activated: true,
        }, {
            name: 'Pirate',
            description: 'Arr matey, I am going to steal all your candy.',
            min: 2,
            max: 3,
            price: 14,
            bought: false,
            activated: false,
        }, {
            name: 'Charlie Brown',
            description: 'Not scary, but a classic!',
            min: 1,
            max: 4,
            price: 23,
            bought: false,
            activated: false,
        }],
        [{
            name: 'Batman',
            description: 'Na na na na na na na na BATMAN',
            min: 2,
            max: 5,
            price: 39,
            bought: false,
            activated: false,
        }, {
            name: 'Better Ghost',
            description: 'Hey, look who became more ghost-y.',
            min: 3,
            max: 6,
            price: 52,
            bought: false,
            activated: false,
        }, {
            name: 'Smurf',
            description: 'I\'m blue da ba dee da ba daa',
            min: 3,
            max: 5,
            price: 43,
            bought: false,
            activated: false,
        }]
    ]
};

// V U E   F U N C T I O N S

var methods = {

    tot() {
        var c = this.costumes[this.main.activecostume[0]][this.main.activecostume[1]];
        this.main.candy += Math.floor(Math.random() * (Math.floor(c.max) - Math.ceil(c.min) + 1) + Math.ceil(c.min));
        $('#tot-btn').disabled = true;
        var d = 0;
        var e = setInterval(function() {
            app.percent(d);
            d = d == 360 ? (() => {
                clearInterval(e);
                $('#tot-btn').disabled = false;
            })() : d + 1
        }, (7200 - (this.speed * 250)) / 360)
        $('#tot-btn img').src = 'images/pumpkinlitup.png';
        setTimeout(() => $('#tot-btn img').src = 'images/pumpkinnotlit.png', 1000)
    },

    percent(d) {
        if (d <= 180) {
            $('#tot-btn').style.backgroundImage = 'linear-gradient(' + (90 + d) + 'deg, transparent 50%, #ff8159 50%),linear-gradient(90deg, #ff8159 50%, transparent 50%)';
        } else {
            $('#tot-btn').style.backgroundImage = 'linear-gradient(' + (d - 90) + 'deg, transparent 50%, #ff5722 50%),linear-gradient(90deg, #ff8159 50%, transparent 50%)';
        }
    },

    setTab(i) {
        if (i == 0) {
            $('#betterize-tab').style.left = 0;
            $('#tot-tab').style.left = '100%';
            $('#storage-tab').style.left = '200%';
            this.currentTab = 0;
        } else if (i == 1) {
            $('#betterize-tab').style.left = '-100%';
            $('#tot-tab').style.left = 0;
            $('#storage-tab').style.left = '100%';
            this.currentTab = 1;
        } else if (i == 2) {
            $('#betterize-tab').style.left = '-200%';
            $('#tot-tab').style.left = '-100%';
            $('#storage-tab').style.left = 0;
            this.currentTab = 2;
        }
    },

    costumeclick(a, b) {
        var prevcostume = this.costumes[this.main.activecostume[0]][this.main.activecostume[1]];
        var costume = this.costumes[a][b];
        if (!costume.price) return;
        if (costume.bought) {
            this.main.activecostume = [a, b];
            costume.activated = true;
            prevcostume.activated = false;
        } else if (!costume.bought && this.main.candy >= costume.price) {
            this.main.activecostume = [a, b];
            costume.activated = true;
            prevcostume.activated = false;
            costume.bought = true;
            this.main.candy -= costume.price;
        }
    },

    upgradeclick(thing) {
        if (this.main.candy >= thing.price) {
            this.main.candy -= thing.price;
            if (thing.multiply) this.main[thing.affects] *= thing.multiply;
            if (thing.add) this.main[thing.affects] += thing.add;
            thing.price = Math.round(thing.price * thing.pricem);
        }
    },

    tabToLeft() {
        this.setTab(this.currentTab = this.currentTab == 0 ? 0 : this.currentTab - 1);
    },

    tabToRight() {
        this.setTab(this.currentTab = this.currentTab == 2 ? 2 : this.currentTab + 1)
    },

    upgradeTab() {
        $('#upgrades').style.display = 'block';
        $('#costumes').style.display = 'none';
    },

    costumeTab() {
        $('#upgrades').style.display = 'none';
        $('#costumes').style.display = 'block';
    },
};

//  V U E

var app = new Vue({
    el: '#app',
    data: data,
    methods,
});
app.percent(360);

// K E Y U P

addEventListener('keyup', e => {
    var key = e.key.toLowerCase();
    if (key == 'arrowright') app.tabToRight();
    if (key == 'arrowleft') app.tabToLeft();
});

[...document.querySelectorAll('[tooltip]')].forEach(i => {
    i.addEventListener('mousemove', e => {
        $('#tooltip').style.top = (e.clientY + 5) + 'px';
        $('#tooltip').style.left = (e.clientX + 5) + 'px';
        $('#tooltip').style.opacity = 1;
        $('#tooltip').innerHTML = i.getAttribute('tooltip');
        if (i.getAttribute('tooltipcolor')) $('#tooltip').style.color = i.getAttribute('tooltipcolor');
    });
    i.addEventListener('mouseout', e => {
        $('#tooltip').style.opacity = 0;
    });
});

//  M D C

mdc.autoInit();

var r1 = new mdc.ripple.MDCRipple($('#store-btn'));
r1.unbounded = true;
var betterizeBar = new mdc.tabs.MDCTabBar(document.querySelector('.mdc-tab-bar'));
