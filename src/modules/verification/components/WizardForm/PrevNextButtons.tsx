import React from 'react';

import { ButtonsWrapper, NextButton, PrevButton } from './Styled.css';

import { Col, Row } from 'src/styled/grid';

interface Props {
  hidePrev?: boolean;
  disableNext?: boolean;
  prevText?: string;
  nextText?: string;
  onPrev?: () => void;
  onNext?: () => void;
}

const PrevNextButtons = ({
  hidePrev = false,
  disableNext = false,
  prevText = 'Back',
  nextText = 'Next',
  onPrev,
  onNext,
}: Props) => {
  return (
    <ButtonsWrapper>
      <Row wrap="wrap" gap="20px">
        <Col size={1 / 2} disableBottomGap>
          {!hidePrev && (
            <PrevButton appearance="secondary" onClick={onPrev}>
              {prevText}
            </PrevButton>
          )}
        </Col>
        <Col size={hidePrev ? 1 : 1 / 2} disableBottomGap>
          <NextButton onClick={onNext} disabled={disableNext}>
            {nextText}
          </NextButton>
        </Col>
      </Row>
    </ButtonsWrapper>
  );
};

export default PrevNextButtons;
