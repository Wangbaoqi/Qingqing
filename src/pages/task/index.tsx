import { useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import Taro, { useDidHide, useDidShow, useReady } from '@tarojs/taro'
import { useAppDispatch, useAppSelector } from '@/hooks/index'
import { getPeriodZh, getClassZh, getSceneZh } from '@/utils/enum';
import { selectUserInfo } from '@/reducers/userSlice';
import {
  selectWillTaskList,
  getTaskListAsync,
  selectTaskStatus,
  selectDoneTaskStatus,
  selectDoneTaskList,
  setCurrentTask
} from '@/reducers/taskSlice';

import {
  Image,
  Tag,
  Icon,
  Row, Col, Skeleton,
} from '@antmjs/vantui';
import defaultImg from '@/images/default.jpg';

import './index.scss'

export default function Task() {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectUserInfo);
  const willTaskList = useAppSelector(selectWillTaskList);
  const doneTaskList = useAppSelector(selectDoneTaskList);
  const taskLoading = useAppSelector(selectTaskStatus) === 'loading'
  const doneTaskLoading = useAppSelector(selectDoneTaskStatus) === 'loading'

  useEffect(() => {
    if (userInfo) {
      dispatch(getTaskListAsync('TO_BE_COMPLETED'))
      dispatch(getTaskListAsync('COMPLETED'))
    }
  }, [userInfo, dispatch])

  useReady(() => { })

  useDidShow(() => { })

  useDidHide(() => { })

  const onNavigateToLogin = () => {
    Taro.navigateTo({
      url: '/pages/login/index'
    })
  }

  const navigateToTaskDetail = (task) => {
    const { id, studentMissionId } = task;
    dispatch(setCurrentTask(task))
    Taro.navigateTo({
      url: `/pages/taskDetail/index?tid=${id}&sid=${studentMissionId}`
    })
  }

  const onNavigateMore = (type) => {
    Taro.navigateTo({
      url: `/pages/taskList/index?type=${type}`
    })
  }

  return (
    <View className='task'>
      {
        userInfo ? (
          <>
            {
              willTaskList.length ? (
                <View className='task__will mb-5'>
                  <View className='task__will-title flex justify-between item-center text-lg'>
                    <Text>未完成的任务</Text>
                    <View className='task__will-more text-sm' onClick={() => onNavigateMore('will')}>
                      <Text>更多</Text>
                      <Icon name='arrow' size='24' className=''></Icon>
                    </View>
                  </View>
                  <View className='task__will-content p-5'>
                    {
                      willTaskList.map((task, idx) => (
                        <Skeleton key={`#${idx}`} title avatar row={2} avatarShape='square' avatarSize='120px' loading={taskLoading} style={{ padding: '10px' }}>
                          <Row gutter='0' key={`task#${idx}`} className='task__will-item flex justify-between mb-6' onClick={() => navigateToTaskDetail(task)}>
                            <Col span='11' className='task__will-img'>
                              <Image src={task.img || defaultImg} round radius='8' fit='cover' width='100%' height='100%' />
                            </Col>
                            <Col span='12' className='task__will-detail flex flex-column justify-start gap-3'>
                              <View className='task__will-name text-xl truncate'>{task.name}</View>
                              <View className='task__will-desc text-sm line-clamp-3'>{task.description}</View>
                              <View className='task__will-info flex flex-wrap gap-2'>
                                <Tag plain color='#39b54a'>{task.duration || '0'}分钟</Tag>
                                <Tag plain color='#1989fa'>{getPeriodZh(task.period)}</Tag>
                                <Tag plain color='#ed6a0c'>{getClassZh(task.classification)}</Tag>
                                <Tag plain color='#ff976a'>{getSceneZh(task.scene)}</Tag>
                              </View>
                            </Col>
                          </Row>
                        </Skeleton>
                      ))
                    }
                  </View>
                </View>
              ) : ''
            }
            {
              doneTaskList.length ? (
                <View className='task__will mb-5'>
                <View className='task__will-title flex justify-between item-center text-lg'>
                  <Text>已完成的任务</Text>
                  <View className='task__will-more text-sm' onClick={() => onNavigateMore('done')}>
                    <Text>更多</Text>
                    <Icon name='arrow' size='24' className=''></Icon>
                  </View>
                </View>
                <View className='task__will-content p-5'>
                  {
                    doneTaskList.map((task, idx) => (
                      <Skeleton key={`#${idx}`} title avatar row={2} avatarShape='square' avatarSize='68px' loading={doneTaskLoading} style={{ padding: '10px' }}>
                        <Row gutter='0' key={`task#${idx}`} className='task__will-item flex justify-between mb-6' onClick={() => navigateToTaskDetail(task)}>
                          <Col span='11' className='task__will-img'>
                            <Image src={task.img || defaultImg} round radius='8' fit='cover' width='100%' height='100%' />
                          </Col>
                          <Col span='12' className='task__will-detail flex flex-column justify-start gap-3'>
                            <View className='task__will-name text-xl truncate'>{task.name}</View>
                            <View className='task__will-desc text-sm line-clamp-3'>{task.description}</View>
                            <View className='task__will-info flex flex-wrap gap-2'>
                              <Tag plain color='#39b54a'>{task.duration || '0'}分钟</Tag>
                              <Tag plain color='#1989fa'>{getPeriodZh(task.period)}</Tag>
                              <Tag plain color='#ed6a0c'>{getClassZh(task.classification)}</Tag>
                              <Tag plain color='#ff976a'>{getSceneZh(task.scene)}</Tag>
                            </View>
                          </Col>
                        </Row>
                      </Skeleton>
                    ))
                  }
                </View>
              </View>
              ) : ''
            }

          </>
        ) : (
          <View className='task__login bg-white flex item-center justify-center'>
            <View className='task__login-card flex item-center gap-6 p-4 pl-9 pr-9 mb-4' onClick={onNavigateToLogin}>
              <View className='task__login-add flex item-center justify-center'>
                <Icon name='plus' size='30px' color='#c8c9cc' />
              </View>
              <View className='flex flex-column gap-2'>
                <Text className='text-xl font-medium'>添加快捷登录账号</Text>
                <Text className='text-xs text-green'>添加之后再登录无需输入账号密码，登录更方便</Text>
              </View>
            </View>
          </View>
        )
      }
    </View>
  )
}
