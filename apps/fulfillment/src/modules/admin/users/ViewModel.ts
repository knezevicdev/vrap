import UsersModel from './Model';

import { Status as UserStatus } from 'src/networking/models/User';
import { Status } from 'src/networking/Networker';

enum Accessor {
  firstName,
  lastName,
  email,
  carrier,
  status,
}

interface Data {
  [Accessor.firstName]: string;
  [Accessor.lastName]: string;
  [Accessor.email]: string;
  [Accessor.carrier]: string;
  [Accessor.status]: UserStatus;
}

interface TableDataRow {
  id: number;
  data: Data;
}

interface TableData {
  headers: {
    display: string;
    accessor: Accessor;
  }[];
  rows: TableDataRow[];
}

class UsersViewModel {
  private model: UsersModel;
  constructor(usersModel: UsersModel) {
    this.model = usersModel;
  }

  getUsers(carrier?: string, status?: string): void {
    if (this.model.usersStatus !== Status.FETCHING) {
      this.model.getUsers(carrier, status);
    }
  }

  get carriers(): { carrier: string; carrierCode: string }[] {
    return [
      {
        carrier: 'Acertus',
        carrierCode: 'C157',
      },
      {
        carrier: 'Advantage Transport LLC',
        carrierCode: 'C187',
      },
    ];
  }

  get statuses(): { key: string; label: string }[] {
    return [
      {
        key: 'pending',
        label: 'Pending',
      },
      {
        key: 'rejected',
        label: 'Rejected',
      },
      {
        key: 'approved',
        label: 'Approved',
      },
    ];
  }

  get tableLayout(): TableData {
    return {
      headers: [
        {
          display: 'First Name',
          accessor: Accessor.firstName,
        },
        {
          display: 'Last Name',
          accessor: Accessor.lastName,
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
      rows: this.model.users.map((i) => ({
        id: i.carrier_user_id,
        data: {
          [Accessor.firstName]: i.first_name,
          [Accessor.lastName]: i.last_name,
          [Accessor.email]: i.username,
          [Accessor.carrier]: i.carrier,
          [Accessor.status]: i.status,
        },
      })),
    };
  }
}

export default UsersViewModel;
