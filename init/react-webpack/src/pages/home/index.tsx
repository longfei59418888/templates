import * as React from 'react'
// import testIcon2 from '@src/assets/test3.png'
import testIcon from '@src/assets/test2.png'
import { theme } from 'antd'
console.log(testIcon)

const Test: React.FC = () => {
  const themes = theme.useToken()
  console.log('Test', themes)
  return (
    <>
      {/*<img src={testIcon} style={{height:100,width:100}} alt='' />*/}
      {/*<img src={testIcon2} style={{height:100,width:100}} alt='' />*/}
      <div>home</div>
      <div className='tst'>home</div>
    </>
  )
}

const Home: React.FC = () => {
  const themes = theme.useToken()
  console.log('home', themes)
  return (
    <>
      {/*<img src={testIcon} style={{height:100,width:100}} alt='' />*/}
      {/*<img src={testIcon2} style={{height:100,width:100}} alt='' />*/}
      <Test/>
      <div className='tst'>home</div>
    </>
  )
}

export default Home
