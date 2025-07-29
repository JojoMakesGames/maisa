import { useState, useRef } from 'react'
import axios from 'axios';

type NumberToWords = {
  numberWord: string;
  url: string;
};

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [errorString, setErrorString] = useState("")
  const [numberWords, setNumberWords] = useState<NumberToWords[]>([]);

  function convertToWords() {
    if (!inputRef.current?.value) {
      setErrorString("Input is empty")
      return;
    }

    const numberInput: string = inputRef.current.value
    const isValid = /^(-?\s*\d+\s*)(,\s*-?\d+\s*)*$/.test(numberInput.trim());

    if (!isValid) {
      setErrorString("Input is not valid. Please enter comma-separated numbers. For example: 1,-400,5209");
      return;
    }

    const numbers = numberInput.split(',').map(num => num.trim()).filter(num => num !== '');

    axios.post('http://localhost:5277/number-to-words', { numbers })
      .then(({ data }) => {
        setNumberWords(data);
      })
      .catch(err => {
        console.error(err)
        setErrorString("An error occurred while converting numbers to words. Please try again later.");
      });

    setErrorString('');

    console.log(numberInput)
  }

  return (
    <>
      <input ref={inputRef} type="text" placeholder="Comma Separated Numbers" />
      <button type="button" onClick={convertToWords}>Convert to Words</button>
      {errorString && <p style={{ color: 'red' }}>{errorString}</p>}
      {numberWords.length > 0 && numberWords.map((numberWord, index) => (
        <div key={index}>{numberWord.numberWord}</div>
      ))}

    </>
  )
}

export default App
