import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { styled } from '@material-ui/core/styles';
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
  const [expanded, setExpanded] = React.useState('');

  const handleChange = (isExpanded: boolean, panel: string): void => {
    setExpanded(isExpanded ? panel : '');
  };

  return (
    <Grid container direction="column">
      {viewModel.links().map((section, index) => {
        return (
          <ExpansionPanel
            key={index}
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
            <ExpansionPanelDetails>
              <Grid container spacing={1}>
                {section.links.map((link, index) => {
                  return (
                    <Grid item key={index} xs={12}>
                      <StyledLink
                        color="secondary"
                        href={link.href}
                        target={link.target}
                      >
                        {link.label}
                      </StyledLink>
                    </Grid>
                  );
                })}
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })}
    </Grid>
  );
};

export default NavigationView;
