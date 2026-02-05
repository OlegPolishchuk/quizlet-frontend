import type { AxiosError } from 'axios';
import { type ClassValue, clsx } from 'clsx';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/******************************************* */
/******************************************* */
/******************************************* */
/* Функция для копирования (Для хука useCopy) */
export const legacyCopyToClipboard = (value: string) => {
  const tempTextArea = document.createElement('textarea');
  tempTextArea.value = value;
  tempTextArea.readOnly = true;
  tempTextArea.style.fontSize = '16px';
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand('copy');
  document.body.removeChild(tempTextArea);
};

export const copy = async (value: string) => {
  try {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return legacyCopyToClipboard(value);
    }
  } catch {
    return legacyCopyToClipboard(value);
  }
};

/******************************************* */
/******************************************* */
/******************************************* */
/* Функция для трансформации объекта в масси Options */
export const transformToOptions = (obj: Record<string, string>) => {
  return Object.entries(obj).map(([key, value]) => ({ label: value, value: key }));
};

/******************************************* */
/******************************************* */
/******************************************* */
/* Функция для извлечения сообщения ошибки */
interface AxiosErrorResponseData {
  debug: string;
  error: string;
  success: boolean;
  validation_error: string | null;
  message: string;
}

export function extractAxiosError(err: Error) {
  const error = err as AxiosError;
  const errorData = error.response?.data as AxiosErrorResponseData;
  const message: string = errorData.message;
  const validationMessage: string = errorData.validation_error ?? '';

  return {
    status: error.status,
    message,
    validationMessage,
  };
}

export function handleError(err: Error, errorConstant: Record<string, string>) {
  const error = err as AxiosError;
  const errorData = error.response?.data as AxiosErrorResponseData;
  const message: string = errorData.message;
  const validationMessage: string = errorData.validation_error ?? '';

  if (errorConstant[message]) {
    return toast.error('Ошибка!', { description: errorConstant[message] });
  }

  if (errorConstant[validationMessage]) {
    return toast.error('Ошибка!', { description: errorConstant[validationMessage] });
  }

  return toast.error(`Ошибка!`, {
    description: `${message || error.response?.data}`,
  });
}

/******************************************* */
/******************************************* */
/******************************************* */
/* Функция для озвувичанеия слов в браузере */
export const speakWord = (word: string) => {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-US';

  // Озвучиваем
  window.speechSynthesis.speak(utterance);
};
