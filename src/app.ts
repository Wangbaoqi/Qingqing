import { useEffect } from 'react'
import { useDidHide, useDidShow } from '@tarojs/taro'

import './app.scss'

function App(props) {


  useEffect(() => {

    try {

    } catch (error) {

    }


  }, [])

  useDidShow(() => {
    console.log('did show')
  })

  useDidHide(() => {
    console.log('did hide')
  })


  return props.children
}

export default App
