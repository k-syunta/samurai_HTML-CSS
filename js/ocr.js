'use strict';

import React, { useState, useRef, useEffect } from 'react'
import { createWorker } from 'tesseract.js'

const App = () => {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [worker, setWorker] = useState<Tesseract.Worker | null>(null)
  const [text, setText] = useState('')
  const videoRef = useRef<HTMLVideoElement>(null)

  const initWorker = async () => {
    const initWorker = async () => {
    const worker = createWorker()
    await worker.load()
    await worker.loadLanguage('eng')
    await worker.initialize('eng')
  setWorker(worker)
}
  }
  const initStream = async () => {
    const initStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
    video: { width: 500, height: 300 },
    audio: false,
    })
    setStream(stream)
    }
  }
  const onRecognizeText = () => {
    const onRecognizeText = () => {
    const timerId = setInterval(async () => {
    if (videoRef.current === null || !worker) return

    const c = document.createElement('canvas')
    c.width = 500
    c.height = 300
    c.getContext('2d')?.drawImage(videoRef.current, 0, 0, 500, 300)

    // canvasから文字を認識！！
    const {
      data: { text },
    } = await worker.recognize(c)
    setText(text)
    }, 2000)
    return () => clearInterval(timerId)
    }
  }

  useEffect(() => {
    if (!worker) initWorker()
    if (!stream) initStream()

    if (worker && stream && videoRef.current !== null) {
      videoRef.current.srcObject = stream
      const clear = onRecognizeText()
      return clear
    }
  }, [worker, stream])

  return (
    <div>
      <video ref={videoRef} autoPlay />
      <pre>
        <h1>{text}</h1>
      </pre>
    </div>
  )
}

export default App
