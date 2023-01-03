export interface ICourse {
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
