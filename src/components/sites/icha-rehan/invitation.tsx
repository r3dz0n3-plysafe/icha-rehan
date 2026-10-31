"use client";

import { useEffect, useRef, useState } from "react";

const BASE_PATH = process.env.NODE_ENV === "production" ? "/icha-rehan" : "";
const A = `${BASE_PATH}/sites/icha-rehan`;
const WEDDING = new Date("2026-11-08T08:00:00+07:00").getTime();
// Background music is streamed from the source's own host (not copied locally).
const MUSIC =
  "https://media.gowedding.my.id/uploads/YOU_RE_STILL_THE_ONE__Shania_Twain__INSTRUMENTAL_SAX_COVER_-_Angelo_Torres_-_Romantic_SAX_-_Angelo_Torres.mp3";
const MAPS =
  "https://www.google.com/maps/search/?api=1&query=GRHA+TARUM+BARAT+Bekasi";
const CAL =
  "https://www.google.com/calendar/render?action=TEMPLATE&text=The%20Wedding%20of%20Icha%20%26%20Rehan&dates=20261108T010000Z/20261108T070000Z&location=GRHA%20TARUM%20BARAT";

const gallery = [
  "Salinan-FGM-15-Zah-05",
  "9C286A68-3904-4141-9BCF-A4BE9994F3DB-Zah-05",
  "84116D88-2B34-4E86-9068-68437A714B92-Zah-05",
  "F915B11E-CC41-4ED9-8D6E-C8401D9A6EE4-Zah-05",
  "Salinan-FGM-16-Zah-05",
  "Salinan-FGM-17-Zah-05",
  "Salinan-FGM-18-Zah-05",
  "Salinan-FGM-19-Zah-05",
  "Salinan-FGM-2-Zah-05",
  "Salinan-FGM-3-Zah-05",
  "Salinan-FGM-1-Zah-05",
  "Salinan-FGM-12-Zah-05",
];

const story = [
  { img: "Salinan-FGM-12-Zah-05-682x1024", text: "Siapa sangka, dari pertemuan sederhana di tempat kerja, aku justru dipertemukan dengan seseorang yang kini akan menjadi teman hidupku selamanya." },
  { img: "Salinan-FGM-18-Zah-05-682x1024", text: "Awalnya, kami hanya rekan kerja biasa. Kami sering bermain dan makan siang bersama teman-teman kantor lainnya, dan tentu saja, ada dia di antara kebersamaan itu. Saat itu, aku tidak pernah menyangka bahwa seseorang yang awalnya hanya kutemui dalam rutinitas pekerjaan, perlahan akan menjadi bagian terpenting dalam hidupku." },
  { img: "84116D88-2B34-4E86-9068-68437A714B92-Zah-05-683x1024", text: "Seiring berjalannya waktu, kebersamaan membuat kami semakin dekat. Dari obrolan sederhana, canda tawa, hingga cerita-cerita kecil yang akhirnya menjadi kenangan berharga. Tanpa terasa, rasa nyaman itu tumbuh menjadi cinta, dan kami mulai menyadari bahwa kami ingin menjalani lebih banyak cerita bersama." },
  { img: "Salinan-FGM-3-Zah-05-682x1024", text: "Perjalanan kami tentu bukan hanya tentang bahagia, tetapi juga tentang belajar memahami, menerima kekurangan, dan saling menguatkan. Hingga akhirnya, kami sampai pada satu keyakinan bahwa orang yang ingin kami temani dalam perjalanan hidup ini adalah satu sama lain." },
  { img: "Salinan-FGM-2-Zah-05-682x1024", text: "Kini, kami bersiap melangkah ke babak baru, mengikat janji suci dalam pernikahan. Dari dua rekan kerja yang awalnya hanya berbagi waktu bersama, kini kami akan berbagi kehidupan, membangun rumah, dan menua bersama." },
  { img: "Salinan-FGM-1-Zah-05-682x1024", text: "Dan jika suatu hari nanti kami ditanya bagaimana kisah ini bermula, jawabannya sederhana: semuanya berawal dari satu kantor, makan siang bersama teman-teman, dan seseorang yang ternyata telah Tuhan siapkan untuk menjadi rumah bagi hati kami. ❤️" },
];

const gifts = [
  { bank: "BCA", number: "7635454032", name: "Raihan Ramadhan Juandri" },
  { bank: "BJB", number: "0102385896100", name: "Liza Oktavia" },
  { bank: "Gopay", number: "081314415682", name: "Liza Oktavia" },
];

const events = [
  { title: "Akad Nikah", time: "Pukul 08.00 s/d 09.00 WIB" },
  { title: "Resepsi Nikah", time: "Pukul 11.00 s/d 14.00 WIB" },
];

type Wish = { name: string; text: string };

