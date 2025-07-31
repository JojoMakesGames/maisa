import axios from 'axios';
import { useState, useRef } from 'react'
import type { NumberWord } from './types/NumberWord';
import NumberWordCard from './components/Card/Card';



function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [errorString, setErrorString] = useState("")
  const [numberWords, setNumberWords] = useState<NumberWord[]>([]);

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

    axios.post('http://localhost:8080/number-to-words', { numbers })
      .then(({ data }) => {
        setNumberWords(data);
      })
      .catch(err => {
        console.error(err)
        setErrorString("An error occurred while converting numbers to words. Please try again later.");
      });

    setErrorString('');
  }

  return (
    <>
      <div className="input-section">
        <input ref={inputRef} type="text" placeholder="Comma Separated Numbers" />
        <button type="button" onClick={convertToWords}>Sort Text</button>
      </div>
      {errorString && <p style={{ color: 'red' }}>{errorString}</p>}
      <div className="cards">
        {numberWords.length > 0 && numberWords.map((numberWord, index) => (
          <NumberWordCard key={index} numberWord={numberWord} />
        ))}
      </div>
    </>
  )
}

export default App
