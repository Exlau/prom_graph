const formatLineChart = (data) => {
  const formattedData = data.map(({ metric, values }) => {
    const xData = []
    const seriesData = []
    values.forEach(({ time, value }) => {
      xData.push(new Date(time).getTime())
      seriesData.push(value)
    })
    return {
      metric,
      xData,
      seriesData
    }
  })

  return formattedData
}

module.exports = {
  formatLineChart
}