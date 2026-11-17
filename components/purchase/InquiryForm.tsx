"use client";

import { useState } from "react";
import { ArrowRight, CircleCheckBig, LoaderCircle, CircleAlert } from "lucide-react";
import type { PurchaseCopy } from "../../lib/purchase/types";

type Props = {
  copy: PurchaseCopy;
  locale: string;
};

type Status = "idle" | "sending" | "ok" | "error";

export default function InquiryForm({ copy, locale }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      product: String(data.get("product") || "").trim(),
      message: String(data.get("message") || "").trim(),
      locale,
      source: "purchase-page",
      page: typeof window !== "undefined" ? window.location.href : "",
    };

    if (!payload.name || !payload.email || !payload.product) {
      setStatus("error");
      setError(copy.fErr);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(payload.email)) {
      setStatus("error");
      setError(copy.fErr);
      return;
    }

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.ok !== true) throw new Error("request failed");
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
      setError(copy.fErr);
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-3xl border border-emerald-100 bg-emerald-50/60 p-8 text-center">
        <CircleCheckBig className="mx-auto mb-4 h-12 w-12 text-emerald-500" />
        <h3 className="text-lg font-semibold text-[#0f2b46]">{copy.fOkTitle}</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          {copy.fOkDesc}
        </p>
      </div>
    );
  }

  const field =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#0f2b46] placeholder:text-slate-400 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100";
  const label = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500";

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_20px_60px_-30px_rgba(15,43,70,0.45)] sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="lf-name">
            {copy.fName} *
          </label>
          <input
            id="lf-name"
            name="name"
            required
            autoComplete="name"
            className={field}
            placeholder={copy.fNamePh}
          />
        </div>
        <div>
          <label className={label} htmlFor="lf-email">
            {copy.fEmail} *
          </label>
          <input
            id="lf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={field}
            placeholder={copy.fEmailPh}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="lf-phone">
            {copy.fPhone}
          </label>
          <input
            id="lf-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            dir="ltr"
            className={field}
            placeholder={copy.fPhonePh}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="lf-product">
            {copy.fProduct} *
          </label>
          <input
            id="lf-product"
            name="product"
            required
            className={field}
            placeholder={copy.fProductPh}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="lf-message">
            {copy.fMessage}
          </label>
          <textarea
            id="lf-message"
            name="message"
            rows={4}
            className={field + " resize-none"}
            placeholder={copy.fMessagePh}
          />
        </div>
      </div>

      {status === "error" && (
        <p className="mt-4 flex items-start gap-2 rounded-xl bg-rose-50 px-3 py-2 text-xs text-rose-600">
          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error || copy.fErr}</span>
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "sending" ? (
          <>
            <LoaderCircle className="h-4 w-4 animate-spin" />
            {copy.fSending}
          </>
        ) : (
          <>
            {copy.fSubmit}
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      <p className="mt-3 text-center text-[11px] leading-relaxed text-slate-400">
        {copy.fPrivacy}
      </p>
    </form>
  );
}
