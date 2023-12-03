/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { CSSProperties, useMemo } from 'react'
import { Table, TableColumnsType, Tag } from 'antd'
import { VectorData, VectorTableData } from './chartTypes'

const columns: TableColumnsType<VectorData> = [
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
  },
  {
    title: 'time',
    dataIndex: 'time',
    key: 'time',
  },
]

const TagColorMap:{
  [key:string]:string;
} = {
  cpu: '#2db7f5',
  instance: 'cyan',
  job: 'purple',
  mode: 'geekblue',
}

const generateTags = (tagJson:string) => {
  const { labels } = JSON.parse(tagJson)
  return (
    <div>
      {
        labels
          ? Object.keys(labels).map((label) => <Tag color={TagColorMap[label] ?? 'geekblue'}>{`${label}=${labels[label]}`}</Tag>)
          : <div />
      }
    </div>
  )
}

// eslint-disable-next-line react/require-default-props
export function VectorTable(props:{panelData: VectorTableData, style?:CSSProperties}) {
  const { panelData, style = {} } = props
  const dataSet: any[] = useMemo(() => {
    const dataSetTemp: any[] = []
    Object.keys(panelData).forEach((key: string) => {
      dataSetTemp.push({
        tagJson: key,
        data: [
          {
            value: panelData[key][0]?.value,
            time: panelData[key][0]?.time,
          },
        ],
      })
    })
    return dataSetTemp
  }, [panelData])

  return (
    <div
      style={style}
      onClick={(e) => { e.stopPropagation() }}
    >
      {dataSet.map((data) => (
        // eslint-disable-next-line max-len
        <Table
          caption={generateTags(data.tagJson)}
          columns={columns}
          dataSource={data.data}
          pagination={false}
        />
      ))}
    </div>
  )
}

export default VectorTable
