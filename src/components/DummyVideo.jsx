import { useEffect, useRef } from 'react'

/**
 * DummyVideo — animated canvas placeholder that looks like a testimonial video.
 * Draws: gradient background, avatar silhouette, animated mouth, audio waveform,
 * brand label, and a subtle scanline overlay.
 */
export default function DummyVideo({ brand = 'ELUX', accentColor = '#4a6cf7' }) {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let frame = 0

    // Resize to container
    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      frame++

      // --- Background gradient ---
      const bg = ctx.createLinearGradient(0, 0, 0, H)
      bg.addColorStop(0, '#0a0d1a')
      bg.addColorStop(1, '#050810')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, W, H)

      // --- Subtle grid lines ---
      ctx.strokeStyle = 'rgba(80,110,255,0.04)'
      ctx.lineWidth = 1
      const gridSize = 28
      for (let x = 0; x < W; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
      }
      for (let y = 0; y < H; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
      }

      // --- Avatar circle ---
      const cx = W / 2
      const cy = H * 0.42
      const r = Math.min(W, H) * 0.22

      // Glow behind avatar
      const glowPulse = 0.55 + 0.12 * Math.sin(frame * 0.05)
      const glow = ctx.createRadialGradient(cx, cy, r * 0.3, cx, cy, r * 1.6)
      glow.addColorStop(0, `rgba(74,108,247,${glowPulse * 0.35})`)
      glow.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(cx, cy, r * 1.6, 0, Math.PI * 2)
      ctx.fill()

      // Avatar background
      const avatarGrad = ctx.createRadialGradient(cx, cy - r * 0.2, 0, cx, cy, r)
      avatarGrad.addColorStop(0, '#1e2a5e')
      avatarGrad.addColorStop(1, '#0e1640')
      ctx.fillStyle = avatarGrad
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.fill()

      // Avatar ring
      ctx.strokeStyle = `rgba(74,108,247,${0.5 + 0.2 * Math.sin(frame * 0.06)})`
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(cx, cy, r + 3, 0, Math.PI * 2)
      ctx.stroke()

      // Head silhouette
      const headR = r * 0.38
      ctx.fillStyle = '#2a3a80'
      ctx.beginPath()
      ctx.arc(cx, cy - r * 0.12, headR, 0, Math.PI * 2)
      ctx.fill()

      // Shoulders
      ctx.fillStyle = '#1a2660'
      ctx.beginPath()
      ctx.ellipse(cx, cy + r * 0.55, r * 0.55, r * 0.28, 0, 0, Math.PI)
      ctx.fill()

      // Animated mouth (speaking effect)
      const speakPhase = Math.sin(frame * 0.22) * Math.sin(frame * 0.17)
      const mouthOpen = Math.max(0, speakPhase) * 5
      ctx.fillStyle = 'rgba(0,0,20,0.7)'
      ctx.beginPath()
      ctx.ellipse(cx, cy + r * 0.06, 5, 2 + mouthOpen, 0, 0, Math.PI * 2)
      ctx.fill()

      // Eyes
      const eyeY = cy - r * 0.18
      const blinkFactor = frame % 120 < 5 ? 0.15 : 1
      ;[-1, 1].forEach((side) => {
        ctx.fillStyle = 'rgba(180,210,255,0.9)'
        ctx.beginPath()
        ctx.ellipse(cx + side * headR * 0.35, eyeY, 3, 3.5 * blinkFactor, 0, 0, Math.PI * 2)
        ctx.fill()
      })

      // --- Audio waveform at bottom ---
      const waveY = H * 0.78
      const bars = 28
      const barW = 3
      const spacing = (W * 0.6) / bars
      const startX = W * 0.2

      for (let i = 0; i < bars; i++) {
        const t = frame * 0.08 + i * 0.4
        const amp = (0.3 + 0.7 * Math.abs(Math.sin(t))) * (0.5 + 0.5 * Math.sin(frame * 0.05))
        const barH = 4 + amp * 20
        const alpha = 0.4 + 0.5 * amp

        ctx.fillStyle = `rgba(74,108,247,${alpha})`
        ctx.beginPath()
        ctx.roundRect(startX + i * spacing, waveY - barH / 2, barW, barH, 2)
        ctx.fill()
      }

      // --- Brand label top-left ---
      ctx.font = `bold ${Math.max(10, W * 0.038)}px system-ui, sans-serif`
      ctx.fillStyle = 'rgba(255,255,255,0.9)'
      ctx.textAlign = 'left'
      ctx.fillText(brand, W * 0.06, H * 0.1)

      // Dot indicator (recording)
      const dotPulse = 0.6 + 0.4 * Math.sin(frame * 0.08)
      ctx.fillStyle = `rgba(255,60,60,${dotPulse})`
      ctx.beginPath()
      ctx.arc(W * 0.88, H * 0.08, 4, 0, Math.PI * 2)
      ctx.fill()
      ctx.font = `${Math.max(8, W * 0.028)}px system-ui, sans-serif`
      ctx.fillStyle = `rgba(255,100,100,${dotPulse})`
      ctx.textAlign = 'right'
      ctx.fillText('LIVE', W * 0.94, H * 0.1)

      // --- Bottom caption bar ---
      ctx.fillStyle = 'rgba(10,14,40,0.85)'
      ctx.fillRect(0, H * 0.84, W, H * 0.16)
      ctx.font = `bold ${Math.max(9, W * 0.036)}px system-ui, sans-serif`
      ctx.fillStyle = 'rgba(255,255,255,0.95)'
      ctx.textAlign = 'left'
      ctx.fillText('Founder Testimonial', W * 0.06, H * 0.91)
      ctx.font = `${Math.max(7, W * 0.028)}px system-ui, sans-serif`
      ctx.fillStyle = 'rgba(150,170,255,0.7)'
      ctx.fillText(brand + ' · Elux Client', W * 0.06, H * 0.96)

      // --- Scanline overlay ---
      for (let y = 0; y < H; y += 4) {
        ctx.fillStyle = 'rgba(0,0,0,0.04)'
        ctx.fillRect(0, y, W, 2)
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [brand, accentColor])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  )
}
