import getConfig from 'next/config';
import React from 'react';

const { publicRuntimeConfig } = getConfig();
const BASE_PATH = publicRuntimeConfig.NEXT_PUBLIC_BASE_PATH;

export class Icons {
  static readonly EMAIL = {
    name: 'email',
    width: 16,
    height: 11,
    getPath: (
      <path
        fill="#E7131A"
        fillRule="evenodd"
        d="M1.648.632L0 10.632h14.305l1.648-10H1.648zm1.929 1.111H13.6L7.898 5.936 3.577 1.743zm6.446 3.92l4.503-3.311-1.083 6.58-3.42-3.27zM2.5 2.398l3.359 3.258-4.426 3.218L2.5 2.4zm4.115 3.993l.971.941.058.079 1.38-1.016 3.269 3.125H2.31l4.304-3.13z"
      />
    ),
  };

  static readonly FAQ = {
    name: 'faq',
    width: 10,
    height: 16,
    getPath: (
      <path
        fill="#E7131A"
        fillRule="evenodd"
        d="M5.634 10.012H1.656l.68-4.317 1.19-.059c1.25-.046 1.443-1.053 1.461-1.168.085-.538-.224-.538-.34-.538-.473 0-.553.482-.557.503l-.11.704H0l.143-.914C.54 1.698 2.613 0 5.299 0 7.928 0 9.62 1.846 9.235 4.293c-.232 1.473-1.248 3.369-3.348 4.11l-.253 1.609zM2.98 8.848h1.693l.207-1.32.444-.113c2.257-.578 2.7-2.702 2.766-3.122.286-1.813-.965-3.13-2.976-3.13-1.972 0-3.399 1.07-3.782 2.81h1.741A1.946 1.946 0 0 1 4.83 2.767c.938 0 1.461.684 1.301 1.702a2.805 2.805 0 0 1-.75 1.467c-.359.373-.996.827-1.99.864l-.087.005-.321 2.044zm2.562 4.16c.204-1.296-.667-2.35-1.938-2.35-1.263 0-2.456 1.054-2.66 2.35-.203 1.286.66 2.332 1.924 2.332 1.272 0 2.472-1.046 2.674-2.332zm-1.144 0c-.1.644-.705 1.168-1.348 1.168-.632 0-1.065-.524-.963-1.168.103-.654.701-1.186 1.334-1.186.642 0 1.08.532.977 1.186z"
      />
    ),
  };

  static readonly PHONE = {
    name: 'phone',
    width: 15,
    height: 16,
    getPath: (
      <path
        fill="#E7131A"
        fillRule="evenodd"
        d="M2.809 1.283c-.932.821-1.545 1.912-1.726 3.071L.053 10.98c-.18 1.16.095 2.248.774 3.066.675.816 1.672 1.265 2.808 1.265h.008l2.905-.006.855-5.495-2.592.005.678-4.374 2.616-.006L8.95 0 6.02.006C4.883.008 3.741.462 2.81 1.283zm4.287 2.936l-1.688.003c-.247 0-.496.1-.698.278a1.134 1.134 0 0 0-.375.666l-.765 4.928a.827.827 0 0 0 .167.666c.147.177.364.28.612.275l1.666-.004-.475 3.058-1.707.003h-.007c-.815 0-1.533-.323-2.02-.91-.486-.588-.684-1.371-.554-2.204L2.28 4.352c.13-.834.571-1.618 1.241-2.209.671-.59 1.49-.916 2.31-.918l1.73-.004-.466 2.998zm7.265-.88l-.19 1.218H9.988l.192-1.218h4.18zM10.55 1.035l-.247 1.219h4.188l.245-1.22H10.55z"
      />
    ),
  };

  static readonly VROOM_WHITE = {
    name: 'vroom',
    width: 116,
    height: 20,
    fill: '#FFFFFF',
    getPath: (
      <g id="vroom">
        <path d="M103.877 7.57765C104.994 6.72584 106.306 5.90951 107.583 5.90951C108.93 5.90951 109.551 6.99203 109.285 8.57144L107.317 19.6628H113.806L115.845 7.73737C116.802 2.05858 113.15 0.0177612 109.87 0.0177612C107.406 0.0177612 104.977 1.10028 103.239 3.03462C102.353 0.763103 100.385 0.0177612 98.523 0.0177612C96.2536 0.0177612 94.0906 0.940565 92.3177 2.9104L92.7786 0.35494H83.0628L82.0522 5.99824H85.7223L83.3288 19.6628H89.7646L91.8921 7.57765C93.0091 6.72584 94.3211 5.90951 95.5976 5.90951C96.9451 5.90951 97.5656 6.99203 97.2997 8.57144L95.3317 19.6628H101.768L103.877 7.57765Z" />
        <path d="M61.2023 10.6122C61.2023 4.98669 65.2269 0 72.0528 0C77.4603 0 81.8217 3.56699 81.8217 9.38776C81.8217 15.0133 77.7971 20 70.9713 20C65.5637 20 61.2023 16.4508 61.2023 10.6122ZM67.6204 10.3106C67.6204 12.6353 69.0565 14.4454 71.3258 14.4454C73.8257 14.4454 75.4036 12.2094 75.4214 9.68944C75.4214 7.36468 73.9853 5.55457 71.7159 5.55457C69.1983 5.55457 67.6204 7.80834 67.6204 10.3106Z" />
        <path d="M39.59 10.6122C39.59 4.98669 43.6146 0 50.4405 0C55.848 0 60.2094 3.56699 60.2094 9.38776C60.2094 15.0133 56.1848 20 49.3589 20C43.9514 20 39.59 16.4508 39.59 10.6122ZM46.0081 10.3106C46.0081 12.6353 47.4442 14.4454 49.7135 14.4454C52.2134 14.4454 53.8091 12.2094 53.8091 9.68944C53.8091 7.36468 52.373 5.55457 50.1036 5.55457C47.586 5.55457 46.0081 7.80834 46.0081 10.3106Z" />
        <path d="M40.2637 0L38.9872 6.95652H36.3632C33.8988 6.95652 32.8882 8.19876 32.5514 10.2041L30.938 19.6628H24.4844L26.8779 5.99823H23.2079L24.2185 0.354925H33.9343L33.2428 4.06389C34.5548 0.94055 37.4093 0 40.0687 0H40.2637Z" />
        <path d="M0 5.99822L0.992855 0.354919H10.2477L9.80444 13.8066L15.9743 0.354919H23.2257L13.4567 19.6628H3.67002V5.99822H0Z" />
      </g>
    ),
  };

  static readonly VROOM = new Icons('VROOM', {
    name: 'vroom',
    width: 116,
    height: 20,
    color: '#E7131A',
  });

