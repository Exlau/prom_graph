import React from 'react'
// @ts-ignore
import {
  ColorPicker,
  Card,
  Divider,
  Form,
  FormInstance,
  Button,
  InputNumber,
  Slider,
  Select,
  Row,
  Col,
  Switch,
  Input,
} from 'antd'
import { EchartsType } from '../../../components/charts/types'
import { PanelSettingsForm, PanelStyles, PanelStylesForm } from './panelTypes'
import {
  BORDER_CAP_OPTIONS, BORDER_OPTIONS, LINE_TYPE_OPTIONS, PANEL_TYPE_OPTIONS,
} from './constants'

const PanelStyleSettings: PanelStylesForm[] = [
  {
    styleName: 'color',
    label: 'color',
    renderEchartTypes: ['line'],
    renderCpn: () => (
      <Form.Item name={['itemStyle', 'color']} label="color">
        <ColorPicker />
      </Form.Item>
    ),
  },
  {
    styleName: 'borderWidth',
    label: 'borderWidth',
    renderEchartTypes: ['line'],
    renderCpn: () => (
      <Form.Item name={['itemStyle', 'borderWidth']} label="borderWidth">
        <Row>
          <Col span={12}>
            <Slider min={1} max={20} />
          </Col>
          <Col span={4}>
            <InputNumber min={1} max={20} style={{ margin: '0 16px' }} />
          </Col>
        </Row>
      </Form.Item>
    ),
  },
  {
    styleName: 'borderType',
    label: 'borderType',
    renderEchartTypes: ['line'],
    renderCpn: () => (
      <Form.Item name={['itemStyle', 'borderType']} label="borderType">
        <Select options={BORDER_OPTIONS} showSearch />
      </Form.Item>
    ),
  },
  {
    styleName: 'borderDashOffset',
    label: 'borderDashOffset',
    renderEchartTypes: ['line'],
    renderCpn: () => (
      <Form.Item
        name={['itemStyle', 'borderDashOffset']}
        label="borderDashOffset"
      >
        <Row>
          <Col span={12}>
            <Slider min={1} max={20} />
          </Col>
          <Col span={4}>
            <InputNumber min={1} max={20} style={{ margin: '0 16px' }} />
          </Col>
        </Row>
      </Form.Item>
    ),
  },
  {
    styleName: 'borderCap',
    label: 'borderCap',
    renderEchartTypes: ['line'],
    renderCpn: () => (
      <Form.Item name={['itemStyle', 'borderCap']} label="borderCap">
        <Select options={BORDER_CAP_OPTIONS} showSearch />
      </Form.Item>
    ),
  },
  {
    styleName: 'smooth',
    label: 'smooth',
    renderEchartTypes: ['line'],
    renderCpn: () => (
      <Form.Item name={['outerStyle', 'smooth']} label="smooth">
        <Switch />
      </Form.Item>
    ),
  },

]

const LineChartSettingsForm: PanelStylesForm[] = [
  {
    styleName: 'color',
    label: 'Line Color',
    renderEchartTypes: ['line'],
    renderCpn: () => (
      <Form.Item name={['lineStyle', 'color']} label="Line Color">
        <ColorPicker />
      </Form.Item>
    ),
  },
  {
    styleName: 'width',
    label: 'Line width',
    renderEchartTypes: ['line'],
    renderCpn: () => (
      <Form.Item name={['lineStyle', 'width']} label="Line width">
        <Slider min={1} max={20} />
      </Form.Item>
    ),
  },
  {
    styleName: 'type',
    label: 'Line type',
    renderEchartTypes: ['line'],
    renderCpn: () => (
      <Form.Item name={['lineStyle', 'type']} label="Line type">
        <Select options={LINE_TYPE_OPTIONS} showSearch />
      </Form.Item>
    ),
  },
  {
    styleName: 'opacity',
    label: 'Line opacity',
    renderEchartTypes: ['line'],
    renderCpn: () => (
      <Form.Item name={['lineStyle', 'opacity']} label="Line opacity">
        <Slider min={0} max={1} step={0.01} />
      </Form.Item>
    ),
  },
]

const panelSettingsForm: PanelSettingsForm[] = [
  {
    settingName: 'title',
    label: 'title',
    renderCpn: () => (
      <Form.Item name="title" label="Panel title">
        <Input size="middle" />
      </Form.Item>
    ),
  },
  {
    settingName: 'type',
    label: 'type',
    renderCpn: () => (
      <Form.Item name="type" label="Panel type">
        <Select options={PANEL_TYPE_OPTIONS} showSearch />
      </Form.Item>
    ),
  },

]

function PanelStyleForm({
  type,
  onFinish,
  panelStylesInitialValue,
}: {
  type: EchartsType;
  onFinish: any;
  panelStylesInitialValue: PanelStyles;
}) {
  const [form]: [FormInstance<any>] = Form.useForm<any>()
  return (
    <Card style={{ width: '100%', height: '100%', overflow: 'auto' }}>
      <div style={{ height: '100%', overflowY: 'auto' }}>
        <Form
          form={form}
          initialValues={panelStylesInitialValue}
          onFinish={(value: any) => {
            const panelStyle = { ...value }
            if (panelStyle?.itemStyle?.color) {
              panelStyle.itemStyle.color = panelStyle.itemStyle.color.toHexString()
            }
            if (panelStyle?.lineStyle?.color) {
              panelStyle.lineStyle.color = panelStyle.lineStyle.color.toHexString()
            }
            onFinish(panelStyle)
          }}
        >
          <Divider>Panel Settings</Divider>
          {panelSettingsForm.map(({ renderCpn }) => renderCpn())}
          <Divider>Item Style Editor</Divider>
          <div
            style={{
              width: '100%',
              height: '400px',
              overflow: 'auto',
            }}
          >
            {PanelStyleSettings.map(({ renderCpn, renderEchartTypes }) => {
              if (
                renderEchartTypes.findIndex((types) => types === type) !== -1
              ) {
                return renderCpn()
              }
              return null
            })}
          </div>
          <Divider>Chart Style Editor</Divider>
          {LineChartSettingsForm.map(({ renderCpn, renderEchartTypes }) => {
            if (renderEchartTypes.findIndex((types) => types === type) !== -1) {
              return renderCpn()
            }
            return null
          })}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Card>
  )
}

export default PanelStyleForm
