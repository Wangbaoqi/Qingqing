import { useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import { useDidHide, useDidShow, useReady } from '@tarojs/taro'
import {
  Button,
  Image,
  CellGroup,
  Field,
  Row,
  Col,
} from '@antmjs/vantui'


import './index.scss'

export default function CourseList() {

  const courses = [
    {
      title: '这是一门精品课程',
      img: 'https://seopic.699pic.com/photo/50021/9111.jpg_wh1200.jpg',
      time: '2小时10分钟',
      author: '旺达浪',
      category: '数学'
    },
    {
      title: '这是一门数学课程',
      img: 'https://seopic.699pic.com/photo/50063/0401.jpg_wh1200.jpg',
      time: '2小时10分钟',
      author: '钢铁侠',
      category: '脑学'
    },
    {
      title: '这是一门语文课程',
      img: 'https://seopic.699pic.com/photo/50105/4228.jpg_wh1200.jpg',
      time: '2小时10分钟',
      author: '美国队长',
      category: '数学'
    },
    {
      title: '这是一门英语课程',
      img: 'https://seopic.699pic.com/photo/50093/7918.jpg_wh1200.jpg',
      time: '2小时10分钟',
      author: '鹰眼',
      category: '数学'
    },
    {
      title: '这是一门历史课程',
      img: 'https://seopic.699pic.com/photo/50081/3827.jpg_wh1200.jpg',
      time: '2小时10分钟',
      author: '蜘蛛侠',
      category: '蜘学'
    },
    {
      title: '这是一门历史课程',
      img: 'https://seopic.699pic.com/photo/50081/3827.jpg_wh1200.jpg',
      time: '2小时10分钟',
      author: '蜘蛛侠',
      category: '蜘学'
    },{
      title: '这是一门历史课程',
      img: 'https://seopic.699pic.com/photo/50081/3827.jpg_wh1200.jpg',
      time: '2小时10分钟',
      author: '蜘蛛侠',
      category: '蜘学'
    },{
      title: '这是一门历史课程',
      img: 'https://seopic.699pic.com/photo/50081/3827.jpg_wh1200.jpg',
      time: '2小时10分钟',
      author: '蜘蛛侠',
      category: '蜘学'
    }
  ]

  useEffect(() => {


  }, [])

  useReady(() => { })

  useDidShow(() => { })

  useDidHide(() => { })

  return (
    <View className='course-list'>
      <View className='course-list__course'>
        <View className='course-list__course-content'>
          <Row gutter='30'>
            {
              courses.map((course, idx) => (
                <Col span='12' key={`course${idx}`}>
                  <View className='course-list__course-item' >
                    <Image round radius='8' src={course.img} fit='cover' width='100%' height='160px' />
                    <View className='course-list__course-info'>
                      <View className='course-list__course-name'>{course.title}</View>
                      <View className='course-list__course-detail'>
                        <Text>{course.time}</Text>
                        <View className='course-list__course-time'>
                          {/* <Text>{course.time}</Text> */}
                          <Text>{course.category}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </Col>
              ))
            }
          </Row>
        </View>
      </View>
    </View>
  )
}
