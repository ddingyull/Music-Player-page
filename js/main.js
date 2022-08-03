/*'노래 소개 박스'360도로 회전시켜서 보여주기 */
const frame = document.querySelector('section');
const list = frame.querySelectorAll('article'); //유사배열
const len = list.length;
const deg = 360 / len; //45deg
  /*넣어줄 사진 배열 선언하기*/
const names = ["cardio", "groove", "happy", "light", "lily", "limes", "pop", "swing"];


/* 360deg로 돌려주기 : 본인 위치를 기준으로 회전 + 회전축 위치 변경
list[배열].css접근.실행할속성(카멜케이스로 작성해야함)*/ 
for(let i = 0; i<len; i++) {
  list[i].style.transform = `rotate(${deg * i}deg) translateY(-100vh)`;

  const pic = list[i].querySelector('.pic');
  pic.style.backgroundImage = `url(../img/${names[i]}.jpg)`;


  let title = list[i].querySelector(".text>h2");
  title.innerHTML = `${names[i]}`;

  const audio = document.createElement('audio');
  audio.setAttribute('src', `../music/${names[i]}.mp3`);
  audio.setAttribute('loop', 'loop');

  list[i].append(audio);
}


/*'화살표' 360도로 회전시키기*/
const prev = document.querySelector(".btnPrev");
const next = document.querySelector(".btnNext");
let num = 0;
let active = 0;   /*순서에 따라 on클래스를 이동시켜 css적용시키기*/

prev.addEventListener('click', (e) => {
  frame.style.transform = `rotate(${deg * ++num}deg)` //더한 후 곱해주기

  //active 위치 확인하기
  if(active === 0) {
    active = len - 1;  //0이라면 마지막 요소로 보내기 
  } else {
    active--;   //아니라면 그 전 요소로 이동하기
  }

  //위 active의 위치에 따라 .on 넣어주기
  for(let el of list) {
    el.classList.remove('on');
  }
  list[active].classList.add('on');
})


next.addEventListener('click', (e) => {
  frame.style.transform = `rotate(${deg * --num}deg)`;

  if(active === len - 1) {
    active = 0;
  } else {
    active++;
  }

    //위 active의 위치에 따라 .on 넣어주기
    for(let el of list) {
      el.classList.remove('on');
    }
    list[active].classList.add('on');
})

let before = -1; //처음 페이지 방문했을 때를 -1로 잡음

/*.on 넣어서 play되어 회전되게 하기*/
for(let el of list) {
  const play = el.querySelector(".play");
  const pause = el.querySelector(".pause");
  const load = el.querySelector(".reload");

  play.addEventListener('click', e => {
    if(before === -1) {
      before = e.currentTarget;
    } 
    //이전에 눌렀던 재생버튼과 다를 때
    else if (e.currentTarget !== before) {
      //1) 이전에 듣고있던 노래 멈추기
      before.closest('article').querySelector('audio').pause();
      //2) class 'on' 없애서 회전 멈추기
      before.closest('article').querySelector('.pic').classList.remove('on');
      before = e.currentTarget;
    }

    //list의 el요소 중 currentTarget : 가장 가까운 부모요소 . 넣고싶은 해당요소 . class요소니깐 classList
    e.currentTarget.closest('article').querySelector('.pic').classList.add('on');
    e.currentTarget.closest('article').querySelector('audio').play();
  })

  pause.addEventListener('click', e => {
    e.currentTarget.closest('article').querySelector('.pic').classList.remove('on');
    e.currentTarget.closest('article').querySelector('audio').pause();
  })

  load.addEventListener('click', e => {
    if(before === -1) {
      before = e.currentTarget;
    } 
    else if (e.currentTarget !== before) {
      before.closest('article').querySelector('audio').pause();
      before.closest('article').querySelector('.pic').classList.remove('on');
      before = e.currentTarget;
    }

    e.currentTarget.closest('article').querySelector('.pic').classList.add('on');
    e.currentTarget.closest('article').querySelector('audio').load();
    e.currentTarget.closest('article').querySelector('audio').play();
  })

}






