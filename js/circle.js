$(function () {
    $('.chart').waypoint(function () {
        $('.chart').each(function () {
            $(this).easyPieChart({
                easing: 'easeOutBounce',
                onStep: function (from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                }, 
                size: 100,
                animate: 2000,
                lineCap: 'butt',
                scaleColor: false,
                barColor: '#C5EDFF',
                trackColor: 'transparent',
                lineWidth: 10
            });
        });
    }, {
        offset: '80%'
    });
});