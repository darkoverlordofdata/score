/**
 * Default view - search for strain
 */
class DefaultView extends Backbone.View {
    get el()  {return $('.view')}
    get events() {
        return {'click div.find-strain': 'onclick'}
    }

    initialize(options) {
        this.app = options.app
        this.templates = this.app.templates
    }

    onclick(e) {
        const strain = $('.find-strain input').val()
        this.app.navigate(`strain/${strain}`, {trigger:true})
    }
    
    render() {
        this.el.html(this.templates.search.render({}))
    }
}
