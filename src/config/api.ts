

const apiRoot = 'http://home.smarte.tech:50061/api/v1'

const miniApp = `${apiRoot}/miniApp`;
const auth = `${apiRoot}/auth`;

export default {
  testApi: `${miniApp}/login`,
  userWxLogin: `${miniApp}/login`,
  bindStudent: `${miniApp}/bindStudent`,
  unBindStudent: `${miniApp}/unbindStudent`,
  getStudentList: `${miniApp}/students`,
  getStudentCourses: `${miniApp}/courses`,
  getStudentTasks: `${miniApp}/missions`,
  getStudentEvaluation: `${miniApp}/student/evaluation`,
  submitStudentEvaluation: `${miniApp}/student/evaluate`,
  refreshToken: `${auth}/refreshToken`,
}
