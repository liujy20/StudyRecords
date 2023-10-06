export interface IGetRole {
  pageSize?: string;
  pageNum?: string;
  sortField?: string;
  sortOrder?: string;
  createTimeFrom?: string;
  createTimeTo?: string;
  roleName?: string;
}

export interface ISetRole {
  roleName: string;
  remark?: string;
  menuId: string[];
  roleId?: string;
}

export interface IRoleItem {
  createTime: string;
  createTimeFrom: null;
  createTimeTo: null;
  menuId: null;
  modifyTime: string|null;
  remark: string;
  roleId: number;
  roleName: string;
}
