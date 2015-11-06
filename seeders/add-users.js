var User = require('./../models/User');

var users = [
	{
		"_id": "U06M2F3NU",
		"username": "jaero",
		"fullname": "Jae Ro",
		"admin": true
	},
	{
		"_id": "U06STB86B",
		"username": "armackey",
		"admin": false
	},
	{
		"_id": "U06UG803S",
		"username": "alvenw",
		"fullname": "Alven Wang",
		"admin": false,
		"__v": 0,
		"requests": []
	},
	{
		"_id": "U06TQKQ9Z",
		"username": "mikeshobe",
		"fullname": "Mike Smith",
		"admin": true
	},
	{
		"_id": "U06LZBNEM",
		"username": "carol",
		"admin": false
	},
	{
		"_id": "U07KA9E0H",
		"username": "vleon",
		"fullname": "Victoria Leon",
		"admin": true
	},
	{
		"_id": "U06RP78HK",
		"username": "arash",
		"admin": false
  },
	{
		"_id": "U06LY6U78",
		"username": "ryanyocum",
		"fullname": "Ryan Yocum",
		"admin": false
	},
	{
		"_id": "U06LXDUKW",
		"username": "rob",
		"fullname": "Rob Wilkinson",
		"admin": true
	},
	{
		"_id": "U07QQ0EQ3",
		"username": "travis",
		"admin": true
	},
	{
		"_id": "U06LY2WA0",
		"username": "kaiserken",
		"fullname": "Ken Kaiser",
		"admin": true
	},
	{
		"_id": "U06LY1UKX",
		"username": "anshusiripurapu",
		"fullname": "Anshu Siripurapu",
		"admin": false
	},
	{
		"_id": "U0700QAG0",
		"username": "enyu",
		"fullname": "Enyu Hsu",
		"admin": false
	},
	{
		"_id": "U06LWHT8F",
		"username": "joeyatiba",
		"admin": true
	},
	{
		"_id": "U06STB63Z",
		"username": "ben",
		"fullname": "Benjamin Tan",
		"admin": false
	},
	{
		"_id": "U0737GT19",
		"username": "simeonesp",
		"admin": false
	},
	{
		"_id": "U06LWN6UR",
		"username": "davidpetri",
		"fullname": "David Petri",
		"admin": true
	},
	{
		"_id": "U06LWHMUN",
		"username": "ankita",
		"fullname": "Ankita Chadha",
		"admin": true
	},
	{
		"_id": "U063JHTRC",
		"username": "azai91",
		"fullname": "",
		"admin": true
	},
	{
		"_id": "U06LY2UCR",
		"username": "wilsonc9",
		"fullname": "Chris Wilson",
		"admin": false
	},
	{
		"_id": "U06LYJ93K",
		"username": "jmoney",
		"fullname": "Jasmine Giang",
		"admin": true
	},
	{
		"_id": "U06LWMN83",
		"username": "arko617",
		"fullname": "Arko Dewri",
		"admin": true
	},
	{
		"_id": "U063JK2P8",
		"username": "willsentance",
		"fullname": "Will Sentance",
		"admin": true
	},
	{
		"_id": "U06TS3PLZ",
		"username": "nicktroutwine",
		"fullname": "Nick Troutwine",
		"admin": false
	},
	{
		"_id": "U09B84GQY",
		"username": "travisci",
		"admin": true
	},
	{
		"_id": "U06TQTD9D",
		"username": "matteubanks",
		"fullname": "Matt Eubanks",
		"admin": false
	},
	{
		"_id": "U06LXSS4A",
		"username": "rouzbeh",
		"admin": false
	},
	{
		"_id": "U06LYBBPX",
		"username": "iam_samara",
		"fullname": "Samara Hernandez",
		"admin": true
	}
];

users.forEach(function(user) {
  User.create(user, function(err, user) {
    console.log(user);
  });
});
