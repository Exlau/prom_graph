const distinctChart = (data) => {
  const groupedData = data.reduce((acc, curr) => {
    const metric = curr.metric;
    const key = JSON.stringify(metric);

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(curr.value);

    return acc;
  }, {});

  console.log("groupedData: ",groupedData)
  return groupedData
}

module.exports = {
  distinctChart
}
