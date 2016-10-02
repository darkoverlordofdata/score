
$(() => {

    const api = 'https://www.cannabisreports.com/api/v1.0/strains'

    class Item extends Backbone.Model {
        get url() {return `${api}/${this.name}`}
        get defaults() {
            return {name: '', ucpc: '', image: ''}
        }
    }
    
    
    class SearchList extends Backbone.Collection {
        get model() {return Item}
        get url() {return `${api}/search/kush?callback=?`}

        parse(response, options) {
            return response.data
        }
    }

    class ListView extends Backbone.View {
        get el() {return "#strains"}
        get template() {return _.template($('#strainTemplate').html())}

        render(eventName) {
            this.model.models.forEach((strain) => {
                let strainTemplate = this.template(strain.toJSON())
                $(this.el).append(strainTemplate)
            })
            return this
        }
    }

    class AppView extends Backbone.View {
        get el() {return $('body')}
        get events() {
            return {'click div.find-strain': 'onclick'}
        }

        onclick(e) {
            const strain = $('.find-strain input').val()
            this.app.navigate(`strain/${strain}`, {trigger:true})
        }

        initialize(){
            this.app = new AppRouter()

            // let strains = new SearchList()
            // let strainsView = new ListView({
            //     model: strains
            // })

            // // When strains have been successfully grabbed, display them using strain template
            // strains.bind('reset', () => {
            //     strainsView.render()
            // })

            // strains.fetch({
            //     success: () => strainsView.render()
            // })
        }

    }

    class AppRouter extends Backbone.Router {
        get routes() {
            return {
                '': 'index',
                'about': 'about',
                'strain/:name': 'search'
            }
        }

        index() {
        }
        about() {
        }
        search(name) {
            console.log('Search ', name)
        }
    }

    var App = new AppView()

    Backbone.history.start()

})