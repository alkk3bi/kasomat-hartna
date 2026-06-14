import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories } from "@/data/categories";
import { cities, cityNamesAr } from "@/data/locations";
import { Sparkles, TrendingUp, Crown, Target, MapPin, Calendar, Percent, Gauge, ArrowLeft } from "lucide-react";

type Tier = "basic" | "pro";

export default function PricingCalculator() {
  const navigate = useNavigate();
  const [tier, setTier] = useState<Tier>("basic");
  const [discount, setDiscount] = useState<number>(20);
  const [weeks, setWeeks] = useState<number>(2);
  const [category, setCategory] = useState<string>(categories[0].id);
  const [city, setCity] = useState<string>(cities[0]);
  const [featured, setFeatured] = useState<boolean>(false);
  const [topRank, setTopRank] = useState<boolean>(false);

  const { finalPrice, basePrice, discountReward, rankScore, rankLabel } = useMemo(() => {
    const base = tier === "basic" ? 5 : 10;
    const weeksExtra = Math.max(0, weeks - 1) * 1; // 1 OMR/extra week
    const featuredFee = featured ? 5 : 0;
    const topRankFee = topRank ? 3 : 0;
    const subtotal = base + weeksExtra + featuredFee + topRankFee;

    // كلما زاد الخصم قلّت التكلفة (مكافأة للتاجر السخي)
    // 10% => 1.0 ، 30% => 0.8 ، 50% => 0.6 ، 70%+ => 0.5
    const factor = Math.min(1, Math.max(0.5, 1 - (discount - 10) / 100));
    const final = Math.max(3, +(subtotal * factor).toFixed(2));
    const reward = +(subtotal - final).toFixed(2);

    const score = discount + (featured ? 20 : 0) + (topRank ? 25 : 0) + (tier === "pro" ? 10 : 0);
    let label = "ظهور عادي";
    if (score >= 80) label = "ظهور ممتاز جداً";
    else if (score >= 55) label = "ظهور قوي";
    else if (score >= 35) label = "ظهور جيد";

    return {
      finalPrice: final,
      basePrice: subtotal,
      discountReward: reward,
      rankScore: Math.min(100, score),
      rankLabel: label,
    };
  }, [tier, discount, weeks, featured, topRank]);

  const cat = categories.find((c) => c.id === category);

  return (
    <section id="calculator" className="py-16 md:py-24 relative overflow-hidden">
      {/* خلفية متدرجة */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10 pointer-events-none" />
      <div className="absolute top-20 -right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <Badge className="mb-3 bg-accent text-accent-foreground border-0 gap-1">
            <Sparkles className="h-3 w-3" /> تسعير ذكي
          </Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
            صمّم عرضك واحسب تكلفته الآن
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            كلما قدّمت خصماً أكبر لزبونك، قلّت تكلفة ظهورك وارتفع ترتيبك في المنصة.
            تاجر سخي = زبائن أكثر = تكلفة أقل.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {/* لوحة التحكم */}
          <Card className="lg:col-span-3 p-6 md:p-8 backdrop-blur-sm bg-card/80 border-primary/10 shadow-deal-hover space-y-7">
            {/* الباقة */}
            <div>
              <Label className="flex items-center gap-2 mb-3 font-bold">
                <Crown className="h-4 w-4 text-accent" /> نوع الباقة
              </Label>
              <div className="grid grid-cols-2 gap-3">
                {([
                  { id: "basic", name: "أساسي", price: "٥ ر.ع", desc: "عرض واحد نشط" },
                  { id: "pro", name: "احترافي", price: "١٠ ر.ع", desc: "حتى ٥ عروض + تحليلات" },
                ] as { id: Tier; name: string; price: string; desc: string }[]).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setTier(p.id)}
                    className={`text-right p-4 rounded-xl border-2 transition-all ${
                      tier === p.id
                        ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold">{p.name}</span>
                      <span className="text-sm font-bold text-primary">{p.price}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{p.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* الخصم */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <Label className="flex items-center gap-2 font-bold">
                  <Percent className="h-4 w-4 text-emerald-600" /> نسبة الخصم للزبون
                </Label>
                <span className="text-2xl font-extrabold text-emerald-600">{discount}%</span>
              </div>
              <Slider
                value={[discount]}
                onValueChange={(v) => setDiscount(v[0])}
                min={5}
                max={80}
                step={5}
              />
              <p className="text-xs text-muted-foreground mt-2">
                💡 كل ما زاد الخصم، نقصت تكلفتك وارتفع ترتيبك.
              </p>
            </div>

            {/* المدة */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <Label className="flex items-center gap-2 font-bold">
                  <Calendar className="h-4 w-4 text-primary" /> مدة العرض
                </Label>
                <span className="text-lg font-bold">{weeks} {weeks === 1 ? "أسبوع" : "أسابيع"}</span>
              </div>
              <Slider
                value={[weeks]}
                onValueChange={(v) => setWeeks(v[0])}
                min={1}
                max={8}
                step={1}
              />
            </div>

            {/* الفئة والمنطقة */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="flex items-center gap-2 mb-2 font-bold">
                  <Target className="h-4 w-4 text-accent" /> الفئة المستهدفة
                </Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="flex items-center gap-2 mb-2 font-bold">
                  <MapPin className="h-4 w-4 text-primary" /> المنطقة
                </Label>
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {cities.map((c) => (
                      <SelectItem key={c} value={c}>{cityNamesAr[c]}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* خيارات الظهور */}
            <div className="space-y-3 pt-2 border-t border-border">
              <div className="flex items-center justify-between p-3 rounded-xl bg-accent/5 border border-accent/20">
                <div>
                  <p className="font-bold text-sm flex items-center gap-2">
                    <Crown className="h-4 w-4 text-accent" /> عرض مميز
                  </p>
                  <p className="text-xs text-muted-foreground">ظهور في قسم العروض المميزة (+٥ ر.ع)</p>
                </div>
                <Switch checked={featured} onCheckedChange={setFeatured} />
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-primary/5 border border-primary/20">
                <div>
                  <p className="font-bold text-sm flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" /> ترتيب أعلى في النتائج
                  </p>
                  <p className="text-xs text-muted-foreground">أولوية في نتائج البحث (+٣ ر.ع)</p>
                </div>
                <Switch checked={topRank} onCheckedChange={setTopRank} />
              </div>
            </div>
          </Card>

          {/* لوحة النتائج */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 md:p-8 sticky top-24 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0 shadow-2xl shadow-primary/30 space-y-6">
              <div>
                <p className="text-sm opacity-90 mb-1">تكلفتك النهائية</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold">{finalPrice}</span>
                  <span className="text-lg opacity-90">ر.ع</span>
                </div>
                {discountReward > 0 && (
                  <Badge className="mt-2 bg-accent text-accent-foreground border-0 gap-1">
                    <Sparkles className="h-3 w-3" />
                    وفّرت {discountReward} ر.ع بسخائك
                  </Badge>
                )}
              </div>

              <div className="space-y-2 text-sm border-t border-white/20 pt-4">
                <div className="flex justify-between opacity-90">
                  <span>السعر الأساسي</span>
                  <span>{basePrice} ر.ع</span>
                </div>
                <div className="flex justify-between opacity-90">
                  <span>مكافأة الخصم ({discount}%)</span>
                  <span className="text-accent font-bold">-{discountReward} ر.ع</span>
                </div>
                <div className="flex justify-between opacity-90">
                  <span>المدة</span>
                  <span>{weeks} {weeks === 1 ? "أسبوع" : "أسابيع"}</span>
                </div>
                <div className="flex justify-between opacity-90">
                  <span>الفئة</span>
                  <span>{cat?.name}</span>
                </div>
              </div>

              <div className="border-t border-white/20 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm flex items-center gap-1.5">
                    <Gauge className="h-4 w-4" /> قوة الظهور
                  </span>
                  <span className="font-bold text-accent">{rankLabel}</span>
                </div>
                <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-accent to-yellow-300"
                    initial={{ width: 0 }}
                    animate={{ width: `${rankScore}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>
              </div>

              <Button
                size="lg"
                variant="secondary"
                className="w-full font-bold gap-2"
                onClick={() => {
                  navigate("/dashboard", {
                    state: {
                      prefill: {
                        tier,
                        tierName: tier === "basic" ? "أساسي" : "احترافي",
                        discount,
                        weeks,
                        category,
                        categoryName: cat?.name,
                        city,
                        cityName: cityNamesAr[city as keyof typeof cityNamesAr],
                        featured,
                        topRank,
                        finalPrice,
                        basePrice,
                        discountReward,
                        rankLabel,
                        rankScore,
                      },
                    },
                  });
                }}
              >
                إرسال الطلب للوحة التحكم <ArrowLeft className="h-4 w-4" />
              </Button>
              <p className="text-xs opacity-80 text-center">
                الأسعار تقديرية. الفريق يتواصل معك لتأكيد التفاصيل.
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}