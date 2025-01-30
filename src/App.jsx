import React, { useCallback, useEffect, useState } from 'react'
// import './App.css'
function App() {

    const [password, setPassword] = useState("")
    const [numberAllowed, setnumberAllowed] = useState(false)
    const [charAllowed, setcharAllowed] = useState(false)
    const [length, setLength] = useState(8)

    const passwordGenerator = useCallback(() => {
        let pass = ""
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        if(numberAllowed) str += "0123456789"
        if(charAllowed) str += "!@#$%^&*?/"
        for(let i=1; i<= length; i++){
            let char = Math.floor(Math.random() * str.length + 1)
            pass += str.charAt(char)
        }
        setPassword(pass)
    },[length, numberAllowed, charAllowed, setPassword])

    const copyPasswordToClipboard = () => {
        window.navigator.clipboard.writeText(password)
    }
    useEffect(() => {
        passwordGenerator();
    }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    <>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Password Generator</h1>
        <div className="bg-white p-6 rounded-lg shadow-md w-80">
            <div className="flex items-center mb-4">
                <input 
                    type='text'
                    value={password}
                    placeholder='password'
                    readOnly
                    className="border border-gray-300 rounded-lg p-2 flex-grow mr-2"
                />
                <button 
                    onClick={copyPasswordToClipboard} 
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    Copy
                </button>
            </div>
            <div className="mb-4">
                <input 
                    type='range'
                    value={length}
                    onChange={(e)=> setLength(e.target.value)}
                    min={8}
                    max={50}
                    className='cursor-pointer w-full'
                />
                <label className="block text-gray-700 mt-2">Length: {length}</label>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        type='checkbox'
                        defaultChecked={numberAllowed}
                        id='numberAllowed'
                        onChange={() => setnumberAllowed((prev => !prev))}
                        className="mr-2"
                    />
                    <label htmlFor='numberAllowed' className="text-gray-700">Number</label>
                </div>
                <div className="flex items-center">
                    <input
                        type='checkbox'
                        defaultChecked={charAllowed}
                        id='characterAllowed'
                        onChange={() => setcharAllowed((prev => !prev))}
                        className="mr-2"
                    />
                    <label htmlFor='characterAllowed' className="text-gray-700">Character</label>
                </div>
            </div>
        </div>
        </div>
    </>
  )
}

export default App