  static readonly GOOGLE_PLAY = {
    name: 'google-play',
    width: 108,
    height: 32,
    fill: '#ffffff',
    getPath: (
      <g id="google-play" fill="#fff">
        <path d="m104 .64a3.35 3.35 0 0 1 3.36 3.36v24a3.35 3.35 0 0 1 -3.36 3.36h-100a3.35 3.35 0 0 1 -3.36-3.36v-24a3.35 3.35 0 0 1 3.36-3.36zm0-.64h-100a4 4 0 0 0 -4 4v24a4 4 0 0 0 4 4h100a4 4 0 0 0 4-4v-24a4 4 0 0 0 -4-4z" />
        <g stroke="#fff" strokeMiterlimit="10" strokeWidth=".2">
          <path d="m37.94 8.19a2.14 2.14 0 0 1 -.6 1.6 2.34 2.34 0 0 1 -1.76.71 2.48 2.48 0 0 1 -2.5-2.5 2.38 2.38 0 0 1 .73-1.78 2.42 2.42 0 0 1 1.77-.72 2.36 2.36 0 0 1 1 .2 2 2 0 0 1 .75.53l-.42.43a1.61 1.61 0 0 0 -1.31-.57 1.82 1.82 0 0 0 -1.32.53 1.88 1.88 0 0 0 -.57 1.38 1.84 1.84 0 0 0 .55 1.38 1.87 1.87 0 0 0 1.32.54 1.82 1.82 0 0 0 1.34-.54 1.49 1.49 0 0 0 .4-1h-1.74v-.55h2.32a2.47 2.47 0 0 1 .04.36z" />
          <path d="m41.62 6.19h-2.18v1.52h2v.58h-2v1.52h2.18v.59h-2.8v-4.8h2.8z" />
          <path d="m44.22 10.4h-.61v-4.21h-1.35v-.59h3.3v.59h-1.34z" />
          <path d="m48 10.4v-4.8h.62v4.8z" />
          <path d="m51.3 10.4h-.61v-4.21h-1.35v-.59h3.3v.59h-1.34z" />
          <path d="m58.89 9.78a2.51 2.51 0 0 1 -3.52 0 2.48 2.48 0 0 1 -.71-1.78 2.46 2.46 0 0 1 .71-1.78 2.35 2.35 0 0 1 1.76-.72 2.4 2.4 0 0 1 1.76.72 2.59 2.59 0 0 1 0 3.56zm-3.07-.4a1.78 1.78 0 0 0 1.31.53 1.74 1.74 0 0 0 1.3-.53 1.91 1.91 0 0 0 .57-1.38 1.87 1.87 0 0 0 -.54-1.38 1.75 1.75 0 0 0 -1.3-.54 1.79 1.79 0 0 0 -1.31.54 1.9 1.9 0 0 0 -.56 1.38 1.9 1.9 0 0 0 .53 1.38z" />
          <path d="m60.46 10.4v-4.8h.76l2.33 3.74v-.93-2.81h.62v4.8h-.64l-2.44-3.91v.93 3z" />
        </g>
        <path d="m54.51 17.4a3.4 3.4 0 1 0 3.42 3.4 3.35 3.35 0 0 0 -3.42-3.4zm0 5.46a2.07 2.07 0 1 1 1.92-2.06 2 2 0 0 1 -1.92 2.06zm-7.45-5.46a3.4 3.4 0 1 0 3.41 3.4 3.36 3.36 0 0 0 -3.41-3.4zm0 5.46a2 2 0 0 1 -1.92-2.06 1.92 1.92 0 1 1 1.92 2.06zm-8.87-4.41v1.44h3.46a3 3 0 0 1 -.79 1.81 3.48 3.48 0 0 1 -2.66 1.06 3.84 3.84 0 0 1 0-7.68 3.69 3.69 0 0 1 2.6 1l1-1a5 5 0 0 0 -3.63-1.46 5.29 5.29 0 1 0 0 10.58 4.67 4.67 0 0 0 4.94-4.86 4.7 4.7 0 0 0 -.08-.9h-4.84zm36.25 1.12a3.15 3.15 0 0 0 -2.91-2.17 3.24 3.24 0 0 0 -3.21 3.4 3.33 3.33 0 0 0 3.38 3.4 3.37 3.37 0 0 0 2.83-1.5l-1.16-.78a1.93 1.93 0 0 1 -1.67.94 1.73 1.73 0 0 1 -1.65-1l4.55-1.86zm-4.64 1.13a1.87 1.87 0 0 1 1.78-2 1.33 1.33 0 0 1 1.26.72zm-3.7 3.3h1.5v-10h-1.5zm-2.44-5.84h-.06a2.36 2.36 0 0 0 -1.79-.76 3.41 3.41 0 0 0 0 6.81 2.31 2.31 0 0 0 1.79-.78v.49a1.75 1.75 0 0 1 -1.82 2 1.89 1.89 0 0 1 -1.71-1.21l-1.3.55a3.22 3.22 0 0 0 3 2c1.75 0 3.23-1 3.23-3.54v-6.11h-1.35v.55zm-1.72 4.7a2 2 0 0 1 -1.9-2 2 2 0 0 1 1.9-2.08 1.92 1.92 0 0 1 1.81 2.08 1.88 1.88 0 0 1 -1.81 2zm19.51-8.86h-3.58v10h1.5v-3.79h2.09a3.11 3.11 0 1 0 0-6.21zm0 4.82h-2.09v-3.44h2.12a1.72 1.72 0 1 1 0 3.44zm9.23-1.44a2.8 2.8 0 0 0 -2.66 1.53l1.33.55a1.4 1.4 0 0 1 1.36-.73 1.42 1.42 0 0 1 1.59 1.27v.1a3.34 3.34 0 0 0 -1.56-.38c-1.43 0-2.88.78-2.88 2.24a2.31 2.31 0 0 0 2.48 2.2 2.11 2.11 0 0 0 1.91-1v.84h1.44v-3.85a2.74 2.74 0 0 0 -2.98-2.77zm-.18 5.48c-.49 0-1.17-.24-1.17-.84 0-.77.85-1.07 1.58-1.07a2.64 2.64 0 0 1 1.36.34 1.8 1.8 0 0 1 -1.74 1.57zm8.5-5.26-1.71 4.34-1.83-4.34h-1.61l2.66 6.06-1.51 3.34h1.56l4.11-9.43zm-13.45 6.4h1.5v-10h-1.5z" />
        <path d="m26.45 16a1.41 1.41 0 0 0 -.84-1.16s-15.91-9-16-9h-.18-.23a.59.59 0 0 0 -.19 0 .58.58 0 0 0 -.19 0 1 1 0 0 0 -.16.06 1.77 1.77 0 0 0 -.22.1 1.35 1.35 0 0 0 -.26.44.43.43 0 0 1 0 0 2 2 0 0 0 -.1.63v17.78a1.6 1.6 0 0 0 .27 1.15l.06.05a.67.67 0 0 0 .14.09.83.83 0 0 0 .16.09.47.47 0 0 0 .17 0 .78.78 0 0 0 .22 0h.15a1.94 1.94 0 0 0 .75-.23l15.59-8.87a1.41 1.41 0 0 0 .86-1.13zm-18.45-9.25a3.26 3.26 0 0 0 0 .33 3.26 3.26 0 0 1 0-.33z" />
      </g>
    ),
  };

