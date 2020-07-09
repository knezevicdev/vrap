import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import ViewModel from './ViewModel';
import { ReactComponent as Arrow } from './arrow.svg';

interface Props {
  viewModel: ViewModel;
}

const Crumb = styled(Typography)(({theme}) => ({
  cursor: 'pointer',
  fontSize: '13px',
  fontWeight: 600,
  color: theme.palette.primary.main,
  letterSpacing: '0.25px',
  borderBottom: 'solid 1px transparent',
  '&:hover': {
    borderBottom: 'solid 1px',
  },
}));

const ArrowIcon = styled(Arrow)(({theme}) => ({
  margin: theme.spacing(0,1),
}));

const BreadcrumbsContainer = styled('div')(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  margin: theme.spacing(4, 'auto'),
  maxWidth: '1280px',
  width: '100%',
  padding: theme.spacing(0, 3)
}));

const BreadcrumbsView: React.FC<Props> = (props) => {
  const { viewModel } = props;

  return (
    <BreadcrumbsContainer>
        {viewModel.crumbs().map((crumb, index, {length}) => {
          const isNotLast = length - 1 !== index;
          return (
            <>
              <Crumb
                onClick={crumb.onClick}
                key={crumb.key}
              >
                {crumb.name}
              </Crumb>
              {isNotLast && <ArrowIcon/>}
            </>
          );
        })}
    </BreadcrumbsContainer>
  );
};

export default observer(BreadcrumbsView);
