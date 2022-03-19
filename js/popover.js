$(function() {
    $('[data-toggle="tooltip"]').tooltip()
});

$(function() {
    $('[data-toggle="popover"]').popover()
});

$(function() {
    // prevents jumping
    $("a.pop-me-over").on("click", function(e) {
        e.preventDefault();
        return true;
    });
    $(".pop-me-over").popover();
});

$('input:disabled').after(function (e) {
    var d = $("<div>");
    var i = $(this);
    d.css({
        height: i.outerHeight(),
        width: i.outerWidth(),
        position: "absolute"
    });
    d.css(i.offset());
    d.attr("title", i.attr("title"));
    d.tooltip();
    return d;
});

$(window).load(function(){
    $('.pops').popover();
});