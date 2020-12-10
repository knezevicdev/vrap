'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsBase64 = require('js-base64');

(function (Filters) {
  Filters["BODY_TYPES"] = "bodytypes";
  Filters["CAB_TYPE"] = "cabtype";
  Filters["COLORS"] = "colors";
  Filters["DRIVE_TYPE"] = "drivetype";
  Filters["MAKE_AND_MODELS"] = "makesandmodels";
  Filters["MILES"] = "miles";
  Filters["PAGE"] = "page";
  Filters["PRICE"] = "price";
  Filters["SEARCH"] = "search";
  Filters["SORT"] = "sort";
  Filters["TEST_DRIVE"] = "testdrive";
  Filters["TRANSMISSION"] = "transmission";
  Filters["YEAR"] = "year";
  Filters["CYLINDERS"] = "cylinders";
  Filters["OTHER_CYLINDERS"] = "othercylinders";
  Filters["FUEL_TYPE"] = "fueltype";
  Filters["POPULAR_FEATURES"] = "optionalfeatures";
  Filters["FUEL_EFFICIENCY"] = "combinedmpg";
})(exports.Filters || (exports.Filters = {}));

(function (BodyType) {
  BodyType["CONVERTIBLE"] = "convertible";
  BodyType["COUPE"] = "coupe";
  BodyType["HATCHBACK"] = "hatchback";
  BodyType["MINIVAN"] = "minivan";
  BodyType["SEDAN"] = "sedan";
  BodyType["SUV"] = "suv";
  BodyType["TRUCK"] = "truck";
  BodyType["WAGON"] = "wagon";
})(exports.BodyType || (exports.BodyType = {}));

(function (CabType) {
  CabType["CREW"] = "crew";
  CabType["REGULAR"] = "regular";
  CabType["EXTENDED"] = "extended";
})(exports.CabType || (exports.CabType = {}));

(function (Color) {
  Color["BLACK"] = "black";
  Color["BLUE"] = "blue";
  Color["BROWN"] = "brown";
  Color["GOLD"] = "gold";
  Color["GREEN"] = "green";
  Color["GREY"] = "grey";
  Color["ORANGE"] = "orange";
  Color["PURPLE"] = "purple";
  Color["RED"] = "red";
  Color["SILVER"] = "silver";
  Color["WHITE"] = "white";
  Color["YELLOW"] = "yellow";
})(exports.Color || (exports.Color = {}));

(function (DriveType) {
  DriveType["FOUR_BY_FOUR"] = "4x4";
  DriveType["AWD"] = "awd";
  DriveType["FWD"] = "fwd";
  DriveType["RWD"] = "rwd";
})(exports.DriveType || (exports.DriveType = {}));

(function (SortBy) {
  SortBy["MILES"] = "miles";
  SortBy["PRICE"] = "price";
  SortBy["YEAR"] = "year";
})(exports.SortBy || (exports.SortBy = {}));

(function (SortDirection) {
  SortDirection["ASCENDING"] = "asc";
  SortDirection["DESCENDING"] = "desc";
})(exports.SortDirection || (exports.SortDirection = {}));

(function (TestDrive) {
  TestDrive["AVAILABLE"] = "available";
})(exports.TestDrive || (exports.TestDrive = {}));

(function (Transmission) {
  Transmission["AUTO"] = "auto";
  Transmission["MANUAL"] = "manual";
})(exports.Transmission || (exports.Transmission = {}));

(function (Cylinder) {
  Cylinder["FOUR"] = "4";
  Cylinder["SIX"] = "6";
  Cylinder["EIGHT"] = "8";
})(exports.Cylinder || (exports.Cylinder = {}));

(function (FuelType) {
  FuelType["GASOLINE"] = "gasoline";
  FuelType["ELECTRIC"] = "electric";
  FuelType["PLUG_IN_HYBRID"] = "pluginhybrid";
  FuelType["GAS_ELECTRIC_HYBRID"] = "gaselectrichybrid";
  FuelType["DIESEL"] = "diesel";
  FuelType["OTHER"] = "other";
})(exports.FuelType || (exports.FuelType = {}));

