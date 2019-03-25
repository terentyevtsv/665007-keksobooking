var TITLES = [
  "Большая уютная квартира", "Маленькая неуютная квартира",
  "Огромный прекрасный дворец", "Маленький ужасный дворец",
  "Красивый гостевой домик", "Некрасивый негостеприимный домик",
  "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"
];

var TYPES = {
  palace: "Дворец",
  flat: "Квартира",
  house: "Дом",
  bungalo: "Бунгало"
};

var TIMES = [
  "12:00", "13:00", "14:00"
];

var FEATURES = [
  "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"
];

var PHOTOS = [
  "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
];

var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;

var MIN_COORDINATE_Y = 130;
var MAX_COORDINATE_Y = 630;

var MIN_ROOMS = 1;
var MAX_ROOMS = 5;

var MIN_GUESTS = 1;
var MAX_GUESTS = 10;

var OFFER_QUANTITY = 8;

var MIN_COORDINATE_X = 50;
var MAX_COORDINATE_X = 1100;

var getRandomUp = function (upperBound) {
  return Math.floor(Math.random() * upperBound);
};

var getRandom = function(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);

  return rand;
}

var getRandomProperty = function(obj) {
  var keys = Object.keys(obj);

  var key = Math.floor(keys.length * Math.random())
  return obj[keys[key]];
}

var createRandomAdvertisement = function(index) {
  var avatar = "img/avatars/user0" + (i + 1) + ".png";
  var title = TITLES[index];
  var coordX = getRandom(MIN_COORDINATE_X, MAX_COORDINATE_X);
  var coordY = getRandom(MIN_COORDINATE_Y, MAX_COORDINATE_Y);
  var address = coordX + ", " + coordY;
  var price = getRandom(MIN_PRICE, MAX_PRICE);
  var type = getRandomProperty(TYPES);
  var rooms = getRandom(MIN_ROOMS, MAX_ROOMS);
  var guests = getRandom(MIN_GUESTS, MAX_GUESTS);
  var checkin = OFFER_TIME[getRandomUp(OFFER_TIME.length)];
  var checkout = OFFER_TIME[getRandomUp(OFFER_TIME.length)];

}
