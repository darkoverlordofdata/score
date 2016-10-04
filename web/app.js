

$(() => {
    const api = 'https://www.cannabisreports.com/api/v1.0'
    const templates = {}
    let products = {data:[]}

    getTemplates(templates, ['about', 'search', 'strain'], () => {
        new AppRouter()
        Backbone.history.start()
    })

    class AppRouter extends Backbone.Router {
        get routes() {
            return {
                '': 'index',
                'about': 'about',
                'strain/:name': 'search'
            }
        }

        initialize(options) {
            this.searchView = new SearchView({app:this})
            this.aboutView = new AboutView({app:this})
            
        }

        index() {
            this.searchView.render()
        }
        about() {
            this.aboutView.render()
        }
        search(name) {
            let strains = new SearchList({name: name})
            let strainsView = new StrainView({model: strains})
            strains.bind('reset', () => strainsView.render())
            strains.fetch({success: () => strainsView.render()})
        }
    }

    
    class Item extends Backbone.Model {
        get url() {return `${api}/${this.name}`}
        get defaults() {
            return {name: '', ucpc: '', image: ''}
        }
    }
    
    class SearchList extends Backbone.Collection {
        get model() {return Item}
        get url() {return `${api}/strains/search/${this.name}?callback=?`}

        initialize(options) {
            this.name = options.name
        }
        parse(response, options) {
            return response.data
        }
    }

    class SearchView extends Backbone.View {
		get el()  {return $('.client')}
        get events() {
            return {'click div.find-strain': 'onclick'}
        }

        initialize(options) {
            this.app = options.app
        }
        onclick(e) {
            const strain = $('.find-strain input').val()
            this.app.navigate(`strain/${strain}`, {trigger:true})
        }
        render() {
            this.el.html(templates.search.render({}))
        }
    }

    class StrainView extends Backbone.View {
		get el()  {return $('.client')}
        
        initialize(options) {
            this.app = options.app
        }

        render(eventName) {
            this.el.html(templates.strain.render({data: this.model.toJSON()}))
            return this
        }
    }

    class AboutView extends Backbone.View {
		get el() {return $('.client')}
        
        initialize(options) {
            this.app = options.app
        }

        render() {
            this.el.html(templates.about.render({}));
        }
    }

})
