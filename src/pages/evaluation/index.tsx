import { useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import { useDidHide, useDidShow, useReady } from '@tarojs/taro'
import {
  Button,
  Image,
  Tag,
  Uploader,
  Rate
} from '@antmjs/vantui'
import './index.scss'

export default function Evaluation() {

  const [star, setStar] = useState(5);
  const starText = ['不合', '合格', '一般', '良好', '优秀'];

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
    showList: [
			{
				"content":"过程记录",
				"description":"1、上传过程记录视频（总长共1分钟，可以是最多3段视频）2、上传过程照片（1-3张）",
				"id":"1607560934226833409"
			},
			{
				"content":"成果展示",
				"description":"上传成果照片一张",
				"id":"1607560934226833410"
			}
    ],
    evaluateList: [
			{
				"description":"自定义描述",
				"dimension":"观点",
        "id": "1607560933098565634",
        "star": 5
			},
			{
				"description":"默认描述",
				"dimension":"知识",
				"id":"1607560933102759937"
			},
			{
				"description":"默认描述",
				"dimension":"态度",
				"id":"1607560933111148546"
			},
			{
				"description":"默认描述",
				"dimension":"习惯",
				"id":"1607560933111148547"
			},
			{
				"description":"默认描述",
				"dimension":"技能",
				"id":"1607560933111148548"
			},
			{
				"description":"默认描述",
				"dimension":"实践",
				"id":"1607560933115342850"
			},
			{
				"description":"默认描述",
				"dimension":"意志",
				"id":"1607560933115342851"
			},
			{
				"description":"默认描述",
				"dimension":"精神",
				"id":"1607560933115342852"
			}
		],
  }

  const [value, setValue] = useState([
    {
      url: 'https://img.yzcdn.cn/vant/leaf.jpg',
      name: '图片1',
    },
    {
      url: 'https://img.yzcdn.cn/vant/tree.jpg',
    },
  ])

  const afterRead = (event) => {
    const { file, name } = event.detail
    // 可在此处新增云上传图片操作
    setValue(value.concat(file))
  }

  const deleteAction = (event) => {
    const { index } = event.detail
    const valueNew = JSON.parse(JSON.stringify(value))
    valueNew.splice(index, 1)
    setValue(valueNew)
  }


  useEffect(() => {

  }, [])

  useReady(() => { })

  useDidShow(() => { })

  useDidHide(() => { })

  return (
    <View className='evaluation'>
      <View className='evaluation__card mb-5'>
        <Image src={taskDetail.img} fit='cover' width='100%' height='180px' />
        <View className='evaluation__info p-4'>
          <View className='text-xl font-medium'>{taskDetail.name}</View>
          <View className='text-base mb-4 mt-4'>{taskDetail.description}</View>
          <View className='flex flex-wrap gap-4'>
            <Tag plain type='success'>{taskDetail.time}</Tag>
            <Tag plain type='primary'>{taskDetail.period}</Tag>
            <Tag plain type='primary'>{taskDetail.scene}</Tag>
            <Tag plain type='warning'>{taskDetail.classification}</Tag>
          </View>
        </View>
      </View>
      <View className=''>
        {
          taskDetail.showList.map((task, idx) => (
            <View className='evaluation__card mb-5' key={`task#${idx}`}>
              <View className='p-5 text-xl font-medium'>
                {task.content}
              </View>
              <View className='p-5 text-base pt-0'>
                <View>{task.description}</View>
                <View className='mt-5'>
                  <Uploader
                    fileList={value}
                    onAfterRead={afterRead}
                    onDelete={deleteAction}
                    deletable
                  />
                </View>
              </View>
            </View>
          ))
        }
      </View>

      <View className='evaluation__card mb-5'>
        <View className='p-5 text-xl font-medium'>
          主观评价
        </View>
        <View className='p-5 pt-0'>
          {
            taskDetail.evaluateList.map((ev, idx) => (
              <View className='mb-5' key={`eval#${idx}`}>
                <View className='flex item-center gap-5 mb-5'>
                  <Text className='text-xl font-medium mt-2 mr-10'>{ev.dimension}</Text>
                  <Rate value={star} color='#ffd21e' onChange={(e) => setStar(e.detail)} />
                  <Text className='text-base font-medium mt-2'>{starText[star-1]}</Text>
                </View>
                <Text className='text-base'>{ev.description}</Text>
              </View>
            ))
          }
        </View>
      </View>

      <Button block color='#0DB336' className='mb-10 '>提交</Button>
    </View>
  )
}
