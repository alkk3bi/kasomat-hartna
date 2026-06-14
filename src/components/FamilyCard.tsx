import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Star, BadgeCheck, MapPin, Instagram } from "lucide-react";
import { SiTiktok, SiSnapchat } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { ProductiveFamily } from "@/data/productiveFamilies";
import { cityNamesAr } from "@/data/locations";

interface FamilyCardProps {
  family: ProductiveFamily;
  index?: number;
}

const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

export default function FamilyCard({ family, index = 0 }: FamilyCardProps) {
  return (
    <Link to={`/family/${family.id}`} className="block">
    <motion.div
      variants={cardVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      custom={index}
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl overflow-hidden card-glass glow-border glow-shadow transition-all duration-500"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={family.image}
          alt={family.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />

        {/* Verified badge */}
        {family.isVerified && (
          <div className="absolute top-3 start-3 inline-flex items-center gap-1 rounded-full bg-primary/90 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
            <BadgeCheck className="h-3 w-3" />
            موثّق
          </div>
        )}

        {/* Rating */}
        <div className="absolute top-3 end-3 inline-flex items-center gap-1 rounded-full bg-foreground/70 backdrop-blur-sm px-2 py-0.5 text-xs font-bold text-white">
          <Star className="h-3 w-3 fill-accent text-accent" />
          {family.rating}
          <span className="text-white/60 text-[10px]">({family.reviewCount})</span>
        </div>

        {/* Family name overlay */}
        <div className="absolute bottom-3 start-3 end-3">
          <h3 className="text-lg font-black text-white drop-shadow-lg leading-tight">
            {family.name}
          </h3>
          <span className="text-xs text-accent font-bold drop-shadow">
            {family.brandName}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Location */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span>{cityNamesAr[family.city]}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {family.description}
        </p>

        {/* Products tags */}
        <div className="flex flex-wrap gap-1.5">
          {family.products.slice(0, 3).map((product, i) => (
            <span
              key={i}
              className="inline-flex items-center rounded-md bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent border border-accent/15"
            >
              {product}
            </span>
          ))}
          {family.products.length > 3 && (
            <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
              +{family.products.length - 3}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <a href={`https://wa.me/${family.whatsapp.replace('+', '')}`} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button size="sm" className="w-full gap-1.5 text-xs font-bold bg-[hsl(142,70%,40%)] hover:bg-[hsl(142,70%,35%)] text-white">
              <MessageCircle className="h-3.5 w-3.5" />
              واتساب
            </Button>
          </a>
          <a href={`tel:${family.phone}`}>
            <Button size="sm" variant="outline" className="gap-1.5 text-xs hover:border-primary/40 hover:bg-primary/5">
              <Phone className="h-3.5 w-3.5" />
            </Button>
          </a>
          {family.instagram && (
            <a href={`https://instagram.com/${family.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
              <Button size="sm" variant="outline" className="gap-1.5 text-xs hover:border-accent/40 hover:bg-accent/5">
                <Instagram className="h-3.5 w-3.5" />
              </Button>
            </a>
          )}
          {family.tiktok && (
            <a href={`https://tiktok.com/${family.tiktok.replace('@', '@')}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
              <Button size="sm" variant="outline" className="gap-1.5 text-xs hover:border-foreground/40 hover:bg-foreground/5">
                <SiTiktok className="h-3 w-3" />
              </Button>
            </a>
          )}
          {family.snapchat && (
            <a href={`https://snapchat.com/add/${family.snapchat.replace('@', '')}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
              <Button size="sm" variant="outline" className="gap-1.5 text-xs hover:border-yellow-400/40 hover:bg-yellow-400/5">
                <SiSnapchat className="h-3 w-3" />
              </Button>
            </a>
          )}
        </div>
      </div>
    </motion.div>
    </Link>
  );
}
