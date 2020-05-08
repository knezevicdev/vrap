import Box from '@material-ui/core/Box';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles, styled } from '@material-ui/core/styles';
import MuiExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';

import NavigationViewModel from './ViewModel';

//#region Styling
const ExpansionPanel = styled(MuiExpansionPanel)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  borderBottom: `${theme.palette.background.paper} 1px solid`,
  '&::before': {
    display: 'none',
  },
}));

const ExpandMoreIcon = styled(MuiExpandMoreIcon)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const useExpansionPanelStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 1, 0, 0),
  },
  content: {
    margin: theme.spacing(2, 0),
  },
}));

const ExpansionPanelDetails = styled(MuiExpansionPanelDetails)(({ theme }) => ({
  flexDirection: 'column',
  padding: theme.spacing(0, 0, 1, 0),
}));

//#endregion

interface Props {
  viewModel: NavigationViewModel;
}

const MobileNavView: React.FC<Props> = ({ viewModel }) => {
  const expansionPanelClasses = useExpansionPanelStyles();
  const [expanded, setExpanded] = useState('');

  useEffect(() => {
    viewModel.handleMount();
  }, [viewModel]);

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
            <ExpansionPanelSummary
              classes={{
                root: expansionPanelClasses.root,
                content: expansionPanelClasses.content,
              }}
              expandIcon={<ExpandMoreIcon color="secondary" />}
            >
              <Typography
                variant="body1"
                color="text.secondary"
                fontWeight="fontWeightSemibold"
              >
                {section.title}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              {section.links.map((link, index) => {
                return (
                  <Box key={index} display="flex" flex={1} py={1}>
                    <Link href={link.href} target={link.target}>
                      <Typography variant="button" color="text.secondary">
                        {link.label}
                      </Typography>
                    </Link>
                  </Box>
                );
              })}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })}
    </Grid>
  );
};

export default observer(MobileNavView);
