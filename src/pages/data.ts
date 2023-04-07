const addRecord = (filename: string, key: string) => {
  const res = localStorage.getItem('history')
  const history = res ? JSON.parse(res) : {}
  history[filename] = key
  localStorage.setItem('history', JSON.stringify(history))
}

const queryRecord = (filename: string) => {
  const res = localStorage.getItem('history')
  const history = res ? JSON.parse(res) : {}
  return history[filename]
}

const queryAllRecords = () => {
  const res = localStorage.getItem('history')
  const history = res ? JSON.parse(res) : {}
  return history
}

export { queryAllRecords, queryRecord, addRecord }
