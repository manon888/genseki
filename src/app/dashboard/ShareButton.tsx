"use client";

import { useState } from "react";

interface ShareButtonProps {
  gifts: string[];
  userName: string;
}

export default function ShareButton({ gifts, userName }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `✨ My Genseki — ${userName}'s Gifts

${gifts.map((gift, i) => `${i + 1}. ${gift}`).join("\n\n")}

Discover your own gifts at Genseki!`;

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = shareText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <button
      onClick={copyToClipboard}
      className="flex items-center justify-center gap-2 w-full bg-accent text-charcoal px-6 py-3 rounded-full font-medium hover:bg-accent/90 transition-colors shadow-lg shadow-accent/25"
    >
      {copied ? (
        <>
          <span>✓</span>
          <span>Copied!</span>
        </>
      ) : (
        <>
          <span>📋</span>
          <span>Share your gifts</span>
        </>
      )}
    </button>
  );
}