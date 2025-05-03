import React, { useState, useEffect } from 'react';
import { words } from '../constants/words.js';
import { stages } from '../constants/stages.js';
import { letters } from '../constants/letters.js';
import LetterButton from '../components/LetterButton/LetterButton.jsx';
import WordDisplay from '../components/WordDisplay/WordDisplay.jsx';
import './style.css';

function Spanzaratoare() {
    const [word, setWord] = useState('');
    const [guessed, setGuessed] = useState([]);
    const [wrong, setWrong] = useState([]);
    const [imageIndex, setImageIndex] = useState(0);
    const [status, setStatus] = useState('playing');
  
    useEffect(() => startGame(), []);
  
    const startGame = () => {
      const randomWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
      setWord(randomWord);
      setGuessed([]);
      setWrong([]);
      setImageIndex(0);
      setStatus('playing');
    };
  
    const handleClick = (letter) => {
      if (status !== 'playing') return;
      if (guessed.includes(letter) || wrong.includes(letter)) return;
  
      if (word.includes(letter)) {
        const updated = [...guessed, letter];
        setGuessed(updated);
        if (word.split('').every(l => updated.includes(l))) setStatus('win');
      } else {
        const updatedWrong = [...wrong, letter];
        setWrong(updatedWrong);
        const nextIndex = imageIndex + 1;
        setImageIndex(nextIndex);
        if (nextIndex >= stages.length - 1) setStatus('lose');
      }
    };
  
    const GameContent = () => (
      <>
        <div className="image-container"><img src={stages[imageIndex]} alt="Game" /></div>
        <WordDisplay word={word} guessed={guessed} />
        <div className="alphabet-buttons">
          {letters.map((letter, index) => (
            <LetterButton key={index} letter={letter} disabled={guessed.includes(letter) || wrong.includes(letter)} onClick={() => handleClick(letter)} />
          ))}
        </div>
      </>
    );
  
    const Result = ({ result }) => (
      <div className="result-message">
        <h2>{result === 'win' ? 'YOU WIN!' : 'YOU LOSE!'}</h2>
        <p>The word was: {word}</p>
        <img src={stages[imageIndex]} alt="Game" />
        <button onClick={startGame} className="restart-button">Restart</button>
      </div>
    );

    return (
        <div className="container">
          <h1>Hangman</h1>
          {status === 'playing' ? <GameContent /> : <Result result={status} />}
        </div>
      );
  }

  
  export default Spanzaratoare;


