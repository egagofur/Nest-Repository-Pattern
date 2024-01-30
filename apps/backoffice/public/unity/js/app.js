// svg icons support ie11
(function () {
    svg4everybody();
})();

// carousel arrows
var navArrows = [
    '\n    <svg class="icon icon-arrow-prev">\n        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-arrow-prev"></use>\n    </svg>',
    '<svg class="icon icon-arrow-next">\n        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-arrow-next"></use>\n    </svg>',
];

// owl carousel
$(document).ready(function () {
    var slider = $('.js-slider');
    slider.owlCarousel({
        items: 1,
        nav: false,
        dots: true,
        loop: true,
        smartSpeed: 700,
    });

    var sliderGoal = $('.js-slider-goal');
    sliderGoal.owlCarousel({
        items: 1,
        nav: true,
        navElement: 'button',
        navText: navArrows,
        dots: true,
        loop: true,
        smartSpeed: 700,
    });
});

// dropdown
(function () {
    var dropdown = $('.js-dropdown');
    dropdown.each(function () {
        var item = $(this);
        (head = item.find('.js-dropdown-head')),
            (body = item.find('.js-dropdown-body'));
        head.on('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            if (!item.hasClass('active')) {
                dropdown.removeClass('active');
                item.addClass('active');
            } else {
                dropdown.removeClass('active');
            }
        });
        body.on('click', function (e) {
            e.stopPropagation();
        });
        $('body').on('click', function () {
            dropdown.removeClass('active');
        });
    });
})();

// magnificPopup
(function () {
    var link = $('.js-popup-open');
    link.magnificPopup({
        type: 'inline',
        fixedContentPos: true,
        removalDelay: 200,
        callbacks: {
            beforeOpen: function beforeOpen() {
                this.st.mainClass = this.st.el.attr('data-effect');
            },
        },
    });
})();

// page
(function () {
    var page = $('.page'),
        sidebar = $('.sidebar'),
        burgerSidebar = sidebar.find('.sidebar__burger'),
        user = sidebar.find('.sidebar__user'),
        details = sidebar.find('.sidebar__details'),
        close = sidebar.find('.sidebar__close'),
        header = $('.header'),
        burgerHeader = header.find('.header__burger'),
        searchOpen = header.find('.header__search'),
        search = $('.search');
    burgerSidebar.on('click', function () {
        page.toggleClass('toggle');
        sidebar.toggleClass('active');
    });

    burgerHeader.on('click', function () {
        page.toggleClass('toggle');
        sidebar.toggleClass('active');
        $('body').toggleClass('no-scroll');
        $('html').toggleClass('no-scroll');
    });

    close.on('click', function () {
        page.removeClass('toggle');
        sidebar.removeClass('active');
        $('body').removeClass('no-scroll');
        $('html').removeClass('no-scroll');
    });

    searchOpen.on('click', function () {
        searchOpen.toggleClass('active');
        search.toggleClass('show');
        $('.notifications').removeClass('active');
    });

    user.on('click', function () {
        $(this).toggleClass('active');
        $(this).prev().toggle();
    });

    $('.search__toggle').on('click', function () {
        $('.notifications').removeClass('active');
        $('.search').toggleClass('active');
    });

    $('.notifications__open').on('click', function () {
        $('.notifications').toggleClass('active');
        $('.search').removeClass('active');
        searchOpen.removeClass('active');
        search.removeClass('show');
    });
})();

// toggle body theme
(function () {
    var switchTheme = $('.js-switch-theme'),
        body = $('body');

    switchTheme.on('change', function () {
        if (!body.hasClass('dark')) {
            body.addClass('dark');
            localStorage.setItem('darkMode', 'on');
        } else {
            body.removeClass('dark');
            localStorage.setItem('darkMode', 'off');
        }
    });
})();

(function () {
    var checkboxAll = $('.products__row_head .checkbox__input');
    checkboxAll.on('click', function () {
        if ($(this).is(':checked')) {
            $(this)
                .parents('.products__table')
                .find(
                    '.products__row:not(.products__row_head) .checkbox__input',
                )
                .prop('checked', true)
                .attr('checked', 'checked');
        } else {
            $(this)
                .parents('.products__table')
                .find(
                    '.products__row:not(.products__row_head) .checkbox__input',
                )
                .prop('checked', false)
                .removeAttr('checked');
        }
    });
})();

$('.schedules__item').on('click', function (e) {
    e.preventDefault();
    $('.schedules__item').removeClass('active');
    $(this).addClass('active');
});

$('.tabs__item').on('click', function (e) {
    e.preventDefault();
    $('.tabs__item').removeClass('active');
    $(this).toggleClass('active');
});

$('.tabs__link').on('click', function (e) {
    e.preventDefault();
    $('.tabs__link').removeClass('active');
    $(this).toggleClass('active');
});

$('.inbox__item').on('click', function () {
    $('.inbox__item').removeClass('active');
    $(this).toggleClass('active');
});

$('.notification__item').on('click', function () {
    $('.notification__item').removeClass('active');
    $(this).toggleClass('active');
});

$('.activity__item').on('click', function () {
    $('.activity__item').removeClass('active');
    $(this).toggleClass('active');
});
