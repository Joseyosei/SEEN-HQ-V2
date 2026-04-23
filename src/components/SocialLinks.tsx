import { motion } from "framer-motion";

export const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/hello.seenhquk?igsh=MWZtc2M0MTdqdzIwag==",
    color: "hover:text-pink-500 hover:border-pink-500/50",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@seenhq.uk?_r=1&_t=ZN-954TSJHMPwc",
    color: "hover:text-white hover:border-white/50",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.01a8.16 8.16 0 004.77 1.52V7.07a4.85 4.85 0 01-1-.38z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@seenhquk?si=CgO9Fei5UMsIRmRW",
    color: "hover:text-red-500 hover:border-red-500/50",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/seenhquk?s=21",
    color: "hover:text-white hover:border-white/50",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Threads",
    href: "https://www.threads.com/@hello.seenhquk?igshid=NTc4MTIwNjQ2YQ==",
    color: "hover:text-white hover:border-white/50",
    icon: (
      <svg viewBox="0 0 192 192" fill="currentColor" className="w-4 h-4">
        <path d="M141.537 88.988c-1.044-.5-2.08-.968-3.106-1.408-1.813-27.765-16.61-43.56-42.03-43.722h-.347c-15.168 0-27.938 6.412-35.79 18.014l14.067 9.768c5.764-8.364 14.562-12.536 21.713-12.536.084 0 .168 0 .253.001 10.41.069 18.075 3.211 22.778 9.418 3.398 4.458 5.672 10.476 6.733 17.964-8.384-1.427-17.454-1.865-27.084-1.304-24.614 1.373-40.426 15.613-39.36 35.452.542 10.031 5.407 18.512 13.668 23.54 6.972 4.317 15.88 6.433 25.197 5.965 12.358-.631 22.24-5.116 29.367-13.34 5.488-6.325 8.944-14.493 10.401-24.749 5.76 3.574 9.984 8.522 12.273 14.634 4.042 10.7 4.272 28.315-7.75 40.298-10.463 10.438-23.094 14.952-42.786 15.105-21.66-.167-38.967-6.843-49.484-20.646C50.47 149.437 45.386 130.43 45.056 106c.33-24.43 5.414-43.437 15.233-56.321C70.802 35.876 88.11 29.2 109.77 29.033c21.807.168 38.546 6.878 49.182 20.93 5.37 7.08 9.37 16.536 11.97 28.036l14.374-3.244c-3.06-13.74-8.002-25.365-14.823-34.778C156.949 21.273 136.368 11.207 109.89 11.002c-26.337.199-46.76 10.31-60.174 29.096C37.615 57.22 31.573 81.556 31.332 106c.241 24.444 6.283 48.779 18.384 65.903 13.414 18.786 33.837 28.897 60.174 29.096 22.294-.172 38.055-5.773 50.475-18.155 16.144-16.1 15.671-36.778 10.238-51.274-3.955-10.783-12.319-19.872-28.953-22.582h.026zm-39.914 47.034c-9.435.471-19.46-3.752-19.948-13.204-.373-6.733 4.832-14.35 20.857-15.235 1.863-.104 3.69-.154 5.491-.154 7.007 0 13.587.621 19.6 1.79-1.898 23.017-15.333 26.297-25.979 26.802h-.021z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/17UcM4BSdH/?mibextid=wwXIfr",
    color: "hover:text-blue-500 hover:border-blue-500/50",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/seen-hq/",
    color: "hover:text-blue-400 hover:border-blue-400/50",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Bluesky",
    href: "https://bsky.app/profile/seenhq.bsky.social",
    color: "hover:text-sky-400 hover:border-sky-400/50",
    icon: (
      <svg viewBox="0 0 600 530" fill="currentColor" className="w-4 h-4">
        <path d="M135.72 44.03C202.216 93.951 273.74 195.17 300 249.49c26.262-54.316 97.782-155.54 164.28-205.46C512.26 8.009 590-19.862 590 68.825c0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.38-3.69-10.832-3.708-7.896-.017-2.936-1.193.516-3.707 7.896-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.45-163.25-81.433C20.15 217.613 10 86.535 10 68.825c0-88.687 77.742-60.816 125.72-24.795z" />
      </svg>
    ),
  },
  {
    label: "Lemon8",
    href: "https://www.lemon8-app.com/@seenhq.uk?region=gb",
    color: "hover:text-yellow-400 hover:border-yellow-400/50",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <ellipse cx="12" cy="13" rx="7" ry="8" />
        <path d="M12 5 Q14 1 17 2 Q15 4 12 5Z" />
        <path d="M9 6.5 Q8 9 9.5 11 Q10.5 9 9 6.5Z" fill="white" opacity="0.4" />
      </svg>
    ),
  },
  {
    label: "Tumblr",
    href: "https://www.tumblr.com/seenhq",
    color: "hover:text-indigo-400 hover:border-indigo-400/50",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M14.563 24c-5.093 0-7.031-3.756-7.031-6.411V9.747H5.116V6.648c3.63-1.313 4.512-4.596 4.71-6.469C9.84.051 9.941 0 9.999 0h3.517v6.114h4.801v3.633h-4.82v7.47c.016 1.001.375 2.371 2.207 2.371h.09c.631-.02 1.486-.205 1.936-.419l1.156 3.425c-.436.636-2.4 1.374-4.319 1.406z" />
      </svg>
    ),
  },
];

interface SocialLinksProps {
  className?: string;
  iconSize?: "sm" | "md" | "lg";
  showLabel?: boolean;
  animate?: boolean;
}

const SocialLinks = ({ className = "", iconSize = "md", showLabel = false, animate = true }: SocialLinksProps) => {
  const sizeClass = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  }[iconSize];

  const items = SOCIAL_LINKS.map((social, i) => (
    <motion.a
      key={social.label}
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.label}
      {...(animate ? {
        initial: { opacity: 0, scale: 0.8 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true },
        transition: { delay: i * 0.04 },
        whileHover: { scale: 1.15, y: -2 },
        whileTap: { scale: 0.95 },
      } : {})}
      className={`${sizeClass} rounded-xl border border-border flex items-center justify-center text-muted-foreground transition-all duration-200 ${social.color} ${showLabel ? "gap-2 px-3 w-auto" : ""}`}
    >
      {social.icon}
      {showLabel && <span className="text-xs font-body font-medium">{social.label}</span>}
    </motion.a>
  ));

  return <div className={`flex flex-wrap gap-2 ${className}`}>{items}</div>;
};

export default SocialLinks;
