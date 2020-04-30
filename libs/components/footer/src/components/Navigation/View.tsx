import Box from '@material-ui/core/Box';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { styled } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';

import NavigationViewModel from './ViewModel';

const StyledLink = styled(Link)(({ theme }) => ({
  display: 'block',
  fontWeight: theme.typography.fontWeightMedium,
  '&:not(:last-child)': {
    marginBottom: theme.spacing(1),
  },
}));

interface Props {
  viewModel: NavigationViewModel;
}

const NavigationView: React.FC<Props> = ({ viewModel }) => {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('md'));
  const [expanded, setExpanded] = React.useState('');

  const handleChange = (isExpanded: boolean, panel: string): void => {
    setExpanded(isExpanded ? panel : '');
  };

  if (desktop) {
    return (
      <Grid container>
        {viewModel.links().map((section) => {
          return (
            <Grid key={`section-${section.title}`} item xs={3}>
              <Box mb={1}>{section.title}</Box>
              {section.links.map((link, index) => {
                return (
                  <Box key={`link-${index}`} mb={1}>
                    <StyledLink
                      color="secondary"
                      href={link.href}
                      target={link.target}
                    >
                      {link.label}
                    </StyledLink>
                  </Box>
                );
              })}
            </Grid>
          );
        })}
      </Grid>
    );
  } else {
    return (
      <Grid container direction="column">
        {viewModel.links().map((section) => {
          return (
            <ExpansionPanel
              key={section.title}
              square={true}
              elevation={0}
              expanded={expanded === section.title}
              onChange={(_event, isExpanded): void =>
                handleChange(isExpanded, section.title)
              }
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                {section.title}
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>Things</ExpansionPanelDetails>
            </ExpansionPanel>
          );
        })}
      </Grid>
    );
  }
};

export default NavigationView;
