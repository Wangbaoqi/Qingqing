import { Component, useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import { useDidHide, useDidShow, useReady } from '@tarojs/taro'

import {
  Image,
  Tag,
  Row, Col,
} from '@antmjs/vantui'

import './index.scss'



export default function TaskList() {

  const images = [
    'https://seopic.699pic.com/photo/50021/9111.jpg_wh1200.jpg',
    'https://seopic.699pic.com/photo/50063/0401.jpg_wh1200.jpg',
    'https://seopic.699pic.com/photo/50093/7918.jpg_wh1200.jpg',
  ]

  const taskWill = [
    {
      img: 'https://seopic.699pic.com/photo/50021/9111.jpg_wh1200.jpg',
      name: '教学任务完成篮球课',
      description: '任务的详细的描述发货地舒服我和防抖的点击的反对方和对方很多事烦得很死',
      time: '20分钟',
      classification: '校内教学活动',
      period: '2-4年级',
      scene: '日常生活类'
    },{
      img: 'https://seopic.699pic.com/photo/50093/7918.jpg_wh1200.jpg',
      name: '教学任务完成足球课',
      description: '任务的详细的描述发货地舒服我和防抖的点击的反对方和对方很多事烦得很死',
      time: '20分钟',
      classification: '校内教学活动',
      period: '2-4年级',
      scene: '日常生活类'
    },{
      img: 'https://seopic.699pic.com/photo/50063/0401.jpg_wh1200.jpg',
      name: '教学任务完成排球课',
      description: '任务的详细的描述发货地舒服我和防抖的点击的反对方和对方很多事烦得很死',
      time: '20分钟',
      classification: '校内教学活动',
      period: '2-4年级',
      scene: '日常生活类'
    },{
      img: 'https://seopic.699pic.com/photo/50063/0401.jpg_wh1200.jpg',
      name: '教学任务完成排球课',
      description: '任务的详细的描述发货地舒服我和防抖的点击的反对方和对方很多事烦得很死',
      time: '20分钟',
      classification: '校内教学活动',
      period: '2-4年级',
      scene: '日常生活类'
    },{
      img: 'https://seopic.699pic.com/photo/50063/0401.jpg_wh1200.jpg',
      name: '教学任务完成排球课',
      description: '任务的详细的描述发货地舒服我和防抖的点击的反对方和对方很多事烦得很死',
      time: '20分钟',
      classification: '校内教学活动',
      period: '2-4年级',
      scene: '日常生活类'
    },{
      img: 'https://seopic.699pic.com/photo/50063/0401.jpg_wh1200.jpg',
      name: '教学任务完成排球课',
      description: '任务的详细的描述发货地舒服我和防抖的点击的反对方和对方很多事烦得很死',
      time: '20分钟',
      classification: '校内教学活动',
      period: '2-4年级',
      scene: '日常生活类'
    }
  ]

  useEffect(() => {

  }, [])

  useReady(() => { })

  useDidShow(() => { })

  useDidHide(() => { })

  return (
    <View className='task'>
      <View className='task__will mb-5'>
        <View className='task__will-content p-5'>
          {
            taskWill.map((task, idx) => (
              <Row gutter='0' key={`task#${idx}`} className='task__will-item flex justify-between mb-6'>
                <Col span='11' className='task__will-img'>
                  <Image src={task.img} round radius='8' fit='cover' width='100%' height='100%' />
                </Col>
                <Col span='12' className='task__will-detail flex flex-column justify-start gap-3'>
                  <View className='task__will-name text-xl truncate'>{task.name}</View>
                  <View className='task__will-desc text-sm line-clamp-3'>{task.description}</View>
                  <View className='task__will-info flex flex-wrap gap-2'>
                    <Tag plain type='success'>{task.time}</Tag>
                    <Tag plain type='primary'>{task.period}</Tag>
                    <Tag plain type='primary'>{task.scene}</Tag>
                    <Tag plain type='warning'>{task.classification}</Tag>
                  </View>
                </Col>
              </Row>
            ))
          }
        </View>
      </View>
    </View>
  )
}
