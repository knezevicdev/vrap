import React, { useState } from 'react';

import useTaxSavings from '../../utils/useTaxSavings';
import TaxSavingsDialog from '../TaxSavingsDialog';
import {
  List,
  ListItem,
  Sidebar,
  SidebarButton,
  SidebarImportant,
  SidebarLink,
  SidebarTitle,
} from './Style.css';

import useIsInExperiment from 'src/hooks/useIsInExperiment';
import { displayCurrency } from 'src/utils';

interface Props {
  offer: number;
  offerZip: string;
}

const VerificationSidebar = ({ offer, offerZip }: Props) => {
  const [showDialog, setShowDialog] = useState(false);
  const { taxState, taxSavings } = useTaxSavings(offer, offerZip);

  const { isInExperiment } = useIsInExperiment('suyc-sales-tax');
  if (!isInExperiment) return null;

  return (
    <>
      <Sidebar>
        <SidebarTitle>Trade-in and save</SidebarTitle>
        <List>
          <ListItem>
            Lower down and monthly payments with {displayCurrency(offer)}{' '}
            applied.
          </ListItem>
          <ListItem>Hassle-free online purchase, speedy car swap.</ListItem>
          {taxSavings ? (
            <ListItem>
              You may be eligible to{' '}
              <SidebarImportant>
                save {displayCurrency(taxSavings)} in sales tax
              </SidebarImportant>{' '}
              by trading in.{' '}
              <SidebarLink onClick={() => setShowDialog(true)}>
                Details
              </SidebarLink>
            </ListItem>
          ) : null}
        </List>
        <SidebarButton href="/cars" target="_blank">
          Find your car
        </SidebarButton>
      </Sidebar>
      {showDialog && (
        <TaxSavingsDialog
          taxSavings={taxSavings}
          taxState={taxState}
          onClose={() => setShowDialog(false)}
        />
      )}
    </>
  );
};

export default VerificationSidebar;