(function (PopularFeatures) {
  PopularFeatures["ANDROID_AUTO"] = "Android Auto";
  PopularFeatures["APPLE_CAR_PLAY"] = "Apple CarPlay";
  PopularFeatures["HEATED_SEATS"] = "Heated Seats";
  PopularFeatures["REAR_VIEW_CAMERA"] = "Rear View Camera";
  PopularFeatures["REMOTE_START"] = "Remote Start";
  PopularFeatures["SUNROOF_MOONROOF"] = "Sunroof or Moonroof";
  PopularFeatures["THIRD_ROW_SEATING"] = "Third Row Seating";
})(exports.PopularFeatures || (exports.PopularFeatures = {}));

var deepCopyFiltersData = function deepCopyFiltersData(filtersData) {
  return JSON.parse(JSON.stringify(filtersData));
};
var resetFilter = function resetFilter(filter, filtersData) {
  var newFiltersData = deepCopyFiltersData(filtersData || {});
  newFiltersData[filter] = undefined;
  return newFiltersData;
};
var resetFilters = function resetFilters(filters, filtersData) {
  var newFiltersData = deepCopyFiltersData(filtersData || {});
  filters.forEach(function (filter) {
    newFiltersData[filter] = undefined;
  });
  return newFiltersData;
};
var removeTruckSubfilters = function removeTruckSubfilters(filtersData) {
  var newFiltersData = deepCopyFiltersData(filtersData || {});
  newFiltersData[exports.Filters.CAB_TYPE] = undefined;
  return newFiltersData;
};
var addBodyType = function addBodyType(bodyType, filtersData) {
  var newFiltersData = deepCopyFiltersData(filtersData || {});
  var newBodyTypes = newFiltersData[exports.Filters.BODY_TYPES] || [];
  newBodyTypes.push(bodyType);
  newFiltersData[exports.Filters.BODY_TYPES] = newBodyTypes;
  return newFiltersData;
};
var removeBodyType = function removeBodyType(bodyType, filtersData) {
  // CabType only applies to truck, remove all truck sub filters when deselected
  if (bodyType === exports.BodyType.TRUCK) {
    filtersData = removeTruckSubfilters(filtersData);
  }

  var newFiltersData = deepCopyFiltersData(filtersData || {});
  var existingBodyTypes = newFiltersData[exports.Filters.BODY_TYPES] || [];
  var newBodyTypes = existingBodyTypes.filter(function (bt) {
    return bt !== bodyType;
  });
  newFiltersData[exports.Filters.BODY_TYPES] = newBodyTypes.length > 0 ? newBodyTypes : undefined;
  return newFiltersData;
};
var addCabType = function addCabType(cabType, filtersData) {
  var newFiltersData = deepCopyFiltersData(filtersData || {});
  var newCabType = newFiltersData[exports.Filters.CAB_TYPE] || [];
  newCabType.push(cabType);
  newFiltersData[exports.Filters.CAB_TYPE] = newCabType;
  return newFiltersData;
};
var removeCabType = function removeCabType(cabType, filtersData) {
  var newFiltersData = deepCopyFiltersData(filtersData || {});
  var existingCabType = newFiltersData[exports.Filters.CAB_TYPE] || [];
  var newCabType = existingCabType.filter(function (c) {
    return c !== cabType;
  });
  newFiltersData[exports.Filters.CAB_TYPE] = newCabType.length > 0 ? newCabType : undefined;
  return newFiltersData;
};
var addFuelType = function addFuelType(fuelType, filtersData) {
  var newFiltersData = deepCopyFiltersData(filtersData || {});
  var newFuelType = newFiltersData[exports.Filters.FUEL_TYPE] || [];
  newFuelType.push(fuelType);
  newFiltersData[exports.Filters.FUEL_TYPE] = newFuelType;
  return newFiltersData;
};
var removeFuelType = function removeFuelType(fuelType, filtersData) {
  var newFiltersData = deepCopyFiltersData(filtersData || {});
  var existingFuelType = newFiltersData[exports.Filters.FUEL_TYPE] || [];
  var newFuelType = existingFuelType.filter(function (c) {
    return c !== fuelType;
  });
  newFiltersData[exports.Filters.FUEL_TYPE] = newFuelType.length > 0 ? newFuelType : undefined;
  return newFiltersData;
};
var addCylinder = function addCylinder(cylinder, filtersData) {
  var newFiltersData = deepCopyFiltersData(filtersData || {});
  var newCylinders = newFiltersData[exports.Filters.CYLINDERS] || [];
  newCylinders.push(cylinder);
  newFiltersData[exports.Filters.CYLINDERS] = newCylinders;
  return newFiltersData;
};
var removeCylinder = function removeCylinder(cylinder, filtersData) {
  var newFiltersData = deepCopyFiltersData(filtersData || {});
  var existingCylinders = newFiltersData[exports.Filters.CYLINDERS] || [];
  var newCylinders = existingCylinders.filter(function (c) {
    return c !== cylinder;
  });
  newFiltersData[exports.Filters.CYLINDERS] = newCylinders.length > 0 ? newCylinders : undefined;
  return newFiltersData;
};
var setOtherCylinders = function setOtherCylinders(otherCylinders, filtersData) {
  var newFiltersData = deepCopyFiltersData(filtersData || {});
  newFiltersData[exports.Filters.OTHER_CYLINDERS] = otherCylinders;
  return newFiltersData;
};
var addColor = function addColor(color, filtersData) {
  var newFiltersData = deepCopyFiltersData(filtersData || {});
  var newColors = newFiltersData[exports.Filters.COLORS] || [];
  newColors.push(color);
  newFiltersData[exports.Filters.COLORS] = newColors;
  return newFiltersData;
};
var removeColor = function removeColor(color, filtersData) {
  var newFiltersData = deepCopyFiltersData(filtersData || {});
  var existingColors = newFiltersData[exports.Filters.COLORS] || [];
  var newColors = existingColors.filter(function (c) {
    return c !== color;
  });
  newFiltersData[exports.Filters.COLORS] = newColors.length > 0 ? newColors : undefined;
  return newFiltersData;
};
var addDriveType = function addDriveType(driveType, filtersData) {
  var newFiltersData = deepCopyFiltersData(filtersData || {});
  var newDriveTypes = newFiltersData[exports.Filters.DRIVE_TYPE] || [];
  newDriveTypes.push(driveType);
  newFiltersData[exports.Filters.DRIVE_TYPE] = newDriveTypes;
  return newFiltersData;
};
var removeDriveType = function removeDriveType(driveType, filtersData) {
  var newFiltersData = deepCopyFiltersData(filtersData || {});
  var existingDriveTypes = newFiltersData[exports.Filters.DRIVE_TYPE] || [];
  var newDriveTypes = existingDriveTypes.filter(function (dt) {
    return dt !== driveType;
  });
  newFiltersData[exports.Filters.DRIVE_TYPE] = newDriveTypes.length > 0 ? newDriveTypes : undefined;
  return newFiltersData;
};
var addPopularFeature = function addPopularFeature(popularFeature, filtersData) {
  var newFiltersData = deepCopyFiltersData(filtersData || {});
  var newFeatures = newFiltersData[exports.Filters.POPULAR_FEATURES] || [];
  newFeatures.push(popularFeature);
  newFiltersData[exports.Filters.POPULAR_FEATURES] = newFeatures;
  return newFiltersData;
};
var removePopularFeature = function removePopularFeature(popularFeature, filtersData) {
  var newFiltersData = deepCopyFiltersData(filtersData || {});
  var existingFeatures = newFiltersData[exports.Filters.POPULAR_FEATURES] || [];
  var newFeatures = existingFeatures.filter(function (f) {
    return f !== popularFeature;
  });
  newFiltersData[exports.Filters.POPULAR_FEATURES] = newFeatures.length > 0 ? newFeatures : undefined;
  return newFiltersData;
};
var setTestDrive = function setTestDrive(testDrive, filtersData) {
  var newFiltersData = deepCopyFiltersData(filtersData || {});
  newFiltersData[exports.Filters.TEST_DRIVE] = testDrive;
  return newFiltersData;
};
var setTransmission = function setTransmission(transmission, filtersData) {
  var newFiltersData = deepCopyFiltersData(filtersData || {});
  newFiltersData[exports.Filters.TRANSMISSION] = transmission;
  return newFiltersData;
};
var addAllModels = function addAllModels(makeSlug, filtersData) {
  var newFiltersData = deepCopyFiltersData(filtersData || {});
  var existingMakeAndModels = newFiltersData[exports.Filters.MAKE_AND_MODELS] || [];
  var newMakeAndModels = existingMakeAndModels.filter(function (m) {
    return m.makeSlug !== makeSlug;
  });
  newMakeAndModels.push({
    makeSlug: makeSlug
  });
  newFiltersData[exports.Filters.MAKE_AND_MODELS] = newMakeAndModels.length > 0 ? newMakeAndModels : undefined;
  return newFiltersData;
};
var removeAllModels = function removeAllModels(makeSlug, filtersData) {
  var newFiltersData = deepCopyFiltersData(filtersData || {});
  var existingMakeAndModels = newFiltersData[exports.Filters.MAKE_AND_MODELS] || [];
  var newMakeAndModels = existingMakeAndModels.filter(function (m) {
    return m.makeSlug !== makeSlug;
  });
  newFiltersData[exports.Filters.MAKE_AND_MODELS] = newMakeAndModels.length > 0 ? newMakeAndModels : undefined;
  return newFiltersData;
};
var addModel = function addModel(makeSlug, modelSlug, filtersData) {
  var newFiltersData = deepCopyFiltersData(filtersData || {});
  var existingMakeAndModels = newFiltersData[exports.Filters.MAKE_AND_MODELS] || [];
  var existingMake = existingMakeAndModels.find(function (m) {
    return m.makeSlug === makeSlug;
  }) || {
    makeSlug: makeSlug
  };
  var existingModels = existingMake.modelSlugs || [];
  var newModels = existingModels.includes(modelSlug) ? existingModels : existingModels.concat([modelSlug]);
  var newMake = {
    makeSlug: makeSlug,
    modelSlugs: newModels
  };
  var newMakeAndModels = existingMakeAndModels.filter(function (m) {
    return m.makeSlug !== makeSlug;
  });
  newMakeAndModels.push(newMake);
  newFiltersData[exports.Filters.MAKE_AND_MODELS] = newMakeAndModels.length > 0 ? newMakeAndModels : undefined;
  return newFiltersData;
};
var removeModel = function removeModel(makeSlug, modelSlug, filtersData) {
  var newFiltersData = deepCopyFiltersData(filtersData || {});
  var existingMakeAndModels = newFiltersData[exports.Filters.MAKE_AND_MODELS] || [];
  var existingMake = existingMakeAndModels.find(function (m) {
    return m.makeSlug === makeSlug;
  }) || {
    makeSlug: makeSlug
  };
  var existingModels = existingMake.modelSlugs || [];
  var newModels = existingModels.includes(modelSlug) ? existingModels.filter(function (m) {
    return m !== modelSlug;
  }) : existingModels;
  var newMake = newModels.length > 0 ? {
    makeSlug: makeSlug,
    modelSlugs: newModels
  } : undefined;
  var newMakeAndModels = existingMakeAndModels.filter(function (m) {
    return m.makeSlug !== makeSlug;
  });
  !!newMake && newMakeAndModels.push(newMake);
  newFiltersData[exports.Filters.MAKE_AND_MODELS] = newMakeAndModels.length > 0 ? newMakeAndModels : undefined;
  return newFiltersData;
};
var setMiles = function setMiles(miles, filtersData) {
  var newFiltersData = deepCopyFiltersData(filtersData || {});
  newFiltersData[exports.Filters.MILES] = miles;
  return newFiltersData;
};
var setFuelEfficiency = function setFuelEfficiency(fuelEfficiency, filtersData) {
  var newFiltersData = deepCopyFiltersData(filtersData || {});
  newFiltersData[exports.Filters.FUEL_EFFICIENCY] = fuelEfficiency;
  return newFiltersData;
};
var setPage = function setPage(page, filtersData) {
  var newFiltersData = deepCopyFiltersData(filtersData || {});
  newFiltersData[exports.Filters.PAGE] = page;
  return newFiltersData;
};
var setPrice = function setPrice(price, filtersData) {
  var newFiltersData = deepCopyFiltersData(filtersData || {});
  newFiltersData[exports.Filters.PRICE] = price;
  return newFiltersData;
};
var setSearch = function setSearch(search, filtersData) {
  var newFiltersData = deepCopyFiltersData(filtersData || {});
  newFiltersData[exports.Filters.SEARCH] = search;
  return newFiltersData;
};
var setSort = function setSort(by, direction, filtersData) {
  var newFiltersData = deepCopyFiltersData(filtersData || {});
  newFiltersData[exports.Filters.SORT] = {
    by: by,
    direction: direction
  };
  return newFiltersData;
};
var setYear = function setYear(year, filtersData) {
  var newFiltersData = deepCopyFiltersData(filtersData || {});
  newFiltersData[exports.Filters.YEAR] = year;
  return newFiltersData;
};

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
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

