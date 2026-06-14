import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Phone, MessageCircle, Star, BadgeCheck, MapPin, Instagram,
  ArrowRight, Heart, Clock, Package, Share2
} from "lucide-react";
import { SiTiktok, SiSnapchat } from "react-icons/si";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { productiveFamilies, familyCategories } from "@/data/productiveFamilies";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const cityNameAr: Record<string, string> = {
  Muscat: "مسقط",
  Nizwa: "نزوى",
  Buraimi: "البريمي",
};

export default function FamilyDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const family = productiveFamilies.find((f) => f.id === id);

  if (!family) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Heart className="h-16 w-16 mx-auto text-muted-foreground/30" />
            <h2 className="text-xl font-bold text-foreground">لم يتم العثور على هذه الأسرة</h2>
            <Link to="/productive-families">
              <Button variant="outline" className="gap-2">
                <ArrowRight className="h-4 w-4" />
                العودة للأسر المنتجة
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const category = familyCategories.find((c) => c.id === family.category);
  const relatedFamilies = productiveFamilies
    .filter((f) => f.category === family.category && f.id !== family.id)
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: family.name, text: family.description, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero image */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={family.image}
          alt={family.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />

        {/* Back button */}
        <div className="absolute top-4 start-4">
          <Link to="/productive-families">
            <Button size="sm" variant="outline" className="gap-1.5 bg-background/20 backdrop-blur-md border-white/20 text-white hover:bg-background/40">
              <ArrowRight className="h-4 w-4" />
              رجوع
            </Button>
          </Link>
        </div>

        {/* Share */}
        <div className="absolute top-4 end-4">
          <Button size="sm" variant="outline" onClick={handleShare} className="gap-1.5 bg-background/20 backdrop-blur-md border-white/20 text-white hover:bg-background/40">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Name overlay */}
        <div className="absolute bottom-0 start-0 end-0 p-6">
          <div className="container">
            <div className="flex items-end justify-between gap-4">
              <div className="space-y-1">
                {family.isVerified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/90 backdrop-blur-sm px-2.5 py-0.5 text-[11px] font-bold text-primary-foreground">
                    <BadgeCheck className="h-3 w-3" />
                    موثّق
                  </span>
                )}
                <h1 className="text-2xl md:text-4xl font-black text-white drop-shadow-lg">
                  {family.name}
                </h1>
                <p className="text-accent font-bold text-sm md:text-base drop-shadow">{family.brandName}</p>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-foreground/60 backdrop-blur-sm px-3 py-1 text-white">
                <Star className="h-4 w-4 fill-accent text-accent" />
                <span className="font-bold">{family.rating}</span>
                <span className="text-white/60 text-xs">({family.reviewCount} تقييم)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="relative py-8 md:py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-warm" />
        <div className="absolute inset-0 bg-mesh-pattern opacity-40" />

        <div className="container relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <motion.div
                initial="hidden" animate="visible" variants={fadeUp} custom={0}
                className="card-glass rounded-2xl p-6 space-y-4"
              >
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  عن المشروع
                </h2>
                <p className="text-muted-foreground leading-relaxed text-base">{family.description}</p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{cityNameAr[family.city] || family.city}</span>
                  </div>
                  {category && (
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Package className="h-4 w-4 text-accent" />
                      <span>{category.name}</span>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Products */}
              <motion.div
                initial="hidden" animate="visible" variants={fadeUp} custom={1}
                className="card-glass rounded-2xl p-6 space-y-4"
              >
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Package className="h-5 w-5 text-accent" />
                  المنتجات والخدمات
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {family.products.map((product, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.08 }}
                      className="flex items-center gap-3 rounded-xl bg-accent/5 border border-accent/10 p-3.5"
                    >
                      <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center shrink-0">
                        <span className="text-accent font-bold text-sm">{i + 1}</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">{product}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Related families */}
              {relatedFamilies.length > 0 && (
                <motion.div
                  initial="hidden" animate="visible" variants={fadeUp} custom={2}
                  className="space-y-4"
                >
                  <h2 className="text-lg font-bold text-foreground">أسر مشابهة</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {relatedFamilies.map((rf) => (
                      <Link key={rf.id} to={`/family/${rf.id}`}>
                        <div className="card-glass rounded-xl overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                          <div className="relative h-32 overflow-hidden">
                            <img src={rf.image} alt={rf.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                            <div className="absolute bottom-2 start-2">
                              <h4 className="text-sm font-bold text-white">{rf.name}</h4>
                              <span className="text-[11px] text-accent font-medium">{rf.brandName}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar - Contact */}
            <div className="space-y-5">
              <motion.div
                initial="hidden" animate="visible" variants={fadeUp} custom={1}
                className="card-glass rounded-2xl p-6 space-y-4 sticky top-24"
              >
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  تواصل معنا
                </h2>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${family.whatsapp.replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full gap-2 text-sm font-bold bg-[hsl(142,70%,40%)] hover:bg-[hsl(142,70%,35%)] text-white h-12">
                    <MessageCircle className="h-5 w-5" />
                    تواصل عبر واتساب
                  </Button>
                </a>

                {/* Phone */}
                <a href={`tel:${family.phone}`} className="block">
                  <Button variant="outline" className="w-full gap-2 text-sm font-bold h-12 hover:border-primary/40 hover:bg-primary/5">
                    <Phone className="h-5 w-5" />
                    اتصل الآن
                  </Button>
                </a>

                {/* Instagram */}
                {family.instagram && (
                  <a
                    href={`https://instagram.com/${family.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="outline" className="w-full gap-2 text-sm font-bold h-12 hover:border-accent/40 hover:bg-accent/5">
                      <Instagram className="h-5 w-5" />
                      {family.instagram}
                    </Button>
                  </a>
                )}

                {/* TikTok */}
                {family.tiktok && (
                  <a
                    href={`https://tiktok.com/${family.tiktok.replace('@', '@')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="outline" className="w-full gap-2 text-sm font-bold h-12 hover:border-foreground/40 hover:bg-foreground/5">
                      <SiTiktok className="h-4 w-4" />
                      {family.tiktok}
                    </Button>
                  </a>
                )}

                {/* Snapchat */}
                {family.snapchat && (
                  <a
                    href={`https://snapchat.com/add/${family.snapchat.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="outline" className="w-full gap-2 text-sm font-bold h-12 hover:border-yellow-400/40 hover:bg-yellow-400/5">
                      <SiSnapchat className="h-4 w-4" />
                      {family.snapchat}
                    </Button>
                  </a>
                )}

                {/* Divider */}
                <div className="border-t border-border/50 pt-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary shrink-0" />
                    <span>{cityNameAr[family.city] || family.city} — {family.area}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 text-primary shrink-0" />
                    <span>التواصل متاح يومياً</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Star className="h-4 w-4 fill-accent text-accent shrink-0" />
                    <span>{family.rating} من 5 — {family.reviewCount} تقييم</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}