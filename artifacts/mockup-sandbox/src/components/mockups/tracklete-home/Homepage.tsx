import React, { useEffect, useRef, useState } from 'react';
import './_group.css';
import { Check, ArrowRight, Menu } from 'lucide-react';

export function Homepage() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [scrolled, setScrolled] = useState(false);

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
                No more WhatsApp polls. Just clear schedules.
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
            <div className="flex items-start justify-between gap-4 bg-amber-50 border border-amber-200 rounded-md px-5 py-4 mb-4 text-sm">
              <div>
                <p className="font-semibold text-amber-900 mb-1">Understanding your fitness metrics</p>
                <p className="text-amber-800 leading-relaxed">
                  Three graphs built from your GPS heart rate data: Fitness &amp; Fatigue, Form (TSB), and Workload Ratio (ACWR). Load is calculated using the T2minute method developed for elite rowing at the Australian Institute of Sport.
                </p>
              </div>
              <button className="flex-shrink-0 bg-tracklete-accent text-white text-xs font-semibold px-3 py-1.5 rounded">Read more...</button>
            </div>

            {/* Chart wrapper */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">

              {/* Time buttons + title row */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
                <span className="font-bold text-gray-800">Fitness</span>
                <div className="flex gap-1 text-xs font-medium">
                  {['42 days','3 months','6 months','1 year','All'].map(p => (
                    <button key={p} style={p==='3 months' ? {background:'#0d7377',color:'#fff',borderRadius:'4px',padding:'3px 10px'} : {color:'#5a6b6e',padding:'3px 10px',borderRadius:'4px',border:'1px solid #e5e7eb'}}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Chart 1: Fitness (CTL + ATL) ── */}
              <div className="px-4 pt-3 pb-1">
                {/* Legend */}
                <div className="flex justify-center gap-8 text-xs mb-1">
                  <span className="flex items-center gap-1.5"><span style={{display:'inline-block',width:28,height:2,background:'#0d7377',verticalAlign:'middle'}}></span> CTL – Fitness</span>
                  <span className="flex items-center gap-1.5"><span style={{display:'inline-block',width:28,height:2,background:'#e0305a',verticalAlign:'middle'}}></span> ATL – Fatigue</span>
                </div>
                <svg viewBox="0 0 770 195" className="w-full" style={{display:'block'}}>
                  {/* Y-axis label */}
                  <text x="8" y="100" fontSize="9" fill="#9ca3af" textAnchor="middle" transform="rotate(-90,8,100)">Load (TSS)</text>
                  {/* Y axis ticks */}
                  {[20,30,40,50,60,70,80].map((v,i) => {
                    const yv = 165 - ((v-20)/60)*155;
                    return <g key={v}><line x1="45" y1={yv} x2="755" y2={yv} stroke="#f3f4f6" strokeWidth="1"/><text x="42" y={yv+3} fontSize="9" fill="#9ca3af" textAnchor="end">{v}</text></g>;
                  })}
                  {/* CTL – smooth teal line */}
                  <path d="M45,62 C80,61 115,63 165,67 C210,70 250,72 285,74 C325,76 365,78 404,79 C445,81 480,83 524,85 C565,87 605,90 644,92 C685,94 720,98 755,103" fill="none" stroke="#0d7377" strokeWidth="2.5" strokeLinecap="round"/>
                  {/* CTL area fill */}
                  <path d="M45,62 C80,61 115,63 165,67 C210,70 250,72 285,74 C325,76 365,78 404,79 C445,81 480,83 524,85 C565,87 605,90 644,92 C685,94 720,98 755,103 L755,165 L45,165 Z" fill="rgba(13,115,119,0.06)"/>
                  {/* ATL – spiky red line */}
                  <polyline points="45,62 75,48 100,108 130,57 155,98 185,41 210,75 240,86 265,52 295,118 320,63 350,88 375,48 405,108 430,67 460,52 485,102 515,40 545,92 575,48 605,138 635,73 665,58 695,105 720,44 755,88" fill="none" stroke="#e0305a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  {/* X-axis date labels */}
                  {['9 mrt','23 mrt','6 apr','20 apr','4 mei','18 mei','1 jun'].map((d,i) => (
                    <text key={d} x={45 + i*(710/6)} y="183" fontSize="9" fill="#9ca3af" textAnchor="middle">{d}</text>
                  ))}
                </svg>
              </div>

              {/* ── Chart 2: Form (TSB) ── */}
              <div className="px-4 pt-2 pb-1 border-t border-gray-100">
                <div className="flex justify-center text-xs mb-1">
                  <span className="flex items-center gap-1.5"><span style={{display:'inline-block',width:28,height:2,background:'#d97706',verticalAlign:'middle',borderTop:'2px solid #d97706'}}></span> TSB – Form</span>
                </div>
                <svg viewBox="0 0 770 195" className="w-full" style={{display:'block'}}>
                  <text x="8" y="100" fontSize="9" fill="#9ca3af" textAnchor="middle" transform="rotate(-90,8,100)">Form (TSB)</text>
                  {/* Background zones */}
                  {/* Transitional Freshness: v=15 to 30, y=15 to 48 */}
                  <rect x="45" y="15" width="710" height="33" fill="rgba(134,239,172,0.25)"/>
                  {/* Grey Zone: v=0 to 15, y=48 to 81 */}
                  <rect x="45" y="48" width="710" height="33" fill="rgba(156,163,175,0.12)"/>
                  {/* Optimal Training: v=-10 to 0, y=81 to 114 */}
                  <rect x="45" y="81" width="710" height="33" fill="rgba(134,239,172,0.2)"/>
                  {/* High Risk: v=-30 to -40, y=148 to 165 */}
                  <rect x="45" y="148" width="710" height="17" fill="rgba(248,113,113,0.25)"/>
                  {/* Zone labels on right */}
                  <text x="758" y="33" fontSize="7.5" fill="#6b7280" textAnchor="start">Transitional</text>
                  <text x="758" y="42" fontSize="7.5" fill="#6b7280" textAnchor="start">Freshness</text>
                  <text x="758" y="67" fontSize="7.5" fill="#6b7280" textAnchor="start">Grey Zone</text>
                  <text x="758" y="98" fontSize="7.5" fill="#6b7280" textAnchor="start">Optimal</text>
                  <text x="758" y="107" fontSize="7.5" fill="#6b7280" textAnchor="start">Training</text>
                  <text x="758" y="157" fontSize="7.5" fill="#ef4444" textAnchor="start">High Risk</text>
                  {/* Y axis ticks */}
                  {[30,20,10,0,-10,-20,-30,-40].map(v => {
                    const yv = 165 - ((v+40)/70)*150;
                    return <g key={v}><line x1="45" y1={yv} x2="755" y2={yv} stroke="#f3f4f6" strokeWidth="1"/><text x="42" y={yv+3} fontSize="9" fill="#9ca3af" textAnchor="end">{v}</text></g>;
                  })}
                  {/* TSB line */}
                  <polyline points="45,59 75,53 100,92 130,59 155,88 185,55 210,70 240,99 265,55 295,114 320,63 350,70 375,48 405,99 430,65 460,55 485,99 515,41 545,92 575,48 605,136 635,70 665,55 695,99 720,41 755,81" fill="none" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  {/* Zero line */}
                  <line x1="45" y1="81" x2="755" y2="81" stroke="#9ca3af" strokeWidth="0.75" strokeDasharray="4 3"/>
                  {/* X-axis dates */}
                  {['9 mrt','23 mrt','6 apr','20 apr','4 mei','18 mei','1 jun'].map((d,i) => (
                    <text key={d} x={45 + i*(710/6)} y="183" fontSize="9" fill="#9ca3af" textAnchor="middle">{d}</text>
                  ))}
                </svg>
              </div>

              {/* ── Chart 3: ACWR ── */}
              <div className="px-4 pt-2 pb-3 border-t border-gray-100">
                <div className="flex justify-center text-xs mb-1">
                  <span className="flex items-center gap-1.5"><span style={{display:'inline-block',width:28,height:2,background:'#3b82f6',verticalAlign:'middle'}}></span> ACWR</span>
                </div>
                <svg viewBox="0 0 770 195" className="w-full" style={{display:'block'}}>
                  <text x="8" y="100" fontSize="9" fill="#9ca3af" textAnchor="middle" transform="rotate(-90,8,100)">ACWR</text>
                  {/* Background zones: scale 0-2, y: 165-15, range=150px, 1 unit = 75px */}
                  {/* Injury Risk: 1.5-2.0 → y: 15-52.5 */}
                  <rect x="45" y="15" width="710" height="37.5" fill="rgba(248,113,113,0.2)"/>
                  {/* Sweet Spot: 0.8-1.3 → y: 52.5+26=78.5 to 52.5+26+37.5=116 wait let me recalc */}
                  {/* y = 165 - (v/2)*150 → v=1.5: 165-112.5=52.5, v=1.3: 165-97.5=67.5, v=0.8: 165-60=105 */}
                  <rect x="45" y="67.5" width="710" height="37.5" fill="rgba(134,239,172,0.2)"/>
                  {/* Undertraining: 0-0.8 → y: 105-165 */}
                  <rect x="45" y="105" width="710" height="60" fill="rgba(147,197,253,0.2)"/>
                  {/* Zone labels */}
                  <text x="758" y="36" fontSize="7.5" fill="#ef4444" textAnchor="start">Injury Risk</text>
                  <text x="758" y="88" fontSize="7.5" fill="#6b7280" textAnchor="start">Sweet Spot</text>
                  <text x="758" y="138" fontSize="7.5" fill="#6b7280" textAnchor="start">Undertraining</text>
                  {/* Y axis ticks */}
                  {[2.0,1.8,1.6,1.4,1.2,1.0,0.8,0.6,0.4,0.2,0].map(v => {
                    const yv = 165 - (v/2)*150;
                    return <g key={v}><line x1="45" y1={yv} x2="755" y2={yv} stroke="#f3f4f6" strokeWidth="1"/><text x="42" y={yv+3} fontSize="9" fill="#9ca3af" textAnchor="end">{v.toFixed(1)}</text></g>;
                  })}
                  {/* ACWR line */}
                  <polyline points="45,90 75,82 100,101 130,76 155,105 185,71 210,90 240,97 265,82 295,116 320,90 350,101 375,90 405,105 430,90 460,86 485,105 515,75 545,101 575,86 605,120 635,97 665,86 695,105 720,76 755,105" fill="none" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  {/* X-axis dates */}
                  {['9 mrt','23 mrt','6 apr','20 apr','4 mei','18 mei','1 jun'].map((d,i) => (
                    <text key={d} x={45 + i*(710/6)} y="183" fontSize="9" fill="#9ca3af" textAnchor="middle">{d}</text>
                  ))}
                </svg>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Product Story: Club Overview */}
      <section className="py-32 bg-tracklete-offwhite bg-grid">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="reveal-hidden">
              <div className="inline-block px-3 py-1 bg-tracklete-accent-soft text-tracklete-accent font-semibold text-xs uppercase tracking-widest mb-6">Coach Dashboard</div>
              <h2 className="font-display text-4xl lg:text-5xl text-tracklete-accent-strong mb-6 leading-tight">
                Your squad at a glance.
              </h2>
              <p className="text-lg text-tracklete-muted mb-8 leading-relaxed">
                Step into the launch with total confidence. The coach overview rolls up attendance, health flags, and training load into one actionable morning brief.
              </p>
              
              <div className="bg-tracklete-panel p-6 rounded-lg shadow-sm border border-tracklete-soft mb-8">
                <h4 className="font-semibold text-tracklete-body mb-4">Morning Brief</h4>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                    <span className="text-tracklete-body font-medium">12/14 Going tomorrow</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-tracklete-accent"></div>
                    <span className="text-tracklete-body font-medium">11 bodystats logged</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                    <span className="text-tracklete-body font-medium">84.2 km crew load</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-md shadow-sm border border-tracklete-soft overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-tracklete-offwhite/50 text-tracklete-muted text-xs uppercase font-semibold">
                    <tr>
                      <th className="px-4 py-3 border-b border-tracklete-soft">Athlete</th>
                      <th className="px-4 py-3 border-b border-tracklete-soft">Sleep</th>
                      <th className="px-4 py-3 border-b border-tracklete-soft">RHR</th>
                      <th className="px-4 py-3 border-b border-tracklete-soft">HRV</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-tracklete-soft">
                    <tr>
                      <td className="px-4 py-3 font-medium text-tracklete-body">Lieke</td>
                      <td className="px-4 py-3">8h 12m</td>
                      <td className="px-4 py-3">47</td>
                      <td className="px-4 py-3 text-green-600 font-medium">64</td>
                    </tr>
                    <tr className="bg-red-50/50">
                      <td className="px-4 py-3 font-medium text-tracklete-body">Mats <span className="ml-1 inline-block w-2 h-2 rounded-full bg-red-500"></span></td>
                      <td className="px-4 py-3 text-red-700 font-medium">6h 02m</td>
                      <td className="px-4 py-3 text-red-700 font-medium">54</td>
                      <td className="px-4 py-3 text-red-700 font-medium">49</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-tracklete-body">Roos</td>
                      <td className="px-4 py-3">7h 44m</td>
                      <td className="px-4 py-3">48</td>
                      <td className="px-4 py-3 text-green-600 font-medium">61</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="reveal-hidden stagger-1">
              <img src="/__mockup/images/coaching-motorboat.jpg" alt="Coach in motorboat" className="w-full h-[700px] object-cover rounded-sm shadow-xl" />
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
