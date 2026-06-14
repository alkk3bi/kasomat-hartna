import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ChefHat, Palette, Flame as Incense, Gift, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import productiveFamiliesImg from "@/assets/productive-families.jpg";

const highlights = [
  { icon: ChefHat, label: "أكلات منزلية" },
  { icon: Palette, label: "حرف يدوية" },
  { icon: Incense, label: "بخور وعطور" },
  { icon: Gift, label: "هدايا محلية" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

export default function ProductiveFamilies() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="mt-8"
    >
      <Link to="/productive-families" className="block group">
        <motion.div
          variants={fadeUp}
          custom={0}
          className="relative rounded-2xl overflow-hidden glow-border glow-shadow min-h-[220px] md:min-h-[260px]"
        >
          {/* Background image */}
          <img
            src={productiveFamiliesImg}
            alt="من بيوت حارتنا - الأسر المنتجة"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-l from-foreground/90 via-foreground/70 to-foreground/40 group-hover:from-foreground/85 group-hover:via-foreground/65 transition-all duration-500" />

          {/* Decorative accent line */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-accent/80 to-transparent" />

          {/* Content */}
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 p-6 md:p-10 h-full">
            {/* Text side */}
            <div className="flex-1 text-center md:text-start">
              <motion.div
                variants={fadeUp}
                custom={1}
                className="inline-flex items-center gap-2 rounded-full bg-accent/25 px-3 py-1 text-xs font-bold text-accent backdrop-blur-sm border border-accent/20 mb-3"
              >
                <Heart className="h-3 w-3 fill-current" />
                مبادرة مجتمعية
              </motion.div>

              <motion.h3
                variants={fadeUp}
                custom={2}
                className="text-2xl md:text-3xl font-black text-white mb-2 leading-tight"
              >
                من بيوت{" "}
                <span className="text-accent drop-shadow-lg">حارتنا</span>
              </motion.h3>

              <motion.p
                variants={fadeUp}
                custom={3}
                className="text-white/75 text-sm md:text-base max-w-md leading-relaxed"
              >
                اكتشف إبداعات الأسر المنتجة في حارتك — أكلات شعبية، حلويات منزلية، حرف يدوية، بخور وعطور ومنتجات تراثية أصيلة.
              </motion.p>

              {/* Highlight tags */}
              <motion.div
                variants={fadeUp}
                custom={4}
                className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start"
              >
                {highlights.map((item, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-white/90 border border-white/10 transition-colors group-hover:bg-white/15"
                  >
                    <item.icon className="h-3 w-3 text-accent" />
                    {item.label}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* CTA side */}
            <motion.div
              variants={fadeUp}
              custom={5}
              className="flex-shrink-0"
            >
              <Button
                size="lg"
                className="gap-2 font-bold text-base bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/30 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-accent/40 group-hover:scale-105"
              >
                تصفح المشاريع
                <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
              </Button>
            </motion.div>
          </div>

          {/* Corner decoration */}
          <motion.div
            className="absolute bottom-0 start-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
}