var isEnum = function isEnum(e) {
  return function (token) {
    return Object.values(e).includes(token);
  };
}; // eslint-disable-next-line @typescript-eslint/no-explicit-any

var isEnumArray = function isEnumArray(e) {
  return function (token) {
    if (!(token instanceof Array)) {
      return false;
    }

    var isT = isEnum(e);

    for (var i = 0; i < token.length; i++) {
      if (!isT(token[i])) {
        return false;
      }
    }

    return true;
  };
}; // eslint-disable-next-line @typescript-eslint/no-explicit-any

var isNumber = function isNumber(x) {
  return typeof x === 'number' && !isNaN(x);
}; // eslint-disable-next-line @typescript-eslint/no-explicit-any

var isString = function isString(x) {
  return typeof x === 'string';
}; // eslint-disable-next-line @typescript-eslint/no-explicit-any

var isBoolean = function isBoolean(x) {
  return typeof x === 'boolean';
}; // eslint-disable-next-line @typescript-eslint/no-explicit-any

var isStringArray = function isStringArray(x) {
  if (!(x instanceof Array)) {
    return false;
  }

  for (var i = 0; i < x.length; i++) {
    if (typeof x[i] !== 'string') {
      return false;
    }
  }

  return true;
}; // eslint-disable-next-line @typescript-eslint/no-explicit-any

