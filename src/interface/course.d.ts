
export interface ICourse {
  courseList: ICourseItem[];
  courseDetail: ICourseDetail;
  status: string;
}

export interface ICourseItem {
  /**
   * 课程作者
   */
  authorName?: string;
  /**
   * 封面图片地址
   */
  backgroundImageFileUrl?: string;
  /**
   * 课程分类
   */
  classification?: string;
  /**
   * 源公司课程id
   */
  companySrcId?: number;
  /**
   * 课程描述
   */
  description?: string;
  /**
   * 课程课时
   */
  duration?: number;
  /**
   * 课程id
   */
  id?: number;
  /**
   * 课程名称
   */
  name?: string;
  /**
   * 课程来源
   */
  origin?: string;
  /**
   * 课程学段
   */
  period?: string;
  /**
   * 课程场景
   */
  scene?: string;
  /**
   * 课程标注
   */
  tag?: string;
  /**
   * 课程类型
   */
  type?: string;
}

export interface ICourseDetail {
  // 课程作者
  authorName?: string;
  // 封面图片地址
  backgroundImageFileUrl?: string;
  // 课程分类
  classification?: string;
  // 源公司课程id
  companySrcId?: number;
  // 课程教案列表
  courseDescriptionList?: ICourseDescription[];
  // 课程资料列表
  courseFileList?: FileDTO[];
  // 课程内容列表
  coursePlanningList?: ICoursePlanning[];
  // 课程描述
  description?: string;
  // 课程课时
  duration?: number;
  // 课程id
  id?: number;
  // 课程名称
  name?: string;
  // 课程来源
  origin?: string;
  // 课程学段
  period?: string;
  // 课程场景
  scene?: string;
  // 课程标注
  tag?: string;
  // 课程类型
  type?: string;
}

/**
* 教案内容
*/
export interface ICourseDescription {
  // 教案描述
  description?: string;
  // 教案标题
  title?: string;
}

/**
* FileDTO
*/
export interface FileDTO {
  // 文件大小，单位byte
  fileSize?: number;
  // 文件地址
  fileUrl?: string;
  // 文件id
  id?: number;
  // 文件名
  name?: string;
  // 上传人员
  upLoadUser?: string;
}

/**
* 课程内容
*/
export interface ICoursePlanning {
  courseFile?: FileDTO;
  missionDTO?: IMissionDTO;
  /**
   * 顺序
   */
  sequence?: number;
  /**
   * 任务状态
   */
  taskStatus?: number;
  /**
   * 课程内容标题
   */
  title?: string;
  videoFile?: FileDTO;
}

/**
* 任务信息
*/
export interface IMissionDTO {
  /**
   * 封面文件资源地址
   */
  backgroundImageFileUrl?: string;
  /**
   * 任务分类
   */
  classification?: string;
  /**
   * 任务描述
   */
  description?: string;
  /**
   * 任务时长
   */
  duration?: number;
  /**
   * 任务id
   */
  id?: number;
  /**
   * 任务来源
   */
  missionSrc?: string;
  /**
   * 任务名称
   */
  name?: string;
  /**
   * 任务学段
   */
  period?: string;
  /**
   * 任务场景
   */
  scene?: string;
}
