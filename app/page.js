import Image from "next/image";
import ZoomableImage from "./components/zoomable-image";
import ContactForm from "./components/contact-form";
import SmoothLink from "./components/smooth-link";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#process", label: "Process" },
  { href: "#packages", label: "Packages" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

const services = [
  {
    icon: "🍳",
    title: "Modular Kitchens",
    copy:
      "L-shape, U-shape, island and parallel layouts with ergonomic work triangles.",
    bullets: [
      "Chimney & appliance integration",
      "Soft-close channels & hinges",
      "Easy-clean surface options",
    ],
  },
  {
    icon: "🧥",
    title: "Wardrobes & Walk-ins",
    copy:
      "Custom internal planning: hanging, shelves, drawers, accessories and lights.",
    bullets: [
      "Sliding / hinged / glass shutters",
      "Motion-sensor lighting",
      "His & her compartments",
    ],
  },
  {
    icon: "📺",
    title: "TV Panels & Wall Units",
    copy:
      "Modern paneling with warm ambient lighting and clean cable management.",
    bullets: [
      "Hidden wiring routes",
      "Open shelves + closed storage",
      "Stone/wood textured panels",
    ],
  },
  {
    icon: "🛁",
    title: "Vanities & Bathrooms",
    copy:
      "Hotel-style vanity units with premium basins, mirrors and soft illumination.",
    bullets: [
      "Ring-mirror options",
      "Water-resistant materials",
      "Minimalist fixtures",
    ],
  },
];

const projects = [
  {
    src: "/images/living-room-slat-wall.png",
    alt: "Modern living room wall with slat panel and shelving",
    caption: "Living room wall units",
    wide: true,
    width: 1024,
    height: 1024,
  },
  {
    src: "/images/vanity-bathroom.jpeg",
    alt: "Bathroom vanity with ring mirror and warm lights",
    caption: "Bathroom vanity",
    wide: false,
    width: 853,
    height: 1280,
  },
  {
    src: "/images/mod-Kit-wide-white.png",
    alt: "Luxury modular kitchen with island counter and ambient lighting",
    caption: "Island kitchen — premium ambience",
    wide: true,
    width: 1024,
    height: 1536,
  },
  {
    src: "/images/mod-kit-d-view.png",
    alt: "Modern modular kitchen interior with clean storage and premium finishes",
    caption: "Modular kitchen — clean storage",
    width: 1024,
    height: 1024,
  },
  {
    src: "/images/living-room-wall-unit.png",
    alt: "Large wall unit with TV, shelves and warm ambient lighting",
    caption: "TV panels with ambient glow",
    wide: true,
    width: 1536,
    height: 1024,
  },
  {
    src: "/images/vanity-ring-mirror.png",
    alt: "Minimal vanity setup with circular backlit mirror",
    caption: "Backlit mirrors",
    width: 1024,
    height: 1536,
  },
];

const steps = [
  { num: "1", title: "Consultation", copy: "We understand your needs, budget, and style preferences." },
  { num: "2", title: "3D Design", copy: "We share detailed renders + material options for finalization." },
  {
    num: "3",
    title: "Manufacturing",
    copy: "Precision build with quality checks and hardware fitment.",
  },
  {
    num: "4",
    title: "Installation",
    copy: "Professional onsite work, cleanup, and final handover.",
  },
];

const packages = [
  {
    title: "Essential",
    subtitle: "Best for practical upgrades",
    bullets: [
      "Standard laminate finishes",
      "Basic accessories",
      "Modular storage planning",
    ],
    cta: "Get estimate",
    featured: false,
  },
  {
    title: "Signature",
    subtitle: "Luxury look + smart storage",
    bullets: [
      "Premium laminates / acrylic",
      "Soft-close hardware",
      "Warm ambient lighting",
    ],
    cta: "Book free visit",
    featured: true,
  },
  {
    title: "Elite",
    subtitle: "For high-end custom homes",
    bullets: [
      "Imported finish options",
      "Designer handle profiles",
      "Luxury fittings + upgrades",
    ],
    cta: "Talk to designer",
    featured: false,
  },
];

const testimonials = [
  {
    copy:
      "“The TV panel lighting looks exactly like the render. Installation was clean and on time.”",
    author: "Rohit • Noida",
  },
  {
    copy:
      "“Wardrobe planning was super smart — every inch has a purpose. Premium hardware.”",
    author: "Neha • Gurgaon",
  },
  {
    copy:
      "“Loved the vanity and ring mirror. It feels like a hotel bathroom now.”",
    author: "Aman • Delhi",
  },
];

const heroMedia = [
  {
    src: "/images/TV-panel.png",
    alt: "Modern TV panel with warm ambient lighting",
    caption: "TV Panels that transform walls into experiences",
    width: 1024,
    height: 1536,
    badge: "Signature",
    tall: true,
  },
  {
    src: "/images/bathroom-black-marble.png",
    alt: "Luxury black marble bathroom with warm lighting",
    width: 1024,
    height: 1024,
  },
  {
    src: "/images/walkin-closet-dark.png",
    alt: "Dark walk-in wardrobe with built-in lighting",
    width: 1024,
    height: 1536,
  },
];

const miniGallery = [
  {
    src: "/images/tv-panel-amber-glow.png",
    alt: "TV panel glow",
    width: 1024,
    height: 1024,
  },
  {
    src: "/images/walkin-closet-modern.png",
    alt: "Walk-in wardrobe",
    width: 1536,
    height: 1024,
  },
  {
    src: "/images/bathroom-ring-mirror.png",
    alt: "Vanity ring mirror",
    width: 1024,
    height: 1024,
  },
];

export default function HomePage() {
  const year = new Date().getFullYear();

  return (
    <>
      <div className="topbar">
        <div className="container topbar__inner">
          <span className="topbar__tag">Luxury Interiors</span>
          <p className="topbar__text">
            Free design consultation • Transparent pricing • On-time installation
          </p>
          <SmoothLink className="topbar__link" href="#contact">
            Get a Quote
          </SmoothLink>
        </div>
      </div>

      <header className="header" id="home">
        <div className="container header__inner">
          <SmoothLink className="logo" href="#home" aria-label="cresta360 Interiors">
            <span className="logo__mark logo__mark--img">
              <Image
                className="logo__img"
                src="/images/cresta360_logo_bg_removed_cropped.png"
                alt="Cresta360 logo"
                width={855}
                height={261}
                priority
              />
            </span>
            <span className="logo__text" aria-hidden="true" />
          </SmoothLink>

          <input className="nav-toggle" type="checkbox" id="navToggle" aria-label="Open menu" />
          <label className="hamburger" htmlFor="navToggle" aria-hidden="true">
            <span />
            <span />
            <span />
          </label>

          <nav className="nav" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <SmoothLink key={link.label} href={link.href}>
                {link.label}
              </SmoothLink>
            ))}
            <SmoothLink className="btn btn--primary nav__cta" href="#contact">
              Book Free Visit
            </SmoothLink>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" aria-label="Hero">
          <div className="container hero__grid">
            <div className="hero__content">
              <p className="eyebrow">
                <span className="dot" /> Modular Kitchens • Wardrobes • TV Panels • Bath Vanities
              </p>

              <h1 className="hero__title">
                Make your home feel <span className="gold">premium</span> — with craftsmanship you can see.
              </h1>

              <p className="hero__subtitle">
                End-to-end interiors: design, manufacturing and installation. A luxury theme, clean storage,
                and smart layouts tailored to your space.
              </p>

              <div className="hero__actions">
                <SmoothLink className="btn btn--primary" href="#contact">
                  Get Free Design
                </SmoothLink>
                <SmoothLink className="btn btn--ghost" href="#projects">
                  View Portfolio
                </SmoothLink>
              </div>

              <div className="hero__trust">
                <div className="trust">
                  <strong>10+ yrs</strong>
                  <span>Experience</span>
                </div>
                <div className="trust">
                  <strong>4.8★</strong>
                  <span>Customer rating</span>
                </div>
                <div className="trust">
                  <strong>45 days</strong>
                  <span>Typical delivery</span>
                </div>
              </div>
            </div>

            <div className="hero__media" aria-label="Featured interiors">
              <div className="media-card media-card--tall">
                <Image
                  src={heroMedia[0].src}
                  alt={heroMedia[0].alt}
                  width={heroMedia[0].width}
                  height={heroMedia[0].height}
                  priority
                />
                <div className="media-card__caption">
                  <span className="badge">{heroMedia[0].badge}</span>
                  <p>{heroMedia[0].caption}</p>
                </div>
              </div>

              <div className="media-stack">
                {heroMedia.slice(1).map((media) => (
                  <div className="media-card" key={media.src}>
                    <Image
                      src={media.src}
                      alt={media.alt}
                      width={media.width}
                      height={media.height}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="hero__fade" aria-hidden="true" />
        </section>

        <section className="strip" aria-label="Highlights">
          <div className="container strip__grid">
            <div className="strip__item">
              <h3>Space-smart storage</h3>
              <p>Hidden drawers, tall units and clutter-free layouts for everyday comfort.</p>
            </div>
            <div className="strip__item">
              <h3>Premium finishes</h3>
              <p>Wood textures, marble looks, soft lighting and elegant hardware.</p>
            </div>
            <div className="strip__item">
              <h3>End-to-end execution</h3>
              <p>One team, one timeline — from 3D design to final handover.</p>
            </div>
          </div>
        </section>

        <section className="section" id="services">
          <div className="container">
            <div className="section__head">
              <h2>What we build</h2>
              <p>High-impact interiors that look luxurious and feel effortless to use.</p>
            </div>

            <div className="cards">
              {services.map((service) => (
                <article className="card" key={service.title}>
                  <div className="card__icon" aria-hidden="true">
                    {service.icon}
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                  <ul className="checklist">
                    {service.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--alt" id="projects">
          <div className="container">
            <div className="section__head">
              <h2>Featured projects</h2>
              <p>A luxury palette: warm light, bold textures, and clean geometry.</p>
            </div>

            <div className="gallery">
              {projects.map((project) => (
                <figure key={project.src} className="gallery__item">
                  <ZoomableImage
                    src={project.src}
                    alt={project.alt}
                    width={project.width}
                    height={project.height}
                    sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
                  />
                  <figcaption>{project.caption}</figcaption>
                </figure>
              ))}
            </div>

            <div className="center">
              <SmoothLink className="btn btn--ghost" href="#contact">
                Request similar design
              </SmoothLink>
            </div>
          </div>
        </section>

        <section className="section" id="process">
          <div className="container">
            <div className="section__head">
              <h2>Our simple process</h2>
              <p>Clear steps, predictable timelines, and a smooth experience.</p>
            </div>

            <div className="steps">
              {steps.map((step) => (
                <div className="step" key={step.num}>
                  <div className="step__num">{step.num}</div>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--alt" id="packages">
          <div className="container">
            <div className="section__head">
              <h2>Packages</h2>
              <p>Choose a finish level — we’ll customize it to your layout.</p>
            </div>

            <div className="pricing">
              {packages.map((pkg) => (
                <article
                  key={pkg.title}
                  className={`price${pkg.featured ? " price--featured" : ""}`}
                >
                  {pkg.featured && <div className="price__badge">Most Popular</div>}
                  <div className="price__head">
                    <h3>{pkg.title}</h3>
                    <p className="muted">{pkg.subtitle}</p>
                  </div>
                  <ul className="checklist checklist--compact">
                    {pkg.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <SmoothLink className={`btn ${pkg.featured ? "btn--primary" : "btn--ghost"}`} href="#contact">
                    {pkg.cta}
                  </SmoothLink>
                </article>
              ))}
            </div>

            <p className="fineprint">
              *Indicative pricing. Final cost depends on size, material selections and accessories.
            </p>
          </div>
        </section>

        <section className="section" id="testimonials">
          <div className="container">
            <div className="section__head">
              <h2>Customer reviews</h2>
              <p>What people love most: the finish quality and the smooth execution.</p>
            </div>

            <div className="quotes">
              {testimonials.map((quote) => (
                <figure className="quote" key={quote.author}>
                  <blockquote>{quote.copy}</blockquote>
                  <figcaption>
                    <strong>{quote.author.split("•")[0].trim()}</strong> •{" "}
                    {quote.author.split("•")[1].trim()}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="cta" aria-label="Call to action">
          <div className="container cta__inner">
            <div className="cta__text">
              <h2>Want a similar premium look?</h2>
              <p>Share your room size, we’ll propose a layout, finish palette and rough estimate.</p>
            </div>
            <div className="cta__actions">
              <SmoothLink className="btn btn--primary" href="#contact">
                Get Free Quote
              </SmoothLink>
              <SmoothLink className="btn btn--ghost" href="#contact">
                WhatsApp Us
              </SmoothLink>
            </div>
          </div>
        </section>

        <section className="section section--alt" id="contact">
          <div className="container">
            <div className="section__head">
              <h2>Get a free quote</h2>
              <p>Fill the form and we’ll call you within 24 hours.</p>
            </div>

            <div className="contact">
              <ContactForm />

              <aside className="contact__card" aria-label="Business info">
                <h3>Schedule a visit</h3>
                <p className="muted">
                  Book a free on-site visit, we’ll measure, understand your requirements, and share a design plan.
                </p>

                <div className="info">
                  <div className="info__item">
                    <span className="info__label">Phone</span>
                    <span className="info__value">+91 7303228393 , +91 9220323399</span>
                  </div>
                  <div className="info__item">
                    <span className="info__label">Email</span>
                    <span className="info__value">Officialcresta360@gmail.com</span>
                  </div>
                  <div className="info__item">
                    <span className="info__label">Availability</span>
                    <span className="info__value">Mon–Sun • 10am–7pm</span>
                  </div>
                </div>

                <div className="mini-gallery" aria-label="More visuals">
                  {miniGallery.map((media) => (
                    <ZoomableImage
                      key={media.src}
                      src={media.src}
                      alt={media.alt}
                      width={media.width}
                      height={media.height}
                      loading="lazy"
                    />
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__grid">
          <div className="footer__brand">
            <div className="logo logo--footer">
              <span className="logo__mark logo__mark--img">
                <Image
                  className="logo__img"
                  src="/images/cresta360_logo_bg_removed_cropped.png"
                  alt="Cresta360 logo"
                  width={855}
                  height={261}
                />
              </span>
            </div>
            <p className="muted">
              Premium modular interiors with warm lighting, intelligent storage and luxury finishes.
            </p>
          </div>

          <div className="footer__col">
            <h4>Quick links</h4>
            {["Services", "Projects", "Packages", "Contact"].map((item) => (
              <SmoothLink key={item} href={`#${item.toLowerCase()}`}>
                {item}
              </SmoothLink>
            ))}
          </div>

          <div className="footer__col">
            <h4>Services</h4>
            <SmoothLink href="#services">Modular kitchens</SmoothLink>
            <SmoothLink href="#services">Wardrobes</SmoothLink>
            <SmoothLink href="#services">TV panels</SmoothLink>
            <SmoothLink href="#services">Vanities</SmoothLink>
          </div>

          <div className="footer__col">
            <h4>Get in touch</h4>
            <p className="muted">Noida • Delhi • Gurgaon</p>
            <p className="muted">7303228393,9220323399</p>
            <p className="muted">Officialcresta360@gmail.com</p>
          </div>
        </div>

        <div className="container footer__bottom">
          <p>© {year} cresta360 Interiors. All rights reserved.</p>
          <p className="muted">Designed for a premium modular interiors business.</p>
        </div>
      </footer>
    </>
  );
}
