import React, { useEffect, useState } from 'react'
import DockerList from './DockerList'
import { getContainersList } from './service/docker'
import { ContainerInfo } from './types'

function ConfigPage() {
  const [containerList, setContainerList] = useState<ContainerInfo[]>([])

  useEffect(() => {
    getContainersList().then((res) => {
      setContainerList(res)
    })
  }, [])

  return (
    <DockerList containerList={containerList ?? []} />
  )
}

export default ConfigPage
