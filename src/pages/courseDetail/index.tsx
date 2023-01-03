import { useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import { useDidHide, useDidShow, useReady } from '@tarojs/taro'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { useAppDispatch, useAppSelector } from '@/hooks/index'

import {
  Button,
  Image,
  CellGroup,
  Field,
} from '@antmjs/vantui'
import './index.scss'

export default function CourseDetail() {

  // const [courseDetail, setCourseDetail] = useState({})

  const courseDetail = useAppSelector((state) => {
    console.log(state, 'stateett');
    return state.course
  })

  console.log(courseDetail, 'courseDetail');

  useEffect(() => {

  }, [])

  useReady(() => { })

  useDidShow(() => { })

  useDidHide(() => { })

  return (
    <View className='course-detail'>
      {/* <View className='task-detail__card mb-5'>
        <Image src={taskDetail.img} fit='cover' width='100%' height='180px' />
        <View className='task-detail__info p-4'>
          <View className='text-xl'>{taskDetail.name}</View>
          <View className='text-sm mb-4 mt-4'>{taskDetail.description}</View>
          <View className='flex flex-wrap gap-4'>
            <Tag plain type='success'>{taskDetail.time}</Tag>
            <Tag plain type='primary'>{taskDetail.period}</Tag>
            <Tag plain type='primary'>{taskDetail.scene}</Tag>
            <Tag plain type='warning'>{taskDetail.classification}</Tag>
          </View>
        </View>
      </View> */}
    </View>
  )
}
