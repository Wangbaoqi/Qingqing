import { useEffect, useState } from 'react'
import { View } from '@tarojs/components'
import Taro, { useDidHide, useDidShow, useReady } from '@tarojs/taro'
import {
  Button,
  Image,
  CellGroup,
  Field,
} from '@antmjs/vantui'
import { wxBindStudent } from '@/service/auth';
import { useAppDispatch } from '@/hooks/index';
import { getUserInfoAsync } from '@/reducers/userSlice';

import logo from '@/images/logo.jpg'
import './index.scss'

export default function Login() {
  const dispatch = useAppDispatch()
  const [studentName, setStudentName] = useState('')
  const [studentCode, setStudentCode] = useState('')

  useEffect(() => {

  }, [])

  useReady(() => { })

  useDidShow(() => { })

  useDidHide(() => { })

  const addAccount = () => {
    if (!studentCode) {
      Taro.showToast({
        mask: true,
        icon: 'none',
        title: '请输入学籍号'
      })
      return;
    }
    if (!studentName) {
      Taro.showToast({
        icon: 'none',
        mask: true,
        title: '请输入姓名'
      })
      return;
    }
    Taro.showLoading({
      title: '正在添加...'
    })
    wxBindStudent({
      studentCode: studentCode.trim(),
      studentName: studentName.trim()
    }).then(res => {
      Taro.hideLoading();
      dispatch(getUserInfoAsync())
      Taro.navigateBack();
    }).catch(err => {
      Taro.hideLoading();
      Taro.showToast({
        icon: 'error',
        title: '绑定学生失败'
      })
      console.log(err, 'bind student error');
    })
  }

  return (
    <View className='login'>
      <View className='login__card p-5'>
        <View className='flex justify-center item-center flex-column gap-5 pt-10 pb-10'>
          <Image round radius='8px' width='80px' height='80px' src={logo} />
          <View className='text-2xl font-medium'>青青骆驼研学</View>
        </View>
        <View className='p-10'>
          <CellGroup>
            <Field
              clearable
              value={studentCode}
              label='学籍号'
              placeholder='请输入学籍号'
              onChange={(e) => setStudentCode(e.detail)}
            />
            <Field
              clearable
              value={studentName}
              label='姓名'
              placeholder='请输入姓名'
              border
              onChange={(e) => setStudentName(e.detail)}
            />
          </CellGroup>
          <View className='p-10 pb-0'>
            <Button color='#39b54a' block onClick={addAccount}>添加</Button>
          </View>
        </View>
      </View>
    </View>
  )
}
