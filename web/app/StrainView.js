/**
 * Display strain data
 */
class StrainView extends Backbone.View {
    get el()  {return $('.view')}
    
    initialize(options) {
        this.app = options.app
        this.templates = this.app.templates
    }

    render(eventName) {
        this.el.html(this.templates.strain.render({data: this.model.toJSON()}))
        return this
    }
}
