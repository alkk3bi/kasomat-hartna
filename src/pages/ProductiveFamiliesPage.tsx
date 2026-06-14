import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Search, Filter } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FamilyCard from "@/components/FamilyCard";
import { Input } from "@/components/ui/input";
import { productiveFamilies, familyCategories, FamilyCategory } from "@/data/productiveFamilies";
import productiveFamiliesImg from "@/assets/productive-families.jpg";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

// Group categories by group name
const categoryGroups = familyCategories.reduce((acc, cat) => {
  if (!acc[cat.group]) acc[cat.group] = [];
  acc[cat.group].push(cat);
  return acc;
}, {} as Record<string, typeof familyCategories>);

export default function ProductiveFamiliesPage() {
  const [selectedCategory, setSelectedCategory] = useState<FamilyCategory | "">("");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = productiveFamilies.filter((f) => {
    const matchesCategory = !selectedCategory || f.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      f.name.includes(searchQuery) ||
      f.brandName.includes(searchQuery) ||
      f.description.includes(searchQuery) ||
      f.products.some((p) => p.includes(searchQuery));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero banner */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={productiveFamiliesImg}
            alt="من بيوت حارتنا"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-foreground/90 via-foreground/75 to-foreground/50" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-accent/10" />
        </div>
        <div className="relative container py-16 md:py-24">
          <motion.div
            initial="hidden"
            animate="visible"
            className="max-w-2xl space-y-4"
          >
            <motion.div
              variants={fadeUp}
              custom={0}
              className="inline-flex items-center gap-2 rounded-full bg-accent/25 px-3 py-1 text-xs font-bold text-accent backdrop-blur-sm border border-accent/20"
            >
              <Heart className="h-3 w-3 fill-current" />
              مبادرة مجتمعية
            </motion.div>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-3xl md:text-5xl font-black text-white leading-tight"
            >
              من بيوت{" "}
              <span className="text-accent drop-shadow-lg">حارتنا</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-white/80 text-base md:text-lg max-w-lg leading-relaxed"
            >
              اكتشف خدمات ومنتجات أهل حارتك — من الطبخ المنزلي والحرف اليدوية إلى التعليم والتوصيل. ادعم جيرانك وأسرك المنتجة!
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-0 end-0 w-48 h-48 bg-accent/15 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </section>

      {/* Filters & content */}
      <section className="relative py-10 md:py-14 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-warm" />
        <div className="absolute inset-0 bg-mesh-pattern opacity-40" />

        <div className="container relative space-y-8">
          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ابحث عن أسرة أو منتج أو خدمة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ps-10 bg-card/80 backdrop-blur-sm border-border/50"
              />
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span className="font-medium">{filtered.length} نتيجة</span>
            </div>
          </motion.div>

          {/* Category dropdown filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 items-start sm:items-center"
          >
            <Select
              value={selectedCategory}
              onValueChange={(val) => setSelectedCategory(val === "all" ? "" : val as FamilyCategory)}
            >
              <SelectTrigger className="w-full sm:w-64 bg-card/80 backdrop-blur-sm border-border/50">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="جميع الفئات" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الفئات</SelectItem>
                {Object.entries(categoryGroups).map(([groupName, cats]) => (
                  <SelectGroup key={groupName}>
                    <SelectLabel className="text-xs font-bold text-muted-foreground">{groupName}</SelectLabel>
                    {cats.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground font-medium">{filtered.length} نتيجة</span>
          </motion.div>

          {/* Cards grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((family, i) => (
                <FamilyCard key={family.id} family={family} index={i} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 space-y-3"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-muted/50 flex items-center justify-center">
                <Heart className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-bold text-foreground">لا توجد نتائج</h3>
              <p className="text-muted-foreground text-sm">جرّب البحث بكلمات مختلفة أو اختر فئة أخرى</p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
