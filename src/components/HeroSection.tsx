
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax transforms for different elements
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const imageMainY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const imageLeftY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const imageRightY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const badgeY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex items-center overflow-hidden bg-background">
      {/* Subtle background pattern with parallax */}
      <motion.div 
        className="absolute inset-0 opacity-[0.02]"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </motion.div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content with parallax */}
          <motion.div className="space-y-8" style={{ y: contentY, opacity }}>
            <div className="space-y-6">
              <p 
                className="text-sm font-sans uppercase tracking-[0.3em] text-muted-foreground opacity-0 animate-fade-up"
              >
                Curated Collection
              </p>
              
              <h1 
                className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] opacity-0 animate-fade-up delay-100"
              >
                Elevate Your
                <br />
                <span className="italic">Everyday</span> Style
              </h1>
              
              <div className="w-24 h-px bg-foreground/20 opacity-0 animate-line-expand delay-300" />
              
              <p 
                className="text-lg text-muted-foreground font-light max-w-md leading-relaxed opacity-0 animate-fade-up delay-200"
              >
                Discover timeless pieces crafted with precision. Where minimalism meets sophistication in every detail.
              </p>
            </div>

            <div 
              className="flex flex-wrap gap-4 opacity-0 animate-fade-up delay-400"
            >
              <Link to="/products">
                <Button 
                  size="lg" 
                  className="group px-8 py-6 text-sm uppercase tracking-widest font-sans rounded-none transition-all duration-500"
                >
                  Explore Collection
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/collections">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="px-8 py-6 text-sm uppercase tracking-widest font-sans rounded-none border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-500"
                >
                  View Categories
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div 
              className="flex gap-12 pt-8 border-t border-border opacity-0 animate-fade-up delay-500"
            >
              <div>
                <p className="font-serif text-3xl">500+</p>
                <p className="text-sm text-muted-foreground mt-1">Premium Products</p>
              </div>
              <div>
                <p className="font-serif text-3xl">50K+</p>
                <p className="text-sm text-muted-foreground mt-1">Happy Customers</p>
              </div>
              <div>
                <p className="font-serif text-3xl">4.9</p>
                <p className="text-sm text-muted-foreground mt-1">Average Rating</p>
              </div>
            </div>
          </motion.div>

          {/* Right - Image Grid with parallax */}
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              {/* Main large image */}
              <motion.div 
                className="col-span-2 aspect-[4/3] overflow-hidden opacity-0 animate-scale-in delay-200"
                style={{ y: imageMainY }}
              >
                <img
                  src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop"
                  alt="Curated fashion collection"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </motion.div>
              
              {/* Bottom left */}
              <motion.div 
                className="aspect-square overflow-hidden opacity-0 animate-scale-in delay-300"
                style={{ y: imageLeftY }}
              >
                <img
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
                  alt="Fashion accessories"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </motion.div>
              
              {/* Bottom right */}
              <motion.div 
                className="aspect-square overflow-hidden opacity-0 animate-scale-in delay-400"
                style={{ y: imageRightY }}
              >
                <img
                  src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop"
                  alt="Premium clothing"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </motion.div>
            </div>

            {/* Floating badge with parallax */}
            <motion.div 
              className="absolute -left-8 top-1/2 -translate-y-1/2 bg-background border border-border p-6 shadow-lg opacity-0 animate-fade-up delay-600"
              style={{ y: badgeY }}
            >
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Featured</p>
              <p className="font-serif text-xl">New Arrivals</p>
              <Link 
                to="/products" 
                className="text-sm text-muted-foreground mt-2 inline-flex items-center gap-1 link-underline"
              >
                Shop Now <ArrowRight className="h-3 w-3" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-fade-in delay-600"
        style={{ opacity }}
      >
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-foreground/40 to-transparent" />
      </motion.div>
    </section>
  );
}
