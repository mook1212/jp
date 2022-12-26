var beforePosition = document.documentElement.scrollTop


document.addEventListener('scroll', function () {

    var afterPosition = document.documentElement.scrollTop;


    // 스크롤 맨 위

    if (window.scrollY != 0) {
    }



    if (afterPosition > 50) {

        if (beforePosition < afterPosition) {
            // 스크롤 아래로
            document.querySelector('header').style.display = 'none'
        } else {
            // 스크롤 위로 
            document.querySelector('header').style.display = 'flex'
            console.log(111);
        }

    } else {
        // 평상 시

    }
    beforePosition = afterPosition;
});
