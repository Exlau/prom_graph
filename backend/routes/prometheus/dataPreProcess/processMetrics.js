 const processMetrics = (metadata) => {
  let metrics = []
  if (metadata) {
    metrics = Object.keys(metadata).map((key) => key)
  }
  return metrics
}

module.exports = {
  processMetrics
}
