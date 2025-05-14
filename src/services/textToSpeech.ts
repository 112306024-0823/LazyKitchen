// src/services/textToSpeech.ts
// 文字轉語音相關服務

interface TextToSpeechOptions {
  rate?: number;
  pitch?: number;
  lang?: string;
  onEnd?: () => void;
}

/**
 * 文字轉語音朗讀
 * @param text 要朗讀的文字
 * @param options 朗讀選項
 */
export const speakText = (text: string, options?: TextToSpeechOptions) => {
  if (!window.speechSynthesis) {
    console.error('您的瀏覽器不支持語音合成功能');
    return;
  }
  
  // 先停止之前的朗讀
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = options?.lang || 'zh-TW';
  utterance.rate = options?.rate || 1;
  utterance.pitch = options?.pitch || 1;
  
  if (options?.onEnd) {
    utterance.onend = options.onEnd;
  }
  
  // 嘗試找到合適的中文聲音
  const voices = window.speechSynthesis.getVoices();
  let chineseVoice = null;
  
  for (const voice of voices) {
    if (voice.lang.includes('zh') || voice.lang.includes('cmn')) {
      chineseVoice = voice;
      break;
    }
  }
  
  if (chineseVoice) {
    utterance.voice = chineseVoice;
  }
  
  window.speechSynthesis.speak(utterance);
};

/**
 * 停止語音朗讀
 */
export const stopSpeaking = () => {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}; 