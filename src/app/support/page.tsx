import Link from "next/link";
import {
  CircleHelp,
  Clock3,
  Headset,
  House,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { ContactForm } from "@/src/components/ContactForm/ContactForm";

const contactMethods = [
  {
    title: "Phone",
    detail: "Mon-Fri from 8am to 6pm",
    value: "+1 (800) 123-4567",
    href: "tel:+18001234567",
    icon: Phone,
  },
  {
    title: "Email",
    detail: "We'll respond within 24 hours",
    value: "support@freshcart.com",
    href: "mailto:support@freshcart.com",
    icon: Mail,
  },
];

const socials = [
  { name: "Facebook", mark: "f", href: "https://facebook.com" },
  { name: "X", mark: "𝕏", href: "https://x.com" },
  { name: "Instagram", mark: "◎", href: "https://instagram.com" },
  { name: "LinkedIn", mark: "in", href: "https://linkedin.com" },
];

export default function SupportPage() {
  return (
    <main className="flex-1 bg-[#f8fafb]">
      <section aria-labelledby="support-title" className="relative isolate overflow-hidden bg-linear-to-r from-[#0ebc60] via-[#08aa58] to-[#36d86e] text-white">
        <span aria-hidden="true" className="absolute -right-20 -top-28 -z-10 size-80 rounded-full border-[48px] border-white/5" />
        <span aria-hidden="true" className="absolute -bottom-32 left-[42%] -z-10 size-72 rounded-full bg-white/5" />
        <div className="relative mx-auto flex min-h-32 max-w-[1560px] items-center gap-4 px-4 py-6 sm:min-h-36 sm:px-6 lg:px-8">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/20 shadow-inner ring-1 ring-white/20 sm:size-14">
            <Headset aria-hidden="true" className="size-6 sm:size-7" />
          </span>
          <div>
            <nav aria-label="Breadcrumb" className="mb-2 flex items-center gap-1.5 text-[10px] font-medium text-white/80 sm:text-xs">
              <Link className="inline-flex items-center gap-1 transition hover:text-white" href="/"><House aria-hidden="true" className="size-3" /> Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-white">Contact Us</span>
            </nav>
            <h1 className="font-heading text-2xl leading-tight font-extrabold tracking-tight sm:text-3xl" id="support-title">Contact Us</h1>
            <p className="mt-1 text-xs text-white/90 sm:text-sm">We’d love to hear from you. Get in touch with our team.</p>
          </div>
        </div>
      </section>

      <section aria-label="Contact FreshCart support" className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto grid max-w-[1560px] gap-4 lg:grid-cols-[0.78fr_1.42fr] lg:gap-5">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {contactMethods.map(({ title, detail, value, href, icon: Icon }) => (
              <article className="flex min-h-[92px] items-start gap-3 rounded-xl border border-[#e8edef] bg-white p-4 shadow-[0_5px_18px_-18px_rgba(20,40,28,0.45)]" key={title}>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#effbf4] text-[#119652]">
                  <Icon aria-hidden="true" className="size-4" />
                </span>
                <div className="min-w-0">
                  <h2 className="text-xs font-bold text-[#26372d]">{title}</h2>
                  <p className="mt-0.5 text-[10px] text-[#7b8880]">{detail}</p>
                  <a className="mt-1.5 block break-words text-xs font-semibold text-[#119652] transition hover:text-[#087a49]" href={href}>{value}</a>
                </div>
              </article>
            ))}

            <article className="flex min-h-[92px] items-start gap-3 rounded-xl border border-[#e8edef] bg-white p-4 shadow-[0_5px_18px_-18px_rgba(20,40,28,0.45)]">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#effbf4] text-[#119652]"><MapPin aria-hidden="true" className="size-4" /></span>
              <div>
                <h2 className="text-xs font-bold text-[#26372d]">Office</h2>
                <p className="mt-1 text-[10px] leading-4 text-[#7b8880]">123 Commerce Street<br />New York, NY 10001<br />United States</p>
              </div>
            </article>

            <article className="flex min-h-[92px] items-start gap-3 rounded-xl border border-[#e8edef] bg-white p-4 shadow-[0_5px_18px_-18px_rgba(20,40,28,0.45)]">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#effbf4] text-[#119652]"><Clock3 aria-hidden="true" className="size-4" /></span>
              <div>
                <h2 className="text-xs font-bold text-[#26372d]">Business Hours</h2>
                <p className="mt-1 text-[10px] leading-4 text-[#7b8880]">Monday - Friday: 8am - 6pm<br />Saturday: 9am - 4pm<br />Sunday: Closed</p>
              </div>
            </article>

            <article className="rounded-xl border border-[#e8edef] bg-white p-4 shadow-[0_5px_18px_-18px_rgba(20,40,28,0.45)] sm:col-span-2 lg:col-span-1">
              <h2 className="text-xs font-bold text-[#26372d]">Follow Us</h2>
              <div className="mt-3 flex items-center gap-2">
                {socials.map(({ name, mark, href }) => (
                  <a aria-label={name} className="flex size-8 items-center justify-center rounded-full bg-[#f1f4f2] text-[#748078] transition hover:bg-[#e5f7ec] hover:text-[#119652]" href={href} key={name} rel="noreferrer" target="_blank">
                    <span aria-hidden="true" className="text-xs font-bold">{mark}</span>
                  </a>
                ))}
              </div>
            </article>
          </div>

          <div className="space-y-4">
            <section aria-labelledby="contact-form-title" className="rounded-xl border border-[#e8edef] bg-white p-4 shadow-[0_5px_18px_-18px_rgba(20,40,28,0.45)] sm:p-5 lg:p-6" id="support-form">
              <div className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#effbf4] text-[#119652]"><Headset aria-hidden="true" className="size-4" /></span>
                <div>
                  <h2 className="text-sm font-bold text-[#26372d]" id="contact-form-title">Send us a Message</h2>
                  <p className="mt-0.5 text-[10px] text-[#7b8880]">Fill out the form and we’ll help you get in touch.</p>
                </div>
              </div>
              <ContactForm />
            </section>

            <aside className="flex items-start gap-3 rounded-xl border border-[#dff3e7] bg-[#effbf4] p-4 sm:p-5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#119652] shadow-sm"><CircleHelp aria-hidden="true" className="size-4" /></span>
              <div>
                <h2 className="text-xs font-bold text-[#26372d]">Looking for quick answers?</h2>
                <p className="mt-1 text-[10px] leading-4 text-[#64736a]">Our team can help with orders, shipping, returns, and more.</p>
                <a className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-[#119652] hover:text-[#087a49]" href="#support-form">Contact our team <span aria-hidden="true">→</span></a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
