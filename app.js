$(() => {

    let products = []

    /**
     * Find using
     * https://www.cannabisreports.com/api/v1.0/strains/search/{{name}}
     * https://www.cannabisreports.com/api/v1.0/strains/{{ucpc}}/effectsFlavors
     * 
     */
	$('.find-strain button').click((e) => {
        let strain = $('.find-strain input').val()
        // Change the url hash;
        createQueryHash(strain);
        $.getJSON(`https://www.cannabisreports.com/api/v1.0/strains/search/${strain}`, function( data ) {

            // Write the data into our global variable.
            products = data;
            console.log(data)

            // Manually trigger a hashchange to start the app.
            // $(window).trigger('hashchange');
        });

	})
	// Get data about our products from products.json.

    /**
     * selection made
     */
	$(window).on('hashchange', () => {
		render(decodeURI(window.location.hash))
	})


    function createQueryHash(strain) {
		window.location.hash = `#${strain}`
    }

    function render(url) {
        console.log('render', url)
    }




})