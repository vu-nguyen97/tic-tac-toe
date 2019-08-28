export function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        const winner = {
          player: squares[a], 
          arr: [a,b,c]
        }
        return winner;
      }
    }
    return null;
}

export function calculateDraw(squares){
  let check = true  
  squares.forEach((i)=>{
    if (!i) check = false 
  })
  return check
}

export function calculateLocationMoved(move){
    let col, row
    if (move < 3) row = 1
      else if (move >2 && move <6) row =2
      else if (move <9) row = 3
  
    if (move%3 ===0) col =1
      else if (move%3 ===1) col =2
      else if (move%3 ===2) col =3
    return {row, col}
}
