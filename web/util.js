function getUrl(url, type='text') {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('get', url, true)
        xhr.responseType = type
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.response)
            } else {
                reject(xhr.status)
            }
        }
        xhr.send()
    })
}

function getTemplates(templates, names, next) {
    const req = []
    names.forEach(name => {req.push(getUrl(`tpl/${name}.liquid`))})
    Promise.all(req)
    .then(data => {
        data.forEach((item, index) => {
            templates[names[index]] = Liquid.Template.parse(item)
        })
        next()
    })
    .catch(err => {
        console.log('ERROR:', err)
    })

}

