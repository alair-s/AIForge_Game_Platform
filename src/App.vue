<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div id="app" class="cyberpunk-app">
    <header class="cyber-header glass">
      <div class="header-content">
        <div class="logo-section">
          <div class="cyber-logo">
            <span class="logo-text neon-green font-orbitron">AIForge</span>
            <span class="logo-text neon-cyan font-orbitron">Game Platform</span>
          </div>
          <div class="logo-glow"></div>
        </div>

        <nav class="cyber-nav">
          <RouterLink to="/" class="cyber-nav-link">Market</RouterLink>
          <RouterLink to="/preview" class="cyber-nav-link">3D Preview</RouterLink>
          <RouterLink to="/profile" class="cyber-nav-link">Profile</RouterLink>
          <RouterLink to="/create" class="cyber-nav-link">Create</RouterLink>
        </nav>

        <div class="header-actions">
          <button class="cyber-button" @click="$router.push('/profile')">Profile</button>
        </div>
      </div>
    </header>

    <main class="main-content">
      <RouterView />
    </main>

    <footer class="cyber-footer">
      <div class="footer-content">
        <p class="neon-cyan">© 2024 CyberMart - The Future of Digital Assets</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.cyberpunk-app {
  min-height: 100vh;
  background: var(--bg-primary);
  display: flex;
  flex-direction: column;
}

.cyber-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--glass-border);
  padding: 1rem 0;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.logo-section {
  position: relative;
  display: flex;
  align-items: center;
}

.cyber-logo {
  display: flex;
  align-items: center;
  gap: 4px;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: 2px;
}

.logo-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 40px;
  background: radial-gradient(circle, rgba(157, 255, 0, 0.3) 0%, transparent 70%);
  filter: blur(20px);
  animation: glowPulse 3s ease-in-out infinite;
}

.cyber-nav {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.cyber-nav-link {
  color: var(--text-primary);
  text-decoration: none;
  font-family: 'Orbitron', monospace;
  font-weight: 500;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  position: relative;
}

.cyber-nav-link:hover {
  color: var(--neon-green);
  background: rgba(157, 255, 0, 0.1);
  text-shadow: 0 0 10px var(--neon-green);
}

.cyber-nav-link.router-link-active {
  color: var(--neon-cyan);
  background: rgba(0, 229, 255, 0.1);
  text-shadow: 0 0 10px var(--neon-cyan);
}

.cyber-nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 2px;
  background: var(--neon-cyan);
  box-shadow: 0 0 10px var(--neon-cyan);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.main-content {
  flex: 1;
  padding: 2rem 0;
}

.cyber-footer {
  background: var(--bg-secondary);
  border-top: 1px solid var(--glass-border);
  padding: 2rem 0;
  text-align: center;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.cyber-footer p {
  font-family: 'Orbitron', monospace;
  font-size: 0.9rem;
  letter-spacing: 1px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
    padding: 0 1rem;
  }

  .cyber-nav {
    gap: 1rem;
  }

  .cyber-nav-link {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }

  .logo-text {
    font-size: 1.2rem;
  }
}
</style>
