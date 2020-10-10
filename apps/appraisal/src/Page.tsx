import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: relative;
`;

const Contents = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

interface PageProps {
  category?: string;
  head?: React.ReactNode;
  name: string;
}

class Page extends React.Component<PageProps> {
  render(): React.ReactNode {
    const { children, head } = this.props;
    return (
      <>
        {head && <Head>{head}</Head>}
        <Container>
          <Contents>{children}</Contents>
        </Container>
      </>
    );
  }
}

export default Page;
