export async function client(endpoint: any, { body, ...customConfig } : any = {}) {
    const headers = { 'Content-Type': 'application/json' }
  
    const config = {
      method: body ? 'POST' : 'GET',
      ...customConfig,
      headers: {
        ...headers,
        ...customConfig.headers,
      },
    }
  
    if (body) {
      config.body = JSON.stringify(body)
    }
  
    let data
    try {
      const response = await window.fetch(endpoint, config)
      data = await response.json()
      if (response.ok) {
        return {
          status: response.status,
          data,
          headers: response.headers,
          url: response.url,
        }
      }
      throw new Error(response.statusText)
    } catch (err : any) {
      return Promise.reject(err.message ? err.message : data)
    }
  }
  
  client.get = function (endpoint : any, customConfig = {}) {
    return client(endpoint, { ...customConfig, method: 'GET' })
  }
  
  client.post = function (endpoint : any, body: any, customConfig = {}) {
    return client(endpoint, { ...customConfig, body })
  }
  