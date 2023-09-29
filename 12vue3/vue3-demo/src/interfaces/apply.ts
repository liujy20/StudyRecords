export interface IFormCharge {
  shopName: string;
  tel: string;
  managerName: string;
  idCard: string;
}
export interface ICharge extends IFormCharge {
  pageSize: string;
  pageNum: string;
}
export interface IChargeInfo {
  shopName: string;
  tel: string;
  address: string;
  idCard: string;
  managerName: string;
  licenceNo: string;
  licenceImg: string;
  idCardImg: string;
  status: string;
  id: string;
}

export interface IFormShop {
  shopName?: string;
  managerName?: string;
  idCard?: string;
  status?: string;
}
export interface IShop extends IFormShop {
  pageNum?: string;
  pageSize?: string;
}
