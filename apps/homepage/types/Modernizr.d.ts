export {};
declare global {
  interface Window {
    Modernizr: {
      jpeg2000: boolean;
      webp: {
        alpha: boolean;
        animation: boolean;
        lossless: true;
      };
    };
  }
}
