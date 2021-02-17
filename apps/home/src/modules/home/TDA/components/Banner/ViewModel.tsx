class ViewModel {
  readonly bannerText: string =
    'Due to the inclement weather, all Houston area locations will be closed Wednesday February 17th. You can still reach us via phone at (832) 225-3686.';
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
