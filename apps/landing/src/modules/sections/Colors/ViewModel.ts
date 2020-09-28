import getConfig from 'next/config';

const {
  publicRuntimeConfig: { BASE_PATH },
} = getConfig();

class ColorsViewModel {
  readonly sectionTitle = 'available color';

  readonly colors = [
    {
      name: 'Firecracker Red',
      picture: {
        alt: 'Firecracker Red',
        src: `${BASE_PATH}/images/Hero-Jeep-image.png`,
        width: '113.5px',
        height: '64px',
        objectFit: 'cover',
      },
    },
    {
      name: 'Bikini Pearlcoat',
      picture: {
        alt: 'Bikini Pearlcoat',
        src: `${BASE_PATH}/images/Bikini Pearlcoat.png`,
        width: '113.5px',
        height: '64px',
        objectFit: 'cover',
      },
    },
    {
      name: 'Billet Silver Metallic',
      picture: {
        alt: 'Billet Silver Metallic',
        src: `${BASE_PATH}/images/Billet Silver Metallic.png`,
        width: '113.5px',
        height: '64px',
        objectFit: 'cover',
      },
    },
    {
      name: 'Hellayella',
      picture: {
        alt: 'Hellayella',
        src: `${BASE_PATH}/images/Hellayella.png`,
        width: '113.5px',
        height: '64px',
        objectFit: 'cover',
      },
    },
    {
      name: 'Ocean Blue Metallic',
      picture: {
        alt: 'Ocean Blue Metallic',
        src: `${BASE_PATH}/images/Ocean Blue Metallic.png`,
        width: '113.5px',
        height: '64px',
        objectFit: 'cover',
      },
    },
    {
      name: 'Black',
      picture: {
        alt: 'Black',
        src: `${BASE_PATH}/images/Black.png`,
        width: '113.5px',
        height: '64px',
        objectFit: 'cover',
      },
    },
    {
      name: 'Granite Crystal Metallic',
      picture: {
        alt: 'Granite Crystal Metallic',
        src: `${BASE_PATH}/images/Granite Crystal Metallic.png`,
        width: '113.5px',
        height: '64px',
        objectFit: 'cover',
      },
    },
    {
      name: 'Mojito!',
      picture: {
        alt: 'Mojito!',
        src: `${BASE_PATH}/images/Mojito!.png`,
        width: '113.5px',
        height: '64px',
        objectFit: 'cover',
      },
    },
    {
      name: 'Bright White',
      picture: {
        alt: 'Bright White',
        src: `${BASE_PATH}/images/Bright White.png`,
        width: '113.5px',
        height: '64px',
        objectFit: 'cover',
      },
    },
    {
      name: 'Sting-Gray',
      picture: {
        alt: 'Sting-Gray',
        src: `${BASE_PATH}/images/Sting-Gray.png`,
        width: '113.5px',
        height: '64px',
        objectFit: 'cover',
      },
    },
    {
      name: 'Punk’n Metallic',
      picture: {
        alt: 'Punk’n Metallic',
        src: `${BASE_PATH}/images/Punk’n Mettalic.png`,
        width: '113.5px',
        height: '64px',
        objectFit: 'cover',
      },
    },
  ];
}

export default ColorsViewModel;
