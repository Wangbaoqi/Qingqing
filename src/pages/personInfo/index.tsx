import { Component, useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import { useDidHide, useDidShow, useReady } from '@tarojs/taro'
import {
  Image,
  Cell,
  CellGroup,
} from '@antmjs/vantui'

import './index.scss'

export default function PersonInfo() {

  const myInfo = {
    avatarId: 1,
    avatarUrl: 'https://img.yzcdn.cn/vant/cat.jpeg',
    birthday: '2012-09-10',
    className: '三年级5班',
    gender: '',
    id: 348204920,
    parentPhoneNum: '15732123333',
    studentCode: '43u24u4392',
    studentName: '张大力'
  }

  useEffect(() => {

  }, [])

  useReady(() => { })

  useDidShow(() => { })

  useDidHide(() => { })

  return (
    <View className='person-info'>
      <View className='person-info__card p-5'>
        <CellGroup >
          <Cell title='头像' renderRightIcon={<Image round width='40px' height='40px' src={myInfo.avatarUrl} />} />
          <Cell title='姓名' value={myInfo.studentName} />
          <Cell title='账号' value={myInfo.id} />
          <Cell title='学籍' value={myInfo.studentCode} />
          <Cell title='生日' value={myInfo.birthday} />
          <Cell title='性别' value={myInfo.gender} />
          <Cell title='班级' value={myInfo.className} />
          <Cell title='家长号码' value={myInfo.parentPhoneNum} border={false} />
        </CellGroup>
      </View>
    </View>
  )
}

