
import { ICourseItem, ICourseDetail } from './course';
import { ITaskItem } from './task';
import { IUserInfo, ILogin } from './user';


export interface IResponse {
  data?: ITaskItem[] | ICourseItem[] | IUserInfo[] | ILogin | ICourseDetail;
  errCode?: string;
  errMessage?: string;
  success?: boolean;
}