var isObject = function isObject(x) {
  return _typeof(x) === 'object' && x !== null;
}; // eslint-disable-next-line @typescript-eslint/no-explicit-any

var isMake = function isMake(x) {
  if (!isObject(x)) {
    return false;
  }

  if (typeof x['makeSlug'] !== 'string') {
    return false;
  }

  if (typeof x['modelSlugs'] !== 'undefined') {
    if (!isStringArray(x['modelSlugs'])) {
      return false;
    }
  }

  return true;
}; // eslint-disable-next-line @typescript-eslint/no-explicit-any

var isMakeAndModels = function isMakeAndModels(x) {
  if (!(x instanceof Array)) {
    return false;
  }

  for (var i = 0; i < x.length; i++) {
    if (!isMake(x[i])) {
      return false;
    }
  }

  return true;
}; // eslint-disable-next-line @typescript-eslint/no-explicit-any

var isMaxAndMin = function isMaxAndMin(x) {
  if (!isObject(x)) {
    return false;
  }

  if (!isNumber(x['max'])) {
    return false;
  }

  if (!isNumber(x['min'])) {
    return false;
  }

  return true;
}; // eslint-disable-next-line @typescript-eslint/no-explicit-any

var isFuelEfficiency = function isFuelEfficiency(x) {
  if (!isObject(x)) {
    return false;
  }

  if (!isNumber(x['min'])) {
    return false;
  }

  return true;
};
var isSortBy = isEnum(exports.SortBy);
var isSortDirection = isEnum(exports.SortDirection); // eslint-disable-next-line @typescript-eslint/no-explicit-any

