import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowRight, Phone, Mail, MapPin, MessageCircle, ChevronDown, X, Cog, Shield,
  Award, Truck, Wrench, Factory, Settings, CheckCircle2, Star, Sparkles, Zap, Sun, Moon,
  Building2, Cpu, Handshake,
} from "lucide-react";

import heroImg from "@/assets/hero-industrial.jpg";
import collarBush from "@/assets/product-collar-bush.jpg";
import copperBush from "@/assets/product-copper-bush.jpg";
import brassBush from "@/assets/product-brass-bush.jpg";
import metalBolt from "@/assets/product-metal-bolt.jpg";
import dowelPins from "@/assets/product-dowel-pins.jpg";
import guidePins from "@/assets/product-guide-pins.jpg";
import pistonRod from "@/assets/product-piston-rod.jpg";
import pistonSleeve from "@/assets/product-piston-sleeve.jpg";
import infraFacility from "@/assets/infra-facility.jpg";
import infraMachinery from "@/assets/infra-machinery.jpg";
import infraWorkshop from "@/assets/infra-workshop.jpg";
import infraWarehouse from "@/assets/infra-warehouse.jpg";
import infraInspection from "@/assets/infra-inspection.jpg";
import infraProduction from "@/assets/infra-production.jpg";

/* =================== DATA =================== */

type Product = {
  name: string;
  image: string;
  description: string;
  material: string;
  applications: string;
  dimensions: string;
};

const PRODUCTS: Product[] = [
  { name: "Collar Bush", image: collarBush, description: "Precision-machined collar bushes for high-load bearing applications with superior wear resistance.", material: "Hardened steel / Bronze", applications: "Automotive, heavy machinery, gearboxes", dimensions: "Ø 10–200 mm, custom on request" },
  { name: "Copper Bush", image: copperBush, description: "Pure copper bushes for excellent thermal & electrical conductivity in demanding environments.", material: "Electrolytic copper", applications: "Electrical assemblies, transformers, motors", dimensions: "Ø 8–150 mm" },
  { name: "Brass Bush", image: brassBush, description: "Corrosion-resistant brass bushes ideal for marine and chemical industry components.", material: "C36000 / C46400 brass", applications: "Pumps, valves, marine equipment", dimensions: "Ø 6–180 mm" },
  { name: "Metal Bolt", image: metalBolt, description: "Industrial-grade metal bolts engineered for structural integrity and repeatable torque.", material: "Grade 8.8 / 10.9 steel", applications: "Structural assembly, machinery, automotive", dimensions: "M6–M48, lengths to 300 mm" },
  { name: "Dowel Pins", image: dowelPins, description: "Hardened ground dowel pins with mirror finish for precise alignment in tooling.", material: "Hardened tool steel HRC 58–62", applications: "Die-sets, jigs, fixtures, molds", dimensions: "Ø 2–25 mm, ground h6" },
  { name: "Guide Pins", image: guidePins, description: "Precision guide pins for die-sets and press tools — exact tolerances, polished surfaces.", material: "Case-hardened alloy steel", applications: "Press tools, die-sets, automation", dimensions: "Ø 8–50 mm" },
  { name: "Piston Rod", image: pistonRod, description: "Chrome-plated piston rods for hydraulic and pneumatic cylinders with mirror surface.", material: "EN8 / EN24 hard chrome plated", applications: "Hydraulic cylinders, presses, actuators", dimensions: "Ø 16–125 mm, length to 3000 mm" },
  { name: "Piston Rod Sleeve", image: pistonSleeve, description: "Wear-resistant piston rod sleeves with precision-honed inner bore.", material: "Hardened steel / honed bore", applications: "Hydraulic systems, pneumatic cylinders", dimensions: "Ø 20–200 mm" },
];

const INFRA = [
  { title: "Manufacturing Unit", image: infraFacility },
  { title: "Machinery", image: infraMachinery },
  { title: "Workshop", image: infraWorkshop },
  { title: "Warehouse", image: infraWarehouse },
  { title: "Inspection Area", image: infraInspection },
  { title: "Production Floor", image: infraProduction },
];

