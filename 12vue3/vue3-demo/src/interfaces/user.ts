export interface IUser {
  count: string;
  password: string;
}

export interface IUsers {
  id: number;
  name: string;
  age: number;
}

export interface IUserItem {
  authCacheKey: number;
  avatar: string;
  createTime: string;
  createTimeFrom: string;
  createTimeTo: string;
  deptId: number;
  deptName: string;
  description: string;
  email: string;
  id: string;
  lastLoginTime: string;
  mobile: string;
  modifyTime: string;
  password: string;
  roleId: string;
  roleName: string;
  sortField: string;
  sortOrder: string;
  ssex: string;
  status: string;
  userId: number;
  username: string;
}

export interface IUserSearch {
  createTimeFrom: string;
  createTimeTo: string;
  username: string;
  deptId: string;
}

export interface RuleForm {
  username: string;
  email?: string;
  mobile?: string;
  status: string;
  ssex: string;
  roleId: string;
  roleIdToArr: number[];
  userId: string;
  deptId?: string;
}
export interface RuleFormAdd {
  username: string;
  password: string;
  roleId: string | number[];
  status: string;
  ssex: string;
  email: string;
  mobile: string;
  deptId: string;
}
