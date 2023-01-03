export const getClassZh = (type) => {
  switch (type) {
    case 'daily_life':
      return '日常生活类';
    case 'production_application':
      return '生产与应用类';
    case 'modern_services':
      return '现代服务类';
    default:
      break;
  }
}

export const getPeriodZh = (type) => {
  switch (type) {
    case 'grade_one_two':
      return '1-2年级';
    case 'grade_three_four':
      return '3-4年级';
    case 'grade_five_six':
      return '5-6年级';
    case 'grade_seven_eight_nine':
      return '7-9年级';
    case 'grade_ten_eleven_twelve':
      return '10-12年级';
    default:
      break;
  }
}

export const getSceneZh = (type) => {
  switch (type) {
    case 'school_teaching_activities':
      return '校内教学活动';
    case 'social_base_practice':
      return '社会/基地实践';
    case 'family_life':
      return '家庭生活';
    default:
      break;
  }
}

export const getTagZh = (type) => {
  switch (type) {
    case 'general_course':
      return '通用课程';
    case 'featured_course':
      return '特色课程';
    case 'custom':
      return '自定义';
    default:
      break;
  }
}

export const getActiveTagZh = (type) => {
  switch (type) {
    case 'general_course':
      return '劳动周';
    case 'featured_course':
      return '基地活动';
    case 'custom':
      return '自定义';
    default:
      break;
  }
}

export const getStageTagZh = (type) => {
  switch (type) {
    case 'general_course':
      return '劳动周';
    case 'featured_course':
      return '基地活动';
    case 'custom':
      return '自定义';
    default:
      break;
  }
}