const WHY_US = [
  { icon: Award, title: "Established in 1989", desc: "Over three decades of trusted manufacturing excellence." },
  { icon: Settings, title: "Precision Manufacturing", desc: "Tolerances held to microns on every component." },
  { icon: Shield, title: "Quality Assurance", desc: "100% inspection with calibrated instruments." },
  { icon: Wrench, title: "Skilled Workforce", desc: "Master machinists with decades of expertise." },
  { icon: Truck, title: "Timely Delivery", desc: "On-time dispatch backed by lean production." },
  { icon: Cog, title: "Custom Engineering", desc: "Bespoke components built to exact specifications." },
  { icon: Factory, title: "Modern Machinery", desc: "CNC lathes, grinders & inspection tooling." },
  { icon: Sparkles, title: "Competitive Pricing", desc: "Premium quality at honest, scalable pricing." },
];

const INDUSTRIES = ["Automotive", "Engineering", "Manufacturing", "Machinery", "Tool & Die", "Industrial Automation"];

const PROCESS_STEPS = [
  { n: "01", title: "Requirement Analysis", desc: "We study your drawings, tolerances and application." },
  { n: "02", title: "Design & Planning", desc: "Material selection, process planning, fixture design." },
  { n: "03", title: "Precision Manufacturing", desc: "CNC turning, grinding & finishing on calibrated machines." },
  { n: "04", title: "Quality Inspection", desc: "Dimensional & surface inspection on every batch." },
  { n: "05", title: "Delivery", desc: "Carefully packed and dispatched on schedule." },
];

const LEADERSHIP = [
  {
    name: "Vipul Shivaji Tidke",
    role: "Chief Executive Officer",
    initials: "VT",
    message: "Every component that leaves our floor carries a promise — that it was machined, measured and inspected to a standard we would accept on our own line. That discipline is why customers have trusted us for over three decades, and it is the only standard I will ever lead this company by.",
  },
  {
    name: "Shivaji Tidke",
    role: "Founder & Chairman",
    initials: "ST",
    message: "I started Vikas Engineering Works in 1989 with one lathe, two hands and the belief that Indian precision could match the world's finest. Watching that single workshop grow into a fully equipped, CNC-driven manufacturing house — still run with the same honesty — is the work of my life.",
  },
];

const CUSTOMERS = [
  "Bharat Forge Ltd. (Mundhwa)",
  "Bharat Forge Ltd. (Baramati)",
  "Suryalogix Private Limited",
  "CIE Mahindra Automotive",
  "Drushti Polymers Ltd.",
  "Oneness Control Panels Ltd.",
  "Kalyani Forging",
];

const MACHINES = [
  { name: "Vertical Milling Centre — VMC", make: "BFW (with ATC)", spec: "Stroke: 800 × 510 × 510 mm" },
  { name: "CNC Turning Centre", make: "LMW", spec: "Ø 320 max × Length 310 max" },
  { name: "12 Feet Lathe Machine", make: "Swastik", spec: "Ø 800 max × Length 1800 max" },
  { name: "7 Feet Lathe Machine", make: "Deepak", spec: "Ø 550 max × Length 1000 max" },
  { name: "6 Feet Lathe Machine", make: "Swastik", spec: "Ø 450 max × Length 750 max" },
  { name: "4.5 Feet Lathe Machine", make: "Swastik", spec: "Ø 300 max × Length 500 max" },
  { name: "Universal Milling Machine", make: "Jasico (U.K.)", spec: "Bed 525 × 300 — with DRO" },
  { name: "Universal Milling Machine", make: "Azipura (Swiss)", spec: "Bed 225 × 450" },
  { name: "Universal Milling Machine", make: "Sunrise", spec: "Bed 225 × 450 — with DRO" },
  { name: "Cylindrical Grinding Machine (Between Centres)", make: "WMW (Germany)", spec: "OD Ø300 × L1000 · ID Ø250 × L200 · 5 micron accuracy" },
  { name: "Centreless Grinding Machine (×2)", make: "Bhagwan", spec: "Range Ø 0.5 mm to 65 mm" },
  { name: "Thread Rolling Machine", make: "Prag", spec: "Thread Range M3 to M30" },
  { name: "Troub Machine", make: "—", spec: "Models A25 — A42" },
  { name: "Band Saw Cutting Machine", make: "Laxmi Machines", spec: "Up to Ø 200 mm" },
  { name: "Welding Machine", make: "Local", spec: "Electric Arc Type" },
];

/* =================== SUB-COMPONENTS =================== */

