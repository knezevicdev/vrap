import { Link as MULink } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import { ReactComponent as VroomLogoSvg } from './svg/vroom-logo-gray.svg';
import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const ViewContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  background: '#F1F1F1',
}));

const Sections = styled('div')(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(8),
  whiteSpace: 'nowrap',
  flexWrap: 'wrap',
  borderTop: 'solid 1px #C4C4C4',
  width: '100%',
  [theme.breakpoints.only('sm')]: { padding: theme.spacing(8, 4) },
  [theme.breakpoints.only('xs')]: {
    padding: theme.spacing(6, 2),
  },
}));

const Links = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '30%',
  [theme.breakpoints.only('xs')]: {
    width: '50%',
    '&:last-child': {
      marginTop: theme.spacing(4),
    },
  },
}));

const Title = styled(MULink)(() => ({
  fontWeight: 600,
  color: '#767676',
  fontSize: '14px',
}));

const Link = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

const CustomLink = styled(MULink)(() => ({
  color: '#767676',
  fontSize: '14px',
}));

const Copyright = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  borderTop: 'solid 1px #C4C4C4',
  padding: theme.spacing(4, 8, 8, 8),
  [theme.breakpoints.only('sm')]: { padding: theme.spacing(4) },
  [theme.breakpoints.only('xs')]: { padding: theme.spacing(4, 2, 6, 2) },
}));

const CopyrightLabel = styled(Typography)(() => ({
  color: '#444444',
  fontSize: '13px',
  fontWeight: 300,
}));

const CopyrightLink = styled(MULink)(() => ({
  color: '#444444',
  fontSize: '13px',
  marginLeft: '2px',
  fontWeight: 300,
}));

const Trademark = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(4),
  [theme.breakpoints.only('xs')]: {
    marginTop: theme.spacing(3),
  },
  color: '#444444',
  fontSize: '13px',
  lineHeight: 'normal',
  fontWeight: 300,
}));

const PoweredBy = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const PoweredByLabel = styled(Typography)(() => ({
  color: '#767676',
  fontSize: '16px',
}));

const VroomLogo = styled(VroomLogoSvg)(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));

const View: React.FC<Props> = ({ viewModel }) => {
  const sections = viewModel.sections;
  return (
    <ViewContainer>
      <Sections>
        {sections.map((section) => {
          const { title, links } = section;
          const titleStyle = title.href ? {} : { textDecoration: 'none' };
          const titleOnClick = title.href ? title.handleAnalytics : undefined;

          return (
            <Links key={title.label}>
              <Typography>
                <Title
                  href={title.href}
                  style={titleStyle}
                  target={title.target}
                  onClick={titleOnClick}
                >
                  {title.label}
                </Title>
              </Typography>
              {links.map((link) => {
                return (
                  <Link key={link.label}>
                    <CustomLink
                      href={link.href}
                      target={link.target}
                      onClick={link.handleAnalytics}
                    >
                      {link.label}
                    </CustomLink>
                  </Link>
                );
              })}
            </Links>
          );
        })}
      </Sections>
      <Copyright>
        <CopyrightLabel>
          {viewModel.copyrightLabel}
          <CopyrightLink
            onClick={viewModel.copyrightLink.handleAnalytics}
            href={viewModel.copyrightLink.href}
            target={viewModel.copyrightLink.target}
            underline="always"
          >
            {viewModel.copyrightLink.label}
          </CopyrightLink>
        </CopyrightLabel>
        <Trademark>{viewModel.trademark}</Trademark>
        <PoweredBy>
          <PoweredByLabel>{viewModel.poweredBy}</PoweredByLabel>
          <VroomLogo />
        </PoweredBy>
      </Copyright>
    </ViewContainer>
  );
};

export default View;
