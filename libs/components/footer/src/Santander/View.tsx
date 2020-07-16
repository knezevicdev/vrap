import React from "react";
import ViewModel from "./ViewModel";
import {styled} from "@material-ui/core/styles";
import {Typography} from "@vroom-web/ui";

interface Props {
    viewModel: ViewModel;
}

const ViewContainer = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    background: "#F1F1F1"
}));

const Sections = styled('div')(({theme}) => ({
    display: 'flex',
    padding: theme.spacing(8),
    whiteSpace: 'nowrap',
    flexWrap: 'wrap',
    borderTop: 'solid 1px #C4C4C4',
    [theme.breakpoints.only('sm')]: {padding: theme.spacing(8, 4)},
    [theme.breakpoints.only('xs')]: {padding: theme.spacing(4, 2)},
}));

const Links = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

const Title = styled(Typography)(() => ({
    fontWeight: 600,
    color: '#767676',
    fontSize: '14px'
}));

const Link = styled(Typography)(({theme}) => ({
    marginTop: theme.spacing(1),
    color: '#767676',
    fontSize: '14px'
}));

const Copyright = styled('div')(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    borderTop: 'solid 1px #C4C4C4',
    padding: theme.spacing(4, 8, 8, 8),
    [theme.breakpoints.only('sm')]: {padding: theme.spacing(4)},
    [theme.breakpoints.only('xs')]: {padding: theme.spacing(4, 2, 6, 2)},
}));

const View: React.FC<Props> = ({viewModel}) => {
    const sections = viewModel.sections;
    return (
        <ViewContainer>
            <Sections>
                {sections.map(section => {
                    const {title, links} = section;
                    return (
                        <Links>
                            <Title>{title}</Title>
                            {links.map(link => {
                                return (<Link>{link.label}</Link>)
                            })}
                        </Links>
                    )
                })}
            </Sections>
            <Copyright>

            </Copyright>

        </ViewContainer>
    );
};

export default View;
