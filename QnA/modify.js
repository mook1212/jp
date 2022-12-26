
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

let data = []
db.collection('게시글목록').where('id', '==', Number(URL_id.get('id'))).get().then((res) => {
    res.forEach(a => {
        data.push(a.data())
    });

    // 원래 게시글 벨류값 보여주기
    let name = $('#modify-name')
    let title = $('#modify-title')
    let text = $('#modify-text')

    name.val(data[0].이름)
    title.val(data[0].제목)

    $('#modify-text').val(data[0].내용)


    // 수정완료 버튼 눌렀을때 비밀번호 모달창이 뜬다.
    $('#modify-clear').click(() => {
        if (name.val() != '' && title.val() != '' && text.val() != '') {
            $('.update-modal-container').css('display', 'flex')
        } else {
            alert('빈칸을 확인하여주세요.')
        }
    })


    // 수정 비밀번호 입력시 맞으면 게시글수정 아니면 alert박스
    $('#update-confirm').click(() => {
        let pw_check = $('#update-input').val()

        db.collection('게시글목록').where('id', '==', Number(URL_id.get('id'))).get().then((res) => {
            res.forEach((a) => {

                // DB패스워드와 input창에 작성한 패스워드가 일치시 삭제
                if (a.data().pw == pw_check) {
                    db.collection('게시글목록').doc(URL_id.get('id')).update({ 이름: name.val(), 내용: text.val().split('\r'), 제목: title.val() })
                        .then(() => {
                            location.href = `http://127.0.0.1:5500/QnA/detail.html?id=${URL_id.get('id')}`
                        })
                } else {
                    alert('비밀번호를 확인하여주세요')
                }

            })
        })

    })

    // 수정 비밀번호 모달창 취소
    $('#update-cancel').click(() => {
        $('.update-modal-container').css('display', 'none')
    })

})

// 수정 취소
$('#modify-cancel').click(() => {
    location.href = `http://127.0.0.1:5500/QnA/detail.html?id=${URL_id.get('id')}`
})