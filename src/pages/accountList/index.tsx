import { useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import Taro, { useDidHide, useDidShow, useReady } from '@tarojs/taro'
import {
  Button,
  Image,
  Tag,
  SwipeCell,
  Icon,
} from '@antmjs/vantui'
import './index.scss'

export default function AccountList() {

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
    {
      avatarId: 1,
      avatarUrl: '',
      birthday: '2012-09-10',
      className: '三年级5班',
      gender: '',
      id: 348204920,
      parentPhoneNum: '15732123333',
      studentCode: '43u24u9989',
      studentName: '网三大'
    }
  ]


  useEffect(() => {

  }, [])

  useReady(() => { })

  useDidShow(() => { })

  useDidHide(() => { })

  const onNavigateToLogin = () => {
    Taro.navigateTo({
      url: '/pages/login/index'
    })
  }

  return (
    <View className='account'>

      <View className='account__card p-8'>
        <View className='text-4xl font-medium mb-2'>选择账号登录</View>
        <View className='text-base'>点击想要登录的账号</View>
        <View className='mt-10'>
          {
            infoList.map((info, idx) => (
              <SwipeCell
                rightWidth={65}
                leftWidth={0}
                renderLeft={<Button>选择</Button>}
                renderRight={<Button className='ml-2' type='danger'>删除</Button>}
                key={`info#${idx}`}
              >
                <View className={`account__item flex item-center gap-6 p-4  mb-4 ${info.studentCode === myInfo.studentCode ? 'account__check' : ''}`} >
                  <Image round width='50px' height='50px' src='https://img.yzcdn.cn/vant/cat.jpeg' />
                  <View className=' flex flex-column gap-2'>
                    <View className='text-xl font-medium flex item-center gap-3'>
                      <Text>{info.studentName}</Text>
                      {
                        info.studentCode === myInfo.studentCode ?
                          <Tag plain color='#39b54a'>当前</Tag> : ''
                      }
                    </View>
                    <Text className='text-sm'>{info.studentCode}</Text>
                  </View>
                  {
                    info.studentCode === myInfo.studentCode ?
                    <Icon className='account__icon' name='success' size='24px' color='#39b54a' /> : ''
                  }
                </View>
              </SwipeCell>
            ))
          }
          <View className='account__item flex item-center gap-6 p-4 mb-4' onClick={onNavigateToLogin}>
            <View className='account__add flex item-center justify-center'>
              <Icon name='plus' size='30px' color='#c8c9cc' />
            </View>
            <View className='flex flex-column gap-2'>
              <Text className='text-xl font-medium'>添加快捷登录账号</Text>
              <Text className='text-xs text-green'>添加之后再登录无需输入账号密码，登录更方便</Text>
            </View>
          </View>
          <View className='text-xs'>注意，左滑可以删除已添加的账号</View>
        </View>
      </View>
    </View>
  )
}
