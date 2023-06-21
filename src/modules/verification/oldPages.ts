import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';

const OldVerificationPage: NextPage = () => {
  return null;
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  return {
    redirect: {
      permanent: false,
      destination: `/sell/verification?priceId=${ctx.query.priceId}`,
    },
  };
};

export default OldVerificationPage;
