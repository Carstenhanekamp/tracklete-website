import React, { useEffect, useRef, useState } from 'react';
import './_group.css';
import { Check, ArrowRight, Menu } from 'lucide-react';

// Font override injection — used by variant wrappers
const _fontStyle = (css: string) => css ? <style dangerouslySetInnerHTML={{ __html: css }} /> : null;

// ── CTL / ATL / TSB / ACWR data ──────────────────────────────────────────────
// CTL = 42-day EMA (chronic fitness), ATL = 7-day EMA (acute fatigue)
// TSB = CTL − ATL  (form/freshness), ACWR = ATL / CTL  (workload ratio)
const _kCTL = 1 - Math.exp(-1 / 42);
const _kATL = 1 - Math.exp(-1 / 7);
// 12-week progressive rowing block: [Mon, Tue, Wed, Thu, Fri, Sat, Sun] TSS
const _plan: number[][] = [
  [0, 95, 55, 130, 85, 150, 45],    // wk 1 – base build
  [0, 100, 60, 140, 90, 155, 50],   // wk 2
  [0, 105, 65, 145, 95, 160, 50],   // wk 3
  [0, 60, 40, 80, 55, 90, 30],      // wk 4 – recovery
  [0, 110, 65, 150, 100, 165, 55],  // wk 5 – higher build
  [0, 115, 70, 155, 100, 170, 55],  // wk 6
  [0, 115, 70, 158, 100, 170, 55],  // wk 7
  [0, 65, 40, 85, 55, 95, 30],      // wk 8 – recovery
  [0, 110, 70, 155, 100, 168, 55],  // wk 9 – race prep
  [0, 115, 70, 160, 100, 168, 55],  // wk 10
  [0, 100, 60, 140, 90, 155, 50],   // wk 11 – sharpen
  [0, 70, 45, 95, 60, 100, 35],     // wk 12 – taper
];
type FDay = { ctl: number; atl: number; tsb: number; acwr: number };
const fitData: FDay[] = (() => {
  let ctl = 45, atl = 45;
  return _plan.flatMap(week =>
    week.map(tss => {
      ctl += (tss - ctl) * _kCTL;
      atl += (tss - atl) * _kATL;
      return { ctl, atl, tsb: ctl - atl, acwr: ctl > 0 ? atl / ctl : 1 };
    })
  );
})();

