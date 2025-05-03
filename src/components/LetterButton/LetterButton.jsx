const LetterButton = ({ letter, onClick, disabled }) => (
    <button onClick={onClick} disabled={disabled} className={`letter-button ${disabled ? 'disabled' : ''}`} >
      {letter}
    </button>
  );

  export default LetterButton;
