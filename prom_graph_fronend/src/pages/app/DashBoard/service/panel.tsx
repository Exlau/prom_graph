// import { AxiosResponse } from 'axios'
import { useMemo, useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'
import req from '../../../../api/request'
import { PrometheusResult } from '../../../../components/charts/chartTypes'
import { ChartType } from '../panelTypes'

export const queryPrometheus = async ({
  query,
  type,
}: {
  query: string;
  type: ChartType;
}): Promise<PrometheusResult> => {
  let response: AxiosResponse
  if (type === 'vector') {
    response = await req.get(`/prometheus/queryVector?queryExpr=${query}`)
  } else {
    response = await req.get(`/prometheus/query?queryExpr=${query}`)
  }
  const { data } = response
  return JSON.parse(data) as PrometheusResult
}

export const usePanelData = (
  queryArr: string[],
  type: ChartType,
): {data: PrometheusResult[]} => {
  const [PromResult, setPromResult] = useState<PrometheusResult[]>([])

  const queryPromiseArr = useMemo(
    () => queryArr?.map(
      (query) => () => new Promise((resolve) => {
        queryPrometheus({ query, type }).then((res) => {
          resolve(res)
        })
      }),
    ),
    [queryArr],
  )

  useEffect(() => {
    Promise.all(queryPromiseArr?.map((fn: any) => fn()) ?? []).then(
      (res: PrometheusResult[]) => {
        setPromResult(res)
      },
    )
  }, [queryPromiseArr])

  return {
    data: PromResult,
  }
}

export default {}
