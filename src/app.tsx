import { useEffect } from 'react'
import { useDidHide, useDidShow } from '@tarojs/taro'
import { Provider } from 'react-redux'
import { store } from '@/store/index'
import { checkLogin, login } from '@/utils/request/user'
import { wxGetStudent } from '@/service/auth'
import './app.scss'

function App(props) {
  useEffect(() => {
    try {
      initUserInfo();
    } catch (error) {

    }


  }, [])

  useDidShow(() => {
    console.log('did show')
    try {
      initUserInfo();
    } catch (error) {

    }
  })

  useDidHide(() => {
    console.log('did hide')
  })

  const initUserInfo = async () => {
    await login();
    await wxGetStudent();
  }

  return (
    <Provider store={store}>
      {props.children}
    </Provider>
  )
}

export default App


