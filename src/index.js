import './index.scss';

// 상태
// 게임 판은 숫자 셀 0~15
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

class puzzle {
  board = newArr();
}

const game = new puzzle();

// moves 갱신
let move = 0;
document.querySelector('.moves__count').textContent = move;

const rowEls = document.querySelectorAll('.board__row');
const emptyCell = [];
const clickCell = [];
const emptyNum = '0';
rowEls.forEach((rowEl, rowIndex) => {
  const colEls = rowEl.querySelectorAll('.board__col');
  colEls.forEach((colEl, colIndex) => {
    draw(); // 랜덤 생성된 배열의 숫자를 셀에 채워넣기
    // 0인 셀 찾기
    if(colEls[colIndex].textContent === emptyNum ){
      colEls[colIndex].classList.add('board__col--empty');
      // 빈 셀 찾아서 새로 emptyCell에 좌표 저장
      emptyCell.push(rowIndex, colIndex);
    } else {
      colEls[colIndex].classList.remove('board__col--empty');
    }
    colEl.addEventListener('click', e => {
      clickCell.push(rowIndex, colIndex);
      if(
        (emptyCell[0] === clickCell[0] && emptyCell[1]-1 === clickCell[1])||
        (emptyCell[0] === clickCell[0] && emptyCell[1]+1 === clickCell[1])||
        (emptyCell[1] === clickCell[1] && emptyCell[0]-1 === clickCell[0])||
        (emptyCell[1] === clickCell[1] && emptyCell[0]+1 === clickCell[0])
        ) {
        const clickNum = e.target.textContent;
        document.querySelector('.board__col--empty').textContent = clickNum;
        document.querySelector('.board__col--empty').classList.remove('board__col--empty');
        e.target.textContent = emptyNum;
        e.target.classList.add('board__col--empty');
        emptyCell[0] = clickCell[0];
        emptyCell[1] = clickCell[1];
        move++;
        document.querySelector('.moves__count').textContent = move;
        checkFinish();
      }
      clickCell.pop();
      clickCell.pop();
    })
  })
})


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

// 정답 확인
function checkFinish() {
  const finArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];
  const finList = document.querySelectorAll('.board__col');
  let count = 0;
  for(let i = 0; i < 15; i++) {
    if(finList[i].innerText === finArr[i]) {
      count++;
      if (count === 15) {
        document.querySelector('.finish').classList.add('show');
      }
    }
  }
}

