// src/services/speechRecognition.ts
// 語音識別相關服務

// 聲明WebSpeechAPI類型以避免TypeScript錯誤
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface SpeechRecognitionOptions {
  onResult: (text: string) => void;
  onEnd: () => void;
  language?: string;
}

let recognition: any = null;

/**
 * 開始語音識別
 * @param options 語音識別選項
 */
export const recognizeSpeech = (options: SpeechRecognitionOptions) => {
  if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
    alert('您的瀏覽器不支持語音識別功能');
    options.onEnd();
    return;
  }
  
  // 使用WebSpeechAPI
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  
  recognition.lang = options.language || 'zh-TW';
  recognition.continuous = true;
  recognition.interimResults = true;
  
  recognition.onresult = (event: any) => {
    let finalTranscript = '';
    
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript;
      } else {
        options.onResult(transcript);
      }
    }
    
    if (finalTranscript) {
      options.onResult(finalTranscript);
    }
  };
  
  recognition.onend = () => {
    options.onEnd();
  };
  
  recognition.onerror = (event: any) => {
    console.error('語音識別錯誤:', event.error);
    options.onEnd();
  };
  
  recognition.start();
};

/**
 * 停止語音識別
 */
export const stopRecognition = () => {
  if (recognition) {
    recognition.stop();
    recognition = null;
  }
}; 