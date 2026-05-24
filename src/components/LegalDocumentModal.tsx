import { ShieldCheck, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface LegalDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export function LegalDocumentModal({ isOpen, onClose, title }: LegalDocumentModalProps) {
  const contentMap: Record<string, { sections: { subtitle: string; paragraphs: string[] }[] }> = {
    "Privacy Policy": {
      sections: [
        {
          subtitle: "1. Information Collection",
          paragraphs: [
            "We collect information that identifies, relates to, describes, or could reasonably be linked, directly or indirectly, with a particular luxury advisory client or high-net-worth customer profile.",
            "This includes professional corporate coordinates, financial capabilities, spatial and geographical preferences, and digital footprints across our curated sandbox environments.",
          ],
        },
        {
          subtitle: "2. Confidentiality and NDA Safeguards",
          paragraphs: [
            "Given the high-profile nature of our listings, client confidentiality is paramount. Details regarding active listings, negotiations, virtual coordinates, and off-market viewing schedules are secured behind high-grade digital vaulting protocols and strictly protected under non-disclosure boundaries.",
          ],
        },
        {
          subtitle: "3. Digital Security Compliance",
          paragraphs: [
            "Top Properties employs advanced encryption standards (AES-256) to ensure the integrity of client communication. We never sell, lease, or disseminate client information to unauthorized real estate brokerages or promotional marketers.",
          ],
        },
      ],
    },
    "Terms of Service": {
      sections: [
        {
          subtitle: "1. Scope of Curation Services",
          paragraphs: [
            "Top Properties provides exclusive representation, bespoke virtual curation, and advisory coordination for global ultra-high-net-worth real estate transactions.",
            "All pricing information, villa measurements, and off-market inventory descriptions are presented as highly accurate approximations subject to direct agency confirmation.",
          ],
        },
        {
          subtitle: "2. Client Representation Rules",
          paragraphs: [
            "Users of the Top Properties digital portal acknowledge that accessing off-market estates requires validated sandboxed sessions or directly approved broker introductions. Mock or simulated viewings do not constitute formal agency representation.",
          ],
        },
        {
          subtitle: "3. Limitation of Liability",
          paragraphs: [
            "While we strive to provide the ultimate in curation quality, Top Properties is not liable for structural changes, local government zoning modifications, or pricing changes enacted directly by private sellers prior to contract signing.",
          ],
        },
      ],
    },
    "Cookie Policy": {
      sections: [
        {
          subtitle: "1. Purpose of Tracking Technologies",
          paragraphs: [
            "Our digital showcase uses premium cookies and session storage to remember spatial configurations, price preferences, map boundaries, and user credentials across sandbox browsing sessions.",
          ],
        },
        {
          subtitle: "2. Essential vs. Analytical Cookies",
          paragraphs: [
            "Essential cookies are activated instantly to preserve active login tokens and coordinate details overlay menus. Analytical cookies are utilized strictly in aggregate to refine user experiences and streamline page loads on mobile networks.",
          ],
        },
        {
          subtitle: "3. User Choice",
          paragraphs: [
            "Clients are empowered to opt out of analytical tracking at any point via modern web browser configuration panel rules, preserving complete spatial anonymity.",
          ],
        },
      ],
    },
  };

  const doc = contentMap[title] || {
    sections: [
      {
        subtitle: "Top Properties Policy Document",
        paragraphs: [
          "This is a curated policy overview document for the Top Properties luxurious portfolio sandbox experience.",
        ],
      },
    ],
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto p-0 gap-0">
        <DialogTitle className="sr-only">{title}</DialogTitle>

        {/* Brand Banner */}
        <div className="bg-charcoal py-8 px-8 text-white flex items-center gap-4 border-b border-white/5 shrink-0">
          <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-burgundy-light">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 block">
              Official Legal Document
            </span>
            <h2 className="font-serif text-xl tracking-tight">{title}</h2>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8 overflow-y-auto space-y-6">
          {doc.sections.map((section, idx) => (
            <section key={idx} className="space-y-3">
              <h3 className="font-serif text-md text-charcoal font-semibold tracking-tight border-b border-charcoal/5 pb-2">
                {section.subtitle}
              </h3>
              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-xs text-warm-gray leading-relaxed font-light">
                  {p}
                </p>
              ))}
            </section>
          ))}

          {/* Verification badge */}
          <div className="bg-ivory/50 border border-charcoal/5 p-4 rounded-xl flex items-center gap-3 mt-8">
            <ShieldCheck className="w-5 h-5 text-green-600 shrink-0" />
            <div className="text-[10px] text-warm-gray font-light">
              This document has been finalized and validated for presentation purposes under **Top
              Properties General Counsel**.
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
