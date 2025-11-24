'use client';

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import RichText from "./RichText";

const stats = [
  {
    eyebrow: "Attivazione in 48 ore",
    title: "Onboarding guidato senza carico IT",
    description:
      "Importiamo sedi, turni e ruoli mentre il tuo team accede via link sicuro. GeoTapp è operativo in meno di due giorni con permessi e workflow già pronti.",
    metrics: ["Import CSV, API o SSO", "Template dedicati per multi-sede"],
  },
  {
    eyebrow: "Presenze geolocalizzate",
    title: "Controllo in tempo reale su task e straordinari",
    description:
      "Monitori timbrature, interventi spot e note vocali dalla stessa dashboard. Geofence dinamici bloccano errori e rendono affidabili i dati payroll.",
    metrics: ["Alert intelligenti su anomalie", "Report scaricabili in un clic"],
  },
  {
    eyebrow: "Compliance GDPR-by-design",
    title: "Privacy e sicurezza certificate per il workforce management",
    description:
      "Tracci solo quando serve, con storage europeo e audit trail completo. Ogni profilo vede ciò che deve, riducendo il rischio di contestazioni.",
    metrics: ["Retention configurabile", "Log attività sempre disponibili"],
  },
  {
    eyebrow: "Supporto strategico continuo",
    title: "Team di consulenza dedicato a HR e operation",
    description:
      "Ti affianchiamo dall'analisi dei processi alla formazione dei capi squadra. Aggiorniamo insieme i flussi quando l'organizzazione evolve.",
    metrics: ["Customer success in italiano", "Roadmap condivisa ogni trimestre"],
  },
] as const;

const featureChapters = [
  {
    id: "rollout",
    eyebrow: "Roll-out guidato",
    title: "Configuri GeoTapp in poche ore",
    description:
      "Importi sedi, ruoli e turni da file o API e definisci permessi granulati in un'unica schermata. Il team riceve accessi profilati via link sicuro, senza interventi IT complessi.",
    points: [
      "Template pronti per gestire multi-sede, appalti e squadre temporanee.",
      "Onboarding assistito con checklist condivise e reminder automatici.",
    ],
    image: "/images/feature-byod.svg",
    alt: "Configurazione di GeoTapp su diversi dispositivi",
  },
  {
    id: "operations",
    eyebrow: "Operatività live",
    title: "Vedi cosa succede sul campo in tempo reale",
    description:
      "Timeline, mappe e note vocali sono sincronizzate così capisquadra e HR possono intervenire subito su anomalie, straordinari e interventi spot.",
    points: [
      "Geofence dinamici e foto-timbratura per evitare errori o abusi.",
      "Alert proattivi su ritardi, timbrature mancanti e task in scadenza.",
    ],
    image: "/images/feature-media.svg",
    alt: "Dashboard operativa di GeoTapp",
  },
  {
    id: "compliance",
    eyebrow: "Audit e analisi",
    title: "Report pronti per payroll, clienti e audit HR",
    description:
      "Ogni azione genera log certificati: estrai report per clienti o consulenti del lavoro con un clic, mantenendo la compliance GDPR e riducendo contestazioni.",
    points: [
      "Filtri avanzati per ripulire straordinari, assenze e trasferte.",
      "Esportazioni verso ERP, BI e sistemi payroll tramite API e webhook.",
    ],
    image: "/images/contact-demo.svg",
    alt: "Analisi dei dati di presenza in GeoTapp",
  },
] as const;

