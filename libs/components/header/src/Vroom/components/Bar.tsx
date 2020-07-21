import { styled } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';

const Bar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.grey[400]}`,
  boxShadow: `0 1px 4px 0 rgba(51, 51, 51, 0.1)`,
  [theme.breakpoints.up('md')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  position: 'sticky',
  top: 0,
  zIndex: theme.zIndex.appBar,
}));

export default Bar;
