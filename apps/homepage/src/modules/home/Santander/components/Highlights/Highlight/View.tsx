import {styled} from '@material-ui/core/styles';
import {Typography} from '@vroom-web/ui';
import React from 'react';

import ViewModel from './ViewModel';

const ViewContent = styled('div')(({theme}) => ({
    display: 'flex',
    [theme.breakpoints.only('xs')]: {
        flexDirection: 'column',
    },
}));

const Highlight = styled('div')(({theme}) => ({
    display: 'flex',
    [theme.breakpoints.only('xs')]: {
        marginBottom: theme.spacing(4),
    },
}));

const Image = styled('img')(() => ({
    borderRadius: '50%',
    flexShrink: 0,
    width: '100px',
    height: '100px',
}));

const Text = styled('div')(({theme}) => ({
    marginLeft: theme.spacing(2),
}));

const Title = styled(Typography)(({ theme }) => ({
    color: '#444444',
    whiteSpace: 'pre',
    fontSize: '48px',
    fontWeight: 600,
    marginBottom: theme.spacing(4),
    [theme.breakpoints.only('sm')]: {
        fontSize: '42px',
    },
    [theme.breakpoints.only('xs')]: {
        fontSize: '14px',
        marginBottom: theme.spacing(1),
    },
}));

const Description = styled(Typography)(({theme}) => ({
    letterSpacing: '0.25px',
    lineHeight: '24px',
    [theme.breakpoints.only('sm')]: {
        fontSize: '42px',
    },
    [theme.breakpoints.only('xs')]: {
        fontSize: '14px',
    },
}));

interface Props {
    viewModel: ViewModel;
}

const View: React.FC<Props> = ({viewModel}) => {
    return (
        <ViewContent>
            {viewModel.highlights.map(highlight => {
                const {src, alt, title, description} = highlight;
                return (
                    <Highlight>
                        <Image src={src} alt={alt} loading="lazy"/>
                        <Text>
                            <Title variant="body1">{title}</Title>
                            <Description variant="body1">{description}</Description>
                        </Text>
                    </Highlight>
                )
            })}
        </ViewContent>
    )
};

export default View;
