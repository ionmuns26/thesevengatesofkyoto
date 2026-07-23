import React, { useState } from 'react';
import JSZip from 'jszip';
import { Button } from '@/components/ui/button';
import { FileCode, CheckCircle, DownloadCloud } from 'lucide-react';

// Core app files
import appJsx from '../App.jsx?raw';
import indexCss from '../index.css?raw';
import tailwindConfig from '../../tailwind.config.js?raw';
import mainJsx from '../main.jsx?raw';

// Pages
import homeJsx from './Home.jsx?raw';
import loginJsx from './Login.jsx?raw';
import registerJsx from './Register.jsx?raw';
import forgotPasswordJsx from './ForgotPassword.jsx?raw';
import resetPasswordJsx from './ResetPassword.jsx?raw';
import downloadJsx from './Download.jsx?raw';

// Lib
import gateData from '../lib/gateData.js?raw';
import gateLockoutJs from '../lib/gateLockout.js?raw';
import authContextJsx from '../lib/AuthContext.jsx?raw';
import utilsJs from '../lib/utils.js?raw';
import appParamsJs from '../lib/app-params.js?raw';
import queryClientJs from '../lib/query-client.js?raw';
import pageNotFoundJs from '../lib/PageNotFound.jsx?raw';

// Game components
import gateMapJsx from '../components/game/GateMap.jsx?raw';
import gateChallengeJsx from '../components/game/GateChallenge.jsx?raw';
import finalGateJsx from '../components/game/FinalGate.jsx?raw';

// Minigames
import runnerGameJsx from '../components/game/minigames/RunnerGame.jsx?raw';
import investigationGameJsx from '../components/game/minigames/InvestigationGame.jsx?raw';
import choiceGameJsx from '../components/game/minigames/ChoiceGame.jsx?raw';
import sequenceGameJsx from '../components/game/minigames/SequenceGame.jsx?raw';
import cipherGameJsx from '../components/game/minigames/CipherGame.jsx?raw';

// UI components
import toriiGateJsx from '../components/ui/ToriiGate.jsx?raw';
import protectedRouteJsx from '../components/ProtectedRoute.jsx?raw';
import userNotRegisteredJsx from '../components/UserNotRegisteredError.jsx?raw';

// Effects
import sakuraPetalsJsx from '../components/effects/SakuraPetals.jsx?raw';
import fogEffectJsx from '../components/effects/FogEffect.jsx?raw';
import dragonBackgroundJsx from '../components/effects/DragonBackground.jsx?raw';
import inkWashTextureJsx from '../components/effects/InkWashTexture.jsx?raw';
import backgroundSliderJsx from '../components/effects/BackgroundSlider.jsx?raw';

// API
import base44ClientJs from '../api/base44Client.js?raw';

// index.html — injected as string (not importable via ?raw from root)
const utilsTsContent = `export function createPageUrl(pageName: string) {
    return '/' + pageName.replace(/ /g, '-');
}`;

const indexHtmlContent = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="https://base44.com/logo_v2.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="manifest" href="/manifest.json" />
    <title>The Seven Gates of Kyoto</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`;

const packageJsonContent = `{
  "name": "seven-gates-of-kyoto",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@base44/sdk": "^0.8.31",
    "@radix-ui/react-accordion": "^1.2.3",
    "@radix-ui/react-dialog": "^1.1.6",
    "@radix-ui/react-dropdown-menu": "^2.1.6",
    "@radix-ui/react-label": "^2.1.2",
    "@radix-ui/react-popover": "^1.1.6",
    "@radix-ui/react-select": "^2.1.6",
    "@radix-ui/react-separator": "^1.1.2",
    "@radix-ui/react-slot": "^1.1.2",
    "@radix-ui/react-tabs": "^1.1.3",
    "@radix-ui/react-toast": "^1.2.2",
    "@radix-ui/react-tooltip": "^1.1.8",
    "@tanstack/react-query": "^5.84.1",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "framer-motion": "^11.16.4",
    "jszip": "^3.10.1",
    "lucide-react": "^0.475.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.26.0",
    "tailwind-merge": "^3.0.2",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "@base44/vite-plugin": "^1.0.21",
    "@vitejs/plugin-react": "^4.0.0",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "vite": "^5.4.11"
  }
}`;

const viteConfigContent = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { base44Plugin } from '@base44/vite-plugin';

export default defineConfig({
  plugins: [react(), base44Plugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});`;

const postcssConfigContent = `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`;

