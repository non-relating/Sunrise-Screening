import { useState, useEffect, useRef } from 'react';
import {
  Phone,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Hammer,
  Sun,
  Menu,
  X,
  Star,
  Droplets,
  Wind,
  Home,
  ArrowRight,
  MapPin,
  Mail,
  ChevronUp
} from 'lucide-react';

/* --- CONSTANTS & DATA --- */
const SERVICES = [
  {
    icon: <Hammer size={32} />,
    title: "Screen Repair",
    desc: "Quick fixes for torn panels and worn-out mesh. We match your existing setup perfectly to restore integrity."
  },
  {
    icon: <Home size={32} />,
    title: "Full Rescreens",
    desc: "Complete restoration of your pool cage. Makes your outdoor space look brand new and extends the life of your cage."
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "Pet & Specialty Mesh",
    desc: "Upgrade to 'Tuff Screen' for pets or 'No-See-Um' mesh to keep even the smallest bugs out of your oasis."
  },
  {
    icon: <Wind size={32} />,
    title: "Storm Damage",
    desc: "Fast priority response for hurricane and storm damage to secure your pool area and prevent further issues."
  },
  {
    icon: <Droplets size={32} />,
    title: "Pressure Washing",
    desc: "Deep cleaning for your pool deck and cage structure to remove algae and grime before we rescreen."
  },
  {
    icon: <CheckCircle2 size={32} />,
    title: "Frame Tune-Ups",
    desc: "We tighten bolts, replace rusted screws with stainless steel, and secure the aluminum structure."
  }
];

const REVIEWS = [
  {
    name: "James D.",
    location: "St. Petersburg, FL",
    initials: "JD",
    color: "bg-sky-100 text-sky-700",
    text: "Fast, professional, and honest. Work was flawless. The new screens look amazing and the team left the patio cleaner than they found it."
  },
  {
    name: "Sarah M.",
    location: "Pinellas Park, FL",
    initials: "SM",
    color: "bg-emerald-100 text-emerald-700",
    text: "Finally — a company that actually answers the phone! They came out the same week to fix a panel torn by the storm. Highly recommend."
  }
];

const WHY_US = [
  {
    title: "Fast Scheduling",
    desc: "We answer the phone and show up when we say we will."
  },
  {
    title: "Transparent Pricing",
    desc: "No hidden add-ons or upsells. Just honest pricing upfront."
  },
  {
    title: "Florida-Ready Materials",
    desc: "Phifer 18/14 Mesh designed to withstand UV rays and heavy winds."
  },
  {
    title: "Local Craftsmanship",
    desc: "Proudly serving St. Pete neighborhoods with integrity."
  }
];

/* --- CUSTOM HOOKS --- */
const useScrollPosition = (threshold = 20) => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrolled;
};

const useOnScreen = (options?: IntersectionObserverInit): [React.RefObject<HTMLDivElement>, boolean] => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect(); // Only trigger once
      }
    }, options);

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  return [ref, isVisible];
};

/* --- UI COMPONENTS --- */

