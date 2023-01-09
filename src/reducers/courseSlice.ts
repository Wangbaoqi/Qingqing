import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICourse } from "@/interface/course";
import { getCourseList, getCourseDetail } from '@/service/index';

const initialState: ICourse = {
  status: 'idle',
  courseList: [],
  courseDetail: {}
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
    saveCourseDetail: (state, action) => {
      state.status = 'idle';
      state.courseDetail = action.payload
    },
    saveCourseLoading: (state) => {
      state.status = 'loading'
    }
  }
})

export const {
  saveCourseList,
  saveCourseDetail,
  saveCourseLoading
} = courseSlice.actions;

export const saveCourseListAsync = () => async (dispatch) => {
  try {
    dispatch(saveCourseLoading());
    const courseList = await getCourseList()
    dispatch(saveCourseList(courseList))
  } catch (error) {
    console.log(error, 'Save Course List error');
  }
}

export const saveCourseDetailAsync = (courseId: string) => async (dispatch) => {
  try {
    dispatch(saveCourseLoading());
    const courseDetail = await getCourseDetail(courseId)
    dispatch(saveCourseDetail(courseDetail))
  } catch (error) {
    console.log(error, 'Save Course List error');
  }
}

export const selectCourseList = (state) => state.course.courseList;
export const selectCourseDetail = (state) => state.course.courseDetail;
export const selectCourseStatus = (state) => state.course.status;



export default courseSlice.reducer;