function Sparks() {
  // Decorative CSS sparks behind hero
  const sparks = Array.from({ length: 14 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {sparks.map((_, i) => {
        const dx = (Math.random() - 0.5) * 400;
        const dy = -Math.random() * 300 - 100;
        const left = 30 + Math.random() * 40;
        const top = 50 + Math.random() * 30;
        const delay = Math.random() * 4;
        const dur = 2 + Math.random() * 2;
        return (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              background: "radial-gradient(circle, #ffb066 0%, #d4af37 50%, transparent 70%)",
              boxShadow: "0 0 8px 2px rgba(212,175,55,0.6)",
              ["--dx" as string]: `${dx}px`,
              ["--dy" as string]: `${dy}px`,
              animation: `spark ${dur}s ease-out ${delay}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}

function Counter({ to, suffix = "+" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1800;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setVal(Math.floor(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

function MagneticButton({ children, variant = "primary", onClick, href, type = "button" }: {
  children: React.ReactNode; variant?: "primary" | "ghost" | "gold"; onClick?: () => void; href?: string; type?: "button" | "submit";
}) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.25);
    y.set((e.clientY - r.top - r.height / 2) * 0.25);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  const base = "relative inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide uppercase transition-all duration-300 will-change-transform";
  const styles = variant === "gold"
    ? "bg-gold-gradient text-black shadow-[var(--shadow-glow-gold)] hover:shadow-[0_0_60px_-5px_rgba(212,175,55,0.7)]"
    : variant === "ghost"
    ? "glass text-foreground hover:bg-foreground/10"
    : "bg-foreground text-background hover:opacity-90";

  const inner = (
    <motion.span style={{ x: sx, y: sy }} className="inline-flex items-center gap-2">
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={`${base} ${styles}`}
      >
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`${base} ${styles}`}
    >
      {inner}
    </motion.button>
  );
}

function Reveal({ children, delay = 0, y = 30 }: { children: React.ReactNode; delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* =================== SECTIONS =================== */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    ["About", "#about"], ["Products", "#products"], ["Infrastructure", "#infra"],
    ["Process", "#process"], ["Contact", "#contact"],
  ] as const;
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-3 backdrop-blur-2xl bg-background/70 border-b border-white/5" : "py-6"}`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 group">
          <div className="relative h-10 w-10 grid place-items-center rounded-md bg-gradient-to-br from-[var(--gold)] to-[var(--copper)] shrink-0">
            <Cog className="h-5 w-5 text-black animate-spin-slow" />
          </div>
          <span className="font-display font-extrabold text-sm sm:text-base tracking-wide text-foreground whitespace-nowrap">
            Vikas <span className="text-[var(--gold)]">Engineering</span> Works
          </span>
        </a>
        <div className="hidden md:flex items-center gap-9">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-sm text-foreground/70 hover:text-foreground transition-colors relative group">
              {label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--gold)] transition-all group-hover:w-full" />
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <MagneticButton variant="gold" href="#contact">
            Get Quote <ArrowRight className="h-4 w-4" />
          </MagneticButton>
        </div>
      </div>
    </motion.nav>
  );
}

function ThemeToggle() {
  const [light, setLight] = useState(false);
  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const isLight = stored === "light";
    setLight(isLight);
    document.documentElement.classList.toggle("light", isLight);
  }, []);
  const toggle = () => {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light", next);
    try { localStorage.setItem("theme", next ? "light" : "dark"); } catch {}
  };
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="h-10 w-10 grid place-items-center rounded-full border border-foreground/15 bg-foreground/5 text-foreground hover:bg-foreground/10 transition"
    >
      {light ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={ref} id="top" className="relative min-h-screen flex items-center overflow-hidden">
      <motion.div style={{ scale, opacity }} className="absolute inset-0">
        <img src={heroImg} alt="Precision machining at Vikas Engineering Works" className="h-full w-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-noise opacity-40 mix-blend-overlay" />
      </motion.div>

      <Sparks />

      {/* Rotating gear decoration */}
      <div className="pointer-events-none absolute -right-32 top-1/4 opacity-10">
        <Cog className="h-[500px] w-[500px] animate-spin-slow text-[var(--gold)]" strokeWidth={0.5} />
      </div>

      <motion.div style={{ y }} className="container mx-auto px-6 relative z-10 pt-24">
        <Reveal delay={0.2}>
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
            <span className="text-xs tracking-[0.25em] uppercase text-white/80">Trusted Manufacturer · Since 1989</span>
          </div>
        </Reveal>

        <Reveal delay={0.35}>
          <h1 className="font-display font-black text-[clamp(2.8rem,7.5vw,6.5rem)] leading-[0.95] tracking-tight max-w-5xl">
            <span className="text-metallic">Precision Components</span>
            <br />
            <span className="text-white">That Drive </span>
            <span className="text-gold italic font-light">Industry</span>
            <br />
            <span className="text-white">Forward.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.55}>
          <p className="mt-8 max-w-xl text-lg text-white/65 font-light leading-relaxed">
            Manufacturing high-quality bushes, pins, bolts and engineering components
            from Pune, Maharashtra — built to spec, delivered on time, trusted since 1989.
          </p>
        </Reveal>

        <Reveal delay={0.75}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton variant="gold" href="#products">
              Explore Products <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton variant="ghost" href="#contact">
              Get a Quote
            </MagneticButton>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
            <span className="text-[10px] tracking-[0.35em] uppercase">Scroll</span>
            <ChevronDown className="h-4 w-4 animate-bounce" />
          </div>
        </Reveal>
      </motion.div>
    </section>
  );
}

function MarqueeStrip() {
  const items = ["PRECISION BUSHES", "GUIDE PINS", "DOWEL PINS", "METAL BOLTS", "PISTON RODS", "CUSTOM ENGINEERING", "ISO QUALITY", "SINCE 1989"];
  return (
    <div className="relative border-y border-white/5 bg-surface/50 overflow-hidden py-6">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((s, i) => (
          <span key={i} className="mx-10 inline-flex items-center gap-10 font-display font-black text-2xl md:text-3xl text-metallic">
            {s}
            <span className="text-[var(--gold)]">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Reveal>
              <span className="text-xs tracking-[0.3em] uppercase text-[var(--gold)]">About Us</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-4 font-display font-black text-5xl md:text-6xl leading-[1] text-metallic">
                Engineering Excellence Since <span className="text-gold">1989</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 space-y-5 text-white/70 font-light text-lg leading-relaxed">
                <p>
                  Vikas Engineering Works is a leading manufacturer of precision-engineered
                  industrial components based in Pune, Maharashtra.
                </p>
                <p>
                  For over three decades we have delivered superior-quality guide pins,
                  bushes, metal bolts, dowel pins, piston rods and custom-machined products
                  for diverse industrial applications.
                </p>
                <p className="text-white/85">
                  Founded by <span className="text-[var(--gold)] font-medium">Shivaji Tidake</span>,
                  our commitment to quality, precision machining and customer satisfaction has
                  made us a trusted manufacturing partner.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {[
              { v: 38, s: "+", l: "Years of Excellence" },
              { v: 50, s: "+", l: "Projects Completed" },
              { v: 100, s: "+", l: "Clients Served" },
              { v: 8, s: "+", l: "Product Categories" },
            ].map((s, i) => (
              <Reveal key={s.l} delay={i * 0.1}>
                <div className="glass rounded-2xl p-8 group hover:border-[var(--gold)]/30 transition-colors">
                  <div className="font-display font-black text-5xl md:text-6xl text-gold">
                    <Counter to={s.v} suffix={s.s} />
                  </div>
                  <div className="mt-3 text-xs tracking-[0.25em] uppercase text-white/60">{s.l}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ p, onOpen }: { p: Product; onOpen: () => void }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative glass rounded-2xl overflow-hidden shine cursor-pointer"
      onClick={onOpen}
    >
      <div className="absolute inset-px rounded-2xl bg-gradient-to-br from-[var(--gold)]/0 via-white/0 to-[var(--copper)]/0 group-hover:from-[var(--gold)]/30 group-hover:via-transparent group-hover:to-[var(--copper)]/20 transition-all duration-500 pointer-events-none" />
      <div className="relative aspect-square overflow-hidden bg-black">
        <img
          src={p.image} alt={p.name} loading="lazy" width={800} height={800}
          className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="shine-overlay group-hover:[transform:translateX(120%)]" />
      </div>
      <div className="relative p-6">
        <h3 className="font-display font-bold text-xl text-white">{p.name}</h3>
        <p className="mt-2 text-sm text-white/55 line-clamp-2">{p.description}</p>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold)]">Quick View</span>
          <ArrowRight className="h-4 w-4 text-white/60 group-hover:text-[var(--gold)] group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </motion.div>
  );
}

function Products({ onOpen }: { onOpen: (p: Product) => void }) {
  return (
    <section id="products" className="relative py-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <Reveal>
              <span className="text-xs tracking-[0.3em] uppercase text-[var(--gold)]">Our Products</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-3 font-display font-black text-5xl md:text-6xl leading-[1] text-metallic max-w-2xl">
                Engineered to Exact <span className="text-gold">Specification</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-md text-white/55 font-light">
              Eight core product categories — every piece machined, inspected and finished in-house at our Pune facility.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.06}>
              <ProductCard p={p} onOpen={() => onOpen(p)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductModal({ p, onClose }: { p: Product | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {p && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-xl grid place-items-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 30, opacity: 0 }}
            transition={{ type: "spring", damping: 22, stiffness: 220 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl glass rounded-3xl overflow-hidden grid md:grid-cols-2"
          >
            <button onClick={onClose} className="absolute right-4 top-4 z-10 h-10 w-10 rounded-full glass grid place-items-center hover:bg-white/10 transition">
              <X className="h-5 w-5 text-white" />
            </button>
            <div className="aspect-square md:aspect-auto bg-black relative overflow-hidden">
              <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/40" />
            </div>
            <div className="p-8 md:p-10 max-h-[80vh] overflow-y-auto">
              <span className="text-xs tracking-[0.3em] uppercase text-[var(--gold)]">Product Detail</span>
              <h3 className="mt-3 font-display font-black text-4xl text-white">{p.name}</h3>
              <p className="mt-4 text-white/70 leading-relaxed">{p.description}</p>
              <dl className="mt-8 space-y-5">
                {[["Material", p.material], ["Applications", p.applications], ["Dimensions", p.dimensions]].map(([k, v]) => (
                  <div key={k} className="border-t border-white/10 pt-4">
                    <dt className="text-[10px] tracking-[0.3em] uppercase text-white/50">{k}</dt>
                    <dd className="mt-1.5 text-white/90">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8">
                <MagneticButton variant="gold" href="#contact" onClick={onClose}>
                  Request Quote <ArrowRight className="h-4 w-4" />
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Infrastructure() {
  return (
    <section id="infra" className="relative py-32 bg-surface/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Reveal><span className="text-xs tracking-[0.3em] uppercase text-[var(--gold)]">Infrastructure</span></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 font-display font-black text-5xl md:text-6xl leading-[1] text-metallic">
              Inside Our <span className="text-gold">Facility</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-white/60 font-light">
              Modern CNC machinery, dedicated inspection areas and skilled craftsmen — all under one roof in Pune.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {INFRA.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.07}>
              <div className="group relative overflow-hidden rounded-2xl glass aspect-[4/3]">
                <img src={it.image} alt={it.title} loading="lazy" width={1200} height={800}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold)]/0 to-[var(--copper)]/0 group-hover:from-[var(--gold)]/10 group-hover:to-[var(--copper)]/20 transition-all duration-500 mix-blend-overlay" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--gold)]">0{i + 1}</span>
                  <h3 className="mt-1 font-display font-bold text-2xl text-white">{it.title}</h3>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 [background:var(--gradient-radial-glow)] opacity-60" />
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <Reveal><span className="text-xs tracking-[0.3em] uppercase text-[var(--gold)]">Why Choose Us</span></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 font-display font-black text-5xl md:text-6xl text-metallic">
              The Vikas <span className="text-gold">Advantage</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHY_US.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -6 }}
                className="group relative glass rounded-2xl p-7 h-full overflow-hidden hover:border-[var(--gold)]/30 transition-colors"
              >
                <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                     style={{ background: "linear-gradient(135deg, rgba(212,175,55,0.25), transparent 60%)" }} />
                <div className="relative">
                  <div className="h-12 w-12 grid place-items-center rounded-xl bg-gradient-to-br from-[var(--gold)]/20 to-[var(--copper)]/10 border border-[var(--gold)]/20">
                    <f.icon className="h-6 w-6 text-[var(--gold)]" />
                  </div>
                  <h3 className="mt-5 font-display font-bold text-lg text-white">{f.title}</h3>
                  <p className="mt-2 text-sm text-white/55 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Industries() {
  return (
    <section className="relative py-28 bg-surface/40">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <Reveal><span className="text-xs tracking-[0.3em] uppercase text-[var(--gold)]">Industries Served</span></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 font-display font-black text-4xl md:text-5xl text-metallic">
              Trusted Across <span className="text-gold">Industries</span>
            </h2>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind} delay={i * 0.05}>
              <motion.div
                whileHover={{ scale: 1.04, y: -4 }}
                className="glass rounded-2xl p-6 text-center group hover:border-[var(--gold)]/40 transition-colors"
              >
                <Factory className="h-7 w-7 mx-auto text-[var(--gold)] group-hover:rotate-12 transition-transform" />
                <div className="mt-4 text-sm font-medium text-white/85">{ind}</div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="relative py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <Reveal><span className="text-xs tracking-[0.3em] uppercase text-[var(--gold)]">Our Process</span></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 font-display font-black text-5xl md:text-6xl text-metallic">
              From Spec to <span className="text-gold">Delivery</span>
            </h2>
          </Reveal>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/40 to-transparent" />
          <div className="grid md:grid-cols-5 gap-8">
            {PROCESS_STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1}>
                <div className="text-center">
                  <div className="relative mx-auto h-16 w-16 grid place-items-center rounded-full glass border-[var(--gold)]/30 group">
                    <span className="font-display font-black text-lg text-gold">{s.n}</span>
                    <div className="absolute inset-0 rounded-full ring-1 ring-[var(--gold)]/0 group-hover:ring-[var(--gold)]/60 transition-all" />
                  </div>
                  <h3 className="mt-5 font-display font-bold text-white">{s.title}</h3>
                  <p className="mt-2 text-sm text-white/55 leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="relative py-32 bg-surface/40 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal><span className="text-xs tracking-[0.3em] uppercase text-[var(--gold)]">Leadership</span></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 font-display font-black text-5xl md:text-6xl text-metallic">
              A Message from Our <span className="text-gold">Leaders</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-6 md:gap-8">
          {LEADERSHIP.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="relative h-full glass rounded-3xl p-8 md:p-10 overflow-hidden group"
              >
                <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-[var(--gold)]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <Star className="h-6 w-6 text-[var(--gold)] opacity-60" />
                  <p className="mt-5 text-base md:text-lg text-white/85 font-light italic leading-relaxed">
                    "{p.message}"
                  </p>
                  <div className="mt-8 flex items-center gap-4 pt-6 border-t border-white/10">
                    <div className="h-12 w-12 grid place-items-center rounded-full bg-gold-gradient text-black font-display font-black">
                      {p.initials}
                    </div>
                    <div>
                      <div className="font-display font-bold text-white">{p.name}</div>
                      <div className="text-sm text-[var(--gold)]">{p.role}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HappyCustomers() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 [background:var(--gradient-radial-glow)] opacity-40" />
      <div className="container mx-auto px-6 max-w-6xl relative">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal><span className="text-xs tracking-[0.3em] uppercase text-[var(--gold)]">Our Clients</span></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 font-display font-black text-5xl md:text-6xl text-metallic">
              Trusted by India's <span className="text-gold">Industry Leaders</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 text-white/70 max-w-2xl mx-auto">
              From global forging giants to specialised automotive and engineering houses — our components run on their floors every single day.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {CUSTOMERS.map((c, i) => (
            <Reveal key={c} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                className="group relative h-full glass rounded-2xl p-6 flex items-center gap-3 border border-white/10 hover:border-[var(--gold)]/40 transition-colors"
              >
                <div className="h-10 w-10 shrink-0 grid place-items-center rounded-xl bg-gold-gradient text-black">
                  <Handshake className="h-5 w-5" />
                </div>
                <div className="font-display font-semibold text-white text-sm md:text-base leading-snug">
                  {c}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Machines() {
  return (
    <section id="machines" className="relative py-32 bg-surface/40 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal><span className="text-xs tracking-[0.3em] uppercase text-[var(--gold)]">Production Floor</span></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 font-display font-black text-5xl md:text-6xl text-metallic">
              Our <span className="text-gold">Machinery</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 text-white/70 max-w-2xl mx-auto">
              A fully equipped CNC, turning, milling and grinding shop — calibrated, maintained and ready for tight-tolerance work.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MACHINES.map((m, i) => (
            <Reveal key={m.name + i} delay={i * 0.04}>
              <motion.div
                whileHover={{ y: -4 }}
                className="group relative h-full glass rounded-2xl p-6 border border-white/10 hover:border-[var(--gold)]/40 transition-colors overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[var(--gold)]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <div className="h-11 w-11 grid place-items-center rounded-xl bg-white/5 border border-white/10 text-[var(--gold)]">
                      <Cpu className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] tracking-[0.25em] uppercase text-white/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display font-bold text-lg text-white leading-snug">
                    {m.name}
                  </h3>
                  {m.make && m.make !== "—" && (
                    <div className="mt-1 text-xs uppercase tracking-[0.2em] text-[var(--gold)]/90">
                      {m.make}
                    </div>
                  )}
                  <p className="mt-3 text-sm text-white/70 leading-relaxed">{m.spec}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}



function Contact() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    (e.target as HTMLFormElement).reset();
  };
  return (
    <section id="contact" className="relative py-32">
      <div className="absolute inset-0 [background:var(--gradient-radial-glow)] opacity-50" />
      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-14">
          <div>
            <Reveal><span className="text-xs tracking-[0.3em] uppercase text-[var(--gold)]">Contact Us</span></Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-3 font-display font-black text-5xl md:text-6xl text-metallic leading-[1]">
                Let's Engineer <span className="text-gold">Together</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-white/65 font-light text-lg">
                Send us your drawings or describe what you need — we'll get back with a quote and lead time.
              </p>
            </Reveal>

            <div className="mt-10 space-y-5">
              <a href="tel:+910000000000" className="flex items-start gap-4 glass rounded-2xl p-5 hover:border-[var(--gold)]/30 transition-colors group">
                <div className="h-11 w-11 grid place-items-center rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/30">
                  <Phone className="h-5 w-5 text-[var(--gold)]" />
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-white/50">Call Now</div>
                  <div className="mt-1 font-medium text-white">Speak to our team</div>
                </div>
              </a>
              <a href="https://wa.me/910000000000" className="flex items-start gap-4 glass rounded-2xl p-5 hover:border-[var(--gold)]/30 transition-colors group">
                <div className="h-11 w-11 grid place-items-center rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/30">
                  <MessageCircle className="h-5 w-5 text-[var(--gold)]" />
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-white/50">WhatsApp Quote</div>
                  <div className="mt-1 font-medium text-white">Quick reply, photos welcome</div>
                </div>
              </a>
              <a href="mailto:contact@vikasengineering.in" className="flex items-start gap-4 glass rounded-2xl p-5 hover:border-[var(--gold)]/30 transition-colors group">
                <div className="h-11 w-11 grid place-items-center rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/30">
                  <Mail className="h-5 w-5 text-[var(--gold)]" />
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-white/50">Email Us</div>
                  <div className="mt-1 font-medium text-white">contact@vikasengineering.in</div>
                </div>
              </a>
              <div className="flex items-start gap-4 glass rounded-2xl p-5">
                <div className="h-11 w-11 grid place-items-center rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/30">
                  <MapPin className="h-5 w-5 text-[var(--gold)]" />
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-white/50">Visit Us</div>
                  <div className="mt-1 text-white/85 leading-relaxed">
                    Opposite Savali Dhaba, Sinhagad Road,<br />
                    Nanded Phata, Pune, Maharashtra 411068
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Reveal delay={0.2}>
            <form onSubmit={onSubmit} className="glass rounded-3xl p-8 md:p-10 space-y-5">
              <h3 className="font-display font-bold text-2xl text-white">Request a Quote</h3>
              {[
                { id: "name", label: "Full Name", type: "text", required: true },
                { id: "email", label: "Email", type: "email", required: true },
                { id: "phone", label: "Phone", type: "tel", required: false },
                { id: "product", label: "Product Requirement", type: "text", required: true },
              ].map((f) => (
                <div key={f.id}>
                  <label htmlFor={f.id} className="text-[10px] tracking-[0.3em] uppercase text-white/50">{f.label}</label>
                  <input
                    id={f.id} name={f.id} type={f.type} required={f.required}
                    className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--gold)]/60 focus:ring-2 focus:ring-[var(--gold)]/20 transition"
                    placeholder=" "
                  />
                </div>
              ))}
              <div>
                <label htmlFor="msg" className="text-[10px] tracking-[0.3em] uppercase text-white/50">Message</label>
                <textarea
                  id="msg" name="msg" rows={4}
                  className="mt-2 w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--gold)]/60 focus:ring-2 focus:ring-[var(--gold)]/20 transition resize-none"
                  placeholder="Tell us about your requirement, quantities, drawings..."
                />
              </div>
              <div className="pt-2">
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="sent"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="inline-flex items-center gap-2 text-[var(--gold)] font-medium"
                    >
                      <CheckCircle2 className="h-5 w-5" /> Thanks — we'll be in touch shortly.
                    </motion.div>
                  ) : (
                    <motion.div key="btn" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <MagneticButton variant="gold" type="submit">
                        Send Request <Zap className="h-4 w-4" />
                      </MagneticButton>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <div className="mt-16 rounded-3xl overflow-hidden glass aspect-[16/7]">
            <iframe
              title="Vikas Engineering Works location"
              src="https://www.google.com/maps?q=Nanded+Phata,+Sinhagad+Road,+Pune,+Maharashtra+411068&output=embed"
              className="w-full h-full grayscale-[0.6] contrast-125"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-surface/60 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 grid place-items-center rounded-md bg-gradient-to-br from-[var(--gold)] to-[var(--copper)]">
                <Cog className="h-5 w-5 text-black" />
              </div>
              <div className="font-display font-extrabold tracking-widest text-white">VIKAS ENGINEERING WORKS</div>
            </div>
            <p className="mt-5 text-white/55 font-light max-w-md">
              Precision Engineering. Trusted Manufacturing Since 1989. Manufacturers of bushes,
              pins, bolts and custom engineering components from Pune, Maharashtra.
            </p>
          </div>
          <div>
            <div className="text-xs tracking-[0.3em] uppercase text-[var(--gold)] mb-4">Quick Links</div>
            <ul className="space-y-2 text-white/65">
              <li><a href="#about" className="hover:text-white">About</a></li>
              <li><a href="#products" className="hover:text-white">Products</a></li>
              <li><a href="#infra" className="hover:text-white">Infrastructure</a></li>
              <li><a href="#process" className="hover:text-white">Process</a></li>
              <li><a href="#contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <div className="text-xs tracking-[0.3em] uppercase text-[var(--gold)] mb-4">Contact</div>
            <address className="not-italic text-white/65 leading-relaxed">
              Near Savali Dhaba,<br />
              Sinhagad Road, Nanded Phata,<br />
              Pune, Maharashtra 411068<br />
              <a href="mailto:contact@vikasengineering.in" className="hover:text-white">contact@vikasengineering.in</a>
            </address>
          </div>
        </div>
        <div className="mt-14 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between gap-3 text-xs text-white/40">
          <div>© {new Date().getFullYear()} Vikas Engineering Works. All rights reserved.</div>
          <a href="#top" className="hover:text-[var(--gold)] inline-flex items-center gap-1">
            Back to top <ChevronDown className="h-3 w-3 rotate-180" />
          </a>
        </div>
      </div>
    </footer>
  );
}

/* =================== LOADER =================== */

function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let p = 0;
    const t = setInterval(() => {
      p = Math.min(100, p + Math.random() * 12 + 4);
      setProgress(p);
      if (p >= 100) {
        clearInterval(t);
        setTimeout(onDone, 600);
      }
    }, 120);
    return () => clearInterval(t);
  }, [onDone]);
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[200] bg-background grid place-items-center"
    >
      <Sparks />
      <div className="text-center px-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="font-display font-black text-4xl md:text-6xl tracking-tight text-metallic">
            VIKAS ENGINEERING
          </div>
          <div className="mt-2 text-xs md:text-sm tracking-[0.5em] text-[var(--gold)]">WORKS · EST. 1989</div>
        </motion.div>
        <div className="mt-10 mx-auto w-64 h-px bg-white/10 overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-[var(--gold)] to-[var(--copper)]" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-3 text-[10px] tracking-[0.4em] text-white/40">{Math.floor(progress)}%</div>
      </div>
    </motion.div>
  );
}

/* =================== PAGE =================== */

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vikas Engineering Works — Precision Bushes, Pins & Engineering Components, Pune" },
      { name: "description", content: "Trusted manufacturer of precision bushes, guide pins, dowel pins, metal bolts & piston rods in Pune, Maharashtra since 1989." },
    ],
  }),
  component: Home,
});

function Home() {
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<Product | null>(null);

  return (
    <main className="relative bg-background text-white">
      <AnimatePresence>{loading && <Loader onDone={() => setLoading(false)} />}</AnimatePresence>
      <Nav />
      <Hero />
      <MarqueeStrip />
      <About />
      <Products onOpen={setActive} />
      <Infrastructure />
      <WhyUs />
      <Industries />
      <Process />
      <Testimonials />
      <HappyCustomers />
      <Machines />
      <Contact />
      <Footer />
      <ProductModal p={active} onClose={() => setActive(null)} />
    </main>
  );
}
