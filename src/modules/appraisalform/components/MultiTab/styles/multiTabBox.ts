import styled from 'styled-components';

const MultiTabBox = styled.div`
  max-width: 580px;
  border: 1px solid ${props => props.theme.colors.gray3};
  background: ${props => props.theme.colors.white};
  padding: 20px;

  ${props => props.theme.media.gte('tablet')} {
    padding: 30px;
  }
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-evenly;
  border-bottom: 1px solid ${props => props.theme.colors.gray8};
`;

const Body = styled.div`
  padding-top: 20px;
`;

const TabContentSection = styled.div`
  display: none;

  ${props => props.isActive === true && `display: block;`}
`;

const TabButton = styled.div`
  ${props => props.theme.typography.bodyBold}
  color: ${props => props.theme.colors.gray1};
  cursor: pointer;
  text-align: center;
  width: ${props => props.tabWidth}%;
  text-transform: uppercase;
  white-space: nowrap;

  ${props =>
    props.isActive === true &&
    `
      color: ${props.theme.colors.dark};
      border-bottom: 2px solid ${props.theme.colors.vroomRed};
    `}
`;

MultiTabBox.tabs = Tabs;
MultiTabBox.body = Body;
MultiTabBox.tabContentSection = TabContentSection;
MultiTabBox.tabButton = TabButton;

export default MultiTabBox;
