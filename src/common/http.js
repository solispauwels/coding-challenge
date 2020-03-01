export default (url, method = 'GET', params = null) => {
  const request = new window.XMLHttpRequest()

  return new Promise((resolve, reject) => {
    request.open(method, url, true)

    request.onload = () => {
      if (request.status === 200 || request.status === 201) {
        resolve(request.responseText)
      } else {
        reject(Error(request.status))
      }
    }
    request.onerror = reject
    request.send(params)
  })
}
