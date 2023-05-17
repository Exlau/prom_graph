import React, { useMemo } from 'react'
import {
  Form, Card, Space, Input, Button,
} from 'antd'

import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import Select from 'antd/lib/select'
import { PanelDSL } from './panelTypes'
import { useLabels, useMetricsList } from './service/metadata'
import { CACULATE_OPTIONS, LABEL_OPTIONS, RANGE_FUNCTIONS } from './constants'

// eslint-disable-next-line no-unused-vars
type onFormFinish = (values:any) => void

function QueryForm({
  dsl,
  onFinish,
}: {
  dsl: PanelDSL;
  onFinish: onFormFinish;
}) {
  const [form] = Form.useForm()
  const { data: RawMetrics } = useMetricsList()
  const { data: RawLabels } = useLabels()

  const metrics: any[] = useMemo(
    () => RawMetrics?.map((v) => ({
      value: v,
      label: v,
    })) ?? [],
    [RawMetrics],
  )

  const labels: any[] = useMemo(
    () => RawLabels?.map((v) => ({
      value: v,
      label: v,
    })) ?? [],
    [RawLabels],
  )

  return (
    <Card style={{ width: '100%', height: '100%', overflow: 'auto' }}>
      <div
        style={{
          width: '100%',
          height: '40px',
          backgroundColor: 'rgba(22,119,255,0.8)',
          marginBottom: '10px',
          padding: '10px',
          fontWeight: 500,
          color: 'white',
        }}
      >
        Metrics
      </div>
      <Form
        form={form}
        wrapperCol={{ span: 16 }}
        initialValues={dsl}
        autoComplete="true"
        style={{ height: '100%' }}
        onFinish={onFinish}
      >
        <Form.Item name="metric">
          <Select
            style={{
              width: '300px',
            }}
            size="large"
            options={metrics}
            showSearch
          />
        </Form.Item>
        <div
          style={{
            width: '100%',
            height: '40px',
            backgroundColor: 'rgba(22,119,255,0.8)',
            marginBottom: '10px',
            padding: '10px',
            fontWeight: 500,
            color: 'white',
          }}
        >
          Label Filters
        </div>
        <div style={{ maxHeight: '300px', overflow: 'auto ' }}>
          <Form.List name="labelFilters">
            {(fields, { add, remove }) => (
              <>
                {fields?.map(({ key, name, ...field }) => (
                  <Space key={key} align="baseline">
                    <Form.Item {...field} name={[name, 'label']}>
                      <Select
                        options={labels}
                        style={{ width: '300px' }}
                        showSearch
                      />
                    </Form.Item>
                    <Form.Item {...field} name={[name, 'option']}>
                      <Select
                        options={LABEL_OPTIONS}
                        style={{ width: '100px' }}
                      />
                    </Form.Item>
                    <Form.Item {...field} name={[name, 'value']}>
                      <Input />
                    </Form.Item>
                    <MinusCircleOutlined
                      style={{ marginLeft: '-50px' }}
                      onClick={() => remove(name)}
                    />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Add
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </div>

        <div
          style={{
            width: '100%',
            height: '40px',
            backgroundColor: 'rgba(22,119,255,0.8)',
            marginBottom: '10px',
            padding: '10px',
            fontWeight: 500,
            color: 'white',
          }}
        >
          Dimension & Caculate
        </div>
        <Form.Item name="dimension">
          <Select
            options={RANGE_FUNCTIONS}
            style={{ width: '200px' }}
            showSearch
          />
        </Form.Item>
        <div style={{ maxHeight: '200px', overflow: 'auto' }}>
          <Form.List name="caculate">
            {(fields, { add, remove }) => (
              <>
                {fields?.map(({ key, name, ...field }) => (
                  <Space key={key} align="baseline">
                    <Form.Item {...field} name={[name, 'option']}>
                      <Select
                        options={CACULATE_OPTIONS}
                        style={{ width: '100px' }}
                        showSearch
                      />
                    </Form.Item>
                    <Form.Item {...field} name={[name, 'value']}>
                      <Input />
                    </Form.Item>
                    <MinusCircleOutlined
                      style={{ marginLeft: '-50px' }}
                      onClick={() => remove(name)}
                    />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Add
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </div>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default QueryForm
