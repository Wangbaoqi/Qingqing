import { useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import { useDidHide, useDidShow, useReady } from '@tarojs/taro'
import {
  Button,
  Image,
  CellGroup,
  Field,
} from '@antmjs/vantui'
import './index.scss'

export default function CourseDetail() {


  useEffect(() => {

  }, [])

  useReady(() => { })

  useDidShow(() => { })

  useDidHide(() => { })

  return (
    <View className='course-list'>

    </View>
  )
}
