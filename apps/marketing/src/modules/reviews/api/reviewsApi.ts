import Axios from 'axios';
import getConfig from 'next/config';

import { Review } from '../components/Highlights/AllReviews';
import { Highlight, Summary } from '../ReviewsContext';

const {
  publicRuntimeConfig: { VROOM_URL },
} = getConfig();

export const getHighlights = async (): Promise<Highlight[] | undefined> => {
  try {
    const response = await Axios.get(`${VROOM_URL}/api/reviews/highlights`);
    return response.data;
  } catch (error) {
    console.error(JSON.stringify(error));
    return undefined;
  }
};

export const getSummary = async (): Promise<Summary | undefined> => {
  try {
    const response = await Axios.get(`${VROOM_URL}/api/reviews/summary`);
    return response.data;
  } catch (error) {
    console.error(JSON.stringify(error));
    return undefined;
  }
};

export const getReviews = async (
  minRating: number,
  start: number
): Promise<Review[] | undefined> => {
  try {
    const response = await Axios.get(
      `${VROOM_URL}/api/reviews?minRating=${minRating}&start=${start}`
    );
    return response.data;
  } catch (error) {
    console.error(JSON.stringify(error));
    return undefined;
  }
};
