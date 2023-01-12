import { useEffect, useState, useCallback } from 'react'
import { View, Text } from '@tarojs/components'
import Taro, { useDidHide, useDidShow, useReady } from '@tarojs/taro'
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
import { getPeriodZh, getClassZh, getSceneZh } from '@/utils/enum';
import { getUserInfoAsync, selectUserInfo, selectUserStatus } from '@/reducers/userSlice';
import { saveCourseListAsync, selectCourseList, selectCourseStatus } from '@/reducers/courseSlice';
import { selectWillTaskList, getTaskListAsync, selectTaskStatus, setCurrentTask } from '@/reducers/taskSlice';

import defaultImg from '@/images/default.jpg';
import './index.scss'

export default function Index() {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectUserInfo);
  const willTaskList = useAppSelector(selectWillTaskList);
  const courseList = useAppSelector(selectCourseList);
  const courseLoading = useAppSelector(selectCourseStatus) === 'loading';
  const userLoading = useAppSelector(selectUserStatus) === 'loading'
  const taskLoading = useAppSelector(selectTaskStatus) === 'loading'

  const images = [
    'https://seopic.699pic.com/photo/50021/9111.jpg_wh1200.jpg',
    'https://seopic.699pic.com/photo/50063/0401.jpg_wh1200.jpg',
    'https://seopic.699pic.com/photo/50093/7918.jpg_wh1200.jpg',
  ]

  useEffect(() => {
    dispatch(getUserInfoAsync())
    dispatch(saveCourseListAsync())
  }, [dispatch])

  useEffect(() => {
    userInfo && dispatch(getTaskListAsync('TO_BE_COMPLETED'))
  }, [userInfo, dispatch])

  useEffect(() => {

  }, [])



  useReady(() => { })

  useDidShow(() => {})

  useDidHide(() => { })

  const onChange = (e) => { }

  const navigateToTaskDetail = (task) => {
    const { id, studentMissionId } = task;
    dispatch(setCurrentTask(task))
    Taro.navigateTo({
      url: `/pages/taskDetail/index?tid=${id}&sid=${studentMissionId}`
    })
    Taro.navigateTo({
      url: `/pages/taskDetail/index?tid=${id}&sid=${studentMissionId}`
    })
  }

  const onNavigateToAccount = () => {
    Taro.navigateTo({
      url: `/pages/accountList/index`
    })
  }

  const onNavigateCourseDetail = useCallback((course) => {
    Taro.setStorageSync('courseDetail', course)
    Taro.navigateTo({
      url: `/pages/courseDetail/index?cid=${course.id}`
    })
  }, [])

  const onPreviewImg = (url) => {
    Taro.previewImage({
      current: url,
      urls: images
    })
  }


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
              <Image src={item} fit='cover' width='100%' height='180px' onClick={() => onPreviewImg(item)} />
            </SwiperItem>
          ))}
        </Swiper>
      </View>

      <View className='index__account mb-10 p-5 '>
        <Skeleton avatar title row={1} loading={userLoading} avatarSize='48px'>
          <View className='flex justify-between item-center' onClick={onNavigateToAccount}>
            {
              userInfo ?
                <View className='flex item-center gap-6 text-base' >
                  <Text className='index__task-name text-5xl font-medium'>{userInfo.studentName && userInfo.studentName[userInfo.studentName.length-1]}</Text>
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
        </Skeleton>
      </View>

      {/* 任务 */}
      <View className='index__task mb-10'>
        <Skeleton title avatar row={2} avatarShape='square' avatarSize='68px' loading={taskLoading} style={{ padding: '42px 10px 10px' }}>
          {
            willTaskList.length ? (
              <>
                <View className='text-xl font-medium p-5'>
                  <Text>待处理任务</Text>
                </View>
                <View className='pb-5 mb-3'>
                  <View className='index__task-box'>
                    {
                      willTaskList.map((task, idx) => (
                        <View key={`task#${idx}`} className='index__task-item pl-5 pr-5 mb-5 flex gap-5 relative' onClick={() => navigateToTaskDetail(task)}>
                          <Image
                            src={task.backgroundImageFileUrl || defaultImg}
                            radius='8' fit='cover' width='68px' height='68px'
                            showError
                            renderError={<Image round radius='8' fit='cover' width='68px' height='68px' src={defaultImg} />}
                          />
                          <View className='index__task-center absolute flex flex-column justify-between flex-1'>
                            <View className='index__task-title text-lg truncate font-medium'>
                              {task.name}
                            </View>
                            <View className='flex gap-3'>
                              <Tag plain color='#39b54a' >{task.duration || '0'}课时</Tag>
                              <Tag plain color='#1989fa' >{getPeriodZh(task.period)}</Tag>
                              <Tag plain color='#ed6a0c' >{getClassZh(task.classification)}</Tag>
                              <Tag plain color='#ff976a' >{getSceneZh(task.scene)}</Tag>
                            </View>
                            <Text className='text-sm truncate'>{task.description}</Text>
                          </View>
                        </View>
                      ))
                    }

                  </View>
                </View>
              </>
            ) : ''
          }
        </Skeleton>
      </View>

      {/* 课程 */}
      <View className='index__course'>
        <View className='index__course-title'>
          <Text>精品课程</Text>
        </View>
        <Skeleton row={4} loading={courseLoading} style={{ padding: '10px'}}>
          <View className='index__course-content'>
            <Row gutter='20'>
              {
                courseList.map((course, idx) => (
                  <Col span='12' key={`course${idx}`}>
                    <View className='index__course-item' onClick={() => onNavigateCourseDetail(course)}>
                      <Image round radius='8'
                        renderLoading={<Loading type='spinner' size='20' vertical></Loading>}
                        src={course.backgroundImageFileUrl}
                        fit='cover' width='100%' height='160px'
                        showError
                        renderError={<Image round radius='8' fit='cover' width='100%' height='160px' src={defaultImg} />}
                      />
                      <View className='index__course-info'>
                        <View className='index__course-name truncate font-medium'>{course.name}</View>
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
