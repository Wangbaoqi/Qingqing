

const apiRoot = 'http://home.smarte.tech:50061/api/v1/miniApp'

export default {
  testApi: `${apiRoot}/login`,
  userWxLogin: `${apiRoot}/login`,
  bindStudent: `${apiRoot}/bindStudent`,
  getStudentList: `${apiRoot}/students`,
  getStudentCourses: `${apiRoot}/courses`,
  getStudentTasks: `${apiRoot}/missions`,
  getStudentEvaluation: `${apiRoot}/student/evaluation`,
  submitStudentEvaluation: `${apiRoot}/student/evaluate`,
}