const FILES = [
  // Core
  { path: 'src/App.jsx', content: appJsx },
  { path: 'src/main.jsx', content: mainJsx },
  { path: 'src/index.css', content: indexCss },
  { path: 'tailwind.config.js', content: tailwindConfig },

  // Pages
  { path: 'src/pages/Home.jsx', content: homeJsx },
  { path: 'src/pages/Login.jsx', content: loginJsx },
  { path: 'src/pages/Register.jsx', content: registerJsx },
  { path: 'src/pages/ForgotPassword.jsx', content: forgotPasswordJsx },
  { path: 'src/pages/ResetPassword.jsx', content: resetPasswordJsx },
  { path: 'src/pages/Download.jsx', content: downloadJsx },

  // Lib
  { path: 'src/lib/gateData.js', content: gateData },
  { path: 'src/lib/gateLockout.js', content: gateLockoutJs },
  { path: 'src/lib/AuthContext.jsx', content: authContextJsx },
  { path: 'src/lib/utils.js', content: utilsJs },
  { path: 'src/lib/app-params.js', content: appParamsJs },
  { path: 'src/lib/query-client.js', content: queryClientJs },
  { path: 'src/lib/PageNotFound.jsx', content: pageNotFoundJs },

  // Game
  { path: 'src/components/game/GateMap.jsx', content: gateMapJsx },
  { path: 'src/components/game/GateChallenge.jsx', content: gateChallengeJsx },
  { path: 'src/components/game/FinalGate.jsx', content: finalGateJsx },

  // Minigames
  { path: 'src/components/game/minigames/RunnerGame.jsx', content: runnerGameJsx },
  { path: 'src/components/game/minigames/InvestigationGame.jsx', content: investigationGameJsx },
  { path: 'src/components/game/minigames/ChoiceGame.jsx', content: choiceGameJsx },
  { path: 'src/components/game/minigames/SequenceGame.jsx', content: sequenceGameJsx },
  { path: 'src/components/game/minigames/CipherGame.jsx', content: cipherGameJsx },

  // UI Components
  { path: 'src/components/ui/ToriiGate.jsx', content: toriiGateJsx },
  { path: 'src/components/ProtectedRoute.jsx', content: protectedRouteJsx },
  { path: 'src/components/UserNotRegisteredError.jsx', content: userNotRegisteredJsx },

  // Effects
  { path: 'src/components/effects/SakuraPetals.jsx', content: sakuraPetalsJsx },
  { path: 'src/components/effects/FogEffect.jsx', content: fogEffectJsx },
  { path: 'src/components/effects/DragonBackground.jsx', content: dragonBackgroundJsx },
  { path: 'src/components/effects/InkWashTexture.jsx', content: inkWashTextureJsx },
  { path: 'src/components/effects/BackgroundSlider.jsx', content: backgroundSliderJsx },

  // API
  { path: 'src/api/base44Client.js', content: base44ClientJs },

  // Utils
  { path: 'src/utils/index.ts', content: utilsTsContent },

  // Root config files
  { path: 'index.html', content: indexHtmlContent },
  { path: 'package.json', content: packageJsonContent },
  { path: 'vite.config.js', content: viteConfigContent },
  { path: 'postcss.config.js', content: postcssConfigContent },
];

const UI_FILES = [
  { path: 'src/index.css', content: indexCss },
  { path: 'tailwind.config.js', content: tailwindConfig },
  { path: 'src/components/ui/ToriiGate.jsx', content: toriiGateJsx },
  { path: 'src/components/effects/SakuraPetals.jsx', content: sakuraPetalsJsx },
  { path: 'src/components/effects/FogEffect.jsx', content: fogEffectJsx },
  { path: 'src/components/effects/DragonBackground.jsx', content: dragonBackgroundJsx },
  { path: 'src/components/effects/InkWashTexture.jsx', content: inkWashTextureJsx },
  { path: 'src/components/effects/BackgroundSlider.jsx', content: backgroundSliderJsx },
];

const README = `# The Seven Gates of Kyoto — Source Code

## Tech Stack
React + Vite + Tailwind CSS + shadcn/ui + framer-motion

## File Structure
### Core
- src/App.jsx                                       App router & auth wrapper
- src/main.jsx                                      Entry point
- src/index.css                                     Design tokens, fonts, CSS animations
- tailwind.config.js                                Tailwind theme config

### Pages
- src/pages/Home.jsx                                Main page & landing view
- src/pages/Login.jsx                               Login page
- src/pages/Register.jsx                            Register page
- src/pages/ForgotPassword.jsx                      Forgot password page
- src/pages/ResetPassword.jsx                       Reset password page
- src/pages/Download.jsx                            This download page

### Lib
- src/lib/gateData.js                               All 6 gate puzzles & final code
- src/lib/gateLockout.js                            24h lockout logic
- src/lib/AuthContext.jsx                           Auth context & provider
- src/lib/utils.js                                  Utility functions

### Game Components
- src/components/game/GateMap.jsx                   Gate selection map
- src/components/game/GateChallenge.jsx             Puzzle challenge screen
- src/components/game/FinalGate.jsx                 Final gate & victory screen
- src/components/game/minigames/RunnerGame.jsx       Runner minigame
- src/components/game/minigames/InvestigationGame.jsx Investigation minigame
- src/components/game/minigames/ChoiceGame.jsx       Choice minigame
- src/components/game/minigames/SequenceGame.jsx     Sequence minigame
- src/components/game/minigames/CipherGame.jsx       Cipher minigame

### Effects
- src/components/effects/SakuraPetals.jsx           Falling sakura animation
- src/components/effects/FogEffect.jsx              Drifting fog layer
- src/components/effects/DragonBackground.jsx       Ink-wash landscape SVG
- src/components/effects/InkWashTexture.jsx         Paper/parchment texture
- src/components/effects/BackgroundSlider.jsx       Background image slider

## Dependencies
- framer-motion
- lucide-react
- @tanstack/react-query
- react-router-dom
- jszip
`;

