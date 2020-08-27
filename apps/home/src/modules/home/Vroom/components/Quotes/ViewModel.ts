import { ReactComponent as BloombergSvg } from './svg/bloomberg.svg';
import { ReactComponent as BusinessInsiderSvg } from './svg/businessinsider.svg';
import { ReactComponent as FastCompanySvg } from './svg/fastcompany.svg';
import { ReactComponent as FortuneSvg } from './svg/fortune.svg';
import { ReactComponent as UsaTodaySvg } from './svg/usatoday.svg';
import { ReactComponent as YahooFinanceSvg } from './svg/yahoofinance.svg';

class QuotesViewModel {
  readonly quotes = [
    {
      alt: 'Business Insider',
      LogoComponent: BusinessInsiderSvg,
      quote:
        '“The website makes car-buying haggle-free, with prices below market value, so customers can rest easy knowing they aren’t getting ripped off.”',
    },
    {
      alt: 'Yahoo Finance',
      LogoComponent: YahooFinanceSvg,
      quote: `“Vroom looks a lot nicer than that tool shed on the avenue, and its promises to buyers are better than most auto websites we've seen.”`,
    },
    {
      alt: 'USA Today',
      LogoComponent: UsaTodaySvg,
      quote:
        '“Selling a car has never been this easy, at least when using Vroom.”',
    },
    {
      alt: 'Fortune',
      LogoComponent: FortuneSvg,
      quote:
        '“Vroom wants to make buying or selling a used car as quick and painless as ordering an Uber.”',
    },
    {
      alt: 'Fast Company',
      LogoComponent: FastCompanySvg,
      quote:
        '“Because it does not spend hours selling to customers, maintaining a brick-and-mortar stores, or paying commissions, Vroom can run more efficiently than a traditional dealership.”',
    },
    {
      alt: 'Bloomberg',
      LogoComponent: BloombergSvg,
      quote:
        '“Unlike rival marketplaces for used cars, Vroom buys and inspects all of the vehicles it lists for sale on its website.”',
    },
  ];
}

export default QuotesViewModel;
