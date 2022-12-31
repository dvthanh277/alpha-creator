$(document).ready(function () {
    var $smooth = $('a[href^="#"]');
    var swiper;
    $smooth.on('click', function () {
        var speed = 1000;
        var href = $(this).attr("href");
        var target = $(href === '#top' || href === '#' || href === '' ? 'html' : href);
        var position = target.offset().top;
        if (!$('body html').is(':animated')) {
            $('body,html').stop().animate({ scrollTop: position }, speed, 'swing');
        }
        return false;
    });


    //Handle Play Video Background
    // Get element
    var youtubeEmbedElement = document.getElementById("video-player");

    // Add YouTube API script
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var player;
    var videoId = youtubeEmbedElement.dataset.videoId;
    var startSeconds = 8;
    var endSeconds = 51;

    onYouTubeIframeAPIReady = function () {
        player = new YT.Player("video-player", {
            videoId: videoId,
            playerVars: {
                autoplay: 0,
                autohide: 1,
                disablekb: 1,
                controls: 0,
                showinfo: 0,
                modestbranding: 1,
                loop: 1,
                fs: 0,
                // rel: 0,
                enablejsapi: 1,
                iv_load_policy: 3,
                start: startSeconds,
                end: endSeconds
            },
            events: {
                onReady: function (e) {
                    e.target.mute();
                },
                onStateChange: function (e) {
                    if (e.data === YT.PlayerState.ENDED) {
                        player.seekTo(startSeconds);
                    }
                }
            }
        });
    };

    //Handle click play button
    $('#play-video').on('click', function () {
        player.playVideo();
        $('.video-thumbnail').css('opacity', 0)
        $(this).addClass('hide')
        $('#video-player').css('opacity', 0.8)
    });

    $('.image-hover').on('click', function () {
        let imgList1 = ['yt1.png', 'yt2.png', 'yt3.png', 'yt4.png', 'yt5.png']
        let imgList2 = ['honourable_1.png', 'honourable_2.png', 'honourable_3.png', 'honourable_4.png', 'honourable_5.png']
        let currentImg = $(this).children().attr("src").replace("./img/", "");
        $('.swiper-wrapper').html('')
        if ($(this).closest('.section-winner').length == 1) {
            $.each([...new Set([currentImg, ...imgList1])], function (index, item) {
                $('.swiper-wrapper').append('<div class="swiper-slide"><img src="./img/' + item + '" alt=""></div>')
            });
        }
        else {
            $.each([...new Set([currentImg, ...imgList2])], function (index, item) {
                $('.swiper-wrapper').append('<div class="swiper-slide"><img src="./img/' + item + '" alt=""></div>')
            });
        }
        if (swiper) { swiper.destroy() }
        swiper = new Swiper(".mySwiper", {
            navigation: {
                nextEl: ".btn-popup.next",
                prevEl: ".btn-popup.prev",
            },
            pagination: {
                el: ".swiper-pagination",
            },
        });
        swiper.init()
        $('#popup').fadeIn();

    })
    $('.close-popup').on('click', function () {
        $('#popup').fadeOut();
    })


});
