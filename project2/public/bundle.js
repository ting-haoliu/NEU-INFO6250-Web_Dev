/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CLIENT: () => (/* binding */ CLIENT),
/* harmony export */   MESSAGES: () => (/* binding */ MESSAGES),
/* harmony export */   SERVER: () => (/* binding */ SERVER)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var SERVER = {
  AUTH_MISSING: 'auth-missing',
  AUTH_INSUFFICIENT: 'auth-insufficient',
  REQUIRED_USERNAME: 'required-username',
  REQUIRED_MESSAGE: 'required-message'
};
var CLIENT = {
  NETWORK_ERROR: 'networkError',
  NO_SESSION: 'noSession'
};
var MESSAGES = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, CLIENT.NETWORK_ERROR, 'Trouble connecting to the network.  Please try again'), SERVER.AUTH_MISSING, 'Authentication missing. Please log in first'), SERVER.AUTH_INSUFFICIENT, 'Username "dog" is NOT allowed!'), SERVER.REQUIRED_USERNAME, 'Please enter a valid username'), SERVER.REQUIRED_MESSAGE, 'Please enter the message'), CLIENT.NO_SESSION, 'Session missing. Please log in'), "default", 'Something went wrong.  Please try again');

/***/ }),

/***/ "./src/listeners.js":
/*!**************************!*\
  !*** ./src/listeners.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addClickEvents: () => (/* binding */ addClickEvents)
/* harmony export */ });
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services */ "./src/services.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }



