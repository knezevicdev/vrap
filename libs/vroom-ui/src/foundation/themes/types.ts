export interface ThemeProps {
  typography: {
    family: {
      heading: string;
      title: string;
      body: string;
    };
    color: string;
    path: string;
  };
  colors: {
    [name: string]: {
      [name: string]: string;
    };
  };
}
