import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for NexaWeb — what's included, how payment works, revisions, timelines, and other conditions of working with us.",
  alternates: { canonical: "https://nexaweb.co/terms" },
}

const SECTIONS: Array<{ title: string; body: React.ReactNode }> = [
  {
    title: "1. Acceptance of Terms",
    body: "By submitting an inquiry, paying a deposit, or otherwise engaging our services, you (\"Client\") agree to be bound by these Terms. If you do not agree, do not engage our services. These Terms, together with any written project scope we exchange (email is sufficient), form the complete agreement between us.",
  },
  {
    title: "2. Services",
    body: "NexaWeb designs and develops websites for local businesses and individuals. The specific pages, features, and scope of each project are confirmed in writing before work begins. Client is responsible for providing all content needed for the project, including text, images, logos, and any other materials.",
  },
  {
    title: "3. Your Responsibilities",
    body: "You must provide accurate, timely, and lawful content for your project. You represent and warrant that you own or have permission to use all content you provide, including any text, images, logos, trademarks, and third-party material. You agree not to provide content that is illegal, infringing, defamatory, or otherwise harmful.",
  },
  {
    title: "4. Payment",
    body: "A 50% deposit is required before work begins. The remaining 50% is due upon project completion. Work will not begin until the deposit is received. Invoices are due upon receipt. If payment is more than 14 days past due, we may pause work on your project until the balance is resolved.",
  },
  {
    title: "5. Refunds",
    body: "You may cancel your project at any time before work begins for a full refund of your deposit. Once work has commenced, your deposit is considered earned and reflects our scheduling commitment and initial work allocated to your project. If we are unable to deliver the agreed-upon scope due to our own actions, you will receive a pro-rated refund based on work completed at the time of cancellation.",
  },
  {
    title: "6. Revisions",
    body: "Each project includes up to two (2) rounds of revisions on the agreed-upon design and content. Additional revisions beyond that are billed at our standard hourly rate, quoted in writing before any extra work begins.",
  },
  {
    title: "7. Timeline",
    body: "Projects are typically completed within 5–7 business days after we receive both the deposit and all required content from you. Delays caused by Client — including slow content delivery, slow approvals, or scope changes — extend the timeline accordingly. We will communicate revised timelines as soon as reasonably possible.",
  },
  {
    title: "8. Intellectual Property",
    body: "Upon receipt of full payment, you receive a perpetual, worldwide license to use the delivered website for your business. Any third-party assets we use (fonts, stock images, plugins, code libraries) remain subject to their original licenses. We retain ownership of any reusable tools, code components, or templates we developed independently. You retain full ownership of all content you provide to us.",
  },
  {
    title: "9. Portfolio Rights",
    body: "Unless you request otherwise in writing before work begins, we may display your completed project in our portfolio, on our website, and in marketing materials. We will not disclose private business information, credentials, or behind-the-scenes materials.",
  },
  {
    title: "10. Monthly Retainer",
    body: "Clients on a monthly maintenance plan may cancel at any time by providing 30 days' written notice. Fees for the current billing period are non-refundable, and services continue through the end of the paid period.",
  },
  {
    title: "11. Warranty Disclaimer",
    body: "Our services and the websites we deliver are provided \"as-is\" and \"as-available.\" To the maximum extent permitted by law, we disclaim all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that your website will be error-free, uninterrupted, or compatible with every browser, device, or future platform change. We make no guarantees about specific business results, conversions, search engine rankings, or revenue.",
  },
  {
    title: "12. Limitation of Liability",
    body: "To the maximum extent permitted by California law, our total liability to you for any claim arising from or related to our services is limited to the amount you have paid us for the specific project giving rise to the claim. We are not liable for any indirect, incidental, consequential, special, or punitive damages — including lost profits, lost data, or business interruption — even if we were advised of the possibility of such damages.",
  },
  {
    title: "13. Indemnification",
    body: "You agree to defend, indemnify, and hold us harmless from any claims, damages, losses, or costs (including reasonable attorney fees) arising from: (a) content you provided to us; (b) your use of the website we built; (c) your business operations or products; or (d) your violation of these Terms or any law.",
  },
  {
    title: "14. Termination",
    body: "Either party may terminate the engagement in writing at any time. Upon termination, you will pay for all work completed up to the termination date. Sections 5, 8, 11, 12, 13, and 15 survive termination of this agreement.",
  },
  {
    title: "15. Governing Law & Disputes",
    body: "These Terms are governed by the laws of the State of California, without regard to its conflict of laws principles. Before either party initiates legal action, both parties agree to attempt in good faith to resolve the dispute through direct communication for a period of at least 30 days. If unresolved, any dispute shall be brought in the state or federal courts located in California; nothing in this section prevents either party from bringing a qualifying claim in California small claims court.",
  },
  {
    title: "16. General",
    body: "If any provision of these Terms is held to be unenforceable, the remainder will remain in full force and effect. Our failure to enforce any right or provision is not a waiver of that right. These Terms may be updated from time to time; the current version will always be posted at this URL with a \"Last updated\" date. Your continued use of our services after an update constitutes acceptance of the updated Terms.",
  },
  {
    title: "17. Contact",
    body: (
      <>
        Questions about these Terms? Email us at{" "}
        <a
          href="mailto:mynexaweb@gmail.com"
          style={{ color: "#3b6fff", textDecoration: "none" }}
        >
          mynexaweb@gmail.com
        </a>
        .
      </>
    ),
  },
]

export default function TermsPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#070b18",
        fontFamily: "var(--font-inter), system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between">
          <Link href="/" style={{ textDecoration: "none" }} className="font-display font-bold text-base sm:text-[17px] tracking-tight">
            <span className="text-white">Nexa</span>
            <span style={{ color: "#1447e6" }}>Web</span>
          </Link>
          <span className="text-xs text-white/30 font-medium uppercase tracking-[0.12em]">
            Legal
          </span>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-5 sm:px-6 py-12 sm:py-16">
        <p
          className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 sm:mb-4"
          style={{ color: "#1447e6" }}
        >
          Legal
        </p>
        <h1
          className="font-display font-bold text-white text-3xl sm:text-4xl md:text-5xl tracking-tight mb-3"
          style={{ letterSpacing: "-0.02em" }}
        >
          Terms of Service
        </h1>
        <p className="text-white/40 text-sm mb-10 sm:mb-14">
          Last updated: May 30, 2026
        </p>

        <div className="flex flex-col gap-8 sm:gap-10">
          {SECTIONS.map((s) => (
            <section key={s.title}>
              <h2
                className="font-display font-semibold text-white text-lg sm:text-xl mb-2 sm:mb-3"
                style={{ letterSpacing: "-0.01em" }}
              >
                {s.title}
              </h2>
              <p className="text-white/65 text-[15px] sm:text-base leading-relaxed">
                {s.body}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-14 sm:mt-16 pt-6 sm:pt-8 border-t border-white/[0.06]">
          <Link
            href="/"
            style={{ textDecoration: "none" }}
            className="inline-flex items-center gap-2 text-white/45 hover:text-white text-sm font-medium transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 7H2M7 2L2 7l5 5" />
            </svg>
            Back to NexaWeb
          </Link>
        </div>
      </article>
    </div>
  )
}
