'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  useEffect(() => {
    // ---------- reveal on scroll ----------
    const revealEls = document.querySelectorAll('[data-reveal], [data-card-reveal]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        e.target.classList.toggle('visible', e.isIntersecting);
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));

    // ---------- typing + strike animation ----------
    const plain = "The main reason why economic policy fails is because governments rarely measure outcomes in the long term.";
    const annotated = [
      { t: "The " },
      { t: "main reason why", strike: true },
      { t: " reason", insert: true },
      { t: " economic policy fails is " },
      { t: "because", strike: true },
      { t: " " },
      { t: "governments rarely measure outcomes " },
      { t: "in the long term", strike: true },
      { t: " past the next election cycle", insert: true },
      { t: "." }
    ];

    const mText = document.getElementById('manuscriptText');
    const mMeta = document.getElementById('panelMeta');
    let cycleTimeout: ReturnType<typeof setTimeout> | null = null;
    let cycleInterval: ReturnType<typeof setInterval> | null = null;
    let stopped = false;

    function revealAnnotations() {
      if (!mText || !mMeta) return;
      mText.innerHTML = annotated.map((p, idx) => {
        if (p.strike) return `<span class="strike" data-i="${idx}">${p.t}</span>`;
        if (p.insert) return `<span class="insert" data-i="${idx}">${p.t}</span>`;
        return `<span>${p.t}</span>`;
      }).join('');
      const marks = mText.querySelectorAll('.strike, .insert');
      marks.forEach((el, i) => {
        setTimeout(() => el.classList.add('on'), 220 * i);
      });
      cycleTimeout = setTimeout(() => {
        mMeta.classList.add('on');
        // Pause on the finished annotated state, then reset and loop
        cycleTimeout = setTimeout(resetAndRetype, 2600);
      }, 220 * marks.length + 300);
    }

    function resetAndRetype() {
      if (stopped || !mText || !mMeta) return;
      mMeta.classList.remove('on');
      mText.innerHTML = '';
      cycleTimeout = setTimeout(runTyping, 400);
    }

    function runTyping() {
      if (stopped || !mText) return;
      let i = 0;
      mText.innerHTML = '<span class="cursor"></span>';
      cycleInterval = setInterval(() => {
        if (i >= plain.length) {
          if (cycleInterval) clearInterval(cycleInterval);
          cycleTimeout = setTimeout(() => {
            mText.classList.add('swapping');
            cycleTimeout = setTimeout(() => {
              revealAnnotations();
              mText.classList.remove('swapping');
            }, 250);
          }, 400);
          return;
        }
        mText.textContent = plain.slice(0, i + 1);
        i++;
      }, 16);
    }
    
    const panelEl = document.querySelector('.panel-frame');
    let panelObserver: IntersectionObserver | null = null;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (panelEl && !prefersReducedMotion) {
      panelObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            runTyping();
            panelObserver?.disconnect();
          }
        });
      }, { threshold: 0.4 });
      panelObserver.observe(panelEl);
    } else if (mText) {
      revealAnnotations();
    }

    // ---------- pinned horizontal scroll (desktop only) ----------
    const stage = document.getElementById('reviewedStage');
    const track = document.getElementById('reviewedTrack');
    const MOBILE_BREAK = 860;
    let scrollable = 0;

    function measure() {
      if (!stage || !track) return;
      if (window.innerWidth <= MOBILE_BREAK) {
        scrollable = 0;
        stage.style.height = 'auto';
        track.style.transform = 'none';
        return;
      }
      const trackWidth = track.scrollWidth;
      const viewportW = window.innerWidth;
      scrollable = Math.max(trackWidth - viewportW + 64, 0);
      stage.style.height = (window.innerHeight + scrollable) + 'px';
    }

    function onScroll() {
      if (!stage || !track) return;
      if (window.innerWidth <= MOBILE_BREAK || scrollable === 0) return;
      const top = stage.getBoundingClientRect().top + window.scrollY;
      const progress = Math.min(Math.max((window.scrollY - top) / scrollable, 0), 1);
      track.style.transform = `translateX(${-progress * scrollable}px)`;
    }

    const handleResize = () => { measure(); onScroll(); };
    const handleScroll = () => requestAnimationFrame(onScroll);

    window.addEventListener('load', measure);
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    measure();
    onScroll();

    return () => {
      stopped = true;
      if (cycleTimeout) clearTimeout(cycleTimeout);
      if (cycleInterval) clearInterval(cycleInterval);
      io.disconnect();
      panelObserver?.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <style>{`
        :root{
          --bg:#08080A;
          --panel:#0E0E11;
          --panel-2:#131316;
          --card:#18181C;
          --border:rgba(255,255,255,0.08);
          --border-strong:rgba(255,255,255,0.16);
          --text:#F3F3F5;
          --dim:#93939B;
          --faint:#5C5C64;
          --accent:#F2543D;
          --accent-2:#FF7A60;
          --accent-soft:rgba(242,84,61,0.14);
          --max:1180px;
          --wrap-pad:clamp(16px, 5vw, 32px);
          --section-pad:clamp(48px, 9vw, 96px);
          --hero-pad-t:clamp(64px, 13vw, 110px);
          --hero-pad-b:clamp(48px, 9vw, 88px);
          --card-pad:clamp(20px, 4.5vw, 36px);
          --gap-lg:clamp(28px, 6vw, 64px);
          --gap-md:clamp(16px, 3vw, 28px);
          --fs-eyebrow:clamp(10.5px, 1.3vw, 11.5px);
          --fs-lede:clamp(14px, 1.7vw, 16px);
          --fs-btn:clamp(13px, 1.6vw, 14px);
          --fs-h2:clamp(22px, 3.6vw, 28px);
          --fs-h3:clamp(17.5px, 2.2vw, 21px);
          --fs-body:clamp(13.5px, 1.7vw, 15px);
          --fs-mono-sm:clamp(10.5px, 1.3vw, 12px);
          --fs-nav:clamp(13px, 1.5vw, 14px);
        }
        *{box-sizing:border-box; margin:0; padding:0;}
        html{scroll-behavior:smooth;}
        body{
          background:var(--bg);
          color:var(--text);
          font-family:'Inter', sans-serif;
          -webkit-font-smoothing:antialiased;
          line-height:1.5;
          overflow-x:hidden;
        }
        body::before{
          content:"";
          position:fixed; inset:0;
          background-image:repeating-linear-gradient(-45deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 13px);
          pointer-events:none;
          z-index:0;
          -webkit-mask-image:radial-gradient(ellipse 95% 75% at 50% 0%, black 35%, transparent 88%);
          mask-image:radial-gradient(ellipse 95% 75% at 50% 0%, black 35%, transparent 88%);
        }
        .wrap{max-width:var(--max); margin:0 auto; padding:0 var(--wrap-pad); position:relative; z-index:1;}
        a{color:inherit; text-decoration:none;}
        ::selection{background:var(--accent); color:#fff;}
        .eyebrow{
          font-family:'IBM Plex Mono', monospace;
          font-size:var(--fs-eyebrow);
          letter-spacing:0.1em;
          text-transform:uppercase;
          color:var(--accent-2);
          display:flex; align-items:center; gap:8px;
        }
        .eyebrow::before{content:""; width:14px; height:1px; background:var(--accent-2); display:inline-block;}
        h1,h2,h3{font-weight:700; letter-spacing:-0.02em; color:var(--text);}

        /* TOP BAR */
        .topbar{border-bottom:1px solid var(--border); background:var(--panel);}
        .topbar .wrap{padding:clamp(8px, 1.8vw, 11px) var(--wrap-pad); display:flex; justify-content:center;}
        .topbar p{font-size:clamp(11.5px, 1.5vw, 13px); color:var(--dim); text-align:center; line-height:1.5;}
        .topbar strong{color:var(--text); font-weight:500;}

        /* NAV */
        nav{border-bottom:1px solid var(--border); position:sticky; top:0; z-index:50; background:rgba(8,8,10,0.85); backdrop-filter:blur(10px);}
        nav .wrap{display:flex; align-items:center; justify-content:space-between; height:clamp(62px, 9vw, 76px); gap:12px;}
        .wordmark{font-size:clamp(16px, 2.4vw, 19px); font-weight:700; display:flex; align-items:center; gap:6px; flex-shrink:0;}
        .wordmark .dot{width:7px; height:7px; border-radius:50%; background:var(--accent); box-shadow:0 0 12px 2px var(--accent-soft); display:inline-block;}
        .nav-links{display:flex; align-items:center; gap:clamp(20px, 3vw, 38px);}
        .nav-links a{font-size:var(--fs-nav); color:var(--dim); transition:color .15s ease; white-space:nowrap;}
        .nav-links a:hover{color:var(--text);}
        .nav-cta{background:var(--card); border:1px solid var(--border-strong); padding:clamp(8px, 1.6vw, 10px) clamp(12px, 2.8vw, 18px); font-size:var(--fs-btn); font-weight:500; border-radius:7px; white-space:nowrap; transition:border-color .15s ease, background .15s ease;}
        .nav-cta:hover{border-color:var(--accent); background:#1c1c20;}

        /* HERO */
        header.hero{padding:var(--hero-pad-t) 0 var(--hero-pad-b); text-align:center;}
        .hero .eyebrow{justify-content:center; margin-bottom:22px;}
        .hero h1{font-size:clamp(30px, 7.2vw, 50px); line-height:1.15; max-width:16ch; margin:0 auto 22px; background:linear-gradient(180deg, #fbfbfc 20%, #84848c 100%); -webkit-background-clip:text; background-clip:text; color:transparent;}
        .hero h1 .accent-word{background:none; -webkit-text-fill-color:initial; color:var(--accent-2);}
        .hero p.lede{font-size:var(--fs-lede); color:var(--dim); max-width:48ch; margin:0 auto clamp(26px, 5vw, 36px);}
        .hero-actions{display:flex; flex-wrap:wrap; align-items:center; justify-content:center; gap:14px; margin-bottom:18px; row-gap:14px;}

        .btn-primary{position:relative; overflow:hidden; background:linear-gradient(180deg, var(--accent-2), var(--accent)); color:#fff; padding:clamp(11px, 2.4vw, 13px) clamp(18px, 4vw, 24px); font-size:var(--fs-btn); font-weight:600; border-radius:8px; display:inline-flex; align-items:center; gap:8px; white-space:nowrap; box-shadow:0 0 0 1px rgba(255,255,255,0.08) inset, 0 8px 24px -8px rgba(242,84,61,0.55); transition:transform .15s ease, box-shadow .15s ease;}
        .btn-primary:hover{transform:translateY(-1px); box-shadow:0 0 0 1px rgba(255,255,255,0.12) inset, 0 12px 28px -8px rgba(242,84,61,0.7);}
        .btn-primary .arrow{transition:transform .2s ease;}
        .btn-primary:hover .arrow{transform:translateX(3px);}
        .btn-primary::after{content:""; position:absolute; top:0; left:-60%; width:40%; height:100%; background:linear-gradient(110deg, transparent, rgba(255,255,255,0.45), transparent); transform:skewX(-20deg); animation:sheen 4.5s ease-in-out infinite;}
        @keyframes sheen{0%{left:-60%;}35%{left:130%;}100%{left:130%;}}

        .btn-secondary{background:transparent; border:1px solid var(--border-strong); color:var(--text); padding:clamp(11px, 2.4vw, 13px) clamp(16px, 3.6vw, 22px); font-size:var(--fs-btn); font-weight:500; border-radius:8px; display:inline-flex; align-items:center; gap:8px; white-space:nowrap; transition:border-color .15s ease, background .15s ease;}
        .btn-secondary:hover{border-color:var(--faint); background:var(--card);}

        .hero-caption{font-size:clamp(11.5px, 1.5vw, 13px); color:var(--faint); display:flex; flex-wrap:wrap; align-items:center; justify-content:center; gap:6px 8px; row-gap:6px; max-width:90vw; margin:0 auto;}
        .hero-caption .sep{color:var(--border-strong);}

        /* PRODUCT PANEL */
        .panel-shell{padding:0 0 var(--section-pad);}
        .panel-frame{max-width:1040px; margin:0 auto; border:1px solid var(--border-strong); border-radius:16px; background:var(--panel); box-shadow:0 40px 90px -30px rgba(0,0,0,0.7); overflow:hidden;}
        .panel-chrome{display:flex; align-items:center; justify-content:space-between; padding:clamp(11px, 2vw, 14px) clamp(14px, 3vw, 20px); border-bottom:1px solid var(--border); gap:10px; flex-wrap:wrap;}
        .chrome-dots{display:flex; gap:6px;}
        .chrome-dots span{width:9px; height:9px; border-radius:50%; background:#2A2A30;}
        .chrome-tag{font-family:'IBM Plex Mono', monospace; font-size:var(--fs-mono-sm); color:var(--faint); letter-spacing:0.06em; white-space:nowrap;}
        .panel-body{padding:clamp(24px, 5vw, 46px) clamp(18px, 4.5vw, 48px) clamp(20px, 4vw, 38px);}
        .manuscript-text{font-size:clamp(15px, 2.6vw, 19px); line-height:1.85; color:var(--text); min-height:168px; transition:opacity 0.25s ease;}
        .manuscript-text.swapping{opacity:0;}
        .manuscript-text .cursor{display:inline-block; width:2px; height:1em; background:var(--accent-2); vertical-align:-3px; animation:blink 0.9s steps(1) infinite;}
        @keyframes blink{50%{opacity:0;}}
        .manuscript-text .strike{position:relative; color:var(--faint); opacity:0; transition:opacity .4s ease;}
        .manuscript-text .strike.on{opacity:1;}
        .manuscript-text .strike::after{content:""; position:absolute; left:0; top:52%; width:0%; height:1.5px; background:var(--accent-2); transition:width .35s ease;}
        .manuscript-text .strike.on::after{width:100%;}
        .manuscript-text .insert{color:var(--accent-2); font-weight:500; opacity:0; transform:translateY(4px); transition:opacity .35s ease, transform .35s ease;}
        .manuscript-text .insert.on{opacity:1; transform:translateY(0);}
        .panel-meta{display:flex; flex-wrap:wrap; gap:clamp(12px, 4vw, 28px); margin-top:clamp(20px, 4vw, 30px); padding-top:clamp(16px, 3vw, 22px); border-top:1px solid var(--border); font-family:'IBM Plex Mono', monospace; font-size:var(--fs-mono-sm); color:var(--faint); opacity:0; transition:opacity .5s ease .2s;}
        .panel-meta.on{opacity:1;}
        .panel-meta b{color:var(--dim); font-weight:500;}

        /* SECTIONS */
        section{padding:var(--section-pad) 0; border-bottom:1px solid var(--border); position:relative; z-index:1;}
        [data-reveal]{opacity:0; transform:translateY(16px); transition:opacity .6s ease, transform .6s ease; will-change:opacity, transform;}
        [data-reveal].visible{opacity:1; transform:translateY(0);}
        [data-reveal="left"]{transform:translateX(-22px);}
        [data-reveal="left"].visible{transform:translateX(0);}
        [data-reveal="right"]{transform:translateX(22px);}
        [data-reveal="right"].visible{transform:translateX(0);}

        /* REVIEWED PINNED HORIZONTAL */
        .reviewed-pin{padding:0; border-bottom:1px solid var(--border);}
        .reviewed-head{padding:var(--section-pad) 0 clamp(32px, 6vw, 56px);}
        .reviewed-head .wrap{max-width:560px; margin-left:var(--wrap-pad);}
        .reviewed-head p{color:var(--dim); font-size:var(--fs-body); margin-top:14px;}
        .reviewed-stage{position:relative;}
        .reviewed-sticky{position:sticky; top:0; height:100vh; display:flex; align-items:center; overflow:hidden; scrollbar-width:none; -ms-overflow-style:none;}
        .reviewed-sticky::-webkit-scrollbar{display:none; width:0; height:0;}
        .reviewed-track{display:flex; gap:var(--gap-md); padding-left:var(--wrap-pad); will-change:transform;}
        .annot-card{flex:0 0 min(360px, 78vw); background:var(--panel-2); border:1px solid var(--border); border-radius:14px; padding:var(--card-pad); transition:opacity .2s ease, transform .2s ease;}
        .annot-card .num{font-family:'IBM Plex Mono', monospace; font-size:var(--fs-mono-sm); color:var(--accent-2); margin-bottom:18px; display:block;}
        .annot-card h3{font-size:var(--fs-h3); font-weight:600; margin-bottom:12px;}
        .annot-card p{font-size:var(--fs-body); color:var(--dim); line-height:1.65;}
        .annot-card.last{flex:0 0 min(320px, 78vw); display:flex; flex-direction:column; justify-content:center; background:transparent; border-style:dashed;}
        [data-card-reveal]{opacity:0; transform:translateY(16px); transition:opacity .6s ease, transform .6s ease;}
        [data-card-reveal].visible{opacity:1; transform:translateY(0);}

        /* HOW IT WORKS */
        .steps{display:flex; flex-direction:column; gap:clamp(36px, 7vw, 64px);}
        .step{max-width:560px; padding:var(--card-pad); border:1px solid var(--border); border-radius:14px; background:var(--panel-2);}
        .step.align-left{margin-right:auto;}
        .step.align-right{margin-left:auto; text-align:right;}
        .step.align-right .sig{justify-content:flex-end;}
        .step.align-center{margin:0 auto; text-align:center;}
        .step.align-center .sig{justify-content:center;}
        .step .sig{font-family:'IBM Plex Mono', monospace; font-size:var(--fs-mono-sm); color:var(--accent-2); display:flex; align-items:center; gap:8px; margin-bottom:14px;}
        .step h3{font-size:var(--fs-h3); margin-bottom:10px;}
        .step p{font-size:var(--fs-body); color:var(--dim); line-height:1.65;}

        /* ENGINES */
        .engines-stage{position:relative; height:clamp(360px, 38vw, 420px); margin-bottom:24px;}
        .chip{position:absolute; width:clamp(118px, 13vw, 150px); aspect-ratio:1/1; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; background:var(--panel-2); border:1px solid var(--border-strong); border-radius:14px; padding:clamp(10px, 2vw, 14px); animation:float 6s ease-in-out infinite;}
        .chip .ring{width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; margin-bottom:10px; font-family:'IBM Plex Mono', monospace; font-weight:600; font-size:14px;}
        .chip .name{font-size:clamp(12.5px, 1.6vw, 13.5px); font-weight:600; margin-bottom:4px;}
        .chip .desc{font-size:clamp(10.5px, 1.3vw, 11.5px); color:var(--faint); line-height:1.45;}
        .chip-gemini{top:8%; left:2%; animation-delay:0s;}
        .chip-gemini .ring{background:rgba(138,180,248,0.12); color:#8AB4F8; box-shadow:0 0 24px -6px rgba(138,180,248,0.5);}
        .chip-gpt{top:60%; left:14%; animation-delay:1.4s;}
        .chip-gpt .ring{background:rgba(120,220,180,0.12); color:#7FE0B0; box-shadow:0 0 24px -6px rgba(127,224,176,0.45);}
        .chip-claude{top:8%; right:2%; animation-delay:0.7s;}
        .chip-claude .ring{background:var(--accent-soft); color:var(--accent-2); box-shadow:0 0 24px -6px rgba(242,84,61,0.5);}
        .chip-center{position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); width:clamp(180px, 22vw, 220px); text-align:center; background:var(--panel); border:1px dashed var(--border-strong); border-radius:14px; padding:clamp(16px, 3vw, 22px) clamp(16px, 3vw, 20px); animation:none;}
        .chip-center .glyph{font-size:24px; color:var(--accent-2); margin-bottom:8px;}
        .chip-center p{font-size:clamp(11.5px, 1.5vw, 12.5px); color:var(--dim); line-height:1.55;}
        @keyframes float{0%, 100%{transform:translateY(0);}50%{transform:translateY(-10px);}}
        .byok-note{font-size:clamp(13px, 1.7vw, 14.5px); color:var(--dim); max-width:60ch; border-left:2px solid var(--accent); padding-left:18px; margin:0 auto;}

        /* PRIVACY */
        .privacy-grid{display:grid; grid-template-columns:1fr 1fr; gap:var(--gap-lg); align-items:start;}
        .privacy-list{display:flex; flex-direction:column; gap:26px;}
        .privacy-item{display:flex; gap:18px;}
        .privacy-item .glyph{font-size:20px; color:var(--accent-2); line-height:1.3;}
        .privacy-item h3{font-size:clamp(15px, 1.8vw, 16px); font-weight:600; margin-bottom:6px;}
        .privacy-item p{font-size:clamp(13px, 1.6vw, 14px); color:var(--dim); max-width:42ch;}
        .privacy-panel{background:var(--panel-2); border:1px solid var(--border); border-radius:12px; padding:var(--card-pad); font-family:'IBM Plex Mono', monospace; font-size:clamp(11.5px, 1.5vw, 12.5px); line-height:2.1;}
        .privacy-panel .line{display:flex; flex-wrap:wrap; justify-content:space-between; gap:4px 12px; color:var(--dim);}
        .privacy-panel .line span:last-child{color:#7FE0B0;}
        .privacy-panel hr{border:none; border-top:1px solid var(--border); margin:14px 0;}

        /* CLOSING */
        .closing{padding:clamp(72px, 14vw, 120px) 0; text-align:center; border-bottom:none;}
        .closing h2{font-size:clamp(26px, 6vw, 40px); max-width:18ch; margin:0 auto 30px; line-height:1.18;}

        footer{padding:32px 0 48px;}
        footer .wrap{display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:14px; font-family:'IBM Plex Mono', monospace; font-size:var(--fs-mono-sm); color:var(--faint);}
        footer .links{display:flex; flex-wrap:wrap; gap:clamp(14px, 3vw, 22px);}
        footer a:hover{color:var(--dim);}

        @media (max-width:860px){
          .nav-links{display:none;}
          .reviewed-sticky{position:static; height:auto; overflow:visible; display:block;}
          .reviewed-stage{padding-bottom:var(--section-pad);}
          .reviewed-track{display:flex; flex-direction:column; gap:var(--gap-md); padding:0 var(--wrap-pad); max-width:var(--max); margin:0 auto; transform:none !important;}
          .annot-card, .annot-card.last{flex:none; width:100%;}
          .step{max-width:100%; margin:0 !important; text-align:left !important;}
          .step.align-right .sig, .step.align-center .sig{justify-content:flex-start;}
          .privacy-grid{grid-template-columns:1fr; gap:var(--gap-lg);}
          .reviewed-head .wrap{margin-left:0;}
        }
        @media (max-width:1040px){
          .engines-stage{height:auto; display:flex; flex-direction:column; gap:14px;}
          .chip{position:static; animation:none; width:100%; aspect-ratio:auto; padding:18px;}
          .chip-center{position:static; transform:none; width:100%; order:-1;}
        }
        @media (max-width:600px){
          header.hero{text-align:center;}
          .hero-actions .btn-primary, .hero-actions .btn-secondary{flex:1 1 auto; justify-content:center;}
          .privacy-item{gap:14px;}
          .topbar p{padding:0 4px;}
        }
        @media (max-width:480px){
          .hero-actions{flex-direction:column; align-items:stretch; gap:10px;}
          .hero-actions a{width:100%;}
          footer .wrap{flex-direction:column; text-align:center; justify-content:center;}
          footer .links{justify-content:center;}
          .closing a.btn-primary{width:100%; justify-content:center;}
          .chrome-tag{font-size:10px;}
        }
        @media (max-width:380px){
          .nav-cta{padding:7px 12px; font-size:12px;}
          .wordmark{font-size:15px;}
          .panel-body{padding:18px 14px;}
          .annot-card{padding:24px 20px;}
        }
        @media (prefers-reduced-motion:reduce){
          *{animation:none !important; transition:none !important;}
        }
      `}</style>

      <div className="topbar">
        <div className="wrap">
          <p><strong>Stateless by design</strong> — nothing you paste here is stored after the review finishes.</p>
        </div>
      </div>

      <nav>
        <div className="wrap">
          <div className="wordmark"><span className="dot"></span>Essai AI</div>
          <div className="nav-links">
            <a href="#reviewed">What&apos;s reviewed</a>
            <a href="#how">How it works</a>
            <a href="#engines">Engines</a>
            <a href="#privacy">Privacy</a>
          </div>
          <Link href="/app" className="nav-cta">Start a review</Link>
        </div>
      </nav>

      <header className="hero">
        <div className="wrap">
          <span className="eyebrow" style={{ justifyContent: 'center' }}>Academic Engine — v3.5</span>
          <h1>Read your draft the way an <span className="accent-word">editor</span> would.</h1>
          <p className="lede">Grammar, structure, and argument, checked the way a careful second reader checks — line by line, with reasons attached.</p>
          <div className="hero-actions">
            <Link href="/app" className="btn-primary">Start a review <span className="arrow">→</span></Link>
            <a href="#how" className="btn-secondary">See how it works</a>
          </div>
          <p className="hero-caption">No account required <span className="sep">·</span> Bring your own API key <span className="sep">·</span> Nothing stored</p>
        </div>
      </header>

      <div className="panel-shell">
        <div className="wrap">
          <div className="panel-frame" data-reveal="">
            <div className="panel-chrome">
              <div className="chrome-dots"><span></span><span></span><span></span></div>
              <span className="chrome-tag">live preview · auto-annotating</span>
            </div>
            <div className="panel-body">
              <p className="manuscript-text" id="manuscriptText"></p>
              <div className="panel-meta" id="panelMeta">
                <span><b>3</b> structural notes</span>
                <span><b>1</b> weak claim flagged</span>
                <span><b>0.4s</b> response</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="reviewed-pin" id="reviewed">
        <div className="reviewed-head">
          <div className="wrap">
            <span className="eyebrow">What gets reviewed</span>
            <p>Four passes over the same draft, each looking for something different. Keep scrolling — they move with you.</p>
          </div>
        </div>
        <div className="reviewed-stage" id="reviewedStage">
          <div className="reviewed-sticky">
            <div className="reviewed-track" id="reviewedTrack">
              <div className="annot-card" data-card-reveal=""><span className="num">gr.</span><h3>Grammar &amp; mechanics</h3><p>Agreement, tense, punctuation — caught at the sentence level, not flagged in bulk.</p></div>
              <div className="annot-card" data-card-reveal=""><span className="num">st.</span><h3>Style &amp; clarity</h3><p>Redundant phrasing, buried verbs, sentences quietly doing two jobs at once.</p></div>
              <div className="annot-card" data-card-reveal=""><span className="num">str.</span><h3>Structure</h3><p>Whether each paragraph earns its place and the argument actually builds toward something.</p></div>
              <div className="annot-card" data-card-reveal=""><span className="num">cl.</span><h3>Claims &amp; support</h3><p>Assertions made without backing, and exactly where a source or example is missing.</p></div>
              <div className="annot-card last" data-card-reveal=""><span className="num">→</span><h3 style={{ fontSize: 'clamp(16px, 2vw, 18px)' }}>That&apos;s the whole pass.</h3><p>Four lenses, one read-through. Scroll on for how it runs.</p></div>
            </div>
          </div>
        </div>
      </div>

      <section id="how">
        <div className="wrap">
          <div data-reveal="" style={{ marginBottom: '56px', maxWidth: '520px' }}>
            <span className="eyebrow">How it works</span>
            <p style={{ color: 'var(--dim)', fontSize: 'var(--fs-body)', marginTop: '14px' }}>Three steps, in order. The engine confirms what it&apos;s reading before it spends time reviewing it.</p>
          </div>
          <div className="steps">
            <div className="step align-left" data-reveal="left">
              <span className="sig">§1 — paste or upload</span>
              <h3>Drop in a draft</h3>
              <p>Plain text or a document upload. No formatting required, nothing to clean up first.</p>
            </div>
            <div className="step align-right" data-reveal="right">
              <span className="sig">§2 — confirm the type</span>
              <h3>Tell it what it&apos;s reading</h3>
              <p>The engine guesses argumentative, narrative, or research — you confirm before it spends time on the full pass.</p>
            </div>
            <div className="step align-center" data-reveal="">
              <span className="sig">§3 — full review</span>
              <h3>Read the notes</h3>
              <p>Organized by what kind of issue each one is, so you can work through them in the order that matters to you.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="engines">
        <div className="wrap">
          <div data-reveal="" style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="eyebrow" style={{ justifyContent: 'center' }}>Bring your own engine</span>
            <h2 style={{ fontSize: 'var(--fs-h2)', marginTop: '14px' }}>Choose which model reads your work.</h2>
          </div>
          <div className="engines-stage" data-reveal="">
            <div className="chip chip-gemini"><div className="ring">G</div><div className="name">Gemini</div><div className="desc">Fast on longer drafts</div></div>
            <div className="chip chip-gpt"><div className="ring">P</div><div className="name">GPT</div><div className="desc">Familiar default</div></div>
            <div className="chip chip-claude"><div className="ring">C</div><div className="name">Claude</div><div className="desc">Close reading, nuance</div></div>
            <div className="chip-center"><div className="glyph">⌘</div><p>Your key reaches only the model you pick — never logged, never billed by us.</p></div>
          </div>
          <p className="byok-note" style={{ textAlign: 'left', margin: '0 auto' }}>You supply the key, the key reaches only the model you chose, and EssaiAI never bills you for usage — what you pay your provider is between you and them.</p>
        </div>
      </section>

      <section id="privacy">
        <div className="wrap privacy-grid">
          <div data-reveal="left">
            <span className="eyebrow">Privacy by design</span>
            <h2 style={{ fontSize: 'var(--fs-h2)', margin: '18px 0 28px' }}>Nothing about your draft stays behind.</h2>
            <div className="privacy-list">
              <div className="privacy-item"><span className="glyph">¶</span><div><h3>No server-side copy</h3><p>Your essay is sent for review and discarded after — it isn&apos;t logged or stored on our end.</p></div></div>
              <div className="privacy-item"><span className="glyph">§</span><div><h3>Keys stay local</h3><p>Provider keys live in your browser, not on a server you don&apos;t control.</p></div></div>
              <div className="privacy-item"><span className="glyph">†</span><div><h3>Drafts are yours</h3><p>Anything you choose to save stays on your device, not in a shared database.</p></div></div>
            </div>
          </div>
          <div className="privacy-panel" data-reveal="right">
            <div className="line"><span>essay_text</span><span>discarded after response</span></div>
            <div className="line"><span>api_key</span><span>stored in browser only</span></div>
            <div className="line"><span>draft_history</span><span>local to this device</span></div>
            <hr />
            <div className="line"><span>server retention</span><span>none</span></div>
          </div>
        </div>
      </section>

      <div className="closing" id="start">
        <div className="wrap">
          <h2 data-reveal="">Give your draft a closer read before anyone else does.</h2>
          <Link href="/app" className="btn-primary" data-reveal="">Start a review <span className="arrow">→</span></Link>
        </div>
      </div>

      <footer>
        <div className="wrap">
          <span>Essai AI — Academic Engine v3.5</span>
          <div className="links">
            <a href="#how">How it works</a>
            <a href="#engines">Engines</a>
            <a href="#privacy">Privacy</a>
          </div>
        </div>
      </footer>
    </>
  );
}
