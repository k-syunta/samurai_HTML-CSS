import React, { useState } from 'react';
import { createWorker } from 'tesseract.js';
import './App.css';

function App() {
  const [file, setFile] = useState();
  const [textOcr, setTextOcr] = useState('');
  const worker = createWorker({
    logger: m => console.log(m)
  })

  const tryOcr = async() => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(file);
    setTextOcr(text);
    await worker.terminate();
  }

  // fileData 取得
  const handleChange = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0])
  }

  const handleClick = async() => {
    if (!file) return
    setTextOcr('Recognizing...')
    await tryOcr();
  }

  return (
    <div className="App">
      <input type="file" onChange={handleChange} /><br />
      <button className="button" onClick={handleClick}>Try OCR</button>
      <div>
        {textOcr}
      </div>
    </div>
  );
}

export default App;