// Animated Wrapper for Scroll Reveals
const Reveal: React.FC<React.PropsWithChildren<{ delay?: number; className?: string }>> = ({ children, delay = 0, className = "" }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  
  return (
    <div
      ref={ref as any}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
};

const Logo: React.FC<{ scrolled?: boolean }> = ({ scrolled }) => (
  <div className="flex items-center gap-3 cursor-pointer group">
    <div className="relative w-12 h-12 flex-shrink-0 transition-transform group-hover:scale-105 duration-300">
      <img src="/sunrise-logo.png" alt="Sunrise Screening" className="w-full h-full object-contain drop-shadow-md" />
    </div>
    <div className={`flex flex-col leading-tight ${scrolled ? 'text-slate-900' : 'text-white drop-shadow-md'}`}>
      <span className="font-extrabold text-2xl tracking-tight uppercase">Sunrise</span>
      <span className="text-xs font-bold tracking-widest uppercase opacity-90">Screening</span>
    </div>
  </div>
);

const SectionHeading: React.FC<{ subTitle?: string; title: string; description?: string; dark?: boolean }> = ({ subTitle, title, description, dark = false }) => (
  <div className="text-center max-w-3xl mx-auto mb-16">
    <span className={`${dark ? 'text-sky-400' : 'text-sky-600'} font-bold tracking-wider uppercase text-sm mb-3 block`}>
      {subTitle}
    </span>
    <h2 className={`${dark ? 'text-white' : 'text-slate-900'} font-extrabold text-3xl md:text-5xl mb-6`}>
      {title}
    </h2>
    <p className={`${dark ? 'text-slate-300' : 'text-slate-600'} text-lg leading-relaxed`}>
      {description}
    </p>
  </div>
);

/* --- SECTIONS --- */

const Navbar: React.FC<{ scrolled?: boolean; scrollToSection: (id: string) => void }> = ({ scrolled, scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <div onClick={() => scrollToSection('hero')}>
          <Logo scrolled={scrolled} />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {['Services', 'Why Us', 'Reviews'].map((item) => (
            <button 
              key={item}
              onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))} 
              className={`text-sm font-bold uppercase tracking-wider hover:text-amber-400 transition-colors ${scrolled ? 'text-slate-600' : 'text-white'}`}
            >
              {item}
            </button>
          ))}
          <a 
            href="tel:+17273512050" 
            className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-6 py-2.5 rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2 text-sm"
          >
            <Phone size={18} className="fill-current" />
            727-351-2050
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={toggleMenu} 
          className={`md:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-sky-900 bg-sky-50' : 'text-white bg-white/20 backdrop-blur-sm'}`}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-x-0 top-[70px] bg-white/95 backdrop-blur-xl shadow-2xl border-t border-slate-100 md:hidden flex flex-col p-6 gap-4 transition-all duration-300 ease-in-out origin-top ${isMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
        {['Services', 'Why Us', 'Reviews'].map((item) => (
          <button 
            key={item}
            onClick={() => {
              scrollToSection(item.toLowerCase().replace(' ', '-'));
              setIsMenuOpen(false);
            }} 
            className="text-left font-bold text-slate-700 p-4 hover:bg-sky-50 rounded-xl flex justify-between items-center group active:scale-[0.98] transition-transform"
          >
            {item} <ArrowRight size={16} className="text-sky-500" />
          </button>
        ))}
        <a href="tel:+17273512050" className="bg-sky-600 text-white text-center py-4 rounded-xl font-bold shadow-md active:scale-95 transition-transform mt-2">
          Call Now
        </a>
      </div>
    </nav>
  );
};

const Hero: React.FC<{ scrollToSection: (id: string) => void }> = ({ scrollToSection }) => (
  <header id="hero" className="relative min-h-[95vh] flex items-center pt-20 overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1596529847296-12c82307204f?q=80&w=2000&auto=format&fit=crop" 
        alt="Florida Pool Enclosure at Sunset" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-sky-950/95 via-sky-900/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-sky-950/90 via-transparent to-transparent" />
    </div>

    <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
      <div className="max-w-2xl text-center lg:text-left pt-10 lg:pt-0">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-sm font-bold mb-6 backdrop-blur-md shadow-lg">
            <Sun size={16} className="text-amber-400 fill-amber-400" />
            <span>The Sunshine City's Top Choice</span>
          </div>
        </Reveal>
        
        <Reveal delay={100}>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6 drop-shadow-lg">
            Pool Screen Repair <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">Done Right.</span>
          </h1>
        </Reveal>
        
        <Reveal delay={200}>
          <p className="text-lg lg:text-xl text-sky-100 mb-8 leading-relaxed font-medium drop-shadow max-w-lg mx-auto lg:mx-0">
            St. Petersburg’s trusted specialists for screen repair & full replacements. We use storm-ready materials built for Florida weather.
          </p>
        </Reveal>
        
        <Reveal delay={300}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button 
              onClick={() => scrollToSection('contact')} 
              className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-amber-900/20 hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              Get a Free Quote <ArrowRight size={20} />
            </button>
            <a 
              href="tel:+17273512050" 
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 hover:border-white/50"
            >
              <Phone size={20} />
              727-351-2050
            </a>
          </div>
        </Reveal>

        <Reveal delay={400}>
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-4 text-white/90 text-sm font-semibold">
            <div className="flex items-center gap-2">
              <ShieldCheck size={20} className="text-emerald-400" /> 
              <span>Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={20} className="text-rose-400" /> 
              <span>Locally Owned</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={20} className="text-sky-400" /> 
              <span>Fast Turnaround</span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Hero Visual Card */}
      <div className="hidden lg:block relative animate-float">
         <Reveal delay={500}>
           <div className="absolute -inset-4 bg-sky-500/30 blur-2xl rounded-full opacity-40"></div>
           <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl max-w-md ml-auto transform transition-transform hover:scale-[1.02]">
              <div className="flex items-center gap-4 mb-6">
                 <div className="bg-green-500 p-3 rounded-full text-white shadow-lg">
                    <CheckCircle2 size={32} />
                 </div>
                 <div>
                    <h3 className="text-white font-bold text-xl">Job Completed</h3>
                    <p className="text-sky-200 text-sm">Yesterday in Snell Isle</p>
                 </div>
              </div>
              <div className="space-y-4">
                 <div className="h-2 bg-white/20 rounded-full w-full overflow-hidden">
                    <div className="h-full bg-green-400 w-full animate-pulse"></div>
                 </div>
                 <div className="flex justify-between text-white/80 text-sm">
                    <span>Full Rescreen</span>
                    <span>100% Satisfaction</span>
                 </div>
              </div>
           </div>
         </Reveal>
      </div>
    </div>
  </header>
);

