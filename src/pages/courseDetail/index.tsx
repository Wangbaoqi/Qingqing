import { useEffect } from 'react'
import { View } from '@tarojs/components'
import { useDidHide, useDidShow, useError, useReady, useRouter } from '@tarojs/taro'
import { useAppDispatch, useAppSelector } from '@/hooks/index'

import {
  Image,
  Skeleton,
  Tag,
} from '@antmjs/vantui';

import { saveCourseDetailAsync, selectCourseDetail, selectCourseStatus } from '@/reducers/courseSlice';
import { getPeriodZh, getClassZh, getSceneZh } from '@/utils/enum';
import defaultImg from '@/images/default.jpg';

import './index.scss'

export default function CourseDetail() {
  const dispatch = useAppDispatch();
  const courseDetail = useAppSelector(selectCourseDetail);
  const courseLoading = useAppSelector(selectCourseStatus) === 'loading';

  const { params = {} } = useRouter();
  const { cid = '' } = params;


  useEffect(() => {
    dispatch(saveCourseDetailAsync(cid))
  }, [dispatch, cid])

  useReady(() => { })

  useDidShow(() => { })

  useDidHide(() => { })

  useError((error) => {
    console.log(error, 'useError')
  })

  return (
    <View className='course-detail'>
      <View className='course-detail__card mb-5'>
        <Image
          src={courseDetail.backgroundImageFileUrl} fit='cover' width='100%' height='180px'
          showError
          renderError={<Image fit='cover' width='100%' height='180px' src={defaultImg} />}
        />
        <Skeleton row={3} loading={courseLoading} className='pt-5 pb-5'>
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
        </Skeleton>
      </View>
      <View className='course-detail__card mb-5'>
        <Skeleton row={3} loading={courseLoading}>
          {
            (courseDetail.courseDescriptionList??[]).map((desc, idx) => (
              <View className='mb-5 p-5' key={`desc#${idx}`}>
                <View className='course-detail__title mb-5'>
                  {desc.title}
                </View>
                <View className='course-detail__content text-sm'>
                  {desc.description}
                </View>
              </View>
            ))
          }
        </Skeleton>
      </View>
    </View>
  )
}
