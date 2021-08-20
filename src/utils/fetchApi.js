const fetchApi = async (url, data=false) => {
    const response = await fetch(url, {
        method: data? 'POST': 'GET',
        body: data? data : null
    })
    return response.json()
}

export default fetchApi;