import { getInstitutionLogo } from 'src/networking/request';
import Store from 'src/store';

class DirectDepositReviewViewModel {
  readonly depositToLink: string = 'Deposit to linked ';
  readonly account: string = 'account';
  readonly colon: string = ':';
  readonly linkADifferentAccount: string = 'Link a different account';
  readonly review: string = 'REVIEW';
  readonly infoEncrypted: string =
    'Your information will be secure and encrypted';

  constructor(private store: Store) {}

  handleOpenLink = (): void => {
    this.store.deposit.setMutationInput(undefined);
    this.store.option.setPlaidSubmitting(true);
    this.store.deposit.setPlaidOpen(true);
  };

  getLogo = async (id: string): Promise<void> => {
    const resp = await getInstitutionLogo(id);
    if (resp.data && resp.data !== '\n') {
      this.store.deposit.setInstitutionLogo(resp.data);
    } else {
      this.store.deposit.setInstitutionLogo(null);
    }
  };
}

export default DirectDepositReviewViewModel;
