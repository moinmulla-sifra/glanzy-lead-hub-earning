import { useEffect, useRef } from "react";

interface Node {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  radius: number;
  depth: number; // 0.4 (background), 0.7 (midground), 1.0 (foreground)
  type: "brand" | "creator" | "deal";
  label?: string;
  tag?: string;
  tagOpacity: number;
  ringAngle: number;
  ringSpeed: number;
  ringRadius: number;
  glow: number;
  baseAlpha: number;
  orbitPhase: number;
}

interface Connection {
  from: number;
  to: number;
  distance: number;
  strength: number;
}

interface DealPacket {
  fromIndex: number;
  toIndex: number;
  progress: number; // 0 to 1
  speed: number;
  packetCount: number; // 1 to 3 trailing micro-dots
  hue: number;
}

interface RadarPing {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

const BRAND_LABELS = [
  { name: "Notion", tag: "$3.5k Deal" },
  { name: "Linear", tag: "B2B SaaS" },
  { name: "Spotify", tag: "Active Sponsor" },
  { name: "Gymshark", tag: "Verified Match" },
  { name: "Figma", tag: "+98% Fit" },
  { name: "NordVPN", tag: "$5k Budget" },
  { name: "Shopify", tag: "Creator Program" },
  { name: "Duolingo", tag: "Outreach Sent" },
];

export function BrandIntelligenceNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    let nodes: Node[] = [];
    let connections: Connection[] = [];
    let packets: DealPacket[] = [];
    let pings: RadarPing[] = [];

    let lastPacketTime = 0;
    let lastPingTime = 0;
    let nextPacketDelay = 1800; // ms
    let nextPingDelay = 7000; // ms

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const prefersReducedMotion = mediaQuery.matches;

