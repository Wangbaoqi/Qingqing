import { useCallback, useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import Taro, { useDidHide, useDidShow, useReady } from '@tarojs/taro'
import {
  Button,
  Image,
  CellGroup,
  Field,
  Row,
  Col,
  Loading,
  Tag,
} from '@antmjs/vantui'
import { useAppDispatch, useAppSelector } from '@/hooks/index'
import { saveCourseListAsync, selectCourseList } from '@/reducers/courseSlice';
import { getPeriodZh } from '@/utils/enum';
import defaultImg from '@/images/default.jpg';


import './index.scss'

export default function CourseList() {

  const courseList = useAppSelector(selectCourseList);

  useEffect(() => {

  }, [])

  useReady(() => { })

  useDidShow(() => { })

  useDidHide(() => { })

  const onNavigateCourseDetail = useCallback((course) => {
    Taro.setStorageSync('courseDetail', course)
    Taro.navigateTo({
      url: `/pages/courseDetail/index?cid=${course.id}`
    })
  }, [])


  return (
    <View className='course-list'>
      <View className='course-list__course'>
        <View className='course-list__course-content'>
          <Row gutter='30'>
            {
              courseList.map((course, idx) => (
                <Col span='12' key={`course${idx}`}>
                  <View className='course-list__course-item' onClick={() => onNavigateCourseDetail(course)}>
                    <Image round radius='8'
                      renderLoading={<Loading type='spinner' size='20' vertical></Loading>}
                      src={course.backgroundImageFileUrl}
                      fit='cover' width='100%' height='160px'
                      showError
                      renderError={<Image round radius='8' fit='cover' width='100%' height='160px' src={defaultImg} />}
                    />
                    <View className='course-list__course-info'>
                      <View className='course-list__course-name truncate font-medium'>{course.name}</View>
                      <View className='course-list__course-detail gap-4'>
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
      </View>
    </View>
  )
}
