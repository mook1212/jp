
// 파이어베이스 설정
const firebaseConfig = {
    apiKey: "AIzaSyBdp_8x4eixio0yS9APFYhCyuEWu7wTVd8",
    authDomain: "test-6a214.firebaseapp.com",
    projectId: "test-6a214",
    storageBucket: "test-6a214.appspot.com",
    messagingSenderId: "324318899114",
    appId: "1:324318899114:web:b7e1cca282e307b2dc59d3",
    measurementId: "G-R9Q0CYN08B"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()


// 공지사항
let news_data = []
db.collection('공지사항').get().then((res) => {
    res.forEach((a) => {
        news_data.push(a.data())
    })

    news_data.map((a, i) => {
        $('.post-box').append(`
        <div class='news-item news-item${i}' id='item${a.id}' data-id='${a.id}'>
            <p class='news-title' data-id='${a.id}'>${a.제목}</p>
            <p class='news-date' data-id='${a.id}'>${a.작성일}</p>

            <div class="circle-box">
            <div class="circle${i} mouse">
                <p>VIEW MORE</p>
            </div>
        </div>
        </div>
        `)
    })

    // 게시글 클릭시 상세페이지 넘어가기
    $(`.news-item`).click((e) => {
        location.href = `/news/news-detail.html?id=${e.target.dataset.id}`
    })

    let mouse;

    for (mouse = 1; mouse <= $('.mouse').length; mouse++) {
        console.log(mouse);

        const circle = document.querySelector(`.circle${mouse - 1}`);

        document.querySelector(`.news-item${mouse - 1}`).addEventListener("mousemove", (e) => {

            const mouseX = e.pageX;

            const mouseY = e.pageY;

            circle.style.left = mouseX + 'px';

            circle.style.top = mouseY + 'px';
        });
    }



})


if (localStorage.getItem('admin')) {
    $('.news-main').append(`
    <button id='admin-write'>관리자 글쓰기</button>
    `)

    document.querySelector('#admin-write').addEventListener('click', () => {
        location.href = '/news/admin-write.html'
    })
}
