import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useIsMobile = (): boolean => {
  const theme = useTheme();

  return useMediaQuery(theme.breakpoints.down('sm'), {
    noSsr: false,
  });
};

export default useIsMobile;
