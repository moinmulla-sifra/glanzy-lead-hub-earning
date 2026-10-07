import { useEffect, useRef } from "react";

interface NetworkNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  radius: number;
  depth: number; // 0.5 to 1.0
  baseAlpha: number;
  glow: number; // 0 to 1
  hue: number; // subtle variation around periwinkle / blue-purple (230 - 255)
}

interface NetworkConnection {
  from: number;
  to: number;
  distance: number;
}

interface NetworkPulse {
  fromNode: number;
  toNode: number;
  progress: number; // 0 to 1
  speed: number;
}

interface SignalRing {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export function BrandIntelligenceNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    let nodes: NetworkNode[] = [];
    let connections: NetworkConnection[] = [];
    let pulses: NetworkPulse[] = [];
    let signalRings: SignalRing[] = [];

    let lastPulseTime = 0;
    let lastRingTime = 0;
    let nextPulseDelay = 2200; // ms
    let nextRingDelay = 9000; // ms

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const prefersReducedMotion = mediaQuery.matches;

    // Determine node count by viewport width
    const getNodeCount = (w: number) => {
      if (w < 640) return 22;
      if (w < 1024) return 32;
      return 42;
    };

    // Initialize or resize canvas
    const resizeCanvas = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = Math.max(rect.height, window.innerHeight);

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      initNodes();
      updateConnections();

