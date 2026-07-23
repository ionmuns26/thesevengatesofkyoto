@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Noto+Serif+JP:wght@200;400;700;900&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 22 45% 4%;
    --foreground: 38 38% 87%;
    --card: 22 35% 7%;
    --card-foreground: 38 38% 87%;
    --popover: 22 35% 7%;
    --popover-foreground: 38 38% 87%;
    --primary: 0 72% 45%;
    --primary-foreground: 45 30% 95%;
    --secondary: 43 80% 50%;
    --secondary-foreground: 0 0% 5%;
    --muted: 0 0% 12%;
    --muted-foreground: 45 10% 55%;
    --accent: 43 80% 50%;
    --accent-foreground: 0 0% 5%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 15%;
    --input: 0 0% 15%;
    --ring: 0 72% 45%;
    --chart-1: 0 72% 45%;
    --chart-2: 43 80% 50%;
    --chart-3: 0 0% 85%;
    --chart-4: 0 0% 20%;
    --chart-5: 15 60% 50%;
    --radius: 0.5rem;
    --font-heading: 'Cinzel Decorative', serif;
    --font-body: 'Playfair Display', serif;
    --font-display: 'Cinzel Decorative', serif;
    --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    --sidebar-background: 0 0% 5%;
    --sidebar-foreground: 45 30% 90%;
    --sidebar-primary: 0 72% 45%;
    --sidebar-primary-foreground: 45 30% 95%;
    --sidebar-accent: 0 0% 12%;
    --sidebar-accent-foreground: 45 30% 90%;
    --sidebar-border: 0 0% 15%;
    --sidebar-ring: 0 72% 45%;
  }

  .dark {
    --background: 22 45% 4%;
    --foreground: 38 38% 87%;
    --card: 22 35% 7%;
    --card-foreground: 38 38% 87%;
    --popover: 22 35% 7%;
    --popover-foreground: 38 38% 87%;
    --primary: 0 72% 45%;
    --primary-foreground: 45 30% 95%;
    --secondary: 43 80% 50%;
    --secondary-foreground: 0 0% 5%;
    --muted: 0 0% 12%;
    --muted-foreground: 45 10% 55%;
    --accent: 43 80% 50%;
    --accent-foreground: 0 0% 5%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 15%;
    --input: 0 0% 15%;
    --ring: 0 72% 45%;
    --chart-1: 0 72% 45%;
    --chart-2: 43 80% 50%;
    --chart-3: 0 0% 85%;
    --chart-4: 0 0% 20%;
    --chart-5: 15 60% 50%;
    --sidebar-background: 0 0% 5%;
    --sidebar-foreground: 45 30% 90%;
    --sidebar-primary: 0 72% 45%;
    --sidebar-primary-foreground: 45 30% 95%;
    --sidebar-accent: 0 0% 12%;
    --sidebar-accent-foreground: 45 30% 90%;
    --sidebar-border: 0 0% 15%;
    --sidebar-ring: 0 72% 45%;
  }
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground font-body;
  }
}

/* Sakura petals animation */
@keyframes sakuraFall {
  0% { transform: translateY(-10vh) translateX(0) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(110vh) translateX(100px) rotate(720deg); opacity: 0; }
}

@keyframes sakuraFall2 {
  0% { transform: translateY(-10vh) translateX(0) rotate(0deg); opacity: 0; }
  10% { opacity: 0.8; }
  90% { opacity: 0.8; }
  100% { transform: translateY(110vh) translateX(-80px) rotate(-540deg); opacity: 0; }
}

@keyframes fogDrift {
  0% { transform: translateX(-100%); opacity: 0; }
  20% { opacity: 0.15; }
  80% { opacity: 0.15; }
  100% { transform: translateX(100%); opacity: 0; }
}

@keyframes lanternGlow {
  0%, 100% { filter: brightness(1) drop-shadow(0 0 10px rgba(255, 150, 50, 0.5)); }
  50% { filter: brightness(1.3) drop-shadow(0 0 20px rgba(255, 150, 50, 0.8)); }
}

@keyframes gateGlow {
  0%, 100% { box-shadow: 0 0 20px rgba(180, 30, 30, 0.3), inset 0 0 20px rgba(180, 30, 30, 0.1); }
  50% { box-shadow: 0 0 40px rgba(180, 30, 30, 0.6), inset 0 0 40px rgba(180, 30, 30, 0.2); }
}

@keyframes inkSpread {
  0% { clip-path: circle(0% at 50% 50%); }
  100% { clip-path: circle(100% at 50% 50%); }
}

@keyframes floatUp {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes pulseGold {
  0%, 100% { text-shadow: 0 0 10px rgba(212, 175, 55, 0.3); }
  50% { text-shadow: 0 0 30px rgba(212, 175, 55, 0.8), 0 0 60px rgba(212, 175, 55, 0.4); }
}

@keyframes dragonFloat {
  0%, 100% { transform: translateY(0) scale(1); opacity: 0.06; }
  50% { transform: translateY(-20px) scale(1.02); opacity: 0.1; }
}

.sakura-petal {
  animation: sakuraFall linear infinite;
}

.sakura-petal-alt {
  animation: sakuraFall2 linear infinite;
}

.fog-layer {
  animation: fogDrift 20s linear infinite;
}

.lantern-glow {
  animation: lanternGlow 3s ease-in-out infinite;
}

.gate-glow {
  animation: gateGlow 3s ease-in-out infinite;
}

.ink-reveal {
  animation: inkSpread 1.2s ease-out forwards;
}

.float-animation {
  animation: floatUp 4s ease-in-out infinite;
}

.gold-pulse {
  animation: pulseGold 3s ease-in-out infinite;
}

.dragon-float {
  animation: dragonFloat 8s ease-in-out infinite;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: hsl(0, 0%, 4%);
}
::-webkit-scrollbar-thumb {
  background: hsl(0, 72%, 30%);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: hsl(0, 72%, 45%);
}