    const resize = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = Math.max(rect.height, window.innerHeight);

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      initNetwork();
      if (prefersReducedMotion) {
        drawFrame(true);
      }
    };

    const initNetwork = () => {
      nodes = [];
      packets = [];
      pings = [];

      const isMobile = width < 640;
      const isTablet = width < 1024;
      const totalNodes = isMobile ? 26 : isTablet ? 38 : 52;

      // 65% of nodes in hero section (top 60%), 35% in lower cards section
      const heroCount = Math.floor(totalNodes * 0.65);

      for (let i = 0; i < totalNodes; i++) {
        const isHero = i < heroCount;
        const minY = isHero ? 60 : height * 0.58;
        const maxY = isHero ? height * 0.62 : height * 0.94;

        const x = 30 + Math.random() * (width - 60);
        const y = minY + Math.random() * (maxY - minY);

        // Slow, organic drift speed
        const speed = 0.08 + Math.random() * 0.09;
        const angle = Math.random() * Math.PI * 2;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;

        const depth =
          Math.random() < 0.35 ? 0.45 : Math.random() < 0.7 ? 0.75 : 1.0;

        // Node categorization
        let type: Node["type"] = "creator";
        let label: string | undefined;
        let tag: string | undefined;

        if (i < BRAND_LABELS.length && depth >= 0.75) {
          type = "brand";
          label = BRAND_LABELS[i].name;
          tag = BRAND_LABELS[i].tag;
        } else if (Math.random() < 0.25) {
          type = "deal";
        }

        const baseRadius =
          type === "brand"
            ? 3.4 * depth
            : type === "deal"
              ? 2.8 * depth
              : 2.1 * depth;

        nodes.push({
          id: `node-${i}`,
          x,
          y,
          vx,
          vy,
          baseRadius,
          radius: baseRadius,
          depth,
          type,
          label,
          tag,
          tagOpacity: type === "brand" ? 0.85 : 0,
          ringAngle: Math.random() * Math.PI * 2,
          ringSpeed: (Math.random() - 0.5) * 0.015,
          ringRadius: baseRadius * 4.2,
          glow: 0,
          baseAlpha: 0.2 + depth * 0.25,
          orbitPhase: Math.random() * Math.PI * 2,
        });
      }

      computeConnections();
    };

    const computeConnections = () => {
      connections = [];
      const maxDist = width < 640 ? 140 : 190;
      const maxConnPerNode = 3;
      const counts = new Array(nodes.length).fill(0);

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (counts[i] >= maxConnPerNode || counts[j] >= maxConnPerNode) {
            continue;
          }

          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            connections.push({
              from: i,
              to: j,
              distance: dist,
              strength: 1 - dist / maxDist,
            });
            counts[i]++;
            counts[j]++;
          }
        }
      }
    };

    const drawFrame = (staticOnly = false) => {
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const maxDist = width < 640 ? 140 : 190;
      const mouse = mouseRef.current;

      // 1. Draw subtle background coordinate lattice (faint high-tech intelligence grid)
      const gridSpacing = width < 640 ? 120 : 160;
      const gridCols = Math.ceil(width / gridSpacing);
      const gridRows = Math.ceil((height * 0.7) / gridSpacing);

      ctx.strokeStyle = "rgba(125, 140, 255, 0.018)";
      ctx.lineWidth = 0.5;
      for (let c = 0; c <= gridCols; c++) {
        const gx = c * gridSpacing;
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, height * 0.7);
        ctx.stroke();
      }
      for (let r = 0; r <= gridRows; r++) {
        const gy = r * gridSpacing;
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(width, gy);
        ctx.stroke();
      }

      // Faint coordinate intersection crosses
      ctx.strokeStyle = "rgba(140, 160, 255, 0.05)";
      ctx.lineWidth = 0.75;
      for (let c = 0; c <= gridCols; c++) {
        for (let r = 0; r <= gridRows; r++) {
          const gx = c * gridSpacing;
          const gy = r * gridSpacing;
          ctx.beginPath();
          ctx.moveTo(gx - 2.5, gy);
          ctx.lineTo(gx + 2.5, gy);
          ctx.moveTo(gx, gy - 2.5);
          ctx.lineTo(gx, gy + 2.5);
          ctx.stroke();
        }
      }

      // 2. Draw Connection Lines between nodes
      for (const conn of connections) {
        const nodeA = nodes[conn.from];
        const nodeB = nodes[conn.to];
        if (!nodeA || !nodeB) continue;

        const dx = nodeA.x - nodeB.x;
        const dy = nodeA.y - nodeB.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > maxDist) continue;

        const distFactor = 1 - dist / maxDist;
        const depthFactor = (nodeA.depth + nodeB.depth) / 2;

        const midY = (nodeA.y + nodeB.y) / 2;
        const vFade =
          midY < height * 0.55
            ? 1
            : Math.max(0.18, 1 - (midY - height * 0.55) / (height * 0.45));

        // Dual-tone gradient line matching Branzly UI: Brand Indigo (rgba(124, 140, 252)) to Purple (rgba(168, 139, 255))
        const lineGrad = ctx.createLinearGradient(
          nodeA.x,
          nodeA.y,
          nodeB.x,
          nodeB.y,
        );
        const baseAlpha = distFactor * 0.16 * depthFactor * vFade;

        lineGrad.addColorStop(0, `rgba(124, 140, 252, ${baseAlpha})`);
        lineGrad.addColorStop(0.5, `rgba(150, 130, 255, ${baseAlpha * 1.25})`);
        lineGrad.addColorStop(1, `rgba(168, 139, 255, ${baseAlpha})`);

        ctx.strokeStyle = lineGrad;
        ctx.lineWidth = depthFactor >= 0.75 ? 0.8 : 0.5;
        ctx.beginPath();
        ctx.moveTo(nodeA.x, nodeA.y);
        ctx.lineTo(nodeB.x, nodeB.y);
        ctx.stroke();
      }

      // 3. Interactive Mouse Attractor Threads (gently lights up connections to cursor)
      if (mouse.active && !staticOnly) {
        const mouseRadius = 180;
        for (const node of nodes) {
          const mdx = node.x - mouse.x;
          const mdy = node.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < mouseRadius) {
            const mAlpha = (1 - mdist / mouseRadius) * 0.22 * node.depth;
            ctx.strokeStyle = `rgba(135, 155, 255, ${mAlpha})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // 4. Draw Traveling Deal Packets (Data flow & outreach in transit)
      if (!staticOnly) {
        for (const packet of packets) {
          const from = nodes[packet.fromIndex];
          const to = nodes[packet.toIndex];
          if (!from || !to) continue;

          const px = from.x + (to.x - from.x) * packet.progress;
          const py = from.y + (to.y - from.y) * packet.progress;

          // Trailing micro-particles
          for (let p = 0; p < packet.packetCount; p++) {
            const trailOffset = p * 0.035;
            const trailProg = Math.max(0, packet.progress - trailOffset);
            const tx = from.x + (to.x - from.x) * trailProg;
            const ty = from.y + (to.y - from.y) * trailProg;

            const pAlpha = (1 - p * 0.3) * 0.75;
            const pSize = 1.8 - p * 0.4;

            ctx.fillStyle = `rgba(200, 215, 255, ${pAlpha})`;
            ctx.beginPath();
            ctx.arc(tx, ty, pSize, 0, Math.PI * 2);
            ctx.fill();

            // Luminous halo around leading packet
            if (p === 0) {
              const packetHalo = ctx.createRadialGradient(
                tx,
                ty,
                0,
                tx,
                ty,
                7.5,
              );
              packetHalo.addColorStop(0, "rgba(140, 165, 255, 0.45)");
              packetHalo.addColorStop(0.5, "rgba(124, 140, 252, 0.2)");
              packetHalo.addColorStop(1, "rgba(124, 140, 252, 0)");
              ctx.fillStyle = packetHalo;
              ctx.beginPath();
              ctx.arc(tx, ty, 7.5, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      // 5. Draw Expanding Radar Pings (Brand match verification wave)
      if (!staticOnly) {
        for (const ping of pings) {
          ctx.strokeStyle = `rgba(140, 160, 255, ${ping.alpha})`;
          ctx.lineWidth = 0.85;
          ctx.beginPath();
          ctx.arc(ping.x, ping.y, ping.radius, 0, Math.PI * 2);
          ctx.stroke();

          // Second subtle harmonic ripple
          if (ping.radius > 8) {
            ctx.strokeStyle = `rgba(165, 140, 255, ${ping.alpha * 0.6})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.arc(ping.x, ping.y, ping.radius - 7, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      }

      // 6. Draw Nodes (Brands, Creators, Deal Hubs)
      for (const node of nodes) {
        const vFade =
          node.y < height * 0.55
            ? 1
            : Math.max(0.2, 1 - (node.y - height * 0.55) / (height * 0.45));

        const effectiveGlow = Math.max(node.glow, 0);
        const nodeAlpha = (node.baseAlpha + effectiveGlow * 0.4) * vFade;

        // A. Orbital Rings for Brand & Deal Hubs
        if ((node.type === "brand" || node.type === "deal") && !staticOnly) {
          ctx.save();
          ctx.translate(node.x, node.y);
          ctx.rotate(node.ringAngle);

          // Concentric dashed orbit ring
          ctx.strokeStyle = `rgba(140, 160, 255, ${0.12 * node.depth * vFade})`;
          ctx.lineWidth = 0.6;
          ctx.setLineDash([3, 4]);
          ctx.beginPath();
          ctx.arc(0, 0, node.ringRadius, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);

          // Tiny satellite beacon on orbit
          ctx.fillStyle = `rgba(180, 200, 255, ${0.45 * node.depth * vFade})`;
          ctx.beginPath();
          ctx.arc(node.ringRadius, 0, 1.2, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        }

        // B. Node Outer Glow Halo
        const glowRadius =
          node.radius * (node.type === "brand" ? 4.5 : 3.5) +
          effectiveGlow * 4.5;
        const glowGrad = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          glowRadius,
        );

        const glowColor =
          node.type === "brand"
            ? "rgba(124, 140, 252," // Brand periwinkle
            : node.type === "deal"
              ? "rgba(168, 139, 255," // Soft violet
              : "rgba(140, 175, 255,"; // Cool blue

        glowGrad.addColorStop(
          0,
          `${glowColor} ${(0.28 + effectiveGlow * 0.35) * vFade})`,
        );
        glowGrad.addColorStop(0.6, `${glowColor} ${0.08 * vFade})`);
        glowGrad.addColorStop(1, `${glowColor} 0)`);

        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // C. Solid Core Beacon
        const coreRadius = node.radius + (effectiveGlow > 0 ? 0.4 : 0);
        ctx.fillStyle =
          node.type === "brand"
            ? `rgba(220, 230, 255, ${Math.min(1, nodeAlpha * 1.5)})`
            : `rgba(160, 180, 255, ${nodeAlpha})`;

        ctx.beginPath();
        ctx.arc(node.x, node.y, coreRadius, 0, Math.PI * 2);
        ctx.fill();

        // D. High-Fidelity Micro Data Chips / Tags for Brand Hubs
        if (node.label && node.tag && node.y < height * 0.58) {
          const chipX = node.x + node.radius + 6;
          const chipY = node.y - 4;

          ctx.font = "600 9px Inter, sans-serif";
          ctx.textAlign = "left";

          // Micro Brand Name
          ctx.fillStyle = `rgba(240, 245, 255, ${0.45 * node.tagOpacity * vFade})`;
          ctx.fillText(node.label, chipX, chipY);

          // Sub-chip tag (e.g. "+98% Fit", "$3.5k Deal")
          ctx.font = "500 7.5px Inter, sans-serif";
          ctx.fillStyle = `rgba(140, 165, 255, ${0.55 * node.tagOpacity * vFade})`;
          ctx.fillText(node.tag, chipX, chipY + 9);
        }
      }

      ctx.restore();
    };

    const animate = (timestamp: number) => {
      const mouse = mouseRef.current;

      // 1. Update nodes with gentle drift & mouse proximity repulsion/gravitation
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        // Orbit ring rotation
        node.ringAngle += node.ringSpeed;

        // Gentle cursor interaction
        if (mouse.active) {
          const mdx = mouse.x - node.x;
          const mdy = mouse.y - node.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < 140 && mdist > 5) {
            const force = (1 - mdist / 140) * 0.08;
            node.x += (mdx / mdist) * force;
            node.y += (mdy / mdist) * force;
            node.glow = Math.min(1, node.glow + 0.02);
          }
        }

        // Boundary constraints
        if (node.x < 25) {
          node.x = 25;
          node.vx *= -1;
        } else if (node.x > width - 25) {
          node.x = width - 25;
          node.vx *= -1;
        }

        if (node.y < 40) {
          node.y = 40;
          node.vy *= -1;
        } else if (node.y > height - 40) {
          node.y = height - 40;
          node.vy *= -1;
        }

        // Glow decay
        if (node.glow > 0) {
          node.glow = Math.max(0, node.glow - 0.01);
        }
      }

      // 2. Spawn Deal Packets (Dynamic partnership transaction streams)
      if (
        timestamp - lastPacketTime > nextPacketDelay &&
        connections.length > 0 &&
        packets.length < 3
      ) {
        lastPacketTime = timestamp;
        nextPacketDelay = 1400 + Math.random() * 2200; // between 1.4s and 3.6s

        // Prefer hero section connections
        const heroConns = connections.filter((c) => {
          const from = nodes[c.from];
          return from && from.y < height * 0.65;
        });

        const pool = heroConns.length > 0 ? heroConns : connections;
        const chosen = pool[Math.floor(Math.random() * pool.length)];

        if (chosen) {
          const reverse = Math.random() > 0.5;
          const fromIndex = reverse ? chosen.to : chosen.from;
          const toIndex = reverse ? chosen.from : chosen.to;

          if (nodes[fromIndex]) {
            nodes[fromIndex].glow = 0.6;
          }

          packets.push({
            fromIndex,
            toIndex,
            progress: 0,
            speed: 0.008 + Math.random() * 0.006,
            packetCount: Math.random() < 0.6 ? 3 : 2,
            hue: 240,
          });
        }
      }

      // 3. Update Deal Packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const packet = packets[i];
        packet.progress += packet.speed;

        if (packet.progress >= 1) {
          if (nodes[packet.toIndex]) {
            nodes[packet.toIndex].glow = 0.85;

            // Trigger small harmonic ping on receiving node
            if (nodes[packet.toIndex].type === "brand" && pings.length < 2) {
              pings.push({
                x: nodes[packet.toIndex].x,
                y: nodes[packet.toIndex].y,
                radius: 4,
                maxRadius: 38,
                alpha: 0.28,
                color: "rgba(124, 140, 252,",
              });
            }
          }
          packets.splice(i, 1);
        }
      }

      // 4. Spawn Radar Waves (Brand Discovery Sonar Pings)
      if (timestamp - lastPingTime > nextPingDelay && pings.length < 2) {
        lastPingTime = timestamp;
        nextPingDelay = 6500 + Math.random() * 5000;

        const candidateNodes = nodes.filter(
          (n) => n.y < height * 0.52 && (n.type === "brand" || n.depth >= 0.75),
        );

        if (candidateNodes.length > 0) {
          const source =
            candidateNodes[Math.floor(Math.random() * candidateNodes.length)];
          pings.push({
            x: source.x,
            y: source.y,
            radius: 3,
            maxRadius: 46,
            alpha: 0.25,
            color: "rgba(140, 160, 255,",
          });
          source.glow = 0.7;
        }
      }

      // 5. Update Radar Waves
      for (let i = pings.length - 1; i >= 0; i--) {
        const ping = pings[i];
        ping.radius += 0.45;
        ping.alpha = 0.25 * (1 - ping.radius / ping.maxRadius);

        if (ping.radius >= ping.maxRadius) {
          pings.splice(i, 1);
        }
      }

      drawFrame(false);
      animId = requestAnimationFrame(animate);
    };

    resize();

    if (!prefersReducedMotion) {
      animId = requestAnimationFrame(animate);
    }

    // Window mouse move listener for subtle proximity attractor
    const handleMouseMove = (e: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };

    window.addEventListener("resize", handleResize);

    const handleVisibility = () => {
      if (prefersReducedMotion) return;
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else {
        lastPacketTime = performance.now();
        lastPingTime = performance.now();
        animId = requestAnimationFrame(animate);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
      clearTimeout(resizeTimer);
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
        className="w-full h-full block opacity-95 transition-opacity duration-1000"
      />
    </div>
  );
}
