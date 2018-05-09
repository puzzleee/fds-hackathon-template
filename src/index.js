import './index.scss';

class puzzle {
// 상태
// 게임 판은 숫자 셀 0~15
  board = [
    ['1', '2', '3', '4'],
    ['5', '6', '7', '8'],
    ['9', '10', '11', '12'],
    ['13', '14', '15', '0']
    ];

// 동작
// 빈 셀의 상하좌우 중 하나를 클릭하면 빈 셀의 위치와 같아진다.
  emptyCell = {};
// emptyCell의 row값이 같고 col값 -1, +1 상하 선택
// emptyCell의 col값이 같고 row값 -1, +1 좌우 선택
  cellNum = {};
  // - 턴
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

const rowEls = document.querySelectorAll('.board__row');
rowEls.forEach((rowEl, rowIndex) => {
  const colEls = rowEl.querySelectorAll('.board__col');
  colEls.forEach((colEl, colIndex) => {
    colEl.addEventListener('click', e => {
      game.turn({row: rowIndex, col: colIndex});
      draw();
    })
  })
})

function draw() {
  game.board.forEach((rowArr, rowIndex) => {
    const rowEl = rowEls[rowIndex];
    const colEls = rowEl.querySelectorAll('.board__col');
    rowArr.forEach((col, colIndex) => {
      colEls[colIndex].textContent = col;
    })
  })
  const finish = game.checkResult();
  if (finish) {
    document.querySelector('.finish').textContent = finish;
  }
}
