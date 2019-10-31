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
        farmers: 0,
        farmerRate: 1,
        costumeUp: 1,
        upgrades: [
            [0, 5],
            [0, 15]
            [0, 5000],
            [0, 500],
        ]
    },
    boosts: [
        { name: 'Farm Explosion', description: 'Pumpkins x 2', affects: 'pumpkins', multiply: '2', price: '3000' },
        { name: 'Extreme Candy Corn', description: 'Candy x 2', affects: 'candy', multiply: '2', price: '2500' },
        { name: 'Pumpkin Apocalypse', description: 'Pumpkin x 3', affects: 'pumpkins', multiply: '3', price: '4000' },
        { name: 'Ultimate Candy Corn', description: 'Candy x 4', affects: 'candy', multiply: '5', price: '9000' },
        { name: 'Extreme Costumes', description: 'Costume Effect x 3', affects: 'costumeUp', multiply: '3', price: '10000' }
    ],
    totersManagingStatus: [{
        name: 'You',
        capacity: 20,
    }, {
        name: 'Phone',
        capacity: 300,
        price: 600
    }, {
        name: 'Computer',
        capacity: 1000,
        price: 10000
    }, {
        name: 'AI',
        capacity: Infinity,
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
    }, {
        name: 'Warehouse',
        storage: 130130130130130,
        image: 'images/warehouse.png',
        price: 70707070
    }, {
        name: 'Sky Scraper',
        storage: 130130130130130130130130130,
        image: 'images/skyscraper.png',
        price: 70707070707070
    }, {
        name: 'Portal',
        storage: Infinity,
        image: 'images/skyscraper.png',
        price: 707070707070707070707070
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
    }, {
        name: 'Better Fertilizer',
        description: 'Increase farmer rate by 100%',
        affects: 'farmerRate',
        multiply: 2,
        price: 5000,
        pricem: 1000,
    }, {
        name: 'Expericienced Tailor',
        description: 'Increase costume effectiveness by 50%',
        affects: 'costumeUp',
        multiply: 1.5,
        price: 500,
        pricem: 3000,
    }],
    costumes: [
        [{
            name: 'Ghost',
            description: 'Oh. SOO scary. A mattress sheet that\'s trying to scare me.',
            min: 1,
            max: 2,
            price: 0,
            bought: false,
            activated: false,
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
        }],
        [{
            name: 'Clown',
            description: 'Appears in the sewers.',
            min: 8,
            max: 20,
            price: 283,
            bought: false,
            activated: false,
        }, {
            name: 'Amazing Ghost',
            description: 'Now with transparency!',
            min: 15,
            max: 18,
            price: 325,
            bought: false,
            activated: false,
        }, {
            name: 'Queen of Hearts',
            description: 'I have way too much makeup on.',
            min: 18,
            max: 20,
            price: 402,
            bought: false,
            activated: false,
        }],
        [{
            name: 'Joker',
            description: 'Dancing down some stairs...',
            min: 123,
            max: 234,
            price: 6358,
            bought: false,
            activated: false,
        }, {
            name: 'Creepy Doll',
            description: 'It\'s moving its eyes... because it\'s a human.',
            min: 100,
            max: 129,
            price: 5039,
            bought: false,
            activated: false,
        }, {
            name: 'Dead Ghost',
            description: 'You died for halloween?',
            min: 1,
            max: 9876543210,
            price: 1234567890,
            bought: false,
            activated: false,
        }]
    ]
};

// V U E   F U N C T I O N S

