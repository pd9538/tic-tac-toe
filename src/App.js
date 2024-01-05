import './App.css';
import { useState } from 'react';

function Square({value,onSquareClick}){
  // const [value,setValue]=useState(null);

  // function handleClick(){
  //   setValue('X');
  // }
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}

function calculateWinner(squares){
  const lines=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];

  for(let i=0;i<lines.length;i++){
    const[a,b,c]=lines[i];
    if(squares[a]&&squares[a]===squares[b]&&squares[a]===squares[c]){
      return squares[a];
    }
  }
  return null;
}

 function Board({xIsnext,squares,onPlay}){
  const winner=calculateWinner(squares);
  var status;
  if(winner){
    status='Winner '+winner;
  }else{
    status='Next Player '+(xIsnext?'X':'O');
  }
  function handleClick(i){
    if(squares[i]||calculateWinner(squares)){
      return;
    }
    const nextSquares=squares.slice();
    if(xIsnext){
      nextSquares[i]='X';
    }else{
      nextSquares[i]='O';
    }
    onPlay(nextSquares);
  }


  return(
    <>
    <div className='status'>{status}</div>
    <div className='board-row'>
      <Square value={squares[0]} onSquareClick={()=>handleClick(0)}/>
      <Square value={squares[1]} onSquareClick={()=>handleClick(1)}/>
      <Square value={squares[2]} onSquareClick={()=>handleClick(2)}/>
    </div>
    <div className='board-row'>
      <Square value={squares[3]} onSquareClick={()=>handleClick(3)}/>
      <Square value={squares[4]} onSquareClick={()=>handleClick(4)}/>
      <Square value={squares[5]} onSquareClick={()=>handleClick(5)}/>
    </div>
    <div className='board-row'>
      <Square value={squares[6]} onSquareClick={()=>handleClick(6)}/>
      <Square value={squares[7]} onSquareClick={()=>handleClick(7)}/>
      <Square value={squares[8]} onSquareClick={()=>handleClick(8)}/>
    </div>
    </>
  )
}

export default function Game(){
  const [history,setHistory]=useState([Array(9).fill(null)]);
  const [currentMove,setCurrentMove]=useState(0);
  const xIsnext=currentMove%2===0;
  const currentSquare=history[currentMove];

  function handlePlay(nextSquares){
    const nextHistory=[...history.slice(0,currentMove+1),nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length-1);
  }

  function jumpto(nextMove){
    setCurrentMove(nextMove);
  }

  const moves=history.map((squares,move)=>{
    let descrption;
    if(move>0){
      descrption='Go to move #'+ move;
    }else{
      descrption='Go to Game Start..!';
    }
    return(
      <li key={move}>
        <button onClick={()=> jumpto(move)}>{descrption}</button>
      </li>
    )
  })

    return(
      <>
        <div className='game'>
          <div className='game-board'>
            <Board xIsnext={xIsnext} squares={currentSquare} onPlay={handlePlay}/>
          </div>
          <div className='game-info'>
            <ol>{moves}</ol>
          </div>
        </div>
      </>
    )
}