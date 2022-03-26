$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    responsive: {
        0: {
            items: 2
        },
        600: {
            items: 3
        },
        1000: {
            items: 5
        }
    }
});


$(window).on("scroll", function () {
    if ($(window).scrollTop() > 30) {
        $("header .container").css('background-color', 'rgba(0,0,0, .50)');
    } else {
        //remove the background property so it comes transparent again (defined in your css)
        $("header .container").css('background-color', 'rgba(0, 0, 0, .10)');
    }
    
    if ($(window).scrollTop() > 110) {
        $("header .container").css('background-color', 'rgba(0,0,0, .70)');
    } 
    
    if ($(window).scrollTop() > 150) {
        $("header .container").css('background-color', 'rgba(0,0,0)');
    } 
});