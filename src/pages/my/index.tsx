import { useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import Taro, { useDidHide, useDidShow, useReady } from '@tarojs/taro'
import {
  Image,
  Icon,
  Row, Col,
  Cell,
} from '@antmjs/vantui'

import { useAppDispatch, useAppSelector } from '@/hooks/index'
import { selectUserInfo } from '@/reducers/userSlice';

import './index.scss'

export default function My() {
  const dispatch = useAppDispatch()
  const userInfo = useAppSelector(selectUserInfo)

  const images = [
    'https://seopic.699pic.com/photo/50021/9111.jpg_wh1200.jpg',
    'https://seopic.699pic.com/photo/50063/0401.jpg_wh1200.jpg',
    'https://seopic.699pic.com/photo/50093/7918.jpg_wh1200.jpg',
  ]

  useEffect(() => {

  }, [])

  useReady(() => { })

  useDidShow(() => { })

  useDidHide(() => { })


  const onNavigateToAccountList = () => {
    Taro.navigateTo({
      url:'/pages/accountList/index'
    })
  }

  const onNavigateToPersonInfo = () => {
    Taro.navigateTo({
      url:'/pages/personInfo/index'
    })
  }

  const onNavigateToAboutMe = () => {
    Taro.navigateTo({
      url:'/pages/aboutMe/index'
    })
  }

  const onNavigateToCourseList = () => {
    Taro.navigateTo({
      url:'/pages/courseList/index'
    })
  }

  const onNavigateToWillTask = () => {
    Taro.navigateTo({
      url:'/pages/taskList/index'
    })
  }

  const onNavigateToDoneTask = () => {
    Taro.navigateTo({
      url:'/pages/taskList/index'
    })
  }

  const onNavigateToAllTask = () => {
    Taro.switchTab({
      url: '/pages/task/index'
    })
  }

  return (
    <View className='my'>
      <View className='my__card p-5 mb-5'>
        {
          userInfo ?
              <View className='my__info flex item-center gap-6'>
                <Text className='my__info-name text-5xl font-medium'>{userInfo.studentName && userInfo.studentName[userInfo.studentName.length-2]}</Text>
                <View className='flex flex-column gap-2'>
                  <Text className='text-3xl font-medium'>{ userInfo.studentName}</Text>
                  <Text className='text-sm'>{userInfo.id}</Text>
                </View>
              </View> :
            (
              <View className='flex item-center gap-6' onClick={onNavigateToAccountList}>
                <Image src={images[0]} round fit='cover' width='50px' height='50px' />
                <View className='flex flex-column gap-1'>
                  <Text className='text-xl font-medium'>您还没有添加账号</Text>
                  <Text className='text-sm text-green'>去添加账号</Text>
                </View>
              </View>
            )
        }
      </View>

      <View className='my__card p-5 mb-5'>
        <Row gutter=''>
          <Col span='6'>
            <View className='my__card-item flex flex-column item-center gap-2' onClick={onNavigateToCourseList}>
              <Icon name='todo-list-o' size='30px' color='#39b54a'></Icon>
              <Text className='text-sm'>我的课程</Text>
            </View>
          </Col>
          <Col span='6'>
            <View className='my__card-item flex flex-column item-center gap-2' onClick={onNavigateToWillTask}>
              <Icon name='records' size='30px' color='#39b54a'></Icon>
              <Text className='text-sm'>待完成</Text>
            </View>
          </Col>
          <Col span='6'>
            <View className='my__card-item flex flex-column item-center gap-2' onClick={onNavigateToDoneTask}>
              <Icon name='completed' size='30px' color='#39b54a'></Icon>
              <Text className='text-sm'>已完成</Text>
            </View>
          </Col>
          <Col span='6'>
            <View className='my__card-item flex flex-column item-center gap-2' onClick={onNavigateToAllTask}>
              <Icon name='orders-o' size='30px' color='#39b54a'></Icon>
              <Text className='text-sm'>全部任务</Text>
            </View>
          </Col>
        </Row>
      </View>

      <View className='my__card'>
        <Cell title='切换账号' isLink icon='exchange' onClick={onNavigateToAccountList} />
        <Cell title='个人信息' isLink icon='label-o' onClick={onNavigateToPersonInfo} />
        <Cell title='关于我们' isLink icon='contact' onClick={onNavigateToAboutMe} />
      </View>
    </View>
  )
}
