$(document).ready(function(){
    $("#two , #three").css("display","none");
})




$(document).ready(function(){

    $(".slide-1").click(function(){
        $("#one").fadeIn("1400")
        $("#two").css("display","none")
        $("#three").css("display","none")
        $(".slide-2 > a").css("border-bottom","none")
        $(".slide-2 > a").css("color","#fff")
        $(".slide-1 > a").css("border-bottom","3px solid #ffd100")
        $(".slide-1 > a").css("padding-bottom","5px")
        $(".slide-1 > a").css("color","#fdd100")
        $(".slide-3 > a").css("border-bottom","none")
        $(".slide-3 > a").css("color","#fff")
    })


    $(".slide-2").click(function(){
        $("#two").fadeIn("1400")
        $("#one").css("display","none")
        $("#three").css("display","none")
        $(".slide-2 > a").css("color","#fdd100")
        $(".slide-2 > a").css("border-bottom","3px solid #fdd100")
        $(".slide-2 > a").css("padding-bottom","5px")
        $(".slide-1 > a").css("color","#fff")
        $(".slide-1 > a").css("border-bottom","none")
        $(".slide-3 > a").css("border-bottom","none")
        $(".slide-3 > a").css("color","#fff")
    })


    $(".slide-3").click(function(){
        $("#one").css("display","none")
        $("#two").css("display","none")
        $("#three").fadeIn("1400")
        $(".slide-3 > a").css("border-bottom","3px solid #fdd100")
        $(".slide-3 > a").css("padding-bottom","5px")
        $(".slide-3 > a").css("color","#fdd100")
        $(".slide-2 > a").css("color","#fff")
        $(".slide-2 > a").css("border-bottom","none")
        $(".slide-1 > a").css("border-bottom","none")
        $(".slide-1 > a").css("color","#fff")
    })
    
    $(".slide-1 > a").css("transition","0.2s")
    $(".slide-2 > a").css("transition","0.2s")
    $(".slide-3 > a").css("transition","0.2s")


})



// 헤더
// var beforePosition = document.documentElement.scrollTop


// document.addEventListener('scroll', function () {

//     var afterPosition = document.documentElement.scrollTop;


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
//             console.log(111);
//         }

//     } else {
//         // 평상 시

//     }
//     beforePosition = afterPosition;
// });
