import {styled, useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {Typography} from '@vroom-web/ui';
import {observer} from 'mobx-react';
import React from 'react';

import StartPurchase from '../StartPurchase';
import ViewModel from './ViewModel';

const VehicleHeaderContainer = styled('div')(({theme}) => ({
    display: 'flex',
    margin: theme.spacing(0, 'auto'),
    maxWidth: '1280px',
    width: '100%',
    padding: theme.spacing(0, 3)
}));

const VehicleHeaderContainerContent = styled('div')(({theme}) => ({
    display: 'flex',
    width: '100%',
    height: '155px',
    alignItems: 'center',
    borderLeft: `1px solid ${theme.palette.grey.A100}`,
    borderBottom: `1px solid ${theme.palette.grey.A100}`,
    borderRight: `1px solid ${theme.palette.grey.A100}`,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0,3)
}));

const LeftContent = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

const RightContent = styled('div')(() => ({
    display: 'flex',
    marginLeft: 'auto',
    alignItems: 'center',
}));

const YearMakeModel = styled(Typography)(({theme}) => ({
    fontWeight: 600,
    marginBottom: theme.spacing(1),
}));

const Price = styled(Typography)(() => ({
    fontWeight: 600,
}));

const Divider = styled('div')(({theme}) => ({
    margin: theme.spacing(0, 4),
    backgroundColor: theme.palette.grey['A100'],
    width: '1px',
    height: '48px',
}));

interface Props {
    viewModel: ViewModel;
}

const VehicleHeaderView: React.FC<Props> = (props) => {
    const theme = useTheme();
    const {viewModel} = props;

    const xsDown = useMediaQuery(theme.breakpoints.down('xs'));

    const summary = viewModel.summary();

    return (
        <VehicleHeaderContainer>
            <VehicleHeaderContainerContent>
                <LeftContent>
                    <YearMakeModel variant="body1">{summary.ymm}</YearMakeModel>
                    <Typography variant="body1">{summary.trim} | {summary.miles}</Typography>
                </LeftContent>
                <RightContent>
                <Price variant="body1">{summary.price}</Price>
                    <Divider/>
                {!xsDown && <StartPurchase/>}
                </RightContent>
            </VehicleHeaderContainerContent>
        </VehicleHeaderContainer>
    );
};

export default observer(VehicleHeaderView);