      if (prefersReducedMotion) {
        drawFrame(true);
      }
    };

    // Initialize distributed nodes with natural depth
    const initNodes = () => {
      const count = getNodeCount(width);
      nodes = [];
      pulses = [];
      signalRings = [];

      // 65% of nodes in upper 58% (hero section), 35% in lower section (feature cards)
      const heroCount = Math.floor(count * 0.65);
      const lowerCount = count - heroCount;

      for (let i = 0; i < count; i++) {
        const isHero = i < heroCount;
        const minY = isHero ? 40 : height * 0.55;
        const maxY = isHero ? height * 0.58 : height * 0.92;

        const x = 30 + Math.random() * (width - 60);
        const y = minY + Math.random() * (maxY - minY);

        // Slow subtle drift velocity (-0.12 to +0.12 px/frame)
        const speed = 0.06 + Math.random() * 0.08;
        const angle = Math.random() * Math.PI * 2;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;

        // Depth tiers: 0.5 (far), 0.75 (mid), 1.0 (near)
        const depth =
          Math.random() < 0.4 ? 0.5 : Math.random() < 0.75 ? 0.75 : 1.0;
        const baseRadius = 1.1 + depth * 1.1; // 1.65px to 2.2px
        const baseAlpha = 0.12 + depth * 0.14; // 0.19 to 0.26
        const hue = 232 + Math.floor(Math.random() * 22); // subtle periwinkle / blue-purple

        nodes.push({
          x,
          y,
          vx,
          vy,
          baseRadius,
          radius: baseRadius,
          depth,
          baseAlpha,
          glow: 0,
          hue,
        });
      }
    };

    // Calculate connections between nearby nodes (limit max connections per node to keep it organic)
    const updateConnections = () => {
      connections = [];
      const maxDistance = width < 640 ? 150 : 200;
      const maxConnPerNode = 3;
      const connCountMap = new Array(nodes.length).fill(0);

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (
            connCountMap[i] >= maxConnPerNode ||
            connCountMap[j] >= maxConnPerNode
          ) {
            continue;
          }

          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            connections.push({ from: i, to: j, distance: dist });
            connCountMap[i]++;
            connCountMap[j]++;
          }
        }
      }
    };

    // Draw single frame
    const drawFrame = (staticOnly = false) => {
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const maxDistance = width < 640 ? 150 : 200;

      // 1. Draw connection lines
      for (const conn of connections) {
        const nodeA = nodes[conn.from];
        const nodeB = nodes[conn.to];
        if (!nodeA || !nodeB) continue;

        const dx = nodeA.x - nodeB.x;
        const dy = nodeA.y - nodeB.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > maxDistance) continue;

        // Fade with distance and depth
        const distFade = 1 - dist / maxDistance;
        const depthFade = (nodeA.depth + nodeB.depth) / 2;

        // Smooth vertical fade towards the bottom of the page to keep feature cards 100% readable
        const midY = (nodeA.y + nodeB.y) / 2;
        const verticalFade =
          midY < height * 0.55
            ? 1
            : Math.max(0.2, 1 - (midY - height * 0.55) / (height * 0.45));

        const lineAlpha = distFade * 0.09 * depthFade * verticalFade;

        ctx.strokeStyle = `rgba(135, 155, 255, ${lineAlpha})`;
        ctx.lineWidth = 0.65;
        ctx.beginPath();
        ctx.moveTo(nodeA.x, nodeA.y);
        ctx.lineTo(nodeB.x, nodeB.y);
        ctx.stroke();
      }

      // 2. Draw active pulses along connections (data transmission / brand discovery)
      if (!staticOnly) {
        for (const pulse of pulses) {
          const from = nodes[pulse.fromNode];
          const to = nodes[pulse.toNode];
          if (!from || !to) continue;

          const px = from.x + (to.x - from.x) * pulse.progress;
          const py = from.y + (to.y - from.y) * pulse.progress;

          // Tiny glowing pulse dot
          const pulseAlpha = 0.55;
          ctx.fillStyle = `rgba(180, 200, 255, ${pulseAlpha})`;
          ctx.beginPath();
          ctx.arc(px, py, 1.6, 0, Math.PI * 2);
          ctx.fill();

          // Soft subtle halo around pulse
          const halo = ctx.createRadialGradient(px, py, 0, px, py, 5);
          halo.addColorStop(0, "rgba(160, 185, 255, 0.25)");
          halo.addColorStop(1, "rgba(160, 185, 255, 0)");
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(px, py, 5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 3. Draw soft signal rings (occasional expanding radar discovery pings)
      if (!staticOnly) {
        for (const ring of signalRings) {
          ctx.strokeStyle = `rgba(145, 165, 255, ${ring.alpha})`;
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // 4. Draw nodes (brands / opportunities)
      for (const node of nodes) {
        // Vertical fade factor
        const vFade =
          node.y < height * 0.55
            ? 1
            : Math.max(0.25, 1 - (node.y - height * 0.55) / (height * 0.45));

        const currentAlpha = (node.baseAlpha + node.glow * 0.35) * vFade;

        // Soft outer glow when node is active or receives a pulse
        if (node.glow > 0.05 && !staticOnly) {
          const glowRadius = node.radius * (3.5 + node.glow * 2);
          const glowGrad = ctx.createRadialGradient(
            node.x,
            node.y,
            0,
            node.x,
            node.y,
            glowRadius,
          );
          glowGrad.addColorStop(
            0,
            `rgba(150, 175, 255, ${0.35 * node.glow * vFade})`,
          );
          glowGrad.addColorStop(1, "rgba(150, 175, 255, 0)");
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Inner solid node core
        ctx.fillStyle = `rgba(145, 165, 255, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(
          node.x,
          node.y,
          node.radius + (node.glow > 0 ? 0.3 : 0),
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }

      ctx.restore();
    };

    // Animation loop
    const animate = (timestamp: number) => {
      // 1. Update node positions with slow drift & soft boundaries
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce gently off boundaries
        if (node.x < 20) {
          node.x = 20;
          node.vx *= -1;
        } else if (node.x > width - 20) {
          node.x = width - 20;
          node.vx *= -1;
        }

        if (node.y < 30) {
          node.y = 30;
          node.vy *= -1;
        } else if (node.y > height - 40) {
          node.y = height - 40;
          node.vy *= -1;
        }

        // Decay glow smoothly
        if (node.glow > 0) {
          node.glow = Math.max(0, node.glow - 0.012);
        }
      }

      // 2. Spawn occasional pulse (brand connection event)
      if (
        timestamp - lastPulseTime > nextPulseDelay &&
        connections.length > 0 &&
        pulses.length < 2
      ) {
        lastPulseTime = timestamp;
        nextPulseDelay = 2200 + Math.random() * 2600; // between 2.2s and 4.8s

        // Prefer hero section connections for the strongest visual impact
        const validConns = connections.filter((c) => {
          const from = nodes[c.from];
          return from && from.y < height * 0.65;
        });

        const pool = validConns.length > 0 ? validConns : connections;
        const chosen = pool[Math.floor(Math.random() * pool.length)];

        if (chosen) {
          // Determine direction
          const reverse = Math.random() > 0.5;
          const fromNode = reverse ? chosen.to : chosen.from;
          const toNode = reverse ? chosen.from : chosen.to;

          // Start node subtly glows
          if (nodes[fromNode]) {
            nodes[fromNode].glow = 0.5;
          }

          pulses.push({
            fromNode,
            toNode,
            progress: 0,
            speed: 0.007 + Math.random() * 0.005, // takes ~1.5 - 2s
          });
        }
      }

      // 3. Update pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        pulse.progress += pulse.speed;

        // Arrived at destination node: receiving node briefly glows
        if (pulse.progress >= 1) {
          if (nodes[pulse.toNode]) {
            nodes[pulse.toNode].glow = 0.75;
          }
          pulses.splice(i, 1);
        }
      }

      // 4. Spawn occasional signal ring (discovery radar pulse)
      if (timestamp - lastRingTime > nextRingDelay && signalRings.length < 1) {
        lastRingTime = timestamp;
        nextRingDelay = 8000 + Math.random() * 6000; // between 8s and 14s

        // Pick a node in the hero section
        const heroNodes = nodes.filter((n) => n.y < height * 0.5);
        if (heroNodes.length > 0) {
          const source =
            heroNodes[Math.floor(Math.random() * heroNodes.length)];
          signalRings.push({
            x: source.x,
            y: source.y,
            radius: 2,
            maxRadius: 36,
            alpha: 0.2,
          });
          source.glow = 0.6;
        }
      }

      // 5. Update signal rings
      for (let i = signalRings.length - 1; i >= 0; i--) {
        const ring = signalRings[i];
        ring.radius += 0.35;
        ring.alpha = 0.2 * (1 - ring.radius / ring.maxRadius);

        if (ring.radius >= ring.maxRadius) {
          signalRings.splice(i, 1);
        }
      }

      drawFrame(false);
      animationFrameId = requestAnimationFrame(animate);
    };

    // Initial setup
    resizeCanvas();

    if (!prefersReducedMotion) {
      animationFrameId = requestAnimationFrame(animate);
    }

    // Window resize handler
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeCanvas();
      }, 150);
    };

    window.addEventListener("resize", handleResize);

    // Visibility change handler (save CPU/battery when tab hidden)
    const handleVisibilityChange = () => {
      if (prefersReducedMotion) return;
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        lastPulseTime = performance.now();
        lastRingTime = performance.now();
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-90 transition-opacity duration-1000"
      />
    </div>
  );
}
