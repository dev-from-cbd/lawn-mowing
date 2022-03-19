/**
 * Get viewport/window size (width and height).
 *
 * @return {Object}
 */
function getViewport() {
    var e = window,
        a = 'inner';
    if (!('innerWidth' in window)) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return {
        width: e[a + 'Width'],
        height: e[a + 'Height']
    }
}

jQuery(document).ready(function($) {
    var $win = $(window),
        isTouch = !!('ontouchstart' in window),
        clickEvent = isTouch ? 'tap' : 'click';

    (function(){
        /**
         * Calculate the slides width in percent based on the parent's width.
         *
         * @return {String}
         */
        function calculator(width){
            var percent = '50%';

            if (width <= 480) {
                percent = '60%';
            }
            else if (width <= 767) {
                percent = '55%';
            }

            return percent;
        };

        // Global slider's DOM elements
        var $example = $('.ms-slider1'),
            $frame = $('.frame', $example),
            $details = $('div.details', $example),
            $title = $('.title', $details),
            $description = $('.description', $details),
            lastIndex = -1;

        // Calling new mightySlider class
        var slider = new mightySlider($frame, {
                speed: 1000,
                startAt: 1,
                autoScale: 1,
                easing: 'easeOutExpo',

                // Navigation options
                navigation: {
                    slideSize: calculator(getViewport().width),
                    keyboardNavBy: 'slides',
                    activateOn: clickEvent
                },

                // Dragging options
                dragging: {
                    swingSpeed: 0.12,
                    onePage: 1
                },

                // Buttons options
                buttons: !isTouch ? {
                        prev: $('a.mSPrev', $frame),
                        next: $('a.mSNext', $frame)
                    } : {},

                // Cycling options
                cycling: {
                    cycleBy: 'slides'
                }
            },

            // Register callbacks to the events
            {
                // Register mightySlider :active event callback
                active: function(name, index) {
                    var slideOptions = this.slides[index].options;

                    if (lastIndex !== index)
                        $details.stop().animate({ opacity: 0 }, 500, function(){
                            $title.html(slideOptions.title);
                            $description.html(slideOptions.description);
                            $details.animate({ opacity: 1 }, 500);
                        });

                    lastIndex = index;
                }
            }).init();

        // Register window :resize event callback
        $win.resize(function(){
            // Update slider options using 'set' method
            slider.set({
                navigation: {
                    slideSize: calculator(getViewport().width)
                }
            });
        });
    })();
});