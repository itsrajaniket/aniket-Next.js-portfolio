"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { sendContactEmail } from "@/app/actions/contact";
import Toast from "@/components/ui/Toast";

// ── Validation schema ──────────────────────────────────────────────────────
const schema = z.object({
  name:    z.string().min(2, "Name must be at least 2 characters"),
  email:   z.string().email("Please enter a valid email address"),
  subject: z.string().min(4, "Subject must be at least 4 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type FormData = z.infer<typeof schema>;

interface ToastState {
  message: string;
  type: "success" | "error";
}

export default function ContactForm() {
  const [toast, setToast] = useState<ToastState | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const result = await sendContactEmail(data);
      if (result.success) {
        setToast({ message: result.message, type: "success" });
        reset();
      } else {
        setToast({ message: result.message, type: "error" });
      }
    } catch {
      setToast({ message: "Connection error. Please email directly at aniketrajid@gmail.com", type: "error" });
    }
  };

  const closeToast = useCallback(() => setToast(null), []);

  const inputBase =
    "w-full bg-slate-800/50 border border-slate-700 text-slate-100 text-sm rounded-xl px-4 py-3 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/60 focus:border-accent transition-all";
  const errorClass = "text-red-400 text-xs mt-1";

  return (
    <>
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={closeToast} />
      )}

      <div className="bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-xl">
        <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
          <i className="fas fa-paper-plane text-accent" aria-hidden="true" />
          Send a Message
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">

          {/* Name */}
          <div>
            <label htmlFor="contact-name" className="block text-sm text-slate-400 mb-1 font-medium">
              Full Name
            </label>
            <input
              id="contact-name"
              type="text"
              placeholder="Your name"
              autoComplete="name"
              {...register("name")}
              className={`${inputBase} ${errors.name ? "border-red-500/50 focus:ring-red-500/30" : ""}`}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <p id="name-error" className={errorClass} role="alert">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="contact-email" className="block text-sm text-slate-400 mb-1 font-medium">
              Email Address
            </label>
            <input
              id="contact-email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              {...register("email")}
              className={`${inputBase} ${errors.email ? "border-red-500/50 focus:ring-red-500/30" : ""}`}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className={errorClass} role="alert">{errors.email.message}</p>
            )}
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="contact-subject" className="block text-sm text-slate-400 mb-1 font-medium">
              Subject
            </label>
            <input
              id="contact-subject"
              type="text"
              placeholder="Project inquiry / collaboration"
              {...register("subject")}
              className={`${inputBase} ${errors.subject ? "border-red-500/50 focus:ring-red-500/30" : ""}`}
              aria-invalid={!!errors.subject}
              aria-describedby={errors.subject ? "subject-error" : undefined}
            />
            {errors.subject && (
              <p id="subject-error" className={errorClass} role="alert">{errors.subject.message}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="contact-message" className="block text-sm text-slate-400 mb-1 font-medium">
              Message
            </label>
            <textarea
              id="contact-message"
              rows={5}
              placeholder="Tell me about your project or just say hi..."
              {...register("message")}
              className={`${inputBase} resize-none ${errors.message ? "border-red-500/50 focus:ring-red-500/30" : ""}`}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message && (
              <p id="message-error" className={errorClass} role="alert">{errors.message.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-6 bg-gradient-to-r from-primary to-accent text-dark font-bold rounded-xl
                       hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]
                       disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100
                       transition-all duration-200 flex items-center justify-center gap-2"
            aria-label="Send your message"
          >
            {isSubmitting ? (
              <>
                <i className="fas fa-spinner fa-spin" aria-hidden="true" />
                Sending…
              </>
            ) : (
              <>
                Send Message
                <i className="fas fa-paper-plane" aria-hidden="true" />
              </>
            )}
          </button>
        </form>
      </div>
    </>
  );
}
