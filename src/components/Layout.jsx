import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X, MessageCircle } from 'lucide-react';
import { contact, navigation } from '../data/site';
export function Wordmark() { return <span className="wordmark">GVK<span>DECOR</span><small>EST. 1959</small></span>; }
export function Enquire({ children = 'Begin a conversation', className = '' }) { return <Link className={`text-link ${className}`} to="/contact">{children}<ArrowUpRight size={17}/></Link>; }
export default function Layout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [pathname]);
  useEffect(() => { const handle = e => { if (e.key === 'Escape') setOpen(false); }; window.addEventListener('keydown', handle); return () => window.removeEventListener('keydown', handle); }, []);
  return <><a className="skip" href="#main">Skip to content</a><header><Link to="/" aria-label="GVK Decor home"><Wordmark/></Link><button className="menu-toggle" aria-expanded={open} aria-controls="navigation" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button><nav id="navigation" className={open ? 'open' : ''}>{navigation.map(([title, path]) => <NavLink key={path} to={path}>{title}</NavLink>)}<NavLink to="/contact" className="nav-contact">Let’s talk <ArrowUpRight size={14}/></NavLink></nav></header><main id="main" tabIndex={-1}><Outlet/></main><footer><div className="footer-top"><div><p className="eyebrow">A home, distinctly yours.</p><h2>Beautiful spaces begin<br/>with a conversation.</h2><Enquire>Let’s create something lasting</Enquire></div><Link to="/" aria-label="Home"><Wordmark/></Link></div><div className="footer-bottom"><span>© {new Date().getFullYear()} GVK Decor</span><span>Jubilee Hills, Hyderabad · Est. 1959</span><Link to="/contact">Visit & enquire <ArrowUpRight size={13}/></Link></div></footer><a className="whatsapp" href={contact.whatsapp ? `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent('Hello GVK Decor, I would like to enquire about bespoke furnishings.')}` : '/contact#appointment'} target={contact.whatsapp ? '_blank' : undefined} rel={contact.whatsapp ? 'noopener noreferrer' : undefined} aria-label={contact.whatsapp ? 'Enquire on WhatsApp' : 'Enquire with GVK Decor'}><MessageCircle size={21}/><span>{contact.whatsapp ? 'WhatsApp' : 'Enquire'}</span></a></>;
}