  static readonly APPLE_STORE = {
    name: 'apple-store',
    width: 96,
    height: 32,
    fill: '#ffffff',
    getPath: (
      <g id="apple-store">
        <path
          d="M88.352.8h.864c.2 0 .4.008.592.008h.144c.496.008.992.048 1.48.128.456.08.896.224 1.296.424.824.424 1.48 1.072 1.896 1.888.208.408.344.84.424 1.296.08.488.128.984.136 1.48v.744c.016.288.016.576.016.864v16.744c0 .288 0 .576-.008.872v.72c-.008.496-.056.992-.136 1.488-.072.448-.216.888-.416 1.288-.208.4-.48.768-.808 1.096-.32.32-.688.592-1.088.792-.416.208-.848.352-1.304.432-.488.08-.992.128-1.496.128-.24.008-.48.008-.728.008H6.768c-.24 0-.48 0-.728-.008-.496-.008-1-.048-1.48-.128-.456-.08-.888-.224-1.296-.432-.408-.208-.776-.472-1.096-.8-.32-.32-.592-.68-.792-1.088-.208-.408-.352-.84-.424-1.296-.08-.488-.128-.984-.136-1.496-.008-.16-.008-.32-.016-.48V6.528c0-.16 0-.32.008-.504.008-.488.056-.984.136-1.472.072-.448.216-.888.424-1.296.208-.408.472-.768.8-1.088.32-.32.688-.592 1.096-.792.408-.216.84-.36 1.296-.432.488-.08.992-.128 1.488-.128H6.2C6.392.808 6.584.8 6.776.8h81.576zm0-.8H6.768c-.24 0-.488.008-.736.008-.536.008-1.072.056-1.608.144-.528.088-1.04.264-1.52.504s-.92.56-1.304.944c-.384.376-.696.816-.944 1.296-.24.48-.416.992-.504 1.52-.088.528-.136 1.064-.144 1.6 0 .248-.008.496-.008.736V25.24c0 .248.008.488.016.736.008.536.056 1.072.144 1.6s.256 1.048.504 1.52c.24.48.56.912.944 1.288.376.384.816.696 1.296.944.48.24.992.416 1.528.504.528.088 1.072.136 1.608.144.24.016.488.024.728.024H89.224c.248 0 .496 0 .736-.008.536-.008 1.072-.056 1.608-.144s1.048-.264 1.528-.504.92-.56 1.296-.944c.384-.376.704-.816.944-1.288.24-.48.408-.992.496-1.52.088-.528.136-1.064.152-1.6v-.736c.016-.296.016-.592.016-.888V7.632c0-.296 0-.584-.008-.872v-.736c-.008-.536-.056-1.072-.152-1.6-.088-.528-.256-1.04-.496-1.52-.496-.96-1.28-1.744-2.248-2.24-.48-.24-1-.408-1.528-.504C91.04.072 90.504.024 89.96.016c-.248 0-.496-.008-.736-.008C88.936 0 88.64 0 88.352 0z"
          fill="#fff"
        />
        <path
          d="M20.056 15.912c.016-1.408.76-2.712 1.968-3.456-.768-1.088-2-1.752-3.328-1.792-1.4-.144-2.76.832-3.472.832-.728 0-1.824-.824-3.008-.8-1.56.048-2.97599.912-3.72799 2.272-1.616 2.784-.408 6.88 1.136 9.128C10.4 23.2 11.304 24.432 12.48 24.384c1.16-.048 1.592-.736 2.984-.736 1.384 0 1.792.736 2.992.712 1.24-.024 2.024-1.104 2.768-2.224.552-.784.984-1.656 1.264-2.576-1.472-.608-2.432-2.048-2.432-3.648zM17.7761 9.184c.68-.808 1.008-1.856.928-2.904-1.032.112-1.992.6-2.672 1.384-.68.768-1.024 1.776-.952 2.8 1.04 0 2.04-.464 2.696-1.28zM33.9361 21.712h-3.8l-.912 2.688h-1.608l3.6-9.936h1.672l3.6 9.936h-1.632l-.92-2.688zm-3.4-1.24h3.008l-1.48-4.36h-.04l-1.488 4.36zM44.2481 20.776c0 2.248-1.208 3.696-3.032 3.696-.944.048-1.832-.44-2.288-1.264h-.032v3.584h-1.488v-9.64h1.44v1.208h.024c.472-.816 1.368-1.312 2.312-1.28 1.8559 0 3.064 1.448 3.064 3.696zm-1.528 0c0-1.464-.76-2.432-1.92-2.432-1.136 0-1.904.984-1.904 2.432 0 1.456.768 2.44 1.904 2.44 1.16 0 1.92-.96 1.92-2.44zM52.248 20.776c0 2.248-1.208 3.696-3.032 3.696-.944.048-1.832-.44-2.2879-1.264h-.0321v3.584h-1.4879v-9.64h1.44v1.208h.024c.472-.816 1.3679-1.312 2.3119-1.28 1.848 0 3.064 1.448 3.064 3.696zm-1.536 0c0-1.464-.76-2.432-1.92-2.432-1.1359 0-1.9039.984-1.9039 2.432 0 1.456.768 2.44 1.9039 2.44 1.16 0 1.92-.96 1.92-2.44zM57.528 21.632c.112.984 1.072 1.632 2.384 1.632 1.256 0 2.16-.648 2.16-1.536 0-.768-.544-1.232-1.84-1.552l-1.288-.312c-1.832-.44-2.68-1.296-2.68-2.68 0-1.712 1.496-2.888 3.624-2.888 2.104 0 3.552 1.176 3.6 2.888h-1.504c-.088-.992-.912-1.592-2.112-1.592-1.2 0-2.024.608-2.024 1.488 0 .704.528 1.112 1.808 1.432l1.096.272c2.048.48 2.896 1.304 2.896 2.752 0 1.856-1.48 3.024-3.848 3.024-2.208 0-3.704-1.136-3.8-2.936l1.528.008zM66.8642 15.44v1.712h1.384v1.176h-1.384v3.992c0 .624.28.912.88.912.16 0 .328-.016.488-.032v1.168c-.272.048-.552.072-.832.072-1.472 0-2.048-.552-2.048-1.952v-4.152h-1.056V17.16h1.056v-1.72h1.512zM69.0481 20.776c0-2.28 1.344-3.712 3.448-3.712s3.448 1.432 3.448 3.712c0 2.288-1.336 3.712-3.448 3.712-2.12 0-3.448-1.424-3.448-3.712zm5.368 0c0-1.56-.72-2.488-1.928-2.488s-1.928.928-1.928 2.488c0 1.568.72 2.488 1.928 2.488s1.928-.92 1.928-2.488zM77.168 17.152h1.424v1.232h.032c.2-.792.928-1.336 1.744-1.312.168 0 .344.016.512.056v1.392c-.216-.064-.44-.096-.672-.088-.832-.032-1.528.608-1.56 1.44 0 .08 0 .152.008.232V24.4h-1.488v-7.248zM87.752 22.272c-.2 1.312-1.488 2.216-3.128 2.216-2.112 0-3.424-1.408-3.424-3.68 0-2.272 1.32-3.744 3.36-3.744 2.008 0 3.272 1.376 3.272 3.576v.512h-5.128v.088c-.096 1.04.68 1.952 1.72 2.048.08.008.16.008.24.008.72.064 1.408-.344 1.68-1.016l1.408-.008zm-5.04-2.168h3.632c.056-.96-.68-1.784-1.648-1.832h-.136c-1.016-.008-1.84.808-1.848 1.824v.008zM30.3441 6.984c1.168-.08 2.184.79201 2.264 1.952.008.13601.008.28-.008.416 0 1.528-.824 2.4-2.256 2.4h-1.728V6.984h1.728zm-.984 4.096h.904c.832.048 1.544-.584 1.592-1.408.008-.104 0-.208-.016-.312.112-.824-.464-1.584-1.288-1.696-.096-.016-.192-.016-.288-.008h-.904v3.424zM33.4402 9.952c-.088-.936.6-1.768 1.544-1.864.944-.088 1.776.6 1.864 1.536.008.112.008.216 0 .328.088.936-.6 1.776-1.536 1.864-.944.088-1.776-.592-1.872-1.536-.016-.104-.016-.216 0-.328zm2.672 0c0-.784-.352-1.24-.968-1.24s-.968.456-.968 1.24.352 1.24.968 1.24.968-.456.968-1.24zM41.376 11.76h-.736l-.744-2.656h-.056l-.744 2.656h-.736l-.992-3.6h.72l.648 2.752h.056l.744-2.752h.68l.744 2.752h.056l.64-2.752h.712l-.992 3.6zM43.2 8.152h.688v.576h.056c.184-.424.616-.68 1.08-.64.648-.048 1.208.432 1.256 1.08.008.088 0 .176-.008.256v2.328h-.712V9.6c0-.576-.256-.864-.776-.864-.456-.024-.848.328-.864.784v2.232h-.72v-3.6zM47.4081 6.752h.712v5.008h-.712V6.752zM49.1121 9.952c-.088-.936.6-1.768 1.544-1.864.944-.088 1.776.6 1.864 1.536.008.112.008.216 0 .328.088.936-.6 1.776-1.536 1.864-.944.088-1.776-.592-1.872-1.536-.008-.104-.008-.216 0-.328zm2.672 0c0-.784-.352-1.24-.968-1.24s-.968.456-.968 1.24.352 1.24.968 1.24.968-.456.968-1.24zM53.272 10.736c0-.648.488-1.024 1.344-1.072l.976-.056v-.312c0-.384-.256-.592-.736-.592-.4 0-.672.144-.752.4h-.688c.072-.616.656-1.016 1.48-1.016.904 0 1.416.448 1.416 1.208v2.464h-.688v-.504h-.056c-.232.368-.648.584-1.088.568-.6.064-1.136-.376-1.2-.968-.008-.048-.008-.08-.008-.12zm2.32-.304v-.304l-.88.056c-.496.032-.72.2-.72.52 0 .328.28.512.672.512.464.048.888-.296.936-.76-.008-.008-.008-.016-.008-.024zM57.2401 9.952c0-1.136.5839-1.856 1.4959-1.856.464-.024.896.224 1.104.632h.056V6.752h.712v5.008h-.68v-.568h-.056c-.232.4-.672.648-1.136.632-.92-.008-1.4959-.728-1.4959-1.872zm.7359 0c0 .768.36 1.224.968 1.224.6 0 .976-.464.976-1.224 0-.752-.376-1.224-.976-1.224-.6.008-.968.472-.968 1.224zM63.56 9.952c-.088-.936.6-1.768 1.544-1.864.944-.096 1.776.6 1.864 1.536.008.112.008.216 0 .328.088.936-.6 1.776-1.536 1.864-.944.088-1.776-.592-1.872-1.536-.008-.104-.008-.216 0-.328zm2.672 0c0-.784-.352-1.24-.968-1.24s-.968.456-.968 1.24.352 1.24.968 1.24c.624 0 .968-.456.968-1.24zM67.9282 8.152h.688v.576h.056c.184-.424.616-.68 1.08-.64.648-.048 1.208.432 1.256 1.08.008.088 0 .176-.008.256v2.328h-.712V9.6c0-.576-.256-.864-.776-.864-.456-.024-.848.328-.864.784v2.232h-.712v-3.6h-.008zM75.024 7.256v.912h.784v.6h-.784v1.856c0 .376.152.544.512.544.088 0 .184-.008.272-.016v.592c-.128.024-.256.032-.384.04-.792 0-1.112-.28-1.112-.976V8.776h-.576v-.6h.576v-.92h.712zM76.7761 6.752h.704v1.984h.056c.192-.424.632-.68 1.104-.648.656-.032 1.216.464 1.256 1.12.008.072 0 .152-.008.224v2.328h-.712V9.608c0-.576-.272-.864-.776-.864-.464-.04-.872.304-.912.768v2.248h-.712V6.752zM84.048 10.784c-.2.68-.856 1.12-1.568 1.04-.904.024-1.656-.688-1.68-1.592 0-.088 0-.176.016-.264-.12-.912.52-1.744 1.432-1.864.08-.008.16-.016.232-.016 1.008 0 1.608.688 1.608 1.816v.248h-2.552v.04c-.048.528.344.984.872 1.032h.088c.352.04.688-.128.856-.44h.696zm-2.512-1.16h1.824c.032-.48-.328-.896-.808-.928h-.088c-.512-.008-.928.4-.936.912.008 0 .008.008.008.016z"
          fill="#fff"
        />
      </g>
    ),
  };

