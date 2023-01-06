import { useEffect, useState, useCallback } from 'react'
import { View, Text } from '@tarojs/components'
import Taro, { useDidHide, useDidShow, useReady } from '@tarojs/taro'
import { useStore } from 'react-redux'
import {
  Image,
  Tag,
  Swiper, SwiperItem,
  Row, Col,
  Icon,
  Skeleton,
  Loading
} from '@antmjs/vantui'
import { useAppDispatch, useAppSelector } from '@/hooks/index'
import { checkLogin, login } from '@/utils/request/user'
import { wxGetStudent } from '@/service/auth'
import { getCourseList, getTaskList, validToken } from '@/service/index';
import { getPeriodZh } from '@/utils/enum';

import { getUserInfoAsync, selectUserInfo } from '@/reducers/userSlice';
import { saveCourseListAsync, selectCourseList, selectCourseStatus } from '@/reducers/courseSlice';

import './index.scss'

export default function Index() {
  const dispatch = useAppDispatch();
  const store = useStore();

  const userInfo = useAppSelector(selectUserInfo);
  const courseList = useAppSelector(selectCourseList);
  const courseLoading = useAppSelector(selectCourseStatus) === 'loading';


  const images = [
    'https://seopic.699pic.com/photo/50021/9111.jpg_wh1200.jpg',
    'https://seopic.699pic.com/photo/50063/0401.jpg_wh1200.jpg',
    'https://seopic.699pic.com/photo/50093/7918.jpg_wh1200.jpg',
  ]

  useEffect(() => {
    checkUserStatus();

  }, [])

  useReady(() => { })

  useDidShow(() => {

  })

  useDidHide(() => { })


  const checkUserStatus = async () => {
    try {

      dispatch(getUserInfoAsync())
      dispatch(saveCourseListAsync())

      const cacheCurrentUser = Taro.getStorageSync('currentUser')
      // fetchTask(cacheCurrentUser)

      // fetchCourse()
    } catch (error) {
      console.log(error, 'ee');
    }
  }

  const fetchTest = () => {
    validToken()
      .then(res => {

    })
  }

  const fetchTask = (cacheCurrentUser) => {

    getTaskList({
      studentId: cacheCurrentUser.id,
    })
      .then((res) => {
        // console.log(res, 'task');
      })
  }

  const onChange = (e) => { }

  const navigateToTaskDetail = () => {
    Taro.navigateTo({
      url: '/pages/taskDetail/index'
    })
  }

  const onNavigateCourseDetail = useCallback((course) => {
    Taro.setStorageSync('courseDetail', course)
    Taro.navigateTo({
      url: `/pages/courseDetail/index?cid=${course.id}`
    })
  }, [dispatch])


  return (
    <View className='index'>

      <View className='index__swiper' >
        <Swiper
          height={180}
          style={{ borderRadius: '8px'}}
          paginationColor='#426543'
          autoPlay='0'
          initPage='0'
          paginationVisible
          onChange={onChange}
        >
          {images.map((item, index) => (
            <SwiperItem key={`swiper#demo1${index}`}>
              <Image src={item} fit='cover' width='100%' height='180px' />
            </SwiperItem>
          ))}
        </Swiper>
      </View>


      <View className='index__account mb-10 p-5 flex justify-between item-center'>
        {
          userInfo ?
            <View className='flex item-center gap-6 text-base'>
              <Text className='index__task-name text-5xl font-medium'>{userInfo.studentName && userInfo.studentName[userInfo.studentName.length-2]}</Text>
              <View className='flex flex-column justify-between' style={{height: '44px'}}>
                <Text className='text-xl font-medium'>{userInfo.studentName}</Text>
                <View className='text-sm flex item-center gap-4'>
                  <Text>{userInfo.id}</Text>
                  <Text>{userInfo.className}</Text>
                </View>
              </View>
            </View> :
            <View className='index__account-left flex item-center gap-6'>
              <Image src={images[0]} round fit='cover' width='50px' height='50px' />
              <View className='flex flex-column gap-1'>
                <Text className='text-xl font-medium'>您还没有添加账号</Text>
                <Text className='text-sm text-green'>去添加账号</Text>
              </View>
            </View>
        }
        <Icon name='arrow' size='20px' />
      </View>

      <View className='index__task mb-10'>
        <View className='text-xl font-medium p-5'>
          <Text>待处理任务</Text>
        </View>
        <View className='pb-5 mb-3'>
          <View className='index__task-box'>
            <View className='index__task-item pl-5 pr-5 flex gap-5 relative' onClick={() => navigateToTaskDetail()}>
              <Image src={images[0]} radius='8' fit='cover' width='68px' height='68px' />
              <View className='index__task-center absolute flex flex-column justify-between flex-1'>
                <View className='index__task-title text-lg truncate'>
                  任务名称大方任
                </View>
                <View className='flex gap-3'>
                  <Tag plain type='primary'>标签</Tag>
                  <Tag plain type='primary'>标签</Tag>
                  <Tag plain type='primary'>标签</Tag>
                  <Tag plain type='primary'>标签</Tag>
                </View>
                <Text className='text-sm truncate'>任务描述任务描述任务描述任务描述任务描述任务描述任务描述任务描述</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View className='index__course'>
        <View className='index__course-title'>
          <Text>我的课程</Text>
        </View>
        <Skeleton row={3} loading={courseLoading}  style={{ padding: '10px'}}>
          <View className='index__course-content'>
            <Row gutter='20'>
              {
                courseList.map((course, idx) => (
                  <Col span='12' key={`course${idx}`}>
                    <View className='index__course-item' onClick={() => onNavigateCourseDetail(course)}>
                      <Image round radius='8' renderLoading={<Loading type='spinner' size='20' vertical></Loading>} src={course.backgroundImageFileUrl} fit='cover' width='100%' height='160px' />
                      <View className='index__course-info'>
                        <View className='index__course-name truncate'>{course.name}</View>
                        <View className='index__course-detail gap-4'>
                          <Tag plain color='#39b54a' >{course.duration || '0'}课时</Tag>
                          <Tag plain color='#1989fa' >{getPeriodZh(course.period)}</Tag>
                        </View>
                      </View>
                    </View>
                  </Col>
                ))
              }
            </Row>
          </View>
        </Skeleton>
      </View>
    </View>
  )
}
