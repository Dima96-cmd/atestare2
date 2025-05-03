const WordDisplay = ({ word, guessed }) => (
    <div className="word-display">
      {word.split('').map((letter, index) => (
        <span key={index} className="letter-slot">{guessed.includes(letter) ? letter : '_'}</span>
      ))}
    </div>
);

export default WordDisplay;