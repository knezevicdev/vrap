import React from 'react';

import { CODENAME } from '../constants/misc';
import { globalConfig } from '../lib/globalConfig';

const { STATIC_URL } = globalConfig;
const SVG_PATH = `${STATIC_URL}/icons/svg`;

export const arrowPath = `${SVG_PATH}/${CODENAME}/arrow-up-down.svg`;
export const securityIconPath = `${SVG_PATH}/${CODENAME}/security.svg`;
export const blueSecurityIconPath = `${SVG_PATH}/security-blue.svg`;
export const greenSecurityIconPath = `${SVG_PATH}/${CODENAME}/security-green.svg`;
export const tradePath = `${SVG_PATH}/${CODENAME}/trade-in.svg`;
// TODO: There is no equivalent in the new assets. Are we still using this?... Is the green
//       checkmark becoming black (i.e. `${CODENAME}/check-mark.svg`)? throughout the site
export const checkPath = `${SVG_PATH}/green_checkmark.svg`;
// TODO: There are no checkmark states/different checkmark colors (Ideally, we should
//       be specifying SVG colors using the Icon component or some other code or CSS-based
//       means) in the new assets
export const blueCheckPath = `${SVG_PATH}/check-blue.svg`;
export const whiteCheckPath = `${SVG_PATH}/check-white.svg`;
export const redCheckPath = `${SVG_PATH}/${CODENAME}/check-mark-red.svg`;
export const greenCheckPath = `${SVG_PATH}/${CODENAME}/check-mark-green.svg`;
// TODO: There is no concept of an alert in the new assets
export const alertWhitePath = `${SVG_PATH}/alert-white-outline.svg`;

export const chat_icon = `${SVG_PATH}/${CODENAME}/chat.svg`;
// TODO: There is likewise no equivalent of a (colored/blue) call icon in the new assets...
export const call_icon = `${SVG_PATH}/call_blue.svg`;
export const email_icon = `${SVG_PATH}/${CODENAME}/email.svg`;
export const help_icon = `${SVG_PATH}/${CODENAME}/faq.svg`;
// TODO: ...Or a (white) chat icon...
export const chat_icon_white = `${SVG_PATH}/chat-white.svg`;
// TODO: ...Or a white call or FAQ icon in the new assets...
export const call_icon_white = `${SVG_PATH}/call-white.svg`;
export const help_icon_white = `${SVG_PATH}/faq-white.svg`;

export const call_icon_grey = `${SVG_PATH}/${CODENAME}/phone.svg`;

// TODO: Is this correct? It was previously sign-and-pay.svg. It seems to me that
//       `q-e-icon.svg` actually looks more like `tell.svg` below
export const sign_and_pay_icon = `${SVG_PATH}/${CODENAME}/illustration/q-e-icon.svg`;
export const free_delivery_icon = `${SVG_PATH}/${CODENAME}/illustration/delivery.svg`;
export const pickup_icon = `${SVG_PATH}/${CODENAME}/car-pickup.svg`;
export const car_pickup_icon = `${SVG_PATH}/${CODENAME}/car-pickup.svg`;
export const offer_icon = `${SVG_PATH}/${CODENAME}/offer.svg`;
export const quick_and_easy_icon = `${SVG_PATH}/${CODENAME}/quick-and-easy.svg`;
// TODO: Previously `tell.svg`
export const tell_icon = `${SVG_PATH}/${CODENAME}/illustration/q-e-icon.sv`;
export const apply_in_minutes = `${SVG_PATH}/${CODENAME}/illustration/speed.svg`;
export const low_rate = `${SVG_PATH}/${CODENAME}/illustration/highly-competitive-rates.svg`;
export const easy_registration = `${SVG_PATH}/${CODENAME}/illustration/easy-registration.svg`;
// TODO: The `offer.svg`, `title.svg` and `title_transfer.svg` illustrations are not
//       available yet
export const title_icon = `${SVG_PATH}/title.svg`;
export const title_transfer_icon = `${SVG_PATH}/title_transfer.svg`;
export const trade_icon = `${SVG_PATH}/${CODENAME}/trade-in_2.svg`;
export const ny_icon = `${SVG_PATH}/${CODENAME}/ny.svg`;
export const pig_icon = `${SVG_PATH}/${CODENAME}/pig.svg`;
export const multiplication_icon = `${SVG_PATH}/${CODENAME}/x.svg`;
export const equals_icon = `${SVG_PATH}/${CODENAME}/equal.svg`;
export const one_icon = `${SVG_PATH}/${CODENAME}/1-active.svg`;
export const two_icon = `${SVG_PATH}/${CODENAME}/2-active.svg`;
export const three_icon = `${SVG_PATH}/${CODENAME}/3-active.svg`;
export const four_icon = `${SVG_PATH}/${CODENAME}/4-active.svg`;
export const five_icon = `${SVG_PATH}/${CODENAME}/5-active.svg`;
export const six_icon = `${SVG_PATH}/${CODENAME}/6-active.svg`;
// TODO: Use camelCase for JavaScript variable names
export const redOne = `${SVG_PATH}/${CODENAME}/red-1.svg`;
export const redTwo = `${SVG_PATH}/${CODENAME}/red-2.svg`;
export const redThree = `${SVG_PATH}/${CODENAME}/red-3.svg`;
export const gray_two_icon = `${SVG_PATH}/${CODENAME}/2-inactive.svg`;
export const gray_three_icon = `${SVG_PATH}/${CODENAME}/3-inactive.svg`;
export const gray_four_icon = `${SVG_PATH}/${CODENAME}/4-inactive.svg`;
export const gray_five_icon = `${SVG_PATH}/${CODENAME}/5-inactive.svg`;
export const gray_six_icon = `${SVG_PATH}/${CODENAME}/6-inactive.svg`;
export const tooltip = `${SVG_PATH}/${CODENAME}/tooltip.svg`;
// TODO: Temporary; use a styled Icon component instead
export const tooltipRed = `${SVG_PATH}/${CODENAME}/tooltip-red.svg`;
export const radioSelected = `${SVG_PATH}/radioSelected.svg`;

export const masterCardLogo = `${SVG_PATH}/master_card_logo.svg`;
export const visaCardLogo = `${SVG_PATH}/visa_card_logo.svg`;
export const discoverCardLogo = `${SVG_PATH}/discover_card_logo.svg`;
export const amexCardLogo = `${SVG_PATH}/amex_card_logo.svg`;

export const creditAppointment = `${SVG_PATH}/credit-appointment.svg`;
export const creditDocumentComplete = `${SVG_PATH}/credit-document-complete.svg`;
export const creditCash = `${SVG_PATH}/credit-cash.svg`;
export const creditAnimation = `${SVG_PATH}/credit-animation-3.svg`;

export const carOfferIcon = `${SVG_PATH}/car-offer.svg`;
export const car_timer_icon = `${SVG_PATH}/car-timer.svg`;

const blueIcons = {
  0: one_icon,
  1: two_icon,
  2: three_icon,
  3: four_icon,
  4: five_icon,
  5: six_icon,
};

const grayIcons = {
  1: gray_two_icon,
  2: gray_three_icon,
  3: gray_four_icon,
  4: gray_five_icon,
  5: gray_six_icon,
};

export function numberIcon(index, activeSection, className) {
  const isActive = activeSection === index;
  let src = '';
  if (isActive) {
    src = blueIcons[index];
  } else {
    src = grayIcons[index];
  }
  return <img src={src} className={className} />;
}
