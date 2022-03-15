import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import { Header } from 'src/components/Header';
import Footer from 'src/core/Footer';
import Congratulations from 'src/modules/congratulations';
import Questions from 'src/modules/questions';
import Page from 'src/Page';

const CongratulationPage: NextPage = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <Page name="Congrats! Document submitted">
      <Header />
      <Contents>
        <Congratulations />
        <Questions />
      </Contents>
      <Footer />
    </Page>
  );
};

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  flex-grow: 1;
`;

interface Props {
  title: string;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  ctx: GetServerSidePropsContext
) => {
  ctx.res.setHeader('Cache-Control', '');
  return {
    props: {
      title: 'Congratulations | Vroom',
    },
  };
};

export default CongratulationPage;