  static readonly FACEBOOK = {
    name: 'facebook',
    width: 24,
    height: 24,
    fill: '#FFFFFF',
    getPath: (
      <path
        id="facebook"
        d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m13 2h-2.5A3.5 3.5 0 0 0 12 8.5V11h-2v3h2v7h3v-7h3v-3h-3V9a1 1 0 0 1 1-1h2V5z"
      />
    ),
  };

  static readonly TWITTER = {
    name: 'twitter',
    width: 24,
    height: 24,
    fill: '#FFFFFF',
    getPath: (
      <path
        id="twitter"
        d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"
      />
    ),
  };

  static readonly INSTAGRAM = {
    name: 'instagram',
    width: 24,
    height: 24,
    fill: '#FFFFFF',
    getPath: (
      <path
        id="instagram"
        d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"
      />
    ),
  };

  static readonly ARROW_DOWN = {
    name: 'arrow-down',
    width: 24,
    height: 24,
    fill: '#FFFFFF',
    getPath: (
      <path id="arrow-down" d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
    ),
  };

  static readonly CAR_OFFER = {
    name: 'car-offer',
    width: 90,
    height: 90,
    getPath: (
      <>
        <mask
          id="mask0"
          mask-type="alpha"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="88"
          height="76"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M63.6318 0.874756L59.0268 26.9913L68.7783 38.1513L82.4643 26.9913L87.0693 0.874756H63.6318ZM63.0611 25.384L66.7203 4.62476H82.6578L78.9978 25.384L69.6903 32.974L63.0611 25.384ZM22.8882 22.9061L12.5719 42.4406L3.27415 50.7558L2.4319 55.5318L1.7044 59.6568L0.250153 67.9061H5.12515L3.7204 75.8748H18.7197L20.1252 67.9061H55.3752L53.9697 75.8748H68.9697L70.3752 67.9061H75.2502L76.7374 59.4686L77.3989 55.7186L78.2592 50.8406L72.4504 41.5623H17.0112L24.8832 26.6561H55.3362L55.9977 22.9061H22.8882ZM6.76166 52.2446L14.5122 45.3131H69.9904L74.2767 52.1591L73.6489 55.7186H58.6489L57.9874 59.4686H72.9882L72.1609 64.1561H4.66091L5.45516 59.6568H20.4544L21.1819 55.5318H6.18191L6.76166 52.2446ZM59.1251 67.9061H66.6251L65.8811 72.1248H58.3811L59.1251 67.9061ZM8.87514 67.9061H16.3751L15.6311 72.1248H8.13114L8.87514 67.9061ZM70.4383 18.9524C70.5741 19.7721 71.192 20.1816 72.1835 20.1816C73.0895 20.1816 73.7908 19.7504 73.916 19.0394C74.0338 18.3704 73.6701 18.1116 72.8241 17.8964L70.7766 17.4006C69.0845 16.9694 67.829 16.0199 68.2206 13.7991C68.5858 11.7291 70.2928 10.2419 72.5345 9.87512L72.8811 7.91313H75.6403L75.2833 9.93962C77.1658 10.3926 78.0508 11.7291 78.0553 13.5411H74.864C74.6975 12.8939 74.1995 12.4191 73.229 12.4191C72.3448 12.4191 71.6863 12.8511 71.5731 13.4976C71.4696 14.0796 71.7876 14.3601 72.425 14.5326L74.6728 15.1146C76.6948 15.6321 77.6278 16.8186 77.2745 18.8234C76.898 20.9579 75.1888 22.3379 73.025 22.7481L72.668 24.7746H69.9073L70.2688 22.7264C68.2498 22.3169 67.0588 21.0014 67.0745 18.9524H70.4383Z"
            fill="white"
          />
        </mask>
        <g mask="url(#mask0)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M-2 83H88V-7H-2V83Z"
            fill="#E7131A"
          />
        </g>
      </>
    ),
  };

