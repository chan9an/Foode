"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRouter } from "next/navigation";
import Link from "next/link";


function AvatarModel() {
  return (
    <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 4, 0]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#4F46E5" metalness={0.5} roughness={0.2} />
    </mesh>
  );
}

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollYProgress } = useScroll();
  const router = useRouter();

  const heroRef = useRef(null);
  const statsRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });

  const heroControls = useAnimation();
  const statsControls = useAnimation();

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  useEffect(() => {
    setIsLoaded(true);
    if (heroInView) heroControls.start("visible");
    if (statsInView) statsControls.start("visible");
  }, [heroInView, statsInView, heroControls, statsControls]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <>
      {/* Navbar Placeholder */}
      <div className="w-full p-4 bg-black text-white text-center font-bold">SmartMeal</div>

      <main className="overflow-hidden">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-black text-white"
        >
          {/* Glow Effects */}
          <div className="absolute inset-0 z-0">
            <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-purple-600/30 blur-3xl animate-pulse" />
            <div className="absolute top-1/3 -left-20 w-72 h-72 rounded-full bg-indigo-500/30 blur-2xl animate-bounce" />
            <div className="absolute -bottom-40 right-1/4 w-80 h-80 rounded-full bg-blue-600/20 blur-3xl animate-spin-slow" />
          </div>

          <div className="container mx-auto px-4 z-10">
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              initial="hidden"
              animate={heroControls}
              variants={staggerContainer}
              style={{ y: heroY, opacity: heroOpacity }}
            >
              {/* Left Text */}
              <motion.div className="space-y-6 lg:space-y-8" variants={fadeInUp}>
                <div className="inline-block px-4 py-2 bg-white/10 text-indigo-400 font-medium text-sm rounded-full shadow">
                  🍽️ Personalized Nutrition
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white">
                  <span className="block">SmartMeal</span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                    Eat Smarter, Live Better
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-300 max-w-2xl">
                  Your AI-powered meal planning assistant tailored to your health goals and taste. Discover what to eat—when and why.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/PromptP">
                    <button className="bg-green-500 text-white px-8 py-4 text-lg rounded-xl hover:bg-green-400 transition-transform hover:scale-105">
                      Get Started <ArrowRight className="inline-block ml-2" />
                    </button>
                  </Link>
                  <button className="border-2 border-green-500 text-green-500 px-8 py-4 text-lg rounded-xl hover:bg-green-500/10">
                    Watch Demo
                  </button>
                </div>

                <div className="flex items-center gap-3 text-gray-400 mt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-blue-500 border-2 border-black"
                      />
                    ))}
                  </div>
                  <span>
                    Loved by <strong>10,000+</strong> smart eaters
                  </span>
                </div>
              </motion.div>

              {/* Right: 3D Model */}
              <motion.div
                className="relative h-[400px] md:h-[500px] lg:h-[600px] border-4 border-gray-700 rounded-3xl overflow-hidden shadow-2xl"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 opacity-10 blur-2xl rotate-3" />
                <div className="absolute inset-0 bg-black rounded-3xl">
                  <Canvas>
                    <ambientLight intensity={0.8} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <pointLight position={[-10, -10, -10]} />
                    <AvatarModel />
                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
                  </Canvas>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
