const parseTsv = <T>(data: string): T[] => {
  const rows = data
    .replace(/\r/g, '')
    .split('\n')
    .map((row) => row.split('\t'))
    .filter((row) => row[0] !== '')
  const headerRow = rows[0]
  const dataRows = rows.slice(1)

  return dataRows.map((dataRow) => {
    const namedObject = {}
    dataRow.forEach((cell, index) => {
      namedObject[headerRow[index]] = cell
    })
    return namedObject as T
  })
}

export default parseTsv
