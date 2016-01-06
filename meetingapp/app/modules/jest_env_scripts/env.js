/**
 *  This script will be executed in the testing environment 
 *  immediately before executing the test code itself.
 *  See package.json
 */

/* Fix : ReferenceError: localStorage is not defined (Caused by using Parse) */
const localStorageMock = (function() {
  let store = {};
  return {
    getItem: function(key) {
      return store[key];
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });
