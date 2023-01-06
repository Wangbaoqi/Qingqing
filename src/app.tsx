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
      console.log('app effect')

      // initUserInfo();
    } catch (error) {

    }


  }, [])

  useDidShow(() => {
    // try {
    //   initUserInfo();
    // } catch (error) {

    // }
  })

  useDidHide(() => {
    console.log('did hide')
  })

  const initUserInfo = async () => {
    const isLogin = await checkLogin();
    if (!isLogin) {
      await login();
    }
    await wxGetStudent();
  }

  return (
    <Provider store={store}>
      {props.children}
    </Provider>
  )
}

export default App


