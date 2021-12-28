import { parse } from 'qs';

import { MONTHS, WEEKDAYS } from '../../constants/misc';
import { PATHS } from '../../constants/routes';
import { BREAKPOINT_VALUES } from '../../constants/theme';
import { numbersOnlyString } from '../validation/formatting';

const jwtDecode = require('jwt-decode');

export function parseQueryString(search) {
  let query = search ? parse(search, { ignoreQueryPrefix: true }) : {};
  return query;
}

export const handleChange = (id, value, phoneNumberField, parentSelf) => {
  const errorFunction = parentSelf.applicantValidationFuncs[id];
  const error = errorFunction ? errorFunction(value) : null;
  parentSelf.setState({
    errors: {
      ...parentSelf.state.errors,
      [id]: error,
    },
  });
  const formattedPhoneNumber =
    id === phoneNumberField ? numbersOnlyString(value, 11) : value;
  parentSelf.props.updateField(id, formattedPhoneNumber);
};
export function toQueryString(/* Object */ obj) {
  if (obj == null) {
    return '';
  }

  const keys = Object.keys(obj).filter((key) => obj[key] != null);

  if (keys.length <= 0) {
    return '';
  }

  return (
    '?' +
    keys
      .map((key) => {
        if (key === 'bodyType') {
          return obj[key]
            .map((bodyType) => {
              return `${encodeURIComponent(key)}=${encodeURIComponent(
                bodyType
              )}`;
            })
            .join('&');
        }
        return `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`;
      })
      .join('&')
  );
}

// Used to maintain the UTM queries from page to page.
export function returnOnlyUtmQueries(query) {
  if (typeof query === 'string') {
    const newQuery = query
      .slice(1)
      .split('&')
      .filter((key) => key.substring(0, 'utm_'.length) === 'utm_')
      .join('&');
    return `?${newQuery}`;
  } else if (typeof query === 'object') {
    return Object.keys(query)
      .filter((key) => key.substring(0, 'utm_'.length) === 'utm_')
      .reduce((cur, next) => {
        cur[next] = query[next];
        return cur;
      }, {});
  }
}

// Only works for whole numbers (non-decimals)
export function addThousandsSeparator(/* Number or String */ number) {
  if (!isNaN(number)) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}

export function addThousandsSeparatorroundDecimals(/* Number */ number) {
  if (!isNaN(number)) {
    const numberWithDecimal = Number(number).toFixed(2).toLocaleString('en-US');
    return addThousandsSeparator(numberWithDecimal);
  }
}

export function limitChars(string, limit) {
  if (typeof string === 'string' && limit < string.length) {
    return string.slice(0, limit - 3) + '...';
  }
  return string;
}

export function lowerCase(string) {
  if (typeof string === 'string') {
    return string.toLowerCase();
  }
  return string;
}