  static readonly RED_ONE = {
    name: 'red-one',
    width: 16,
    height: 16,
    getPath: (
      <>
        <defs></defs>
        <g
          id="Style-Guide"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g
            id="style-guide---icons"
            transform="translate(-972.000000, -280.000000)"
            fill="#E7131A"
          >
            <g id="icons" transform="translate(49.000000, 226.000000)">
              <g id="#1-red" transform="translate(923.000000, 54.000000)">
                <g id="Group">
                  <path
                    d="M7.52704,1.448448 C4.17504,1.448448 1.44704,4.176448 1.44704,7.526848 C1.44704,10.880448 4.17504,13.606848 7.52704,13.606848 C10.87904,13.606848 13.60704,10.880448 13.60704,7.526848 C13.60704,4.176448 10.87904,1.448448 7.52704,1.448448 M7.52704,15.054848 C3.37664,15.054848 0.00064,11.678848 0.00064,7.526848 C0.00064,3.376448 3.37664,0.000448 7.52704,0.000448 C11.67744,0.000448 15.05344,3.376448 15.05344,7.526848 C15.05344,11.678848 11.67744,15.054848 7.52704,15.054848"
                    id="Fill-1"
                  ></path>
                  <polygon
                    id="Fill-4"
                    points="8.50672 11.454688 6.90832 11.454688 6.90832 5.467488 5.07792 6.376288 5.07792 4.776288 7.47152 3.600288 8.50672 3.600288"
                  ></polygon>
                </g>
              </g>
            </g>
          </g>
        </g>
      </>
    ),
  };

  static readonly CHECK_MARK_RED = new Icons('CHECK_MARK_RED', {
    name: 'check-mark-red',
    width: 16,
    height: 16,
    path: `${BASE_PATH}/icons/check-mark-red.svg`,
  });

  static readonly CHECK_MARK_WHITE = {
    name: 'check-mark-white',
    width: 20,
    height: 20,
    getPath: (
      <g fill="none" fillRule="evenodd" stroke="#FFF">
        <path d="M18.715 10.174a8.796 8.796 0 0 1-8.796 8.797 8.797 8.797 0 1 1 8.796-8.796z" />
        <path d="M14.317 7.975l-5.131 5.626-3.665-3.666" />
      </g>
    ),
  };

  static readonly CHECK_MARK_GREEN = {
    name: 'check-mark-green',
    width: 12,
    height: 10,
    getPath: (
      <>
        <rect
          width="2.46726"
          height="5.75693"
          transform="matrix(0.729523 -0.683956 0.729523 0.683956 0 5.5625)"
          fill="#308406"
        />
        <rect
          width="10.6914"
          height="2.46726"
          transform="matrix(0.729523 -0.683956 0.729523 0.683956 2.40039 7.8125)"
          fill="#308406"
        />
      </>
    ),
  };

