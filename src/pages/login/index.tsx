import { useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import { useDidHide, useDidShow, useReady } from '@tarojs/taro'
import {
  Button,
  Image,
  CellGroup,
  Field,
} from '@antmjs/vantui'

import { wxBindStudent } from '@/service/auth'

import './index.scss'
import logo from '../../images/logo.jpg'

export default function Login() {

  const [studentName, setStudentName] = useState('')
  const [studentCode, setStudentCode] = useState('')


  useEffect(() => {

  }, [])

  useReady(() => { })

  useDidShow(() => { })

  useDidHide(() => { })


  const addAccount = () => {
    wxBindStudent({
      studentCode,
      studentName
    }).then(res => {
      console.log(res);

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