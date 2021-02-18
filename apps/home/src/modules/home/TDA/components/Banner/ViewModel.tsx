class ViewModel {
  readonly bannerText: string =
    'Our full service Stafford store is currently open Mon-Sat 10am to 6pm daily as are all of our Buying Centers in the Houston Metro Area. We can provide an online, convenient sales process and free "at home" delivery service if you live within 40 miles of the Stafford store. We are also offering curb-side pickup. Call us today on 832-225-3686. Terms and conditions apply.';
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