var isSort = function isSort(x) {
  if (!isObject(x)) {
    return false;
  }

  if (!isSortBy(x['by'])) {
    return false;
  }

  if (!isSortDirection(x['direction'])) {
    return false;
  }

  return true;
};

var filtersQueryParamKey = 'filters';
var paramsBasePath = '/cars';
var typesKey = 'types';
var allModelsKey = 'all';
var getYearParam = function getYearParam(year) {
  if (year.min === year.max) {
    return "".concat(year.min);
  }

  return "".concat(year.min, "-").concat(year.max);
};
var getParams = function getParams(filtersData) {
  if (!filtersData) {
    return '/';
  }

  var filtersDataMakeAndModels = filtersData[exports.Filters.MAKE_AND_MODELS];
  var makeAndModels = filtersDataMakeAndModels && filtersDataMakeAndModels[0];
  var makeSlug = makeAndModels && makeAndModels.makeSlug;
  var modelSlugs = makeAndModels && makeAndModels.modelSlugs;
  var modelSlug = modelSlugs && modelSlugs[0];
  var year = filtersData[exports.Filters.YEAR];
  var filtersDataBodyTypes = filtersData[exports.Filters.BODY_TYPES];
  var bodyType = filtersDataBodyTypes && filtersDataBodyTypes[0];

  if (makeSlug && year) {
    if (modelSlug) {
      return "/".concat(makeSlug, "/").concat(modelSlug, "/").concat(getYearParam(year));
    }

    return "/".concat(makeSlug, "/").concat(allModelsKey, "/").concat(getYearParam(year));
  }

  if (makeSlug && modelSlug) {
    return "/".concat(makeSlug, "/").concat(modelSlug);
  }

  if (makeSlug && bodyType) {
    return "/".concat(typesKey, "/").concat(bodyType, "/").concat(makeSlug);
  }

  if (makeSlug) {
    return "/".concat(makeSlug);
  }

  if (bodyType) {
    return "/".concat(typesKey, "/").concat(bodyType);
  }

  return '/';
};
var getQuery = function getQuery(filtersData) {
  if (!filtersData) {
    return '';
  }

  var jsonFiltersData = JSON.stringify(filtersData);

  if (jsonFiltersData === '{}') {
    return '';
  }

  var encodedFiltersData = jsBase64.Base64.encode(jsonFiltersData);
  return "?".concat(filtersQueryParamKey, "=").concat(encodedFiltersData);
};

