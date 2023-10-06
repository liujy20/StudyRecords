export interface IMenu {
  children?: IMenu[];
  component: string;
  icon: string;
  meta: {
    closeable: boolean;
  };
  name: string;
  path: string;
}

export interface IGetMenu {
  menuName?: string;
  createTimeFrom?: string;
  createTimeTo?: string;
}

export interface IAddMenu {
  menuName: string;
  path: string;
  component: string;
  parentId?: string;
  icon?: string;
  orderNum?: string;
  perms?: string;
  type: string;
}

export interface IMenuItem {
  id: string;
  key: string;
  icon?: string;
  title: string;
  text: string;
  type: string;
  order?: number;
  path: string;
  parentId?:string;
  permission?:string;
  component?: string;
  hasParent?: boolean;
  hasChildren?: boolean;
  children?: IMenuItem[];
}
