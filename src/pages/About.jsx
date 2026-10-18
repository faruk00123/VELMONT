import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import Seo from '../components/Seo.jsx'
import { CheckIcon, RefreshIcon, ShieldIcon, SparkIcon, TruckIcon } from '../components/Icons.jsx'

const MILESTONES = [
  {
    year: '1962',
    title: 'One last, one workshop',
    copy: 'Founders Elena and Mads Vell draw a single shoe last in a Copenhagen courtyard workshop and name the house after their family.',
  },
  {
    year: '1978',
    title: 'The Goodyear turn',
    copy: 'The workshop commits fully to welted construction, guaranteeing every pair can be resoled rather than replaced.',
  },
  {
    year: '1994',
    title: 'Porto partnership',
    copy: 'A collaboration with a family-run atelier in northern Portugal adds hand-sewn loafers and moccasins to the line.',
  },
  {
    year: '2011',
    title: 'Leather traceability',
    copy: 'VELMONT begins publishing the tannery behind every upper — all vegetable-tanned and LWG Gold rated.',
  },
  {
    year: 'Today',
    title: 'Repair-first footwear',
    copy: 'A dedicated resole service returns more than 4,000 pairs a year to their owners instead of to landfill.',
  },
]

const PRINCIPLES = [
  {
    icon: SparkIcon,
    title: 'Design for decades',
    copy: 'Silhouettes are drawn to sit outside trend cycles, so the pair you buy stays wearable long after the season ends.',
  },
  {
    icon: RefreshIcon,
    title: 'Repair, don’t replace',
    copy: 'Welted and stitched construction means soles, linings and even welts can be renewed by a competent cobbler.',
  },
  {
    icon: ShieldIcon,
    title: 'Know the supply chain',
    copy: 'Every hide is traceable to an LWG Gold tannery, and every workshop we work with is independently audited.',
  },
  {
    icon: TruckIcon,
    title: 'Consolidate deliveries',
    copy: 'Orders ship carbon-neutral, and we consolidate batches rather than air-freighting single pairs around the world.',
  },
]

const TEAM = [
  {
    name: 'Elena Vell',
    role: 'Founder & Last Maker',
    image:
      'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Tomás Ferreira',
    role: 'Head of Atelier, Porto',
    image:
      'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Priya Raman',
    role: 'Materials & Sustainability',
    image:
      'https://images.unsplash.com/photo-1596703263926-eb0762ee17e4?auto=format&fit=crop&w=600&q=80',
  },
]

export default function About() {
  return (
    <>
      <Seo
        title="Our Story"
        description="VELMONT is a fictional Copenhagen footwear atelier making welted, repairable shoes from traceable leathers. This is a demo storefront."
      />

      <PageHeader
        eyebrow="Since 1962"
        title="A footwear house built on patience"
        subtitle="VELMONT is a fictional atelier created for this demo storefront. The story below explains the values the collection is designed around."
        breadcrumbs={[{ label: 'About' }]}
        image="https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=1600&q=80"
      />

      {/* Intro */}
      <section className="container-site py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="eyebrow">Our philosophy</span>
            <h2 className="mt-3 font-display text-3xl leading-tight text-teal sm:text-4xl">
              We make fewer things, and we make them properly
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-softgray">
              <p>
                Most footwear is built to be consumed: glued soles, corrected-grain leather and
                a lifespan measured in seasons. We chose a slower route. Every VELMONT pair is
                cut from full-grain hides, closed by hand and attached with a welt or a
                through-stitch, so it can be opened up, repaired and worn again.
              </p>
              <p>
                It is a stubborn approach. It requires more time, more skill and more expensive
                materials than the alternative — but it means a pair of our shoes can outlive
                the trend that prompted you to buy it.
              </p>
              <p>
                This storefront is a front-end demonstration. The products, prices and story are
                illustrative, and no real orders are fulfilled.
              </p>
            </div>

            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                'Full-grain, traceable leathers',
                'Hand-closed uppers',
                'Welted & stitched construction',
                'Resole service for life',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-teal">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <img
              src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=700&q=80"
              alt="Hand-finished leather boots in the VELMONT workshop"
              className="aspect-[3/4] w-full rounded-sm object-cover sm:mt-8"
              loading="lazy"
            />
            <img
              src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=700&q=80"
              alt="A pair of VELMONT sneakers on a studio bench"
              className="aspect-[3/4] w-full rounded-sm object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="bg-teal text-ivory">
        <div className="container-site py-14 sm:py-16">
          <span className="eyebrow text-copper-300">Our timeline</span>
          <h2 className="mt-3 font-display text-3xl text-ivory sm:text-4xl">
            Six decades in five moments
          </h2>

          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MILESTONES.map((item) => (
              <li
                key={item.year}
                className="rounded-sm border border-ivory/15 bg-teal-600/60 p-6"
              >
                <p className="font-display text-2xl text-copper-300">{item.year}</p>
                <h3 className="mt-2 font-sans text-base font-semibold text-ivory">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ivory/70">{item.copy}</p>
              </li>
            ))}
            <li className="flex flex-col justify-between rounded-sm border border-copper/40 bg-copper/15 p-6">
              <div>
                <p className="font-display text-2xl text-copper-300">Next</p>
                <h3 className="mt-2 font-sans text-base font-semibold text-ivory">
                  Repair-first by default
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ivory/70">
                  Our goal is for every pair sold to be resoled at least twice before it leaves
                  service.
                </p>
              </div>
              <Link to="/shop" className="btn-copper mt-5 self-start">
                Shop the collection
              </Link>
            </li>
          </ol>
        </div>
      </section>

      {/* Principles */}
      <section id="sustainability" className="container-site scroll-mt-28 py-14 sm:py-16">
        <div className="mb-10 max-w-2xl">
          <span className="eyebrow">What we stand for</span>
          <h2 className="mt-3 font-display text-3xl text-teal sm:text-4xl">
            Four principles that decide everything
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {PRINCIPLES.map(({ icon: Icon, title, copy }) => (
            <div key={title} className="rounded-sm border border-line bg-white p-6 shadow-card">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ivory text-copper">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-sans text-base font-semibold text-teal">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-softgray">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="bg-white py-14 sm:py-16">
        <div className="container-site">
          <div className="mb-10 max-w-2xl">
            <span className="eyebrow">The people</span>
            <h2 className="mt-3 font-display text-3xl text-teal sm:text-4xl">
              Makers, not marketers
            </h2>
            <p className="mt-3 text-sm text-softgray">
              A small team across Copenhagen and Porto. The names and photographs here are
              illustrative for this demo.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {TEAM.map((person) => (
              <article key={person.name} className="overflow-hidden rounded-sm border border-line">
                <img
                  src={person.image}
                  alt={`${person.name}, ${person.role}`}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="p-5">
                  <h3 className="font-sans text-base font-semibold text-teal">{person.name}</h3>
                  <p className="mt-0.5 text-xs uppercase tracking-wider text-softgray">
                    {person.role}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-site py-14 sm:py-16">
        <div className="rounded-sm border border-line bg-ivory p-8 text-center sm:p-12">
          <span className="eyebrow">Ready when you are</span>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-2xl text-teal sm:text-3xl">
            Explore the collection, or drop us a line
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-softgray">
            Our contact form works locally and clearly signals that it is a demo — your message
            is never transmitted.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/shop" className="btn-primary">
              Shop all footwear
            </Link>
            <Link to="/contact" className="btn-ghost">
              Contact the studio
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