var methods = {

    tot() {
        var c = this.costumes[this.main.activecostume[0]][this.main.activecostume[1]];
        this.main.candy += random(Math.round(c.min * this.main.costumeUp), Math.round(c.max * this.main.costumeUp));
        $('#tot-btn').disabled = true;
        var d = 0;
        var e = setInterval(() => {
            app.percent(d);
            d = d >= 360 ? (() => {
                d = 360;
                clearInterval(e);
                $('#tot-btn').disabled = false;
            })() : d + this.main.speed;
        }, 7);
        $('#tot-btn img').src = 'images/pumpkinlitup.png';
        setTimeout(() => $('#tot-btn img').src = 'images/pumpkinnotlit.png', 1000)
    },
    beautify,
    percent(d) {
        if (d <= 180) $('#tot-btn').style.backgroundImage = 'linear-gradient(' + (90 + d) + 'deg, transparent 50%, #ff8159 50%),linear-gradient(90deg, #ff8159 50%, transparent 50%)';
        else $('#tot-btn').style.backgroundImage = 'linear-gradient(' + (d - 90) + 'deg, transparent 50%, #ff5722 50%),linear-gradient(90deg, #ff8159 50%, transparent 50%)';

    },
    hireToter() {
        app.main.toters += app.main.candy >= 15 ? (() => { app.main.candy -= 15; return 1 })() : 0;
    },
    hireFarmer() {
        app.main.farmers += app.main.candy >= 50 ? (() => { app.main.candy -= 50; return 1 })() : 0;
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
            var index = this.upgrades.indexOf(thing);
            this.main.upgrades[index][0]++;
            this.main.upgrades[index][1] = this.price;
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
    },
    openShop() {
        shopDialog.show()
    },
    closeShop() {
        shopDialog.close()
    },
    upgradeStatus() {
        if (this.main.candy >= this.totersManagingStatus[this.main.totersms + 1].price) {
            this.main.candy -= this.totersManagingStatus[this.main.totersms + 1].price;
            this.main.totersms++;
        }
    }
};

//  I N I T   V U E   A N D   S A V E D   D A T A

var app = new Vue({
    el: '#app',
    data: data,
    methods,
});

if (localStorage.tot) data.main = JSON.parse(localStorage.tot);
data.main.bought.forEach(i => data.costumes[i[0]][i[1]].bought = true);
data.costumes[data.main.activecostume[0]][data.main.activecostume[1]].activated = true;
data.main.upgrades.forEach((i, _) => data.upgrades[_].price = i[1]);

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
    if (app.main.toters >= app.totersManagingStatus[app.main.totersms].capacity) app.main.toters = app.totersManagingStatus[app.main.totersms].capacity;
    if (app.main.candy > Math.round(app.storage[app.main.activeStorage].storage * app.main.storageIncrease)) app.main.candy = Math.round(app.storage[app.main.activeStorage].storage * app.main.storageIncrease);
};

var oneSec = setInterval(oneSecFunc, 1000);

// O N E   M I N U T E   I N T E R V A L

var oneMinFunc = function() {

    if (app.main.candy >= app.main.toters * 15) app.main.candy -= app.main.toters * 15;
    else app.main.toters -= random(app.main.toters / 2 - 5, app.main.toters / 2 + 5);
    if (app.main.candy >= app.main.farmers * 50) {
        app.main.candy -= app.main.farmers * 50
        app.main.pumpkins += app.main.farmers * app.main.farmerRate;
    }

};

var oneMin = setInterval(oneMinFunc, 60000);


// T O O L T I P

[...document.querySelectorAll('[tooltip]')].forEach(i => {
    i.addEventListener('mousemove', e => {
        $('#tooltip').style.top = (e.clientY + 5) + 'px';
        $('#tooltip').style.left = (e.clientX + 5) + 'px';
        $('#tooltip').style.display = 'block';
        $('#tooltip').style.opacity = 1;
        $('#tooltip').innerHTML = i.getAttribute('tooltip');
        $('#tooltip').style.color = i.getAttribute('tooltipcolor') || 'white';
    });
    i.addEventListener('mouseout', e => {
        $('#tooltip').style.display = 'none';
        $('#tooltip').style.opacity = 0;
    });
});

//  M D C

mdc.autoInit();

var r1 = new mdc.ripple.MDCRipple($('#store-btn'));
r1.unbounded = true;
var betterizeBar = new mdc.tabs.MDCTabBar(document.querySelector('.mdc-tab-bar'));
var shopDialog = new mdc.dialog.MDCDialog($('#shopDialog'));

// S A V I N G

window.onunload = function() {
    localStorage.tot = JSON.stringify(data.main);
};