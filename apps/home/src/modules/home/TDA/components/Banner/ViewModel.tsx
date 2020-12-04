class ViewModel {
  readonly bannerText: string =
    'Our Galleria (Westheimer) and Kingwood Sell Us Your Car centers are temporarily closed. Our other locations are open for normal business hours.';
  readonly linkText: string = 'SUYC Location Details';
  readonly linkHref: string = '#locations-section';
  scrollToLocation(): void {
    const locationSection = document.getElementById('locations-section');
    console.log(locationSection);
    if (locationSection) {
      // 72 is to account for sticky header
      const topPos =
        locationSection.getBoundingClientRect().top + window.pageYOffset - 72;

      window.scrollTo({
        top: topPos, // scroll so that the element is at the top of the view
        behavior: 'smooth', // smooth scroll
      });
    }
  }
  closeBanner(): void {
    const banner = document.querySelector('[data-tda-banner]');
    if (banner) banner.remove();
  }
}

export default ViewModel;
