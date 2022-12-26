// var beforePosition = document.documentElement.scrollTop

// document.addEventListener('scroll', function () {

//     var afterPosition = document.documentElement.scrollTop;

//     // console.log(afterPosition);

//     // 스크롤 맨 위

//     if (window.scrollY != 0) {
//     }



//     if (afterPosition > 50) {

//         if (beforePosition < afterPosition) {
//             // 스크롤 아래로
//             document.querySelector('header').style.display = 'none'
//         } else {
//             // 스크롤 위로 
//             document.querySelector('header').style.display = 'flex'
//         }

//     } else {
//         // 평상 시

//     }
//     beforePosition = afterPosition;
// });


// 동영상 mouseover 재생
let video_start = [1, 2, 3, 4, 5]
video_start.map((a, i) => {
    let count = a

    $(`.video-start${a}`).mouseenter(() => {
        $(`.slide-img${a}`).fadeOut('fast', () => {
            $(`.video-player${a}`).fadeIn('fast', () => {
                document.querySelector(`.video-player${a}`).play()

            })
        })
    })

    $(`.video-start${a}`).mouseleave(() => {
        $(`.video-player${a}`).fadeOut('fast', () => {
            $(`.slide-img${a}`).fadeIn('fast')
        })
    })
})




// mouse over example

$(document).ready(function () {
    $(".theme1").hover(function () {
        $(".first-bg").css("display", "grid")
        $(".second-bg").css("display", "none");
        $(".third-bg").css("display", "none");
        $(".fourth-bg").css("display", "none");
    })
    $(".theme2").hover(function () {
        $(".first-bg").css("display", "none");
        $(".second-bg").css("display", "grid");
        $(".third-bg").css("display", "none");
        $(".fourth-bg").css("display", "none");
    })
    $(".theme3").hover(function () {
        $(".first-bg").css("display", "none");
        $(".second-bg").css("display", "none");
        $(".third-bg").css("display", "grid");
        $(".fourth-bg").css("display", "none");
    })
    $(".theme4").hover(function () {
        $(".first-bg").css("display", "none");
        $(".second-bg").css("display", "none");
        $(".third-bg").css("display", "none");
        $(".fourth-bg").css("display", "grid");
    })
})



// 우측 네비게이션바

document.querySelector('.c-1').style.backgroundColor = '#fdd100';
document.querySelector('.nav2-1').style.opacity = 1
document.querySelector('.top-move').style.opacity = 0

document.addEventListener('scroll', function () {

    let move = document.querySelector('.top-move')

    let element1 = document.querySelector('.one');
    let elementTop1 = window.pageYOffset + element1.getBoundingClientRect().top;

    let element2 = document.querySelector('.two');
    let elementTop2 = window.pageYOffset + element2.getBoundingClientRect().top;

    let element3 = document.querySelector('.three');
    let elementTop3 = window.pageYOffset + element3.getBoundingClientRect().top;

    let element4 = document.querySelector('.six');
    let elementTop4 = window.pageYOffset + element4.getBoundingClientRect().top;

    let c_1 = document.querySelector('.c-1')
    let c_2 = document.querySelector('.c-2')
    let c_3 = document.querySelector('.c-3')
    let c_4 = document.querySelector('.c-4')

    let ul1 = document.querySelector('.nav-ul-1')
    let ul2 = document.querySelector('.nav-ul-2')
    let ul3 = document.querySelector('.nav-ul-3')

    let nav1 = document.querySelector('.nav2-1')
    let nav2 = document.querySelector('.nav2-2')
    let nav3 = document.querySelector('.nav2-3')
    let nav4 = document.querySelector('.nav2-4')

    if (window.scrollY <= elementTop2) {
        c_1.style.backgroundColor = '#fdd100';
        ul1.style.backgroundColor = 'white'
        nav1.style.opacity = 1

        c_2.style.backgroundColor = 'white';
        nav2.style.opacity = 0
        ul2.style.backgroundColor = 'white'

        c_3.style.backgroundColor = 'white';
        nav3.style.opacity = 0
        ul3.style.backgroundColor = 'white'

        c_4.style.backgroundColor = 'white';
        nav4.style.opacity = 0

        move.style.opacity = 0;

    }

    if (window.scrollY >= elementTop2 && window.scrollY <= elementTop3) {
        c_1.style.backgroundColor = '#fdd100';
        nav1.style.opacity = 0
        ul1.style.backgroundColor = '#fdd100'

        c_2.style.backgroundColor = '#fdd100';
        nav2.style.opacity = 1
        ul2.style.backgroundColor = 'white'

        c_3.style.backgroundColor = 'white';
        nav3.style.opacity = 0
        ul3.style.backgroundColor = 'white'

        c_4.style.backgroundColor = 'white';
        nav4.style.opacity = 0

        move.style.opacity = 1;

    }

    if (window.scrollY >= elementTop3 && window.scrollY <= elementTop4) {
        c_1.style.backgroundColor = '#fdd100';
        nav1.style.opacity = 0
        ul1.style.backgroundColor = '#fdd100'

        c_2.style.backgroundColor = '#fdd100';
        nav2.style.opacity = 0
        ul2.style.backgroundColor = '#fdd100'

        c_3.style.backgroundColor = '#fdd100';
        nav3.style.opacity = 1
        ul3.style.backgroundColor = 'white'

        c_4.style.backgroundColor = 'white';
        nav4.style.opacity = 0

    }

    if (window.scrollY+1 >= elementTop4) {
        c_1.style.backgroundColor = '#fdd100';
        nav1.style.opacity = 0
        ul1.style.backgroundColor = '#fdd100'

        c_2.style.backgroundColor = '#fdd100';
        nav2.style.opacity = 0
        ul2.style.backgroundColor = '#fdd100'

        c_3.style.backgroundColor = '#fdd100';
        nav3.style.opacity = 0
        ul3.style.backgroundColor = '#fdd100'

        c_4.style.backgroundColor = '#fdd100';
        nav4.style.opacity = 1

    }

    console.log(window.scrollY);
    console.log(elementTop4);

});

