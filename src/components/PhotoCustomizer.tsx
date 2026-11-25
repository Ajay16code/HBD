import React, { useEffect, useState } from 'react';
import { Camera, RefreshCw, X, Check, Image as ImageIcon, Images, Trash2 } from 'lucide-react';
import {
  ALL_PHOTO_DEFINITIONS,
  clearGalleryPhotos,
  GalleryPhoto,
  getGalleryPhotos,
  getPhotoUrl,
  resetPhotos,
  saveGalleryPhotos,
  savePhotoUrl,
  setFinalRevealPhoto,
} from '../services/photoStorage';

export const PhotoCustomizer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'instructions'>('upload');
  const [successMsg, setSuccessMsg] = useState('');
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>([]);
  const [selectedGalleryPhoto, setSelectedGalleryPhoto] = useState<GalleryPhoto | null>(null);

  useEffect(() => {
    void getGalleryPhotos().then(setGalleryPhotos).catch((error) => {
      console.error('Could not load gallery photos', error);
    });
  }, []);

  const handleFileUpload = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        savePhotoUrl(key, reader.result);
        setSuccessMsg(`Updated photo for ${key}!`);
        setTimeout(() => setSuccessMsg(''), 2500);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    if (window.confirm('Reset all photos to default artwork?')) {
      resetPhotos();
      setSuccessMsg('Reset all photos to default.');
      setTimeout(() => setSuccessMsg(''), 2500);
    }
  };

  const compressPhoto = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        reject(new Error('Could not read the selected image.'));
        return;
      }
      const image = new Image();
      image.onload = () => {
        const maxSize = 1600;
        const scale = Math.min(1, maxSize / Math.max(image.naturalWidth, image.naturalHeight));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
        canvas.getContext('2d')?.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      image.onerror = () => reject(new Error(`Could not decode ${file.name}.`));
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });

  const handleGalleryUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;
    try {
      const photos = await Promise.all(files.map(async (file, index) => ({
        id: `${Date.now()}-${index}-${file.name}`,
        name: file.name,
        dataUrl: await compressPhoto(file),
      })));
      await saveGalleryPhotos(photos);
      setGalleryPhotos(photos);
      setSuccessMsg(`${photos.length} photos added to your gallery!`);
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (error) {
      console.error('Could not save gallery photos', error);
      setSuccessMsg('Could not save these photos. Please try smaller images.');
      setTimeout(() => setSuccessMsg(''), 3500);
    } finally {
      event.target.value = '';
    }
  };

  const handleClearGallery = async () => {
    if (!window.confirm('Remove all uploaded gallery photos?')) return;
    await clearGalleryPhotos();
    setGalleryPhotos([]);
    setSelectedGalleryPhoto(null);
  };

  return (
    <>
      {/* Discreet floating button in bottom left */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Personalize photos of Ammuka Ka"
        className="fixed bottom-4 left-4 z-40 px-3 py-2 rounded-full bg-black/60 backdrop-blur-md border border-[#7c3aed]/30 text-xs text-[#7c3aed] flex items-center gap-1.5 shadow-lg hover:bg-black/80 transition-all opacity-80 hover:opacity-100"
      >
        <Camera className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Ajay's Photo Manager</span>
        <span className="sm:hidden">Photos</span>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-lg max-h-[85vh] bg-[#100d1b] border border-[#7c3aed]/35 rounded-2xl flex flex-col overflow-hidden shadow-2xl text-[#f4efe6]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#100d1b]">
              <div>
                <h3 className="font-serif text-xl font-medium text-[#f4efe6]">
                  Photos of Ammuka Ka
                </h3>
                <p className="text-xs text-[#a8a29e]">
                  Easily replace placeholders with your real photos
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10 px-5 pt-2 gap-4 text-xs font-medium">
              <button
                onClick={() => setActiveTab('upload')}
                className={`pb-2.5 transition-colors border-b-2 ${
                  activeTab === 'upload'
                    ? 'border-[#7c3aed] text-[#7c3aed]'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                Direct Photo Upload
              </button>
              <button
                onClick={() => setActiveTab('instructions')}
                className={`pb-2.5 transition-colors border-b-2 ${
                  activeTab === 'instructions'
                    ? 'border-[#7c3aed] text-[#7c3aed]'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                File Replacement Guide
              </button>
            </div>

            {/* Content */}
            <div className="p-5 overflow-y-auto space-y-4 flex-1">
              {successMsg && (
                <div className="p-2.5 bg-emerald-950/60 border border-emerald-500/40 rounded-lg text-xs text-emerald-200 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>{successMsg}</span>
                </div>
              )}

              {activeTab === 'upload' ? (
                <div className="space-y-3">
                  <div className="rounded-xl border border-[#7c3aed]/35 bg-[#1a112b] p-4">
                    <div className="flex items-start gap-3">
                      <Images className="mt-0.5 h-5 w-5 shrink-0 text-[#c084fc]" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-white">Upload up to 65 photos</p>
                        <p className="mt-1 text-[11px] leading-relaxed text-stone-300">
                          Select all photos together. They will appear in one gallery below.
                        </p>
                        <label className="mt-3 inline-flex cursor-pointer items-center rounded-lg bg-[#7c3aed] px-3 py-2 text-xs font-medium text-white hover:bg-[#8b5cf6]">
                          Choose photos
                          <input type="file" accept="image/*" multiple className="hidden" onChange={handleGalleryUpload} />
                        </label>
                        {galleryPhotos.length > 0 && (
                          <button
                            type="button"
                            onClick={() => void handleClearGallery()}
                            className="ml-2 inline-flex items-center gap-1 rounded-lg border border-rose-400/30 px-3 py-2 text-xs text-rose-200 hover:bg-rose-950/40"
                          >
                            <Trash2 className="h-3 w-3" /> Clear
                          </button>
                        )}
                      </div>
                    </div>
                    {galleryPhotos.length > 0 && (
                      <div className="mt-4 grid grid-cols-4 gap-1.5 sm:grid-cols-6">
                        {galleryPhotos.map((photo) => (
                          <button
                            type="button"
                            key={photo.id}
                            onClick={() => setSelectedGalleryPhoto(photo)}
                            className="aspect-square overflow-hidden rounded-md border border-white/10 hover:border-[#c084fc]"
                            title={photo.name}
                          >
                            <img src={photo.dataUrl} alt={photo.name} className="h-full w-full object-contain" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-stone-300">
                    Replace a photo for each story section below. Your changes are saved in this browser:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {ALL_PHOTO_DEFINITIONS.map((def) => {
                      const currentUrl = getPhotoUrl(def.key);
                      return (
                        <div
                          key={def.key}
                          className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-3"
                        >
                          <div className="w-12 h-14 rounded-md overflow-hidden bg-stone-900 border border-stone-800 shrink-0">
                            <img
                              src={currentUrl}
                              alt={def.label}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium truncate text-stone-200">
                              {def.label}
                            </p>
                            <label className="inline-block mt-1 text-[11px] text-[#7c3aed] hover:underline cursor-pointer">
                              Replace Photo
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleFileUpload(def.key, e)}
                              />
                            </label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="space-y-3 text-xs text-stone-300">
                  <p>
                    You can also replace the photos permanently in your project files by putting your real JPG/PNG files directly into:
                  </p>
                  <div className="p-3 rounded-lg bg-black/60 border border-white/10 font-mono text-[11px] space-y-1 text-[#7c3aed]">
                    {ALL_PHOTO_DEFINITIONS.map((def) => (
                      <div key={def.key} className="flex justify-between">
                        <span>{def.path}</span>
                        <span className="text-stone-400">({def.label})</span>
                      </div>
                    ))}
                  </div>
                  <p className="pt-2 text-stone-400">
                    For the background music, place your favorite recording into:
                    <br />
                    <span className="text-[#7c3aed] font-mono">/public/audio/vathayo-punaithayo.mp3</span>
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-white/10 bg-[#100d1b] flex justify-between items-center">
              <button
                onClick={handleReset}
                className="text-xs text-stone-400 hover:text-rose-400 flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset Defaults
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-[#2e2632] hover:bg-[#3d3243] text-xs text-[#f4efe6] transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedGalleryPhoto && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedGalleryPhoto(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-[92vw] rounded-2xl border border-[#7c3aed]/40 bg-[#100d1b] p-3 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={selectedGalleryPhoto.dataUrl}
              alt={selectedGalleryPhoto.name}
              className="max-h-[78vh] max-w-[88vw] rounded-xl object-contain"
            />
            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="max-w-[180px] truncate text-xs text-stone-300">{selectedGalleryPhoto.name}</span>
              <button
                type="button"
                onClick={() => {
                  setFinalRevealPhoto(selectedGalleryPhoto.dataUrl);
                  setSelectedGalleryPhoto(null);
                  setSuccessMsg('This photo is now the final reveal!');
                  setTimeout(() => setSuccessMsg(''), 3000);
                }}
                className="rounded-lg bg-[#7c3aed] px-3 py-2 text-xs font-medium text-white hover:bg-[#8b5cf6]"
              >
                Use for Final Reveal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
