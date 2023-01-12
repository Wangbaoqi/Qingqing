import { Component, useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import { useDidHide, useDidShow, useReady } from '@tarojs/taro'
import {
  Image,
  Cell,
  CellGroup,
} from '@antmjs/vantui'
import { selectUserInfo } from '@/reducers/userSlice'
import { useAppSelector } from '@/hooks/index'
import { getGender, getSemester } from '@/utils/enum';
import defaultImg from '@/images/default.jpg';

import './index.scss'

export default function PersonInfo() {
  const userInfo = useAppSelector(selectUserInfo);


  useEffect(() => {

  }, [])

  useReady(() => { })

  useDidShow(() => { })

  useDidHide(() => { })

  return (
    <View className='person-info'>
      <View className='person-info__card p-5'>
        <CellGroup >
          <Cell title='头像' renderRightIcon={<Image round width='40px' height='40px' src={userInfo.avatarUrl || defaultImg} />} />
          <Cell title='姓名' value={userInfo.studentName} />
          <Cell title='账号' value={userInfo.id} />
          <Cell title='学籍' value={userInfo.studentCode} />
          <Cell title='生日' value={userInfo.birthday} />
          <Cell title='性别' value={getGender(userInfo.gender)} />
          <Cell title='学期' value={getSemester(userInfo.currentSemester)} />
          <Cell title='年级' value={`${userInfo.currentGrade}年级`} />
          <Cell title='班级' value={userInfo.className} />
          <Cell title='家长号码' value={userInfo.parentPhoneNum || '暂无'} border={false} />
        </CellGroup>
      </View>
    </View>
  )
}

