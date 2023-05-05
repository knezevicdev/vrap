import {
  addStyleForMobile,
  addStyleForTablet,
  Link,
  Typography,
} from '@vroom-web/ui-lib';
import styled from 'styled-components';

import { Container } from '../../../shared/Style.css';

export const Sidebar = styled(Container)`
  margin-left: 20px;
  max-width: 30%;
  position: sticky;
  top: 94px;

  @media (max-width: 1020px) {
    padding-top: 0;
  }

  ${addStyleForTablet(`
    max-width: calc(100% - 20px);
    margin: 0;
    margin-bottom: 20px;
    position: static;
  `)}

  ${addStyleForMobile(`
    max-width: 100%;
    margin: 0;
    margin-bottom: 20px;
    position: static;
  `)}
`;

export const SidebarTitle = styled(Typography.Heading.Four)`
  margin-bottom: 20px;
  border-bottom: 1px solid rgb(214, 215, 218);
  padding-top: 20px;

  ${addStyleForMobile(`
      text-align: center;
  `)}
`;

export const List = styled.ul`
  padding: 0;
  margin: 0 0 0 1em;
`;

export const ListItem = styled.li`
  margin: 10px 0;
`;

export const SidebarButton = styled(Link.Primary)`
  width: 100%;
  margin-top: 20px;
`;

export const SidebarImportant = styled.span`
  font-family: Calibre-Semibold, sans-serif;
`;

export const SidebarLink = styled(Link.Text)`
  cursor: pointer;
`;
