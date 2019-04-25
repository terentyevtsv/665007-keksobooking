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

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var PHOTO_WIDTH = 45;
var PHOTO_HEIGHT = 40;

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
};

var getRandomProperty = function(obj) {
  var keys = Object.keys(obj);

  var key = Math.floor(keys.length * Math.random())
  return obj[keys[key]];
};

var getNewArrayFeature = function(arr) {
  var copyArray = arr.slice();
  var randomLength = getRandom(1, copyArray.length);
  var newArray = [];
  for (var i = 0; i < randomLength; ++i) {
    var randomIndex = getRandom(0, copyArray.length - 1);
    newArray[i] = copyArray[randomIndex];
  }

  return newArray;
};

var shuffleArr = function (arr) {
  var j;
  var temp;
  for (var i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
};

var createRandomAdvertisement = function(index) {
  var avatar = "img/avatars/user0" + (index + 1) + ".png";
  var title = TITLES[index];
  var coordX = getRandom(MIN_COORDINATE_X, MAX_COORDINATE_X);
  var coordY = getRandom(MIN_COORDINATE_Y, MAX_COORDINATE_Y);
  var address = coordX + ", " + coordY;
  var price = getRandom(MIN_PRICE, MAX_PRICE);
  var type = getRandomProperty(TYPES);
  var rooms = getRandom(MIN_ROOMS, MAX_ROOMS);
  var guests = getRandom(MIN_GUESTS, MAX_GUESTS);
  var checkin = TIMES[getRandomUp(TIMES.length)];
  var checkout = TIMES[getRandomUp(TIMES.length)];
  var features = getNewArrayFeature(FEATURES);
  var description = "";
  var photos = shuffleArr(PHOTOS);

  return {
    author: {
      avatar: avatar
    },

    offer: {
      title: title,
      address: address,
      price: price,
      type: type,
      rooms: rooms,
      guests: guests,
      checkin: checkin,
      checkout: checkout,
      features: features,
      description: description,
      photos: photos
    },
    location: {
      coordX: coordX,
      coordY: coordY
    }
  };
};

var createAdvArray = function(count) {
  var advertisements = [];
  for (var i = 0; i < count; ++i) {
    advertisements[i] = createRandomAdvertisement(i);
  }

  return advertisements;
};

var mapPin = document.querySelector("#pin")
  .content.querySelector(".map__pin");
var advertisements = createAdvArray(OFFER_QUANTITY);
var similarMapCard = document.querySelector('#card')
  .content.querySelector('.map__card');


var renderPin = function(advertisment) {
  var pinElement = mapPin.cloneNode(true);
  pinElement.style.left = advertisment.location.coordX - PIN_WIDTH / 2 + "px";
  pinElement.style.top = advertisment.location.coordY - PIN_HEIGHT / 2 + "px";
  var img = pinElement.querySelector("img");
  img.src = advertisment.author.avatar;
  img.alt = advertisment.offer.title;

  return pinElement;
}

var getPins = function() {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < advertisements.length; ++i) {
    fragment.appendChild(renderPin(advertisements[i]));
  }

  return fragment;
};

// Функция присвоения текстовых окончаний для комнат
var roomsAdv = function (roomsNumber) {
  var roomsText = '';
  if (roomsNumber === 1) {
    roomsText = 'комната';
  } else if (roomsNumber === 5) {
    roomsText = 'комнат';
  } else {
    roomsText = 'комнаты';
  }
  return roomsText;
};

// Функция присвоения текстовых окончаний для гостей
var guestsAdv = function (guestsNumber) {
  var guestsText = '';
  if (guestsNumber === 1) {
    guestsText = 'гостя';
  } else {
    guestsText = 'гостей';
  }
  return guestsText;
};

// Функция создание и отрисовки карточки на карте
var renderCard = function (advertisments) {
  var cardElement = similarMapCard.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = advertisments.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = advertisments.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = advertisments.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = advertisments.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = advertisments.offer.rooms + ' ' + roomsAdv(advertisments.offer.rooms) + ' для ' + advertisments.offer.guests + ' ' + guestsAdv(advertisments.offer.guests);
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertisments.offer.checkin + ', выезд до ' + advertisments.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = advertisments.offer.descrition;
  cardElement.querySelector('.popup__avatar').src = advertisments.author.avatar;

  // Добавление особенностей объявлений
  var features = cardElement.querySelector('.popup__features');
  for (var i = 0; i < advertisments.offer.features.length; i++) {
    var newFeature = document.createElement('li');
    newFeature.className = 'popup__feature popup__feature--' + advertisments.offer.features[i];
    features.appendChild(newFeature);
  }

  // Добавление фотографий объявлений
  var photos = cardElement.querySelector('.popup__photos');
  for (var j = 0; j < advertisments.offer.photos.length; j++) {
    var newPhoto = document.createElement('img');
    newPhoto.className = 'popup__photo';
    newPhoto.width = PHOTO_WIDTH;
    newPhoto.height = PHOTO_HEIGHT;
    newPhoto.src = advertisments.offer.photos[j];
    newPhoto.alt = 'Фотография жилья';
    photos.appendChild(newPhoto);
  }

  return cardElement;
};

/*
var pinContainer = map.querySelector(".map__pins");
var mapFiltersContainer = map.querySelector(".map__filters-container");

pinContainer.appendChild(getPins());
map.insertBefore(
  renderCard(advertisements[
    getRandomUp(OFFER_QUANTITY)]),
  mapFiltersContainer);

map.classList.remove("map--faded");*/

var pinMain = document.querySelector(".map__pin--main");
pinMain.addEventListener("mouseup", function() {
  var map = document.querySelector(".map");
  map.classList.remove("map--faded");

  var adForm = document.querySelector(".ad-form");
  adForm.classList.remove("ad-form--disabled");

  var fieldSets = adForm.querySelectorAll(".ad-form__element");
  for (var i = 0; i < fieldSets.length; ++i)
  {
    fieldSets[i].disabled = false;
  }

  var adFormHeader = adForm.querySelector(".ad-form-header");
  adFormHeader.disabled = false;
});
