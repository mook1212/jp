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
let URL_name = new URLSearchParams(window.location.search)



$('#search').click(() => {
    let search_text = $('#search-input').val()

    if (search_text != '') {
        if ($('#sel-check').html() == '제목') {
            location.href = `http://127.0.0.1:5501/QnA/notice.html?id=${search_text}`
        } else {
            location.href = `http://127.0.0.1:5501/QnA/notice.html?name=${search_text}`
        }
    } else {
        alert('검색어를 입력해주세요')
    }
})

if (URL_id.get('id') === null && URL_name.get('name') === null) {

    // 게시판 글 목록
    let dbdata = [];
    // 게시글 시간순으로 정렬
    db.collection('게시글목록').orderBy('date', 'desc').get().then((res) => {
        res.forEach((a) => {
            dbdata.push(a.data())
        })


        // 게시판
        const contents = document.querySelector("#notice-list");
        const buttons = document.querySelector(".notice-paging");

        const numOfContent = dbdata.length;
        const maxContent = 5;
        const maxButton = 5;
        const maxPage = dbdata.length / 5 + 1;
        let page = 1;


        // 게시판 글 조회
        const makeContent = (id) => {
            const content = document.createElement("li");
            content.classList.add("content");

            $('#notice-list').append(`
            <div class="notice-test" >
                <p class="notice-num" style="color : white">${dbdata.length + 1 - id}</p>
                <p data-id='${dbdata[id - 1].id}' id='text${id}' class='text' style="cursor: pointer">${dbdata[id - 1].제목}</p>
                
                <div class='cc'>
                    <p class='list-name'>${dbdata[id - 1].이름}</p>
                    <p class='list-date'>${dbdata[id - 1].작성일}</p>
                    <div class='answer-box'>
                        <p class='answer ${dbdata[id - 1].답변}'>답변대기</p>
                    </div>
                </div>
            </div>
            `)

            // 제목 클릭시 상세페이지 넘어가기
            $(`#text${id}`).click((e) => {
                console.log(e.target.dataset.id);

                location.href = `/QnA/detail.html?id=${e.target.dataset.id}`
            })

            return content;
        };

        const makeButton = (id) => {
            const button = document.createElement("button");
            button.classList.add("button");
            button.dataset.num = id;
            button.innerText = id;
            button.addEventListener("click", (e) => {
                Array.prototype.forEach.call(buttons.children, (button) => {
                    if (button.dataset.num) button.classList.remove("active");
                });
                e.target.classList.add("active");
                renderContent(parseInt(e.target.dataset.num));
            });
            return button;
        };

        const prev = document.createElement("button");
        const next = document.createElement("button");

        const renderContent = (page) => {
            // 목록 리스트 초기화
            while (contents.hasChildNodes()) {
                contents.removeChild(contents.lastChild);
            }
            // 글의 최대 개수를 넘지 않는 선에서, 화면에 최대 10개의 글 생성
            for (let id = (page - 1) * maxContent + 1; id <= page * maxContent && id <= numOfContent; id++) {
                contents.appendChild(makeContent(id));
            }
        };

        const renderButton = (page) => {
            // 버튼 리스트 초기화
            while (buttons.hasChildNodes()) {
                buttons.removeChild(buttons.lastChild);
            }
            // 화면에 최대 5개의 페이지 버튼 생성
            for (let id = page; id < page + maxButton && id <= maxPage; id++) {
                buttons.appendChild(makeButton(id));
            }
            // 첫 버튼 활성화(class="active")
            buttons.children[0].classList.add("active");

            buttons.prepend(prev);
            buttons.append(next);

            // 이전, 다음 페이지 버튼이 필요한지 체크
            if (page - maxButton < 1) buttons.removeChild(prev);
            if (page + maxButton > maxPage) buttons.removeChild(next);
        };

        const render = (page) => {
            renderContent(page);
            renderButton(page);
        };
        render(page);

        const goPrevPage = () => {
            page -= maxButton;
            render(page);
        };

        const goNextPage = () => {
            page += maxButton;
            render(page);
        };

        prev.classList.add("button", "prev");
        prev.innerHTML = '<ion-icon name="chevron-back-outline"></ion-icon>';
        prev.addEventListener("click", goPrevPage);

        next.classList.add("button", "next");
        next.innerHTML = '<ion-icon name="chevron-forward-outline"></ion-icon>';
        next.addEventListener("click", goNextPage);

        if ($('.answer').hasClass('true') === true) {
            $('.true').text('답변완료')
        } else {
            $('.false').text('답변대기')
        }

    })
}


