
(($) => {
    
    /** 
     * `Backbone.sync`: Overrides persistence storage with dummy function. 
     * This enables use of `Model.destroy()` without raising an error.
     */
    Backbone.sync = function(method, model, success, error){
        success()
    }

    class Item extends Backbone.Model {
        constructor() {
            super({part1: 'hello',part2: 'world'})
        }
    }

    class List extends Backbone.Collection {
        get model() {return Item}
    }


    class ItemView extends Backbone.View {
        get tagName() { return 'li'} 
        get events()  {
            return {
                'click span.swap':  'swap',
                'click span.delete': 'remove'
            }
        }

        /**
         * `initialize()` 
         *  now binds model change/removal to the corresponding handlers below.
         */
        initialize(){
            _.bindAll(this, 'render', 'unrender', 'swap', 'remove') // every function that uses 'this' as the current object should be in here

            this.model.bind('change', this.render)
            this.model.bind('remove', this.unrender)
        }

        /**  
         *`render()` 
         * now includes two extra `span`s corresponding to the actions swap and delete.
         */
        render(){
            $(this.el).html(
                `<span style="color:black;">${this.model.get('part1')} ${this.model.get('part2')}</span> &nbsp; &nbsp; `+
                '<span class="swap" style="font-family:sans-serif; color:blue; cursor:pointer;">[swap]</span> '+
                '<span class="delete" style="cursor:pointer; color:red; font-family:sans-serif;">[delete]</span>'                
            )
                // '<span style="color:black;">'+
                // this.model.get('part1')+' '+this.model.get('part2')+'</span> &nbsp; &nbsp; '+
                // '<span class="swap" style="font-family:sans-serif; color:blue; cursor:pointer;">[swap]</span> '+
                // '<span class="delete" style="cursor:pointer; color:red; font-family:sans-serif;">[delete]</span>'
                // )
            return this // for chainable calls, like .render().el
        }

        /**
         *  `unrender()`: 
         *  Makes Model remove itself from the DOM.
         */
        unrender(){
            $(this.el).remove()
        }

        /** 
         * `swap()` 
         * will interchange an `Item`'s attributes. 
         * When the `.set()` model function is called, the event `change` will be triggered.
         */
        swap() {
            var swapped = {
                part1: this.model.get('part2'),
                part2: this.model.get('part1')
            }
            this.model.set(swapped)
        }
        /**
         * `remove()` 
         * We use the method `destroy()` to remove a model from its collection. 
         * Normally this would also delete the record from its persistent storage, 
         * but we have overridden that (see above).
         */
        remove(){
            this.model.destroy()
        }
    }

    class ListView extends Backbone.View {

        get el() {return $('body')}
        get events() {
            return {
                'click button#add': 'addItem'
            }
        }

        initialize(){
            _.bindAll(this, 'render', 'addItem', 'appendItem') 

            this.collection = new List()
            this.collection.bind('add', this.appendItem) 

            this.counter = 0
            this.render()
        }

        render() {
            $(this.el).append("<button id='add'>Add list item</button>")
            $(this.el).append("<ul></ul>")
            console.log(this.collection.models)
            this.collection.models.forEach((item) => {
                this.appendItem(item)
            })
        }

        addItem() {
            this.counter++
            var item = new Item()
            item.set({
                part2: item.get('part2') + this.counter // modify item defaults
            })
            this.collection.add(item)
            }
            appendItem(item){
            var itemView = new ItemView({
                model: item
            })
            $('ul', this.el).append(itemView.render().el)
        }
    }

    var listView = new ListView()

})(jQuery)
