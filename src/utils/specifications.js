
export function specifications(selectedData = []) {
  function originalDataBecomeSimpleTableData(finallyData,addData){
    let linshi = []

    finallyData.forEach(item=>{
      addData.forEach(item2=>{
        linshi.push([].concat(item,item2))
      })
    })
    return linshi
  }
  var tableList = []

  // console.log(JSON.parse(JSON.stringify(selectedData)))
  if(selectedData.length > 0){
    let simpleTableList = selectedData.splice(0,1)[0]

    // console.log(JSON.parse(JSON.stringify(simpleTableList)))
    // console.log(JSON.parse(JSON.stringify(selectedData)))
    if(selectedData.length > 0){
      selectedData.forEach((item,index,original)=>{
        simpleTableList = originalDataBecomeSimpleTableData(simpleTableList,item)
      })
      // console.log(simpleTableList)
      simpleTableList.forEach(item=>{
        // console.log(item,'----------------')

        let ids = [],names = []

        item.forEach(item2=>{
          ids.push(item2.id)
          names.push(item2.topTitleName + '-' + item2.name)
        })
        tableList.push({
          ids: ids.join(','),
          names: names.join(','),
          original: [...item]
        })

      })
    }else{
      tableList = simpleTableList.map(item=>{
        item.original = [{...item}]
        item.ids = item.id
        item.names = item.name
        return item
      })
    }
    console.log(JSON.parse(JSON.stringify(tableList)))

    return tableList
  }
}