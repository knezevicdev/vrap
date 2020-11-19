import Table from 'rc-table';
import React from 'react';
import styled from 'styled-components';

import { Hero } from '../../../core/Typography';
import FeaturesViewModel from './ViewModel';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: relative;
`;

const CustomTable = styled(Table)`
  position: relative;

  table {
    border-spacing: 0;
  }

  .rc-table-sticky-header {
    position: sticky;
    background: white;
    top: 64px !important;

    @media (min-width: 840px) {
      top: 72px !important;
    }
  }

  .rc-table-body {
    overflow-x: auto;
  }

  @media (min-width: 600px) and (max-width: 839px) {
    margin: 0px 64px;
  }

  @media (max-width: 599px) {
    margin-left: 16px;
  }
`;

const HeaderWrapper = styled.thead`
  tr {
    height: 36px;

    th:not(:last-child) {
      box-shadow: 1px 0 0 0 #f5f5f5;
    }

    th:first-child {
      min-width: 144px;
      background: white;
    }

    th:not(:first-child) {
      min-width: 112px;
      max-width: 122px;
    }
  }
`;

const BodyWrapper = styled.tbody`
  tr {
    height: 36px;

    td:first-child {
      min-width: 144px;
      width: 100%;
      z-index: -1;
    }

    td:not(:first-child) {
      min-width: 112px;
      max-width: 122px;
      text-align: center;
      z-index: -2;
      position: relative;
    }

    :nth-child(odd) > td {
      background: #f5f5f5;
    }

    :nth-child(even) > td {
      background: white;
    }

    td:not(:last-child) {
      box-shadow: 1px 0 0 0 #f5f5f5;
    }
  }

  td {
    padding: 6px 0px;
  }
`;

const SectionTitle = styled(Hero.Four)`
  @media (min-width: 600px) and (max-width: 839px) {
    margin: 0px 64px 16px 64px;
  }

  @media (max-width: 599px) {
    margin: 0px 24px 16px 24px;
  }
`;

const components = {
  header: {
    wrapper: HeaderWrapper,
  },
  body: {
    wrapper: BodyWrapper,
  },
};

interface Props {
  viewModel: FeaturesViewModel;
}

const FeaturesView: React.FC<Props> = ({ viewModel }) => {
  const { sectionTitle, columns, data } = viewModel;
  return (
    <Container>
      <SectionTitle>{sectionTitle}</SectionTitle>
      <CustomTable
        sticky
        columns={columns}
        data={data}
        components={components}
      />
    </Container>
  );
};

export default FeaturesView;
