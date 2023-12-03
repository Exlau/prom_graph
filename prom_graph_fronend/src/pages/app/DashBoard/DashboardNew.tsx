import React, { useState } from 'react'
import {
  Button, Form, Input, Modal,
} from 'antd'
import { createDashboard } from './service/dashboard'
import { DashboardProps } from './DashboardTypes'

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionCreateFormProps {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

function CollectionCreateForm({
  open,
  onCreate,
  onCancel,
}:CollectionCreateFormProps) {
  const [form] = Form.useForm()
  return (
    <Modal
      open={open}
      title="Create New Dashboard"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields()
            onCreate(values)
          })
          .catch((info) => {
            console.log('Validate Failed:', info)
          })
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: 'public' }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please input the title of dashboard!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input type="textarea" />
        </Form.Item>
        <Form.Item name="tags" label="Tags">
          <Input type="textarea" placeholder="Input Tags split by ;" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

function DashboardNew() {
  const [open, setOpen] = useState(false)

  const onCreate = (values: any) => {
    createDashboard({
      ...values,
    } as DashboardProps).then(() => {
      setOpen(false)
    })
  }

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true)
        }}
      >
        新建仪表盘
      </Button>
      <CollectionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </div>
  )
}

export default DashboardNew
