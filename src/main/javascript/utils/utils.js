try {
  /* This is in a try so older browsers do no show a script error (i.e. IE8) */
  if (!window.hasOwnProperty("CURRENT_VERSION_NUM")) {
    window.CURRENT_VERSION_NUM = "1.0.0.DEBUG";
  }
} catch(e) {}

var GOOGLE_ANALYTICS_ID = "UA-XXXXXX-1";

define(['jquery', 'modernizr'], function ( $, Modernizr) {
  // Avoid `console` errors in browsers that lack a console.
  if (!(window.console && console.log)) {
    (function () {
      var noop = function () {
      };
      var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
      var length = methods.length;
      var console = window.console = {};
      while (--length) {
        console[methods[length]] = noop;
      }
    }());
  }

  function Utils() {
  }

  Utils.trackEvent = function (category, action, label) {
    _gaq.push(['_trackEvent', category, action, label]);
  };
  Utils.getCurrentURL = function () {
    return window.location.href;
  };
  Utils.isSecure = function () {
    return (document.location.protocol === "https:");
  };

  /**
   * Parse parameter named 'paramName' from a given URL.
   */
  Utils.getParamFromURL = function (paramName) {
    paramName = paramName.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regexS = "[\\?&]" + paramName + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var currentURL = Utils.getCurrentURL();
    var results = regex.exec(currentURL);
    if (!results) {
      return "";
    }
    return results[1];
  };
  /**
   * This function parses all query string parameters into a single queriable object.
   * 
   * @example http://www.smartnotebook.com/?a=1&b=2&c=3
   * //will equal {a:1,b:2,c:3}
   * 
   */
  Utils.getAllParamsFromURL = function (url) {
    var params = {};
    url.replace(
    new RegExp("([^?=&]+)(=([^&]*))?", "g"),
      function($0, $1, $2, $3) { 
        if($3!==undefined){
          params[$1] = $3;
        } 
      }
    );
    return params;
  };
  Utils.logger = function (message) {
    console.log(message);
  };

  Utils.logProgress = function (filename, current, total) {
    if (window.DEBUG_WB_PLATFORM === 'true') {
      Utils.logger("loading " + filename + " : " + current + "/" + total);// onprogress callback
    }
  };
  
  /**
   * Converts an rgb style CSS color and returns the hex equivalent.
   * @param color
   * @return
   */
  Utils.colorToHex = function (color) {
    if (color.substr(0, 1) === '#') {
      return color;
    }
    var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);

    var r = parseInt(digits[2], 10).toString(16);
    var g = parseInt(digits[3], 10).toString(16);
    var b = parseInt(digits[4], 10).toString(16);

    r = r.length === 1 ? "0" + r : r;
    g = g.length === 1 ? "0" + g : g;
    b = b.length === 1 ? "0" + b : b;

    return ("#" + r + g + b).toUpperCase();
  };

  Utils.REQUIRED_WEB_FEATURES = ['inlinesvg', 'csstransforms', 'canvas', 'webworkers'];
  Utils.OPTIONAL_WEB_FEATURES = ['generatedcontent', 'fontface', 'cssanimations', 'csstransitions', 'audio', 'filereader'];

  /**
   * Checks a list of features to see if they are available in the current Browser
   * @param features and array of features to check for
   */
  Utils.checkForFeatureAvailability = function (features) {
    var i;
    for (i = 0; i < features.length; ++i) {
      var value = features[i];
      if (!Modernizr[value]) {
        return false;
      }
    }
    return true;
  };

  /**
   * Checks if a client is fully supported
   * @param userAgent The browsers user agent string
   * @return {Boolean} True if the client is completely supported, false otherwise.
   */
  Utils.isClientSupported = function(userAgent) {
    if(typeof userAgent !== 'string') {
      return false;
    }

    var value = userAgent.toLowerCase();

    var isMobile = this.isMobile();
    var isChromeOrSafari = value.match(/chrome|safari/) !== null;

    if(isMobile) {
      // Currently not officially supporting iOS or Android
      return false;
    }

    if(!this.checkForFeatureAvailability(Utils.REQUIRED_WEB_FEATURES)) {
      return false;
    }

    if(!this.checkForFeatureAvailability(Utils.OPTIONAL_WEB_FEATURES)) {
      return false;
    }

    if(isChromeOrSafari) {
      return true;
    }

    return false;
  };
  /**
   * Checks if the browser name appears in the userAgent string
   * @param browserName
   */
  Utils.isBrowser = function(browserName){
    if(navigator.userAgent.toLowerCase().indexOf(browserName.toLowerCase())>=0){
      return true;
    }
    return false;
  };

  /**
   * Checks if the browser is running iOS
   * @return {Boolean} True if the client is running iOS, false otherwise.
   */
  Utils.isIOS = function(){
    var value = navigator.userAgent.toLowerCase();
    var isIOS = value.match(/iphone|ipod|ipad/) !== null;

    return isIOS;
  };

  /**
   * Checks if the browser is a mobile device
   * @return {Boolean} True if the client is a mobile, false otherwise.
   */
  Utils.isMobile = function(){
    var value = navigator.userAgent.toLowerCase();
    var isMobile = value.match(/iphone|ipod|ipad|blackberry|android/) !== null;

    return isMobile;
  };
  /**
   * returns if the web browser is currently oriented in portrait or landscape mode
   * @return {String} either landscape or portrait
   */
  Utils.getOrientation = function(){
    var theOrientation = 'landscape';
    if(window.hasOwnProperty("orientation")){
      if ( window.orientation === 0 || window.orientation ===180 ) {
        theOrientation = "portrait";
      }
    }
    return theOrientation;
  };
  
  /**
   * Returns a current stacktrace with the Error portion of the string removed.
   * @return {String}
   */
  Utils.stackTrace = function() {
    var toReturn = "";
    if(!window.hasOwnProperty("Error")){
      return toReturn;
    }
    var error = new Error();
    var stack = error.stack;
    
    if(stack) {
      toReturn = stack.replace('Error', '');
    }
    return toReturn;
  };
 

  return Utils;
});


