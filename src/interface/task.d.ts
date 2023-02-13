export interface ITask {
  willTaskList: ITaskItem[];
  doneTaskList: ITaskItem[];
  taskDetail: ITaskDetail,
  currentTask: ITaskItem,
  taskEvaluation: IEvaluations,
  studentMissionId?: string,
  status?: string;
  doneStatus?: string
}

export interface ITaskItem {
  // 封面文件资源地址
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
  studentMissionId?: number;
}


/**
 * ITaskDetail
 */
export interface ITaskDetail {
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
  evaluateList?: IEvaluateList[];
  expand?: IExpand;
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
  showList?: IShowList[];
}

/**
* IEvaluateList
*/
export interface IEvaluateList {
  /**
   * 评价描述
   */
  description?: string;
  /**
   * 评价维度
   */
  dimension?: string;
  /**
   * 评价id
   */
  id?: number;
}

/**
* 任务拓展内容
*/
export interface IExpand {
  /**
   * 描述
   */
  description?: string;
  /**
   * 材料工具设备
   */
  device?: string;
  /**
   * 拓展id
   */
  id?: number;
  /**
   * 拓展内容步骤
   */
  stepList?: IStepList[];
}

/**
* IStepList
*/
export interface IStepList {
  /**
   * 描述
   */
  description?: string;
  /**
   * 文件地址
   */
  fileUrl?: string;
  /**
   * 拓展步骤id
   */
  id?: number;
  /**
   * 步骤顺序
   */
  sequence?: number;
}

/**
* IShowList
*/
export interface IShowList {
  /**
   * 内容
   */
  content?: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * 展示id
   */
  id?: string;
  exhibition?: boolean;
  fileList?: IFile[];
}

export interface IFile {
  id?: number;
  previewUri?: string;
  url?: string;
  status?: string;
  message?: string;
  size?: number;
  thumb?: string;
  type?: string;
}

/**
 * 学生任务评价概览
 */
export interface IEvaluations {
  /**
   * 评价等级,k(code)-v(desc)
   */
  evaluateLevel?: { [key: string]: string };
  /**
   * 学生评价：维度key-评价结果
   */
  evaluations?: ITaskEvaluations[];
  /**
   * 记录展示
   */
  missionShows?: ITaskMission[];
  /**
   * 学生id
   */
  studentId?: number;
}

/**
* 任务评价结果
*/
export interface ITaskEvaluations {
  /**
   * 评价描述
   */
  description?: string;
  /**
   * 评价维度
   */
  dimension?: string;
  /**
   * 评价id
   */
  id?: number;
  /**
   * 评价结果
   */
  result?: string | null;

  star?: number;

  score: string;
}

/**
* 任务展示_1
*/
export interface ITaskMission {
  /**
   * 内容
   */
  content?: string;
  /**
   * 描述
   */
  description?: string;
  /**
   * 展示id
   */
  id?: number;
}
