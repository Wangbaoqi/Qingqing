import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from "@/interface/task";
import { getTaskList, getCourseDetail, getEvaluation } from '@/service/index';

const initialState: ITask = {
  willTaskList: [],
  doneTaskList: [],
  taskDetail: {},
  taskEvaluation: {},
  studentMissionId: '',
  status: 'idle'
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setWillTaskList: (state, action) => {
      state.status = 'idle';
      state.willTaskList = action.payload
    },
    setDoneTaskList: (state, action) => {
      state.status = 'idle';
      state.doneTaskList = action.payload
    },
    setTaskDetail: (state, action) => {
      state.status = 'idle';
      state.taskDetail = action.payload
    },
    setTaskEvaluation: (state, action) => {
      state.status = 'idle';
      state.taskEvaluation = action.payload
    },
    setStudentMissionId: (state, action) => {
      state.studentMissionId = action.payload
    },
    saveTaskLoading: (state) => {
      state.status = 'loading'
    }
  }
})

export const { setWillTaskList, setDoneTaskList, setTaskDetail, setStudentMissionId, saveTaskLoading, setTaskEvaluation } = taskSlice.actions;

export const getTaskListAsync = (missionStatus = '') => (dispatch, getState) => {
  const { userInfo = {} } = getState().user;
  const { classId = '', currentGrade: grade = 0, currentSemester:semester = '', id: studentId = ''} = userInfo??{};
  const params = {
    classId,
    grade,
    semester,
    studentId,
    missionStatus
  }
  dispatch(saveTaskLoading())
  getTaskList(params)
    .then((task) => {
      dispatch(setWillTaskList(task))
    })
    .catch(err => {
      console.log(err, 'getTaskDetailAsync error');
    })
}

export const getTaskDetailAsync = (missionId, studentMissionId = '' ) => (dispatch) => {
  dispatch(saveTaskLoading())
  getCourseDetail(missionId)
    .then((task) => {
      dispatch(setTaskDetail(task))
      dispatch(setStudentMissionId(studentMissionId))
    })
    .catch(err => {
      console.log(err, 'getTaskDetailAsync error');
    })
}


export const getTaskEvaluationAsync = (studentMissionId = '') => (dispatch) => {
  dispatch(saveTaskLoading())
  getEvaluation({studentMissionId})
    .then((task) => {
      dispatch(setTaskEvaluation(task))
    })
    .catch(err => {
      console.log(err, 'getTaskEvaluationAsync error');
    })
}


export const selectWillTaskList = (state) => state.task.willTaskList;
export const selectDoneTaskList = (state) => state.task.doneTaskList;
export const selectTaskDetail = (state) => state.task.taskDetail;
export const selectEvaluation = (state) => state.task.taskEvaluation;
export const selectStudentMissionId = (state) => state.task.studentMissionId;
export const selectTaskStatus = (state) => state.task.status;

export default taskSlice.reducer;
