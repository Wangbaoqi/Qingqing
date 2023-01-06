export interface ITask {
  willTaskList: ITaskItem[];
  doneTaskList: ITaskItem[];
  status: string;
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
