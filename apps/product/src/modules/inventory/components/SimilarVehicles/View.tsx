import {Button, Typography} from '@vroom-web/ui';
import {observer} from 'mobx-react';
import React from 'react';

import CarCard from './components/CarCard';
import ViewModel from './ViewModel';

import ExternalLink from 'src/ui/ExternalLink';
import {styled} from "@material-ui/core/styles";


const SimilaVehiclesContainer = styled('div')(({theme}) => ({
    display: 'flex',
    margin: theme.spacing(0, 'auto', 4, 'auto'),
    width: '100%',
    padding: theme.spacing(0, 3),
}));

const SimilaVehiclesContainerContent = styled('div')(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '1232px',
    margin: '0 auto',
    padding: theme.spacing(5, 3),
}));

const Content = styled('div')(({theme}) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(3)
}));

const Cars = styled('div')(({theme}) => ({
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    [theme.breakpoints.only('sm')]: {
        '& #car:nth-child(n+4)': {
            display: 'none'
        },
        '& #car:nth-child(n+3)': {
            marginRight: 0
        },
    },
    [theme.breakpoints.only('xs')]: {
        '& #car:nth-child(n+3)': {
            display: 'none'
        },
        flexDirection: 'column',
        margin: theme.spacing(0),
    },
    '& #car:last-child': {
        marginRight: 0
    },
}));

const ViewAll = styled(Typography)(({theme}) => ({
    fontWeight: 600,
    fontSize: '16px',
    letterSpacing: '1.75px',
    color: theme.palette.primary.main,
    cursor: 'pointer',
}));

interface Props {
    viewModel: ViewModel;
}

const SimilarVehiclesView: React.FC<Props> = ({viewModel}) => {
    return (
        <SimilaVehiclesContainer>
            <SimilaVehiclesContainerContent>
                {viewModel.error() ?
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={viewModel.handleClick}
                    >
                        <Typography variant="body1" fontWeight={600}>
                            {viewModel.viewAllCars}
                        </Typography>
                    </Button>
                    : (
                        <>
                            <Content>
                                <Typography
                                    variant="h2"
                                    fontWeight="fontWeightMedium"
                                    display="inline"
                                >
                                    {viewModel.title}
                                </Typography>
                                <ExternalLink href="/cars">
                                    <ViewAll>{viewModel.viewAll}</ViewAll>
                                </ExternalLink>
                            </Content>
                            <Cars>
                                {viewModel.getCars().map(car => <CarCard car={car} key={car.vin}/>)}
                            </Cars>
                        </>
                    )}
            </SimilaVehiclesContainerContent>
        </SimilaVehiclesContainer>
    );
};

export default observer(SimilarVehiclesView);