var getTitleQuery = function getTitleQuery(filtersData, titleQuery) {
  if (!titleQuery) return '';
  var query = "isTitleQAPass=".concat(titleQuery);

  if (!filtersData || JSON.stringify(filtersData) === '{}') {
    return "?".concat(query);
  }

  return "&".concat(query);
};

var getUrlFromFiltersData = function getUrlFromFiltersData(filtersData, options) {
  var addFiltersQueryParam = options && options.addFiltersQueryParam;
  var query = addFiltersQueryParam ? getQuery(filtersData) : '';
  var ignoreParamsBasePath = options && options.ignoreParamsBasePath;
  var actualParamsBasePath = ignoreParamsBasePath ? '' : paramsBasePath;
  var titleQuery = getTitleQuery(filtersData, options === null || options === void 0 ? void 0 : options.titleQuery);
  var url = "".concat(actualParamsBasePath).concat(getParams(filtersData)).concat(query).concat(titleQuery);
  return url;
};
var getFiltersDataFromFiltersQueryParam = function getFiltersDataFromFiltersQueryParam(filtersQueryParam) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var parsed;

  try {
    var decoded = jsBase64.Base64.decode(filtersQueryParam);
    parsed = JSON.parse(decoded);
  } catch (_unused) {
    return undefined;
  }

  if (!isObject(parsed)) {
    return undefined;
  }

  var filtersData = {};
  var isBodyTypeArray = isEnumArray(exports.BodyType);

  if (isBodyTypeArray(parsed[exports.Filters.BODY_TYPES])) {
    filtersData[exports.Filters.BODY_TYPES] = parsed[exports.Filters.BODY_TYPES];
  }

  var isColorArray = isEnumArray(exports.Color);

  if (isColorArray(parsed[exports.Filters.COLORS])) {
    filtersData[exports.Filters.COLORS] = parsed[exports.Filters.COLORS];
  }

  var isDriveTypeArray = isEnumArray(exports.DriveType);

  if (isDriveTypeArray(parsed[exports.Filters.DRIVE_TYPE])) {
    filtersData[exports.Filters.DRIVE_TYPE] = parsed[exports.Filters.DRIVE_TYPE];
  }

  var isCabTypeArray = isEnumArray(exports.CabType);

  if (isCabTypeArray(parsed[exports.Filters.CAB_TYPE])) {
    filtersData[exports.Filters.CAB_TYPE] = parsed[exports.Filters.CAB_TYPE];
  }

  var isCylinderArray = isEnumArray(exports.Cylinder);

  if (isCylinderArray(parsed[exports.Filters.CYLINDERS])) {
    filtersData[exports.Filters.CYLINDERS] = parsed[exports.Filters.CYLINDERS];
  }

  var isFeaturesArray = isEnumArray(exports.PopularFeatures);

  if (isFeaturesArray(parsed[exports.Filters.POPULAR_FEATURES])) {
    filtersData[exports.Filters.POPULAR_FEATURES] = parsed[exports.Filters.POPULAR_FEATURES];
  }

  var isFuelTypeArray = isEnumArray(exports.FuelType);

  if (isFuelTypeArray(parsed[exports.Filters.FUEL_TYPE])) {
    filtersData[exports.Filters.FUEL_TYPE] = parsed[exports.Filters.FUEL_TYPE];
  }

  if (isBoolean(parsed[exports.Filters.OTHER_CYLINDERS])) {
    filtersData[exports.Filters.OTHER_CYLINDERS] = parsed[exports.Filters.OTHER_CYLINDERS];
  }

  if (isMakeAndModels(parsed[exports.Filters.MAKE_AND_MODELS])) {
    filtersData[exports.Filters.MAKE_AND_MODELS] = parsed[exports.Filters.MAKE_AND_MODELS];
  }

  if (isMaxAndMin(parsed[exports.Filters.MILES])) {
    filtersData[exports.Filters.MILES] = parsed[exports.Filters.MILES];
  }

  if (isFuelEfficiency(parsed[exports.Filters.FUEL_EFFICIENCY])) {
    filtersData[exports.Filters.FUEL_EFFICIENCY] = parsed[exports.Filters.FUEL_EFFICIENCY];
  }

  if (isNumber(parsed[exports.Filters.PAGE])) {
    filtersData[exports.Filters.PAGE] = parsed[exports.Filters.PAGE];
  }

  if (isMaxAndMin(parsed[exports.Filters.PRICE])) {
    filtersData[exports.Filters.PRICE] = parsed[exports.Filters.PRICE];
  }

  if (isString(parsed[exports.Filters.SEARCH])) {
    filtersData[exports.Filters.SEARCH] = parsed[exports.Filters.SEARCH];
  }

  if (isSort(parsed[exports.Filters.SORT])) {
    filtersData[exports.Filters.SORT] = parsed[exports.Filters.SORT];
  }

  var isTestDrive = isEnum(exports.TestDrive);

  if (isTestDrive(parsed[exports.Filters.TEST_DRIVE])) {
    filtersData[exports.Filters.TEST_DRIVE] = parsed[exports.Filters.TEST_DRIVE];
  }

  var isTransmission = isEnum(exports.Transmission);

  if (isTransmission(parsed[exports.Filters.TRANSMISSION])) {
    filtersData[exports.Filters.TRANSMISSION] = parsed[exports.Filters.TRANSMISSION];
  }

  if (isMaxAndMin(parsed[exports.Filters.YEAR])) {
    filtersData[exports.Filters.YEAR] = parsed[exports.Filters.YEAR];
  }

  return filtersData;
};
var getFiltersDataFromTypesTokens = function getFiltersDataFromTypesTokens(tokens) {
  var _ref;

  var isBodyType = isEnum(exports.BodyType);
  var bodyTypeToken = tokens[1];
  var bodyType = isBodyType(bodyTypeToken) ? bodyTypeToken : undefined;
  var makeSlug = tokens[2];

  if (!bodyType && !makeSlug) {
    return undefined;
  }

  return _ref = {}, _defineProperty(_ref, exports.Filters.BODY_TYPES, bodyType ? [bodyType] : undefined), _defineProperty(_ref, exports.Filters.MAKE_AND_MODELS, makeSlug ? [{
    makeSlug: makeSlug
  }] : undefined), _ref;
};
var getFiltersDataFromMmyTokens = function getFiltersDataFromMmyTokens(tokens) {
  if (tokens.length === 1) {
    return _defineProperty({}, exports.Filters.MAKE_AND_MODELS, [{
      makeSlug: tokens[0]
    }]);
  }

  if (tokens.length === 2) {
    return _defineProperty({}, exports.Filters.MAKE_AND_MODELS, [{
      makeSlug: tokens[0],
      modelSlugs: tokens[1] !== allModelsKey ? [tokens[1]] : undefined
    }]);
  }

  if (tokens.length === 3) {
    var _ref4;

    var yearTokens = tokens[2].split('-').map(function (item) {
      return parseInt(item);
    }).filter(function (item) {
      return isNumber(item);
    });
    var year;

    if (yearTokens.length === 1) {
      year = {
        max: yearTokens[0],
        min: yearTokens[0]
      };
    } else if (yearTokens.length === 2) {
      year = {
        max: yearTokens[1],
        min: yearTokens[0]
      };
    }

    return _ref4 = {}, _defineProperty(_ref4, exports.Filters.MAKE_AND_MODELS, [{
      makeSlug: tokens[0],
      modelSlugs: tokens[1] !== allModelsKey ? [tokens[1]] : undefined
    }]), _defineProperty(_ref4, exports.Filters.YEAR, year), _ref4;
  }

  return undefined;
};
var getFiltersDataFromParams = function getFiltersDataFromParams(params) {
  var tokens = params.split('/').filter(function (item) {
    return !!item;
  });

  if (tokens.length === 0) {
    return undefined;
  }

  if (tokens[0] === typesKey) {
    return getFiltersDataFromTypesTokens(tokens);
  }

  return getFiltersDataFromMmyTokens(tokens);
};
var getFiltersDataFromUrl = function getFiltersDataFromUrl(url) {
  var questionMarkIndex = url.indexOf('?');
  var queryString = questionMarkIndex !== -1 ? url.substring(questionMarkIndex) : undefined;
  var query = new URLSearchParams(queryString);
  var filtersQueryParam = query.get(filtersQueryParamKey);

  if (filtersQueryParam) {
    return getFiltersDataFromFiltersQueryParam(filtersQueryParam);
  }

  var paramsBasePathIndex = url.indexOf(paramsBasePath);
  var paramsStartIndex = paramsBasePathIndex !== -1 ? paramsBasePathIndex + paramsBasePath.length : 0;
  var paramsEndIndex = questionMarkIndex !== -1 ? questionMarkIndex : undefined;
  var params = url.substring(paramsStartIndex, paramsEndIndex);

  if (params) {
    return getFiltersDataFromParams(params);
  }

  return undefined;
};

