import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import styled from 'styled-components';

import Icon, { Icons as IconName } from '../../elements/Icon/Icon';

export default {
  title: 'Design System/Elements/Icons',
} as Meta;

export const Icons: Story = () => {
  return (
    <Container>
      <Row>
        <Icon icon={IconName.CHEVRON_DOWN} />
        <Icon icon={IconName.CHEVRON_UP} />
        <Icon icon={IconName.CLOSE_SMALL} />
        <Icon icon={IconName.CLOSE_LARGE} />
        <Icon icon={IconName.MINUS} />
        <Icon icon={IconName.PLUS} />
        <Icon icon={IconName.BULLET} />
        <Icon icon={IconName.LOADING} />
      </Row>
      <Row>
        <Icon icon={IconName.CARET_LEFT} />
        <Icon icon={IconName.CARET_RIGHT} />
        <Icon icon={IconName.CARET_DOUBLE_LEFT} />
        <Icon icon={IconName.CARET_DOUBLE_RIGHT} />
        <Icon icon={IconName.ARROW_LEFT} />
        <Icon icon={IconName.ARROW_RIGHT} />
        <Icon icon={IconName.IMAGE_EXPAND} />
        <Icon icon={IconName.IMAGE_CONTRACT} />
      </Row>
      <Row>
        <Icon icon={IconName.CHECKMARK_LARGE} />
        <Icon icon={IconName.CHECKMARK_SMALL} />
        <Icon icon={IconName.STAR_FILLED} />
        <Icon icon={IconName.STAR_HALF_FILLED} />
        <Icon icon={IconName.STAR_EMPTY} />
        <Favorite icon={IconName.FAVORITE} />
        <Icon icon={IconName.FAVORITE_SELECTED} />
        <Icon icon={IconName.SEARCH} />
      </Row>
      <Row>
        <Icon icon={IconName.MENU} />
        <Icon icon={IconName.SORT} />
        <SortActive icon={IconName.SORT} />
        <Icon icon={IconName.FILTER} />
        <FilterActive icon={IconName.FILTER} />
        <Icon icon={IconName.CART_EMPTY} />
        <Icon icon={IconName.CART_FILLED} />
        <Icon icon={IconName.EDIT} />
      </Row>
      <Row>
        <Icon icon={IconName.LOGIN} />
        <Icon icon={IconName.EXIT} />
        <Icon icon={IconName.LOCK} />
        <Icon icon={IconName.FEEDBACK_INFO} />
        <Icon icon={IconName.FEEDBACK_ERROR} />
        <Icon icon={IconName.FEEDBACK_QUESTION} />
        <Icon icon={IconName.FEEDBACK_SUCCESS} />
        <Icon icon={IconName.PHONE} />
      </Row>
      <Row>
        <Icon icon={IconName.HOT} />
      </Row>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  max-width: 600px;
  width: 100%;
  justify-content: space-between;
`;

const Favorite = styled(Icon)`
  cursor: pointer;
  fill: #041022;
  :hover {
    fill: #e7131a;
  }
`;

const SortActive = styled(Icon)`
  fill: #e7131a;
`;

const FilterActive = styled(Icon)`
  fill: #e7131a;
`;
