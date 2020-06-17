import React from "react";

import Dialog from '@material-ui/core/Dialog';
import ViewModel from './ViewModel';
import {observer} from "mobx-react";
import {Typography} from "@vroom-web/ui";
import {styled} from "@material-ui/core/styles";

interface Props {
    viewModel: ViewModel;
}

const DialogContainer = styled('div')(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(4)
}));

const Title = styled(Typography)(({theme}) => ({
    fontSize: '28px',
    marginBottom: theme.spacing(1),
}));

const Vin = styled(Typography)(({theme}) => ({
    border: `solid 1px ${theme.palette.primary.main}`,
    padding: theme.spacing(1, 3),
    fontWeight: 600,
    margin: theme.spacing(2)
}));

const Image = styled('img')(({theme}) => ({
    width: '296px',
    padding: theme.spacing(2, 0)
}));

const ListContainer = styled('div')(() => ({
    display: 'flex',
}));

const List = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column'
}));

const UL = styled('ul')(({theme}) => ({
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(1),
    margin: 0
}));

const VinDialogView: React.FC<Props> = ({viewModel}) => {
    return (
        <Dialog onClose={viewModel.handleClose}
                aria-labelledby="vehicle-identification-number-information"
                open={viewModel.isOpen()}>
            <DialogContainer>
                <Title lineHeight='normal' variant='h2'>{viewModel.title}</Title>
                <Typography whiteSpace='nowrap' lineHeight='normal'>{viewModel.description}</Typography>
                <Typography lineHeight='normal'>{viewModel.descriptionTwo}</Typography>
                <Vin lineHeight='normal'>{viewModel.vin}</Vin>
                <Typography lineHeight='normal'>{viewModel.vinDiscovery}</Typography>
                <Image src={viewModel.image.src} alt={viewModel.image.alt}/>
                <ListContainer>
                    <List>
                        <Typography lineHeight='normal' fontWeight='600'>{viewModel.carTitle}</Typography>
                        <UL>
                            {viewModel.carList.map(item => <li key={item}><Typography
                                lineHeight='normal'>{item}</Typography>
                            </li>)}
                        </UL>
                    </List>
                    <List>
                        <Typography lineHeight='normal' fontWeight='600'>{viewModel.documentationTitle}</Typography>
                        <UL>
                            {viewModel.documentationList.map(item => <li key={item}><Typography
                                lineHeight='normal'>{item}</Typography>
                            </li>)}
                        </UL>
                    </List>
                </ListContainer>
            </DialogContainer>
        </Dialog>
    );
};

export default observer(VinDialogView);
