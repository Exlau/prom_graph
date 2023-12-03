import React from 'react'
import { Collapse, Row, Button } from 'antd'
import { ContainerInfo } from './types'
import ContainerStatus from './ContainerStatus'
import { restartContainer } from './service/docker'

const { Panel } = Collapse

function ContainerAction({ id }: ContainerInfo) {
  return (
    <Row>
      <Button
        type="primary"
        onClick={() => {
          restartContainer(id)
        }}
      >
        restart
      </Button>
    </Row>
  )
}

function DockerList({ containerList }: {containerList: ContainerInfo[]}) {
  return (
    <Collapse>
      {containerList
        ? containerList?.map((container) => (
          <Panel
            key={container.id}
            header={container.names}
            extra={<ContainerAction {...container} />}
          >
            <ContainerStatus containerInfo={container} />
          </Panel>
        ))
        : null}
    </Collapse>
  )
}

export default DockerList
