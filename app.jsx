// VOW Fitness — conversion-focused single-page (visually polished)
const { useState, useEffect } = React;

/* ========== Monogram ========== */
function Monogram({ size = 64, className = "" }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="mg-grad" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#B8902F" />
          <stop offset="50%" stopColor="#E2C97E" />
          <stop offset="100%" stopColor="#C9A84C" />
        </linearGradient>
      </defs>
      <path d="M40 4 L76 40 L40 76 L4 40 Z" stroke="url(#mg-grad)" strokeWidth="1" fill="none" opacity="0.55" />
      <path d="M16 22 L40 60 L64 22" stroke="url(#mg-grad)" strokeWidth="1.5" fill="none" />
      <path d="M22 30 L32 50 L40 36 L48 50 L58 30" stroke="url(#mg-grad)" strokeWidth="1.2" fill="none" opacity="0.85" />
      <circle cx="40" cy="40" r="1.5" fill="#E2C97E" />
    </svg>
  );
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const fallback = setTimeout(() => { els.forEach(el => el.classList.add('in')); }, 1200);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });
    els.forEach((el) => io.observe(el));
    return () => { io.disconnect(); clearTimeout(fallback); };
  }, []);
}

/* ========== Eyebrow (gold line + uppercase label) ========== */
function Eyebrow({ children, center = false }) {
  return <span className={`eyebrow ${center ? 'center' : ''}`}>{children}</span>;
}

/* ========== Nav ========== */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = [['How It Works','#how'],['Services','#services'],['Stories','#stories']];
  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#hero" className="nav-mark">
        <Monogram size={26} className="mono-svg" />
        <span className="wordmark">VOW</span>
      </a>
      <nav className="nav-links">
        {links.map(([l,h])=>(<a key={h} href={h}>{l}</a>))}
        <a href="#book" className="btn nav-cta">Book Your Free Call <span className="arrow">↗</span></a>
      </nav>
      <button className="nav-toggle" aria-label="Menu" onClick={() => setOpen(!open)}>
        <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
          <path d="M0 1 H22 M0 7 H14 M0 13 H22" stroke="currentColor" strokeWidth="1" />
        </svg>
      </button>
      {open && (
        <div className="nav-mobile">
          {[...links, ['Book Your Free Call','#book']].map(([l,h])=>(
            <a key={h} href={h} onClick={()=>setOpen(false)}>{l}</a>
          ))}
        </div>
      )}
    </header>
  );
}

/* ========== HERO ========== */
function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg" />
      <div className="hero-inner">
        <Monogram size={120} className="hero-monogram reveal" />
        <h1 className="hero-headline reveal delay-1">
          We help driven women <em>over 40</em> finally <span className="gold-text">transform their body</span>, for good.
        </h1>
        <ul className="hero-desires reveal delay-2">
          <li>Reclaim your energy</li>
          <li>Build a body you're proud of</li>
          <li>Feel like yourself again</li>
        </ul>
        <div className="hero-cta-row reveal delay-3">
          <a href="#book" className="btn">Book Your Free Call <span className="arrow">↗</span></a>
          <span className="hero-fineprint">A 30 minute conversation. No pitch.</span>
        </div>
        <span className="hero-tagline-mini reveal delay-3">Discipline is the luxury.</span>
      </div>
      <div className="hero-scroll" aria-hidden="true">
        <span>Scroll</span>
        <span className="line"></span>
      </div>
    </section>
  );
}

