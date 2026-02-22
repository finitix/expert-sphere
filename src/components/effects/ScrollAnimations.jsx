import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef } from "react";
// Parallax scroll effect
export function ParallaxSection({ children, offset = 50, className = "" }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
    const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
    return (<motion.div ref={ref} style={{ y: smoothY }} className={className}>
      {children}
    </motion.div>);
}
// Reveal on scroll with fade and slide
export function RevealOnScroll({ children, direction = "up", delay = 0, className = "" }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const directionOffset = {
        up: { y: 60 },
        down: { y: -60 },
        left: { x: 60 },
        right: { x: -60 },
    };
    return (<motion.div ref={ref} initial={{ opacity: 0, ...directionOffset[direction] }} animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>);
}
// Staggered children animation
export function StaggerReveal({ children, staggerDelay = 0.1, className = "" }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    return (<motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={{
            hidden: {},
            visible: {
                transition: {
                    staggerChildren: staggerDelay,
                },
            },
        }} className={className}>
      {children}
    </motion.div>);
}
export function StaggerItem({ children, className = "" }) {
    return (<motion.div variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
        }} className={className}>
      {children}
    </motion.div>);
}
// Scale on scroll
export function ScaleOnScroll({ children, className = "" }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"],
    });
    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
    return (<motion.div ref={ref} style={{ scale, opacity }} className={className}>
      {children}
    </motion.div>);
}
// 3D Tilt card on hover
export function TiltCard({ children, className = "", intensity = 10 }) {
    const ref = useRef(null);
    const handleMouseMove = (e) => {
        if (!ref.current)
            return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateX = (-y / rect.height) * intensity;
        const rotateY = (x / rect.width) * intensity;
        ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
    const handleMouseLeave = () => {
        if (ref.current) {
            ref.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        }
    };
    return (<div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className={`transition-transform duration-200 ${className}`} style={{ transformStyle: "preserve-3d" }}>
      {children}
    </div>);
}
// Floating animation
export function FloatingElement({ children, duration = 3, distance = 10, delay = 0, className = "" }) {
    return (<motion.div animate={{
            y: [-distance, distance, -distance],
        }} transition={{
            duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay,
        }} className={className}>
      {children}
    </motion.div>);
}
// Rotate on scroll
export function RotateOnScroll({ children, className = "" }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
    return (<motion.div ref={ref} style={{ rotate }} className={className}>
      {children}
    </motion.div>);
}
// Blur on scroll  
export function BlurReveal({ children, className = "" }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    return (<motion.div ref={ref} initial={{ opacity: 0, filter: "blur(20px)" }} animate={isInView ? { opacity: 1, filter: "blur(0px)" } : {}} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>);
}
// Counter animation
export function AnimatedCounter({ value, duration = 2, className = "" }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    return (<motion.span ref={ref} initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} className={className}>
      {isInView && (<motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <CountUp end={value} duration={duration}/>
        </motion.span>)}
    </motion.span>);
}
function CountUp({ end, duration }) {
    const ref = useRef(null);
    return (<motion.span ref={ref} initial={{ opacity: 1 }} animate={{ opacity: 1 }}>
      <motion.span animate={{
            transition: { duration }
        }}>
        {end.toLocaleString()}+
      </motion.span>
    </motion.span>);
}
// Text reveal character by character
export function TextReveal({ text, className = "", delay = 0 }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const words = text.split(" ");
    return (<div ref={ref} className={className}>
      {words.map((word, i) => (<span key={i} className="inline-block mr-[0.25em]">
          {word.split("").map((char, j) => (<motion.span key={j} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{
                    duration: 0.3,
                    delay: delay + (i * 0.1) + (j * 0.02),
                    ease: [0.16, 1, 0.3, 1],
                }} className="inline-block">
              {char}
            </motion.span>))}
        </span>))}
    </div>);
}
// Magnetic hover effect
export function MagneticButton({ children, className = "", strength = 0.3 }) {
    const ref = useRef(null);
    const handleMouseMove = (e) => {
        if (!ref.current)
            return;
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };
    const handleMouseLeave = () => {
        if (ref.current) {
            ref.current.style.transform = `translate(0px, 0px)`;
        }
    };
    return (<motion.div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className={`transition-transform duration-200 ${className}`}>
      {children}
    </motion.div>);
}
