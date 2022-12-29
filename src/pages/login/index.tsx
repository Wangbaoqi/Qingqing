import { Component, useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import { useDidHide, useDidShow, useReady } from '@tarojs/taro'
import {
  Button,
  CellGroup,
  Field,
  Icon,
  Image,
  Tag
} from '@antmjs/vantui'

import logo from '../../images/logo.jpg'
import './index.scss'

export default function Login() {


  useEffect(() => {

  }, [])

  useReady(() => { })

  useDidShow(() => { })

  useDidHide(() => { })

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
              label='用户名'
              placeholder='请输入学生账号'
            />
            <Field
              type='password'
              label='密码'
              placeholder='请输入账号密码'
              border
            />
          </CellGroup>
          <View className='p-10 pb-0'>
            <Button color='#39b54a' block >添加</Button>
          </View>
        </View>
      </View>
    </View>
  )
}
