import { View } from '@tarojs/components'
import {
  Image,
} from '@antmjs/vantui'
import './index.scss'
import logo from '../../images/logo.jpg'

export default function AboutMe() {
  return (
    <View className='about-me'>
      <View className='about-me__card flex item-center flex-column gap-6 pt-10'>
        <Image round radius='8px' width='120px' height='120px' src={logo} />
        <View className='text-2xl font-medium'>青青骆驼研学</View>
      </View>
    </View>
  )
}

