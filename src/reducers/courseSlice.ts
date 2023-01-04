import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICourse } from "@/interface/course";
import { getCourseList } from '@/service/index';

const initialState: ICourse = {
  status: 'idle',
  courseList: []
}

export const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    saveCourseList: (state, action) => {
      state.status = 'idle';
      state.courseList = [
        ...state.courseList,
        ...action.payload
      ]
    },
    saveCourseLoading: (state) => {
      state.status = 'loading'
    }
  }
})

export const {
  saveCourseList,
  saveCourseLoading
} = courseSlice.actions;

export const saveCourseListAsync = () => async (dispatch) => {
  try {
    dispatch(saveCourseLoading());
    const courseList = await getCourseList()
    console.log(courseList, 'courseList');

    dispatch(saveCourseList(courseList))
  } catch (error) {
    console.log(error, 'Save Course List error');
  }
}

export const selectCourseList = (state) => state.course.courseList;
export const selectCourseStatus = (state) => state.course.status;

export const selectCourseById = (state, cid) => {
  return selectCourseList(state).filter(course => cid === course.id)[0]
}

export default courseSlice.reducer;
