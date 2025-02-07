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
  name: string;
}

class Page extends React.Component<PageProps> {
  render(): React.ReactNode {
    const { name, children } = this.props;
    return (
      <>
        <Head>
          <title>{name || `Your Price`}</title>
        </Head>
        <Container>
          <Contents>{children}</Contents>
        </Container>
      </>
    );
  }
}

export default Page;
