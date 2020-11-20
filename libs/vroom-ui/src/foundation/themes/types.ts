export interface ThemeProps {
  typography: {
    family: {
      heading: string;
      title: string;
      body: string;
    };
    color: string;
    fontPath: string;
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
