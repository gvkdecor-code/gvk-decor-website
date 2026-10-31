import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowUpRight, ArrowRight, Plus, Minus } from "lucide-react";
import Media from "./components/Media";
import { Enquire } from "./components/Layout";
import ProjectViewer from "./components/ProjectViewer";
import Home from "./Home";
export { Home };
import { collections, projects, brandFilm, contact } from "./data/site";
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
        Rooted in Hyderabad. Shaped by a lasting appreciation for beautiful
        homes.
      </Title>
      <section className="legacy-banner">
        <div className="legacy-number">
          1959<span>WHERE OUR STORY BEGAN</span>
        </div>
        <div>
          <p className="eyebrow">GVK DECOR</p>
          <h2>
            A sense of home.
            <br />
            <em>Across generations.</em>
          </h2>
          <p>
            Established in 1959, GVK Decor is a bespoke home furnishings brand
            in Jubilee Hills, Hyderabad. Our point of view brings heritage into
            conversation with the way we live today.
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
            A well-considered home reveals itself slowly: in materials you
            return to, details you notice with time, and spaces that make you
            feel at ease. This is the spirit we bring to every conversation.
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
        Discover the layers that bring a room to life. A starting point for a
        conversation, always tailored to your space.
      </Title>
      <div className="collection-tabs">
        {collections.map((c) => (
          <a key={c.id} href={`#${c.id}`}>
            {c.name}
            <ArrowDown size={13} />
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
  const items = projects.filter(
    (p) => filter === "All" || p.category === filter,
  );
  return (
    <>
      <Title title="Spaces with a story." eyebrow="The Project Journal">
        A closer look at completed spaces, thoughtful collaborations and the
        details that make each home its own.
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
        A thoughtful process. A tactile sensibility. An appreciation for the
        things you feel as much as see.
      </Title>
      <section className="craft-film section">
        <Media
          item={brandFilm}
          label="Craft film coming soon · abstract material study"
        />
        <div className="film-caption">
          <span>A CLOSER LOOK AT GVK DECOR</span>
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
                {expanded === i ? <Minus size={16} /> : <Plus size={16} />}
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
    const body = `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone")}\nI am: ${data.get("role")}\nPreferred date: ${data.get("date") || "To be discussed"}\n\n${data.get("message")}`;
    setEmailLink(
      `mailto:${contact.email}?subject=${encodeURIComponent("GVK Decor Experience Centre appointment enquiry")}&body=${encodeURIComponent(body)}`,
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
          <p>
            GVK Decor
            <br />
            {contact.venue}
            <br />
            {contact.address}
            <br />
            Telangana, India
          </p>
          <a
            className="text-link"
            href={`tel:${contact.phone.replace(/\s/g, "")}`}
          >
            {contact.phone}
            <ArrowUpRight size={16} />
          </a>
          <p className="note">
            Please arrange an appointment for visit details and availability.
          </p>
          {contact.email && (
            <a className="text-link" href={`mailto:${contact.email}`}>
              {contact.email}
              <ArrowUpRight size={16} />
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
              <ArrowUpRight size={16} />
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
            Visit our Jubilee Hills Experience Centre, Road No. 39, Hyderabad.
            Share a few details to enquire about an appointment.
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
              Prepare appointment email <ArrowUpRight size={16} />
            </button>
            <p role="status" className="form-status">
              {status}
            </p>
            {emailLink && (
              <a className="text-link" href={emailLink}>
                Open appointment email <ArrowUpRight size={16} />
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
          Return home <ArrowRight size={18} />
        </Link>
      </div>
    </>
  );
}
