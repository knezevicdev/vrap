import { styled } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';

const FooterBar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  padding: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(6, 8, 4, 6),
  },
}));

export default FooterBar;
