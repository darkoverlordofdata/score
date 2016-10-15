/**
 * Get a collection of strainsView
 */
class EffectSearch extends Backbone.Collection {
    //   https://www.cannabisreports.com/api/v1.0/strains/{{ ucpc }}/effectsFlavors
    get model() {return Strain}
    get url() {return `${api}/strains/${this.ucpc}/effectsFlavors?callback=?`}

    initialize(options) {
        this.ucpc = options.ucpc
    }
    
    parse(response, options) {
        return response.data
    }
}