export function isEmptyObject(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function formatKey(element, item) {
  const keyItem =
    item.charAt(0).toLowerCase() + item.slice(1).replace(/ /g, '');
  return `${element}_${keyItem}`;
}

export function removeTrailingSlash(pathname = '') {
  if (typeof pathname !== 'string') return;
  if (pathname === '/') return pathname;
  return pathname.replace(/\/+$/, '');
}

// eslint-disable-next-line no-useless-escape
export const getHttpFromHttps = (link = '') => link.replace(/(s)\:/, ':');
export const getNextInList = (current, startValue, list = []) => {
  const isStartValue = current === startValue;
  if (isStartValue && !list.length) return;
  const currentIndex = list.indexOf(current);
  const nextIndex = currentIndex + 1; // if not found because startValue, this will be zero
  if (nextIndex === list.length) return;
  return list[nextIndex];
};

export const kebabPhone = (phone) => {
  const replaced = phone.replace(/\D+/g, '');
  const matched = replaced.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (!matched) return '';
  return matched.slice(1, 4).join('-');
};

export function parseSalesForceDate(sfDate = '') {
  const year = Number(sfDate.slice(0, 4));
  const month = Number(sfDate.slice(4, 6));
  const day = Number(sfDate.slice(6, 8));
  const datetime = new Date(year, month - 1, day);
  const { label } = MONTHS.find((el) => el.value === month) || { label: '' };
  const weekday = datetime.toLocaleDateString('en-US', { weekday: 'long' });

  return {
    year,
    month: label,
    day,
    datetime,
    weekday,
  };
}

// 2020-04-30T00:00:00Z => April 30th, 2020
export function parseBackEndDate(beDate = '') {
  const splitDatetime = beDate.split(' ');
  const date = splitDatetime.shift();
  const parsedDate = new Date(date);
  const year = parsedDate.getUTCFullYear();
  const month = MONTHS[parsedDate.getUTCMonth()].label;
  const day = parsedDate.getUTCDate();
  const dateString = parsedDate.toLocaleDateString();
  const weekday = WEEKDAYS[parsedDate.getUTCDay()].label;

  return {
    year,
    month,
    day,
    datetime: parsedDate,
    weekday,
    dateString,
  };
}

// Jan 3rd - Jan 1st => 2
export function dateDiff(/* new Date() */ date1, /* new Date() */ date2) {
  const timeDiff = date1 - date2;
  const diff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  return diff;
}

export function scrollToRef(ref, config = {}) {
  const element = ref.current;
  if (!element) {
    return;
  }

  const { additionalOffsetTop = 0 } = config;

  const elementOffsetTop = element.offsetTop;
  const elementOffsetLeft = element.offsetLeft;

  const headerElement = document.getElementById('main-header');
  const headerHeight = headerElement ? headerElement.clientHeight : 0;

  const top = elementOffsetTop - additionalOffsetTop - headerHeight;
  const left = elementOffsetLeft;

  // scrollTo with options isn't always supported, so we provide a fallback.
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo#Browser_Compatibility
  const supportsNativeSmoothScroll =
    'scrollBehavior' in document.documentElement.style;
  if (supportsNativeSmoothScroll) {
    window.scrollTo({
      top,
      left,
      behavior: 'smooth',
    });
  } else {
    window.scrollTo(left, top);
  }
}
/*
  Given an ID of an element, it will scroll to that element less the height of the main header
*/
export const scrollToElement = (href) => (e) => {
  e.preventDefault();

  // eslint-disable-next-line no-useless-escape
  const id = href.replace(/^\#/, '');
  const el = document.getElementById(id);

  if (!el) return null;

  const { top: elTop, left } = el.getBoundingClientRect();
  const headerEl = document.getElementById('main-header');
  const headerHeight = headerEl ? headerEl.clientHeight : 0;
  const destination = elTop - headerHeight;

  const supportsNativeSmoothScroll =
    'scrollBehavior' in document.documentElement.style;
  if (supportsNativeSmoothScroll) {
    window.scrollTo({
      top: destination,
      left,
      behavior: 'smooth',
    });
  } else {
    window.scrollTo(left, destination);
  }
};

export function getHiResImageUrl(img) {
  const vroomImageURL = typeof img == 'string' && img.indexOf('vroomcdn') > -1;
  if (vroomImageURL) {
    const parts = img.split('/');
    parts.push(parts[parts.length - 1]);
    parts[parts.length - 2] = 'hr';
    return parts.join('/');
  } else {
    //Fyusion Image
    if (img !== undefined) {
      const fyusionImgURL = img.replace('/edit/', '/');
      return fyusionImgURL.split('?')[0];
    }
    return false;
  }
}

export function isMobile(windowWidth) {
  return windowWidth < BREAKPOINT_VALUES.sm;
}

export function isTablet(windowWidth) {
  return (
    BREAKPOINT_VALUES.sm <= windowWidth && windowWidth < BREAKPOINT_VALUES.md
  );
}

export function isDesktop(windowWidth) {
  return (
    BREAKPOINT_VALUES.md <= windowWidth && windowWidth < BREAKPOINT_VALUES.lg
  );
}

export function getDeviceType(windowWidth) {
  let deviceType = '';
  if (isMobile(windowWidth)) {
    deviceType = 'mobile';
  } else if (isTablet(windowWidth)) {
    deviceType = 'tablet';
  } else {
    deviceType = 'desktop';
  }
  return deviceType;
}

export function getCurrentYear() {
  return new Date().getFullYear();
}

export function getPhoneNumberLink(phoneNumber) {
  return `tel:1-${phoneNumber.split(' ').join('-')}`;
}

export function getCatalogParamPath(year, make, body) {
  let path = '';
  if (year == null) {
    return path;
  }
  path += `/${year}`;
  if (make == null) {
    return path;
  }
  path += `/${make}`;
  if (body == null) {
    return path;
  }
  path += `/${body}`;
  return path;
}

export function calculateEstimatedMonthlyPayment(listingPrice) {
  // This formula was provided by Jason Lea Jones.
  // I have no idea why these values are the values we need.
  // You can definitely improve this by digging into what each portion represents.
  return (
    ((listingPrice + 150 + 39.75 + listingPrice * 0.001677) * 1.0625) /
    ((1 - (1 + 0.0399 / 12) ** -72) / (0.0399 / 12))
  );
}

export function getResumeStep(nextStep) {
  // maps deal next step value to our routes
  switch (nextStep) {
    case 'TradeIn':
      return PATHS.checkoutTradeIn;
    case 'SelectTradeIn':
      return PATHS.selectTradeIn;
    case 'TradeInLoanInfo':
      return PATHS.tradeinAutoLoan;
    case 'RegistrationAddress':
      return PATHS.registrationAddress;
    case 'DeliveryAddress':
      return PATHS.deliveryAddressForm;
    case 'Financing':
      return PATHS.dealCredit;
    case 'PaymentType':
      return PATHS.paymentOptions;
    case 'DepositPaymentInfo':
      return PATHS.dealReview;
    case 'DealSummary':
      return PATHS.dealCongratulations;
    case 'FinancingOption':
      return PATHS.autofiScreen;
    // TODO: this is a short term solution. BE shouldn't be returning this
    case 'FinancingPending':
      return PATHS.autofiScreen;
    case 'BackendProducts':
      return PATHS.dealCoverage;
    case 'Review':
      return PATHS.dealReview;
    case 'DocumentUpload':
      return PATHS.documentUpload;
    case 'Contracting':
      return PATHS.contracting;
    case 'TradeInVehicle':
      return PATHS.vehicleTradeIn;
  }
}

export function getStepFromPathname(pathname) {
  const pathArr = pathname.split('/');
  const vin = pathArr[2];

  switch (pathname) {
    case PATHS.checkoutTradeIn.withParams({ vin }):
    case PATHS.tradeInLoanInfo.withParams({ vin }):
      return 0;
    case PATHS.registrationAddress.withParams({ vin }):
    case PATHS.deliveryAddressForm.withParams({ vin }):
      return 1;
    case PATHS.dealCredit.withParams({ vin }):
    case PATHS.dealCreditReview.withParams({ vin }):
    case PATHS.credit.withParams({ vin: vin }):
    case PATHS.autofiScreen.withParams({ vin }):
    case PATHS.paymentOptions.withParams({ vin }):
      return 2;
    case PATHS.dealReview.withParams({ vin }):
    case PATHS.dealCoverage.withParams({ vin }):
      return 3;
    case PATHS.depositForm.withParams({ vin }):
      return 4;
    case PATHS.documentUpload.withParams({ vin }):
      return 5;
  }
}

export function getOfferStepFromPathname(pathname) {
  const pathArr = location.pathname.split('/');
  const offerId = pathArr[pathArr.length - 1];

  switch (pathname) {
    case PATHS.sellVerification.prefix:
      return 'Owner';

    case PATHS.sellOwner.withParams({ offerId }):
      return 'Owner';

    case PATHS.sellDocuments.withParams({ offerId }):
      return 'DocUpload';

    case PATHS.sellVerificationReview.prefix:
      return 'Review';
  }
}

export function checkTokenExp(token) {
  let expAccessToken = null;
  if (token) {
    expAccessToken = jwtDecode(token).exp < new Date().getTime() / 1000;
  }
  return expAccessToken;
}

// Flatten obj input:
// {
//   users: {
//     set: "whatnot",
//   },
//   projects: {
//     set: "whatnot",
//   }
// }
//
// Outputs:
// {
//  "users.set": "whatnot",
//  "projects.set": "whatnot",
// }
export const flattenObj = (obj, keys = []) => {
  return Object.keys(obj).reduce((acc, key) => {
    return Object.assign(
      acc,
      isPlainObj(obj[key])
        ? flattenObj(obj[key], keys.concat(key))
        : { [keys.concat(key).join('.')]: obj[key] }
    );
  }, {});
};

const isPlainObj = (o) =>
  Boolean(
    o &&
      o.constructor &&
      o.constructor.prototype &&
      o.constructor.prototype.hasOwnProperty('isPrototypeOf')
  );
