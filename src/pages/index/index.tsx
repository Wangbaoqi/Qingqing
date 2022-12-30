import { useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import Taro, { useDidHide, useDidShow, useReady } from '@tarojs/taro'
import {
  Image,
  Tag,
  Swiper, SwiperItem,
  Row, Col,
} from '@antmjs/vantui'

import { checkLogin, login } from '@/utils/request/user'
import { wxLinkStudents } from '@/service/auth'

import './index.scss'

export default function Index() {
  const [initPage1, setInitPage1] = useState(0)
  const images = [
    'https://seopic.699pic.com/photo/50021/9111.jpg_wh1200.jpg',
    'https://seopic.699pic.com/photo/50063/0401.jpg_wh1200.jpg',
    'https://seopic.699pic.com/photo/50093/7918.jpg_wh1200.jpg',
  ]

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
    }
  ]

  useEffect(() => {
    checkUserStatus()
  }, [])

  useReady(() => { })

  useDidShow(() => { })

  useDidHide(() => { })

  const checkUserStatus = async () => {

    console.log('check');

    try {
      const isValid = await checkLogin();
      console.log(isValid, 'isValid');
      if (!isValid) {
        await login();
      }
      const students = await wxLinkStudents();
      console.log(students, 'students' );
    } catch (error) {
      console.log(error, 'ee');

    }
  }

  const onChange = (e) => { }

  const navigateToTaskDetail = () => {
    Taro.navigateTo({
      url: '/pages/taskDetail/index'
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
              <Image src={item} fit='cover' width='100%' height='180px' />
            </SwiperItem>
          ))}
        </Swiper>
      </View>


      <View className='index__task mb-10'>
        <View className='index__task-title'>
          <Text>待处理任务</Text>
        </View>
        <View className='index__task-content mb-3'>
          <View className='index__task-box'>
            <View className='index__task-name mb-5'>
              <Text className='mr-5'>张扣扣</Text>
              <Text>五年级一班</Text>
            </View>
            <View className='index__task-list pb-3'>
              <View className='index__task-item flex justify-between relative' onClick={() => navigateToTaskDetail()}>
                <Image src={images[0]} radius='8' fit='cover' width='60px' height='60px' />
                <View className='index__task-center absolute flex flex-column justify-between ml-5'>
                  <View className='index__task-text flex item-center gap-4'>
                    <Text className='text-sm truncate'>任务名称大方</Text>
                    <Tag plain type='primary'>标签</Tag>
                  </View>
                  <Text className='text-xs truncate'>任务描述</Text>
                </View>
                <View className='index__task-right flex item-center'>
                  20分钟
                </View>
              </View>

            </View>
          </View>
        </View>
      </View>

      <View className='index__course'>
        <View className='index__course-title'>
          <Text>我的课程</Text>
        </View>
        <View className='index__course-content'>
          <Row gutter='30'>
            {
              courses.map((course, idx) => (
                <Col span='12' key={`course${idx}`}>
                  <View className='index__course-item' >
                    <Image round radius='8' src={course.img} fit='cover' width='100%' height='160px' />
                    <View className='index__course-info'>
                      <View className='index__course-name'>{course.title}</View>
                      <View className='index__course-detail'>
                        <Text>{course.time}</Text>
                        <View className='index__course-time'>
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
