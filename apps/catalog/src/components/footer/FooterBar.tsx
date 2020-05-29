import { styled } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';

const FooterBar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.grey[100],
  borderTop: `1px solid ${theme.palette.grey[400]}`,
  padding: theme.spacing(4),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(7),
  },
}));

export default FooterBar;