// Catmull-Rom spline → SVG cubic bezier path (smooth curves)
function crPath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return '';
  let d = `M${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)], p1 = pts[i];
    const p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1x = p1.x + (p2.x - p0.x) / 6, c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6, c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
  }
  return d;
}

// SVG chart geometry: plot area x 42–690, y 10–167; labels at x < 42 or inside
const _CL = 42, _CR = 690, _CT = 10, _CB = 167, _CW = 648, _CH = 157;
const _dx    = (i: number) => _CL + (i / (fitData.length - 1)) * _CW;
const _fitY  = (v: number) => _CB - ((v - 15) / 85) * _CH;   // range 15–100 (ATL peaks ~93)
const _tsbY  = (v: number) => _CB - ((v + 40) / 70) * _CH;   // range –40 to +30 (TSB bottoms ~–33)
const _acwrY = (v: number) => _CB - (v / 2.0) * _CH;           // range 0–2.0

const _ctlPath  = crPath(fitData.map((d, i) => ({ x: _dx(i), y: _fitY(d.ctl) })));
const _atlPath  = crPath(fitData.map((d, i) => ({ x: _dx(i), y: _fitY(d.atl) })));
const _tsbPath  = crPath(fitData.map((d, i) => ({ x: _dx(i), y: _tsbY(d.tsb) })));
const _acwrPath = crPath(fitData.map((d, i) => ({ x: _dx(i), y: _acwrY(d.acwr) })));
const _ctlFill  = _ctlPath + ` L${_dx(fitData.length - 1).toFixed(1)},${_CB} L${_dx(0).toFixed(1)},${_CB} Z`;

const _startMs = new Date(2026, 2, 9).getTime();
const _mos = ['jan','feb','mrt','apr','mei','jun','jul','aug','sep','okt','nov','dec'];
const _dayLabel = (i: number) => { const d = new Date(_startMs + i * 86400000); return `${d.getDate()} ${_mos[d.getMonth()]}`; };
const _xDates = ['9 mrt','23 mrt','6 apr','20 apr','4 mei','18 mei','1 jun'];

export function Homepage({ fontOverride }: { fontOverride?: string } = {}) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [fitIdx, setFitIdx] = useState<number | null>(null);

  const onFitMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const svgX = (e.clientX - r.left) * (760 / r.width);
    const raw = Math.round(((svgX - _CL) / _CW) * (fitData.length - 1));
    setFitIdx(Math.max(0, Math.min(fitData.length - 1, raw)));
  };
  const onFitLeave = () => setFitIdx(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Skip elements already in the viewport on load (hero content)
    document.querySelectorAll('.reveal-hidden').forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        (el as HTMLElement).classList.add('reveal-visible');
      } else {
        observerRef.current?.observe(el);
      }
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="font-body bg-tracklete-offwhite text-tracklete-body min-h-screen overflow-x-hidden">
      {fontOverride ? _fontStyle(fontOverride) : null}
      {/* Navigation */}
      <nav
        className="fixed top-0 w-full z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(15, 26, 28, 0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <a href="#">
              <img
                src="/__mockup/images/tracklete-logo.png"
                alt="Tracklete"
                className="h-9 w-auto"
              />
            </a>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: 'rgba(255,255,255,0.75)' }}>
              <a href="#" className="hover:text-white transition-colors">Features</a>
              <a href="#" className="hover:text-white transition-colors">Pricing</a>
              <a href="#" className="hover:text-white transition-colors">Blog</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Log in
            </a>
            <a href="#" className="bg-tracklete-accent text-white px-5 py-2.5 rounded-sm text-sm font-medium hover:bg-tracklete-accent-strong transition-colors shadow-sm">
              Book a Demo
            </a>
          </div>
          <button className="md:hidden text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative pt-0 h-[90vh] min-h-[700px] flex items-center bg-tracklete-dark">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="/__mockup/images/rowing-four-reflection.jpg" 
            alt="Four-person crew on a mirror-calm river" 
            className="w-full h-full object-cover"
            style={{ opacity: 0.75 }}
          />
          {/* Strong left-side gradient so text is always readable */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to right, rgba(15,26,28,0.85) 0%, rgba(15,26,28,0.55) 55%, rgba(15,26,28,0.15) 100%)'
          }} />
          {/* Bottom vignette */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to top, rgba(15,26,28,0.7) 0%, transparent 50%)'
          }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full mt-20">
          <div className="max-w-3xl reveal-hidden">
            <h1 className="font-display text-5xl md:text-7xl text-white font-medium leading-[1.1] mb-8">
              One performance platform for every seat in the boat.
            </h1>
            <p className="text-xl text-white/80 mb-10 max-w-2xl leading-relaxed">
              Training plans, attendance, athlete readiness, and full club oversight in one clear command center for athletes, coaches, and federations.
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-16">
              <a href="#" className="bg-tracklete-accent text-white px-8 py-4 rounded-sm text-base font-medium hover:bg-tracklete-accent-strong transition-colors shadow-sm inline-flex items-center gap-2">
                Book a Demo <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#" className="px-8 py-4 rounded-sm text-base font-medium text-white bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm">
                Log in
              </a>
            </div>
            
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
              <div>
                <div className="text-3xl font-display text-white mb-1">40+</div>
                <div className="text-sm text-white/60 uppercase tracking-wider font-semibold">Clubs</div>
              </div>
              <div>
                <div className="text-3xl font-display text-white mb-1">500+</div>
                <div className="text-sm text-white/60 uppercase tracking-wider font-semibold">Athletes</div>
              </div>
              <div>
                <div className="text-3xl font-display text-white mb-1">4</div>
                <div className="text-sm text-white/60 uppercase tracking-wider font-semibold">National Programmes</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Trusted By */}
      <section className="bg-tracklete-offwhite border-b border-tracklete-soft py-12 bg-grid">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 opacity-60">
          <span className="font-display text-xl uppercase tracking-widest text-tracklete-body font-bold">W.S.R. Argo</span>
          <span className="font-display text-xl uppercase tracking-widest text-tracklete-body font-bold">Nereus</span>
          <span className="font-display text-xl uppercase tracking-widest text-tracklete-body font-bold">Aegir</span>
          <span className="font-display text-xl uppercase tracking-widest text-tracklete-body font-bold">Skadi</span>
        </div>
      </section>

      {/* Audience Section */}
      <section className="py-24 bg-tracklete-offwhite">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="reveal-hidden">
              <div className="aspect-[4/5] mb-6 overflow-hidden bg-tracklete-panel shadow-sm">
                <img src="/__mockup/images/athlete-carrying-scull.jpg" alt="Athlete carrying scull" className="w-full h-full object-cover" />
              </div>
              <div className="text-sm text-tracklete-accent font-semibold uppercase tracking-wider mb-2">For Athletes</div>
              <h3 className="font-display text-2xl text-tracklete-accent-strong">Track your training, own your progress.</h3>
            </div>
            
            <div className="reveal-hidden stagger-1">
              <div className="aspect-[4/5] mb-6 overflow-hidden bg-tracklete-panel shadow-sm">
                <img src="/__mockup/images/coach-megaphone.jpg" alt="Coach with megaphone" className="w-full h-full object-cover" />
              </div>
              <div className="text-sm text-tracklete-accent font-semibold uppercase tracking-wider mb-2">For Coaches</div>
              <h3 className="font-display text-2xl text-tracklete-accent-strong">See the whole crew in one view.</h3>
            </div>
            
            <div className="reveal-hidden stagger-2">
              <div className="aspect-[4/5] mb-6 overflow-hidden bg-tracklete-panel shadow-sm">
                <img src="/__mockup/images/coaching-motorboat.jpg" alt="Coach in motorboat" className="w-full h-full object-cover" />
              </div>
              <div className="text-sm text-tracklete-accent font-semibold uppercase tracking-wider mb-2">For Clubs</div>
              <h3 className="font-display text-2xl text-tracklete-accent-strong">Run your entire programme from one platform.</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Product Story: Planning & Attendance */}
      <section className="py-32 bg-tracklete-offwhite relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-hidden">
              <div className="inline-block px-3 py-1 bg-tracklete-accent-soft text-tracklete-accent font-semibold text-xs uppercase tracking-widest mb-6">Planning & Attendance</div>
              <h2 className="font-display text-4xl lg:text-5xl text-tracklete-accent-strong mb-6 leading-tight">
                No more WhatsApp polls or excel sheets. Just clear schedules.
              </h2>
              <p className="text-lg text-tracklete-muted mb-8 leading-relaxed">
                Publish the weekly training plan and let athletes RSVP. You get a perfect view of who's showing up, allowing you to set lineups with confidence before anyone arrives at the boathouse.
              </p>
              <ul className="space-y-4">
                {['Drag-and-drop training calendar', 'One-tap RSVP for athletes', 'Automated lineup builder integration'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-tracklete-body font-medium">
                    <div className="w-5 h-5 rounded-full bg-tracklete-accent-soft flex items-center justify-center text-tracklete-accent">
                      <Check className="w-3 h-3" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="reveal-hidden stagger-1 bg-tracklete-panel rounded-lg shadow-xl border border-tracklete-soft p-1 overflow-hidden">
              <div className="bg-tracklete-offwhite/50 rounded-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-semibold text-tracklete-body">This Week's Schedule</h4>
                  <span className="text-sm text-tracklete-muted">Oct 12 - Oct 18</span>
                </div>
                
                <div className="bg-white rounded-md shadow-sm border border-tracklete-soft overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-tracklete-offwhite/50 text-tracklete-muted text-xs uppercase font-semibold">
                      <tr>
                        <th className="px-4 py-3 border-b border-tracklete-soft">Day</th>
                        <th className="px-4 py-3 border-b border-tracklete-soft">Time</th>
                        <th className="px-4 py-3 border-b border-tracklete-soft">Sport</th>
                        <th className="px-4 py-3 border-b border-tracklete-soft">Session</th>
                        <th className="px-4 py-3 border-b border-tracklete-soft text-right">RSVP</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-tracklete-soft">
                      <tr className="hover:bg-tracklete-offwhite/30 transition-colors">
                        <td className="px-4 py-4 font-medium">12</td>
                        <td className="px-4 py-4 text-tracklete-muted">06:30</td>
                        <td className="px-4 py-4"><span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">Row</span></td>
                        <td className="px-4 py-4">Starts + race pieces</td>
                        <td className="px-4 py-4 text-right">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-green-50 text-green-700 text-xs font-semibold">
                            Going <Check className="w-3 h-3" />
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-tracklete-offwhite/30 transition-colors">
                        <td className="px-4 py-4 font-medium">13</td>
                        <td className="px-4 py-4 text-tracklete-muted">18:00</td>
                        <td className="px-4 py-4"><span className="px-2 py-1 bg-orange-50 text-orange-700 rounded text-xs font-medium">Erg</span></td>
                        <td className="px-4 py-4">3×15 min threshold</td>
                        <td className="px-4 py-4 text-right">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-gray-100 text-gray-700 text-xs font-semibold">
                            Maybe
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-tracklete-offwhite/30 transition-colors">
                        <td className="px-4 py-4 font-medium">14</td>
                        <td className="px-4 py-4 text-tracklete-muted">07:15</td>
                        <td className="px-4 py-4"><span className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs font-medium">Bike</span></td>
                        <td className="px-4 py-4">Recovery spin + mobility</td>
                        <td className="px-4 py-4 text-right">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-green-50 text-green-700 text-xs font-semibold">
                            Going <Check className="w-3 h-3" />
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Story: Bodystats & Readiness */}
      <section className="py-32 bg-tracklete-dark text-white relative">
        <div className="absolute inset-0 bg-grid-dark opacity-10"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="order-2 lg:order-1 reveal-hidden relative">
              <img src="/__mockup/images/athlete-momentum-closeup.jpg" alt="Athlete rowing close up" className="w-full h-[600px] object-cover shadow-2xl rounded-sm" />
              
              {/* Overlay Dashboard Panel */}
              <div className="absolute -bottom-8 -right-8 md:-right-12 bg-tracklete-panel p-6 rounded-lg shadow-2xl border border-tracklete-soft text-tracklete-body w-[320px]">
                <h4 className="font-semibold text-tracklete-body mb-4">Morning Check-in</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-tracklete-offwhite p-3 rounded">
                    <div className="text-xs text-tracklete-muted uppercase tracking-wider font-semibold mb-1">Weight</div>
                    <div className="text-xl font-display font-medium text-tracklete-accent-strong">72.6 <span className="text-sm text-tracklete-muted font-sans font-normal">kg</span></div>
                  </div>
                  <div className="bg-tracklete-offwhite p-3 rounded">
                    <div className="text-xs text-tracklete-muted uppercase tracking-wider font-semibold mb-1">HRV</div>
                    <div className="text-xl font-display font-medium text-tracklete-accent-strong">64 <span className="text-sm text-tracklete-muted font-sans font-normal">ms</span></div>
                  </div>
                  <div className="bg-tracklete-offwhite p-3 rounded">
                    <div className="text-xs text-tracklete-muted uppercase tracking-wider font-semibold mb-1">Sleep</div>
                    <div className="text-xl font-display font-medium text-tracklete-accent-strong">8<span className="text-sm font-sans font-normal text-tracklete-muted">h</span> 12<span className="text-sm font-sans font-normal text-tracklete-muted">m</span></div>
                  </div>
                  <div className="bg-tracklete-offwhite p-3 rounded">
                    <div className="text-xs text-tracklete-muted uppercase tracking-wider font-semibold mb-1">RHR</div>
                    <div className="text-xl font-display font-medium text-tracklete-accent-strong">47 <span className="text-sm text-tracklete-muted font-sans font-normal">bpm</span></div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-xs text-tracklete-muted uppercase tracking-wider font-semibold mb-1.5">Comment</div>
                  <div className="bg-tracklete-offwhite rounded px-3 py-2 text-sm text-tracklete-body leading-snug">
                    Legs feel heavy from yesterday's long pieces. Will see how warm-up goes.
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 reveal-hidden stagger-1 lg:pl-12">
              <div className="inline-block px-3 py-1 bg-white/10 text-white font-semibold text-xs uppercase tracking-widest mb-6">Bodystats & Readiness</div>
              <h2 className="font-display text-4xl lg:text-5xl mb-6 leading-tight">
                Daily check-ins coaches can act on.
              </h2>
              <p className="text-lg text-white/70 mb-8 leading-relaxed">
                Identify overtraining before it becomes injury. Athletes log their morning metrics in seconds, giving coaches a red/amber/green readiness dashboard for the entire squad.
              </p>
              <a href="#" className="text-tracklete-accent hover:text-white transition-colors font-semibold inline-flex items-center gap-2">
                Explore Readiness Features <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            
          </div>
        </div>
      </section>

      {/* Product Story: Fitness Intelligence */}
      <section className="py-32 bg-tracklete-panel relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal-hidden">
            <div className="inline-block px-3 py-1 bg-tracklete-accent-soft text-tracklete-accent font-semibold text-xs uppercase tracking-widest mb-6">Fitness Intelligence</div>
            <h2 className="font-display text-4xl lg:text-5xl text-tracklete-accent-strong mb-6 leading-tight">
              Science-backed load management.
            </h2>
            <p className="text-lg text-tracklete-muted leading-relaxed">
              Tracklete ingests GPS data, Concept2 logs, and manual inputs to map the classic CTL/ATL models. Know exactly when your crew is peaking for race day.
            </p>
          </div>

          <div className="reveal-hidden stagger-1 max-w-5xl mx-auto">

            {/* Info box */}
            <div className="flex items-start justify-between gap-4 bg-amber-50 border border-amber-200 rounded-md px-5 py-4 mb-5 text-sm">
              <div>
                <p className="font-semibold text-amber-900 mb-1">Understanding your fitness metrics</p>
                <p className="text-amber-800 leading-relaxed">
                  Three graphs built from your GPS heart rate data: Fitness &amp; Fatigue, Form (TSB), and Workload Ratio (ACWR). TSB = CTL − ATL. Hover any chart to inspect daily values.
                </p>
              </div>
              <button className="flex-shrink-0 bg-tracklete-accent text-white text-xs font-semibold px-3 py-1.5 rounded">Read more...</button>
            </div>

            {/* Chart wrapper */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">

              {/* Header: title + time period buttons */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
                <span className="font-bold text-gray-800">Fitness</span>
                <div className="flex gap-1 text-xs font-medium">
                  {['42 days','3 months','6 months','1 year','All'].map(p => (
                    <button key={p} style={p==='3 months'?{background:'#0d7377',color:'#fff',borderRadius:'4px',padding:'3px 10px'}:{color:'#5a6b6e',padding:'3px 10px',borderRadius:'4px',border:'1px solid #e5e7eb'}}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Chart 1: Fitness – CTL (smooth, rising) + ATL (spiky, bouncing) ── */}
              <div className="px-2 pt-3 pb-1">
                <div className="flex justify-center gap-8 text-xs mb-1 text-gray-500">
                  <span className="flex items-center gap-1.5"><span style={{display:'inline-block',width:22,height:2,background:'#0d7377',verticalAlign:'middle'}}/> CTL – Fitness</span>
                  <span className="flex items-center gap-1.5"><span style={{display:'inline-block',width:22,height:2,background:'#e0305a',verticalAlign:'middle'}}/> ATL – Fatigue</span>
                </div>
                <svg viewBox="0 0 760 197" className="w-full block" onMouseMove={onFitMove} onMouseLeave={onFitLeave} style={{cursor:'crosshair'}}>
                  <text x="9" y="88" fontSize="8" fill="#9ca3af" textAnchor="middle" transform="rotate(-90,9,88)">Load (TSS)</text>
                  {[20,30,40,50,60,70,80,90].map(v => {
                    const yv = _fitY(v);
                    return <g key={v}><line x1={_CL} y1={yv} x2={_CR} y2={yv} stroke="#f3f4f6" strokeWidth="1"/><text x={_CL-3} y={yv+3} fontSize="8" fill="#9ca3af" textAnchor="end">{v}</text></g>;
                  })}
                  <path d={_ctlFill} fill="rgba(13,115,119,0.07)"/>
                  <path d={_ctlPath} fill="none" stroke="#0d7377" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d={_atlPath} fill="none" stroke="#e0305a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1={_CL} y1={_CT} x2={_CL} y2={_CB} stroke="#e5e7eb" strokeWidth="1"/>
                  <line x1={_CL} y1={_CB} x2={_CR} y2={_CB} stroke="#e5e7eb" strokeWidth="1"/>
                  {_xDates.map((lbl, i) => <text key={i} x={_CL+i*(_CW/6)} y="185" fontSize="8" fill="#9ca3af" textAnchor="middle">{lbl}</text>)}
                  {fitIdx !== null && (() => {
                    const fd = fitData[fitIdx], x = _dx(fitIdx);
                    const flip = fitIdx > fitData.length * 0.6;
                    const tx = flip ? x - 98 : x + 8;
                    return (
                      <g>
                        <line x1={x} y1={_CT} x2={x} y2={_CB} stroke="#9ca3af" strokeWidth="1" strokeDasharray="3 3"/>
                        <circle cx={x} cy={_fitY(fd.ctl)} r="3.5" fill="#0d7377" stroke="white" strokeWidth="1.5"/>
                        <circle cx={x} cy={_fitY(fd.atl)} r="3.5" fill="#e0305a" stroke="white" strokeWidth="1.5"/>
                        <rect x={tx} y={_CT+4} width="94" height="56" rx="4" fill="white" stroke="#e5e7eb" strokeWidth="1" style={{filter:'drop-shadow(0 1px 4px rgba(0,0,0,0.10))'}}/>
                        <text x={tx+6} y={_CT+17} fontSize="8.5" fill="#374151" fontWeight="600">{_dayLabel(fitIdx)}</text>
                        <text x={tx+6} y={_CT+30} fontSize="8" fill="#0d7377" fontWeight="600">CTL: {fd.ctl.toFixed(1)}</text>
                        <text x={tx+6} y={_CT+42} fontSize="8" fill="#e0305a" fontWeight="600">ATL: {fd.atl.toFixed(1)}</text>
                        <text x={tx+6} y={_CT+54} fontSize="8" fill="#6b7280">TSB: {fd.tsb.toFixed(1)}</text>
                      </g>
                    );
                  })()}
                </svg>
              </div>

              {/* ── Chart 2: Form (TSB = CTL − ATL) ── */}
              <div className="px-2 pt-2 pb-1 border-t border-gray-100">
                <div className="flex justify-center text-xs mb-1 text-gray-500">
                  <span className="flex items-center gap-1.5"><span style={{display:'inline-block',width:22,height:2,background:'#d97706',verticalAlign:'middle'}}/> TSB – Form</span>
                </div>
                <svg viewBox="0 0 760 197" className="w-full block" onMouseMove={onFitMove} onMouseLeave={onFitLeave} style={{cursor:'crosshair'}}>
                  <text x="9" y="88" fontSize="8" fill="#9ca3af" textAnchor="middle" transform="rotate(-90,9,88)">Form (TSB)</text>
                  {/* Coloured zone bands */}
                  <rect x={_CL} y={_tsbY(30)}  width={_CW} height={_tsbY(15)-_tsbY(30)}  fill="rgba(134,239,172,0.22)"/>
                  <rect x={_CL} y={_tsbY(15)}  width={_CW} height={_tsbY(0)-_tsbY(15)}   fill="rgba(156,163,175,0.10)"/>
                  <rect x={_CL} y={_tsbY(0)}   width={_CW} height={_tsbY(-10)-_tsbY(0)}  fill="rgba(134,239,172,0.18)"/>
                  <rect x={_CL} y={_tsbY(-30)} width={_CW} height={_tsbY(-40)-_tsbY(-30)} fill="rgba(248,113,113,0.22)"/>
                  {/* Zone labels – right-aligned INSIDE chart */}
                  <text x={_CR-5} y={_tsbY(30)+(_tsbY(15)-_tsbY(30))/2+3}  fontSize="7.5" fill="#6b7280" textAnchor="end" fontStyle="italic">Freshness</text>
                  <text x={_CR-5} y={_tsbY(15)+(_tsbY(0)-_tsbY(15))/2+3}   fontSize="7.5" fill="#6b7280" textAnchor="end" fontStyle="italic">Grey Zone</text>
                  <text x={_CR-5} y={_tsbY(0)+(_tsbY(-10)-_tsbY(0))/2+3}   fontSize="7.5" fill="#6b7280" textAnchor="end" fontStyle="italic">Optimal</text>
                  <text x={_CR-5} y={_tsbY(-30)+(_tsbY(-40)-_tsbY(-30))/2+3} fontSize="7.5" fill="#dc2626" textAnchor="end" fontStyle="italic">High Risk</text>
                  {/* Grid lines */}
                  {[30,20,10,0,-10,-20,-30,-40].map(v => {
                    const yv = _tsbY(v);
                    return <g key={v}><line x1={_CL} y1={yv} x2={_CR} y2={yv} stroke={v===0?'#9ca3af':'#f3f4f6'} strokeWidth={v===0?0.75:1} strokeDasharray={v===0?'4 3':undefined}/><text x={_CL-3} y={yv+3} fontSize="8" fill="#9ca3af" textAnchor="end">{v}</text></g>;
                  })}
                  <path d={_tsbPath} fill="none" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1={_CL} y1={_CT} x2={_CL} y2={_CB} stroke="#e5e7eb" strokeWidth="1"/>
                  <line x1={_CL} y1={_CB} x2={_CR} y2={_CB} stroke="#e5e7eb" strokeWidth="1"/>
                  {_xDates.map((lbl, i) => <text key={i} x={_CL+i*(_CW/6)} y="185" fontSize="8" fill="#9ca3af" textAnchor="middle">{lbl}</text>)}
                  {fitIdx !== null && (() => {
                    const fd = fitData[fitIdx], x = _dx(fitIdx);
                    const flip = fitIdx > fitData.length * 0.6;
                    const tx = flip ? x - 84 : x + 8;
                    return (
                      <g>
                        <line x1={x} y1={_CT} x2={x} y2={_CB} stroke="#9ca3af" strokeWidth="1" strokeDasharray="3 3"/>
                        <circle cx={x} cy={_tsbY(fd.tsb)} r="3.5" fill="#d97706" stroke="white" strokeWidth="1.5"/>
                        <rect x={tx} y={_CT+4} width="80" height="40" rx="4" fill="white" stroke="#e5e7eb" strokeWidth="1" style={{filter:'drop-shadow(0 1px 4px rgba(0,0,0,0.10))'}}/>
                        <text x={tx+6} y={_CT+17} fontSize="8.5" fill="#374151" fontWeight="600">{_dayLabel(fitIdx)}</text>
                        <text x={tx+6} y={_CT+30} fontSize="8" fill="#d97706" fontWeight="600">TSB: {fd.tsb.toFixed(1)}</text>
                      </g>
                    );
                  })()}
                </svg>
              </div>

              {/* ── Chart 3: ACWR (ATL / CTL workload ratio) ── */}
              <div className="px-2 pt-2 pb-3 border-t border-gray-100">
                <div className="flex justify-center text-xs mb-1 text-gray-500">
                  <span className="flex items-center gap-1.5"><span style={{display:'inline-block',width:22,height:2,background:'#3b82f6',verticalAlign:'middle'}}/> ACWR</span>
                </div>
                <svg viewBox="0 0 760 197" className="w-full block" onMouseMove={onFitMove} onMouseLeave={onFitLeave} style={{cursor:'crosshair'}}>
                  <text x="9" y="88" fontSize="8" fill="#9ca3af" textAnchor="middle" transform="rotate(-90,9,88)">ACWR</text>
                  {/* Zone bands */}
                  <rect x={_CL} y={_acwrY(2.0)} width={_CW} height={_acwrY(1.5)-_acwrY(2.0)} fill="rgba(248,113,113,0.20)"/>
                  <rect x={_CL} y={_acwrY(1.3)} width={_CW} height={_acwrY(0.8)-_acwrY(1.3)} fill="rgba(134,239,172,0.20)"/>
                  <rect x={_CL} y={_acwrY(0.8)} width={_CW} height={_acwrY(0)-_acwrY(0.8)}   fill="rgba(147,197,253,0.18)"/>
                  {/* Zone labels */}
                  <text x={_CR-5} y={_acwrY(2.0)+(_acwrY(1.5)-_acwrY(2.0))/2+3}  fontSize="7.5" fill="#dc2626" textAnchor="end" fontStyle="italic">Injury Risk</text>
                  <text x={_CR-5} y={_acwrY(1.3)+(_acwrY(0.8)-_acwrY(1.3))/2+3}  fontSize="7.5" fill="#6b7280" textAnchor="end" fontStyle="italic">Sweet Spot</text>
                  <text x={_CR-5} y={_acwrY(0.8)+(_acwrY(0)-_acwrY(0.8))/2+3}    fontSize="7.5" fill="#6b7280" textAnchor="end" fontStyle="italic">Undertraining</text>
                  {/* Grid lines */}
                  {[0,0.5,1.0,1.5,2.0].map(v => {
                    const yv = _acwrY(v);
                    return <g key={v}><line x1={_CL} y1={yv} x2={_CR} y2={yv} stroke={v===1?'#9ca3af':'#f3f4f6'} strokeWidth={v===1?0.75:1} strokeDasharray={v===1?'4 3':undefined}/><text x={_CL-3} y={yv+3} fontSize="8" fill="#9ca3af" textAnchor="end">{v.toFixed(1)}</text></g>;
                  })}
                  <path d={_acwrPath} fill="none" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1={_CL} y1={_CT} x2={_CL} y2={_CB} stroke="#e5e7eb" strokeWidth="1"/>
                  <line x1={_CL} y1={_CB} x2={_CR} y2={_CB} stroke="#e5e7eb" strokeWidth="1"/>
                  {_xDates.map((lbl, i) => <text key={i} x={_CL+i*(_CW/6)} y="185" fontSize="8" fill="#9ca3af" textAnchor="middle">{lbl}</text>)}
                  {fitIdx !== null && (() => {
                    const fd = fitData[fitIdx], x = _dx(fitIdx);
                    const flip = fitIdx > fitData.length * 0.6;
                    const tx = flip ? x - 88 : x + 8;
                    const zone = fd.acwr > 1.5 ? 'Injury Risk' : fd.acwr > 1.3 ? 'Mod. Risk' : fd.acwr >= 0.8 ? 'Sweet Spot' : 'Undertraining';
                    return (
                      <g>
                        <line x1={x} y1={_CT} x2={x} y2={_CB} stroke="#9ca3af" strokeWidth="1" strokeDasharray="3 3"/>
                        <circle cx={x} cy={_acwrY(fd.acwr)} r="3.5" fill="#3b82f6" stroke="white" strokeWidth="1.5"/>
                        <rect x={tx} y={_CT+4} width="84" height="40" rx="4" fill="white" stroke="#e5e7eb" strokeWidth="1" style={{filter:'drop-shadow(0 1px 4px rgba(0,0,0,0.10))'}}/>
                        <text x={tx+6} y={_CT+17} fontSize="8.5" fill="#374151" fontWeight="600">{_dayLabel(fitIdx)}</text>
                        <text x={tx+6} y={_CT+30} fontSize="8" fill="#3b82f6" fontWeight="600">ACWR: {fd.acwr.toFixed(2)} · {zone}</text>
                      </g>
                    );
                  })()}
                </svg>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Product Story: Weekly Analytics */}
      <section className="py-32 bg-tracklete-offwhite bg-grid">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div className="reveal-hidden">
              <div className="inline-block px-3 py-1 bg-tracklete-accent-soft text-tracklete-accent font-semibold text-xs uppercase tracking-widest mb-6">Weekly Analytics</div>
              <h2 className="font-display text-4xl lg:text-5xl text-tracklete-accent-strong mb-6 leading-tight">
                Understand every week at a glance.
              </h2>
              <p className="text-lg text-tracklete-muted mb-8 leading-relaxed">
                Tracklete automatically summarises each training week: total distance, time by sport, and time spent in each heart rate zone. Coaches can spot trends and flag under- or over-loading before it shows up on the erg.
              </p>
              <ul className="space-y-4">
                {[
                  'Automatic weekly summaries per athlete',
                  'Distance and duration split by activity type',
                  'Heart rate zone distribution — built from GPS data',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-tracklete-body font-medium">
                    <div className="w-5 h-5 rounded-full bg-tracklete-accent-soft flex items-center justify-center text-tracklete-accent flex-shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Weekly Analytics card mockup */}
            <div className="reveal-hidden stagger-1">
              <div className="bg-white rounded-lg shadow-xl border border-tracklete-soft p-6">

                {/* Card header */}
                <div className="mb-5">
                  <h3 className="font-bold text-lg text-tracklete-accent-strong">Week 23 analytics</h3>
                  <p className="text-sm text-tracklete-muted">juni 2026</p>
                </div>

                {/* Distance + Time by activity */}
                <div className="flex gap-6 mb-6 pb-6 border-b border-tracklete-soft">
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-tracklete-muted uppercase tracking-wider font-semibold mb-2">Distance</div>
                    <div className="font-display text-3xl font-bold text-tracklete-accent-strong mb-1">
                      11.6 <span className="text-base font-sans font-normal text-tracklete-muted">km</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-red-500 font-medium">
                      <span>↓</span><span>-35,9 km vs last week</span>
                    </div>
                  </div>

                  <div className="w-px bg-tracklete-soft flex-shrink-0"/>

                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-tracklete-muted uppercase tracking-wider font-semibold mb-2">Time by activity</div>
                    <div className="space-y-2">
                      {[
                        { label: 'Cycling',  min: 91, delta: '+91',  up: true  },
                        { label: 'Unlinked', min: 73, delta: '-163', up: false },
                        { label: 'Rowing',   min: 68, delta: '-116', up: false },
                      ].map(a => (
                        <div key={a.label} className="flex items-center gap-2 text-sm">
                          <span className="text-tracklete-body font-medium w-16 flex-shrink-0">{a.label}</span>
                          <span className="text-tracklete-muted flex-1">{a.min} min</span>
                          <span className={`flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded ${a.up ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                            {a.up ? '▲' : '▼'}{a.delta}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Heart rate zone chart */}
                <div>
                  {/* Legend */}
                  <div className="flex items-center gap-3 flex-wrap mb-3 text-xs text-tracklete-muted">
                    {[
                      { label: 'Rest',   color: '#e2e8f0' },
                      { label: 'Zone 1', color: '#94a3b8' },
                      { label: 'Zone 2', color: '#38bdf8' },
                      { label: 'Zone 3', color: '#4ade80' },
                      { label: 'Zone 4', color: '#fbbf24' },
                      { label: 'Zone 5', color: '#f87171' },
                    ].map(z => (
                      <span key={z.label} className="flex items-center gap-1">
                        <span style={{display:'inline-block',width:11,height:11,background:z.color,borderRadius:2,flexShrink:0,border:'1px solid rgba(0,0,0,0.06)'}}/>
                        {z.label}
                      </span>
                    ))}
                  </div>

                  {/* Stacked bar SVG */}
                  <svg viewBox="0 0 460 58" className="w-full block">
                    {/* Row label */}
                    <text x="0" y="27" fontSize="8.5" fill="#9ca3af" dominantBaseline="middle">Week 23</text>
                    {/* Stacked bar */}
                    {(() => {
                      const zones = [
                        { min: 90, color: '#e2e8f0' },
                        { min: 50, color: '#94a3b8' },
                        { min: 55, color: '#38bdf8' },
                        { min: 15, color: '#4ade80' },
                        { min:  8, color: '#fbbf24' },
                        { min:  5, color: '#f87171' },
                      ];
                      const OX = 62, CW = 370, MAX = 250, barY = 17, barH = 18;
                      let x = OX;
                      return zones.map((z, i) => {
                        const w = (z.min / MAX) * CW;
                        const el = <rect key={i} x={x} y={barY} width={w} height={barH} fill={z.color}/>;
                        x += w;
                        return el;
                      });
                    })()}
                    {/* Axis line */}
                    <line x1={62} y1={35} x2={432} y2={35} stroke="#e5e7eb" strokeWidth="1"/>
                    {/* X-axis ticks + labels */}
                    {[0, 50, 100, 150, 200, 250].map(v => {
                      const x = 62 + (v / 250) * 370;
                      return (
                        <g key={v}>
                          <line x1={x} y1={35} x2={x} y2={38} stroke="#d1d5db" strokeWidth="1"/>
                          <text x={x} y={47} fontSize="7.5" fill="#9ca3af" textAnchor="middle">{v}</text>
                        </g>
                      );
                    })}
                    <text x={247} y={57} fontSize="7.5" fill="#9ca3af" textAnchor="middle">Duration [min]</text>
                  </svg>

                  <p className="text-xs text-tracklete-muted mt-2">Time spent in each heart rate zone</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Full Bleed Break */}
      <section className="h-[70vh] min-h-[500px] relative reveal-hidden">
        <img src="/__mockup/images/single-scull-frontface.jpg" alt="Single scull dramatic front face" className="w-full h-full object-cover" />
      </section>

      {/* Comparison Table */}
      <section className="py-32 bg-tracklete-panel">
        <div className="max-w-5xl mx-auto px-6 reveal-hidden">
          <h2 className="font-display text-4xl text-center text-tracklete-accent-strong mb-16">
            One quick look at where Tracklete stands out.
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="py-4 px-6 border-b-2 border-tracklete-body text-tracklete-muted font-semibold">Features</th>
                  <th className="py-4 px-6 border-b-2 border-tracklete-accent text-tracklete-accent font-bold text-lg bg-tracklete-accent-soft rounded-t-md">Tracklete</th>
                  <th className="py-4 px-6 border-b-2 border-tracklete-soft text-tracklete-body font-semibold">Excel</th>
                  <th className="py-4 px-6 border-b-2 border-tracklete-soft text-tracklete-body font-semibold">TrainingPeaks</th>
                  <th className="py-4 px-6 border-b-2 border-tracklete-soft text-tracklete-body font-semibold">iCrew</th>
                </tr>
              </thead>
              <tbody className="text-base text-tracklete-body">
                {[
                  ['Training schedules', true, false, true, true],
                  ['Attendance tracking', true, false, false, true],
                  ['Erg + Concept2 Sync', true, false, false, false],
                  ['Bodystats & readiness', true, false, true, false],
                  ['Fitness / Load tab', true, false, true, false],
                  ['GPS analytics', true, false, true, false],
                  ['Club-wide analysis', true, false, false, true],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-tracklete-soft hover:bg-tracklete-offwhite/50 transition-colors">
                    <td className="py-5 px-6 font-medium">{row[0]}</td>
                    <td className="py-5 px-6 bg-tracklete-accent-soft/30 text-tracklete-accent font-bold">
                      {row[1] ? <Check className="w-5 h-5" /> : '—'}
                    </td>
                    <td className="py-5 px-6 text-tracklete-muted">{row[2] ? '✓' : '—'}</td>
                    <td className="py-5 px-6 text-tracklete-muted">{row[3] ? '✓' : (i===4 || i===5 ? '~' : '—')}</td>
                    <td className="py-5 px-6 text-tracklete-muted">{row[4] ? '✓' : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-tracklete-dark text-white relative">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <img src="/__mockup/images/female-scull-golden.jpg" alt="Female scull golden hour" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center reveal-hidden">
          <p className="font-display text-3xl md:text-4xl leading-relaxed text-white mb-10">
            "Tracklete gave our staff the first real overview we've had across training load, attendance, and recovery. It made planning feel calm again."
          </p>
          <div className="mb-16">
            <div className="font-bold text-lg">Maarten Lievens</div>
            <div className="text-tracklete-accent font-semibold uppercase tracking-wider text-sm">Head Coach, Nereus</div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-center pt-10 border-t border-white/20">
            <div>
              <div className="font-display text-3xl text-tracklete-accent mb-1">32</div>
              <div className="text-xs uppercase tracking-wider text-white/60 font-semibold">Athletes</div>
            </div>
            <div>
              <div className="font-display text-3xl text-tracklete-accent mb-1">6</div>
              <div className="text-xs uppercase tracking-wider text-white/60 font-semibold">Coaches</div>
            </div>
            <div>
              <div className="font-display text-3xl text-tracklete-accent mb-1">12</div>
              <div className="text-xs uppercase tracking-wider text-white/60 font-semibold">Hrs Saved/Week</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-32 bg-tracklete-offwhite">
        <div className="max-w-7xl mx-auto px-6 reveal-hidden">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl lg:text-5xl text-tracklete-accent-strong mb-4">Simple, transparent pricing.</h2>
            <p className="text-lg text-tracklete-muted">Pay quarterly or yearly (10% off). New members can be added anytime.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            
            {/* Personal */}
            <div className="bg-tracklete-panel rounded-lg p-8 border border-tracklete-soft shadow-sm">
              <h3 className="font-semibold text-xl text-tracklete-body mb-2">Personal</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-display font-bold">Free</span>
              </div>
              <p className="text-sm text-tracklete-muted mb-8 h-10">For individual athletes tracking their own training.</p>
              <button className="w-full py-2.5 px-4 border-2 border-tracklete-accent text-tracklete-accent rounded-sm font-semibold hover:bg-tracklete-accent-soft transition-colors mb-6">
                Sign Up
              </button>
              <ul className="space-y-3 text-sm text-tracklete-body">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-tracklete-accent" /> Concept2 Logbook</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-tracklete-accent" /> Strava Sync</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-tracklete-accent" /> Personal load charts</li>
              </ul>
            </div>

            {/* Team */}
            <div className="bg-tracklete-panel rounded-lg p-8 border border-tracklete-soft shadow-sm">
              <h3 className="font-semibold text-xl text-tracklete-body mb-2">Team</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-display font-bold">€2.49</span>
                <span className="text-sm text-tracklete-muted">/ member / mo</span>
              </div>
              <p className="text-sm text-tracklete-muted mb-8 h-10">For individual crews and small squads.</p>
              <button className="w-full py-2.5 px-4 border-2 border-tracklete-accent text-tracklete-accent rounded-sm font-semibold hover:bg-tracklete-accent-soft transition-colors mb-6">
                Start Trial
              </button>
              <ul className="space-y-3 text-sm text-tracklete-body">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-tracklete-accent" /> Everything in Personal</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-tracklete-accent" /> Shared schedules</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-tracklete-accent" /> Attendance tracking</li>
              </ul>
            </div>

            {/* Club - Highlight */}
            <div className="bg-tracklete-accent-strong rounded-lg p-8 border border-tracklete-accent-strong shadow-xl text-white relative transform md:-translate-y-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-tracklete-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Most Popular
              </div>
              <h3 className="font-semibold text-xl mb-2">Club</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-display font-bold">€2.99</span>
                <span className="text-sm text-white/70">/ member / mo</span>
              </div>
              <p className="text-sm text-white/80 mb-8 h-10">The complete platform for rowing societies.</p>
              <button className="w-full py-2.5 px-4 bg-tracklete-accent text-white rounded-sm font-semibold hover:bg-tracklete-accent/90 transition-colors mb-6 shadow-sm">
                Get Started
              </button>
              <ul className="space-y-3 text-sm text-white/90">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-tracklete-accent" /> Everything in Team</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-tracklete-accent" /> Bodystats & Readiness</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-tracklete-accent" /> Coach dashboards</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-tracklete-accent" /> Unlimited coaches</li>
              </ul>
            </div>

            {/* Elite */}
            <div className="bg-tracklete-panel rounded-lg p-8 border border-tracklete-soft shadow-sm">
              <h3 className="font-semibold text-xl text-tracklete-body mb-2">Elite</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-display font-bold">€9.49</span>
                <span className="text-sm text-tracklete-muted">/ member / mo</span>
              </div>
              <p className="text-sm text-tracklete-muted mb-8 h-10">For national federations and elite programmes.</p>
              <button className="w-full py-2.5 px-4 border-2 border-tracklete-accent text-tracklete-accent rounded-sm font-semibold hover:bg-tracklete-accent-soft transition-colors mb-6">
                Contact Sales
              </button>
              <ul className="space-y-3 text-sm text-tracklete-body">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-tracklete-accent" /> Everything in Club</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-tracklete-accent" /> Medical API access</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-tracklete-accent" /> Custom reporting</li>
              </ul>
            </div>
            
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-tracklete-dark text-white text-center">
        <div className="max-w-3xl mx-auto px-6 reveal-hidden">
          <h2 className="font-display text-4xl md:text-5xl mb-10">Ready to align your crew?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="bg-tracklete-accent text-white px-10 py-4 rounded-sm text-lg font-medium hover:bg-tracklete-accent-strong transition-colors shadow-sm w-full sm:w-auto">
              Book a Demo
            </button>
            <a href="#" className="text-white/70 hover:text-white transition-colors font-medium">
              Or log in <ArrowRight className="inline w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-tracklete-offwhite border-t border-tracklete-soft py-12 text-sm text-tracklete-muted">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6 font-medium">
            <a href="#" className="hover:text-tracklete-accent transition-colors">Features</a>
            <a href="#" className="hover:text-tracklete-accent transition-colors">Pricing</a>
            <a href="#" className="hover:text-tracklete-accent transition-colors">Blog</a>
            <a href="#" className="hover:text-tracklete-accent transition-colors">Contact</a>
            <a href="#" className="hover:text-tracklete-accent transition-colors">Privacy</a>
            <a href="#" className="hover:text-tracklete-accent transition-colors">Terms</a>
          </div>
          <div className="text-center md:text-right">
            <p>Tracklete · Son en Breugel, NL · info@tracklete.io</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
