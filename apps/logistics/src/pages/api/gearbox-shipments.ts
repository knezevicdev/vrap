import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (
  _req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const url = process.env.GEARBOX_URL ?? '';

  const data = JSON.stringify({
    query: `query portalShipmentsQuery($user: String!, $status: String!) {
  portalShipments(user: $user, status: $status) {
  	__typename
    ... on PortalShipmentsArray {
      shipments{
        date_posted
        year
        make
        model
        vin
        notes
      	estimated_arrival
        estimated_delivery
        date_delivered
        date_cancelled
        origin_address {
          street_line_1
          street_line_2
          city
          state
          zipcode
          to_string
        }
        destination_address {
          street_line_1
          street_line_2
          city
          state
          zipcode
          to_string
        }
        blackout_dates {
          start
          stop
          to_string
        }
      }
    }
    ... on APIError {
      errorType
      errorTitle
      errorDetail
    }
  }
}`,
    variables: { user: 'berkay.pehlivan@vroom.com', status: 'booked' },
  });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await axios.post(url, data, config);
    res.json(response.data);
  } catch (err) {
    // console.error(err);
    res.status(500).json(err);
  }
};
