$(() => {

    const api = 'https://www.cannabisreports.com/api/v1.0'

    let strainTemplate 
    let effectTemplate
    let products = {data:[]}

    /**
     * Load Liquid templates
     */
    $.get('tpl/strain.liquid', (html) => {
        strainTemplate = Liquid.Template.parse(html)
        $('.strain').html(strainTemplate.render(products))
    })
    
    $.get('tpl/effect.liquid', (html) => {
        effectTemplate = Liquid.Template.parse(html)
        $('.strain').html(effectTemplate.render(products))
    })


    /**
     * Wire up the events
     */
 	$(window).on('hashchange', () => render(decodeURI(window.location.hash)))

    /**
     * Find using
     * https://www.cannabisreports.com/api/v1.0/strains/search/{{name}}
     * https://www.cannabisreports.com/api/v1.0/strains/{{ucpc}}/effectsFlavors
     * 
     */
	$('.find-strain button').click((e) => {

        const strain = $('.find-strain input').val()

        $.getJSON(`${api}/strains/search/${strain}?callback=?`, (data) => {

		    window.location.hash = `#${strain}`
            $('.strain').html(strainTemplate.render(data))
            products = data
            //$(window).trigger('hashchange')
        })

	})


    /**
     * 
     */
    function render(url) {
        //$('.strain').html(strainTemplate.render(products))
    }

})