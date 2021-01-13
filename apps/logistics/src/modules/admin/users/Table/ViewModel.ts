import UsersModel from '../Model';

import { Status as UserStatus } from 'src/networking/models/User';

export enum Accessor {
  name,
  email,
  carrier,
  status,
}

interface Data {
  [Accessor.name]: string;
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
        return {
          id: i.portal_user_id,
          data: {
            [Accessor.name]: `${i.first_name} ${i.last_name}`,
            [Accessor.email]: i.username,
            [Accessor.carrier]: i.carrier?.carrier ?? '',
            [Accessor.status]: i.status,
          },
        };
      }),
    };
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

  patchUser(id: number, status?: string): void {
    this.model.patchUser(id, status);
  }
}

export default UsersViewModel;