  static readonly CHEVRON_UP = {
    name: 'chevron-up',
    width: 13,
    height: 8,
    getPath: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.3249 8L6.31787 3.00798L11.2452 7.93534L12.5703 6.61026L6.31787 0.357809L-0.00111675 6.67492L1.3249 8Z"
        fill="#041022"
      />
    ),
  };

  static readonly CHEVRON_DOWN = {
    name: 'chevron-down',
    width: 13,
    height: 8,
    getPath: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.2454 0L6.25245 4.99202L1.32508 0.0646611L0 1.38974L6.25245 7.64219L12.5714 1.32508L11.2454 0Z"
        fill="#041022"
      />
    ),
  };

  static readonly PLAID_LOGO = {
    name: 'plaid-logo',
    width: 68,
    height: 23,
    getPath: (
      <>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M33.124 8.13376C32.5955 7.68936 31.6936 7.46716 30.4175 7.46716H27.5396V16.3612H29.6915V13.5741H30.6556C31.8256 13.5741 32.6836 13.3166 33.2296 12.801C33.8451 12.2233 34.1541 11.4541 34.1541 10.4941C34.1541 9.49878 33.8105 8.71199 33.124 8.13376ZM30.6021 11.5612H29.6915V9.4806H30.5096C31.5046 9.4806 32.0021 9.82955 32.0021 10.5275C32.0021 11.2163 31.5351 11.5612 30.6021 11.5612Z"
          fill="#041022"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M37.8367 7.46704H35.5927V16.3611H40.4377V14.3477H37.8367V7.46704Z"
          fill="#041022"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M44.834 7.46704L41.309 16.3611H43.725L44.187 15.0678H47.25L47.6725 16.3611H50.1155L46.616 7.46704H44.834ZM44.8075 13.2675L45.732 10.2274L46.6425 13.2675H44.8075Z"
          fill="#041022"
        />
        <mask
          id="mask0"
          mask-type="alpha"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="63"
          height="24"
        >
          <path d="M0 23.7369H63V0.000366211H0V23.7369Z" fill="white" />
        </mask>
        <g mask="url(#mask0)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M51.2368 16.3611H53.4813V7.46704H51.2368V16.3611Z"
            fill="#041022"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M62.1951 9.13417C61.8956 8.70744 61.5391 8.36556 61.1256 8.1075C60.4481 7.68078 59.5236 7.46716 58.3531 7.46716H55.3961V16.3612H58.8551C60.1046 16.3612 61.1081 15.9527 61.8651 15.1346C62.6221 14.317 63 13.2322 63 11.8809C63 10.8057 62.7315 9.89015 62.1951 9.13417ZM58.6041 14.3478H57.6406V9.4806H58.6176C59.3041 9.4806 59.8316 9.69522 60.2016 10.124C60.5711 10.5527 60.7561 11.1607 60.7561 11.9475C60.7561 13.5479 60.0391 14.3478 58.6041 14.3478Z"
            fill="#041022"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.31833 0.00012207L2.04433 1.90498L0.0403286 9.2194L2.54733 11.7934L-0.000671387 14.325L1.88583 21.6717L9.12783 23.6952L11.6758 21.1632L14.1828 23.7366L21.4563 21.8318L23.4603 14.5163L20.9538 11.9434L23.5013 9.41181L21.6153 2.06507L14.3723 0.0415321L11.8253 2.5731L9.31833 0.00012207ZM4.85433 3.31191L8.68583 2.30797L10.3613 4.028L7.91783 6.45604L4.85433 3.31191ZM13.2653 4.05123L14.9678 2.35948L18.7828 3.42554L15.6693 6.51917L13.2653 4.05123ZM2.33583 8.61896L3.39133 4.76631L6.45383 7.91044L4.01083 10.3385L2.33583 8.61896ZM17.1093 7.9973L20.2228 4.90317L21.2158 8.77349L19.5138 10.4652L17.1093 7.9973ZM9.35833 7.93418L11.8018 5.50614L14.2053 7.97407L11.7623 10.4021L9.35833 7.93418ZM5.45133 11.8166L7.89433 9.38858L10.2988 11.8565L7.85533 14.2846L5.45133 11.8166ZM13.2028 11.8802L15.6458 9.45221L18.0498 11.9201L15.6063 14.3482L13.2028 11.8802ZM2.28483 14.9633L3.98783 13.271L6.39133 15.7395L3.27883 18.8326L2.28483 14.9633ZM9.29533 15.7627L11.7388 13.3346L14.1428 15.8026L11.6998 18.2306L9.29533 15.7627ZM17.0463 15.8263L19.4898 13.3983L21.1653 15.1178L20.1098 18.9704L17.0463 15.8263ZM4.71833 20.3112L7.83133 17.2171L10.2358 19.685L8.53333 21.3773L4.71833 20.3112ZM13.1398 19.7088L15.5828 17.2807L18.6458 20.4248L14.8148 21.4283L13.1398 19.7088Z"
            fill="#041022"
          />
        </g>
      </>
    ),
  };

  static readonly LOCK = {
    name: 'lock',
    width: 16,
    height: 16,
    getPath: (
      <>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.0428 2.47395C11.747 2.99078 12.1661 3.94968 12.0683 5.00342H6.10219C6.20121 4.50307 6.41868 3.99016 6.77829 3.50019C7.98987 1.84941 9.93354 1.65982 11.0428 2.47395ZM4.0835 5.00342C4.19971 4.07669 4.55701 3.1465 5.16595 2.31683C6.91439 -0.0654359 10.0754 -0.716958 12.2262 0.86161C13.5353 1.82245 14.1684 3.38804 14.0692 5.00342H16L14 16.0034H0L2 5.00342H4.0835ZM2.43961 13.8034L3.63961 7.20342H13.5604L12.3604 13.8034H2.43961Z"
          fill="#041022"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.6517 10.2619C8.86495 10.0785 9 9.80674 9 9.50342C9 8.95113 8.55228 8.50342 8 8.50342C7.44772 8.50342 7 8.95113 7 9.50342C7 9.75156 7.09038 9.97859 7.24001 10.1534L6.5 12.0034H9L8.6517 10.2619Z"
          fill="#041022"
        />
      </>
    ),
  };

  static readonly CALL_US = {
    name: 'call-us',
    width: 18,
    height: 18,
    getPath: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.83103 2.55602C3.1993 1.04981 4.46457 0 5.91165 0H12.7404L10.6167 6.85714H7.45792L6.32024 11.1429H9.86814L8.27538 18H3.18721C1.09856 18 -0.42496 15.8729 0.106588 13.6989L2.83103 2.55602ZM5.91165 1.71429C5.18811 1.71429 4.55548 2.23919 4.37134 2.9923L1.6469 14.1352C1.38112 15.2222 2.14288 16.2857 3.18721 16.2857H7.0318L7.82818 12.8571H4.20869L6.25651 5.14286H9.46873L10.5306 1.71429H5.91165ZM16.3218 10.0065C16.5978 7.87745 16.2217 5.66104 14.9887 3.95481L16.246 2.90234C17.8003 5.05325 18.2206 7.76541 17.8993 10.2435C17.5794 12.711 16.5102 15.0604 14.9411 16.5079L13.9045 15.2063C15.1227 14.0825 16.0444 12.1462 16.3218 10.0065ZM12.934 9.39241C13.0185 8.52833 12.8396 7.77489 12.5656 7.3326L13.8908 6.38168C14.4133 7.22511 14.6325 8.40024 14.518 9.57187C14.4017 10.7608 13.9354 12.0224 12.995 13.0347L11.8687 11.8225C12.521 11.1204 12.8511 10.2392 12.934 9.39241Z"
        fill="#041022"
      />
    ),
  };

  static readonly CALENDAR = {
    name: 'calendar',
    width: 24,
    height: 24,
    getPath: (
      <>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19 3H20C21.1 3 22 3.9 22 5V21C22 22.1 21.1 23 20 23H4C2.9 23 2 22.1 2 21V5C2 3.9 2.9 3 4 3H5V1H7V3H17V1H19V3ZM4 21H20V8H4V21Z"
          fill="#1960D0"
        />
      </>
    ),
  };

  static readonly SECURE_LOCK = {
    name: 'secure-lock',
    width: 24,
    height: 24,
    getPath: (
      <>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17 8H18C19.1 8 20 8.9 20 10V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V10C4 8.9 4.9 8 6 8H7V6C7 3.24 9.24 1 12 1C14.76 1 17 3.24 17 6V8ZM12 3C10.34 3 9 4.34 9 6V8H15V6C15 4.34 13.66 3 12 3ZM6 20V10H18V20H6ZM14 15C14 16.1 13.1 17 12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15Z"
          fill="#1960D0"
        />
      </>
    ),
  };

  static readonly PEOPLE = {
    name: 'people',
    width: 24,
    height: 24,
    getPath: (
      <>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.5 8.53C12.5 10.4669 10.93 12.0424 9 12.0424C7.07 12.0424 5.5 10.4669 5.5 8.53C5.5 6.59315 7.07 5.01758 9 5.01758C10.93 5.01758 12.5 6.59315 12.5 8.53ZM10.5 8.53C10.5 7.69706 9.83 7.02468 9 7.02468C8.17 7.02468 7.5 7.69706 7.5 8.53C7.5 9.36295 8.17 10.0353 9 10.0353C9.83 10.0353 10.5 9.36295 10.5 8.53ZM9 13.7986C6.66 13.7986 2 14.9728 2 17.3111V19.0673H16V17.3111C16 14.9728 11.34 13.7986 9 13.7986ZM9 15.8057C7.21 15.8057 5.18 16.4757 4.34 17.0557H13.66C12.82 16.4757 10.79 15.8057 9 15.8057ZM16.04 13.8589C17.2 14.7018 18 15.8258 18 17.3111V19.0673H22V17.3111C22 15.2839 18.5 14.1298 16.04 13.8589ZM18.5 8.53C18.5 10.4669 16.93 12.0424 15 12.0424C14.46 12.0424 13.96 11.912 13.5 11.6912C14.13 10.798 14.5 9.70416 14.5 8.53C14.5 7.35585 14.13 6.26198 13.5 5.36882C13.96 5.14804 14.46 5.01758 15 5.01758C16.93 5.01758 18.5 6.59315 18.5 8.53Z"
          fill="#1960D0"
        />
      </>
    ),
  };

  static readonly PLAID_LOGO_GRAY = {
    name: 'plaid-logo-gray',
    width: 63,
    height: 24,
    getPath: (
      <>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M33.1241 8.13389C32.5956 7.68948 31.6936 7.46729 30.4176 7.46729H27.5396V16.3613H29.6916V13.5743H30.6556C31.8256 13.5743 32.6836 13.3167 33.2296 12.8011C33.8451 12.2234 34.1541 11.4543 34.1541 10.4943C34.1541 9.4989 33.8106 8.71211 33.1241 8.13389ZM30.6021 11.5613H29.6916V9.48072H30.5096C31.5046 9.48072 32.0021 9.82968 32.0021 10.5276C32.0021 11.2164 31.5351 11.5613 30.6021 11.5613Z"
          fill="#999DA3"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M37.8368 7.46729H35.5928V16.3613H40.4378V14.3479H37.8368V7.46729Z"
          fill="#999DA3"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M44.8341 7.46729L41.3091 16.3613H43.7251L44.1871 15.068H47.2501L47.6726 16.3613H50.1156L46.6161 7.46729H44.8341ZM44.8076 13.2677L45.7321 10.2276L46.6426 13.2677H44.8076Z"
          fill="#999DA3"
        />
        <mask
          id="mask0"
          mask-type="alpha"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="63"
          height="24"
        >
          <path d="M0 23.737H63V0.000488281H0V23.737Z" fill="white" />
        </mask>
        <g mask="url(#mask0)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M51.2368 16.3613H53.4813V7.46729H51.2368V16.3613Z"
            fill="#999DA3"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M62.195 9.13429C61.8955 8.70756 61.539 8.36568 61.1255 8.10763C60.448 7.6809 59.5235 7.46729 58.353 7.46729H55.396V16.3613H58.855C60.1045 16.3613 61.108 15.9528 61.865 15.1347C62.622 14.3171 63 13.2324 63 11.881C63 10.8058 62.7315 9.89027 62.195 9.13429ZM58.604 14.3479H57.6405V9.48072H58.6175C59.304 9.48072 59.8315 9.69534 60.2015 10.1241C60.571 10.5528 60.756 11.1609 60.756 11.9476C60.756 13.548 60.039 14.3479 58.604 14.3479Z"
            fill="#999DA3"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.31851 0.000488281L2.04451 1.90535L0.0405117 9.21977L2.54751 11.7938L-0.000488281 14.3253L1.88601 21.6721L9.12801 23.6956L11.676 21.1635L14.183 23.737L21.4565 21.8321L23.4605 14.5167L20.954 11.9437L23.5015 9.41217L21.6155 2.06543L14.3725 0.0418983L11.8255 2.57346L9.31851 0.000488281ZM4.85451 3.31228L8.68601 2.30834L10.3615 4.02837L7.91801 6.45641L4.85451 3.31228ZM13.2655 4.0516L14.968 2.35985L18.783 3.4259L15.6695 6.51953L13.2655 4.0516ZM2.33601 8.61932L3.39151 4.76668L6.45401 7.91081L4.01101 10.3388L2.33601 8.61932ZM17.1095 7.99767L20.223 4.90353L21.216 8.77385L19.514 10.4656L17.1095 7.99767ZM9.35851 7.93454L11.802 5.5065L14.2055 7.97444L11.7625 10.4025L9.35851 7.93454ZM5.45151 11.817L7.89451 9.38894L10.299 11.8569L7.85551 14.2849L5.45151 11.817ZM13.203 11.8806L15.646 9.45257L18.05 11.9205L15.6065 14.3485L13.203 11.8806ZM2.28501 14.9636L3.98801 13.2714L6.39151 15.7398L3.27901 18.8329L2.28501 14.9636ZM9.29551 15.7631L11.739 13.335L14.143 15.8029L11.7 18.231L9.29551 15.7631ZM17.0465 15.8267L19.49 13.3986L21.1655 15.1182L20.11 18.9708L17.0465 15.8267ZM4.71851 20.3116L7.83151 17.2175L10.236 19.6854L8.53351 21.3776L4.71851 20.3116ZM13.14 19.7091L15.583 17.2811L18.646 20.4252L14.815 21.4286L13.14 19.7091Z"
            fill="#999DA3"
          />
        </g>
      </>
    ),
  };

  static readonly CHECK_MARK_GREEN_DOCS = {
    name: 'check-mark-green',
    width: 12,
    height: 10,
    getPath: (
      <>
        <rect
          width="2.46726"
          height="5.75693"
          transform="matrix(0.729523 -0.683956 0.729523 0.683956 0 5.5625)"
          fill="#308406"
        />
        <rect
          width="10.6914"
          height="2.46726"
          transform="matrix(0.729523 -0.683956 0.729523 0.683956 2.40039 7.8125)"
          fill="#308406"
        />
      </>
    ),
  };

  static readonly VROOM_TRUCK = {
    name: 'vroom-truck',
    width: 640,
    height: 225,
    getPath: (
      <>
        <rect
          x="195.254"
          width="393.467"
          height="127.303"
          fill="url(#pattern0)"
        />
        <rect width="640" height="225" fill="url(#pattern1)" />
        <defs>
          <pattern
            id="pattern0"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use
              xlinkHref="#image0"
              transform="translate(0 -0.00297151) scale(0.00168634 0.00521214)"
            />
          </pattern>
          <pattern
            id="pattern1"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use
              xlinkHref="#image1"
              transform="translate(-0.00151569) scale(0.000501516 0.00142653)"
            />
          </pattern>
        </defs>
      </>
    ),
  };

  static readonly ClOSE_LARGE = new Icons('CLOSE_LARGE', {
    name: 'close-large',
    width: 44,
    height: 44,
  });

  static readonly EMAIL_MODAL_CLOSE = new Icons('EMAIL_MODAL_CLOSE', {
    name: 'email-modal-close',
    width: 12,
    height: 12,
    path: `${BASE_PATH}/icons/email-close.svg`,
  });

  static readonly EMAIL_All_SET = new Icons('EMAIL_All_SET', {
    name: 'email-modal-close',
    width: 48,
    height: 48,
    path: `${BASE_PATH}/icons/email-all-set.svg`,
  });

  static readonly CHECKMARK_CIRCLE = new Icons('CHECKMARK_CIRCLE', {
    name: 'checkmark-circle',
    width: 13,
    height: 13,
  });

  static readonly ERROR = new Icons('ERROR', {
    name: 'error',
    width: 13,
    height: 13,
  });

  static readonly QUESTION_CIRCLE = new Icons('QUESTION_CIRCLE', {
    name: 'question-circle',
    width: 13,
    height: 13,
    path: `${BASE_PATH}/icons/question-circle.svg`,
  });

  static readonly TOOLTIP = new Icons('TOOLTIP', {
    name: 'tooltip',
    width: 13,
    height: 13,
  });
  static readonly SUCCESS_ICON = {
    name: 'checkmark-circle-success',
    width: 13,
    height: 13,
    fill: 'rgb(48, 132, 6)',
    getPath: (
      <g fillRule="evenodd">
        <path d="M6.5 1A5.506 5.506 0 0 0 1 6.5C1 9.532 3.467 12 6.5 12S12 9.532 12 6.5 9.533 1 6.5 1m0 12A6.508 6.508 0 0 1 0 6.5C0 2.916 2.916 0 6.5 0S13 2.916 13 6.5 10.084 13 6.5 13"></path>
        <path d="M6.017 9.56l-2.87-2.87.707-.707 2.13 2.13 3.147-3.45.739.673z"></path>
      </g>
    ),
  };
  static readonly ERROR_ICON = {
    name: 'error',
    width: 13,
    height: 13,
    fill: '#58595b',
    getPath: (
      <>
        <g fill="none" fillRule="evenodd">
          <circle cx="6.5" cy="6.5" r="6" stroke="#f26900"></circle>
          <path
            fill="#f26900"
            d="M5.611 10.235h1.766V8.373H5.611v1.862zM7.01 7.443l-.997.215-.53-4.893h2.036l-.51 4.678z"
          ></path>
        </g>
      </>
    ),
  };

  private constructor(
    protected key: string,
    public readonly value: {
      name: string;
      width: number;
      height: number;
      color?: string;
      path?: string;
    }
  ) {}
}

interface Props {
  icon: Icons;
  color?: string;
  className?: string;
  onClick?: () => void;
}

const Icon: React.FC<Props> = ({ icon, color, className, onClick }) => {
  const path = icon.value.path;
  const width = icon.value.width;
  const height = icon.value.height;
  const name = icon.value.name;
  const iconColor = icon.value.color ? icon.value.color : '#041022';
  const fill = color ? color : iconColor;
  const file = `${BASE_PATH}/icons/icons.svg`;
  const id = `#${name}`;
  const xlinkHref = `${file}${id}`;

  const onKeyDown = (event: any) => (): void => {
    const key = event.key;

    if (key === 'Enter' && onClick) {
      onClick();
    }
  };

  return (
    <>
      {path ? (
        <img
          className={className}
          width={width}
          height={height}
          src={path}
          onClick={onClick}
          alt={name}
          onKeyDown={onKeyDown}
          role="presentation"
        />
      ) : (
        <svg
          className={className}
          onClick={onClick}
          fill={fill}
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
        >
          <use xlinkHref={xlinkHref} />
        </svg>
      )}
    </>
  );
};

export default Icon;
