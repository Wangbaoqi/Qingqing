import { useEffect } from 'react'
import { View } from '@tarojs/components'
import Taro, { useDidHide, useDidShow, useReady } from '@tarojs/taro'
import {
  Button,
  Image,
  Tag
} from '@antmjs/vantui'
import './index.scss'

export default function TaskDetail() {

  const images = [
    'https://seopic.699pic.com/photo/50021/9111.jpg_wh1200.jpg',
    'https://seopic.699pic.com/photo/50063/0401.jpg_wh1200.jpg',
    'https://seopic.699pic.com/photo/50093/7918.jpg_wh1200.jpg',
  ]

  const taskDetail = {
    img: 'https://seopic.699pic.com/photo/50021/9111.jpg_wh1200.jpg',
    name: '教学任务完成篮球课',
    description: '任务的详细的描述发货地舒服我和防抖的点击的反对方和对方很多事烦得很死',
    time: '20分钟',
    classification: '校内教学活动',
    period: '2-4年级',
    scene: '日常生活类',
    expand: {
			"description":"关于机器人使用的步骤描述",
			"device":"机器人套件",
			"id":"1607560934612709378",
			"stepList":[
				{
					"description":"打开机器人开关",
					"fileUrl":"http://47.98.186.0:9000/ai-edu-file/image/20221227/2917_202212271015114825b/2917_202212271015114825b.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ai-edu%2F20221227%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20221227T021530Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=48c32fab13f5449f022f88a08536f015da2234a2517960e9c57cac5139073041",
					"id":"1607560934868561922",
					"sequence":1
				},
				{
					"description":"输入指令",
					"fileUrl":"http://47.98.186.0:9000/ai-edu-file/image/20221227/5358_202212271015157d388/5358_202212271015157d388.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ai-edu%2F20221227%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20221227T021527Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=4dc963facdbb9c26999ca9d1b191d94e099c95960a18906f053ed5bd9cd193db",
					"id":"1607560934868561923",
					"sequence":2
				},
				{
					"description":"发射子弹",
					"fileUrl":"http://47.98.186.0:9000/ai-edu-file/image/20221227/5504_2022122710151984572/5504_2022122710151984572.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ai-edu%2F20221227%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20221227T021527Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=913754d6f289dfdcab7356b5b6a233f5108326511e83f869af1a614611c4c8f1",
					"id":"1607560934868561924",
					"sequence":3
				}
			]
		},
  }

  useEffect(() => {

  }, [])

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
      </View>
      <View className='task-detail__extend mb-5 p-5'>
        <View className='task-detail__title mb-5'>
          任务设备
        </View>
        <View className='task-detail__content text-sm'>
          {taskDetail.expand.device}
        </View>
      </View>
      <View className='task-detail__extend mb-5 p-5'>
        <View className='task-detail__title mb-5'>
          任务设备描述
        </View>
        <View className='task-detail__content text-sm'>
          {taskDetail.expand.description}
        </View>
      </View>
      <View className='task-detail__extend mb-5 p-5'>
        <View className='task-detail__title mb-5'>
          任务设备步骤
        </View>
        <View className='task-detail__content'>
          {
            taskDetail.expand.stepList.map((step, idx) => (
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
      </View>

      <Button color='#0DB336' block className='mb-10' onClick={() => navigateToEvaluate()}>
        去评价
      </Button>
    </View>
  )
}

