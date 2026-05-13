import { motion } from "framer-motion";

export function VidoraLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <motion.div
        className="relative grid h-10 w-10 place-items-center"
        animate={{ rotate: [0, 4, -4, 0], scale: [1, 1.04, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 rounded-2xl bg-violet-500/25 blur-xl" />
        <div className="relative h-8 w-8 rounded-[10px] bg-gradient-to-br from-violet-500 via-fuchsia-500 to-sky-400 p-[2px] shadow-[0_0_28px_rgba(124,58,237,0.55)] [clip-path:polygon(50%_0,100%_86%,0_86%)]">
          <div className="h-full w-full bg-[#06070A] [clip-path:polygon(50%_14%,86%_80%,14%_80%)]" />
        </div>
      </motion.div>
      {!compact ? (
        <span className="text-xl font-bold tracking-tight text-white">Vidora AI</span>
      ) : null}
    </div>
  );
}
