import React, { useEffect, useState } from "react";

interface ModalCardProps {
  open: boolean;
  title?: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const ModalCard: React.FC<ModalCardProps> = ({
  open,
  title,
  children,
  onClose,
}) => {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);
  const [gradient, setGradient] = useState<string | null>(null);

  useEffect(() => {
    let unmountTimer: number | undefined;
    if (open) {
      // pick a random gradient when opening
      const gradients = [
        "linear-gradient(135deg,#00c6ff 0%,#0072ff 100%)",
        "linear-gradient(135deg,#ff9a9e 0%,#fecfef 100%)",
        "linear-gradient(135deg,#a18cd1 0%,#fbc2eb 100%)",
        "linear-gradient(135deg,#89f7fe 0%,#66a6ff 100%)",
        "linear-gradient(135deg,#f6d365 0%,#fda085 100%)",
        "linear-gradient(135deg,#84fab0 0%,#8fd3f4 100%)",
      ];
      setGradient(gradients[Math.floor(Math.random() * gradients.length)]);
      setMounted(true);
      // trigger entrance animation on next frame
      requestAnimationFrame(() => setVisible(true));
      document.body.style.overflow = "hidden";
    } else {
      setVisible(false);
      unmountTimer = window.setTimeout(() => setMounted(false), 320);
      document.body.style.overflow = "";
    }
    return () => {
      if (unmountTimer) clearTimeout(unmountTimer);
    };
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (mounted) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mounted, onClose]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <div className="relative max-w-6xl w-full mx-4">
        <div className={`transform ${visible ? "modal-enter" : "modal-exit"}`}>
          <div
            className="rounded-2xl overflow-hidden shadow-2xl modal-gradient"
            style={gradient ? { backgroundImage: gradient } : undefined}
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-md p-6 md:p-12">
              <div className="flex items-start justify-between">
                <h3 className="text-3xl md:text-4xl font-semibold text-gray-900">
                  {title}
                </h3>
              </div>

              <div className="mt-6 text-gray-700 space-y-5 text-base md:text-lg modal-content">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCard;
