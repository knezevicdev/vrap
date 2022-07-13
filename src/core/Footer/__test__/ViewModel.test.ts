import ViewModel from '../ViewModel';

describe('testing Simple Footer Viewmodel', () => {
  let viewmodel: ViewModel;

  beforeEach(() => {
    viewmodel = new ViewModel();
  });

  it('test readonly var ', () => {
    expect(viewmodel.vroomLink).toEqual('https://www.vroom.com/');
    expect(viewmodel.appMessage).toEqual('GET THE VROOM APP');
    expect(viewmodel.appLinks).toEqual({
      google:
        'https://play.google.com/store/apps/details?id=com.vroom.app.android',
      apple: 'https://apps.apple.com/app/apple-store/id1494048038?pt=120897984',
    });
    expect(viewmodel.socialLinks).toEqual({
      facebook: 'https://www.facebook.com/vroom',
      twitter: 'https://www.twitter.com/vroomcars',
      instagram: 'https://www.instagram.com/vroom',
    });
    expect(viewmodel.copyrightMessage).toEqual(
      '©2020 VROOM. ALL RIGHTS RESERVED.'
    );
  });

  it('test getSectionFunction ', () => {
    expect(viewmodel.sections).toEqual([
      {
        title: 'Vroom',
        links: [
          {
            href: '/cars',
            name: 'Buy',
          },
          {
            href: '/sell',
            name: 'Sell/Trade',
          },
          {
            href: '/finance',
            name: 'Finance',
          },
        ],
      },
      {
        title: 'About',
        links: [
          {
            href: '/protection',
            name: 'Vroom Protection',
          },
          {
            href: '/how-it-works',
            name: 'How It Works',
          },
          {
            href: 'https://ir.vroom.com/',
            name: 'Investor Relations',
          },
        ],
      },
      {
        title: 'Contact',
        links: [
          {
            name: '(855) 524-1300',
            href: 'tel:+18555241300',
          },
          {
            href: '/contact',
            name: 'FAQ',
          },
          {
            href: '/myaccount/customer-support',
            name: 'Contact Us',
          },
        ],
      },
      {
        title: 'Company',
        links: [
          {
            href: '/legal/privacy-policy',
            name: 'Privacy Policy',
          },
          {
            href: '/legal/terms-of-use',
            name: 'Terms of use',
          },
          {
            href: '/careers',
            name: 'Careers',
          },
          {
            href:
              'https://privacyportal.onetrust.com/webform/8086730d-99f7-48ea-b3a1-0b3bb0cf163e/aa3e2126-7439-411d-a9a2-9fa0c4f8b01d',
            name: 'Do Not Sell My Info (CA Residents)',
          },
        ],
      },
    ]);
  });
});
