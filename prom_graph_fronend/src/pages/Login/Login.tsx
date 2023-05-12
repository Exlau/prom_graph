/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import {
  Button, Checkbox, Form, Input, Alert,
} from 'antd'
import Cookies from 'js-cookie'
import axios from 'axios'
import { BASE_URL } from '../../api/config'

import './style.css'

function LoginPage() {
  const [toggle, setToggle] = useState('no')

  const onFinish = (values: any) => {
    const { username, password } = values
    axios.post(`${BASE_URL}/login`, {
      username,
      password,
    }).then((res) => {
      setToggle('no')
      Cookies.set('token', `${res.data.token}`)
      window.location.replace('/')
    }).catch(() => {
      setToggle('show')
    })
  }

  return (
    <div style={{
      fontFamily: 'deyi-black',
    }}
    >
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <h2 className="active"> Sign In </h2>
          <h2 className="inactive underlineHover">Sign Up </h2>

          <div className="fadeIn first" />
          <Form
            name="basic"
            style={{
              maxWidth: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              style={{ width: '80%' }}
              rules={[{ required: true, message: 'Please input your username!' }]}
              className="fadeIn second"
            >
              <Input placeholder="username" />
            </Form.Item>

            <Form.Item
              name="password"
              style={{ width: '80%' }}
              rules={[{ required: true, message: 'Please input your password!' }]}
              className="fadeIn third"
            >
              <Input.Password placeholder="password" />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          <Alert message="Invalid Username or Password" type="error" className={`invalid-usr-pwd ${toggle}`} />
          <div id="formFooter">
            <a className="underlineHover" href="#">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
