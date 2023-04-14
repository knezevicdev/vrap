import { addStyleForMobile, Button } from '@vroom-web/ui-lib';
import React from 'react';
import styled from 'styled-components';

export const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Block = styled.div`
  display: none;
  @media (max-width: 420px) {
    display: block;
  }
`;

export const FormTitle = styled.h1`
  padding: 20px 0;
  font-family: Vroom-Sans, sans-serif;
  font-size: 36px;
  line-height: 40px;
  letter-spacing: 1px;
  text-align: left;
  margin: 0 0 8px 0;

  ${addStyleForMobile(`
      text-align: center;
      padding-bottom: 16px;
      padding-top: 15px;
      font-family: Vroom-Sans;
      font-size: 28px;
      line-height: 28px;
      letter-spacing: 1px;
    `)}
`;

export const FormStep = styled.div`
  padding: 20px 0;
  border-top: 1px solid #e0e0e0;
`;

export const FormSection = styled(({ ...restProps }) => <div {...restProps} />)`
  padding-top: 0;
  transition: max-height 300ms ease-in-out;
  height: auto;
  max-height: 0;
  overflow: ${(props) => (props.isactive === 'true' ? 'initial' : 'hidden')};

  > div {
    transition: max-height 300ms ease-in-out;
    max-height: 0;
  }

  /* big max-height is used when animating variable height transitions */
  ${(props) =>
    props.isactive === 'true' &&
    `
      max-height: 4500px;

      > div {
        max-height: 4500px;
      }
    `}
`;

export const SectionHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 20px;
`;

export const StepNumber = styled.div`
  padding-right: 10px;
  margin: auto 0;

  img {
    vertical-align: middle;
    border-style: none;
  }
`;

export const StepTitle = styled(({ ...restProps }) => <div {...restProps} />)`
  font-family: Calibre-Semibold, sans-serif;
  font-size: 20px;
  line-height: 26px;
  letter-spacing: 0.25px;
  color: #041022;

  ${(props) => props.isactive === 'false' && `color: #999da3;`}
  ${addStyleForMobile(`
    font-size: 18px;
  `)}
`;

export const EditStep = styled.div`
  padding-left: 10px;
  color: #e7131a;
  cursor: pointer;
  line-height: 26px;
  font-family: Calibre-Regular, sans-serif;
  font-size: 16px;
`;

export const NextButton = styled(({ ...restProps }) => (
  <Button.Primary {...restProps} />
))`
  :enabled {
    background-color: ${(props) =>
      props.isCTAColorExp ? '#308406' : '#E7131A'};
    &:hover {
      background-color: ${(props) =>
        props.isCTAColorExp ? '#309706' : '#d01118'};
    }
  }
  width: auto;
  min-width: 180px;
  margin: 20px 0;

  ${addStyleForMobile(`
    width: 100%;
  `)};
`;
