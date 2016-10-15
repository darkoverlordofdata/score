/** 
 * About application
 */
class AboutView extends Backbone.View {
    get el() {return $('.view')}
    
    initialize(options) {
        this.app = options.app
        this.templates = this.app.templates
    }

    render() {
        this.el.html(this.templates.about.render({}));
    }
}
