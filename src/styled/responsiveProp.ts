import {
  addStyleForDesktop,
  addStyleForMobile,
  addStyleForTablet,
} from '@vroom-web/ui-lib';

export const responsiveStyledProp = (
  cssPropName: string,
  prop?: ResponsiveProp<string>
) => {
  if (!prop) return '';
  if (typeof prop === 'string') return `${cssPropName}: ${prop};`;

  let style = '';

  if (prop.default) style += `${cssPropName}: ${prop.default};`;

  if (prop.desktop)
    style += addStyleForDesktop(`${cssPropName}: ${prop.desktop};`);
  if (prop.tablet)
    style += addStyleForTablet(`${cssPropName}: ${prop.tablet};`);
  if (prop.mobile)
    style += addStyleForMobile(`${cssPropName}: ${prop.mobile};`);

  return style.replace(/,/g, '');
};

export type ResponsiveProp<T> =
  | T
  | {
      mobile?: T;
      tablet?: T;
      desktop?: T;
      default?: T;
    };