function useCountdown() {
  const [left, setLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, WEDDING - Date.now());
      setLeft({
        d: Math.floor(diff / 864e5),
        h: Math.floor(diff / 36e5) % 24,
        m: Math.floor(diff / 6e4) % 60,
        s: Math.floor(diff / 1e3) % 60,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return left;
}

const pill =
  "inline-flex items-start gap-[5px] rounded-[20px] border-[0.8px] border-white px-6 py-3 text-[13px] leading-[13px] font-medium transition-all duration-300";
const lbl = "font-[family-name:var(--font-upright)] block w-fit cursor-pointer uppercase text-[13px] leading-[22px] font-medium md:text-[16px] md:leading-[1.7] lg:text-[14px]";
const field =
  "block h-10 w-full appearance-none font-[family-name:var(--font-amiri)] rounded-none border-0 border-b-[0.8px] border-white bg-transparent text-[13px] text-white outline-none md:text-[15px]";

// Font Awesome Free 5.15.4 glyphs (CC BY 4.0), same icons as the source
const ICON = {
  pin: { vb: "0 0 288 512", d: "M112 316.94v156.69l22.02 33.02c4.75 7.12 15.22 7.12 19.97 0L176 473.63V316.94c-10.39 1.92-21.06 3.06-32 3.06s-21.61-1.14-32-3.06zM144 0C64.47 0 0 64.47 0 144s64.47 144 144 144 144-64.47 144-144S223.53 0 144 0zm0 76c-37.5 0-68 30.5-68 68 0 6.62-5.38 12-12 12s-12-5.38-12-12c0-50.73 41.28-92 92-92 6.62 0 12 5.38 12 12s-5.38 12-12 12z" },
  cal: { vb: "0 0 448 512", d: "M400 64h-48V12c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v52H160V12c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v52H48C21.49 64 0 85.49 0 112v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 400H54a6 6 0 0 1-6-6V160h352v298a6 6 0 0 1-6 6zm-52.849-200.65L198.842 404.519c-4.705 4.667-12.303 4.637-16.971-.068l-75.091-75.699c-4.667-4.705-4.637-12.303.068-16.971l22.719-22.536c4.705-4.667 12.303-4.637 16.97.069l44.104 44.461 111.072-110.181c4.705-4.667 12.303-4.637 16.971.068l22.536 22.718c4.667 4.705 4.636 12.303-.069 16.97z" },
  globe: { vb: "0 0 496 512", d: "M248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248 8zm-11.34 240.23c-2.89 4.82-8.1 7.77-13.72 7.77h-.31c-4.24 0-8.31 1.69-11.31 4.69l-5.66 5.66c-3.12 3.12-3.12 8.19 0 11.31l5.66 5.66c3 3 4.69 7.07 4.69 11.31V304c0 8.84-7.16 16-16 16h-6.11c-6.06 0-11.6-3.42-14.31-8.85l-22.62-45.23c-2.44-4.88-8.95-5.94-12.81-2.08l-19.47 19.46c-3 3-7.07 4.69-11.31 4.69H50.81C49.12 277.55 48 266.92 48 256c0-110.28 89.72-200 200-200 21.51 0 42.2 3.51 61.63 9.82l-50.16 38.53c-5.11 3.41-4.63 11.06.86 13.81l10.83 5.41c5.42 2.71 8.84 8.25 8.84 14.31V216c0 4.42-3.58 8-8 8h-3.06c-3.03 0-5.8-1.71-7.15-4.42-1.56-3.12-5.96-3.29-7.76-.3l-17.37 28.95zM408 358.43c0 4.24-1.69 8.31-4.69 11.31l-9.57 9.57c-3 3-7.07 4.69-11.31 4.69h-15.16c-4.24 0-8.31-1.69-11.31-4.69l-13.01-13.01a26.767 26.767 0 0 0-25.42-7.04l-21.27 5.32c-1.27.32-2.57.48-3.88.48h-10.34c-4.24 0-8.31-1.69-11.31-4.69l-11.91-11.91a8.008 8.008 0 0 1-2.34-5.66v-10.2c0-3.27 1.99-6.21 5.03-7.43l39.34-15.74c1.98-.79 3.86-1.82 5.59-3.05l23.71-16.89a7.978 7.978 0 0 1 4.64-1.48h12.09c3.23 0 6.15 1.94 7.39 4.93l5.35 12.85a4 4 0 0 0 3.69 2.46h3.8c1.78 0 3.35-1.18 3.84-2.88l4.2-14.47c.5-1.71 2.06-2.88 3.84-2.88h6.06c2.21 0 4 1.79 4 4v12.93c0 2.12.84 4.16 2.34 5.66l11.91 11.91c3 3 4.69 7.07 4.69 11.31v24.6z" },
  wa: { vb: "0 0 448 512", d: "M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" },
};

// Font Awesome glyphs used by the source (far-copy: 448x512, dove: 512x512)
const FA_COPY =
  "M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z";
const FA_CHEVRON_CIRCLE_LEFT =
  "M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248-111 248-248 248zM142.1 273l135.5 135.5c9.4 9.4 24.6 9.4 33.9 0l17-17c9.4-9.4 9.4-24.6 0-33.9L226.9 256l101.6-101.6c9.4-9.4 9.4-24.6 0-33.9l-17-17c-9.4-9.4-24.6-9.4-33.9 0L142.1 239c-9.4 9.4-9.4 24.6 0 34z";
const FA_CHEVRON_CIRCLE_RIGHT =
  "M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm113.9 231L234.4 103.5c-9.4-9.4-24.6-9.4-33.9 0l-17 17c-9.4 9.4-9.4 24.6 0 33.9L285.1 256 183.5 357.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0L369.9 273c9.4-9.4 9.4-24.6 0-34z";
// Elementor eicons caret-down (select arrow in the RSVP form)
const EICON_CARET_DOWN = "M571 393Q571 407 561 418L311 668Q300 679 286 679T261 668L11 418Q0 407 0 393T11 368 36 357H536Q550 357 561 368T571 393Z";
const FA_MUSIC =
  "M470.38 1.51L150.41 96A32 32 0 0 0 128 126.51v261.41A139 139 0 0 0 96 384c-53 0-96 28.66-96 64s43 64 96 64 96-28.66 96-64V214.32l256-75v184.61a138.4 138.4 0 0 0-32-3.93c-53 0-96 28.66-96 64s43 64 96 64 96-28.65 96-64V32a32 32 0 0 0-41.62-30.49z";
const FA_PAUSE_CIRCLE =
  "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm-16 328c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160zm112 0c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160z";
const FA_DOVE =
  "M496 64c13.2 0 20.7 15.1 12.8 25.6L480 128 480 304c0 79.5-64.5 144-144 144l-112 0-46.3 46.3c-10.4 10.4-26.5 12.4-39.1 4.8L41.5 440.9c-17-10.2-15-35.5 3.4-42.9L160 352C23.8 311.1 7.5 169.8 22 95.7 25.6 77.9 45.3 71.4 61.3 80.2L320 224 320 144c0-44.2 35.8-80 80-80l96 0zm-96 56a24 24 0 1 0 0 48 24 24 0 1 0 0-48zM182.5-9.6c12.4-13.7 33.3-8.9 42.5 7.1l56.4 98.3c-5.8 14.4-9.2 30.1-9.4 46.5L138.1 68c10.1-31.6 27-58.4 44.4-77.6z";

function Icon({
  d,
  vb = "0 0 24 24",
  w = 13,
  h = 13,
  className,
}: {
  d: string;
  vb?: string;
  w?: number;
  h?: number;
  className?: string;
}) {
  return (
    <svg viewBox={vb} width={w} height={h} fill="currentColor" aria-hidden className={className}>
      <path d={d} />
    </svg>
  );
}

function Panel({
  img,
  gradient,
  className = "",
  children,
}: {
  img: string;
  /** opening/bride/groom use a dark gradient overlay; every other section a flat #131313 one */
  gradient?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section
      ref={ref}
      className={`relative flex min-h-screen min-h-[100dvh] w-full snap-start flex-col overflow-hidden px-5 py-10 ${className}`}
    >
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${A}/${img}.webp)` }} />
      <div
        className={`absolute inset-0 opacity-50 ${
          gradient ? "bg-[linear-gradient(rgba(0,0,0,0.12)_0%,rgb(28,28,28)_100%)]" : "bg-[rgb(19,19,19)]"
        }`}
      />
      <div className={`reveal relative z-10 flex w-full flex-col items-[inherit] [&>*]:max-w-full ${seen ? "in" : ""}`} style={{ alignItems: "inherit" }}>
        {children}
      </div>
    </section>
  );
}

function Person({
  name,
  role,
  parents,
  right,
}: {
  name: React.ReactNode;
  role: string;
  parents: React.ReactNode;
  right?: boolean;
}) {
  return (
    <div className={`w-full ${right ? "text-right" : "text-left"}`}>
      <h2 className="rv-fade font-display text-[30px] leading-9 md:text-[40px] md:leading-10 lg:text-[35px] lg:leading-[35px]">{name}</h2>
      {/* source: two stacked Elementor dividers, 0.8px white, 80% and 70% wide, 3px apart */}
      <div className="rv-fade relative mt-[10px] h-[22px]" aria-hidden>
        <span className={`absolute top-px h-0 w-[80%] border-t-[0.8px] border-white ${right ? "right-0" : "left-0"}`} />
        <span className={`absolute top-1 h-0 w-[70%] border-t-[0.8px] border-white ${right ? "right-0" : "left-0"}`} />
      </div>
      <p className="rv-fade font-cormorant text-base leading-4 italic md:text-[20px] md:leading-5 lg:text-[18px] lg:leading-[18px]">{role}</p>
      <p className="rv-fade font-cormorant mt-[10px] text-base leading-4 md:text-[20px] md:leading-5 lg:text-[18px] lg:leading-[18px]">{parents}</p>
    </div>
  );
}

function GiftRow({ title, lines, copy }: { title: string; lines: string[]; copy: string }) {
  const [done, setDone] = useState(false);
  return (
    <div className="flex items-start border-b-[0.8px] border-white pb-[10px]">
      <div className="w-[62.9%] md:w-[65.5%]">
        <p className="font-cormorant text-[25px] leading-[30px] uppercase md:text-[35px] md:leading-[35px] lg:text-[25px] lg:leading-[25px]">{title}</p>
        <div className="mt-[5px] text-[14px] leading-[19px] md:text-[15px]">
          {lines.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </div>
      </div>
      <div className="flex w-[37.1%] items-center justify-end self-stretch pt-[15px] md:w-[34.4%]">
        <button
          type="button"
          className={`rv-fade ${pill} font-cormorant cursor-pointer uppercase`}
          onClick={() => {
            void navigator.clipboard?.writeText(copy);
            setDone(true);
            setTimeout(() => setDone(false), 1500);
          }}
        >
          <Icon d={FA_COPY} vb="0 0 448 512" w={15.6} h={17.8} /> {done ? "Tersalin" : "Salin"}
        </button>
      </div>
    </div>
  );
}

// slides visible at once, set per breakpoint through the --pv custom property (as the source's Swiper breakpoints)
const MAX_PER_VIEW = 2;

function Carousel({
  images,
  perView,
  captions,
  gap = "[--g:5px] min-[767px]:[--g:8px]",
  className = "mt-3",
}: {
  images: string[];
  /** Tailwind classes setting --g, the Swiper spaceBetween */
  gap?: string;
  /** Tailwind classes setting --pv; the source's Swiper switches at min-width 767px and 1024px */
  perView: string;
  captions?: string[];
  className?: string;
}) {
  const n = images.length;
  const [i, setI] = useState(0);
  const [anim, setAnim] = useState(true);
  const [hover, setHover] = useState(false);
  const [stopped, setStopped] = useState(false);
  const slides = [...images, ...images.slice(0, MAX_PER_VIEW)];

  const step = (d: number) => {
    if (d > 0) {
      setAnim(true);
      setI((v) => v + 1);
    } else if (i === 0) {
      setAnim(false);
      setI(n);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setAnim(true);
          setI(n - 1);
        }),
      );
    } else {
      setAnim(true);
      setI((v) => v - 1);
    }
  };

  // wrap seamlessly once the cloned slides are reached
  useEffect(() => {
    if (i !== n) return;
    const t = setTimeout(() => {
      setAnim(false);
      setI(0);
    }, 500);
    return () => clearTimeout(t);
  }, [i, n]);

  // autoplay every 5s; pauses on hover/touch, stops after interaction
  useEffect(() => {
    if (hover || stopped) return;
    const t = setInterval(() => {
      setAnim(true);
      setI((v) => (v >= n ? v : v + 1));
    }, 5000);
    return () => clearInterval(t);
  }, [hover, stopped, n]);

  const current = i % n;
  const interact = (fn: () => void) => () => {
    setStopped(true);
    fn();
  };
  return (
    <div className={`${captions ? "rv-fade" : "rv-up"} ${className} w-full`}>
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onTouchStart={() => setHover(true)}
        onTouchEnd={() => setHover(false)}
      >
        <div
          className={`flex gap-[var(--g)] ${gap} ${perView} ${anim ? "transition-transform duration-500 ease-out" : ""}`}
          style={{
            transform: `translateX(calc(${-i} * ((100% - (var(--pv) - 1) * var(--g)) / var(--pv) + var(--g))))`,
          }}
        >
          {slides.map((g, k) => (
            <div key={`${g}-${k}`} style={{ flex: "0 0 calc((100% - (var(--pv) - 1) * var(--g)) / var(--pv))" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${A}/${g}.webp`} alt="" className="block h-auto w-full" />
              {/* the source renders each caption inside its slide, so captions slide with their photo */}
              {captions && (
                // slides stretch to the tallest caption (Swiper autoHeight-like), as in the source
                <p className="mt-5 text-left text-[14px] leading-[19px] md:pb-[10px] md:text-[15px]">{captions[k % n]}</p>
              )}
            </div>
          ))}
        </div>
        {[-1, 1].map((d) => (
          <button
            key={d}
            type="button"
            aria-label={d < 0 ? "Previous" : "Next"}
            onClick={interact(() => step(d))}
            className={`absolute grid size-[25px] cursor-pointer place-items-center ${
              captions
                ? `top-[calc(50%-19.5px)] text-white ${d < 0 ? "left-0" : "right-0"}`
                : `top-1/2 -translate-y-1/2 text-[rgba(237,237,237,0.9)] ${d < 0 ? "left-[10px]" : "right-[10px]"}`
            }`}
          >
            <Icon d={d < 0 ? FA_CHEVRON_CIRCLE_LEFT : FA_CHEVRON_CIRCLE_RIGHT} vb="0 0 512 512" w={25} h={25} />
          </button>
        ))}
      </div>
      {captions && (
        <div className="pt-[10px]">
          <div className="flex justify-center gap-3">
            {images.map((g, k) => (
              <button
                key={g}
                type="button"
                aria-label={`Slide ${k + 1}`}
                onClick={interact(() => {
                  setAnim(true);
                  setI(k);
                })}
                className={`size-1.5 rounded-full ${k === current ? "bg-white" : "bg-white/40"}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function Invitation({ guest }: { guest: string }) {
  const [open, setOpen] = useState(false);
  // the cover slides up and fades out (source: fadeInDown played in reverse, 1.2s) before it unmounts
  const [leaving, setLeaving] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [rsvpSubmitting, setRsvpSubmitting] = useState(false);
  const [rsvpSent, setRsvpSent] = useState(false);
  const left = useCountdown();

  useEffect(() => {
    // no scrolling (and no scrollbar) while the cover is shown
    document.documentElement.style.overflow = open ? "" : "hidden";
    // the source snaps to each panel (scroll-snap-type: y mandatory)
    document.documentElement.style.scrollSnapType = open ? "y mandatory" : "";
    return () => {
      document.documentElement.style.scrollSnapType = "";
    };
  }, [open]);

  return (
    <div className="relative min-h-screen bg-[#0b0b0d] text-white">
      {/* Left fixed hero (desktop) */}
      <div
        className="fixed inset-y-0 left-0 hidden bg-cover bg-center lg:block lg:w-[70vw]"
        style={{ backgroundImage: `url(${A}/Salinan-FGM-8-Zah-05.webp)` }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.12)_0%,#000_100%)] opacity-[.83]" />
        <div className="absolute bottom-[88px] left-20">
          <p className="cover-fade text-[17px] leading-[17px] uppercase">Undangan Pernikahan</p>
          <h1 className="cover-fade font-display mt-5 text-[70px] leading-[56px] tracking-[-1.6px]">
            Icha &amp; Rehan
          </h1>
          <p className="cover-fade mt-5 text-[20px] leading-5">08. 11. 2026</p>
        </div>
      </div>

      {/* Right column */}
      <div className="relative ml-auto w-full lg:w-[30%]">
        {/* Cover */}
        {!open && (
        // source: a fixed-height content block (681 / 778 / 739px) centred in the viewport; when the
        // viewport is shorter the block overflows evenly, and the background grows with it
        <section className={`flex h-screen h-[100dvh] w-full flex-col items-center justify-center text-center overflow-hidden ${leaving ? "cover-leave pointer-events-none fixed top-0 right-0 z-30 w-full lg:w-[30%]" : "relative"}`}>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${A}/F915B11E-CC41-4ED9-8D6E-C8401D9A6EE4-Zah-05.webp)` }}
          />
          {/* source: section ::before overlay, #000 at opacity .2 */}
          <div className="absolute inset-0 bg-black opacity-20" />
          <div className="relative flex h-full max-h-[778px] w-full shrink-0 flex-col items-center justify-end pb-8 sm:pb-12 md:pb-10 lg:h-[739px] lg:pb-5">
          <div className="absolute inset-x-0 top-6 sm:top-[30px] md:top-5 lg:top-0">
            <p className="cover-fade font-cormorant text-[15px] leading-[15px] font-semibold uppercase md:text-[18px] md:leading-[18px] lg:text-base lg:leading-4">The Wedding of</p>
            <h1 className="cover-fade font-display mt-[15px] sm:mt-[25px] text-[36px] sm:text-[40px] leading-8 md:text-[50px] md:leading-[50px] lg:text-[45px] lg:leading-[45px]">Icha &amp; Rehan</h1>
            <p className="cover-fade mt-[15px] sm:mt-[25px] text-[13px] leading-[13px] uppercase md:text-[16px] md:leading-4 lg:text-[14px] lg:leading-[14px]">Minggu, 08 November 2026</p>
          </div>
          <p className="cover-fade text-[13px] leading-[13px] md:text-[14px] md:leading-[14px] lg:text-[15px] lg:leading-[15px]">Yth. Bapak/Ibu/Saudara/i</p>
          <p className="mt-5 font-[family-name:var(--font-bitter)] text-[17px] leading-[17px] font-medium md:text-[19px] md:leading-[19px] lg:text-[17px] lg:leading-[17px]">{guest}</p>
          <p className="cover-fade mt-5 w-full text-[13px] leading-[13px] md:text-[14px] md:leading-[14px] lg:text-[15px] lg:leading-[15px]">
            Tanpa mengurangi rasa hormat, kami mengundang anda untuk menghadiri acara pernikahan kami.
          </p>
          <button
            type="button"
            onClick={() => {
              setLeaving(true);
              window.setTimeout(() => {
                setOpen(true);
                setLeaving(false);
              }, 1200);
              window.scrollTo(0, 0);
              // opening is a user gesture, so autoplay is allowed (the source starts music here too)
              audioRef.current?.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
            }}
            className="mt-5 cursor-pointer rounded-[20px] border-0 border-solid border-white bg-white/[.43] px-[23px] py-2 font-[family-name:var(--font-roboto)] text-[14px] leading-[21px] text-white transition-all duration-[400ms] hover:border-[1.6px] hover:bg-transparent"
          >
            <svg viewBox="0 0 512 512" width="14" height="14" fill="currentColor" aria-hidden className="inline-block align-[-0.125em]">
              <path d="M512 464c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V200.724a48 48 0 0 1 18.387-37.776c24.913-19.529 45.501-35.365 164.2-121.511C199.412 29.17 232.797-.347 256-.003c23.198-.354 56.596 29.172 73.413 41.433 118.687 86.137 139.303 101.995 164.2 121.512A48 48 0 0 1 512 200.724V464zm-65.666-196.605c-2.563-3.728-7.7-4.595-11.339-1.907-22.845 16.873-55.462 40.705-105.582 77.079-16.825 12.266-50.21 41.781-73.413 41.43-23.211.344-56.559-29.143-73.413-41.43-50.114-36.37-82.734-60.204-105.582-77.079-3.639-2.688-8.776-1.821-11.339 1.907l-9.072 13.196a7.998 7.998 0 0 0 1.839 10.967c22.887 16.899 55.454 40.69 105.303 76.868 20.274 14.781 56.524 47.813 92.264 47.573 35.724.242 71.961-32.771 92.263-47.573 49.85-36.179 82.418-59.97 105.303-76.868a7.998 7.998 0 0 0 1.839-10.967l-9.071-13.196z" />
            </svg>{" "}
            Buka Undangan
          </button>
          </div>
        </section>
        )}

        {(open || leaving) && (
          <div>
            {/* Opening */}
            <Panel img="Salinan-FGM-15-Zah-05" gradient className="justify-end !px-[15px] !pb-[100px] md:!px-5 md:!pb-[60px]">
              <p className="rv-fade text-[15px] leading-[15px] uppercase md:text-[18px] md:leading-[18px] lg:text-base lg:leading-4">The Wedding of</p>
              <h2 className="rv-fade font-display mt-[10px] text-[45px] leading-9 font-medium md:text-[50px] md:leading-[50px] lg:text-[45px] lg:leading-[45px]">
                Icha<br />&amp; Rehan
              </h2>
              <p className="rv-up mt-[10px] text-[14px] leading-[19px] md:text-[15px]">
                Dengan segala rahmat dan karunia Allah SWT, Kami bermaksud untuk melangsungkan pernikahan kami
              </p>
              <p className="rv-fade mt-[13px] text-[13px] leading-[13px] md:mt-[15px] md:text-[16px] md:leading-4 lg:text-[15px] lg:leading-[15px]">08. 11. 2026</p>
            </Panel>

            {/* Bride */}
            <Panel img="Salinan-FGM-20-Zah-05" gradient className="justify-end !px-[15px] !pb-[100px] md:!px-5 md:!pb-[60px]">
              <Person name={<>Liza<br />Oktavia Harahap, S.Psi</>} role="Putri Dari" parents={<>Bapak Kompol (Purn.) M. Harahap &amp;<br />Ibu Eneng Sumiati</>} />
            </Panel>

            {/* Groom */}
            <Panel img="Salinan-FGM-21-Zah-05" gradient className="items-end justify-end !px-[15px] !pb-[100px] text-right md:!px-5 md:!pb-[60px]">
              <Person right name={<>Raihan<br />Ramadhan Juandri, S.Kom</>} role="Putra dari" parents={<>Bapak Drs. Jones Suwandri &amp;<br />Ibu Majreha</>} />
            </Panel>

            {/* Events */}
            <Panel img="Salinan-FGM-16-Zah-05" className="items-center justify-center text-center !px-[15px] !pt-0 !pb-[21px] md:!px-5 md:!pb-[60px]">
              {events.map((e, k) => (
                <div key={e.title} className="flex w-full flex-col items-center">
                  {/* source: straight vertical divider, 60px x 0.8px white, centred between the two events */}
                  {k > 0 && (
                    <div className="rv-fade relative h-[93.4px] w-full md:h-[102.4px] lg:h-[103.4px]" aria-hidden>
                      <span className="absolute top-[17.4px] left-1/2 h-[60px] w-[0.8px] -translate-x-1/2 bg-white md:top-[21.4px]" />
                    </div>
                  )}
                  <h2 className="rv-up font-display text-[33px] leading-10 md:text-[35px] md:leading-[38px]">{e.title}</h2>
                  <p className="rv-up mt-[5px] text-[15px] leading-[18px] uppercase md:mt-[10px] md:text-[16px] md:leading-4">Minggu, 08 November 2026</p>
                  <p className="rv-up mt-[5px] text-[14px] leading-[19px] md:mt-[10px] md:text-[16px] lg:text-[14px]">{e.time}</p>
                  <p className="rv-up mt-3 text-[15px] leading-[18px] font-medium md:mt-5 md:text-[18px] lg:text-[17px] lg:leading-[17px]">GRHA TARUM BARAT</p>
                  <p className="rv-up mt-3 text-[14px] leading-[19px] md:mt-5 md:text-[15px]">
                    Jl. Insinyur H. Juanda No.124 D, RT.002/RW.007, Margahayu, Kec. Bekasi Tim., Kota Bks, Jawa Barat 17113
                  </p>
                  <a href={MAPS} target="_blank" rel="noreferrer" className={`rv-fade ${pill} mt-3.5 md:mt-5`}>
                    <Icon {...ICON.pin} /> GOOGLE MAPS
                  </a>
                </div>
              ))}
            </Panel>

            {/* Countdown + verse */}
            <Panel img="9C286A68-3904-4141-9BCF-A4BE9994F3DB-Zah-05" className="items-center justify-center !px-[15px] !pb-[139px] text-center md:justify-end md:!px-5 md:!pb-[60px]">
              <h2 className="rv-up font-display text-[33px] leading-10 md:text-[35px] md:leading-[38px]">Counting Days</h2>
              <div className="rv-zoom mt-7 flex justify-center gap-[18.5px] md:mt-[23px] md:gap-[26px] lg:mt-5 lg:gap-5">
                {([["d", "Hari"], ["h", "Jam"], ["m", "Menit"], ["s", "Detik"]] as const).map(([k, label]) => (
                  <div key={k} className="w-[66px] md:w-[147px] lg:w-[79.1px]">
                    <div className="font-noto text-[30px] leading-[30px] font-thin md:text-[35px] md:leading-[35px] lg:text-[32px] lg:leading-none">{String(left[k]).padStart(2, "0")}</div>
                    <div className="text-[14px] leading-7 md:text-[17px] md:leading-[17px] lg:text-[15px] lg:leading-none">{label}</div>
                  </div>
                ))}
              </div>
              <p className="rv-up mt-[15px] text-[14px] leading-[19px] md:mt-[23px] md:text-[15px] lg:mt-5 lg:text-[14px]">
                Dan diantara ayat-ayat-Nya ialah Dia menciptakan untukmu istri-istri dari jenismu sendiri, supaya kamu merasa nyaman kepadanya, dan dijadikan-Nya di antaramu mawadah dan rahmah. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir.
              </p>
              <p className="rv-fade mt-5 text-[13px] leading-[13px] md:mt-[10px] md:text-[16px] md:leading-4 lg:text-[15px] lg:leading-[15px]">Q.S Ar-Rum 30: Ayat 21</p>
              <a href={CAL} target="_blank" rel="noreferrer" className={`rv-fade ${pill} mt-5 lg:mt-[19.6px]`}>
                <Icon {...ICON.cal} /> ADD TO CALENDER
              </a>
            </Panel>

            {/* RSVP */}
            <Panel img="Salinan-FGM-18-Zah-05" className="justify-center !px-[15px] !pt-0 !pb-[100px] md:!px-5 md:!pb-[50px]">
              <h2 className="rv-up font-display text-[36px] leading-[43px] md:text-[35px] md:leading-[38px]">RSVP</h2>
              <p className="rv-up mt-[11px] text-[14px] leading-[19px] md:mt-[10px] md:text-[15px]">
                Bagi tamu undangan yang akan hadir di acara pernikahan kami silahkan kirimkan konfirmasi kehadiran dengan mengisi form berikut :
              </p>
              <form
                className="rv-up mt-5 w-full"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (rsvpSubmitting) return;
                  const form = e.currentTarget;
                  const f = new FormData(form);
                  const name = String(f.get("name") || guest || "").trim();
                  const attend = String(f.get("attend") || "Iya, Saya akan datang");
                  const nog = String(f.get("nog") || "1");
                  const msg = `Hai, Saya ${name} ingin konfirmasi kehadiran pada undangan pernikahan digital bahwa ${attend} (${nog} orang). .Terima Kasih`;
                  const waUrl = `https://wa.me/6281314415682?text=${encodeURIComponent(msg)}`;

                  setRsvpSubmitting(true);
                  // Simulates Elementor AJAX form submission interval (1.5s) then opens WhatsApp
                  window.setTimeout(() => {
                    setRsvpSent(true);
                    setRsvpSubmitting(false);
                    window.setTimeout(() => {
                      window.open(waUrl, "_blank");
                    }, 500);
                  }, 1200);
                }}
              >
                <label htmlFor="rsvp-name" className={lbl}>Nama</label>
                <input id="rsvp-name" name="name" required placeholder="Masukkan nama" defaultValue={guest} className={`${field} px-4 py-2`} />
                <label htmlFor="rsvp-status" className={`${lbl} mt-[10px]`}>Konfirmasi Kehadiran</label>
                <div className="relative">
                  <select id="rsvp-status" name="attend" className={`${field} py-[5px] pr-5 pl-[14px]`}>
                    <option className="text-black" value="Iya, Saya akan datang">Iya, Saya akan datang</option>
                    <option className="text-black" value="Maaf, Saya tidak bisa datang">Maaf, Saya tidak bisa datang</option>
                  </select>
                  <svg viewBox="0 0 571.4 571.4" width="11" height="11" fill="currentColor" aria-hidden className="pointer-events-none absolute top-[14.3px] right-[10px] overflow-visible"><path d={EICON_CARET_DOWN} /></svg>
                </div>
                <label htmlFor="rsvp-guests" className={`${lbl} mt-[10px]`}>Jumlah Tamu</label>
                <div className="relative">
                  <select id="rsvp-guests" name="nog" defaultValue="1" className={`${field} py-[5px] pr-5 pl-[14px]`}>
                    <option className="text-black" value="0">0</option>
                    <option className="text-black" value="1">1</option>
                    <option className="text-black" value="2">2</option>
                  </select>
                  <svg viewBox="0 0 571.4 571.4" width="11" height="11" fill="currentColor" aria-hidden className="pointer-events-none absolute top-[14.3px] right-[10px] overflow-visible"><path d={EICON_CARET_DOWN} /></svg>
                </div>
                {rsvpSent && (
                  <div className="mt-3 rounded border border-[#28a745]/40 bg-[#28a745]/20 p-2.5 text-center text-[13px] text-white">
                    Konfirmasi berhasil dikirim. Membuka WhatsApp...
                  </div>
                )}
                <div className="mt-[10px] flex justify-end">
                  <button
                    type="submit"
                    disabled={rsvpSubmitting}
                    className="h-10 cursor-pointer rounded-[20px] border-[0.8px] border-[#f3f3f3] px-5 text-[13px] leading-[13px] font-medium text-[#f3f3f3] uppercase transition-all duration-300 disabled:opacity-60 flex items-center gap-2"
                  >
                    {rsvpSubmitting && (
                      <svg className="size-3.5 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                      </svg>
                    )}
                    {rsvpSubmitting ? "Mengirim..." : "Konfirmasi Kehadiran"}
                  </button>
                </div>
              </form>
            </Panel>

            {/* Gallery */}
            <Panel img="F915B11E-CC41-4ED9-8D6E-C8401D9A6EE4-Zah-05" className="justify-center !px-[15px] !pt-0 !pb-[9px] md:!px-5 md:!pb-[60px]">
              <h2 className="rv-up font-display text-[33px] leading-[33px] tracking-normal md:text-[35px] md:leading-[35px]">Our Pre-Wedding</h2>
              <Carousel images={gallery.slice(0, 6)} perView="[--pv:2]"className="mt-[25px] md:mt-[30px]" />
              <Carousel images={gallery.slice(6)} perView="[--pv:2]"className="mt-[5px] md:mt-[10px]" />
              <p className="rv-up mt-[25px] text-right text-[14px] leading-[19px] md:mt-[30px] md:text-[15px]">
                “I was created in time to fill your time, and I use all the time in my live to love you.”
              </p>
            </Panel>

            {/* Story */}
            <Panel img="Salinan-FGM-17-Zah-05" className="justify-center !px-[15px] !pt-0 !pb-[100px] md:!px-5 md:!pb-[60px]">
              <h2 className="rv-up font-display text-center text-[33px] leading-[39.6px] md:text-[35px] md:leading-[38px]">Journey of Love</h2>
              <Carousel images={story.map((s) => s.img)} perView="[--pv:1] min-[767px]:[--pv:2] min-[1024px]:[--pv:1]" gap="[--g:10px]" captions={story.map((s) => s.text)} className="mt-[25px] md:mt-[30px]" />
            </Panel>

            {/* Gift */}
            <Panel img="Salinan-FGM-2-Zah-05" className="justify-center !px-[15px] !pt-0 !pb-[10.4px] md:!px-5 md:!pb-[60px]">
              <h2 className="rv-up font-display text-[33px] leading-10 md:text-[35px] md:leading-[38px]">Wedding Gift</h2>
              <p className="rv-up mt-[5px] text-[14px] leading-[19px] md:mt-5 md:text-[15px]">
                Doa Restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika memberi adalah ungkapan tanda kasih Anda, kami akan senang hati menerimanya yang tentu akan semakin melengkapi kebahagiaan kami.
              </p>
              <div className="rv-up mt-[25px] space-y-[15px] md:mt-[30px] md:space-y-5">
                {gifts.map((g) => (
                  <GiftRow key={g.bank} title={g.bank} lines={[g.number, g.name]} copy={g.number} />
                ))}
                <GiftRow
                  title="GIFT"
                  lines={["a/n Liza Oktavia - 081314415682", "Telaga Mas Blok H6. No. 26 RT.007/ RW. 014. Harapan Baru , Bekasi Utara"]}
                  copy="Telaga Mas Blok H6. No. 26 RT.007/ RW. 014. Harapan Baru , Bekasi Utara"
                />
              </div>
            </Panel>

            {/* Wishes */}
            <Panel img="Salinan-FGM-3-Zah-05" className="justify-center !px-[15px] !pt-0 !pb-[23px] md:!px-5 md:!pb-[73px]">
              <h2 className="rv-up font-display text-[33px] leading-10 md:text-[35px] md:leading-[38px]">Your Best Wishes</h2>
              <p className="rv-up mt-1 text-[14px] leading-[19px] md:mt-5 md:text-[15px]">Berikan ucapan hangat dan do&apos;a terbaik untuk kami</p>
              {/* same inline structure as the source: 14px/21px wrapper, 16px/24px italic link, icon at -2px */}
              <div className="rv-up mt-[5.6px] px-[15px] py-[6px] text-[14px] leading-[21px] md:mt-5">
                <span className="font-cormorant text-[16px] leading-6 font-medium italic">
                  <Icon d={FA_DOVE} vb="0 0 512 512" w={20} h={16} className="mr-[5px] inline-block align-[-2px]" />{" "}
                  <span>{wishes.length}</span> Comments
                </span>
              </div>
              <form
                className="rv-up mx-[15px] mt-[17.4px] md:mt-[18px]"
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const f = new FormData(form);
                  setWishes((w) => [{ name: String(f.get("name")), text: String(f.get("text")) }, ...w]);
                  form.reset();
                }}
              >
                <input name="name" required maxLength={100} placeholder="Nama" className="block h-[30px] w-full border-[0.8px] border-[#e0dcd1] bg-white/[.43] px-[6px] py-[3px] font-[family-name:var(--font-amiri)] text-[15px] leading-[15px] font-medium text-white outline-none placeholder:text-white/70" />
                <textarea name="text" required minLength={2} placeholder="Ucapan" className="mt-[10px] block h-[75px] w-full resize-y border-[0.8px] border-[#e0dcd1] bg-white/[.43] px-[6px] py-1 font-[family-name:var(--font-amiri)] text-[15px] leading-[19px] font-medium text-white outline-none placeholder:text-white/70" />
                <div className="mt-[15px] flex justify-end pr-[9.5px]">
                  <button className="font-cormorant h-10 rounded-[20px] border-[0.8px] border-[#f3f3f3] px-[30px] text-[15px] leading-[22.5px] cursor-pointer font-medium text-white uppercase italic transition-all duration-300">Kirim</button>
                </div>
              </form>
              <ul className="mt-3 max-h-40 space-y-2 overflow-auto text-[13px]">
                {wishes.map((w, i) => (
                  <li key={i} className="bg-black/30 p-2">
                    <p className="font-semibold">{w.name}</p>
                    <p>{w.text}</p>
                  </li>
                ))}
              </ul>
            </Panel>

            {/* Thanks */}
            <Panel img="Salinan-FGM-1-Zah-05" className="items-center justify-center text-center !px-[15px] !pt-0 !pb-[50px] md:!px-5 md:!pb-[90px]">
              <h2 className="rv-up font-display text-[30px] leading-[30px] font-medium md:text-[35px] md:leading-[35px]">Thank You For<br />Your Attendance<br />And Support</h2>
              <p className="rv-up mt-[5px] text-[14px] leading-[19px] md:mt-[10px] md:text-[16px] lg:text-[15px]">
                Merupakan suatu kebahagiaan dan kehormatan bagi kami, apabila Bapak/Ibu/Saudara/i berkenan hadir di hari bahagia kami
              </p>
              <p className="rv-up font-display mt-[5px] text-[25px] leading-[30px] font-medium md:mt-5 md:text-[35px] md:leading-[35px] lg:text-[30px] lg:leading-[30px]">Icha &amp; Rehan</p>
              <p className="rv-down mt-[90px] font-[family-name:var(--font-jakarta)] text-[13px] leading-[16.9px] md:mt-[100px] md:text-[14px] md:leading-[18.2px] lg:text-[13px] lg:leading-[16.9px]">Digital Invitation By</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${A}/Dwika-WO.webp`} alt="Dwika WO" className="rv-fade mt-5 h-auto w-[124px] lg:mt-5" />
              <div className="rv-down mt-5 flex items-center font-[family-name:var(--font-upright)] [&>a]:mx-2 [&>a:first-child]:after:relative [&>a:first-child]:after:left-2 [&>a:first-child]:after:h-[16.9px] [&>a:first-child]:after:border-l-[0.8px] [&>a:first-child]:after:border-white [&>a:first-child]:after:content-[''] text-[13px] leading-[16.9px]">
                <a href="https://ourinvi.my.id/dwika" target="_blank" rel="noreferrer" className="flex items-center"><span className="mx-[1.625px] flex"><Icon {...ICON.globe} /></span><span className="pl-[5px] uppercase">Website</span></a>
                <a href="https://wa.me/62895806910706" target="_blank" rel="noreferrer" className="flex items-center"><span className="mx-[1.625px] flex"><Icon {...ICON.wa} /></span><span className="pl-[5px] uppercase">WhatsApp</span></a>
              </div>
            </Panel>
          </div>
        )}
      </div>

      {/* Music toggle (on live site, data-hide-cover="true": hidden on cover popup, appears bottom-left after opening) */}
      <audio ref={audioRef} src={MUSIC} loop preload="none" />
      {open && (
        <button
          type="button"
          aria-label={playing ? "Pause music" : "Play music"}
          onClick={() => {
            const a = audioRef.current;
            if (!a) return;
            if (a.paused) {
              a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
            } else {
              a.pause();
              setPlaying(false);
            }
          }}
          className="fixed bottom-5 left-5 z-50 grid size-[35px] place-items-center rounded-full bg-white/[.43] text-white shadow-md transition-transform duration-300 ease-[ease] hover:scale-110 lg:left-[calc(70vw+20px)] cursor-pointer"
        >
          {/* Same Font Awesome glyphs as the source: music while playing, pause-circle while paused */}
          <Icon d={playing ? FA_PAUSE_CIRCLE : FA_MUSIC} vb="0 0 512 512" w={15} h={15} />
        </button>
      )}
    </div>
  );
}
