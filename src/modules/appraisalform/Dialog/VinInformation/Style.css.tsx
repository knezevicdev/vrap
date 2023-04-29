import { addStyleForMobile } from '@vroom-web/ui-lib';
import styled from 'styled-components';

import Icon from '../../../../core/Icon';

export const Container = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  background: rgba(4, 16, 34, 0.7);
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

export const Modal = styled.div`
  margin: 40px auto;
  padding: 30px;
  max-width: 592px;
  width: 100%;
  height: auto;
  background-color: #ffffff;
  border: 1px solid rgb(214, 215, 218);
  border-bottom: 4px solid #e7131a;
  box-shadow: rgba(0, 0, 0, 0.2) 0 0 3px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  ${addStyleForMobile(`
        top: 10%;
        width: 100%;
        max-width: 363px;
        height: auto;
        max-height: none;
        padding: 0px 16px;
    `)}
`;

export const CloseDialog = styled.div`
  position: absolute;
  right: 30px;
  top: 40px;
  color: #041022;
  cursor: pointer;
`;

export const StyledIcon = styled(Icon)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
`;

export const CloseButtonContainer = styled.div`
  position: relative;
`;

export const Title = styled.h2`
  margin-bottom: 10px;
  font-family: Vroom-Sans, sans-serif;
  font-size: 28px;
  line-height: 1.14;
  letter-spacing: 1px;

  br {
    display: none;

    ${addStyleForMobile(`
      display: inline-block;
    `)}
  }
`;

export const VinDescription = styled.span`
  font-family: 'Calibre-Regular', sans-serif;
  font-size: 18px;
  line-height: 1.39;
  letter-spacing: 0.3px;
`;

export const VinExample = styled.span`
  line-height: 1.39;
  letter-spacing: 0.3px;
  font-size: 18px;
  font-family: Calibre-Semibold, sans-serif;
  margin: 20px 0;
  padding: 8px 39px;
  border: 1px solid #e7131a;
`;

export const VinSeveralPlaces = styled.span`
  font-family: 'Calibre-Regular', sans-serif;
  font-size: 18px;
  line-height: 1.39;
  letter-spacing: 0.3px;
`;

export const VinLocationImg = styled.img`
  width: 296px;
  height: 112px;
  margin: 24px 0 27px;
`;

export const VinLocationLists = styled.div`
  display: flex;
  margin-bottom: 20px;
  font-size: 16px;
  line-height: 1.38;
  letter-spacing: 0.3px;
  text-align: left;
`;

export const VinLocationList = styled.div`
  text-align: left;

  &:first-child {
    margin-right: 18px;
  }
`;

export const ListHeader = styled.span`
  font-family: Calibre-Semibold, sans-serif;
  font-size: 18px;
  line-height: 1.39;
  letter-spacing: 0.3px;
`;

export const ListContainer = styled.ul`
  margin: 0 0 0 10px;
  padding: 0;
  max-width: 242px;
`;

export const ListItem = styled.li`
  position: relative;
  list-style-type: none;
`;
