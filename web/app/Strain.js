/**
 * Model for single strain
 */
class Strain extends Backbone.Model {
    get url() {return `${api}/${this.name}`}
    get defaults() {
        return {name: '', ucpc: '', image: ''}
    }
}