export default function DownloadPage() {
  const [status, setStatus] = useState('idle');
  const [uiStatus, setUiStatus] = useState('idle');

  const handleDownload = async () => {
    setStatus('loading');
    const zip = new JSZip();
    FILES.forEach(({ path, content }) => zip.file(path, content));
    zip.file('README.md', README);
    const blob = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'seven-gates-of-kyoto.zip';
    link.click();
    URL.revokeObjectURL(link.href);
    setStatus('done');
  };

  const handleUiDownload = async () => {
    setUiStatus('loading');
    const zip = new JSZip();
    UI_FILES.forEach(({ path, content }) => zip.file(path, content));
    const blob = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'seven-gates-ui-only.zip';
    link.click();
    URL.revokeObjectURL(link.href);
    setUiStatus('done');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-lg w-full space-y-6">

        {/* Full source ZIP */}
        <div className="bg-card border border-border rounded-2xl p-8 text-center space-y-6">
          <div className="text-6xl">⛩</div>
          <div>
            <h1 className="font-display text-2xl text-secondary tracking-wider mb-2">
              The Seven Gates of Kyoto
            </h1>
            <p className="text-muted-foreground font-body text-sm">
              Download the complete source code as a ZIP file ({FILES.length} files)
            </p>
          </div>

          <div className="text-left space-y-1 bg-background/50 rounded-lg p-4 border border-border/50 max-h-64 overflow-y-auto">
            {FILES.map(({ path }) => (
              <div key={path} className="flex items-center gap-2 text-xs text-muted-foreground">
                <FileCode className="w-3 h-3 shrink-0 text-primary" />
                <span className="font-mono">{path}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <FileCode className="w-3 h-3 shrink-0 text-primary" />
              <span className="font-mono">README.md</span>
            </div>
          </div>

          <Button
            onClick={handleDownload}
            disabled={status === 'loading'}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-display tracking-widest uppercase py-6"
          >
            {status === 'loading' ? (
              <><div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />Packaging...</>
            ) : status === 'done' ? (
              <><CheckCircle className="w-4 h-4 mr-2" />Downloaded!</>
            ) : (
              <><DownloadCloud className="w-4 h-4 mr-2" />Download Full ZIP</>
            )}
          </Button>
          {status === 'done' && (
            <p className="text-secondary text-sm font-body italic">"The code is yours, traveler. Use it wisely."</p>
          )}
        </div>

        {/* UI only ZIP */}
        <div className="bg-card border border-border rounded-2xl p-8 text-center space-y-6">
          <div className="text-4xl">🎨</div>
          <div>
            <h2 className="font-display text-xl text-secondary tracking-wider mb-2">
              UI Files Only
            </h2>
            <p className="text-muted-foreground font-body text-sm">
              CSS, Tailwind config, effects & UI components ({UI_FILES.length} files)
            </p>
          </div>

          <div className="text-left space-y-1 bg-background/50 rounded-lg p-4 border border-border/50">
            {UI_FILES.map(({ path }) => (
              <div key={path} className="flex items-center gap-2 text-xs text-muted-foreground">
                <FileCode className="w-3 h-3 shrink-0 text-secondary" />
                <span className="font-mono">{path}</span>
              </div>
            ))}
          </div>

          <Button
            onClick={handleUiDownload}
            disabled={uiStatus === 'loading'}
            className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-display tracking-widest uppercase py-6"
          >
            {uiStatus === 'loading' ? (
              <><div className="w-4 h-4 border-2 border-secondary-foreground/30 border-t-secondary-foreground rounded-full animate-spin mr-2" />Packaging...</>
            ) : uiStatus === 'done' ? (
              <><CheckCircle className="w-4 h-4 mr-2" />Downloaded!</>
            ) : (
              <><DownloadCloud className="w-4 h-4 mr-2" />Download UI ZIP</>
            )}
          </Button>
          {uiStatus === 'done' && (
            <p className="text-secondary text-sm font-body italic">"Style flows like ink on parchment."</p>
          )}
        </div>

      </div>
    </div>
  );
}