/* ========== SHE FEELS THIS — two cards side by side ========== */
function Feels() {
  return (
    <section className="feels" id="feels">
      <div className="container">
        <div className="feels-grid">
          <article className="feels-card want reveal">
            <Eyebrow>You Want To</Eyebrow>
            <h3>You want to feel like <em>yourself</em> again.</h3>
            <ul className="feels-list">
              <li><span className="dot"></span><span>Have more energy. For work, for family, for you.</span></li>
              <li><span className="dot"></span><span>A body that matches your drive.</span></li>
              <li><span className="dot"></span><span>Consistency that actually lasts this time.</span></li>
            </ul>
          </article>
          <article className="feels-card struggle reveal delay-1">
            <Eyebrow>But You're Struggling With</Eyebrow>
            <h3>The plans you've tried <em>aren't built for your life.</em></h3>
            <ul className="feels-list">
              <li><span className="dot ash"></span><span>No time for programs that don't fit your week.</span></li>
              <li><span className="dot ash"></span><span>You've tried everything, and nothing has stuck.</span></li>
              <li><span className="dot ash"></span><span>You don't know where to start, or who to trust.</span></li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ========== BRIDGE ========== */
function Bridge() {
  return (
    <section className="bridge">
      <div className="bridge-inner">
        <div className="bridge-rule reveal" />
        <h2 className="reveal delay-1">
          That's exactly why <span className="gold-text"><em>VOW</em></span> exists.
        </h2>
        <p className="reveal delay-2">
          You don't need another app, another challenge, or another trainer with a one size plan. You need a coach who builds the work around you, and stays with you until the woman in the mirror is the one you've been picturing.
        </p>
      </div>
    </section>
  );
}

/* ========== HOW IT WORKS — 3 columns ========== */
function How() {
  const steps = [
    {
      n: "01",
      icon: (
        <svg viewBox="0 0 48 48" width="42" height="42" fill="none" stroke="currentColor" strokeWidth="1.2">
          <rect x="6" y="9" width="36" height="32" />
          <path d="M6 17 H42" />
          <path d="M16 5 V13 M32 5 V13" strokeLinecap="square" />
          <circle cx="24" cy="28" r="4" />
        </svg>
      ),
      title: <>Book a <em>Free Call</em></>,
      body: "Tell Anthony where you are, and where you want to go. Thirty minutes. No pitch, just a real conversation."
    },
    {
      n: "02",
      icon: (
        <svg viewBox="0 0 48 48" width="42" height="42" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M10 6 H30 L40 16 V42 H10 Z" />
          <path d="M30 6 V16 H40" />
          <path d="M16 22 H32 M16 28 H32 M16 34 H26" strokeLinecap="square" />
        </svg>
      ),
      title: <>Get <em>Your Plan</em></>,
      body: "A program built around your life, your body, your hormones, your goals. Specific. Measurable. Yours."
    },
    {
      n: "03",
      icon: (
        <svg viewBox="0 0 48 48" width="42" height="42" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M6 38 L18 26 L26 34 L42 16" strokeLinecap="square" />
          <path d="M32 16 H42 V26" strokeLinecap="square" />
        </svg>
      ),
      title: <>See <em>Real Results</em></>,
      body: "Show up, follow the plan, transform. You'll feel it in week three. You'll see it in week six. It will hold for the next forty years."
    },
  ];
  return (
    <section className="how" id="how">
      <div className="container">
        <div className="section-head-center reveal">
          <Eyebrow>How It Works</Eyebrow>
          <h2>Three steps to <em>the body you're after.</em></h2>
        </div>
        <div className="how-steps">
          {steps.map((s, i) => (
            <div className={`how-step reveal delay-${i+1}`} key={i}>
              <div className="step-num">{s.n}</div>
              <div className="step-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
        <div className="how-cta reveal">
          <a href="#book" className="btn">Book Your Free Call <span className="arrow">↗</span></a>
        </div>
      </div>
    </section>
  );
}

/* ========== SERVICES ========== */
function Services() {
  const cards = [
    {
      tag: "Service 01",
      outcome: <>A plan built around <em>your life.</em></>,
      name: "1-on-1 Personal Training",
      desc: "Private sessions in studio, two or three times a week. Strength, mobility, and recovery, written for the body you have today and the one you want next quarter.",
      meta: "Manhattan",
      price: "from $980 / wk",
    },
    {
      tag: "Service 02",
      outcome: <>Your training, on <em>your runway.</em></>,
      name: "Online Coaching",
      desc: "Bespoke remote programming with weekly video reviews and daily check ins. The work travels with you instead of waiting on you.",
      meta: "Worldwide",
      price: "from $1,400 / mo",
    },
    {
      tag: "Service 03",
      outcome: <>Your kitchen, finally on <em>your side.</em></>,
      name: "Nutrition Coaching",
      desc: "Built around how you actually eat. Your dinners, your travel, your hormones, your wine. Protocols, not diets. A literate plan you can follow without thinking.",
      meta: "Standalone or Paired",
      price: "from $640 / mo",
    },
  ];
  return (
    <section className="services" id="services">
      <div className="container">
        <div className="section-head-center reveal">
          <Eyebrow>Choose Your Path</Eyebrow>
          <h2>Three ways to begin <em>the work.</em></h2>
        </div>
        <div className="services-grid">
          {cards.map((c, i) => (
            <article className={`service-card reveal delay-${i+1}`} key={i}>
              <span className="s-tag">{c.tag}</span>
              <h3 className="s-outcome">{c.outcome}</h3>
              <span className="s-name">{c.name}</span>
              <p className="s-desc">{c.desc}</p>
              <div className="s-foot">
                <span>{c.meta}</span>
                <span className="price">{c.price}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========== TESTIMONIALS ========== */
function Stories() {
  const items = [
    {
      quote: <>"In twenty six weeks I dropped four percent body fat and gained the kind of poise you can't fake in a deposition. Anthony coaches <em>the woman</em>, not the workout."</>,
      name: "Mara A.",
      result: "−4% body fat · 26 wks",
    },
    {
      quote: <>"I came in skeptical and overscheduled. I leave every session with a plan I trust, and the only standing appointment I now keep <em>religiously</em>."</>,
      name: "Diane K.",
      result: "Stronger at 49 than 39",
    },
    {
      quote: <>"At 52 I am stronger than I was at 32. Measurably. The protocols are exquisite. The accountability is the most luxurious thing on my <em>calendar</em>."</>,
      name: "Renée S.",
      result: "+18 lbs deadlift · 1 yr",
    },
  ];
  return (
    <section className="testimonials" id="stories">
      <div className="container">
        <div className="section-head-center reveal">
          <Eyebrow>From Women Like You</Eyebrow>
          <h2>What they say <em>once they've stayed.</em></h2>
        </div>
        <div className="t-grid">
          {items.map((t, i) => (
            <article className={`t-card reveal delay-${i+1}`} key={i}>
              <div className="t-mark">"</div>
              <p className="t-quote">{t.quote}</p>
              <div className="t-meta">
                <span className="t-name">— {t.name}</span>
                <span className="t-result">{t.result}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========== FINAL CTA ========== */
function Final() {
  return (
    <section className="final" id="book">
      <div className="final-inner">
        <Eyebrow center>Your Move</Eyebrow>
        <h2 className="reveal delay-1">
          You've waited <span className="gold-text">long enough.</span>
        </h2>
        <p className="final-sub reveal delay-2">
          Your first call is free. Your results are <em>permanent.</em>
        </p>
        <div className="reveal delay-3" style={{marginTop:14}}>
          <a href="#" className="btn" onClick={(e)=>e.preventDefault()}>Book Your Free Call <span className="arrow">↗</span></a>
        </div>
        <span className="final-fineprint reveal delay-3">12 women · By Invitation · Manhattan & Remote</span>
      </div>
    </section>
  );
}

/* ========== FOOTER ========== */
function Foot() {
  return (
    <footer className="foot">
      <div className="container">
        <div className="foot-row">
          <div className="foot-mark">
            <Monogram size={28} />
            <span className="name">VOW</span>
            <span className="tag">Vision · Ownership · Wellness</span>
          </div>
          <div className="foot-links">
            <a href="#how">How It Works</a>
            <a href="#services">Services</a>
            <a href="#stories">Stories</a>
            <a href="#book">Book</a>
          </div>
          <small>© MMXXVI VOW Fitness</small>
        </div>
      </div>
    </footer>
  );
}

function App() {
  useReveal();
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Feels />
        <Bridge />
        <How />
        <Services />
        <Stories />
        <Final />
      </main>
      <Foot />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
