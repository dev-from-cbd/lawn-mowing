/**
 * Return value from percent of a number.
 *
 * @param {Number} percent
 * @param {Number} total
 *
 * @return {Number}
 */
function percentToValue(percent, total) {
    return parseInt((total / 100) * percent);
}

/**
 * Convert degree to radian
 *
 * @param {Number}   degree
 *
 * @return {Number}
 */
function degreeToRadian(degree) {
    return ((degree - 90) * Math.PI) / 180;
}

jQuery(document).ready(function($) {
    var $win = $(window),
        isTouch = !!('ontouchstart' in window),
        clickEvent = isTouch ? 'tap' : 'click';

    (function(){
        // Global slider's DOM elements
        var $example = $('.ms-slider3'),
            $frame = $('.frame', $example),
            $slides = $('.slide_element', $frame).children(),
            $thumbnailsBar = $('div#thumbnails ul', $example),
            $timerEL = $('canvas', $example),
            ctx = $timerEL[0] && $timerEL[0].getContext("2d"),
            slideSize = '70%',
            lastIndex = -1;

        /**
         * Draw arc on canvas element
         *
         * @param {Number}   angle
         *
         * @return {Void}
         */
        function drawArc(angle) {
            var startingAngle = degreeToRadian(0),
                endingAngle = degreeToRadian(angle),
                size = 160,
                center = size / 2;

            //360Bar
            ctx.clearRect(0, 0, size, size);
            ctx.beginPath();
            ctx.arc(center, center, center-4, startingAngle, endingAngle, false);
            ctx.lineWidth = 8;
            ctx.strokeStyle = "#aaa";
            ctx.lineCap = "round";
            ctx.stroke();
            ctx.closePath();
        }

        // Calling mightySlider via jQuery proxy
        $frame.mightySlider({
                speed: 1500,
                startAt: 2,
                autoScale: 1,
                easing: 'easeOutExpo',

                // Navigation options
                navigation: {
                    slideSize: slideSize,
                    keyboardNavBy: 'slides',
                    activateOn: clickEvent
                },

                // Thumbnails options
                thumbnails: {
                    thumbnailsBar: $thumbnailsBar,
                    thumbnailNav: 'forceCentered',
                    activateOn: clickEvent,
                    scrollBy: 0
                },

                // Dragging options
                dragging: {
                    mouseDragging: 0,
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
                    if (lastIndex !== index) {
                        // Hide the timer
                        $timerEL.stop().css({ opacity: 0 });

                        // Remove next and previous classes from the slides
                        $slides.removeClass('next_1 next_2 prev_1 prev_2');

                        // Detect next and prev slides
                        var next1 = this.slides[index + 1],
                            next2 = this.slides[index + 2],
                            prev1 = this.slides[index - 1],
                            prev2 = this.slides[index - 2];

                        // Add next and previous classes to the slides
                        next1 && $(next1.element).addClass('next_1');
                        next2 && $(next2.element).addClass('next_2');
                        prev1 && $(prev1.element).addClass('prev_1');
                        prev2 && $(prev2.element).addClass('prev_2');
                    }

                    lastIndex = index;
                },

                // Register mightySlider :moveEnd event callback
                moveEnd: function() {
                    // Reset cycling progress time elapsed
                    this.progressElapsed = 0;
                    // Fade in the timer
                    $timerEL.animate({ opacity: 1 }, 800);
                },

                // Register mightySlider :progress event callback
                progress: function(name, progress) {
                    // Draw circle bar timer based on progress
                    drawArc(360 - (360 / 1 * progress));
                },

                // Register mightySlider :initialize and :resize event callback
                'initialize resize': function(name) {
                    var self = this,
                        frameSize = self.relative.frameSize,
                        slideSizePixel = percentToValue(slideSize.replace('%', ''), frameSize),
                        remainedSpace = (frameSize - slideSizePixel),
                        margin = (slideSizePixel - remainedSpace / 3) / 2;

                    // Sets slides margin
                    $slides.css('margin', '0 -' + margin + 'px');
                    // Reload immediate
                    self.reload(1);
                }
            });
    })();
});