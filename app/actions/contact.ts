"use server";

import { z } from "zod";

// ── Validation schema (mirrors ContactForm's zod schema) ──────────────────
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(4, "Subject must be at least 4 characters"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export interface ActionResult {
  success: boolean;
  message: string;
  fieldErrors?: Partial<Record<keyof ContactFormData, string[]>>;
}

export async function sendContactEmail(
  formData: ContactFormData,
): Promise<ActionResult> {
  // ── 1. Validate ──────────────────────────────────────────────────────
  const result = contactSchema.safeParse(formData);

  if (!result.success) {
    return {
      success: false,
      message: "Validation failed. Please check your inputs.",
      fieldErrors: result.error.flatten().fieldErrors as Partial<
        Record<keyof ContactFormData, string[]>
      >,
    };
  }

  const { name, email, subject, message } = result.data;

  // ── 2. Send via Resend ───────────────────────────────────────────────
  // TODO: npm install resend
  // TODO: Add RESEND_API_KEY to .env.local
  // TODO: Replace 'onboarding@resend.dev' with your verified sender domain

  try {
    // ─── UNCOMMENT TO ENABLE REAL EMAIL SENDING ───────────────────────
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "aniketrajid@gmail.com", // TODO: your real email
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <h2>New message from ${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });
    // ─────────────────────────────────────────────────────────────────

    // ─── STUB (logs to console for now) ───────────────────────────────
    console.log("[ContactForm] Message received:", {
      name,
      email,
      subject,
      message,
    });
    await new Promise((r) => setTimeout(r, 600)); // simulate network delay

    return {
      success: true,
      message: "Message sent! I'll be in touch soon. 🚀",
    };
  } catch (error) {
    console.error("[ContactForm] Error:", error);
    return {
      success: false,
      message:
        "Something went wrong. Please try emailing directly at aniketrajid@gmail.com",
    };
  }
}
