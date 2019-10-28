//  R E G U L A R   F U N C T I O N S

var $ = s => document.querySelectorAll(s).length == 1 ? document.querySelector(s) : document.querySelectorAll(s);
var beautify = n => ((Math.log10(n) / 3 | 0) == 0) ? n : Number((n / Math.pow(10, (Math.log10(n) / 3 | 0) * 3)).toFixed(1)) + ["", "K", "M", "B", "T", "q", "Q", "s", "S", "o", "n", "D", "uD", "dD", "tD", "qD", "QD", "sD", "SD", "oD", "nD", "V", "uV", "dV", "tV", "qV", "QV", "sV", "SV", "oV", "nV", "t", "ut", "dt", "tt", "qt", "Qt", "st", "St", "ot", "nt", "qU", "uqU", "dqU", "tqU", "qqU", "QqU", "squ", "Squ", "oqu", "nqu", "Qu", "uQu", "dQu", "tQu", "qQu", "QQu", "sQu", "SQu", "oQu", "nQu", "se", "use", "dse", "tse", "qse", "Qse", "sse", "Sse", "ose", "nse", "Se", "uSe", "dSe", "tSe", "qSe", "QSe", "sSe", "SSe", "oSe", "nSe", "O", "uO", "dO", "tO", "qO", "QO", "sO", "SO", "oO", "nO", "N", "uN", "dN", "tN", "qN", "QN", "sN", "SN", "oN", "nN", "c", "."][Math.log10(n) / 3 | 0];
var random = (n, x) => Math.floor(Math.random() * (Math.floor(x) - Math.ceil(n) + 1) + Math.ceil(n))

//  D A T A

var data = {
    main: {
        candy: 0,
        pumpkins: 0,
        activecostume: [0, 0],
        toters: 0,
        speed: 1,
        storageIncrease: 1,
        bought: [
            [0, 0]
        ],
        activeStorage: 0,
        toters: 0,
        totersms: 0,
    },
    totersManagingStatus: [{
        name: 'You',
        capacity: 20,
    }, {
        name: 'Phone',
        capacity: 300,
        price: 600
    }, {
        name: 'You',
        capacity: 10,
        price: 10000
    }, {
        name: 'AI',
        capacity: 10,
        price: 30000000
    }],
    storage: [{
        name: 'Pantry',
        storage: 1300,
        image: 'images/pantry.png'
    }, {
        name: 'Shed',
        storage: 130130,
        image: 'images/shed.png',
        price: 700
    }, {
        name: 'House',
        storage: 130130130,
        image: 'images/house.png',
        price: 70707
    }],
    currentTab: 1,
    upgrades: [{
        name: 'Gotta go fast',
        description: 'Speed + 1, therfore get to houses faster',
        affects: 'speed',
        add: 1,
        price: 5,
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
        }],
        [{
            name: 'Wow Ghost',
            description: 'Is that... a green glow?',
            min: 5,
            max: 7,
            price: 74,
            bought: false,
            activated: false,
        }, {
            name: 'Skeleton',
            description: 'Spooky Scary Skeletons Send Shivers Down Your Spine',
            min: 4,
            max: 10,
            price: 98,
            bought: false,
            activated: false,
        }, {
            name: 'M&M',
            description: 'I am a cannibal.',
            min: 6,
            max: 12,
            price: 112,
            bought: false,
            activated: false,
        }]
    ]
};

// V U E   F U N C T I O N S

var methods = {

    tot() {
        var c = this.costumes[this.main.activecostume[0]][this.main.activecostume[1]];
        this.main.candy += random(c.min, c.max);
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
    beautify,
    percent(d) {
        if (d <= 180) $('#tot-btn').style.backgroundImage = 'linear-gradient(' + (90 + d) + 'deg, transparent 50%, #ff8159 50%),linear-gradient(90deg, #ff8159 50%, transparent 50%)';
        else $('#tot-btn').style.backgroundImage = 'linear-gradient(' + (d - 90) + 'deg, transparent 50%, #ff5722 50%),linear-gradient(90deg, #ff8159 50%, transparent 50%)';

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
        if (prevcostume == costume) return;
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
            this.main.bought.push([a, b]);
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
        this.setTab(this.currentTab -= this.currentTab == 0 ? 0 : 1);
    },

    tabToRight() {
        this.setTab(this.currentTab += this.currentTab == 2 ? 0 : 1)
    },

    upgradeTab() {
        $('#upgrades').style.display = 'block';
        $('#costumes').style.display = 'none';
        $('#hire').style.display = 'none';
    },

    costumeTab() {
        $('#upgrades').style.display = 'none';
        $('#costumes').style.display = 'block';
        $('#hire').style.display = 'none';
    },
    hireTab() {
        $('#upgrades').style.display = 'none';
        $('#costumes').style.display = 'none';
        $('#hire').style.display = 'block';
    },
    upgradeStorage() {
        if (this.storage[this.main.activeStorage + 1] && this.storage[this.main.activeStorage + 1].price <= this.main.candy) {
            this.main.candy -= this.storage[this.main.activeStorage + 1].price;
            this.main.activeStorage += this.main.activeStorage == this.storage.length - 1 ? 0 : 1;
        }
    }
};

//  V U E   S E T U P

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

// O N E   S E C O N D   I N T E R V A L

var oneSecFunc = function() {

    if (app.main.candy >= app.main.toters * 15) {
        var c = app.costumes[app.main.activecostume[0]][app.main.activecostume[1]];
        app.main.candy += Math.floor(Math.random() * (Math.floor(c.max) - Math.ceil(c.min) + 1) + Math.ceil(c.min)) * app.main.toters;
    }
};

var oneSec = setInterval(oneSecFunc, 1000);

// O N E   M I N U T E   I N T E R V A L

var oneMinFunc = function() {

    if (app.main.candy >= app.main.toters * 15) app.main.candy -= app.main.toters * 15;
    else app.main.toters -= random(app.main.toters / 2 - 5, app.main.toters / 2 + 5)

};

var oneMin = setInterval(oneMinFunc, 60000);


// T O O L T I P

[...document.querySelectorAll('[tooltip]')].forEach(i => {
    i.addEventListener('mousemove', e => {
        $('#tooltip').style.top = (e.clientY + 5) + 'px';
        $('#tooltip').style.left = (e.clientX + 5) + 'px';
        $('#tooltip').style.opacity = 1;
        $('#tooltip').innerHTML = i.getAttribute('tooltip');
        $('#tooltip').style.color = i.getAttribute('tooltipcolor') || 'white';
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