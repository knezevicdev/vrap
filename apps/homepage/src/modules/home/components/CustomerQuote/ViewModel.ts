import globalEnv from 'src/globalEnv';

class CustomerQuoteViewModel {
  readonly quote =
    '“Vroom is a fast, easy and hassle free way of buying a vehicle. I can honestly say that I had an unbelievable buying experience.”';
  readonly name = 'Michael W.';
  readonly location = 'COLORADO SPRINGS, CO';
  readonly image = {
    src: `${globalEnv.CDN_URL}/modules/home/customer-quote.png`,
    alt: 'Person taking a photo.',
  };
}

export default CustomerQuoteViewModel;
