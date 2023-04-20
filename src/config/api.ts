

const apiRoot = 'https://api.aiedu.aosiedu.cn/api/v1'

const miniApp = `${apiRoot}/miniApp`;
const auth = `${apiRoot}/auth`;
const file = `${apiRoot}/file`;

export default {
  testApi: `${miniApp}/login`,
  userWxLogin: `${miniApp}/login`,
  bindStudent: `${miniApp}/bindStudent`,
  unBindStudent: `${miniApp}/unbindStudent`,
  getStudentList: `${miniApp}/students`,
  getStudentCourses: `${miniApp}/courses`,
  getStudentCourseDetail: `${miniApp}/course`,
  getStudentTasks: `${miniApp}/missions`,
  getStudentTaskDetail: `${miniApp}/mission`,
  getStudentEvaluation: `${miniApp}/student/evaluation`,
  submitStudentEvaluation: `${miniApp}/student/evaluate`,
  refreshToken: `${auth}/refreshToken`,
  uploadFile: `${file}/upload`,
  deleteFile: `${file}/delete`,

}
