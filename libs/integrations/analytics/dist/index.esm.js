import React from 'react';

var AnalyticsSnippet = function AnalyticsSnippet(_ref) {
  var appName = _ref.appName,
      segmentWriteKey = _ref.segmentWriteKey;
  return /*#__PURE__*/React.createElement("script", {
    dangerouslySetInnerHTML: {
      __html: "\n      !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error(\"Segment snippet included twice.\");else{analytics.invoked=!0;analytics.methods=[\"trackSubmit\",\"trackClick\",\"trackLink\",\"trackForm\",\"pageview\",\"identify\",\"reset\",\"group\",\"track\",\"ready\",\"alias\",\"debug\",\"page\",\"once\",\"off\",\"on\"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement(\"script\");n.type=\"text/javascript\";n.async=!0;n.src=\"https://cdn.segment.com/analytics.js/v1/\"+t+\"/analytics.min.js\";var a=document.getElementsByTagName(\"script\")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION=\"4.1.0\";\n      analytics.load(\"".concat(segmentWriteKey, "\");\n      analytics.page(\"").concat(appName, "\");\n      }}();\n    ").trim()
    }
  });
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function onAnalyticsReady(callback) {
  try {
    window.analytics.ready(callback);
  } catch (_unused) {
    console.log('window.analytics is not defined');
  }
}
function setAnonymousId(anonymousId) {
  onAnalyticsReady(function () {
    window.analytics.user().anonymousId(anonymousId);
  });
}
function page(name, properties) {
  onAnalyticsReady(function () {
    window.analytics.page(name, properties);
  });
}
function track(event, properties) {
  onAnalyticsReady(function () {
    window.analytics.track(event, properties);
  });
}
function identify(traits, userId) {
  onAnalyticsReady(function () {
    if (userId) {
      window.analytics.identify(userId, traits);
    } else {
      window.analytics.identify(traits);
    }
  });
}

var AnalyticsHandler = /*#__PURE__*/function () {
  function AnalyticsHandler() {
    _classCallCheck(this, AnalyticsHandler);
  }

  _createClass(AnalyticsHandler, [{
    key: "track",
    value: function track$1(event, properties) {
      var propertiesWithExperimentCombination = _objectSpread2(_objectSpread2({}, properties), {}, {
        experimentCombination: AnalyticsHandler.optimizeExperimentsString
      });

      track(event, propertiesWithExperimentCombination);
    }
  }, {
    key: "setAnonymousId",
    value: function setAnonymousId$1(anonymousId) {
      setAnonymousId(anonymousId);
    }
  }, {
    key: "setExperiments",
    value: function setExperiments(experiments) {
      AnalyticsHandler.optimizeExperimentsString = experiments ? experiments.filter(function (experiment) {
        return experiment.optimizeId;
      }).map(function (experiment) {
        return "".concat(experiment.optimizeId, ".").concat(experiment.assignedVariant);
      }).join('!') : undefined;
      onAnalyticsReady(function () {
        try {
          if (typeof window.ga === 'undefined') {
            throw new Error('window.ga is undefined');
          }

          window.ga('set', 'exp', AnalyticsHandler.optimizeExperimentsString);
        } catch (e) {
          console.error(e);
        }
      });
    }
  }, {
    key: "createAdditionalTracker",
    value: function createAdditionalTracker(id, name) {
      onAnalyticsReady(function () {
        if (typeof window.ga === 'undefined') {
          throw new Error('window.ga is undefined');
        }

        window.ga('create', id, 'auto', {
          name: name
        });
        window.ga("".concat(name, ".send"), 'pageview');
        window.analytics.on('track', function (event, properties) {
          if (typeof window.ga === 'undefined') {
            throw new Error('window.ga is undefined');
          }

          var prop = properties;
          window.ga("".concat(name, ".send"), {
            hitType: 'event',
            eventCategory: prop.category || 'All',
            eventAction: event,
            eventLabel: prop.label || 'All'
          });
        });
      });
    }
  }, {
    key: "page",
    value: function page$1(name, category) {
      var properties = {
        category: category,
        experimentCombination: AnalyticsHandler.optimizeExperimentsString,
        name: name
      };
      page(name, properties);
    }
  }, {
    key: "identify",
    value: function identify$1(traits, userId) {
      identify(traits, userId);
    }
  }]);

  return AnalyticsHandler;
}();

_defineProperty(AnalyticsHandler, "optimizeExperimentsString", void 0);

export { AnalyticsHandler, AnalyticsSnippet };
