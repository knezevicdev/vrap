import Cookies from 'js-cookie';

const redirectToThirdParty = (redirectUrl?: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.delete('redirect');
  searchParams.delete('auth-mode');

  let redirectUri = redirectUrl || '/myaccount/hub';
  if (!redirectUrl) {
    try {
      redirectUri = encodeURIComponent(
        `${window.location.pathname}?${searchParams.toString()}`
      );
    } catch (e) {
      console.error(e);
    }
  }

  sessionStorage.setItem('authSrc', redirectUri);
  Cookies.set('authSrc', redirectUri);

  window.location.assign('/myaccount/3pa');
};

export default redirectToThirdParty;