function addClickEvents(state, appEl) {
  appEl.addEventListener('click', function (e) {
    switch (e.target.id) {
      case 'logout-button':
        {
          (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchLogout)().then(function () {
            (0,_state__WEBPACK_IMPORTED_MODULE_0__.logout)();
          })["catch"](function (err) {
            (0,_state__WEBPACK_IMPORTED_MODULE_0__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
          })["finally"](function () {
            (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])(state, appEl);
          });
          break;
        }
      case 'login-button':
        {
          var username = appEl.querySelector('.login-form__input').value;
          (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchLogin)(username).then(function () {
            (0,_state__WEBPACK_IMPORTED_MODULE_0__.login)(username);
            (0,_state__WEBPACK_IMPORTED_MODULE_0__.addUser)(username);
            return Promise.all([(0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchUsersList)(), (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchMessagesList)()]);
          }).then(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
              users = _ref2[0],
              messages = _ref2[1];
            (0,_state__WEBPACK_IMPORTED_MODULE_0__.setUsers)(users.usersList);
            (0,_state__WEBPACK_IMPORTED_MODULE_0__.setMessages)(messages.messagesList);
            (0,_state__WEBPACK_IMPORTED_MODULE_0__.setError)('');
          })["catch"](function (err) {
            (0,_state__WEBPACK_IMPORTED_MODULE_0__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
          })["finally"](function () {
            (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])(state, appEl);
          });
          break;
        }
      case 'send-button':
        {
          var newMessage = document.querySelector('#to-send').value;

          // Ignore empty input
          if (newMessage) {
            (0,_services__WEBPACK_IMPORTED_MODULE_2__.fetchAddMessage)(newMessage).then(function () {
              (0,_state__WEBPACK_IMPORTED_MODULE_0__.addMessage)(newMessage);
            })["catch"](function (err) {
              (0,_state__WEBPACK_IMPORTED_MODULE_0__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
            })["finally"](function () {
              (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])(state, appEl);
            });
          }
          break;
        }
    }
    e.preventDefault();
  });
}

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function render(state, appEl) {
  var html = "\n        ".concat(generateLoginHtml(state), "\n        ").concat(generateContentHtml(state), "\n    ");
  appEl.innerHTML = html;
}
function generateLoginHtml(state) {
  if (state.isLoggedIn) {
    return "";
  }
  return "\n        <div class=\"login-container\">\n            <h2 class=\"login-title\">Login</h2>\n            <form class=\"login-form\" action=\"#login\">\n                <label class=\"login-form__label\">\n                    <p class=\"login-form__label-text\">Username</p>\n                    <input class=\"login-form__input\" type=\"text\">\n                </label>\n                <button id=\"login-button\" type=\"submit\">Login</button>\n            </form>\n            ".concat(generateStatusHtml(state), "\n        </div>\n    ");
}
function generateContentHtml(state) {
  if (!state.isLoggedIn) {
    return "";
  }
  return "\n        <div class=\"content-container\">\n            ".concat(generateGreetingHtml(state), "\n            ").concat(getUsersHTML(state), "\n            ").concat(getMessagesHTML(state), "\n            ").concat(getOutgoingHTML(), "\n        </div>\n    ");
}
function getUsersHTML(state) {
  return "\n        <ul class=\"users\">" + Object.values(state.usersList).map(function (user) {
    return "\n            <li>\n                <div class=\"user\">\n                    <span class=\"username\">".concat(user, "</span>\n                </div>\n            </li>    \n        ");
  }).join('') + "</ul>";
}
function getMessagesHTML(state) {
  return "\n        <ol class=\"messages\">" + Object.values(state.messagesList).map(function (message) {
    return "\n            <li>\n                <div class=\"message\">\n                    <div class=\"sender-info\">\n                        <img class=\"user-image\" alt=\"avatar of ".concat(message.sender, "\" src=\"//placehold.co/40x40?text=").concat(message.sender, "\"/>\n                    </div>\n                    <p class=\"message-text\">").concat(message.text, "</p>\n                </div>\n            </li>\n        ");
  }).join('') + "</ol>";
}
function getOutgoingHTML() {
  return "\n        <div class=\"outgoing\">\n            <form class=\"message-form\">\n                <textarea id=\"to-send\" name=\"text\" placeholder=\"Enter text to send\"/></textarea>\n                <button id=\"send-button\" type=\"submit\">Send</button>\n            </form>\n        </div>\n    ";
}
function generateGreetingHtml(state) {
  return "\n        <div class=\"greeting-container\">\n            <p>Hello, ".concat(state.username, "</p>\n            <button id=\"logout-button\">Logout</button>\n        </div>\n    ");
}
function generateStatusHtml(state) {
  return "\n        <div class=\"error-message\"> ".concat(state.error, "</>\n    ");
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (render);

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchAddMessage: () => (/* binding */ fetchAddMessage),
/* harmony export */   fetchLogin: () => (/* binding */ fetchLogin),
/* harmony export */   fetchLogout: () => (/* binding */ fetchLogout),
/* harmony export */   fetchMessagesList: () => (/* binding */ fetchMessagesList),
/* harmony export */   fetchSession: () => (/* binding */ fetchSession),
/* harmony export */   fetchUsersList: () => (/* binding */ fetchUsersList)
/* harmony export */ });
function fetchLogin(username) {
  return fetch('/api/v1/session', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      username: username
    })
  })["catch"](function () {
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
  return fetch('/api/v1/session', {
    method: 'DELETE'
  })["catch"](function () {
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
function fetchSession() {
  return fetch('/api/v1/session', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
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
function fetchUsersList() {
  return fetch('/api/v1/users', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
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
function fetchMessagesList() {
  return fetch('/api/v1/messages', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
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
function fetchAddMessage(text) {
  return fetch('/api/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      text: text
    })
  })["catch"](function () {
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
/* harmony export */   addMessage: () => (/* binding */ addMessage),
/* harmony export */   addUser: () => (/* binding */ addUser),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   login: () => (/* binding */ login),
/* harmony export */   logout: () => (/* binding */ logout),
/* harmony export */   setError: () => (/* binding */ setError),
/* harmony export */   setMessages: () => (/* binding */ setMessages),
/* harmony export */   setUsers: () => (/* binding */ setUsers)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");

var state = {
  isLoggedIn: false,
  username: '',
  usersList: [],
  messagesList: [],
  error: '',
  isLoading: true
};
function login(username) {
  state.isLoggedIn = true;
  state.username = username;
  state.error = '';
  state.isLoading = false;
}
function logout() {
  state.isLoggedIn = false;
  state.username = '';
  state.usersList = [];
  state.messagesList = [];
  state.error = '';
  state.isLoading = false;
}
function setError(error) {
  if (!error) {
    state.error = '';
    return;
  }
  state.error = _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES[error] || _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES["default"];
}
function setUsers(usersList) {
  usersList.forEach(function (user) {
    if (!state.usersList.includes(user)) {
      state.usersList.push(user);
    }
  });
  state.error = '';
}
function addUser(username) {
  if (!state.usersList.includes(username)) {
    state.usersList.push(username);
    state.error = '';
  }
}
function setMessages(messagesList) {
  state.messagesList = messagesList;
  state.error = '';
}
function addMessage(messageText) {
  state.messagesList.push({
    sender: state.username,
    text: messageText
  });
  state.error = '';
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (state);

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
/*!**********************!*\
  !*** ./src/chats.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _listeners__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./listeners */ "./src/listeners.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }





var appEl = document.querySelector('#app');
(0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])(_state__WEBPACK_IMPORTED_MODULE_0__["default"], appEl);
(0,_listeners__WEBPACK_IMPORTED_MODULE_2__.addClickEvents)(_state__WEBPACK_IMPORTED_MODULE_0__["default"], appEl);
init();
pollChanges();
function init() {
  (0,_services__WEBPACK_IMPORTED_MODULE_3__.fetchSession)().then(function (response) {
    if (response.username) {
      (0,_state__WEBPACK_IMPORTED_MODULE_0__.login)(response.username);
      return Promise.all([(0,_services__WEBPACK_IMPORTED_MODULE_3__.fetchUsersList)(), (0,_services__WEBPACK_IMPORTED_MODULE_3__.fetchMessagesList)()]);
    }
  }).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      users = _ref2[0],
      messages = _ref2[1];
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.setUsers)(users.usersList);
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.setMessages)(messages.messagesList);
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.setError)('');
  })["catch"](function (err) {
    if ((err === null || err === void 0 ? void 0 : err.error) === _constants__WEBPACK_IMPORTED_MODULE_4__.SERVER.AUTH_MISSING) {
      return Promise.reject({
        error: _constants__WEBPACK_IMPORTED_MODULE_4__.CLIENT.NO_SESSION
      });
    }
    return Promise.reject(err);
  })["catch"](function (err) {
    if ((err === null || err === void 0 ? void 0 : err.error) === _constants__WEBPACK_IMPORTED_MODULE_4__.CLIENT.NO_SESSION) {
      (0,_state__WEBPACK_IMPORTED_MODULE_0__.logout)();
      return;
    }
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
  })["finally"](function () {
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])(_state__WEBPACK_IMPORTED_MODULE_0__["default"], appEl);
  });
}
function refreshMessagesList() {
  return (0,_services__WEBPACK_IMPORTED_MODULE_3__.fetchMessagesList)().then(function (response) {
    if (!_state__WEBPACK_IMPORTED_MODULE_0__["default"].messages || _state__WEBPACK_IMPORTED_MODULE_0__["default"].messages.length < response.length) {
      (0,_state__WEBPACK_IMPORTED_MODULE_0__.setMessages)(response.messagesList);
      return 'update';
    }
  })["catch"](function (err) {
    if ((err === null || err === void 0 ? void 0 : err.error) === _constants__WEBPACK_IMPORTED_MODULE_4__.SERVER.AUTH_MISSING) {
      (0,_state__WEBPACK_IMPORTED_MODULE_0__.logout)();
    } else {
      (0,_state__WEBPACK_IMPORTED_MODULE_0__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
    }
  });
}
function refreshUsersList() {
  return (0,_services__WEBPACK_IMPORTED_MODULE_3__.fetchUsersList)().then(function (response) {
    if (!_state__WEBPACK_IMPORTED_MODULE_0__["default"].users || JSON.stringify(_state__WEBPACK_IMPORTED_MODULE_0__["default"].users) !== JSON.stringify(response)) {
      (0,_state__WEBPACK_IMPORTED_MODULE_0__.setUsers)(response.usersList);
      return 'update';
    }
  })["catch"](function (err) {
    if ((err === null || err === void 0 ? void 0 : err.error) === _constants__WEBPACK_IMPORTED_MODULE_4__.SERVER.AUTH_MISSING) {
      (0,_state__WEBPACK_IMPORTED_MODULE_0__.logout)();
    } else {
      (0,_state__WEBPACK_IMPORTED_MODULE_0__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
    }
  });
}

// Polling functions
function renderMessagesList() {
  refreshMessagesList().then(function (response) {
    if (response === 'update') {
      (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])(_state__WEBPACK_IMPORTED_MODULE_0__["default"], appEl);
    }
  })["catch"](function () {
    return (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])(_state__WEBPACK_IMPORTED_MODULE_0__["default"], appEl);
  }); // Ignore error as it's handled in refreshMessagesList
}
function renderUsersList() {
  refreshUsersList().then(function (response) {
    if (response === 'update') {
      (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])(_state__WEBPACK_IMPORTED_MODULE_0__["default"], appEl);
    }
  })["catch"](function () {
    return (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])(_state__WEBPACK_IMPORTED_MODULE_0__["default"], appEl);
  }); // Ignore error as it's handled in refreshUsersList
}
function pollChanges() {
  if (_state__WEBPACK_IMPORTED_MODULE_0__["default"].username) {
    renderMessagesList();
    renderUsersList();
  }
  setTimeout(pollChanges, 5000); // Poll every 5 seconds
}
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map