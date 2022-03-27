function init() {
    createList();
    makeCarousel();
    windowScroll();
}

init();

function montaElemento() {
    let html = '< class="carrossel-filmes"><div class="owl-carousel owl-theme">';

    for (let i = 1; i <= 10; i++) {
        html += '<div class="item" data-numero-imagem=' + i + '>' +
            '<div class="imagem-' + i + '" style="height:400px;background-image: url(../img/mini-' + i + '.jpg);background-size: contain;background-repeat: no-repeat;">' +
            '</div>' +
            '</div>';
    }

    html += '</div></div>';
    return html;
}

function createList() {
    $('body').after(montaElemento());
}

function makeCarousel() {
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
}


function windowScroll() {
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
}

const base_url = "https://api.jikan.moe/v3";


function searchAnime(event) {
    fetch(`${base_url}/anime/32`)
        .then(res => res.json())
        .then(testefunction);
}

function testefunction(data) {
    const animeByCategories = data;

    console.log(animeByCategories.image_url);
}

searchAnime();
$('.arrow').hover(function () {
    $(this).toggleClass('active-teste');
});

$('.profile img').hover(function () {
    $('.arrow').toggleClass('active-teste');
});