const segments = [
  {
    title: "Cantieri e impianti",
    text: "Squadre multi-sito, turni complessi e straordinari certificati con geofence e controlli antifrode.",
    points: [
      "Gestione turni cantiere e tracciamento presenze geolocalizzate",
      "Antifroude timbratura con foto e geofence dinamici per sicurezza accesso",
      "Straordinari certificati e compliance normativa cantieri",
      "Squadre multi-sito e appalti con ruoli e permessi granulati",
    ],
  },
  {
    title: "Servizi e manutenzione",
    text: "Tecnici e fornitori registrano presenze, note e materiali senza app proprietarie.",
    points: [
      "Gestione tecnici campo e tracciamento interventi in tempo reale",
      "Work order management con assegnazione automatica task",
      "Note vocali e foto interventi integrate per documentazione completa",
      "Firma digitale interventi e gestione fornitori esterni",
    ],
  },
  {
    title: "Retail e field marketing",
    text: "Promoter e consulenti gestiscono timbrature temporanee, eventi e campagne itineranti.",
    points: [
      "Gestione promoter e timbrature temporanee per campagne itineranti",
      "Tracciamento consulenti field con bonus performance automatici",
      "Analisi presenza punti vendita e shelf monitoring in tempo reale",
      "Organizzazione eventi marketing e campagne promozionali dati-driven",
    ],
  },
];

const pricing = [
  {
    name: "Basic",
    price: "€2 / utente",
    details: ["Timbratura web", "Anagrafica team", "Report essenziali"],
    featured: false,
  },
  {
    name: "Pro",
    price: "€4 / utente",
    details: ["Tutto del Basic", "Geofence illimitati", "Export e filtri avanzati"],
    featured: true,
    badge: "Più popolare",
  },
  {
    name: "Enterprise",
    price: "Parliamone",
    details: ["Setup dedicato", "API e SSO", "Supporto premium"],
    featured: false,
  },
];

const faqs = [
  {
    question: "Serve scaricare un&apos;app?",
    answer:
      "No. GeoTapp è una web app responsive: apri il link, aggiungi alla home con un tap ed è subito pronta.",
  },
  {
    question: "Come gestite la sicurezza dei dati?",
    answer:
      "I dati sono conservati in data center europei con backup multipli e accessi profilati. Ogni accesso è tracciato nel registro attività.",
  },
  {
    question: "Possiamo integrare GeoTapp con i nostri sistemi?",
    answer:
      "Sì. Offriamo API REST e webhook. È possibile collegare payroll, ERP, strumenti di business intelligence o CRM interni.",
  },
];

const process = [
  {
    label: "01",
    title: "Disegniamo i flussi",
    text: "Importiamo il tuo team, impostiamo sedi, geofence e ruoli. Definiamo verifiche e notifiche.",
  },
  {
    label: "02",
    title: "Attiviamo la squadra",
    text: "Invito via mail o QR code. Ogni collaboratore timbra dal proprio device, anche offline.",
  },
  {
    label: "03",
    title: "Monitori e automatizzi",
    text: "Dashboard live, anomalie evidenziate e report pronti per payroll, fatturazione e BI.",
  },
];

const floatingDots = Array.from({ length: 18 }).map((_, index) => ({
  top: 5 + ((index * 17) % 90),
  left: 5 + ((index * 23) % 90),
}));

