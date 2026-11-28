import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Sparkles, ArrowRight } from 'lucide-react';
import LumoraLogo from './LumoraLogo';
import { PRODUCT_CATEGORIES } from '../data/siteData';
import { useInquiry } from '../context/InquiryContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openInquiry } = useInquiry();
  const { pathname } = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
    setSolutionsDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Solutions', path: '/solutions', hasDropdown: true },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const journeyLinks = [
    { name: 'New Homes', path: '/new-homes' },
    { name: 'Renovations', path: '/renovations' },
    { name: 'Our Process', path: '/our-process' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? 'bg-charcoal-950/95 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
          : 'bg-gradient-to-b from-charcoal-950/90 via-charcoal-950/60 to-transparent border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between gap-2">
          {/* Brand Logo */}
          <Link
            to="/"
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-electric rounded-xl py-1 shrink-0"
            aria-label="Lumora Smart Tech Home"
          >
            <LumoraLogo />
          </Link>

          {/* Desktop Navigation (lg and up) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {navLinks.map((item) => {
              if (item.hasDropdown) {
                const isSolutionsActive = pathname.startsWith('/solutions');
                return (
                  <div
                    key={item.path}
                    className="relative"
                    onMouseEnter={() => setSolutionsDropdownOpen(true)}
                    onMouseLeave={() => setSolutionsDropdownOpen(false)}
                  >
                    <div className="flex items-center">
                      <NavLink
                        to={item.path}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                          isSolutionsActive
                            ? 'text-amber-gold bg-white/5'
                            : 'text-slate-200 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span>{item.name}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            solutionsDropdownOpen ? 'rotate-180 text-amber-gold' : ''
                          }`}
                        />
                      </NavLink>
                    </div>

                    {/* Dropdown Panel — Solid Opaque Dark Sapphire Surface */}
                    {solutionsDropdownOpen && (
                      <div className="absolute left-0 top-full pt-2.5 w-88 sm:w-96 z-50">
                        <div
                          style={{ backgroundColor: '#040B16' }}
                          className="rounded-2xl bg-[#040B16] border-2 border-cyan-electric/35 p-3.5 shadow-[0_30px_90px_rgba(0,0,0,0.96),0_0_30px_rgba(0,210,255,0.15)]"
                        >
                          <Link
                            to="/solutions"
                            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-amber-gold/15 hover:bg-amber-gold/25 border border-amber-gold/40 text-xs font-semibold uppercase tracking-wider text-amber-gold mb-2.5 transition-colors"
                          >
                            <span>Explore All 5 Solutions</span>
                            <ArrowRight className="w-4 h-4 shrink-0" />
                          </Link>
                          <div className="space-y-1.5">
                            {PRODUCT_CATEGORIES.map((cat) => (
                              <Link
                                key={cat.id}
                                to={cat.path}
                                className="block px-3.5 py-2.5 rounded-xl bg-[#081528] hover:bg-[#0D203B] border border-white/10 hover:border-cyan-electric/45 transition-all group"
                              >
                                <div className="text-sm font-display font-bold text-white group-hover:text-cyan-electric transition-colors">
                                  {cat.name}
                                </div>
                                <div className="text-xs text-slate-300 line-clamp-1 mt-0.5">
                                  {cat.tagline}
                                </div>
                              </Link>
                            ))}
                          </div>
                          <div className="mt-2.5 pt-2.5 border-t border-white/15 grid grid-cols-3 gap-1.5">
                            {journeyLinks.map((j) => (
                              <Link
                                key={j.path}
                                to={j.path}
                                className="px-2.5 py-2 rounded-xl bg-[#081528] hover:bg-amber-gold/15 border border-white/10 hover:border-amber-gold/40 text-[11px] font-semibold text-center text-slate-200 hover:text-amber-gold transition-colors flex items-center justify-center"
                              >
                                {j.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-amber-gold bg-white/5'
                        : 'text-slate-200 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              );
            })}
          </nav>

          {/* Always-visible "Get a Quote" Action + Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => openInquiry({ sourceLabel: 'Header Get a Quote CTA' })}
              className="min-h-[44px] px-3.5 sm:px-5 py-2 rounded-xl bg-gradient-to-r from-amber-gold to-amber-glow hover:from-amber-soft hover:to-amber-gold text-charcoal-950 font-display font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_28px_rgba(245,158,11,0.5)] transition-all flex items-center gap-1.5 whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 hidden sm:inline shrink-0" />
              <span>Get a Quote</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="lg:hidden min-w-[44px] min-h-[44px] rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Collapsible Mobile & Tablet Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Mobile Navigation"
          style={{ backgroundColor: '#030814', WebkitOverflowScrolling: 'touch' }}
          className="lg:hidden bg-[#030814] border-b border-white/15 px-4 pt-3 pb-8 max-h-[calc(100dvh-5rem)] overflow-y-auto shadow-2xl"
        >
          <div className="space-y-1">
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `min-h-[46px] px-4 py-2.5 rounded-xl font-display font-semibold text-base flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-amber-gold/15 text-amber-gold border border-amber-gold/30'
                      : 'text-slate-100 hover:bg-white/5'
                  }`
                }
              >
                <span>{item.name}</span>
                <ArrowRight className="w-4 h-4 opacity-60" />
              </NavLink>
            ))}
          </div>

          {/* Solutions Sub-Pages Quick Links on Mobile */}
          <div className="mt-5 pt-4 border-t border-white/10">
            <div className="px-2 text-[11px] font-semibold uppercase tracking-widest text-amber-gold mb-2">
              Smart Product Suite
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {PRODUCT_CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  to={cat.path}
                  className="min-h-[44px] px-3.5 py-2 rounded-xl bg-charcoal-900/90 border border-white/10 text-sm text-slate-200 hover:text-cyan-electric flex items-center justify-between"
                >
                  <span>{cat.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </Link>
              ))}
            </div>
          </div>

          {/* Homeowner Journeys */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="px-2 text-[11px] font-semibold uppercase tracking-widest text-cyan-electric mb-2">
              Homeowner Journeys
            </div>
            <div className="grid grid-cols-3 gap-2">
              {journeyLinks.map((j) => (
                <Link
                  key={j.path}
                  to={j.path}
                  className="min-h-[44px] px-2 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-center text-white flex items-center justify-center"
                >
                  {j.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
