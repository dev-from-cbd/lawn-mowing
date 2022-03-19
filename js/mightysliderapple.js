jQuery(document).ready(function($) {
    var $win = $(window),
        isTouch = !!('ontouchstart' in window),
        clickEvent = isTouch ? 'tap' : 'click';

    (function(){
        // Global slider's DOM elements
        var $example = $('.ms-slider-apple'),
            $frame = $('.frame', $example);

        // Calling mightySlider via jQuery proxy
        $frame.mightySlider({
                speed: 1000,
                easing: 'easeOutExpo',
                viewport: 'center',

                // Navigation options
                navigation: {
                    slideSize: '100%',
                    keyboardNavBy: 'slides'
                },

                // Dragging options
                dragging: {
                    swingSpeed:    0.1
                },

                // Thumbnails options
                thumbnails: {
                    thumbnailNav: 'forceCentered',
                    activateOn: clickEvent
                },

                // Commands options
                commands: {
                    pages: 1,
                    thumbnails: 1,
                    buttons: 1
                }
            },

            // Register callbacks to the events
            {
                // Register mightySlider :active event callback
                active: function(name, index){
                    var skin = this.slides[index].options.skin || '';
                    $example.removeClass('black').addClass(skin);
                }
            });
    })();
});