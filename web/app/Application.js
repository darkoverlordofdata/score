const api = 'https://www.cannabisreports.com/api/v1.0'

    // Enter a strain name in browser, lookup by:
    //   https://www.cannabisreports.com/api/v1.0/strains/search/{{ name }}

    // use returned data[0] (name needs to match)
    //   https://www.cannabisreports.com/api/v1.0/strains/{{ ucpc }}/effectsFlavors

/**
 * front end controller
 */
class Application extends Backbone.Router {
    static main() {
        getTemplates(['about', 'search', 'strain'], (templates) => {
            new Application({templates: templates})
            Backbone.history.start()
        })
    }    

    get routes() {
        return {
            '': 'index',
            'about': 'about',
            'strain/:name': 'search'
        }
    }

    initialize(options) {
        this.templates = options.templates
        this.defaultView = new DefaultView({app: this})
        this.aboutView = new AboutView({app: this})
        this.strainsView = null
    }

    index() {
        this.defaultView.render()
    }

    about() {
        this.aboutView.render()
    }

    search(name) {
        let strains = new StrainSearch({name: name})
        this.strainsView = new StrainView({app: this, model: strains})
        strains.bind('reset', () => this.strainsView.render())
        strains.fetch({success: () => this.strainsView.render()})
    }

}

function getTemplates(names, next) {
    const request = []
    const templates = {}

    names.forEach(name => {request.push(getUrl(`tpl/${name}.liquid`))})
    Promise.all(request)
    .then(data => {
        data.forEach((item, index) => {
            templates[names[index]] = Liquid.Template.parse(item)
        })
        next(templates)
    })
    .catch(err => {
        console.log('ERROR:', err)
    })
}

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

