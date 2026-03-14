import { motion } from "framer-motion";

const PLATFORMS = [
  { name: "TikTok", svg: "M12.5 2v13.5a3.5 3.5 0 11-3-3.46V8.5A7 7 0 1019 9.5V2h-6.5z" },
  { name: "Instagram", svg: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2m-.2 2A3.6 3.6 0 004 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5M12 7a5 5 0 110 10 5 5 0 010-10m0 2a3 3 0 100 6 3 3 0 000-6z" },
  { name: "YouTube", svg: "M23 9.71a8.5 8.5 0 00-.91-4.13 2.92 2.92 0 00-1.72-1A78.36 78.36 0 0012 4.27a78.45 78.45 0 00-8.34.3 2.87 2.87 0 00-1.46.74c-.9.83-1 2.25-1.1 3.45a48.29 48.29 0 000 6.48 9.55 9.55 0 00.3 2 3.14 3.14 0 00.71 1.36 2.86 2.86 0 001.49.78A45.18 45.18 0 0012 19.73a45.18 45.18 0 008.35-.37 2.86 2.86 0 001.49-.78 2.93 2.93 0 00.71-1.36 9.55 9.55 0 00.3-2 48.29 48.29 0 00.15-5.51zM9.74 14.85V8.66l5.92 3.11c-1.66.92-3.85 1.96-5.92 3.08z" },
  { name: "X", svg: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
];

const PlatformLogos = () => {
  return (
    <section className="py-12 bg-background">
      <div className="container px-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground font-body mb-8 uppercase tracking-widest"
        >
          As seen on
        </motion.p>
        <div className="flex items-center justify-center gap-10 md:gap-16 opacity-40">
          {PLATFORMS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center gap-2"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-foreground">
                <path d={p.svg} />
              </svg>
              <span className="text-xs font-heading font-semibold text-foreground">{p.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformLogos;