// MOVE 이벤트

// 맨위로
document.querySelector('.top-move').addEventListener('click', () => {
    document.getElementById('first').scrollIntoView({ behavior: 'smooth' });
})

// 추모관 테마로 이동
document.querySelector('.w-scroll-btn').addEventListener('click', () => {
    document.getElementById('four').scrollIntoView({ behavior: 'smooth' });

})

// 우측네비 이동
document.querySelector('.c-1').addEventListener('click',()=>{
    document.getElementById('first').scrollIntoView({ behavior: 'smooth' });
})
document.querySelector('.c-2').addEventListener('click',()=>{
    document.getElementById('two').scrollIntoView({ behavior: 'smooth' });
})
document.querySelector('.c-3').addEventListener('click',()=>{
    document.getElementById('three').scrollIntoView({ behavior: 'smooth' });
})
document.querySelector('.c-4').addEventListener('click',()=>{
    document.getElementById('seven').scrollIntoView({ behavior: 'smooth' });
})


// 스크롤 이벤트
document.getElementById('first').addEventListener('wheel', function (event) {

    // 기본 이벤트 제거
    event.preventDefault()

    // 마우스 휠 다운
    if (event.deltaY > 0) {
        document.getElementById('two').scrollIntoView({ behavior: 'smooth' });
    }

});

document.getElementById('two').addEventListener('wheel', function (event) {
    event.preventDefault()

    // 마우스 휠 다운
    if (event.deltaY > 0) {
        document.getElementById('three').scrollIntoView({ behavior: 'smooth' });
    }

    // 마우스휠 업
    else if (event.deltaY < 0) {
        document.getElementById('first').scrollIntoView({ behavior: 'smooth' });

    }
});

document.getElementById('three').addEventListener('wheel', function (event) {
    event.preventDefault()

    if (event.deltaY > 0) {
        document.getElementById('four').scrollIntoView({ behavior: 'smooth' });
    }
    else if (event.deltaY < 0) {
        document.getElementById('two').scrollIntoView({ behavior: 'smooth' });

    }
});

document.getElementById('four').addEventListener('wheel', function (event) {
    event.preventDefault()

    if (event.deltaY > 0) {
        document.getElementById('five').scrollIntoView({ behavior: 'smooth' });
    }
    else if (event.deltaY < 0) {
        document.getElementById('three').scrollIntoView({ behavior: 'smooth' });

    }
});

document.getElementById('five').addEventListener('wheel', function (event) {
    event.preventDefault()

    if (event.deltaY > 0) {
        document.getElementById('six').scrollIntoView({ behavior: 'smooth' });
    }
    else if (event.deltaY < 0) {
        document.getElementById('four').scrollIntoView({ behavior: 'smooth' });

    }
});
document.getElementById('six').addEventListener('wheel', function (event) {
    event.preventDefault()

    if (event.deltaY > 0) {
        document.getElementById('seven').scrollIntoView({ behavior: 'smooth' });
    }
    else if (event.deltaY < 0) {
        document.getElementById('five').scrollIntoView({ behavior: 'smooth' });

    }
});

document.getElementById('seven').addEventListener('wheel', function (event) {
    event.preventDefault()

    if (event.deltaY > 0) {
        document.getElementById('eight').scrollIntoView({ behavior: 'smooth' });
    }
    else if (event.deltaY < 0) {
        document.getElementById('six').scrollIntoView({ behavior: 'smooth' });

    }
});
document.getElementById('eight').addEventListener('wheel', function (event) {
    event.preventDefault()

    if (event.deltaY < 0) {
        document.getElementById('seven').scrollIntoView({ behavior: 'smooth' });
    }
});


document.querySelector('.nav').addEventListener('wheel', (event) => {
    event.preventDefault()
})
document.querySelector('.nav2').addEventListener('wheel', (event) => {
    event.preventDefault()
})

document.querySelector('.w-scroll-container').addEventListener('wheel', (event) => {

    let box = document.querySelector('.w-scroll-box')
    let move = document.getElementById('two').scrollIntoView({ behavior: 'smooth' });


    // 아래로 내릴때 나타남
    if (event.deltaY > 0) {
        if (box.scrollHeight - box.scrollTop === box.clientHeight) {
            event.preventDefault()
            document.getElementById('four').scrollIntoView({ behavior: 'smooth' });

        }

    }

    // 위로 올릴때 나타남
    if (event.deltaY < 0) {
        if (box.scrollTop === 0) {
            event.preventDefault()
            document.getElementById('two').scrollIntoView({ behavior: 'smooth' });
        }

    }

})
