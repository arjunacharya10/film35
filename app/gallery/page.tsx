import fs from 'fs';
import path from 'path';
import { GalleryGrid } from '../components/GalleryGrid';

const GALLERY_DIR = path.join(process.cwd(), 'public/images/gallery');
const MANA_DIR = path.join(process.cwd(), 'public/images/mana');
const SUPPORTED = /\.(jpe?g|png|webp)$/i;

function readJpegDimensions(filePath: string): { width: number; height: number } | null {
  try {
    const fd = fs.openSync(filePath, 'r');
    const buf = Buffer.alloc(65536);
    fs.readSync(fd, buf, 0, 65536, 0);
    fs.closeSync(fd);
    if (buf[0] !== 0xff || buf[1] !== 0xd8) return null;
    let offset = 2;
    while (offset < buf.length - 8) {
      if (buf[offset] !== 0xff) break;
      const marker = buf[offset + 1];
      if (marker >= 0xc0 && marker <= 0xc3) {
        return {
          width: (buf[offset + 7] << 8) | buf[offset + 8],
          height: (buf[offset + 5] << 8) | buf[offset + 6],
        };
      }
      const segLen = (buf[offset + 2] << 8) | buf[offset + 3];
      offset += 2 + segLen;
    }
    return null;
  } catch {
    return null;
  }
}

function getGalleryImages() {
  if (!fs.existsSync(GALLERY_DIR)) return [];
  return fs
    .readdirSync(GALLERY_DIR)
    .filter((f) => SUPPORTED.test(f))
    .sort()
    .map((filename) => {
      const dims = readJpegDimensions(path.join(GALLERY_DIR, filename));
      return {
        src: `/images/gallery/${filename}`,
        width: dims?.width ?? 3088,
        height: dims?.height ?? 2048,
      };
    });
}

function getManaImages() {
  if (!fs.existsSync(MANA_DIR)) return [];
  return fs
    .readdirSync(MANA_DIR)
    .filter((f) => SUPPORTED.test(f))
    .sort()
    .map((filename) => {
      const dims = readJpegDimensions(path.join(MANA_DIR, filename));
      return {
        src: `/images/mana/${filename}`,
        width: dims?.width ?? 3088,
        height: dims?.height ?? 2048,
      };
    });
}

export default function Gallery() {
  const images = getGalleryImages();
  const manaImages = getManaImages();

  return (
    <>
      {/* Intro */}
      <section className="px-10 pt-16 pb-20">
        <hr className="border-zinc-800 mb-12" />
        <p className="font-[family-name:var(--font-cormorant)] text-3xl lg:text-4xl leading-[1.2] text-zinc-100 max-w-7xl">
          Proof that I occasionally step away from screens to observe humans, light, shadows, and
          expensive rolls of film. All photos here are straight out of my Kodak Snapic A1 with
          absolutely zero post-processing or editing. Mostly because my lazy brain didn&apos;t want
          to put in the effort, so I came up with a Theory of Commitment&#x2122; where every future
          upload must remain untouched, and now I call it art.
        </p>
      </section>

      {/* Mana Diaries */}
      <section className="px-10 pt-8 pb-16">
        <hr className="border-zinc-800 mb-12" />
        <h2 className="font-[family-name:var(--font-cormorant)] text-5xl lg:text-6xl text-zinc-100 tracking-tight mb-10">
          Mana Diaries
        </h2>
        <p className="font-[family-name:var(--font-cormorant)] text-xl lg:text-2xl leading-relaxed text-zinc-400 max-w-4xl mb-16">
          Mana is the last village before India ends — a small cluster of stone houses perched at
          over 3,200 metres in the Chamoli district of Uttarakhand, just four kilometres from the
          Tibet border. Beyond it, the road surrenders to glacier and sky. The village sits at the
          feet of Badrinath, one of the four sacred dhams of Hinduism, where the Alaknanda river
          is believed to have flowed since the beginning of creation and where Adi Shankaracharya
          is said to have attained samadhi. This is a place where the thin air carries something
          heavier than altitude — centuries of pilgrimage, devotion, and a quiet that feels less
          like silence and more like presence. These frames are what one roll of film managed to
          hold.
        </p>
      </section>

      {manaImages.length > 0 ? (
        <GalleryGrid images={manaImages} />
      ) : (
        <section className="px-10 py-20 text-zinc-600 text-sm tracking-wider uppercase">
          No images yet.
        </section>
      )}

      {/* Reel 001 */}
      <section className="px-10 pt-20 pb-16">
        <hr className="border-zinc-800 mb-12" />
        <h2 className="font-[family-name:var(--font-cormorant)] text-5xl lg:text-6xl text-zinc-100 tracking-tight mb-10">
          Reel 001
        </h2>
      </section>

      {images.length > 0 ? (
        <GalleryGrid images={images} />
      ) : (
        <section className="px-10 py-20 text-zinc-600 text-sm tracking-wider uppercase">
          No images yet.
        </section>
      )}
    </>
  );
}
