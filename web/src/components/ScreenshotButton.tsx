import html2canvas from 'html2canvas';
import { Camera, Trash } from "phosphor-react";
import { ButtonHTMLAttributes, useState } from 'react';
import { LoadingMark } from './LoadingMark';

interface ScreenshotButtonProps {
  preview: string | null;
  onScreenshot: (screenshot: string | null) => void;
  disabled?: boolean;
}

export function ScreenshotButton({ 
  preview, 
  onScreenshot,
  disabled = false,
}: ScreenshotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

  async function handleTakeScreenshot() {
    setIsTakingScreenshot(true);
    const canvas = await html2canvas(document.querySelector('html')!);
    const base64img = canvas.toDataURL('image/png');
    onScreenshot(base64img);
    setIsTakingScreenshot(false);
  }

  if (preview) {
    return (
      <button
        className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
        type="button"
        onClick={() => onScreenshot(null)}
        style={{
          backgroundImage: `url(${preview})`,
          backgroundPosition: 'right bottom',
          backgroundSize: 180,
        }}
        disabled={disabled}
      >
        <Trash weight="fill" />
      </button>
    );    
  }

  return (
    <button
      className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
      type="button"
      onClick={handleTakeScreenshot}
    >
      { isTakingScreenshot ? <LoadingMark /> : <Camera className="w-6 h-6" /> }
    </button>
  );
}