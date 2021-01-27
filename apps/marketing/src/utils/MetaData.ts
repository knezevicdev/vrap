import { PageData } from './utils';

interface ReturnData {
  [key: string]: { [key: string]: string };
}
export const getMetaData = (pageData: PageData): ReturnData => {
  const vroomUrl = 'https://www.vroom.com/';
  const santanderUrl = 'https://www.santanderconsumerusa.com/';
  const tdaUrl = 'https://www.texasdirectauto.com/';

  switch (pageData) {
    case PageData.CONTACT:
      return {
        vroom: {
          title: 'Contact Us | Vroom Customer Service',
          canonical: `${vroomUrl}${PageData.CONTACT}`,
          description:
            'Vroom is happy to help. Give us a call to speak with a representative.',
        },
        santander: {
          title: 'Contact Us - Santander Consumer USA',
          canonical: `${santanderUrl}${PageData.CONTACT}`,
          description:
            'Call 1-888-222-4227 about your Santander Consumer USA account or call 1-855-659-0278 about purchasing a vehicle. We’re here to help.',
        },
        tda: {
          title: 'Contact Us - Texas Direct Auto',
          canonical: `${tdaUrl}${PageData.CONTACT}`,
          description:
            'Texas Direct Auto is happy to help. Give us a call to speak with a representative.',
        },
      };
    case PageData.FINANCE:
      return {
        vroom: {
          title: 'Finance With Vroom',
          canonical: `${vroomUrl}${PageData.FINANCE}`,
          description:
            'Finance your next vehicle with Vroom. Apply in minutes and get approved fast. Highly competitive rates. Apply online now!',
        },
        // Because this page allows the brand param, we want to point to the appropriate referrer/branded site to be attributed in the canonical
        santander: {
          title: 'Finance With Santander Consumer USA',
          canonical: `${santanderUrl}${PageData.FINANCE}`,
          description: '',
        },
        tda: {
          title: 'Finance With Texas Direct Auto',
          canonical: `${tdaUrl}${PageData.FINANCE}`,
          description: '',
        },
      };
    case PageData.HOWITWORKS:
      return {
        vroom: {
          title: 'How Does Vroom Work? | Buying a Car From Vroom',
          canonical: `${vroomUrl}${PageData.HOWITWORKS}`,
          description:
            'Buying or selling a car on Vroom is quick and easy. Discover how Vroom works, and read reviews from satisfied customers.',
        },
        // Because this page allows the brand param, we want to point to the appropriate referrer/branded site to be attributed in the canonical
        santander: {
          title: 'How Vroom Works - Santander Consumer USA',
          canonical: `${santanderUrl}${PageData.HOWITWORKS}`,
          description: '',
        },
        tda: {
          title: 'How Vroom Works - Texas Direct Auto',
          canonical: `${tdaUrl}${PageData.HOWITWORKS}`,
          description: '',
        },
      };
    case PageData.REVIEWS:
      return {
        vroom: {
          title: 'Vroom Reviews & Testimonials | Vroom.com',
          canonical: `${vroomUrl}${PageData.REVIEWS}`,
          description:
            'Vroom believes buying a car should be fun, easy, and affordable. Visit and see what our customers have to say about the Vroom car buying process.',
        },
        // Because this page allows the brand param, we want to point to the appropriate referrer/branded site to be attributed in the canonical
        santander: {
          title: 'Reviews - Santander Consumer USA',
          canonical: `${santanderUrl}${PageData.REVIEWS}`,
          description: '',
        },
        tda: {
          title: 'Reviews - Texas Direct Auto',
          canonical: `${tdaUrl}${PageData.REVIEWS}`,
          description: '',
        },
      };
    default:
      return {
        vroom: {
          title: 'Vroom',
          canonical: '',
          description: '',
        },
        santander: {
          title: 'Santander Consumer USA',
          canonical: '',
          description: '',
        },
        tda: {
          title: 'Texas Direct Auto',
          canonical: '',
          description: '',
        },
      };
  }
};
