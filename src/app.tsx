import { useEffect } from 'react'
import { useDidHide, useDidShow } from '@tarojs/taro'
import { Provider } from 'react-redux'
import configStore from '@/store/index'

import './app.scss'

const store = configStore();

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

  return (
    <Provider store={store}>
      {props.children}
    </Provider>
  )
}

export default App


