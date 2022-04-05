var listAnime = '';
const ERROR_NOT_FOUND = 404;
const ERROR_TO_MUCH_REQUEST = 429;
const base_url = "https://api.jikan.moe/v4";
const ERROR_INTERNAL_SERVER = 500;
function init() {
    makeListAnimes();
    windowScroll();
    makeListAnimes();
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
    showText();
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
        await new Promise(r => setTimeout(r, 500));
        await awaitTempo(600);
        await animes(number).then(data => { console.log(i); i != 8 ? montaLista(data) : finalizaLista(data) });
    }
}

async function animes(num) {
    var teste = await fetch(`${base_url}/anime/${num}`);
    return await teste.json();
}

async function awaitTempo(time){
    await new Promise(r => setTimeout(r, time));
    console.log("tempo");
    return 10;
}

function montaLista(data) {
    makeListAnime(data);
    let number = parseInt($('.texto-loader').text());
    $('.texto-loader').text(number - 1);
}

function makeListAnime(data) {
    let animeId;

    if (![ERROR_NOT_FOUND, ERROR_TO_MUCH_REQUEST, ERROR_INTERNAL_SERVER].includes(parseInt(data.status))) {
        animeId = data.data.mal_id;
        data.data.genres.forEach((value) => { if (value.name == 'Hentai') { data.data.images.jpg.image_url = null; } });
    } else {
        animeId = '11061';
    }

    listAnime += '<div class="item">' +
        '<div style="background-image: url(' + trataDataImage(data) + ');"  data-show-modal data-id-anime="' + animeId + '" >' +
        '</div>' +
        '</div>';

}

function finalizaLista(data) {
    makeListAnime(data);
    montaElemento();
}

function trataDataImage(data) {
    if ([ERROR_NOT_FOUND, ERROR_TO_MUCH_REQUEST, ERROR_INTERNAL_SERVER].includes(parseInt(data.status))) {
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

function showText() {
    $(".subtitulo").hover(function () {
        $(".text").animate({
            left: "+=50",
            width: "toggle"
        });
    })
}

$(document).on("click", '[data-close-modal]', function () {
    if ($(window).width() > 650) {
        $(".modal").fadeToggle("slow");
    }
})

$(document).on("click", '[data-show-modal]', async function () {
    if ($(window).width() > 650) {
        let animeId = $(this).data('id-anime');
        await getAnimeById(animeId).then(data => { makeContentModal(data) });
        $(".modal").fadeToggle("slow");
    }
})

async function getAnimeById(animeId) {
    var teste = await fetch(`${base_url}/anime/${animeId}`);
    return await teste.json();
}

function makeContentModal(data) {
    setBackgroundImage(data);
    setAnimeTitle(data.data);
    setAnimeDataAiring(data.data);
    setAnimeSynopsis(data.data);
    setAnimeGenres(data.data);
}

function setBackgroundImage(data) {
    $(".modal-top").css("background-image", 'url(' + trataDataImage(data) + ')')
}

function setAnimeTitle(data) {
    $(".anime-title").text(data.title);
}

function setAnimeDataAiring(data) {
    $('.date').text(data.aired.string);
}

function setAnimeSynopsis(data) {
    $('.sinopse-modal').text(data.synopsis);
}

function setAnimeGenres(data) {
    let genres = data.genres.map((value) => value.name);
    $('.themes').text("Generos : " + genres.join(', ') + ".");
}

$(document).keydown(function (event) {
    if (event.keyCode == 27) {
        if ($(".modal").is(":visible")) {
            $(".modal").fadeToggle("slow");
        }
    }
});
