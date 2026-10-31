import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowUpRight, ArrowRight, Plus, Minus } from "lucide-react";
import Media from "./components/Media";
import { Enquire } from "./components/Layout";
import ProjectViewer from "./components/ProjectViewer";
import Home from "./Home";
export { Home };
import Locations from "./components/Locations";
import {
  brand,
  deckSelections,
  locations,
  collections,
  projects,
  brandFilm,
  contact,
} from "./data/site";
function Title({ title, children, eyebrow }) {
  useEffect(() => {
    document.title = `${title} — GVK Decor`;
  }, [title]);
  return (
    <section className="page-intro" data-reveal>
      <p className="eyebrow">{eyebrow || "GVK Decor · Hyderabad"}</p>
      <h1>{title}</h1>
      <p className="intro-copy">{children}</p>
    </section>
  );
}
export function Legacy() {
  return (
    <>
      <Title
        title="A legacy, thoughtfully woven."
        eyebrow="Our Legacy · Established 1959"
      >
        {brand.tagline}. Visit GVK Decor in Jubilee Hills and Secunderabad,
        Hyderabad.
      </Title>
      <section className="legacy-banner">
        <div className="legacy-number">
          1959<span>WHERE OUR STORY BEGAN</span>
        </div>
        <div>
          <p className="eyebrow">GVK DECOR</p>
          <h2>
            Gunda Venkateshwar Rao.
            <br />
            <em>The name behind GVK.</em>
          </h2>
          <p>
            Established in 1959, GVK Decor specialises in designer curtains,
            blinds, wallpapers, upholstery, bedding, headboards and exclusive
            custom furnishings. Our Hyderabad locations are the Jubilee Hills
            Experience Centre and the Secunderabad store.
          </p>
        </div>
      </section>
      <section className="section philosophy">
        <p className="eyebrow">WHAT WE BELIEVE</p>
        <div>
          <h2>
            Beautiful things.
            <br />
            <em>Lasting meaning.</em>
          </h2>
          <p className="wide-copy">
            Consider curtains with upholstery, wallpapers with bedding, and
            headboards with the furnishings around them. Bring your plans or
            material references to the Experience Centre to discuss your space
            with GVK Decor.
          </p>
          <Enquire />
        </div>
      </section>
      <section className="values section" data-reveal>
        {[
          [
            "01",
            "A personal perspective",
            "We begin with your space, your ideas and the way you want to live.",
          ],
          [
            "02",
            "A feel for materials",
            "Colour, texture, weight and light guide a thoughtful selection.",
          ],
          [
            "03",
            "An eye for the whole",
            "Each furnishing is considered as part of the larger story of your home.",
          ],
        ].map(([n, t, d]) => (
          <article key={n}>
            <p className="eyebrow">{n}</p>
            <h3>{t}</h3>
            <p>{d}</p>
          </article>
        ))}
      </section>
    </>
  );
}
export function Collections() {
  return (
    <>
      <Title title="A language of texture." eyebrow="The Collections">
        Explore designer curtains, blinds, wallpapers, upholstery, bedding,
        headboards and exclusive custom furnishings. Enquire about materials for
        your project.
      </Title>
      <div className="collection-tabs">
        {collections.map((c) => (
          <a key={c.id} href={`#${c.id}`}>
            {c.name}
            <ArrowDown aria-hidden="true" size={13} />
          </a>
        ))}
      </div>
      {collections.map((item, i) => (
        <section
          data-reveal
          className={`section collection-detail ${i % 2 ? "reverse" : ""}`}
          id={item.id}
          key={item.id}
        >
          <Media item={item} />
          <div>
            <p className="eyebrow">0{i + 1} / THE COLLECTIONS</p>
            <h2>{item.name}</h2>
            <p className="serif-sub">{item.category}</p>
            <p>{item.description}</p>
            <Enquire>Enquire about {item.name.toLowerCase()}</Enquire>
          </div>
        </section>
      ))}
      <div className="section note">
        Collection photography and individual material details will be added
        with our original media.
      </div>
    </>
  );
}
export function Projects() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const verified = projects.filter(
    (p) => filter === "All" || p.category === filter,
  );
  const items = verified.length
    ? verified
    : filter === "All"
      ? deckSelections
      : [];
  return (
    <>
      <Title title="Spaces with a story." eyebrow="The Project Journal">
        Explore photographs from the supplied GVK Decor pitch deck. These are
        descriptive image selections; project names, locations and credits are
        awaiting confirmation.
      </Title>
      <section className="section projects">
        <div className="filters" aria-label="Filter projects">
          {["All", "Homes", "Collaborations"].map((f) => (
            <button
              key={f}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        {items.length ? (
          <div className="project-grid">
            {items.map((p) => (
              <button
                className="project-card"
                key={p.id}
                onClick={() => setSelected(p)}
              >
                <Media
                  item={{
                    ...p.media[0],
                    video: "",
                    image: p.media[0].poster || p.media[0].image,
                  }}
                />
                <h3>{p.title}</h3>
                <p>
                  {p.location} · {p.category}
                </p>
              </button>
            ))}
          </div>
        ) : (
          <div className="portfolio-empty">
            <span className="outline-monogram" aria-hidden="true">
              G
            </span>
            <p className="eyebrow">A JOURNAL IN THE MAKING</p>
            <h2>
              {filter === "All"
                ? "Beautiful stories take time."
                : `Our ${filter.toLowerCase()} journal is coming soon.`}
            </h2>
            <p>
              We’re preparing our portfolio with original photography of GVK
              Decor projects. In the meantime, speak with us about your space
              and the possibilities within it.
            </p>
            <Enquire>Discuss your project</Enquire>
          </div>
        )}
      </section>
      {selected && (
        <ProjectViewer project={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
export function Craft() {
  const [expanded, setExpanded] = useState(0);
  const steps = [
    [
      "A conversation",
      "Tell us about your space, the light, your inspirations and the way you live. Together, we establish a direction.",
    ],
    [
      "A material dialogue",
      "Explore textures, colours and finishes in relation to your interiors. A considered selection makes every layer feel connected.",
    ],
    [
      "The considered details",
      "Proportion, drape and finishing are part of the conversation from the beginning. Each decision brings the vision into focus.",
    ],
    [
      "A home, brought together",
      "Discuss the final details and installation requirements with our team, so the finished space feels cohesive and personal.",
    ],
  ];
  return (
    <>
      <Title
        title="The details make the difference."
        eyebrow="Behind the Craft"
      >
        From the movement of a curtain to upholstery and finishing details. The
        supplied pitch deck shows makers working by hand on figurative textiles.
        Explore those workshop details while original craft films are being
        prepared.
      </Title>
      <section className="craft-film section">
        <Media
          item={brandFilm}
          label="Workshop photography · GVK Decor pitch deck, page 4"
        />
        <div className="film-caption">
          <span>WORKSHOP PHOTOGRAPHY / PITCH DECK PAGE 4</span>
          <span>Texture / Proportion / Finish</span>
        </div>
      </section>
      <section className="section craft-process">
        <div>
          <p className="eyebrow">FROM IDEA TO ATMOSPHERE</p>
          <h2>
            Made personal.
            <br />
            <em>At every step.</em>
          </h2>
          <Enquire>Start your conversation</Enquire>
        </div>
        <div className="accordion">
          {steps.map(([title, desc], i) => (
            <div key={title}>
              <button
                aria-expanded={expanded === i}
                aria-controls={`step-${i}`}
                onClick={() => setExpanded(expanded === i ? null : i)}
              >
                <span className="index">0{i + 1}</span>
                <h3>{title}</h3>
                {expanded === i ? (
                  <Minus aria-hidden="true" size={16} />
                ) : (
                  <Plus aria-hidden="true" size={16} />
                )}
              </button>
              <div id={`step-${i}`} hidden={expanded !== i}>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
export function Contact() {
  const [status, setStatus] = useState("");
  const [emailLink, setEmailLink] = useState("");
  const submit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (!contact.email) {
      setStatus(
        "Appointment requests will open when our enquiry email is confirmed. No request has been sent.",
      );
      return;
    }
    const body = `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone")}\nI am: ${data.get("role")}\nVisit location: ${data.get("location")}\nPreferred date: ${data.get("date") || "To be discussed"}\n\n${data.get("message")}`;
    setEmailLink(
      `mailto:${contact.email}?subject=${encodeURIComponent("GVK Decor appointment enquiry")}&body=${encodeURIComponent(body)}`,
    );
    setStatus(
      "Your request is prepared. Open your email app below, then send the email to complete your enquiry. Your appointment is subject to confirmation.",
    );
  };
  return (
    <>
      <Title title="Let’s create a sense of home." eyebrow="Visit & Enquire">
        Whether you’re furnishing your home or shaping a space for a client,
        we’d love to hear your ideas.
      </Title>
      <section className="section contact-layout">
        <aside>
          <p className="eyebrow">FIND US</p>
          <h2>
            Hyderabad.
            <br />
            <em>Since 1959.</em>
          </h2>
          <Locations />
          <a
            className="text-link"
            href={`tel:${contact.phone.replace(/\s/g, "")}`}
          >
            {contact.phone}
            <ArrowUpRight aria-hidden="true" size={16} />
          </a>
          <p className="note">
            Please arrange an appointment for visit details and availability.
          </p>
          {contact.email && (
            <a className="text-link" href={`mailto:${contact.email}`}>
              {contact.email}
              <ArrowUpRight aria-hidden="true" size={16} />
            </a>
          )}
          {contact.whatsapp && (
            <a
              className="text-link"
              href={`https://wa.me/${contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Talk to us on WhatsApp
              <ArrowUpRight aria-hidden="true" size={16} />
            </a>
          )}
          <div className="contact-note">
            <p className="eyebrow">FOR DESIGN PROFESSIONALS</p>
            <p>
              Architects and interior designers: tell us about your project,
              palette and material requirements. Let’s explore the possibilities
              together.
            </p>
          </div>
        </aside>
        <div id="appointment">
          <p className="eyebrow">A CONVERSATION IS THE FIRST STEP</p>
          <h2>Request an appointment</h2>
          <p>
            Request a visit to the Experience Centre on Road No. 39, Jubilee
            Hills, or enquire about our Secunderabad store. Select your location
            below.
          </p>
          {!contact.email && (
            <p className="form-notice" role="note">
              Online enquiries are being prepared. This form is a preview and
              cannot send requests until our contact details are confirmed.
            </p>
          )}
          <form
            onSubmit={submit}
            onChange={() => {
              setEmailLink("");
              setStatus("");
            }}
          >
            <div className="form-row">
              <label>
                Your name *
                <input
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={100}
                />
              </label>
              <label>
                Email address *
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={200}
                />
              </label>
            </div>
            <div className="form-row">
              <label>
                Phone number
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  maxLength={30}
                />
              </label>
              <label>
                I am a
                <select name="role" defaultValue="Homeowner">
                  <option>Homeowner</option>
                  <option>Architect</option>
                  <option>Interior designer</option>
                  <option>Other</option>
                </select>
              </label>
            </div>
            <label>
              Visit location
              <select name="location" defaultValue={locations[0].name}>
                {locations.map((location) => (
                  <option key={location.id} value={location.name}>
                    {location.name} — {location.address}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Preferred appointment date
              <input
                name="date"
                type="date"
                min={new Date().toLocaleDateString("en-CA")}
              />
            </label>
            <label>
              A little about your project *
              <textarea
                name="message"
                rows={4}
                placeholder="Your space, your ideas, your timeline…"
                required
                maxLength={3000}
              />
            </label>
            <label className="consent">
              <input type="checkbox" required /> I agree to share these details
              with GVK Decor for this enquiry.
            </label>
            <p className="note">
              Your details are not stored by this website. A configured form
              opens your email app; sending and appointment confirmation are
              separate steps.
            </p>
            <button className="button" type="submit" disabled={!contact.email}>
              Prepare appointment email{" "}
              <ArrowUpRight aria-hidden="true" size={16} />
            </button>
            <p role="status" className="form-status">
              {status}
            </p>
            {emailLink && (
              <a className="text-link" href={emailLink}>
                Open appointment email{" "}
                <ArrowUpRight aria-hidden="true" size={16} />
              </a>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
export function NotFound() {
  return (
    <>
      <Title title="A different direction.">
        The page you’re looking for isn’t here.
      </Title>
      <div className="section">
        <Link className="text-link" to="/">
          Return home <ArrowRight aria-hidden="true" size={18} />
        </Link>
      </div>
    </>
  );
}
