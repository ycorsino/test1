import { supabase } from "@/lib/supabase";
import type { Service } from "@/lib/types";
import ServicePrice from "./ServicePrice";
import BookingForm from "./BookingForm";

// Fetch at request time so the build never needs network access and edits to
// the Supabase catalog show up immediately.
export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("active", true)
    .order("sort");

  const services = (data ?? []) as Service[];

  return (
    <main className="section">
      <header className="section__head">
        <p className="eyebrow">Experiences</p>
        <h1 className="section__title">Ways into the sky</h1>
        <p className="section__lead">
          From your very first tandem to a full skydiving license — every jump
          is run by certified instructors on modern aircraft to 15,000ft.
        </p>
      </header>

      {error && (
        <p className="notice notice--error">
          Couldn&apos;t load experiences right now. Please try again shortly.
        </p>
      )}

      <div className="services">
        {services.map((service) => (
          <article key={service.id} className="service-card" id={service.slug}>
            <div className="service-card__top">
              <span className="chip">{service.category}</span>
              <ServicePrice
                priceUsd={Number(service.price_usd)}
                unit={service.price_unit}
              />
            </div>
            <h2 className="service-card__name">{service.name}</h2>
            <p className="service-card__tagline">{service.tagline}</p>
            <p className="service-card__desc">{service.description}</p>
            <ul className="service-card__highlights">
              {service.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <div className="service-card__meta">
              {service.duration && <span>⏱️ {service.duration}</span>}
            </div>
            <a href="#book" className="btn btn--primary btn--block">
              Request this experience
            </a>
          </article>
        ))}
      </div>

      <section className="booking" id="book">
        <div className="booking__intro">
          <h2>Book your slot</h2>
          <p>
            Tell us what you&apos;d like to do and when. We&apos;ll get back to
            you to confirm availability. No payment is taken here — this is a
            request, not a charge.
          </p>
        </div>
        <BookingForm services={services} />
      </section>
    </main>
  );
}
