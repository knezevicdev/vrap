import UsersModel from '../Model';

import { Status as UserStatus } from 'src/networking/models/User';

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

  getUsers(): void {
    this.model.getUsers();
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
        id: i.portal_user_id,
        data: {
          [Accessor.firstName]: i.first_name,
          [Accessor.lastName]: i.last_name,
          [Accessor.email]: i.username,
          // TODO: fix this at the api level
          [Accessor.carrier]: i.carrier?.carrier ?? '',
          [Accessor.status]: i.status,
        },
      })),
    };
  }
}

export default UsersViewModel;
