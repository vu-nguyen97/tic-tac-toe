import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Board from './Board'
import { calculateWinner, calculateLocationMoved, calculateDraw } from './calculateGame'

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      stepNumber: 0,
      locationMove: [],
      isDesc: true,
      // isColor: Array(9).fill(false)
    }
  }

  hanleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]){
      return ;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    let arr = [i]

    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
      locationMove: this.state.locationMove.concat(arr)
    })
  }

  onOffDesc(){
    this.setState({
      isDesc: !this.state.isDesc
    })
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  // colorWhenWon(arrColor){
  //   this.setState({
  //     isColor : arrColor
  //   })
  // }
  
  render() { 
    const {history, stepNumber, isDesc } = this.state
    const current = history[stepNumber]
    const squares = current.squares

    const winner = calculateWinner(squares) ;
    const checkDraw = calculateDraw(squares)
  
    let statusPlayer ;
    const arrColor = Array(9).fill(false)
    if (winner) {
      statusPlayer = 'Winner: ' + winner.player + '!';
        arrColor[winner.arr[0]]=true;
        arrColor[winner.arr[1]]=true;
        arrColor[winner.arr[2]]=true;
        
    } else if(checkDraw){
      statusPlayer = 'Draw!'
    } else {
      statusPlayer = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    const statusMove = (isDesc) ? 'Asc' : 'Desc' 
    const selectDescOrAsc = 
      <button onClick={()=>this.onOffDesc()}>
        {statusMove}
      </button>

    const moves = [];
    const max = history.length - 1;

    if (isDesc)
      for(let i = max ; i>0 ; i--){
        const {locationMove} = this.state
        let {row, col} = calculateLocationMoved(locationMove[i - 1])

        let desc = i ? 
          'Move #' + i :
          'Start';
        moves.push(
          <div key={i}>
            <li>
              <button
                  style={{
                    color: (stepNumber === i) ? 'red' : null
                  }}
                  onClick={this.jumpTo.bind(this,i)}
                  // onClick={(i)=>this.jumpTo(i)}
                >{desc}</button>
            </li>
            {(i!==0) && <p>( Go to row {row} col {col} )</p>}
          </div>
        );
      }
    else for(let i = 1 ; i <= max ; i++){
      const {locationMove} = this.state
      let {row, col} = calculateLocationMoved(locationMove[i - 1])

      let desc = i ? 
        'Move #' + i :
        'Start';
      moves.push(
        <div key={i}>
          <li>
            <button
                style={{
                  color: (stepNumber === i) ? 'red' : null
                }}
                onClick={this.jumpTo.bind(this,i)}
              >{desc}</button>
          </li>
          {(i!==0) && <p>( Go to row {row} col {col} )</p>}
        </div>
      );
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={squares} 
            onClick={(i) => this.hanleClick(i)}
            isColor={arrColor}
          />
        </div>
        <div className="game-info">
          <div>{statusPlayer}</div>
          <div>{selectDescOrAsc}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    )
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
