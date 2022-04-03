var listAnime = '';
const ERROR_NOT_FOUND = 404;

function init() {
    makeListAnimes();
    windowScroll();
}

init();

function montaElemento() {
    let html = '<div class="carrossel-filmes"><div class="bloco-subtitulo"><h2 class="subtitulo">Animes</h2><div class="text">Explorar mais <i class="fa-solid fa-angles-right"></i></div></div><div class="owl-carousel owl-theme">';

    html += listAnime;


    html += '</div></div>';
    createList(html);
}

function createList(html) {
    $('body').append(html);
    $('.bloco-loading').css("display", "none");
    makeCarousel();
    testes();
}

function makeCarousel() {
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            400: {
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
    for (i = 1; i <= 8; i++) {
        var number = Math.floor(Math.random() * 3500) + 100;
        await animes(number).then(data => { console.log(i); i != 8 ? montaLista(data) : finalizaLista(data) });
    }
}

async function animes(num) {
    const base_url = "https://api.jikan.moe/v4";

    var teste = await fetch(`${base_url}/anime/${num}`);
    return await teste.json();
}

function montaLista(data) {
    if (data.status != ERROR_NOT_FOUND && data.status != 429) {
        data.data.genres.forEach((value) => { if (value.name == 'Hentai') { data.data.images.jpg.image_url = null; } });
    }
    listAnime += '<div class="item">' +
        '<div style="background-image: url(' + trataDataImage(data) + ');">' +
        '</div>' +
        '</div>';

    let number = parseInt($('.texto-loader').text());
    $('.texto-loader').text(number - 1);
}

function finalizaLista(data) {
    listAnime += '<div class="item">' +
        '<div style="background-image: url(' + trataDataImage(data) + ');">' +
        '</div>' +
        '</div>';
    montaElemento();
}

function trataDataImage(data) {
    if (data.status == 429 || data.status == ERROR_NOT_FOUND) {
        return './img/mini-1.png';
    }
    return (data.data.images.jpg.image_url == null ? './img/mini-1.png' : data.data.images.jpg.image_url);
}

function trataToggle() {
    if ($(window).width() <= 720) {
        $('nav').hide();
        $('.nav-toggle i').removeClass('fa-xmark');
    } else {
        $('nav').show();
    }
}

$(document).ready(function () {
    trataToggle();
})


$(window).on('resize', function () {
    trataToggle();
})

$('.arrow').hover(function () {
    $(this).toggleClass('active-teste');
});

$('.profile img').hover(function () {
    $('.arrow').toggleClass('active-teste');
});

$('.nav-toggle').on('click', function () {
    $('.nav-toggle i').toggleClass('fa-xmark')
    $('nav').slideToggle();
})

function testes() {
    $(".subtitulo").hover(function () {
        $(".text").animate({
            left: "+=50",
            width: "toggle"
        });
    })
}

$(document).on("click", '[data-close-modal]', function () {
    $(".modal").hide();
})