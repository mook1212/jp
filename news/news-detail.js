
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

let URL_id = new URLSearchParams(window.location.search)

let news_data = []
db.collection('공지사항').where('id', '==', Number(URL_id.get('id'))).get().then((res) => {
    res.forEach((a) => {
        news_data.push(a.data())

        $('.post-box').append(`
        <div class="detail-item">
            <p class='title'>${a.data().제목}</p>
            <p class="date">${a.data().작성일}</p>

            <p class="text" style='white-space: pre-wrap;'>${a.data().내용}</p>
        </div>
        `)
    })


    // 이전 게시글
    let prev = []
    db.collection('공지사항').where('date', '<', news_data[0].date).get().then((res) => {
        res.forEach((a) => {
            prev.push(a.data().id)
        })

        let max = Math.max.apply(null, prev)

        db.collection('공지사항').where('id', '==', max).get().then((res) => {
            res.forEach((a) => {
                document.querySelector('.prev-title').innerHTML = `
                    <p id='prev-title' data-id='${a.data().id}'>
                        ${a.data().제목}
                    </p>
                `

            })

            document.querySelector('#prev-title').addEventListener('click', (e) => {
                if (e.target.dataset.id) {
                    location.href = `http://127.0.0.1:5500/news/news-detail.html?id=${e.target.dataset.id}`
                }
            })
        })
    })


    // 다음 게시글
    let next = []
    db.collection('공지사항').where('date', '>', news_data[0].date).get().then((res) => {
        res.forEach((a) => {
            next.push(a.data().id)
        })

        let min = Math.min.apply(null, next)

        db.collection('news').where('id', '==', min).get().then((res) => {
            res.forEach((a) => {
                // console.log(a.data());
                document.querySelector('.next-title').innerHTML = `
                <p id='next-title' data-id='${a.data().id}'>
                    ${a.data().제목}
                </p>
            `
            })

            document.querySelector('#next-title').addEventListener('click', (e) => {
                if (e.target.dataset.id) {
                    location.href = `http://127.0.0.1:5500/news/news-detail.html?id=${e.target.dataset.id}`
                }
            })
        })
    })

})


document.getElementById('back').addEventListener('click', () => {
    location.href = `http://127.0.0.1:5500/news/news.html`
})

if (localStorage.getItem('admin')) {
    let del = `
    <button id='admin-delete'>관리자 삭제</button>
`
    $('.detail-main').append(del)

    $('#admin-delete').click(()=>{
        db.collection('공지사항').doc(String(URL_id.get('id'))).delete().then(()=>{
            alert('삭제완료')
            location.href = `http://127.0.0.1:5500/news/news.html`
        })

    })
}