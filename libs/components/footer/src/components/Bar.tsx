import { styled } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';

const FooterBar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(14),
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
  },
}));

export default FooterBar;