// 검색 제목
if (URL_id.get('id')) {
    console.log(URL_id.get);
    let search_data = []
    db.collection('게시글목록').orderBy('date', 'desc').get().then((res) => {
        res.forEach((a) => {

            // search_data에 DB에서 가져온 데이터 어레이를 집어넣는다
            search_data.push(a.data())
            console.log('111');
        })


        let arr = []
        // search_data을 map함수를 이용하여 돌린다.
        search_data.map((a, i) => {

            // search_data객체 속에 제목이 검색결과와 일치하는 항목들을 찾는다
            let title = a.제목.match(URL_id.get('id'))

            // 찾은 항목들을 arr객체에 push한다
            if (title != null) {
                arr.push(title.input)
                console.log(arr);
            }

        })

        // arr 데이터속 중복되는 제목들을 Set함수로 중복제거를 해준다
        let set = new Set(arr);
        // 중복제거된 항목들을 다시 newSet에 바인딩
        let newSet = [...set]

        let search = []

        // newSet 개수만큼 데이터 검색 
        newSet.map((a, i) => {
            db.collection('게시글목록').where('제목', '==', newSet[i]).get().then((res) => {
                // console.log(newSet[i]);
                res.forEach((a) => {
                    search.push(a.data())
                    // console.log(a.data());
                })

                // 게시판 페이지네이션을 newSet의 개수만큼 반복하기 때문에
                // if문으로 마지막 반복문일때 페이지네이션을 만들어준다.
                if (i == newSet.length - 1) {

                    const contents = document.querySelector("#notice-list");
                    const buttons = document.querySelector(".notice-paging");

                    const numOfContent = search.length;
                    const maxContent = 5;
                    const maxButton = 5;
                    const maxPage = search.length / 5 + 1;
                    let page = 1;



                    const makeContent = (id) => {
                        const content = document.createElement("li");
                        content.classList.add("content");
                        $('#notice-list').append(`
                                <div class="notice-test" data>
                                    <p class="notice-num" style="color : white">${search.length + 1 - id}</p>
                                    <p data-id='${search[id - 1].id}' id='text${id}' class='text' style="cursor: pointer">${search[id - 1].제목}</p>
                              
                                
                                    <div class='cc'>
                                        <p class='list-name'>${search[id - 1].이름}</p>
                                        <p class='list-date'>${search[id - 1].작성일}</p>
                                        <div class='answer-box'>
                                            <p class='answer ${search[id - 1].답변}'>답변대기</p>
                                        </div>
                                    </div>
                                </div>
                                `)

                        $(`#text${id}`).click((e) => {
                            console.log(e.target.dataset.id);

                            localStorage.setItem('제목', e.target.dataset.id)
                            location.href = `/QnA/detail.html?id=${e.target.dataset.id}`

                        })
                        return content;
                    };

                    const makeButton = (id) => {
                        const button = document.createElement("button");
                        button.classList.add("button");
                        button.dataset.num = id;
                        button.innerText = id;
                        button.addEventListener("click", (e) => {
                            Array.prototype.forEach.call(buttons.children, (button) => {
                                if (button.dataset.num) button.classList.remove("active");
                            });
                            e.target.classList.add("active");
                            renderContent(parseInt(e.target.dataset.num));
                        });
                        return button;
                    };

                    const prev = document.createElement("button");
                    const next = document.createElement("button");

                    const renderContent = (page) => {
                        // 목록 리스트 초기화
                        while (contents.hasChildNodes()) {
                            contents.removeChild(contents.lastChild);
                        }
                        // 글의 최대 개수를 넘지 않는 선에서, 화면에 최대 10개의 글 생성
                        for (let id = (page - 1) * maxContent + 1; id <= page * maxContent && id <= numOfContent; id++) {
                            contents.appendChild(makeContent(id));
                        }
                    };

                    const renderButton = (page) => {
                        // 버튼 리스트 초기화
                        while (buttons.hasChildNodes()) {
                            buttons.removeChild(buttons.lastChild);
                        }
                        // 화면에 최대 5개의 페이지 버튼 생성
                        for (let id = page; id < page + maxButton && id <= maxPage; id++) {
                            buttons.appendChild(makeButton(id));
                        }
                        // 첫 버튼 활성화(class="active")
                        buttons.children[0].classList.add("active");

                        buttons.prepend(prev);
                        buttons.append(next);

                        // 이전, 다음 페이지 버튼이 필요한지 체크
                        if (page - maxButton < 1) buttons.removeChild(prev);
                        if (page + maxButton > maxPage) buttons.removeChild(next);
                    };

                    const render = (page) => {
                        renderContent(page);
                        renderButton(page);
                    };
                    render(page);

                    const goPrevPage = () => {
                        page -= maxButton;
                        render(page);
                    };

                    const goNextPage = () => {
                        page += maxButton;
                        render(page);
                    };

                    prev.classList.add("button", "prev");
                    prev.innerHTML = '<ion-icon name="chevron-back-outline"></ion-icon>';
                    prev.addEventListener("click", goPrevPage);

                    next.classList.add("button", "next");
                    next.innerHTML = '<ion-icon name="chevron-forward-outline"></ion-icon>';
                    next.addEventListener("click", goNextPage);

                    if ($('.answer').hasClass('true') === true) {
                        $('.true').text('답변완료')
                        console.log(123);
                    } else {
                        $('.false').text('답변대기')
                    }
                }
                // search2.push(search)
            })
        })
    })
}


