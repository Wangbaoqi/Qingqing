import { useEffect } from 'react'
import { View } from '@tarojs/components'
import Taro, { useDidHide, useDidShow, useReady, useRouter } from '@tarojs/taro'
import { useAppDispatch, useAppSelector } from '@/hooks/index'
import { selectTaskDetail, selectTaskStatus, getTaskDetailAsync, selectCurrentTask } from '@/reducers/taskSlice'
import {
  Button,
  Image,
  Skeleton,
  Tag
} from '@antmjs/vantui'

import { getPeriodZh, getClassZh, getSceneZh } from '@/utils/enum';
import './index.scss'

export default function TaskDetail() {
  const { params = {} } = useRouter();
  const dispatch = useAppDispatch();
  const taskDetail = useAppSelector(selectTaskDetail);
  const currentTask = useAppSelector(selectCurrentTask);
  const taskLoading = useAppSelector(selectTaskStatus) === 'loading';
  const { tid = '', sid = '' } = params;

  useEffect(() => {
    dispatch(getTaskDetailAsync(tid, sid))
  }, [dispatch, tid, sid])


  useReady(() => { })

  useDidShow(() => { })

  useDidHide(() => { })


  const navigateToEvaluate = () => {
    Taro.navigateTo({
      url: '/pages/evaluation/index'
    })
  }

  return (
    <View className='task-detail'>
      <View className='task-detail__card mb-5'>
        <Image src={taskDetail.backgroundImageFileUrl} fit='cover' width='100%' height='180px' />
        <Skeleton row={3} loading={taskLoading} className='pt-5 pb-5'>
          <View className='task-detail__info p-4'>
            <View className='text-xl'>{taskDetail.name}</View>
            <View className='text-sm mb-4 mt-4'>{taskDetail.description}</View>
            <View className='flex flex-wrap gap-4'>
              <Tag plain type='success'>{taskDetail.duration}分钟</Tag>
              <Tag plain type='primary'>{getPeriodZh(taskDetail.period)}</Tag>
              <Tag plain type='primary'>{getSceneZh(taskDetail.scene)}</Tag>
              <Tag plain type='warning'>{getClassZh(taskDetail.classification)}</Tag>
            </View>
          </View>
        </Skeleton>
      </View>
      <View className='task-detail__extend mb-5 p-5'>
        <Skeleton row={1} title loading={taskLoading} className='pt-5 pb-5'>
          <View className='task-detail__title mb-5'>
            任务设备
          </View>
          <View className='task-detail__content text-sm'>
            {(taskDetail.expand??{}).device}
          </View>
        </Skeleton>
      </View>
      <View className='task-detail__extend mb-5 p-5'>
        <Skeleton row={1} title loading={taskLoading} className='pt-5 pb-5'>
          <View className='task-detail__title mb-5'>
          任务设备描述
          </View>
          <View className='task-detail__content text-sm'>
            {(taskDetail.expand??{}).description}
          </View>
        </Skeleton>
      </View>
      <View className='task-detail__extend mb-5 p-5'>
        <Skeleton row={4} title loading={taskLoading} className='pt-5 pb-5'>
          <View className='task-detail__title mb-5'>
            任务设备步骤
          </View>
          <View className='task-detail__content'>
            {
              ((taskDetail.expand??{}).stepList??[]).map((step, idx) => (
                <View className='task-detail__step' key={`step#${idx}`}>
                  <View className='task-detail__step-icon text-xs'>步骤{step.sequence}</View>
                  <View className='task-detail__step-content pt-5 pb-5'>
                    <View className='text-sm pb-5'>{step.description}</View>
                    <Image src={step.fileUrl} fit='cover' width='100%' height='150px' />
                  </View>
                </View>
              ))
            }
          </View>
        </Skeleton>
      </View>

      <Button color='#0DB336' block className='mb-10' onClick={() => navigateToEvaluate()}>
        { currentTask.missionEvaluateStatus === 'COMPLETED' ? '查看评价' : '去评价' }
      </Button>
    </View>
  )
}

