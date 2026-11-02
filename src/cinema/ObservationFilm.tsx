import { useCallback, useRef, useState } from 'react';
import { Film } from '../components/Film';

const beats = [
  ['Değişimin içinde.','Hasat, tarlanın görünümünü değiştirir. Gördüğümüz farkı anlamak için önce ne olduğuna bakarız.'],
  ['İzi takip et.','İşlenen ve henüz işlenmeyen yüzeyler aynı arazide farklı görünür. Görsel fark, tek başına nedenin açıklaması değildir.'],
  ['Bütünü yeniden gör.','Parseli; çevresi, dönemi ve saha bilgisiyle birlikte okumak değerlendirmeyi güçlendirir.'],
];
const chapters = ['İşlem','İz','Bağlam'];

export function ObservationFilm({base}:{base:string}) {
  const host = useRef<HTMLElement>(null);
  const [beat,setBeat] = useState(0);
  const [canSeek,setCanSeek] = useState(false);
  const progress = useCallback((time:number,duration:number) => {
    if (!Number.isFinite(duration) || duration<=0) return;
    setCanSeek(true);
    setBeat(Math.min(2,Math.floor(time/duration*3)));
  },[]);
  return <figure ref={host} className="observation-film">
    <div className="observation-film-stage">
      <Film base={base} name="observation/harvest" loop={false} onProgress={progress}
        alt="Iowa’da gerçek hasat: hareket eden biçerdöver, işlenen yüzey ve çevredeki tarım arazileri. Uydu analizi değildir."/>
      <div className="observation-film-shade"/>
      <div className="observation-film-copy" aria-live="polite">
        <span>0{beat+1} / GÖZLEMDEN BAĞLAMA</span>
        <h3>{beats[beat][0]}</h3><p>{beats[beat][1]}</p>
      </div>
      <div className="observation-timeline" role="group" aria-label="Film bölümünü seç">
        {chapters.map((chapter,i)=><button key={chapter} type="button" disabled={!canSeek}
          aria-pressed={beat===i} onClick={()=>{
            const video=host.current?.querySelector('video');
            if (video && Number.isFinite(video.duration)) video.currentTime=video.duration*i/3+.05;
          }}><span>0{i+1}</span>{chapter}</button>)}
      </div>
    </div>
    <figcaption><span>İŞLEM / İZ / BAĞLAM</span><span>Iowa, 2016 · MrAyrit · <a href="https://commons.wikimedia.org/wiki/File:Drone_Footage_Of_Iowa_Combine_Harvesting_Beans.webm" target="_blank" rel="noreferrer">Çekim kaynağı</a> · <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noreferrer">CC BY 3.0</a> · Kurgu ve renk düzenlemesi. AgroMax verisi değildir.</span></figcaption>
    <details className="observation-transcript"><summary>Filmin anlatısını oku</summary>
      {beats.map(([title,text])=><p key={title}><strong>{title}</strong> {text}</p>)}
    </details>
  </figure>;
}
