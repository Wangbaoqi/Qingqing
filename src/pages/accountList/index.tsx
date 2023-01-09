import { useCallback, useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import Taro, { useDidHide, useDidShow, useReady } from '@tarojs/taro'
import {
  Button,
  Image,
  Tag,
  SwipeCell,
  Icon,
} from '@antmjs/vantui';

import { useAppDispatch, useAppSelector } from '@/hooks/index'
import { selectUserInfo, setUserInfo, getUserInfoAsync, selectUserList } from '@/reducers/userSlice';
import { wxUnBindStudent } from '@/service/auth';

import './index.scss';

export default function AccountList() {

  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectUserInfo)
  const userList = useAppSelector(selectUserList) || Taro.getStorageSync('userList')


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

  const onCheckAccount = useCallback((user) => {
    dispatch(setUserInfo(user));
    Taro.switchTab({
      url: '/pages/index/index'
    })
  }, [dispatch])

  const onUnbindAccount = useCallback(({id}) => {
    Taro.showLoading({
      title: '正在删除...'
    })
    wxUnBindStudent({ studentId: id })
      .then(res => {
        Taro.hideLoading();
        dispatch(getUserInfoAsync())
        console.log(res, 'delete student successfully');
      })
      .catch(err => {
        Taro.hideLoading();
        console.log(err)
      })
     .finally(() => {
        Taro.hideLoading();
      })

  }, [dispatch])

  return (
    <View className='account'>
      <View className='account__card p-8'>
        <View className='text-4xl font-medium mb-2'>选择账号登录</View>
        <View className='text-base'>点击想要登录的账号</View>
        <View className='mt-10'>
          {
            userInfo && userList.map((info, idx) => (
              <SwipeCell
                rightWidth={65}
                leftWidth={0}
                renderRight={<Button className='ml-2' type='danger' onClick={() => onUnbindAccount(info)}>删除</Button>}
                key={`info#${idx}`}
                // onClick={() => onCheckAccount(info)}
              >
                <View onClick={() => onCheckAccount(info)} className={`account__item flex item-center gap-6 p-4  mb-4 ${info.studentCode === userInfo.studentCode ? 'account__check' : ''}`} >
                  <Text className='account__item-name text-5xl font-medium'>{info.studentName && info.studentName[info.studentName.length-2]}</Text>
                  <View className=' flex flex-column gap-2'>
                    <View className='text-xl font-medium flex item-center gap-3'>
                      <Text>{info.studentName}</Text>
                      {
                        info.studentCode === userInfo.studentCode ?
                          <Tag plain color='#39b54a'>当前</Tag> : ''
                      }
                    </View>
                    <Text className='text-sm'>{info.studentCode}</Text>
                  </View>
                  {
                    info.studentCode === userInfo.studentCode ?
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
