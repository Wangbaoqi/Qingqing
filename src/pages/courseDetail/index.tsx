import { useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import { useDidHide, useDidShow, useReady, useRouter } from '@tarojs/taro'
import { useAppDispatch, useAppSelector } from '@/hooks/index'

import {
  Button,
  Image,
  CellGroup,
  Field,
  Tag,
} from '@antmjs/vantui'

import { selectCourseById } from '@/reducers/courseSlice';

import { getPeriodZh, getClassZh, getSceneZh, getTagZh, getActiveTagZh, getStageTagZh } from '@/utils/enum';

import './index.scss'

export default function CourseDetail() {

  const { params = {} } = useRouter();

  const courseDetail = useAppSelector((state) => selectCourseById(state, params.cid))

  console.log(courseDetail, 'courseDetail');

  useEffect(() => {

  }, [])

  useReady(() => { })

  useDidShow(() => { })

  useDidHide(() => { })

  return (
    <View className='course-detail'>
      <View className='course-detail__card mb-5'>
        <Image src={courseDetail.backgroundImageFileUrl} fit='cover' width='100%' height='180px' />
        <View className='p-4'>
          <View className='text-xl font-medium'>{courseDetail.name}</View>
          <View className='text-sm mb-4 mt-4'>{courseDetail.description}</View>
          <View className='flex flex-wrap gap-4'>
            <Tag plain color='#39b54a'>{courseDetail.duration}课时</Tag>
            <Tag plain color='#1989fa'>{getPeriodZh(courseDetail.period)}</Tag>
            <Tag plain color='#ff976a'>{getSceneZh(courseDetail.scene)}</Tag>
            <Tag plain color='#ed6a0c'>{getClassZh(courseDetail.classification)}</Tag>
          </View>
        </View>
      </View>
      {
        courseDetail.courseDescriptionList.map((desc, idx) => (
          <View className='course-detail__extend mb-5 p-5' key={`desc#${idx}`}>
            <View className='course-detail__title mb-5'>
              {desc.title}
            </View>
            <View className='course-detail__content text-sm'>
              {desc.description}
            </View>
          </View>
        ))
      }

    </View>
  )
}
