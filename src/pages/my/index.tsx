import { useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import Taro, { useDidHide, useDidShow, useReady } from '@tarojs/taro'
import {
  Image,
  Icon,
  Row, Col,
  Cell,
} from '@antmjs/vantui'
import './index.scss'

export default function My() {
  const myInfo = {
    avatarId: 1,
    avatarUrl: '',
    birthday: '2012-09-10',
    className: '三年级5班',
    gender: '',
    id: 348204920,
    parentPhoneNum: '15732123333',
    studentCode: '43u24u4392',
    studentName: '张大力'
  }
  const infoList = [
    myInfo,
    myInfo
  ]

  const [showAccount, setShowAccount] = useState(false);


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
        <View className='my__info flex item-center gap-6'>
          <Image round width='50px' height='50px' src='https://img.yzcdn.cn/vant/cat.jpeg' />
          <View className='flex flex-column gap-2'>
            <Text className='text-3xl font-medium'>张大力</Text>
            <Text className='text-sm'>43728497</Text>
          </View>
        </View>
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
