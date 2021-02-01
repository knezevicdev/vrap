import UsersModel from '../Model';

import { Carrier, Status as UserStatus } from 'src/networking/models/User';

export enum Accessor {
  name,
  email,
  carrier,
  status,
}

interface TableData {
  headers: {
    display: string;
    accessor: Accessor;
  }[];
  rows: {
    id: number;
    data: {
      [Accessor.name]: string;
      [Accessor.email]: string;
      [Accessor.carrier]: Carrier;
      [Accessor.status]: UserStatus;
    };
  }[];
}

class UsersViewModel {
  private model: UsersModel;
  constructor(usersModel: UsersModel) {
    this.model = usersModel;
  }

  get tableLayout(): TableData {
    return {
      headers: [
        {
          display: 'Name',
          accessor: Accessor.name,
        },
        {
          display: 'Email',
          accessor: Accessor.email,
        },
        {
          display: 'Carrier',
          accessor: Accessor.carrier,
        },
        {
          display: 'Status',
          accessor: Accessor.status,
        },
      ],
      rows: this.model.users.map((i) => {
        const carrier = i.carrier || {
          // eslint-disable-next-line @typescript-eslint/camelcase
          carrier_id: -1,
          carrier: '',
          // eslint-disable-next-line @typescript-eslint/camelcase
          carrier_code: '',
        };
        return {
          id: i.portal_user_id,
          data: {
            [Accessor.name]: `${i.first_name} ${i.last_name}`,
            [Accessor.email]: i.username,
            [Accessor.carrier]: carrier,
            [Accessor.status]: i.status,
          },
        };
      }),
    };
  }

  get carrierOptions(): { key: string; label: string }[] {
    if (this.model.carrierOptions.length > 0) {
      return this.model.carrierOptions.map((i) => ({
        key: i.carrier_code,
        label: i.carrier,
      }));
    } else {
      return [];
    }
  }

  get statusOptions(): { key: string; label: string }[] {
    if (this.model.statusOptions.length > 0) {
      return this.model.statusOptions.map((i) => ({
        key: i,
        label: `${i.charAt(0).toUpperCase()}${i.slice(1)}`,
      }));
    } else {
      return [];
    }
  }

  patchUser(id: number, status?: string, carrierCode?: string): void {
    this.model.patchUser(id, status, carrierCode);
  }
}

export default UsersViewModel;
