import React from 'react'
import { Badge, Descriptions } from 'antd'
import { ContainerInfo } from './types'

function ContainerStatus({ containerInfo }:{containerInfo:ContainerInfo}) {
  return (
    <Descriptions title="Container Info" bordered>
      {
        containerInfo ? Object.keys(containerInfo).map((key) => {
          if (key === 'state') {
            return (
              <Descriptions.Item label={key}>
                <Badge status={containerInfo.state === 'running' ? 'processing' : 'error'} text={containerInfo.state} />
              </Descriptions.Item>
            )
          }
          if (key === 'labels') {
            return (
              <Descriptions.Item label="labels">
                {
              containerInfo?.labels ? Object.keys(containerInfo?.labels).map((label) => `${label}: ${containerInfo?.labels[label]}`) : null
              }
              </Descriptions.Item>
            )
          }
          return (
            <Descriptions.Item label={key}>
              {/* @ts-ignore */}
              {containerInfo[key]}
            </Descriptions.Item>
          )
        }) : null
      }
    </Descriptions>
  )
}

export default ContainerStatus
