/* eslint-disable no-unused-vars */
import React, {
  useEffect, useState, useMemo, useRef,
} from 'react'
import Editor from '@monaco-editor/react'
import {
  Row,
  Col,
  Card,
  Descriptions,
  Tabs,
  Button,
  List,
  Typography,
  Table,
} from 'antd'
import {
  getRuntimeInformation,
  getBuildInformation,
  getTSDBInformation,
  getDatasourceConfig,
  reloadPromethes,
} from './service/datasource'
import { BuildInfo, RuntimeInfo, TSDBInfo } from './types'

function Datasource() {
  const [datasource, setDatasource] = useState<
    [RuntimeInfo, BuildInfo, TSDBInfo] | null
  >(null)
  const [configValue, setConfigValue] = useState<string>('')

  const editorRef = useRef<any>(null)

  useEffect(() => {
    Promise.all([
      getRuntimeInformation(),
      getBuildInformation(),
      getTSDBInformation(),
      getDatasourceConfig(),
    ]).then((res) => {
      setDatasource(res?.slice(0, 3) as [RuntimeInfo, BuildInfo, TSDBInfo])
      setConfigValue(res[3])
    })
  }, [])

  const handleEditorMount = (editor: any) => {
    editorRef.current = editor
  }

  const RuntimeInfoCpn = useMemo(
    () => (
      <div id="runtime-information">
        <Descriptions title="运行时信息" bordered>
          {datasource?.length === 3
            ? Object.keys(datasource[0]).map((key) => (
              <Descriptions.Item label={key}>
                {/* @ts-ignore */}
                {datasource[0][key]}
              </Descriptions.Item>
            ))
            : null}
        </Descriptions>
      </div>
    ),
    [datasource],
  )

  const BuildInfoCpn = useMemo(
    () => (
      <div id="build-information">
        <Descriptions title="构建信息" bordered>
          {datasource?.length === 3
            ? Object.keys(datasource[1]).map((key) => (
              <Descriptions.Item label={key}>
                {/* @ts-ignore */}
                {datasource[1][key].toString()}
              </Descriptions.Item>
            ))
            : null}
        </Descriptions>
      </div>
    ),
    [datasource],
  )

  const TSDBInfoCpn = useMemo(
    () => (
      <div id="TSDB-information">
        <Descriptions title="时序数据库信息" bordered>
          {datasource?.length === 3
            ? Object.keys(datasource[2]).map((key) => (
              <Descriptions.Item label={key}>
                {key.indexOf('By') !== -1 ? (
                  <List
                    bordered
                      // @ts-ignore
                    dataSource={datasource[2][key]}
                    renderItem={(item: any) => (
                      <List.Item>
                        <Typography.Text mark>
                          {`[${item.name}]`}
                        </Typography.Text>
                        {' '}
                        {item.value}
                      </List.Item>
                    )}
                  />
                ) : (
                  <Table
                    pagination={false}
                      // @ts-ignore
                    columns={Object.keys(datasource[2][key] ?? {}).map(
                      (k) => ({ title: k, dataIndex: k, k: key }),
                    )}
                      // @ts-ignore
                    dataSource={[datasource[2][key]]}
                  />
                )}
              </Descriptions.Item>
            ))
            : null}
        </Descriptions>
      </div>
    ),
    [datasource],
  )

  const ConfigEdit = useMemo(
    () => (
      <>
        <Editor
          height="500px"
          language="yaml"
          theme="vs-dark"
          value={`# 编辑Prometheus配置信息 \n ${configValue}`}
          options={{
            automaticLayout: true,
            wordWrap: 'on',
            readOnly: false,
          }}
          onMount={handleEditorMount}
          onChange={(value) => {
            setConfigValue(value ?? '')
          }}
        />
        <Button
          style={{
            marginTop: '20px',
          }}
          type="primary"
          onClick={() => {
            reloadPromethes(configValue)
          }}
        >
          Reload Prometheus
        </Button>
      </>
    ),
    [datasource],
  )

  const renderTabs = useMemo(
    () => [
      {
        key: 'runtime-information',
        label: '运行时信息',
        children: RuntimeInfoCpn,
      },
      {
        key: 'build-information',
        label: '构建信息',
        children: BuildInfoCpn,
      },
      {
        key: 'TSDB-information',
        label: '时序数据库信息',
        children: TSDBInfoCpn,
      },
      {
        key: 'config-edit',
        label: '配置信息编辑',
        children: ConfigEdit,
      },
    ],
    [datasource],
  )

  return (
    <Card style={{}}>
      <Row
        style={{
          height: '1200px',
          overflow: 'auto',
        }}
      >
        <Col span={24}>
          <Tabs defaultActiveKey="runtime-information" items={renderTabs} />
        </Col>
      </Row>
    </Card>
  )
}

export default Datasource
