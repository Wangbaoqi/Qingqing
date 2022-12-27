export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/task/index',
    'pages/my/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    backgroundColor: '#fff',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#2c2c2c',
    selectedColor: '#0DB336',
    backgroundColor: '#fff',
    borderStyle: 'black',
    list: [
      {
        text: '首页',
        pagePath: 'pages/index/index',
        iconPath: 'images/tabBar/home.png',
        selectedIconPath: 'images/tabBar/homeSelected.png'
      },{
        text: '任务',
        pagePath: 'pages/task/index',
        iconPath: 'images/tabBar/task.png',
        selectedIconPath: 'images/tabBar/taskSelected.png'
      },{
        text: '我的',
        pagePath: 'pages/my/index',
        iconPath: 'images/tabBar/my.png',
        selectedIconPath: 'images/tabBar/mySelected.png'
      }
    ]
  },
  debug: true,
})
