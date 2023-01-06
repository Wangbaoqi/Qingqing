export interface IUser {
  userInfo: IUserInfo | null,
  userList: IUserInfo[] | []
}
export interface IUserInfo {
  // 头像id
  avatarId?: number;
  // 头像地址
  avatarUrl?: string;
  // 生日
  birthday?: string;
  // 年级
  currentGrade?: number;
  // 学期
  currentSemester?: string;
  // 班级
  className?: string;
  // 性别
  gender?: string;
  // 学生id
  id?: number;
  // 家长电话
  parentPhoneNum?: string;
  // 学籍号
  studentCode?: string;
  // 姓名
  studentName?: string;
}
