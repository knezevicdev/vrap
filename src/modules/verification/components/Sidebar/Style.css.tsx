import { addStyleForMobile, Link, Typography } from '@vroom-web/ui-lib';
import styled from 'styled-components';

import { Container } from '../../Styled.css';

export const Sidebar = styled(Container)`
  max-width: 100%;
  position: sticky;
  top: 94px;
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
