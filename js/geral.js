var listAnime = '';

function init() {
    makeListAnimes();
    windowScroll();
}

init();

function montaElemento() {
    let html = '<div class="carrossel-filmes"><div class="owl-carousel owl-theme">';

    html += listAnime;


    html += '</div></div>';
    createList(html);
}

function createList(html) {
    $('body').append(html);
    $('.bloco-loading').css("display", "none");
    makeCarousel();
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


async function makeListAnimes() {
    for (i = 1; i <= 10; i++) {
        var number = Math.floor(Math.random() * 1400) + 200;

        await animes(number).then(data => { console.log(i); i != 10 ? montaLista(data) : finalizaLista(data) });
    }
}

async function animes(num) {
    const base_url = "https://api.jikan.moe/v3";

    var teste = await fetch(`${base_url}/anime/${num}`);
    return await teste.json();
}

function montaLista(data) {
    listAnime += '<div class="item">' +
        '<div style="background-image: url(' + trataDataImage(data.image_url) + ');">' +
        '</div>' +
        '</div>';
}

function finalizaLista(data) {
    listAnime += '<div class="item">' +
        '<div style="background-image: url(' + trataDataImage(data.image_url) + ');">' +
        '</div>' +
        '</div>';
    montaElemento();
}

function trataDataImage(image) {
    return (image == null ? './img/mini-1.png' : image);
}


$('.arrow').hover(function () {
    $(this).toggleClass('active-teste');
});

$('.profile img').hover(function () {
    $('.arrow').toggleClass('active-teste');
});
