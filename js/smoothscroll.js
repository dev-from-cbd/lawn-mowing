$(document).ready(function() {
    var navHeight;
    var link = 'a[href^="#"]';
    if ($(window).width() <= 768) {
        navHeight = 150;
    }
    else {
        navHeight = 105;
    }

    $( 'a[href^="#"]' ).click(function() {
    // only do this if navigation is visible, otherwise you see jump in navigation while collapse() is called
    if ($(".navbar-collapse").is(":visible") && $(".navbar-toggle").is(":visible") ) {
        $('.navbar-collapse').collapse('toggle');
    }
});

$( 'a[href^="#"]:not(.modal-link)' ).click(function() {
    // only do this if navigation is visible, otherwise you see jump in navigation while collapse() is called
    if ($(".navbar-collapse").is(":visible") && $(".navbar-toggle").is(":visible") ) {
        $('.navbar-collapse').collapse('toggle');
    }
    var target = $(this.hash);
    if (target.length == 0) target = $('a[name="' + this.hash.substr(1) + '"]');
    if (target.length == 0) target = $('html');
    $('html, body').animate({ scrollTop: target.offset().top-navHeight }, 1000);
    return false;
});
});