const Services = () => (
  <section id="services" className="py-24 bg-white relative">
    <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-slate-50 to-white"></div>
    <div className="container mx-auto px-4 relative">
      <Reveal>
        <SectionHeading 
          subTitle="Our Expertise"
          title="Expert Pool Screen Repair"
          description="Whether you have a torn panel, sagging enclosure, or a full rescreening project, we deliver professional results that last."
        />
      </Reveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES.map((service, idx) => (
          <Reveal key={idx} delay={idx * 100}>
            <div className="group h-full bg-slate-50 rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-sky-600 group-hover:text-white transition-colors shadow-sm">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-sky-600 transition-colors">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed">{service.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={400}>
        <div className="mt-16 text-center">
           <div className="inline-block bg-sky-50 text-sky-800 px-6 py-3 rounded-full font-medium border border-sky-100">
              <span className="font-bold">Coming Soon:</span> Weekly Pool Cleaning & Water Treatment Services
           </div>
        </div>
      </Reveal>
    </div>
  </section>
);

const WhyUs = () => (
  <section id="why-us" className="py-24 bg-slate-900 text-white relative overflow-hidden">
    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl"></div>
    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl"></div>

    <div className="container mx-auto px-4 relative z-10">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2">
           <Reveal>
             <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-sky-500 to-amber-500 rounded-2xl opacity-30 blur-lg group-hover:opacity-50 transition-opacity duration-500"></div>
                <img 
                  src="/sunrise-logo.png" 
                  alt="Sunrise Screening logo" 
                  className="relative rounded-2xl shadow-2xl border border-white/10 w-full max-w-[420px] mx-auto object-contain"
                />
                <div className="absolute -bottom-6 -right-6 bg-white text-slate-900 p-6 rounded-2xl shadow-xl hidden md:block animate-bounce-slow">
                   <div className="text-4xl font-extrabold text-sky-600">500+</div>
                   <div className="text-sm font-bold text-slate-500">Projects Completed</div>
                </div>
             </div>
           </Reveal>
        </div>

        <div className="lg:w-1/2 space-y-8">
          <Reveal delay={200}>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Why St. Petersburg Homeowners <span className="text-sky-400">Trust Sunrise</span>
            </h2>
            <p className="text-slate-300 text-lg">
               We know it's hard to find contractors who show up. That's why we built our business on a simple promise: <strong className="text-white">Reliability.</strong>
            </p>
          </Reveal>

          <div className="space-y-6">
            {WHY_US.map((item, idx) => (
              <Reveal key={idx} delay={300 + (idx * 100)}>
                <div className="flex gap-5 items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-slate-900 shadow-lg">
                      <CheckCircle2 size={18} strokeWidth={3} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-1">{item.title}</h4>
                    <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Reviews = () => (
  <section id="reviews" className="py-24 bg-sky-50">
    <div className="container mx-auto px-4 text-center">
      <Reveal>
        <SectionHeading 
          subTitle="Testimonials"
          title="What Your Neighbors Say"
          description=""
        />
      </Reveal>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto -mt-8">
        {REVIEWS.map((review, idx) => (
          <Reveal key={idx} delay={idx * 200}>
            <div className="h-full bg-white p-10 rounded-3xl shadow-lg border border-slate-100 text-left relative hover:shadow-xl transition-shadow">
              <div className="absolute top-10 right-10 opacity-10 text-sky-900">
                 <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.896 14.789 15.93 15.795 15.694C16.592 15.507 17.185 14.793 17.185 13.931L17.185 13.902C17.185 13.567 17.078 13.251 16.897 12.991C16.894 12.986 16.891 12.981 16.888 12.977C16.885 12.972 16.882 12.967 16.879 12.962C16.326 12.164 16 11.205 16 10.166C16 7.306 18.324 5 21.185 5L22 5L22 13.185C22 17.501 18.413 21 14.017 21ZM5 21L5 18C5 16.896 5.772 15.93 6.778 15.694C7.575 15.507 8.168 14.793 8.168 13.931L8.168 13.902C8.168 13.567 8.061 13.251 7.88 12.991C7.877 12.986 7.874 12.981 7.871 12.977C7.868 12.972 7.865 12.967 7.862 12.962C7.309 12.164 6.983 11.205 6.983 10.166C6.983 7.306 9.307 5 12.168 5L12.983 5L12.983 13.185C12.983 17.501 9.396 21 5 21Z" /></svg>
              </div>
              <div className="flex text-amber-400 mb-6 gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={20} />)}
              </div>
              <p className="text-slate-700 text-lg italic mb-8 leading-relaxed">"{review.text}"</p>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl ${review.color}`}>
                  {review.initials}
                </div>
                <div>
                  <div className="font-bold text-slate-900">{review.name}</div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-wide">{review.location}</div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('I have a torn screen');
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const validate = () => {
    const next: { name?: string; phone?: string } = {};
    if (!name.trim()) next.name = 'Please enter your name.';
    // basic phone validation: digits length 10
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) next.phone = 'Please enter a valid phone number.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setFormState('submitting');
    // Simulate API call
    setTimeout(() => setFormState('success'), 1500);
  };

  return (
    <section id="contact" className="py-24 bg-sky-950 text-white relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <Reveal>
          <div className="max-w-4xl mx-auto bg-sky-900/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-sky-700 shadow-2xl">
            {formState === 'success' ? (
              <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <CheckCircle2 size={40} className="text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Message Received!</h3>
                <p className="text-sky-200 text-lg">Thanks for reaching out. We'll call you shortly to schedule your estimate.</p>
                <button onClick={() => setFormState('idle')} className="mt-8 text-amber-400 underline hover:text-amber-300 font-medium">Send another message</button>
              </div>
            ) : (
              <>
                <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready for a Bug-Free Patio?</h2>
                  <p className="text-sky-200 text-lg">Get your enclosure looking brand new — without the hassle.</p>
                </div>
                
                <form className="space-y-6 max-w-lg mx-auto" onSubmit={handleSubmit} noValidate>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="contact-name" className="block text-sm font-bold mb-2 text-sky-200 uppercase tracking-wide">Name</label>
                        <input id="contact-name" name="name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'error-name' : undefined} required type="text" className="w-full px-5 py-4 rounded-xl bg-sky-950/50 border border-sky-700 text-white placeholder-sky-500/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all" placeholder="John Doe" />
                        {errors.name && <div id="error-name" role="alert" className="mt-2 text-rose-300 text-sm">{errors.name}</div>}
                    </div>
                    <div>
                        <label htmlFor="contact-phone" className="block text-sm font-bold mb-2 text-sky-200 uppercase tracking-wide">Phone</label>
                        <input id="contact-phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'error-phone' : undefined} required type="tel" inputMode="tel" className="w-full px-5 py-4 rounded-xl bg-sky-950/50 border border-sky-700 text-white placeholder-sky-500/50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all" placeholder="(555) 555-5555" />
                        {errors.phone && <div id="error-phone" role="alert" className="mt-2 text-rose-300 text-sm">{errors.phone}</div>}
                    </div>
                  </div>
                  <div>
                      <label htmlFor="contact-service" className="block text-sm font-bold mb-2 text-sky-200 uppercase tracking-wide">How can we help?</label>
                      <select id="contact-service" name="service" value={service} onChange={(e) => setService(e.target.value)} className="w-full px-5 py-4 rounded-xl bg-sky-950/50 border border-sky-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all appearance-none">
                        <option>I have a torn screen</option>
                        <option>I need a full rescreen</option>
                        <option>Storm damage repair</option>
                        <option>Just asking for a quote</option>
                      </select>
                  </div>
                  <button 
                    type="submit" 
                    disabled={formState === 'submitting'}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-900 font-bold py-5 rounded-xl shadow-lg transition-transform hover:-translate-y-1 text-lg disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                  >
                    {formState === 'submitting' ? 'Sending...' : 'Request Free Quote'}
                    {formState !== 'submitting' && <ArrowRight size={20} />}
                  </button>
                </form>
              </>
            )}
            
            <div className="mt-10 pt-8 border-t border-sky-800 flex flex-col md:flex-row items-center justify-center gap-8 text-sky-300">
              <div className="flex items-center gap-3">
                <div className="bg-sky-800 p-2 rounded-full"><Phone size={18} className="text-amber-400" /></div>
                    <span className="font-semibold text-white">727-351-2050</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-sky-800 p-2 rounded-full"><Mail size={18} className="text-amber-400" /></div>
                <span className="font-semibold text-white">info@sunrisescreening.com</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* --- MAIN APP COMPONENT --- */

const App = () => {
  const scrolled = useScrollPosition();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="font-sans text-slate-800 bg-slate-50 min-h-screen flex flex-col selection:bg-sky-200 selection:text-sky-900">
      
      <Navbar scrolled={scrolled} scrollToSection={scrollToSection} />
      
      <main>
        <Hero scrollToSection={scrollToSection} />
        <Services />
        <WhyUs />
        <Reviews />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="bg-sky-950 text-sky-400 py-12 border-t border-sky-900 pb-28 md:pb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
               <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                  <span className="font-extrabold text-white text-xl uppercase tracking-tight">Sunrise</span>
                  <span className="text-sky-500 font-bold text-xs uppercase bg-sky-900 px-2 py-1 rounded">Screening</span>
               </div>
               <p className="text-sm opacity-80 max-w-xs">Licensed & Insured in Pinellas County. Making Florida backyards beautiful since 2010.</p>
            </div>
            
            <div className="flex gap-8 text-sm font-bold">
              <button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">Services</button>
              <button onClick={() => scrollToSection('why-us')} className="hover:text-white transition-colors">Why Us</button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">Contact</button>
            </div>
            
            <div className="text-sm opacity-50">
              © {new Date().getFullYear()} Sunrise Screening.
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button (Desktop) */}
      <button 
        onClick={scrollToTop}
        className={`hidden md:flex fixed bottom-8 right-8 bg-white text-sky-600 p-3 rounded-full shadow-lg border border-slate-100 transition-all duration-300 z-40 hover:bg-sky-50 ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        aria-label="Back to Top"
      >
        <ChevronUp size={24} />
      </button>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 md:hidden z-50 flex gap-4 shadow-[0_-8px_30px_rgba(0,0,0,0.12)]">
        <button onClick={() => scrollToSection('contact')} className="flex-1 bg-sky-600 active:bg-sky-700 text-white font-bold py-3.5 rounded-xl text-sm shadow-sm transition-colors">
          Get Quote
        </button>
        <a href="tel:+17273512050" className="flex-1 bg-amber-500 active:bg-amber-600 text-slate-900 font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-sm transition-colors">
          <Phone size={18} /> 727-351-2050
        </a>
      </div>

    </div>
  );
};

export default App;