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

// // 셀 넘버가 0이면 빈 셀
// turn({row, col}) {
//   // 셀넘버 게임판의 해당 위치에 매칭
//   this.board[row][col] = this.cellNum;
//   // 빈 셀 변경
//   this.cellNum = this.cellNum === '-' ? '-' : '-';
// }

// if (cellNum === 0) {
//   document.querySelector('.board__col--empty').textContent = emptyCell;
// } 

// moves 갱신
let move = 0;
document.querySelector('.move').textContent = move;


// 이동 가능 셀을 클릭했을 때 1. 클릭 셀을 빈 셀로 변환 2. move +1
// 이동 가능 셀을 클릭했을 때 반응 - 이벤트 리스너 - forEach로 
// cellEl.forEach((el, index) => {
//   newArr();
//   el.classList.add('--empty'); // 클릭했을 때 자기 자신에게 붙이기 위해서 제일 상위에 넣기
//     if (true === true) {
//       move++;
//       document.querySelector('.board__col').classList.add('--empty'); // 클래스 동적으로 추가하기 준비
//     }
//   document.querySelector('.move').textContent = move; // 화면에 반영
// });

class puzzle {
  board = newArr();
// 동작
// 빈 셀 선택 이동
  // 빈 셀의 상하좌우 중 하나를 클릭하면 빈 셀의 위치와 같아진다.
  emptyCell = {};
  // emptyCell의 row값이 같고 col값 -1, +1 상하 선택
  // emptyCell의 col값이 같고 row값 -1, +1 좌우 선택
  cellNum = {};
  
  // 선택 했을 했을 때 실행되는 함수
  turn({row, col}) {
    // 셀넘버 게임판의 해당 위치에 매칭
    this.board[row][col] = this.cellNum;
    // 빈 셀 변경
    this.cellNum = this.cellNum === '-' ? '-' : '-';
  }
  // 셀의 좌표가 게임 판과 모두 같으면 게임 종료
  checkResult() {
    for (let i = 0; i < 4; i++) {
      if (
        this.board[i][0] === this.board[i][1] &&
        this.board[i][1] === this.board[i][2] &&
        this.board[i][2] === this.board[i][3]
      ) {
        return this.board[i][0];
      }
    }
  }
}

const game = new puzzle();
// 새 배열 화면에 반영하기
// 0인 셀 찾기
const rowEls = document.querySelectorAll('.board__row');
rowEls.forEach((rowEl, rowIndex) => {
  const colEls = rowEl.querySelectorAll('.board__col');
  colEls.forEach((colEl, colIndex) => {
    draw(); // 랜덤 생성된 배열의 숫자를 셀에 채워넣기
    
    // colEl.addEventListener('click', e => {
    //   game.turn({row: rowIndex, col: colIndex});
    // })
  })
})

function draw() {
  game.board.forEach((rowArr, rowIndex) => {
    const rowEl = rowEls[rowIndex];
    const colEls = rowEl.querySelectorAll('.board__col');
    rowArr.forEach((col, colIndex) => {
      colEls[colIndex].textContent = col;
      console.log(colEls[colIndex].textContent);
    })
  })
  const finish = game.checkResult();
  if (finish) {
    document.querySelector('.finish').textContent = finish;
  }
}