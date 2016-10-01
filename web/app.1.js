
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
    })


    /**
     * Find using
     * https://www.cannabisreports.com/api/v1.0/strains/search/{{name}}
     * https://www.cannabisreports.com/api/v1.0/strains/{{ucpc}}/effectsFlavors
     * 
     */
	$('.find-strain button').click((e) => {
        const strain = $('.find-strain input').val()
        page(`/strain/${strain}`)

	})


    /**
     * Page Routing
     */
    page.base('/web')

    page('/', () => {
    })

    page('/about', () => {
    })

    /**
     * Find by strain
     * https://www.cannabisreports.com/api/v1.0/strains/search/{{name}}
     * https://www.cannabisreports.com/api/v1.0/strains/{{ucpc}}/effectsFlavors
     * 
     */
    page('/strain/:name', (ctx) => {

        let strain = ctx.params.name
        $.getJSON(`${api}/strains/search/${strain}?callback=?`, (data) => {
            $('.strain').html(strainTemplate.render(data))
            products = data
        })
    })

    page({hashbang:true})

})