import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from "@/interface/task";
import { getTaskList } from '@/service/index';

const initialState: ITask = {
  willTaskList: [],
  doneTaskList: [],
  status: 'idle'
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setWillTaskList: (state, action) => {
      state.willTaskList = action.payload
    },
    setDoneTaskList: (state, action) => {
      state.doneTaskList = action.payload
    }
  }
})

export const { setWillTaskList, setDoneTaskList } = taskSlice.actions;

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
  getTaskList(params)
    .then((task) => {
      console.log(task, 'wxGetStudent');
      dispatch(setWillTaskList(task))
    })
    .catch(err => {
      console.log(err, 'getUserInfoAsync error');
    })
}

export const selectWillTaskList = (state) => state.user.willTaskList;
export const selectDoneTaskList = (state) => state.user.doneTaskList;

export default taskSlice.reducer;
