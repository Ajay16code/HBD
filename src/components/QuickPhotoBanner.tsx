import React, { useState, useEffect } from 'react';
import { Camera, CheckCircle2, ImagePlus, RefreshCw } from 'lucide-react';
import { saveMainPhoto, hasCustomPhoto } from '../services/photoStorage';

export const QuickPhotoBanner: React.FC = () => {
  const [hasPhoto, setHasPhoto] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setHasPhoto(hasCustomPhoto());
    const handleUpdate = () => setHasPhoto(hasCustomPhoto());
    window.addEventListener('ammukaka_photos_updated', handleUpdate);
    return () => window.removeEventListener('ammukaka_photos_updated', handleUpdate);
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      if (typeof reader.result === 'string') {
        await saveMainPhoto(reader.result);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 4000);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      {/* Top Banner if no custom photo set yet */}
      {!hasPhoto && (
        <div className="fixed top-20 inset-x-4 z-40 max-w-sm mx-auto animate-bounce-subtle pointer-events-auto">
          <label className="block p-3 rounded-2xl bg-gradient-to-r from-[#20151f] to-[#17121b] border-2 border-[#7c3aed]/60 shadow-2xl cursor-pointer hover:border-[#7c3aed] transition-all gold-glow text-center">
            <div className="flex items-center justify-center gap-2 text-[#7c3aed] text-xs font-medium tracking-wide">
              <Camera className="w-4 h-4 animate-pulse" />
              <span>Tap here to set Ajay & Ammuka Ka photo</span>
            </div>
            <p className="text-[11px] text-stone-300 pt-0.5">
              Select your WhatsApp photo to fill all blank memory frames
            </p>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
      )}

      {/* Success Notification */}
      {success && (
        <div className="fixed top-20 inset-x-4 z-50 max-w-sm mx-auto pointer-events-none animate-fade-in">
          <div className="p-3.5 rounded-2xl bg-[#142318] border border-emerald-500/60 shadow-2xl flex items-center justify-center gap-2.5 text-xs text-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-medium">Photo applied across all scenes for Ammuka Ka! ❤️</span>
          </div>
        </div>
      )}
    </>
  );
};
