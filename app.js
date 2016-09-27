$(() => {

    let products = []
    const template = Liquid.Template.parse($('#strain-template')[0].innerHTML)

    $('.strain').html(template.render({data:[]}))

    /**
     * Find using
     * https://www.cannabisreports.com/api/v1.0/strains/search/{{name}}
     * https://www.cannabisreports.com/api/v1.0/strains/{{ucpc}}/effectsFlavors
     * 
     */
	$('.find-strain button').click((e) => {
        let strain = $('.find-strain input').val()
        console.log('strain = ', strain)
        // Change the url hash;
        $.getJSON(`https://www.cannabisreports.com/api/v1.0/strains/search/${strain}?callback=?`, function( data ) {

            console.log(strain, data)
            products = data
            // Manually trigger a hashchange to start the app.
		    window.location.hash = `#${strain}`
            //$(window).trigger('hashchange')
        });

	})
	// Get data about our products from products.json.

    /**
     * selection made
     */
	$(window).on('hashchange', () => {
        console.log('hashchange', products)
		render(decodeURI(window.location.hash))
	})


    function render(url) {
        console.log('render', url, products)
        $('.strain').html(template.render({data: products.data}))
    }




})