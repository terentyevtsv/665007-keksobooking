/* eslint strict: ['error', 'global']*/
'use strict';

var createAds = function () {
  var OFFER_TITLE = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  var OFFER_TYPE = {
      palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var OFFER_TIME = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var OFFER_FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var OFFER_PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var PHOTO_WIDTH = 45;
  var PHOTO_HEIGHT = 40;

  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;

  var MIN_COORDINATE_X = 50;
  var MAX_COORDINATE_X = 1100;

  var MIN_COORDINATE_Y = 130;
  var MAX_COORDINATE_Y = 630;

  var MIN_ROOMS = 1;
  var MAX_ROOMS = 5;

  var MIN_GUESTS = 1;
  var MAX_GUESTS = 10;

  var OFFER_QUANTITY = 8;

  // Нахождение случайного числа в диапазоне
  var getRandom = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // Нахождение случайного числа
  var getRandomUp = function (upperBound) {
    return Math.floor(Math.random() * upperBound);
  };

  // Функция случайной сортировки массивов
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

  // Функция генерации массива строк
  var getNewArrayFeature = function (arr) {
    var copyArray = arr.slice();
    var randomLength = getRandom(1, copyArray.length);
    var newArray = [];
    for (var i = 0; i < randomLength; i++) {
      var randomIndex = getRandom(0, copyArray.length - 1);
      newArray[i] = copyArray[randomIndex];
      copyArray.slice(randomIndex, 1);
    }
    return newArray;
  };

  // Функция случайного свойства объекта
  var getRandomProperty = function (obj) {
    var keys = Object.keys(obj);
    return obj[keys[Math.floor(keys.length * Math.random())]];
  };


  // Функция создания случайного объявления
  var createRandomAdv = function (index) {
    var avatar = 'img/avatars/user0' + (index + 1) + '.png';
    var title = OFFER_TITLE[index];
    var coordinateX = getRandom(MIN_COORDINATE_X, MAX_COORDINATE_X);
    var coordinateY = getRandom(MIN_COORDINATE_Y, MAX_COORDINATE_Y);
    var address = coordinateX + ', ' + coordinateY;
    var price = getRandom(MIN_PRICE, MAX_PRICE);
    var type = getRandomProperty(OFFER_TYPE);
    var rooms = getRandom(MIN_ROOMS, MAX_ROOMS);
    var guests = getRandom(MIN_GUESTS, MAX_GUESTS);
    var checkin = OFFER_TIME[getRandomUp(OFFER_TIME.length)];
    var checkout = OFFER_TIME[getRandomUp(OFFER_TIME.length)];
    var features = getNewArrayFeature(OFFER_FEATURES);
    var description = '';
    var photos = shuffleArr(OFFER_PHOTOS);

    // Cоздание объекта объявлений
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
        coordX: coordinateX,
        coordY: coordinateY
      }
    };
  };

  // Функция создания массива объявлений
  var createAdvArray = function (index) {
    var advertisments = [];
    for (var i = 0; i < index; i++) {
      advertisments[i] = createRandomAdv(i);
    }
    return advertisments;
  };

  // Функция создания и отрисовки меток на карте
  var renderPin = function (advertisments) {
    var pinElement = similarMapPin.cloneNode(true);

    pinElement.style.left = advertisments.location.coordX - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = advertisments.location.coordY - PIN_HEIGHT / 2 + 'px';
    pinElement.querySelector('img').src = advertisments.author.avatar;
    pinElement.querySelector('img').alt = advertisments.offer.title;

    return pinElement;
  };

  // Функция заполнения блока меток
  var getPin = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < advertisments.length; i++) {
      fragment.appendChild(renderPin(advertisments[i]));
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

  var advertisments = createAdvArray(OFFER_QUANTITY);
  var showMap = document.querySelector('.map');
  var containerPin = showMap.querySelector('.map__pins');
  var similarMapPin = document.querySelector('#pin').content.querySelector('.map__pin');
  var similarMapCard = document.querySelector('#card').content.querySelector('.map__card');
  var mapFiltersContainer = showMap.querySelector('.map__filters-container');

  containerPin.appendChild(getPin());
  showMap.insertBefore(renderCard(advertisments[getRandomUp(OFFER_QUANTITY)]), mapFiltersContainer);
  showMap.classList.remove('map--faded');
};

createAds();
