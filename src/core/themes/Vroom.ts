export interface ThemeProps {
  typography: {
    family: {
      hero: string;
      title: string;
      body: string;
    };
    color: string;
  };
  colors: {
    primary: {
      brand: string;
      black: string;
      white: string;
    };
    secondary: {
      brand: string;
      success: string;
      error: string;
      warning: string;
    };
    gray: {
      one: string;
      two: string;
      three: string;
      four: string;
    };
  };
}

export const theme: ThemeProps = {
  typography: {
    family: {
      hero: 'Vroom-Sans',
      title: 'Calibre',
      body: 'Calibre',
    },
    color: '#041022',
  },
  colors: {
    primary: {
      brand: '#E7131A',
      black: '#041022',
      white: '#FFFFFF',
    },
    secondary: {
      brand: '#1960D0',
      success: '#308406',
      error: '#F26900',
      warning: '#FFD400',
    },
    gray: {
      one: '#6C717A',
      two: '#999DA3',
      three: '#D6D7DA',
      four: '#F5F5F5',
    },
  },
};
