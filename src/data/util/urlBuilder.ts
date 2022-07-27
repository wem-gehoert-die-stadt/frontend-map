const urlBuilder: (endpoint: string) => string = (endpoint) =>
  `${process.env.REACT_APP_BACKEND}/${endpoint}`

export default urlBuilder
