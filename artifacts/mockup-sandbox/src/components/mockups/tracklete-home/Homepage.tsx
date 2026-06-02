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
          background: scrolled ? 'rgba(248, 246, 241, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(26,36,38,0.10)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <a href="#">
              <img
                src="/__mockup/images/tracklete-logo.png"
                alt="Tracklete"
                className="h-9 w-auto"
                style={{ filter: scrolled ? 'brightness(0.9)' : 'none' }}
              />
            </a>
            <div
              className="hidden md:flex items-center gap-8 text-sm font-medium transition-colors duration-300"
              style={{ color: scrolled ? '#5a6b6e' : 'rgba(255,255,255,0.85)' }}
            >
              <a href="#" className="hover:opacity-100 transition-opacity" style={{ opacity: 0.85 }}>Features</a>
              <a href="#" className="hover:opacity-100 transition-opacity" style={{ opacity: 0.85 }}>Pricing</a>
              <a href="#" className="hover:opacity-100 transition-opacity" style={{ opacity: 0.85 }}>Blog</a>
              <a href="#" className="hover:opacity-100 transition-opacity" style={{ opacity: 0.85 }}>Contact</a>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a
              href="#"
              className="text-sm font-medium transition-colors duration-300"
              style={{ color: scrolled ? '#1a2426' : 'rgba(255,255,255,0.9)' }}
            >
              Log in
            </a>
            <a href="#" className="bg-tracklete-accent text-white px-5 py-2.5 rounded-sm text-sm font-medium hover:bg-tracklete-accent-strong transition-colors shadow-sm">
              Book a Demo
            </a>
          </div>
          <button className="md:hidden" style={{ color: scrolled ? '#1a2426' : 'white' }}>
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

          <div className="reveal-hidden stagger-1 bg-tracklete-offwhite border border-tracklete-soft rounded-xl p-8 max-w-5xl mx-auto shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h4 className="font-semibold text-tracklete-body text-lg">Performance Management Chart</h4>
                <p className="text-sm text-tracklete-muted">Last 90 days · First Eight</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-tracklete-accent"></div>
                  <span className="text-sm font-medium text-tracklete-muted">Fitness (CTL)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-sm font-medium text-tracklete-muted">Fatigue (ATL)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span className="text-sm font-medium text-tracklete-muted">Form (TSB)</span>
                </div>
              </div>
            </div>
            
            {/* Chart Graphic representation */}
            <div className="relative h-[300px] w-full border-b border-l border-tracklete-soft pb-4 pl-4">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pt-4 pb-4">
                {[1,2,3,4,5].map(i => <div key={i} className="w-full border-t border-tracklete-soft border-dashed"></div>)}
              </div>
              
              {/* SVG Chart paths to look realistic */}
              <svg className="absolute inset-0 w-full h-full p-4 overflow-visible" preserveAspectRatio="none">
                {/* Fitness (CTL) - Smooth rising curve */}
                <path d="M 0,250 C 100,240 200,220 300,180 C 400,150 500,120 600,100 C 700,90 800,70 900,60" fill="none" stroke="#0d7377" strokeWidth="3" vectorEffect="non-scaling-stroke" />
                <path d="M 0,250 C 100,240 200,220 300,180 C 400,150 500,120 600,100 C 700,90 800,70 900,60 L 900,300 L 0,300 Z" fill="rgba(13, 115, 119, 0.05)" vectorEffect="non-scaling-stroke" />
                
                {/* Fatigue (ATL) - Spiky curve */}
                <path d="M 0,280 L 50,220 L 100,260 L 150,190 L 200,230 L 250,150 L 300,120 L 350,180 L 400,140 L 450,100 L 500,160 L 550,80 L 600,50 L 650,130 L 700,90 L 750,140 L 800,60 L 850,40 L 900,100" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
                
                {/* Form (TSB) - Bar chart behind */}
                <g fill="rgba(245, 158, 11, 0.4)">
                  {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18].map(i => (
                    <rect key={i} x={i * 50 + 10} y={150 + Math.sin(i) * 50} width="20" height={Math.abs(Math.sin(i) * 50) + 10} />
                  ))}
                </g>
              </svg>
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
