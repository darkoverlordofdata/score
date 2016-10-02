let tpl = {

    // Hash of preloaded templates for the app
    templates:{},

    // Recursively pre-load all the templates for the app.
    // This implementation should be changed in a production environment. All the template files should be
    // concatenated in a single file.
    loadTemplates(names, callback) {

        let loadTemplate = (index) => {
            let name = names[index]
            console.log('Loading template: ' + name)
            $.get('tpl/' + name + '.liquid', (html) => {
                this.templates[name] = Liquid.Template.parse(html)
                index++
                if (index < names.length) {
                    loadTemplate(index)
                } else {
                    callback()
                }
            })
        }

        loadTemplate(0)
    },

    // Get template by name from hash of preloaded templates
    get(name) {
        return this.templates[name]
    }

}
$(() => {
    const api = 'https://www.cannabisreports.com/api/v1.0'

    let products = {data:[]}
    let App = null


    tpl.loadTemplates(['search', 'strain', 'about'], () => {
        App = new AppRouter()
        Backbone.history.start()
    })

    class SearchView extends Backbone.View {
		get el()  {return $('.client')}

        render() {
            this.el.html(tpl.get('search').render({}))
        }

    }

    class AboutView extends Backbone.View {
		get el()  {return $('.client')}
        
        render() {
            this.el.html(tpl.get('about').render({}));
        }
    }

    let searchView = new SearchView()
    let aboutView = new AboutView()

    class AppRouter extends Backbone.Router {
        get routes() {
            return {
                '': 'index',
                'about': 'about',
                'strain/:name': 'search'
            }
        }

        index() {
            searchView.render()
        }
        about() {
            aboutView.render()
        }
        search(name) {
            searchView.render()
        }
    }

})