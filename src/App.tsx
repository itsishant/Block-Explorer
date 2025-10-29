import { useState } from 'react'
import './App.css'
import './index.css'
import { generateMnemonic } from 'bip39';

const App = () => {

       const [mnemonic, setMnemonic] = useState("");
 
  const handleSubmit = () => {  

      const create =  generateMnemonic();
      setMnemonic(create);
}


  return (
    <div className='bg-black flex items-center justify-center min-h-screen'>
      <div>

        <button onClick={handleSubmit} className='bg-blue-500 py-4 px-2 w-full rounded-md'>
          <p className='font-sans text-black '>Generate Key Pairs</p>
        </button>
        <p className='text-white'>
          {mnemonic}
        </p>
      </div>
    </div>
    )
}

export default App
