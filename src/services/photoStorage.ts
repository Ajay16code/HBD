// Photo management service with localStorage support and server sync
// When a main photo of Ammuka Ka is uploaded, it populates all sections

const PHOTO_KEYS: Record<string, string> = {
  hero: '/images/hero.png',
  portrait: '/images/ammuka-portrait.jpeg',
  childhood: '/images/childhood.jpg',
  memory1: '/images/memory-1.jpg',
  memory2: '/images/memory-2.jpg',
  memory3: '/images/memory-3.jpg',
  memory4: '/images/memory-4.jpg',
  funny1: '/images/funny-1.jpg',
  funny2: '/images/funny-2.jpg',
  funny3: '/images/funny-3.jpg',
  timelineChildhood: '/images/timeline-childhood.jpg',
  timelineAdventures: '/images/timeline-adventures.jpg',
  timelineGrowingUp: '/images/timeline-growing-up.jpg',
  final: '/images/final.jpg',
};

const GALLERY_DB_NAME = 'ammukaka-gallery';
const GALLERY_STORE_NAME = 'photos';
const GALLERY_KEY = 'all';

export interface GalleryPhoto {
  id: string;
  name: string;
  dataUrl: string;
}

let finalRevealPhotoOverride: string | null = null;

export const setFinalRevealPhoto = (dataUrl: string): void => {
  finalRevealPhotoOverride = dataUrl;
  try {
    localStorage.setItem('ammukaka_photo_final', dataUrl);
  } catch (error) {
    console.error('Could not persist the final reveal photo', error);
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('ammukaka_photos_updated'));
  }
};

const openGalleryDb = (): Promise<IDBDatabase> => new Promise((resolve, reject) => {
  const request = indexedDB.open(GALLERY_DB_NAME, 1);
  request.onupgradeneeded = () => {
    request.result.createObjectStore(GALLERY_STORE_NAME);
  };
  request.onsuccess = () => resolve(request.result);
  request.onerror = () => reject(request.error);
});

export const saveGalleryPhotos = async (photos: GalleryPhoto[]): Promise<void> => {
  if (typeof indexedDB === 'undefined') throw new Error('This browser does not support photo gallery storage.');
  if (photos.length > 0) {
    setFinalRevealPhoto(photos[photos.length - 1].dataUrl);
  }
  const db = await openGalleryDb();
  await new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(GALLERY_STORE_NAME, 'readwrite');
    transaction.objectStore(GALLERY_STORE_NAME).put(photos, GALLERY_KEY);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
  db.close();
};

export const getGalleryPhotos = async (): Promise<GalleryPhoto[]> => {
  if (typeof indexedDB === 'undefined') return [];
  const db = await openGalleryDb();
  const photos = await new Promise<GalleryPhoto[]>((resolve, reject) => {
    const request = db.transaction(GALLERY_STORE_NAME, 'readonly')
      .objectStore(GALLERY_STORE_NAME)
      .get(GALLERY_KEY);
    request.onsuccess = () => resolve(Array.isArray(request.result) ? request.result : []);
    request.onerror = () => reject(request.error);
  });
  db.close();
  if (photos.length > 0 && photos[photos.length - 1].dataUrl) {
    finalRevealPhotoOverride = photos[photos.length - 1].dataUrl;
  }
  return photos;
};

export const clearGalleryPhotos = async (): Promise<void> => {
  if (typeof indexedDB === 'undefined') return;
  const db = await openGalleryDb();
  await new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(GALLERY_STORE_NAME, 'readwrite');
    transaction.objectStore(GALLERY_STORE_NAME).delete(GALLERY_KEY);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
  db.close();
  finalRevealPhotoOverride = null;
  try {
    localStorage.removeItem('ammukaka_photo_final');
  } catch (error) {
    console.error('Could not clear the final reveal photo', error);
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('ammukaka_photos_updated'));
  }
};

export const hasCustomPhoto = (): boolean => {
  if (typeof window === 'undefined') return false;
  return Boolean(localStorage.getItem('ammukaka_main_photo') || localStorage.getItem('ammukaka_photo_hero'));
};

export const getPhotoUrl = (key: string): string => {
  if (typeof window === 'undefined') return PHOTO_KEYS[key] || '/images/hero.png';
  try {
    if (key === 'final' && finalRevealPhotoOverride) {
      return finalRevealPhotoOverride;
    }
    const specific = localStorage.getItem(`ammukaka_photo_${key}`);
    if (specific && specific.startsWith('data:image')) {
      return specific;
    }
    const main = localStorage.getItem('ammukaka_main_photo');
    if (main && main.startsWith('data:image')) {
      return main;
    }
  } catch (e) {
    console.warn('Could not read photo from storage', e);
  }
  return PHOTO_KEYS[key] || '/images/hero.png';
};

export const saveMainPhoto = async (dataUrl: string): Promise<boolean> => {
  try {
    localStorage.setItem('ammukaka_main_photo', dataUrl);
    Object.keys(PHOTO_KEYS).forEach((k) => {
      localStorage.setItem(`ammukaka_photo_${k}`, dataUrl);
    });

    // Notify components
    window.dispatchEvent(new Event('ammukaka_photos_updated'));

    // Attempt to persist to disk via server API
    fetch('/api/upload-photo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageData: dataUrl }),
    }).catch((err) => console.log('Disk sync notice:', err));

    return true;
  } catch (e) {
    console.error('Error saving main photo', e);
    return false;
  }
};

export const savePhotoUrl = (key: string, dataUrl: string): void => {
  try {
    localStorage.setItem(`ammukaka_photo_${key}`, dataUrl);
    window.dispatchEvent(new Event('ammukaka_photos_updated'));
  } catch (e) {
    console.error('Storage quota exceeded or error saving photo', e);
  }
};

export const resetPhotos = (): void => {
  try {
    finalRevealPhotoOverride = null;
    localStorage.removeItem('ammukaka_main_photo');
    Object.keys(PHOTO_KEYS).forEach((k) => {
      localStorage.removeItem(`ammukaka_photo_${k}`);
    });
    window.dispatchEvent(new Event('ammukaka_photos_updated'));
  } catch (e) {
    console.error('Error clearing photos', e);
  }
};

export const ALL_PHOTO_DEFINITIONS = [
  { key: 'hero', label: 'Opening Hero Portrait', path: '/public/images/hero.png' },
  { key: 'portrait', label: 'Ammuka Ka Portrait', path: '/public/images/ammuka-portrait.jpeg' },
  { key: 'childhood', label: 'Childhood Memory', path: '/public/images/childhood.jpg' },
  { key: 'memory1', label: 'Memory 1 — Adventures & Talks', path: '/public/images/memory-1.jpg' },
  { key: 'memory2', label: 'Memory 2 — Growing Up', path: '/public/images/memory-2.jpg' },
  { key: 'memory3', label: 'Memory 3 — Believed In Me', path: '/public/images/memory-3.jpg' },
  { key: 'memory4', label: 'Memory 4 — Special Days', path: '/public/images/memory-4.jpg' },
  { key: 'funny1', label: 'Blooper 1 — "Okay... this one 😂"', path: '/public/images/funny-1.jpg' },
  { key: 'funny2', label: 'Blooper 2 — "Why were we like this?"', path: '/public/images/funny-2.jpg' },
  { key: 'funny3', label: 'Blooper 3 — "Never deleting this"', path: '/public/images/funny-3.jpg' },
  { key: 'final', label: 'Final Reveal — Happy Birthday', path: '/public/images/final.jpg' },
];
