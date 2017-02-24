/* ----------------------------- 
Card Style Script
----------------------------- */
$(document).ready(function() {
    'use strict';
    var $el = $('#card-ul'),
        sectionFeature = $('#section-feature'),
        baraja = $el.baraja();

    if ($(window).width() > 480) {
        sectionFeature.appear(function() {
            baraja.fan({
                speed: 1500,
                easing: 'ease-out',
                range: 100,
                direction: 'right',
                origin: { x: 50, y: 200 },
                center: true
            });
        });
        $('#feature-expand').click(function() {
            baraja.fan({
                speed: 500,
                easing: 'ease-out',
                range: 100,
                direction: 'right',
                origin: { x: 50, y: 200 },
                center: true
            });
        });
    } else {
        sectionFeature.appear(function() {
            baraja.fan({
                speed: 1500,
                easing: 'ease-out',
                range: 80,
                direction: 'left',
                origin: { x: 200, y: 50 },
                center: true
            });
        });
        $('#feature-expand').click(function() {
            baraja.fan({
                speed: 500,
                easing: 'ease-out',
                range: 80,
                direction: 'left',
                origin: { x: 200, y: 50 },
                center: true
            });
        });
    }

    // Feature navigation
    $('#feature-prev').on('click', function(event) {
        baraja.previous();
    });

    $('#feature-next').on('click', function(event) {
        baraja.next();
    });

    // close Features
    $('#feature-close').on('click', function(event) {
        baraja.close();
    });
});