export default function HomeContent() {
  const heroRef = useRef<HTMLElement | null>(null);
  const storyVisualRef = useRef<HTMLDivElement | null>(null);
  const storySectionRef = useRef<HTMLElement | null>(null);
  const storyScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    let frame = 0;

    const updatePointer = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        hero.style.setProperty("--pointer-x", Math.min(Math.max(x, 0), 1).toString());
        hero.style.setProperty("--pointer-y", Math.min(Math.max(y, 0), 1).toString());
      });
    };

    const resetPointer = () => {
      hero.style.setProperty("--pointer-x", "0.5");
      hero.style.setProperty("--pointer-y", "0.5");
    };

    resetPointer();
    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("pointerleave", resetPointer);

    return () => {
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("pointerleave", resetPointer);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax-depth]"));
    if (!items.length) return;

    const configs = items.map((el) => ({
      el,
      depth: parseFloat(el.dataset.parallaxDepth ?? "18"),
      zoom: parseFloat(el.dataset.parallaxZoom ?? "0"),
      axis: el.dataset.parallaxAxis ?? "y",
    }));

    let ticking = false;

    const update = () => {
      const scrollY = window.scrollY;
      const viewportCenter = scrollY + window.innerHeight / 2;

      configs.forEach(({ el, depth, zoom, axis }) => {
        const rect = el.getBoundingClientRect();
        const elementCenter = scrollY + rect.top + rect.height / 2;
        const distance = viewportCenter - elementCenter;
        const normalised = Math.max(-1.6, Math.min(1.6, distance / window.innerHeight));
        const translate = (normalised * depth * -12).toFixed(2);
        
        // Calcolo dello zoom: quando normalised è 0 (elemento al centro), scale = 1
        // Quando normalised è lontano dal centro, scale aumenta
        const scale = (1 + Math.abs(normalised) * zoom).toFixed(3);

        if (axis === "x") {
          el.style.setProperty("--parallax-translate-x", `${translate}px`);
          el.style.setProperty("--parallax-translate-y", "0px");
        } else {
          el.style.setProperty("--parallax-translate-y", `${translate}px`);
          el.style.setProperty("--parallax-translate-x", "0px");
        }
        el.style.setProperty("--parallax-scale", scale);
      });

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-tilt]"));
    if (!cards.length) return;

    const cleanups: Array<() => void> = [];

    cards.forEach((card) => {
      const depth = parseFloat(card.dataset.tiltDepth ?? "12");
      let frame = 0;

      const setTilt = (x: number, y: number) => {
        card.style.setProperty("--tilt-rotate-x", `${x}deg`);
        card.style.setProperty("--tilt-rotate-y", `${y}deg`);
      };

      const handleMove = (event: PointerEvent) => {
        const rect = card.getBoundingClientRect();
        const ratioX = (event.clientX - rect.left) / rect.width;
        const ratioY = (event.clientY - rect.top) / rect.height;
        if (ratioX < 0 || ratioX > 1 || ratioY < 0 || ratioY > 1) return;

        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const rotateX = (0.5 - ratioY) * depth;
          const rotateY = (ratioX - 0.5) * depth;
          setTilt(rotateX, rotateY);
        });
      };

      const resetTilt = () => {
        cancelAnimationFrame(frame);
        setTilt(0, 0);
      };

      resetTilt();
      card.addEventListener("pointermove", handleMove);
      card.addEventListener("pointerleave", resetTilt);
      card.addEventListener("pointerdown", resetTilt);

      cleanups.push(() => {
        card.removeEventListener("pointermove", handleMove);
        card.removeEventListener("pointerleave", resetTilt);
        card.removeEventListener("pointerdown", resetTilt);
        cancelAnimationFrame(frame);
      });
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    
    // Usa requestAnimationFrame per assicurarsi che il DOM sia aggiornato
    const frameId = requestAnimationFrame(() => {
      const elements = document.querySelectorAll<HTMLElement>("[data-animate]");
      console.log("Found elements with data-animate:", elements.length);
      
      if (elements.length === 0) {
        console.warn("No elements with data-animate found");
        return;
      }
      
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              console.log("Element visible:", entry.target);
              entry.target.classList.add("visible");
            } else {
              console.log("Element not visible:", entry.target);
              entry.target.classList.remove("visible");
            }
          });
        },
        {
          threshold: 0.01,
          rootMargin: "0px",
        }
      );

      elements.forEach((el) => {
        console.log("Observing:", el);
        observer!.observe(el);
      });
    });

    return () => {
      cancelAnimationFrame(frameId);
      observer?.disconnect();
    };
  }, []);

  // Parallax sticky effect for story section
  useEffect(() => {
    const storyVisual = storyVisualRef.current;
    const storySection = storySectionRef.current;

    if (!storyVisual || !storySection) return;

    let isVisible = false;

    const handleScroll = () => {
      const sectionRect = storySection.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Mostra il visual quando la sezione diventa visibile
      const shouldBeVisible = sectionRect.top < viewportHeight && sectionRect.bottom > 0;
      
      if (shouldBeVisible && !isVisible) {
        isVisible = true;
        storyVisual.classList.add("visible");
      } else if (!shouldBeVisible && isVisible) {
        isVisible = false;
        storyVisual.classList.remove("visible");
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <section className="hero" id="home" ref={heroRef}>
        <div className="container">
          <div className="hero-content">
            <span className="hero-eyebrow">Web app per squadre sul campo</span>
            <h1>Timbrature geolocalizzate senza App. GeoTapp è il nuovo badge digitale.</h1>
            <p className="lead">
              Una piattaforma fluida e radiale come il tuo team: onboarding istantaneo, geofence
              dinamici, workflow per HR e operations. Con un look &amp; feel contemporaneo ispirato
              ai migliori siti tech.
            </p>
            <div className="hero-actions">
              <Link href="#contact">Prenota una demo</Link>
              <Link href="#pricing">Esplora i piani</Link>
            </div>
          </div>
        </div>
        <div className="hero-visuals" aria-hidden="true">
          <span className="hero-orb hero-orb--one" data-parallax-depth="48" />
          <span className="hero-orb hero-orb--two" data-parallax-depth="-36" data-parallax-axis="x" />
          <span className="hero-ring" data-parallax-depth="28" />
        </div>
        <div className="hero-map" aria-hidden="true">
          <span className="hero-map-path hero-map-path--main" data-parallax-depth="24" />
          <span className="hero-map-path hero-map-path--branch" data-parallax-depth="30" />
          <span className="hero-map-node hero-map-node--one" data-parallax-depth="32" />
          <span className="hero-map-node hero-map-node--two" data-parallax-depth="26" />
          <span className="hero-map-node hero-map-node--three" data-parallax-depth="34" />
        </div>
        <div className="floating-dots">
          {floatingDots.map((dot, index) => (
            <span
              key={index}
              style={{
                top: `${dot.top}%`,
                left: `${dot.left}%`,
              }}
            />
          ))}
        </div>
      </section>

      <section className="stats">
        <div className="container">
          <h2 className="reveal" data-animate>
            Perché i team scelgono GeoTapp
          </h2>
          <div className="grid">
            {stats.map((item) => (
              <article
                key={item.title}
                className="reveal"
                data-animate
                data-tilt
                data-tilt-depth="18"
                data-parallax-depth="18"
              >
                <p className="stat-eyebrow">{item.eyebrow}</p>
                <h3>{item.title}</h3>
              <RichText html={item.description} />
                {item.metrics && (
                  <ul className="stat-metrics">
                    {item.metrics.map((metric) => (
                      <li key={metric}>{metric}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="story" id="features" ref={storySectionRef}>
        <div className="container story-layout">
          <div className="story-visual reveal" data-animate data-tilt data-tilt-depth="10" ref={storyVisualRef}>
            <strong>Un&apos;unica PWA per tutto il ciclo delle presenze.</strong>
            <p>
              GeoTapp centralizza timbrature, task operativi e reporting payroll in una Progressive Web App unica che funziona su desktop, smartphone condivisi e chioschi di cantiere senza installazioni.
            </p>
            <p>
              Routing intelligente, check-in geolocalizzati e notifiche proattive aiutano capisquadra e HR a risolvere anomalie sul momento, eliminando passaggi manuali tra strumenti scollegati.
            </p>
            <ul className="story-visual-badges">
              <li>Setup guidato su dispositivi aziendali e personali con permessi profilati.</li>
              <li>Flussi configurabili per straordinari, trasferte, note spese e consegne spot.</li>
              <li>Dashboard live che evidenzia criticità e assegna priorità operative.</li>
            </ul>
            <div className="story-visual-metrics">
              <div>
                <span>+32%</span>
                <small>Tempo risparmiato dai responsabili di turno sul controllo timbrature.</small>
              </div>
              <div>
                <span>98%</span>
                <small>Adozione del team nelle prime due settimane senza formazione in aula.</small>
              </div>
            </div>
          </div>
          <div className="story-scroll" ref={storyScrollRef}>
            <div className="story-scroll-intro reveal" data-animate>
              <h2>La piattaforma che evolve con i tuoi ritmi</h2>
              <p>
                GeoTapp nasce per aziende che hanno bisogno di agilità visiva e operativa. Ogni
                componente è progettato per dare priorità all&apos;informazione giusta, così il team può
                intervenire senza perdere tempo in passaggi manuali.
              </p>
              <div className="story-highlight">
                Nada hardware, zero installazioni: solo una web experience moderna, modulare e
                personalizzabile.
              </div>
            </div>
            {featureChapters.map((chapter) => (
              <article
                key={chapter.id}
                className="story-scroll-card reveal"
                data-animate
                data-parallax-depth="24"
              >
                <p className="story-scroll-eyebrow">{chapter.eyebrow}</p>
                <h3>{chapter.title}</h3>
              <RichText html={chapter.description} />
                {chapter.points && (
                  <ul className="story-scroll-points">
                    {chapter.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                )}
                <figure className="story-scroll-figure">
                  <Image
                    src={chapter.image}
                    alt={chapter.alt}
                    width={380}
                    height={260}
                    loading="lazy"
                    sizes="(max-width: 900px) 100vw, 420px"
                    className="story-scroll-figure-img"
                  />
                </figure>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="segments" id="target">
        <div className="container">
          <h2 className="reveal" data-animate>
            Ideale per squadre diffuse e servizi sul campo
          </h2>
          <div className="grid">
            {segments.map((segment) => (
              <article
                key={segment.title}
                className="reveal"
                data-animate
                data-tilt
                data-tilt-depth="14"
                data-parallax-depth="16"
              >
                <h3>{segment.title}</h3>
                <p>{segment.text}</p>
                {segment.points && (
                  <ul style={{ margin: "16px 0 0 0", paddingLeft: "20px", listStyle: "disc", color: "var(--text-main)", lineHeight: "1.65", fontSize: "0.95rem" }}>
                    {segment.points.map((point) => (
                      <li key={point} style={{ marginBottom: "8px" }}>
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="reveal" data-animate>
            Dal brief al roll-out, in tre passi
          </h2>
          <div className="grid">
            {process.map((step) => (
              <article key={step.label} className="reveal" data-animate data-tilt data-tilt-depth="12" data-parallax-depth="14">
                <span style={{ color: "var(--accent-strong)", fontWeight: 600 }}>{step.label}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pricing" id="pricing">
        <div className="container">
          <h2 data-animate>Piani che crescono con te</h2>
          <div className="grid">
            {pricing.map((plan) => (
              <article 
                key={plan.name} 
                className={`reveal pricing-card ${plan.featured ? 'featured' : ''}`}
                data-animate 
                data-tilt 
                data-tilt-depth="16" 
                data-parallax-depth={plan.featured ? "22" : "16"}
              >
                {plan.badge && <div className="pricing-badge">{plan.badge}</div>}
                <h3>{plan.name}</h3>
                <p className="price">{plan.price}</p>
                <ul>
                  {plan.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
                <a href="#contact" className="pricing-cta">Inizia ora</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-block">
        <div className="cta-parallax-layer cta-parallax-smooth" data-parallax-depth="18" data-parallax-zoom="0.35" aria-hidden="true" />
        <div className="container">
          <div className="cta-surface reveal" data-animate>
            <h2>Vuoi vedere GeoTapp in azione?</h2>
            <p>
              Organizziamo una sessione live personalizzata in base ai tuoi flussi HR e operativi.
              Ti mostriamo come configurare geofence, team e report in meno di 30 minuti.
            </p>
            <div className="cta-actions">
              <Link href="#contact">Prenota la demo</Link>
              <Link href="mailto:info@geotapp.com">Scrivici ora</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="faqs" id="faq">
        <div className="container">
          <h2 className="reveal" data-animate>
            Domande frequenti
          </h2>
          {faqs.map((faq) => (
            <details key={faq.question} className="reveal" data-animate>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="container">
          <h2 className="reveal" data-animate>
            Parliamo del tuo progetto
          </h2>
          <p className="reveal" data-animate>
            Scrivi a <a href="mailto:info@geotapp.com">info@geotapp.com</a>  Possiamo aiutarti a trasformare le tue
            presenze in dati chiari, affidabili e pronti per la crescita.
          </p>
        </div>
      </section>
    </>
  );
}