// 검색 이름 
if (URL_id.get('name')) {
    let search_data = []
    db.collection('게시글목록').orderBy('date', 'desc').get().then((res) => {
        res.forEach((a) => {

            // search_data에 DB에서 가져온 데이터 어레이를 집어넣는다
            search_data.push(a.data())
            console.log('111');
        })


        let arr = []
        // search_data을 map함수를 이용하여 돌린다.
        search_data.map((a, i) => {

            // search_data객체 속에 제목이 검색결과와 일치하는 항목들을 찾는다
            let title = a.이름.match(URL_id.get('name'))

            // 찾은 항목들을 arr객체에 push한다
            if (title != null) {
                arr.push(title.input)
                console.log(arr);
            }

        })

        // arr 데이터속 중복되는 제목들을 Set함수로 중복제거를 해준다
        let set = new Set(arr);
        // 중복제거된 항목들을 다시 newSet에 바인딩
        let newSet = [...set]

        let search = []

        // newSet 개수만큼 데이터 검색 
        newSet.map((a, i) => {
            db.collection('게시글목록').where('이름', '==', newSet[i]).get().then((res) => {
                // console.log(newSet[i]);
                res.forEach((a) => {
                    search.push(a.data())
                    // console.log(a.data());
                })

                // 게시판 페이지네이션을 newSet의 개수만큼 반복하기 때문에
                // if문으로 마지막 반복문일때 페이지네이션을 만들어준다.
                if (i == newSet.length - 1) {

                    const contents = document.querySelector("#notice-list");
                    const buttons = document.querySelector(".notice-paging");

                    const numOfContent = search.length;
                    const maxContent = 5;
                    const maxButton = 5;
                    const maxPage = search.length / 5 + 1;
                    let page = 1;



                    const makeContent = (id) => {
                        const content = document.createElement("li");
                        content.classList.add("content");
                        $('#notice-list').append(`
                                <div class="notice-test" data>
                                    <p class="notice-num" style="color : white">${search.length + 1 - id}</p>
                                    <p data-id='${search[id - 1].id}' id='text${id}' class='text' style="cursor: pointer">${search[id - 1].제목}</p>
                              
                                
                                    <div class='cc'>
                                        <p class='list-name'>${search[id - 1].이름}</p>
                                        <p class='list-date'>${search[id - 1].작성일}</p>
                                        <div class='answer-box'>
                                            <p class='answer ${search[id - 1].답변}'>답변대기</p>
                                        </div>
                                    </div>
                                </div>
                                `)

                        $(`#text${id}`).click((e) => {
                            console.log(e.target.dataset.id);

                            location.href = `/QnA/detail.html?id=${e.target.dataset.id}`

                        })
                        return content;
                    };

                    const makeButton = (id) => {
                        const button = document.createElement("button");
                        button.classList.add("button");
                        button.dataset.num = id;
                        button.innerText = id;
                        button.addEventListener("click", (e) => {
                            Array.prototype.forEach.call(buttons.children, (button) => {
                                if (button.dataset.num) button.classList.remove("active");
                            });
                            e.target.classList.add("active");
                            renderContent(parseInt(e.target.dataset.num));
                        });
                        return button;
                    };

                    const prev = document.createElement("button");
                    const next = document.createElement("button");

                    const renderContent = (page) => {
                        // 목록 리스트 초기화
                        while (contents.hasChildNodes()) {
                            contents.removeChild(contents.lastChild);
                        }
                        // 글의 최대 개수를 넘지 않는 선에서, 화면에 최대 10개의 글 생성
                        for (let id = (page - 1) * maxContent + 1; id <= page * maxContent && id <= numOfContent; id++) {
                            contents.appendChild(makeContent(id));
                        }
                    };

                    const renderButton = (page) => {
                        // 버튼 리스트 초기화
                        while (buttons.hasChildNodes()) {
                            buttons.removeChild(buttons.lastChild);
                        }
                        // 화면에 최대 5개의 페이지 버튼 생성
                        for (let id = page; id < page + maxButton && id <= maxPage; id++) {
                            buttons.appendChild(makeButton(id));
                        }
                        // 첫 버튼 활성화(class="active")
                        buttons.children[0].classList.add("active");

                        buttons.prepend(prev);
                        buttons.append(next);

                        // 이전, 다음 페이지 버튼이 필요한지 체크
                        if (page - maxButton < 1) buttons.removeChild(prev);
                        if (page + maxButton > maxPage) buttons.removeChild(next);
                    };

                    const render = (page) => {
                        renderContent(page);
                        renderButton(page);
                    };
                    render(page);

                    const goPrevPage = () => {
                        page -= maxButton;
                        render(page);
                    };

                    const goNextPage = () => {
                        page += maxButton;
                        render(page);
                    };

                    prev.classList.add("button", "prev");
                    prev.innerHTML = '<ion-icon name="chevron-back-outline"></ion-icon>';
                    prev.addEventListener("click", goPrevPage);

                    next.classList.add("button", "next");
                    next.innerHTML = '<ion-icon name="chevron-forward-outline"></ion-icon>';
                    next.addEventListener("click", goNextPage);

                    if ($('.answer').hasClass('true') === true) {
                        $('.true').text('답변완료')
                        console.log(123);
                    } else {
                        $('.false').text('답변대기')
                    }
                }
                // search2.push(search)
            })
        })
    })
}




// 글쓰기 기능
$('#notice-write').click(() => {
    location.href = '/QnA/write.html'
})


// 셀렉트 박스
let sel_count = 1
$('.sel-main').click(() => {
    sel_count++
    if (sel_count % 2 == 0) {
        $('.sel-box').fadeIn('fast')
    } else {
        $('.sel-box').fadeOut('fast')
    }
})

$('#sel-header').click(() => {
    $('#sel-check').html($('#sel-header').text())
    sel_count = 1;
    $('.sel-box').fadeOut('fast')
})
$('#sel-name').click(() => {
    $('#sel-check').html($('#sel-name').text())
    sel_count = 1;

    $('.sel-box').fadeOut('fast')

})