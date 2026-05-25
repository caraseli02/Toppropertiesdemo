import { useState } from "react";
import { Lock, Mail, Sparkles, Shield, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface ClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { name: string; email: string; avatar: string }) => void;
}

export function ClientPortalModal({ isOpen, onClose, onLoginSuccess }: ClientPortalModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDemoLogin = () => {
    setIsLoading(true);
    setError("");
    setTimeout(() => {
      onLoginSuccess({
        name: "Elena Rostova",
        email: "e.rostova@rostovagroup.com",
        avatar:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=faces&q=80",
      });
      setIsLoading(false);
      onClose();
    }, 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    // For demo purposes, we will accept any valid email/password
    setIsLoading(true);
    setError("");
    setTimeout(() => {
      onLoginSuccess({
        name: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1),
        email: email,
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&q=80",
      });
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent
        showCloseButton
        className="w-full max-w-lg bg-white p-0 overflow-hidden shadow-2xl border border-charcoal/5 rounded-xl gap-0"
      >
        <DialogTitle className="sr-only">Client Portal Login</DialogTitle>

        {/* Brand Banner */}
        <div className="bg-burgundy py-8 px-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/70 block mb-1">
            Exclusive Access
          </span>
          <h2 className="font-serif text-2xl tracking-tight">Top Properties Portal</h2>
          <p className="text-white/80 font-light text-xs mt-1 max-w-sm">
            Access off-market listings, schedule private jet coordinates, and manage portfolios in
            real-time.
          </p>
        </div>

        {/* Content */}
        <div className="p-8 flex-1">
          {error && (
            <div className="mb-6 rounded-lg border border-burgundy/20 bg-burgundy/5 p-4 text-xs font-medium text-burgundy">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-warm-gray mb-2">
                Corporate Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-warm-gray" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. name@firm.com"
                  className="w-full pl-11 pr-4 py-3 bg-ivory border border-charcoal/5 rounded-lg text-sm focus:outline-none focus:border-burgundy focus:ring-2 focus:ring-burgundy/10 transition-all font-light"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-warm-gray mb-2">
                Security Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-warm-gray" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-ivory border border-charcoal/5 rounded-lg text-sm focus:outline-none focus:border-burgundy focus:ring-2 focus:ring-burgundy/10 transition-all font-light"
                  required
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-burgundy hover:bg-burgundy-dark disabled:bg-burgundy/60 text-white py-3.5 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg"
              >
                {isLoading ? "Authenticating..." : "Sign In to Client Portal"}
                {!isLoading && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-charcoal/5"></div>
            </div>
            <span className="relative bg-white px-3 text-[10px] uppercase tracking-[0.15em] text-warm-gray">
              Demonstration Access
            </span>
          </div>

          {/* Quick Demo Credentials */}
          <div className="bg-ivory border border-charcoal/5 p-4 rounded-xl flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-burgundy/5 flex items-center justify-center text-burgundy shrink-0">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-semibold text-charcoal uppercase tracking-wider mb-1">
                One-Click Portfolio Access
              </h4>
              <p className="text-[11px] text-warm-gray font-light leading-relaxed mb-3">
                Experience the luxury dashboard immediately as an elite client persona with
                pre-saved curated listings.
              </p>
              <button
                type="button"
                onClick={handleDemoLogin}
                disabled={isLoading}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-burgundy/10 hover:bg-burgundy/20 text-burgundy rounded-full text-xs font-semibold transition-all cursor-pointer"
              >
                {isLoading ? "Preparing..." : "Access as Elena Rostova"}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-1.5 text-[10px] text-warm-gray font-light">
            <Shield className="w-3.5 h-3.5 text-green-600" />
            <span>Fully encrypted, secure sandbox session. No real personal data required.</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
