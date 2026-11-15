"use client";

import type { FormEvent } from "react";
import { Send } from "lucide-react";

export function ContactForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const subject = `[FreshCart Support] ${String(formData.get("subject"))}`;
    const body = [
      `Name: ${String(formData.get("name"))}`,
      `Email: ${String(formData.get("email"))}`,
      "",
      String(formData.get("message")),
    ].join("\n");

    window.location.href = `mailto:support@freshcart.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-[#526057]" htmlFor="support-name">Full Name</label>
          <input autoComplete="name" className="h-10 w-full rounded-lg border border-[#e5eae7] bg-white px-3 text-xs text-[#27352c] outline-none placeholder:text-[#9aa59e] focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/10" id="support-name" name="name" placeholder="John Doe" required />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-[#526057]" htmlFor="support-email">Email Address</label>
          <input autoComplete="email" className="h-10 w-full rounded-lg border border-[#e5eae7] bg-white px-3 text-xs text-[#27352c] outline-none placeholder:text-[#9aa59e] focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/10" id="support-email" name="email" placeholder="john@example.com" required type="email" />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-[#526057]" htmlFor="support-subject">Subject</label>
        <select className="h-10 w-full rounded-lg border border-[#e5eae7] bg-white px-3 text-xs text-[#27352c] outline-none focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/10" defaultValue="" id="support-subject" name="subject" required>
          <option disabled value="">Select a subject</option>
          <option>Order Status</option>
          <option>Shipping and Delivery</option>
          <option>Returns and Refunds</option>
          <option>Product Question</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-[#526057]" htmlFor="support-message">Message</label>
        <textarea className="min-h-24 w-full resize-y rounded-lg border border-[#e5eae7] bg-white px-3 py-2.5 text-xs text-[#27352c] outline-none placeholder:text-[#9aa59e] focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/10 sm:min-h-28" id="support-message" name="message" placeholder="How can we help you?" required />
      </div>

      <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#16a34a] px-5 text-xs font-bold text-white shadow-sm transition hover:bg-[#128340] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#07884d]" type="submit">
        <Send aria-hidden="true" className="size-3.5" /> Send Message
      </button>
    </form>
  );
}
