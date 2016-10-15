/**
 * Get a collection of strainsView
 */
class StrainSearch extends Backbone.Collection {
    get model() {return Strain}
    get url() {return `${api}/strains/search/${this.name}?callback=?`}

    initialize(options) {
        this.name = options.name
    }
    
    parse(response, options) {
        return response.data
    }
}
