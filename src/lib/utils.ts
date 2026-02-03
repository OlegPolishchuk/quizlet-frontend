import { type ClassValue, clsx } from 'clsx';
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
