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

var VitParam;

(function (VitParam) {
  VitParam["SOURCE"] = "vit_source";
  VitParam["MEDIUM"] = "vit_medium";
  VitParam["CAMPAIGN"] = "vit_campaign";
  VitParam["TERM"] = "vit_term";
  VitParam["CONTENT"] = "vit_content";
  VitParam["DEST"] = "vit_dest";
})(VitParam || (VitParam = {}));

var AnalyticsHandler = /*#__PURE__*/function () {
  _createClass(AnalyticsHandler, [{
    key: "getVitParams",
    value: function getVitParams() {
      if (typeof window === 'undefined') {
        return {};
      }

      var urlSearchParams = new URLSearchParams(window.location.search);
      var source = urlSearchParams.get(VitParam.SOURCE);
      var medium = urlSearchParams.get(VitParam.MEDIUM);
      var campaign = urlSearchParams.get(VitParam.CAMPAIGN);
      var term = urlSearchParams.get(VitParam.TERM);
      var content = urlSearchParams.get(VitParam.CONTENT);
      var dest = urlSearchParams.get(VitParam.DEST);
      var vitParams = {};

      if (source) {
        vitParams[VitParam.SOURCE] = source;
      }

      if (medium) {
        vitParams[VitParam.MEDIUM] = medium;
      }

      if (campaign) {
        vitParams[VitParam.CAMPAIGN] = campaign;
      }

      if (term) {
        vitParams[VitParam.TERM] = term;
      }

      if (content) {
        vitParams[VitParam.CONTENT] = content;
      }

      if (dest) {
        vitParams[VitParam.DEST] = dest;
      }

      return vitParams;
    }
  }]);

  function AnalyticsHandler() {
    _classCallCheck(this, AnalyticsHandler);

    if (typeof window !== 'undefined') {
      this.retrieveRegisteredExperiments();
      this.setOptimizeData();
    }
  }

  _createClass(AnalyticsHandler, [{
    key: "track",
    value: function track$1(event, properties) {
      var vitParams = this.getVitParams();

      var fullProperties = _objectSpread2(_objectSpread2(_objectSpread2({}, properties), vitParams), {}, {
        experimentCombination: AnalyticsHandler.optimizeExperimentsString
      });

      track(event, fullProperties);
    }
  }, {
    key: "setAnonymousId",
    value: function setAnonymousId$1(anonymousId) {
      setAnonymousId(anonymousId);
    } // TODO: depricate this in favor of using registerExperiment directly.

  }, {
    key: "setExperiments",
    value: function setExperiments(experiments) {
      var _this = this;

      if (experiments) {
        experiments.forEach(function (experiment) {
          _this.registerExperiment(experiment);
        });
      }
    }
  }, {
    key: "setOptimizeData",
    value: function setOptimizeData() {
      AnalyticsHandler.optimizeExperimentsString = AnalyticsHandler.registeredExperiments.filter(function (experiment) {
        return experiment.optimizeId;
      }).map(function (experiment) {
        return "".concat(experiment.optimizeId, ".").concat(experiment.variant);
      }).join('!');
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
    key: "storeRegisteredExperiments",
    value: function storeRegisteredExperiments() {
      var registeredExperimentsString = JSON.stringify(AnalyticsHandler.registeredExperiments);
      localStorage.setItem(AnalyticsHandler.registeredExperimentsKey, registeredExperimentsString);
    }
  }, {
    key: "retrieveRegisteredExperiments",
    value: function retrieveRegisteredExperiments() {
      var registeredExperimentsString = localStorage.getItem(AnalyticsHandler.registeredExperimentsKey);

      if (!registeredExperimentsString) {
        return;
      }

      var registeredExperiments = JSON.parse(registeredExperimentsString);
      AnalyticsHandler.registeredExperiments = registeredExperiments;
    }
  }, {
    key: "registerExperiment",
    value: function registerExperiment(experiment) {
      var experimentIndex = AnalyticsHandler.registeredExperiments.findIndex(function (re) {
        return re.id === experiment.id;
      });

      if (experimentIndex !== -1) {
        AnalyticsHandler.registeredExperiments.splice(experimentIndex, 1);
      }

      var registeredExperiment = {
        id: experiment.id,
        variant: experiment.assignedVariant,
        optimizeId: experiment.optimizeId,
        time: new Date().toISOString()
      };
      AnalyticsHandler.registeredExperiments.push(registeredExperiment);
      this.storeRegisteredExperiments();
      this.setOptimizeData();
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
      var vitParams = this.getVitParams();

      var properties = _objectSpread2({
        category: category,
        experimentCombination: AnalyticsHandler.optimizeExperimentsString,
        name: name
      }, vitParams);

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

_defineProperty(AnalyticsHandler, "registeredExperimentsKey", 'registered_exp');

_defineProperty(AnalyticsHandler, "registeredExperiments", []);

_defineProperty(AnalyticsHandler, "optimizeExperimentsString", void 0);

export { AnalyticsHandler, AnalyticsSnippet };