exports.addAllModels = addAllModels;
exports.addBodyType = addBodyType;
exports.addCabType = addCabType;
exports.addColor = addColor;
exports.addCylinder = addCylinder;
exports.addDriveType = addDriveType;
exports.addFuelType = addFuelType;
exports.addModel = addModel;
exports.addPopularFeature = addPopularFeature;
exports.getFiltersDataFromUrl = getFiltersDataFromUrl;
exports.getUrlFromFiltersData = getUrlFromFiltersData;
exports.removeAllModels = removeAllModels;
exports.removeBodyType = removeBodyType;
exports.removeCabType = removeCabType;
exports.removeColor = removeColor;
exports.removeCylinder = removeCylinder;
exports.removeDriveType = removeDriveType;
exports.removeFuelType = removeFuelType;
exports.removeModel = removeModel;
exports.removePopularFeature = removePopularFeature;
exports.resetFilter = resetFilter;
exports.resetFilters = resetFilters;
exports.setFuelEfficiency = setFuelEfficiency;
exports.setMiles = setMiles;
exports.setOtherCylinders = setOtherCylinders;
exports.setPage = setPage;
exports.setPrice = setPrice;
exports.setSearch = setSearch;
exports.setSort = setSort;
exports.setTestDrive = setTestDrive;
exports.setTransmission = setTransmission;
exports.setYear = setYear;
