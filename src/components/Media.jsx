import { useState } from 'react';
export default function Media({ item, className = '', label = 'Textile study · photography to follow' }) {
  const [failed, setFailed] = useState(false);
  return <div className={`media ${item.tone || 'weave'} ${className}`}>
    {!failed && item.video ? <video controls playsInline preload="metadata" poster={item.poster || undefined} aria-label={item.alt || 'GVK Decor film'} onError={() => setFailed(true)}><source src={item.video}/><track kind="captions" src={item.captions} srcLang="en" label="English"/></video> : !failed && item.image ? <img src={item.image} alt={item.alt} loading="lazy" onError={() => setFailed(true)}/> : <><div className="textile" aria-hidden="true"/><span className="media-label">{failed ? 'Media unavailable' : label}</span></>}
  </div>;
}
