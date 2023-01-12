import { Component, useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import Taro, { useDidHide, useDidShow, useReady, useRouter } from '@tarojs/taro'
import { useAppDispatch, useAppSelector } from '@/hooks/index'
import { getPeriodZh, getClassZh, getSceneZh } from '@/utils/enum';

import {
  selectWillTaskList,
  getTaskListAsync,
  selectTaskStatus,
  selectDoneTaskStatus,
  selectDoneTaskList,
  setCurrentTask
} from '@/reducers/taskSlice';
import { selectUserInfo } from '@/reducers/userSlice';

import {
  Image,
  Tag,
  Row, Col,
} from '@antmjs/vantui'

import defaultImg from '@/images/default.jpg';

import './index.scss'


export default function TaskList() {
  const { params = {} } = useRouter();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectUserInfo);
  const willTaskList = useAppSelector(selectWillTaskList);
  const doneTaskList = useAppSelector(selectDoneTaskList);
  const { type = ''} = params;

  const taskList = type === 'done' ? doneTaskList : willTaskList

  useEffect(() => {
    if (userInfo) {
      dispatch(getTaskListAsync(type == 'will' ? 'TO_BE_COMPLETED' : 'COMPLETED'));
    }
  }, [dispatch, type, userInfo])


  useReady(() => { })

  useDidShow(() => { })

  useDidHide(() => { })

  return (
    <View className='task-list'>
      <View className='task__will mb-5'>
        <View className='task__will-content p-5'>
          {
            taskList.length ? (
              taskList.map((task, idx) => (
                <Row gutter='0' key={`task#${idx}`} className='task__will-item flex justify-between mb-6'>
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
              ))
            ) : (
              <View className='task-list__none flex item-start justify-center text-orange-dark text-xl font-medium'>
                暂无任务
              </View>
            )
          }
        </View>
      </View>
    </View>
  )
}
