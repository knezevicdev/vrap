import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

class ProcessViewModel {
  sections = [
    {
      key: 'for-buyers',
      id: '#for-buyers',
      title: 'for buyers',
      subsections: [
        {
          key: 'browse',
          icon: `${publicRuntimeConfig.BASE_PATH}/modules/vroom/icons/browse.svg`,
          imgSrc: `${publicRuntimeConfig.BASE_PATH}/modules/vroom/images/how-it-works/browse-online.jpg`,
          title: 'Browse Online',
          steps: [
            {
              key: 'choose-car',
              title: 'Choose Your Car',
              description:
                'Explore thousands of high-quality, low-mileage vehicles on vroom.com, with new cars and trucks added every week. All vehicles pass a thorough inspection and come with a free CarFax vehicle history report so you can feel confident you’re getting a good ride.',
              link: {
                text: "More About Vroom's Vehicles",
                to:
                  'https://vroom.zendesk.com/hc/en-us/sections/201039359-Vroom-s-Vehicles',
              },
            },
            {
              key: 'start-purchase',
              title: 'Start Your Purchase',
              description:
                'Click “Start Purchase” and create an account on vroom.com to save future information and purchase details.',
              link: {
                text: 'More About Buying with Vroom',
                to:
                  'https://vroom.zendesk.com/hc/en-us/sections/201097055-Buying-a-Car-with-Vroom',
              },
            },
            {
              key: 'how-to-pay',
              title: 'Choose How to Pay',
              description:
                'Finance with Vroom and we make the hard part easy. We partner with a dozen major banks to get you the right rate. You can also pay with cash or finance with your own bank. Complete this step and a Vroom Car Specialist will be in touch shortly to discuss further details.',
              link: {
                text: 'More About Financing',
                to:
                  'https://vroom.zendesk.com/hc/en-us/sections/203264866-Financing',
              },
            },
            {
              key: 'tell-us',
              title: 'Tell Us About Your Trade',
              description:
                'If you have a trade, get a fast, easy appraisal by giving us some basic details about your vehicle. This will give our Car Specialist even more information to be able to structure the right deal for you.',
              link: {
                text: 'More About Trading In',
                to:
                  'https://vroom.zendesk.com/hc/en-us/sections/201039369-Trading-In-a-Car-with-Vroom',
              },
            },
          ],
        },
        {
          key: 'make-it-yours',
          icon: `${publicRuntimeConfig.BASE_PATH}/modules/vroom/icons/make-it-yours.svg`,
          imgSrc: `${publicRuntimeConfig.BASE_PATH}/modules/vroom/images/how-it-works/make-it-yours.jpg`,
          title: 'Make It Yours',
          steps: [
            {
              key: 'docs',
              title: 'Upload Key Documents',
              description:
                'Take a photo of your driver’s license and proof of insurance to verify your identity. Our Car Specialist will request these when they give you a call and will provide an easy upload link. Depending on your financing, you may be asked to confirm other details.',
            },
            {
              key: 'deposit',
              title: 'Place a Deposit',
              description:
                'With a $500 fully-refundable deposit from you, we’ll hold your vehicle for 24 hours. This ensures no one else can buy the vehicle while you finalize the contract details.',
            },
            {
              key: 'sign',
              title: 'Sign Here',
              description:
                'We will either overnight your paperwork for signature or email to you for e-signature (dependent on the requirements of your purchase). Review carefully, sign where noted and return/complete your paperwork within 24 hours. Once we’ve got it, we’ll confirm it looks good and then the car will be yours.',
              link: {
                text: 'More About Buying a Car With Vroom',
                to:
                  'https://vroom.zendesk.com/hc/en-us/sections/201097055-Buying-a-Car-with-Vroom',
              },
            },
          ],
        },
        {
          key: 'delivered',
          icon: `${publicRuntimeConfig.BASE_PATH}/modules/vroom/icons/get-it-delivered.svg`,
          imgSrc: `${publicRuntimeConfig.BASE_PATH}/modules/vroom/images/how-it-works/get-it-delivered.jpg`,
          title: 'Get It Delivered',
          steps: [
            {
              key: 'plan-for-delivery',
              title: 'Plan for Delivery',
              description:
                'With your signed and approved paperwork and deposit, we give your car one last inspection and book it for delivery. Once it’s on the road to you, our Delivery Support Team will be in touch with regular updates.',
            },
            {
              key: 'meet-car',
              title: 'Meet Your New Car',
              description:
                'Your vehicle will typically arrive within 10-14 days of purchase, though sometimes it can take longer. We ship your car right to your home, or to a convenient nearby location.',
              link: {
                text: 'More About Delivery',
                to:
                  'https://vroom.zendesk.com/hc/en-us/sections/201097095-Delivery',
              },
            },
            {
              key: 'check-tags',
              title: 'Check for Temp Tags',
              description:
                'Your car arrives with temporary tags allowing you to drive the vehicle immediately. You’ll receive an email with details about titling and registration upon delivery. If you financed your vehicle with Vroom, we file your DMV paperwork for you.',
              link: {
                text: 'More About Titles and Registration',
                to:
                  'https://vroom.zendesk.com/hc/en-us/sections/203268043-Titles-and-Registration',
              },
            },
            {
              key: 'test-drive',
              title: 'Take It for a Spin...Or Two',
              description:
                'To get to know your car, it takes more than a trip around the block. You have a full week (7 days or 250 miles) to make sure it’s right for you. If it’s not, we’ll take it back and refund the purchase price.',
              link: {
                text: 'More About the 7-Day Test Drive',
                to:
                  'https://vroom.zendesk.com/hc/en-us/articles/205360565-When-does-the-7-day-return-period-begin-',
              },
            },
            {
              key: 'enjoy',
              title: 'Enjoy Your Ride',
              description:
                'Feel good that you got a great car at a great price, delivered right to you. Enjoy your ride, tell your friends and give our Customer Support team a shout (855) 219-5411 if you need anything else. ',
            },
          ],
        },
      ],
    },
    {
      key: 'for-sellers',
      id: '#for-sellers',
      title: 'for sellers',
      subsections: [
        {
          key: 'get-offer',
          icon: `${publicRuntimeConfig.BASE_PATH}/modules/vroom/icons/free-appraisal.svg`,
          imgSrc: `${publicRuntimeConfig.BASE_PATH}/modules/vroom/images/how-it-works/get-a-free-appraisal.jpg`,
          title: 'Get Your Price',
          steps: [
            {
              key: 'tell-us',
              title: 'Tell Us About Your Vehicle',
              description:
                'Provide basic information about your vehicle including your license plate or VIN, mileage, and condition. Vroom’s proprietary buying system gives you an instant price for your vehicle based on your description and data from thousands of similar transactions.',
            },
            {
              key: 'guaranteed-offer',
              title: 'Get Your Instant Price',
              description: `We'll give you an instant price for your vehicle that is good for the earlier of 7 days or 250 additional miles. If we’re unable to calculate an instant price, one of our car-buying experts will email you a price typically within the same day.`,
              link: {
                text: 'More About Selling to Vroom',
                to:
                  'https://vroom.zendesk.com/hc/en-us/articles/205360685-How-do-I-sell-my-car-to-Vroom-',
              },
            },
          ],
        },
        {
          key: 'close-deal',
          icon: `${publicRuntimeConfig.BASE_PATH}/modules/vroom/icons/close-the-deal.svg`,
          imgSrc: `${publicRuntimeConfig.BASE_PATH}/modules/vroom/images/how-it-works/close-the-deal.jpg`,
          title: 'Close the Deal',
          steps: [
            {
              key: 'accept-offer',
              title: 'Verify Your Information',
              description:
                'When you’re ready to sell your vehicle to us (price is good for 7 days or an additional 250 miles), you’ll verify ownership information and upload pictures of your photo ID and registration. You’re one step closer to getting paid! Our team will be in touch to discuss transferring your title and finalizing your deal.',
            },
            {
              key: 'schedule-pickup',
              title: 'Schedule Your Pickup',
              description: `Our team will work with you to schedule a free pickup from your driveway or a convenient location near you (within the lower 48 states). That's right, pickup is absolutely free`,
              link: {
                text: 'More About Picking Up Your Car',
                to:
                  'https://vroom.zendesk.com/hc/en-us/articles/204664519-Will-Vroom-come-pick-up-my-car-',
              },
            },
          ],
        },
        {
          key: 'get-paid',
          icon: `${publicRuntimeConfig.BASE_PATH}/modules/vroom/icons/get-paid.svg`,
          imgSrc: `${publicRuntimeConfig.BASE_PATH}/modules/vroom/images/how-it-works/get-paid.jpg`,
          title: 'Get Paid',
          steps: [
            {
              key: 'look-for-check',
              title: 'Look Out for Your Check',
              description:
                'With confirmation of pickup, we will process your payment and send you a check via overnight mail.',
              link: {
                text: 'More About Getting Paid',
                to:
                  'https://vroom.zendesk.com/hc/en-us/articles/205360705-When-do-I-get-paid-',
              },
            },
          ],
        },
      ],
    },
  ];
}

export default ProcessViewModel;
