/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MESSAGES: () => (/* binding */ MESSAGES),
/* harmony export */   checkSession: () => (/* binding */ checkSession),
/* harmony export */   fetchLogin: () => (/* binding */ fetchLogin),
/* harmony export */   fetchLogout: () => (/* binding */ fetchLogout),
/* harmony export */   getStoredWord: () => (/* binding */ getStoredWord),
/* harmony export */   updateStoredWord: () => (/* binding */ updateStoredWord)
/* harmony export */ });
var MESSAGES = {
  'network-error': "Server unavailable, pleaser try again",
  'required-username': "The username is only made up of underscore, letters and/or numbers. Please correct!",
  'auth-insufficient': "Bad username, dog is NOT allowed! ",
  'required-word': "Please input a word",
  'invalid-word': "Please input an valid word",
  'auth-missing': 'Authentication missing. Please log in first.',
  "default": "Something went wrong, please try again"
};
function fetchLogin(username) {
  return fetch('/api/session/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      username: username
    })
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function fetchLogout() {
  return fetch('/api/session', {
    method: 'DELETE'
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function checkSession() {
  return fetch('/api/session')["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function getStoredWord() {
  return fetch('/api/word')["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function updateStoredWord(word) {
  return fetch('/api/word', {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      word: word
    })
  })["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   state: () => (/* binding */ state)
/* harmony export */ });
var state = {
  isLoggedIn: false,
  username: '',
  storedWord: '',
  loginError: '',
  updateError: ''
};

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/state.js");

function render() {
  var appEL = document.querySelector('#app');
  if (!_state__WEBPACK_IMPORTED_MODULE_0__.state.isLoggedIn) {
    appEL.innerHTML = renderLogin();
  } else {
    appEL.innerHTML = renderWord();
  }
}
function renderLogin() {
  return "\n        <div class=\"login-container\">\n            <h2 class=\"login-title\">Login</h2>\n            <form class=\"login-form\">\n                <label class=\"login-form__label\">\n                    <p class=\"login-form__label-text\">Username:</p>\n                    <input class=\"login-form__input\" type=\"text\" name=\"username\" required>\n                </label>\n                <button id=\"login-button\" type=\"submit\">Login</button>\n            </form>\n            ".concat(_state__WEBPACK_IMPORTED_MODULE_0__.state.loginError ? "<p class=\"login-error\">".concat(_state__WEBPACK_IMPORTED_MODULE_0__.state.loginError, "</p>") : '', "\n        </div>\n    ");
}
function renderWord() {
  return "\n        <div class=\"word-container\">\n            <h2 class=\"word-title\">Hello, ".concat(_state__WEBPACK_IMPORTED_MODULE_0__.state.username, "</h2>\n            <p class=\"word-content\">Your current stored word is: ").concat(_state__WEBPACK_IMPORTED_MODULE_0__.state.storedWord, "</p>\n            <form class=\"update-form\">\n                <label class=\"update-form__label\">\n                    <span class=\"update-form__label-text\">Update stored word:</span>\n                    <input class=\"update-form__input\" type=\"text\" name=\"newWord\" value=\"").concat(_state__WEBPACK_IMPORTED_MODULE_0__.state.storedWord, "\">\n                </label>\n                <button id=\"update-button\" type=\"submit\">Update</button>\n            </form>\n            ").concat(_state__WEBPACK_IMPORTED_MODULE_0__.state.updateError ? "<p class=\"update-error\">".concat(_state__WEBPACK_IMPORTED_MODULE_0__.state.updateError, "</p>") : '', "\n            <button id=\"logout-button\">Logout</button>\n        </div>\n    ");
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view */ "./src/view.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services */ "./src/services.js");



function init() {
  (0,_services__WEBPACK_IMPORTED_MODULE_2__.checkSession)().then(function (response) {
    _state__WEBPACK_IMPORTED_MODULE_1__.state.isLoggedIn = true;
    _state__WEBPACK_IMPORTED_MODULE_1__.state.username = response.username;
    return (0,_services__WEBPACK_IMPORTED_MODULE_2__.getStoredWord)();
  }).then(function (wordResponse) {
    _state__WEBPACK_IMPORTED_MODULE_1__.state.storedWord = wordResponse.storedWord;
    _state__WEBPACK_IMPORTED_MODULE_1__.state.loginError = '';
  })["catch"](function (error) {
    if (error.error === 'auth-missing') {
      _state__WEBPACK_IMPORTED_MODULE_1__.state.username = '';
      _state__WEBPACK_IMPORTED_MODULE_1__.state.isLoggedIn = false;
      _state__WEBPACK_IMPORTED_MODULE_1__.state.storedWord = '';
      _state__WEBPACK_IMPORTED_MODULE_1__.state.loginError = '';
    } else {
      _state__WEBPACK_IMPORTED_MODULE_1__.state.loginError = _services__WEBPACK_IMPORTED_MODULE_2__.MESSAGES[error.error] || _services__WEBPACK_IMPORTED_MODULE_2__.MESSAGES["default"];
    }
  })["finally"](function () {
    (0,_view__WEBPACK_IMPORTED_MODULE_0__.render)();
  });
}
init();
var appEL = document.querySelector('#app');
appEL.addEventListener('click', function (event) {
  if (event.target.id === 'login-button') {
    var username = document.querySelector('.login-form__input').value;
    (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchLogin)(username).then(function (response) {
      _state__WEBPACK_IMPORTED_MODULE_1__.state.isLoggedIn = true;
      _state__WEBPACK_IMPORTED_MODULE_1__.state.username = response.username;
      _state__WEBPACK_IMPORTED_MODULE_1__.state.loginError = '';
      return (0,_services__WEBPACK_IMPORTED_MODULE_2__.getStoredWord)();
    }).then(function (wordResponse) {
      _state__WEBPACK_IMPORTED_MODULE_1__.state.storedWord = wordResponse.storedWord;
    })["catch"](function (error) {
      if (error.error === 'required-username' || error.error === 'auth-insufficient') {
        _state__WEBPACK_IMPORTED_MODULE_1__.state.loginError = _services__WEBPACK_IMPORTED_MODULE_2__.MESSAGES[error.error];
      } else {
        _state__WEBPACK_IMPORTED_MODULE_1__.state.loginError = _services__WEBPACK_IMPORTED_MODULE_2__.MESSAGES[error.error] || _services__WEBPACK_IMPORTED_MODULE_2__.MESSAGES["default"];
      }
    })["finally"](function () {
      (0,_view__WEBPACK_IMPORTED_MODULE_0__.render)();
    });
    event.preventDefault();
  }
  if (event.target.id === 'logout-button') {
    (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchLogout)().then(function () {
      _state__WEBPACK_IMPORTED_MODULE_1__.state.isLoggedIn = false;
      _state__WEBPACK_IMPORTED_MODULE_1__.state.username = '';
      _state__WEBPACK_IMPORTED_MODULE_1__.state.storedWord = '';
      _state__WEBPACK_IMPORTED_MODULE_1__.state.updateError = '';
    })["finally"](function () {
      (0,_view__WEBPACK_IMPORTED_MODULE_0__.render)();
    });
  }
  if (event.target.id === 'update-button') {
    var newWord = document.querySelector('.update-form__input').value;
    (0,_services__WEBPACK_IMPORTED_MODULE_2__.updateStoredWord)(newWord).then(function () {
      _state__WEBPACK_IMPORTED_MODULE_1__.state.storedWord = newWord;
      _state__WEBPACK_IMPORTED_MODULE_1__.state.updateError = '';
    })["catch"](function (error) {
      if (error.error === 'auth-missing') {
        _state__WEBPACK_IMPORTED_MODULE_1__.state.isLoggedIn = false;
        _state__WEBPACK_IMPORTED_MODULE_1__.state.loginError = _services__WEBPACK_IMPORTED_MODULE_2__.MESSAGES[error.error];
      } else if (error.error === 'required-word' || error.error === 'invalid-word') {
        _state__WEBPACK_IMPORTED_MODULE_1__.state.updateError = _services__WEBPACK_IMPORTED_MODULE_2__.MESSAGES[error.error];
      } else {
        _state__WEBPACK_IMPORTED_MODULE_1__.state.updateError = _services__WEBPACK_IMPORTED_MODULE_2__.MESSAGES[error.error] || _services__WEBPACK_IMPORTED_MODULE_2__.MESSAGES["default"];
      }
    })["finally"](function () {
      (0,_view__WEBPACK_IMPORTED_MODULE_0__.render)();
    });
    event.preventDefault();
  }
});
})();

/******/ })()
;
//# sourceMappingURL=demo.js.map