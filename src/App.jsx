import { useState, useCallback, useEffect, useRef } from 'react'
import './index.css';
import bgImage from './assets/bg-image2.jpeg';

function App() {
  const [length, setLength] = useState(0);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [smallCharAllowed, setSmallCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  // useRef hook

  const passwordRef = useRef(null);

  // password generator

  const passwordGenerator = useCallback((() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()";
    if (smallCharAllowed) str += "abcdefghijklmnopqrstuvwxyz";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
      console.log(char)
    }

    setPassword(pass)

  }), [length, numAllowed, charAllowed, setPassword]);

  // copy password function

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0, 15);
    window.navigator.clipboard.writeText(password);
    focusInput();
  }, [password])

  // useEffect

  useEffect((() => { passwordGenerator() }), [length, numAllowed, charAllowed, passwordGenerator]);

  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus(); // direct DOM access
  };

  return (
    <>
      <div
        className='w-full h-screen flex justify-center md:justify-start items-center p-5 md:pl-20 md:p-0'
        style={{
          background: `url(${bgImage})`,
          backgroundPosition: "center",
          backgroundSize:"cover",
          backgroundRepeat:"no-repeat"
        }}>

        <div className="w-full max-w-lg flex flex-col items-center gap-7 shadow-md rounded-xl px-5 py-7 text-gray-400 bg-gray-800/70 backdrop-blur-xl">
          <h1 className="text-white text-center font-bold text-xl md:text-3xl">Password Generator</h1>
          <div className="flex shadow rounded-lg overflow-hidden mb-4 w-[80%]">
            <input
              type="text"
              value={password}
              className='outline-none w-full py-2 px-4 bg-white text-black'
              placeholder='password'
              readOnly
              ref={passwordRef}
            />
            <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 cursor-pointer active:opacity-[0.8]'>Copy</button>
          </div>

          <div className='flex flex-col gap-2 w-[80%]'>
            <div className='flex flex-col-reverse justify-between items-center gap-3'>
              <label htmlFor="" className='flex items-center justify-between w-full font-bold'><span>Password Length:</span> <span className='text-2xl'>{length}</span></label>
              <input
                type="range"
                min={0}
                max={30}
                value={length}
                className='cursor-pointer w-full'
                onChange={(e) => { setLength(e.target.value) }}
              />
            </div>

            <div className="flex justify-between items-center gap-3">
              <label htmlFor="numberInput">Numbers:</label>
              <input
                className="cursor-pointer"
                type="checkbox"
                defaultChecked={numAllowed}
                id="numberInput"
                onChange={() => {
                  setNumAllowed((prev) => !prev)
                }}
              />
            </div>

            <div className="flex justify-between items-center gap-3">
              <label htmlFor="charAllowed">Include Symbols</label>
              <input
                className="cursor-pointer"
                type="checkbox"
                defaultChecked={charAllowed}
                id="charAllowed"
                onChange={() => {
                  setCharAllowed((prev) => !prev)
                }}
              />
            </div>

            <div className="flex justify-between items-center gap-3">
              <label htmlFor="smallCharAllowed">Small Characters:</label>
              <input
                className="cursor-pointer"
                type="checkbox"
                defaultChecked={smallCharAllowed}
                id="smallCharAllowed"
                onChange={() => {
                  setSmallCharAllowed((prev) => !prev)
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
