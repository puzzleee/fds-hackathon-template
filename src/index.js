import './index.scss';

// - 게임 판 세팅
// 랜덤으로 배열 생성하는 함수
function newArr() {
  const numArr = [...Array(16).keys()]; // 0부터 15까지의 배열 생성
  const boardArr =  [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null]
    ]; // 4 * 4 비어있는 배열
  function randomNumber(numArr){
    return Math.floor(numArr.length * Math.random());
  }  
  for(let i = 0 ; i < boardArr.length; i++){
    for(let j = 0 ; j < boardArr.length; j++){
      const randomNum = randomNumber(numArr);
      boardArr[i][j] = numArr[randomNum];
      numArr.splice(numArr.indexOf(numArr[randomNum]), 1); 
    }
  }
  return boardArr;
}

// DOM에서 활용하기 위해 선언
class puzzle {
  board = newArr();
}

let game = new puzzle();

// 새 배열 화면에 반영하기
function draw() {
  game.board.forEach((rowArr, rowIndex) => {
    const rowEl = rowEls[rowIndex];
    const colEls = rowEl.querySelectorAll('.board__col');
    rowArr.forEach((col, colIndex) => {
      colEls[colIndex].textContent = col;
    })
  })
}

// 게임 기본 정보 설정
let move = 0;
document.querySelector('.moves__count').textContent = move;

// - 게임 실행
const rowEls = document.querySelectorAll('.board__row');
const emptyCell = [];
const clickCell = [];
const emptyNum = '0';

function play() {
  rowEls.forEach((rowEl, rowIndex) => {
    const colEls = rowEl.querySelectorAll('.board__col');
    colEls.forEach((colEl, colIndex) => {
      draw();
      // 문자열 '0'인 셀을 빈 셀로 만들기
      if(colEls[colIndex].textContent === emptyNum) {
        colEls[colIndex].classList.add('board__col--empty');
        // 빈 셀 찾아서 새로 emptyCell에 좌표 저장
        emptyCell.push(rowIndex, colIndex);
      } else {
        colEls[colIndex].classList.remove('board__col--empty');
      }
      // 이동 가능한 셀 판별하기
      colEl.addEventListener('click', e => {
        clickCell.push(rowIndex, colIndex);
        if(
          (emptyCell[0] === clickCell[0] && emptyCell[1]-1 === clickCell[1])||
          (emptyCell[0] === clickCell[0] && emptyCell[1]+1 === clickCell[1])||
          (emptyCell[1] === clickCell[1] && emptyCell[0]-1 === clickCell[0])||
          (emptyCell[1] === clickCell[1] && emptyCell[0]+1 === clickCell[0])
          ) {
          // 클릭한 셀을 빈 셀로 이동
          const clickNum = e.target.textContent;
          // 빈 셀을 클릭 셀로 변경
          document.querySelector('.board__col--empty').textContent = clickNum; // 숫자 변경
          document.querySelector('.board__col--empty').classList.remove('board__col--empty'); // 스타일 변경
          // 클릭 셀을 빈 셀로 변경
          e.target.textContent = emptyNum;
          e.target.classList.add('board__col--empty');
          // 변경된 빈 셀 좌표 기억
          emptyCell[0] = clickCell[0];
          emptyCell[1] = clickCell[1];
          // 횟수 갱신
          move++;
          document.querySelector('.moves__count').textContent = move;
          checkFinish();
        }
        // 클릭 셀 좌표 초기화
        clickCell.pop();
        clickCell.pop();
      })
    })
  })
}

play();

// - 정답 확인 후 게임 종료
function checkFinish() {
  // 정답 배열
  const finArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];
  const finList = document.querySelectorAll('.board__col');
  let count = 0;
  for(let i = 0; i < 15; i++) {
    if(finList[i].innerText === finArr[i]) {
      count++;
      if (count === 15) {
        // 게임 종료 화면 반영
        document.querySelector('.board__finish').classList.add('show');
        document.querySelector('.moves').classList.add('down');
      }
    }
  }
}

// - 게임 재시작
document.querySelector('.replay').addEventListener('click', () => {
  game = new puzzle();
  move = 0;
  play();
  document.querySelector('.moves__count').textContent = move;
  document.querySelector('.board__finish').classList.remove('show');
  document.querySelector('.moves').classList.remove('down');
})

