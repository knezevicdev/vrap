import React from 'react';

export const DataContext = React.createContext({});
export const DataProvider = DataContext.Provider;
export interface DataProps<T> {
  data: T;
}

const withData = (Component: any) => {
  class HOC extends React.Component {
    static contextType = DataContext;
    render() {
      return <Component data={this.context} />;
    }
  }
  return HOC;
};

export default withData;
