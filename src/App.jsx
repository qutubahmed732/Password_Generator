import { useState, useCallback, useEffect, useRef } from 'react'
import './index.css'

function App() {
  const [length, setLength] = useState(0);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  // useRef hook

  const passwordRef = useRef(null);

  // password generator

  const passwordGenerator = useCallback((() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()";

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
    passwordRef.current?.setSelectionRange(0, 15)
    window.navigator.clipboard.writeText(password);
  }, [password])

  // useEffect

  useEffect((() => { passwordGenerator() }), [length, numAllowed, charAllowed, passwordGenerator]);

  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus(); // direct DOM access
  };

  return (
    <>
      <div className="w-full max-w-md flex flex-col items-center gap-7 mx-auto shadow-md rounded-lg px-4 my-8 py-2 text-orange-500 bg-gray-800">
        <h1 className="text-white text-center">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3 bg-white text-black'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 cursor-pointer active:opacity-[0.8]'>Copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={0}
              max={30}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label htmlFor="">Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              onChange={() => {
                setNumAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="numberInput">Numbers:</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charAllowed"
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="charAllowed">Characters:</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
