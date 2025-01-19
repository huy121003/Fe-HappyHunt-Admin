interface IAccount {
  _id: string;
  fullName: string;
  phoneNumber: string;
  avatar: string;
  isVip: boolean;
  isBanned: boolean;
  role: {
    _id: string;
    name: string;
  };
  address: string;
}
export default IAccount;
