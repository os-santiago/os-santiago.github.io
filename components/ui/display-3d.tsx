"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconHome,
  IconPlayerPlay,
  IconPlayerPause,
  IconCalendarEvent,
  IconX,
  IconExternalLink,
  IconCode,
} from "@tabler/icons-react";
import { DataRain } from "@/components/ui/data-rain";
import { QRCodeSVG } from "@/components/ui/qr-code";
import { members } from "@/data/members";
import { projects } from "@/data/projects";
import { events } from "@/data/events";
import { type Locale } from "@/i18n/config";

type Display3DProps = {
  locale: Locale;
};

export function Display3D({ locale }: Display3DProps) {
  const [currentFace, setCurrentFace] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // 3D rotation states
  const [manualRotX, setManualRotX] = useState<number>(-4);
  const [manualRotY, setManualRotY] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number; rotX: number; rotY: number }>({
    x: 0,
    y: 0,
    rotX: -4,
    rotY: 0,
  });

  const totalFaces = 5;
  const AUTOPLAY_INTERVAL_MS = 10000;
  const TICK_INTERVAL_MS = 100;

  const organizerMembers = members.filter((m) => m.role === "admin");
  
  // Specific requested projects: Homedir, Artemisa, ADEV, Joidy, devopsdays
  const requestedProjectKeys = ["homedir", "artemisa", "adev", "joidy", "devopsdays"];
  const spotlightProjects = projects.filter((p) =>
    requestedProjectKeys.some((k) => p.name.toLowerCase().includes(k))
  );

  const happyHourEvent = events.find((e) => e.id === "happy-hour-november-2024");

  const nextFace = useCallback(() => {
    setCurrentFace((prev) => prev + 1);
    setProgress(0);
  }, []);

  const prevFace = useCallback(() => {
    setCurrentFace((prev) => prev - 1);
    setProgress(0);
  }, []);

  // 60FPS fluid progress timer using requestAnimationFrame
  useEffect(() => {
    if (!isAutoPlay || isDragging) return;

    let animId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      setProgress((prev) => {
        const next = prev + (delta / AUTOPLAY_INTERVAL_MS) * 100;
        if (next >= 100) {
          nextFace();
          return 0;
        }
        return next;
      });

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isAutoPlay, isDragging, nextFace]);

  const handlePointerDown = (e: React.PointerEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("a") || target.closest(".interactive-card")) return;

    // Prevent browser native drag-select and callouts
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      rotX: manualRotX,
      rotY: manualRotY,
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;

    const nextY = dragStartRef.current.rotY + deltaX * 0.42;
    const nextX = Math.max(-60, Math.min(60, dragStartRef.current.rotX - deltaY * 0.35));

    setManualRotY(nextY);
    setManualRotX(nextX);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const faceAngle = 360 / totalFaces;
    const currentBaseRotY = -currentFace * faceAngle;
    const totalUserRotY = currentBaseRotY + manualRotY;
    const targetFace = -Math.round(totalUserRotY / faceAngle);

    setManualRotX(-4);
    setManualRotY(0);
    setCurrentFace(targetFace);
    if (isAutoPlay) {
      setProgress(0);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Space") {
        nextFace();
      } else if (e.key === "ArrowLeft") {
        prevFace();
      } else if (e.key === "p" || e.key === "P") {
        setIsAutoPlay((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextFace, prevFace]);

  const radius = 570;
  const angleStep = 360 / totalFaces;
  const totalRotY = -currentFace * angleStep + manualRotY;

  return (
    <div
      className="relative w-screen h-screen overflow-hidden bg-[#020509] select-none touch-none flex flex-col justify-center items-center font-sans antialiased select-none [*]:select-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Subtle Matrix / Data Rain */}
      <DataRain className="opacity-10 pointer-events-none" density={0.12} />

      {/* Perspective Floor */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(0,240,255,0.03)_0%,rgba(2,5,9,0.98)_100%)]" />
      <div
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 240, 255, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.12) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          transform: "perspective(800px) rotateX(70deg) scale(3)",
          transformOrigin: "center 90%",
        }}
      />

      {/* Top 10-Second Countdown line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-cyan/10 z-40">
        <div
          className={`h-full bg-cyan ${isAutoPlay ? "opacity-100" : "opacity-30"}`}
          style={{ width: `${progress}%`, transition: isAutoPlay ? 'none' : 'opacity 0.3s' }}
        />
      </div>

      {/* Only essential button: Pause / Play toggle */}
      <div className="absolute top-6 right-8 z-40">
        <button
          onClick={() => setIsAutoPlay((prev) => !prev)}
          className={`flex items-center gap-2.5 px-4 py-2 rounded-full font-mono text-xs tracking-wider border transition-colors duration-200 cursor-pointer shadow-lg ${
            isAutoPlay
              ? "border-cyan/50 bg-[#06111e] text-cyan hover:border-cyan"
              : "border-cyan/25 bg-[#020509] text-cyan-dim hover:text-cyan hover:border-cyan/50"
          }`}
          title="Pausar / Reanudar rotación 10s (Tecla P)"
        >
          {isAutoPlay ? (
            <>
              <IconPlayerPause size={14} className="text-cyan" />
              <span className="font-bold">10s</span>
            </>
          ) : (
            <>
              <IconPlayerPlay size={14} />
              <span>PAUSADO</span>
            </>
          )}
        </button>
      </div>

      {/* 3D SCENE STAGE */}
      <div className="display-3d-stage relative w-full h-full flex items-center justify-center overflow-hidden pointer-events-auto">
        <div
          className="display-3d-prism relative w-[340px] sm:w-[580px] md:w-[720px] h-[480px] sm:h-[530px] md:h-[560px]"
          style={{
            transform: `rotateX(${manualRotX}deg) rotateY(${totalRotY}deg)`,
            transition: isDragging
              ? "none"
              : "transform 1.1s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {/* ================= FACE 0: INTRODUCCION & COMUNIDAD ================= */}
          <div
            className="display-3d-face absolute inset-0 rounded-2xl border border-cyan/40 bg-[#060e18] p-7 sm:p-9 flex flex-col justify-between shadow-2xl"
            style={{
              transform: `rotateY(0deg) translateZ(${radius}px)`,
            }}
          >
            <div className="flex items-center justify-between border-b border-cyan/20 pb-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-cyan text-xs font-bold px-2.5 py-1 border border-cyan/30 rounded bg-cyan/10 tracking-wider">
                  SYS_INFO: 01
                </span>
                <span className="font-mono text-xs text-cyan-bright font-bold uppercase tracking-widest">
                  Comunidad Abierta
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-cyan-dim">
                <span className="w-2 h-2 rounded-full bg-cyan" />
                <span className="tracking-widest">SANTIAGO / LATAM</span>
              </div>
            </div>

            <div className="my-auto text-center space-y-5">
              <div className="inline-flex p-1.5 rounded-full border-2 border-cyan/40 bg-void-deep shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png"
                  alt="OS Santiago Logo"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
                />
              </div>

              <div>
                <h2 className="text-cyan font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
                  Open Source Santiago
                </h2>
                <p className="text-cyan-bright font-mono text-xs sm:text-sm font-semibold tracking-widest uppercase mt-2">
                  Comunidad, Código Abierto y Colaboración Real
                </p>
              </div>

              <p className="text-slate-200 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed font-sans font-normal">
                Somos un espacio comunitario de desarrolladores, ingenieros de software, arquitectos y creadores en Chile y Latinoamérica. Impulsamos proyectos reales, cultura DevOps, InnerSource y desarrollo aumentado asistido por IA (ADEV) con rigor técnico, mentoría e inclusión activa.
              </p>
            </div>

            <div className="border-t border-cyan/20 pt-3 flex items-center justify-between font-mono text-xs text-cyan-dim font-medium">
              <span>EST. 2024 / SANTIAGO, CHILE</span>
              <span className="text-cyan font-bold tracking-wider">ROTACIÓN AUTOMÁTICA O ARRASTRA →</span>
            </div>
          </div>

          {/* ================= FACE 1: QRS DE UNION Y REDES ================= */}
          <div
            className="display-3d-face absolute inset-0 rounded-2xl border border-cyan/40 bg-[#060e18] p-7 sm:p-9 flex flex-col justify-between shadow-2xl"
            style={{
              transform: `rotateY(${angleStep * 1}deg) translateZ(${radius}px)`,
            }}
          >
            <div className="flex items-center justify-between border-b border-cyan/20 pb-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-cyan text-xs font-bold px-2.5 py-1 border border-cyan/30 rounded bg-cyan/10 tracking-wider">
                  SYS_GATEWAY: 02
                </span>
                <span className="font-mono text-xs text-cyan-bright font-bold uppercase tracking-widest">
                  Escanear para Unirse
                </span>
              </div>
              <span className="font-mono text-xs text-cyan font-bold tracking-widest">INSTANT ACCESS</span>
            </div>

            <div className="my-auto">
              <h3 className="text-center text-cyan font-display text-xl sm:text-2xl font-extrabold mb-6 tracking-tight">
                Escanea y Únete a Nuestros Canales Oficiales
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-2xl mx-auto">
                {/* QR Discord */}
                <div className="flex flex-col items-center p-4 rounded-2xl border border-cyan/25 bg-[#081524] hover:border-cyan/50 transition-colors group">
                  <div className="flex items-center gap-2 text-cyan font-mono text-xs font-bold mb-3 tracking-wider">
                    <IconBrandDiscord size={18} className="text-cyan" />
                    <span>DISCORD</span>
                  </div>
                  <QRCodeSVG value="https://discord.gg/3eawzc9ybc" size={135} />
                  <span className="mt-3 text-xs text-slate-200 font-mono text-center font-medium">
                    Chat, debates & comunidad
                  </span>
                </div>

                {/* QR GitHub */}
                <div className="flex flex-col items-center p-4 rounded-2xl border border-cyan/25 bg-[#081524] hover:border-cyan/50 transition-colors group">
                  <div className="flex items-center gap-2 text-cyan font-mono text-xs font-bold mb-3 tracking-wider">
                    <IconBrandGithub size={18} className="text-cyan" />
                    <span>GITHUB</span>
                  </div>
                  <QRCodeSVG value="https://github.com/os-santiago" size={135} />
                  <span className="mt-3 text-xs text-slate-200 font-mono text-center font-medium">
                    Repositorios & código libre
                  </span>
                </div>

                {/* QR HomeDir */}
                <div className="flex flex-col items-center p-4 rounded-2xl border border-cyan/25 bg-[#081524] hover:border-cyan/50 transition-colors group">
                  <div className="flex items-center gap-2 text-cyan font-mono text-xs font-bold mb-3 tracking-wider">
                    <IconHome size={18} className="text-cyan" />
                    <span>HOMEDIR</span>
                  </div>
                  <QRCodeSVG value="https://homedir.opensourcesantiago.io" size={135} />
                  <span className="mt-3 text-xs text-slate-200 font-mono text-center font-medium">
                    Eventos, CFP & misiones
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-cyan/20 pt-3 flex items-center justify-between font-mono text-xs text-cyan-dim font-medium">
              <span>SCAN ANY QR CODE WITH YOUR PHONE CAMERA</span>
              <span className="text-cyan font-bold">TOTAL OPEN ACCESS</span>
            </div>
          </div>

          {/* ================= FACE 2: ORGANIZADORES ================= */}
          <div
            className="display-3d-face absolute inset-0 rounded-2xl border border-cyan/40 bg-[#060e18] p-7 sm:p-9 flex flex-col justify-between shadow-2xl"
            style={{
              transform: `rotateY(${angleStep * 2}deg) translateZ(${radius}px)`,
            }}
          >
            <div className="flex items-center justify-between border-b border-cyan/20 pb-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-cyan text-xs font-bold px-2.5 py-1 border border-cyan/30 rounded bg-cyan/10 tracking-wider">
                  SYS_STAFF: 03
                </span>
                <span className="font-mono text-xs text-cyan-bright font-bold uppercase tracking-widest">
                  Miembros Organizadores
                </span>
              </div>
              <span className="font-mono text-xs text-cyan font-bold tracking-widest">CORE TEAM</span>
            </div>

            <div className="my-auto">
              <h3 className="text-center text-cyan font-display text-xl sm:text-2xl font-extrabold mb-5 tracking-tight">
                Equipo de Organización & Staff
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 max-w-2xl mx-auto">
                {organizerMembers.map((member) => (
                  <div
                    key={member.userId}
                    className="flex items-center gap-3 p-3 rounded-xl border border-cyan/20 bg-[#081524] hover:border-cyan/40 transition-colors"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={member.avatarUrl}
                      alt={member.displayName}
                      className="w-11 h-11 rounded-full border border-cyan/40 object-cover flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1 text-left">
                      <div className="font-sans text-xs sm:text-sm font-bold text-slate-100 truncate">
                        {member.displayName}
                      </div>
                      <div className="font-mono text-[11px] text-cyan truncate font-semibold">
                        @{member.github}
                      </div>
                      <div className="font-mono text-[9px] text-cyan-bright uppercase tracking-wider font-bold mt-0.5">
                        ORGANIZADOR
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-cyan/20 pt-3 flex items-center justify-between font-mono text-xs text-cyan-dim font-medium">
              <span>IMPULSADO POR VOLUNTARIOS Y LA COMUNIDAD</span>
              <span className="text-cyan font-bold">@OS-SANTIAGO</span>
            </div>
          </div>

          {/* ================= FACE 3: PROYECTOS DESTACADOS ================= */}
          <div
            className="display-3d-face absolute inset-0 rounded-2xl border border-cyan/40 bg-[#060e18] p-7 sm:p-9 flex flex-col justify-between shadow-2xl overflow-hidden"
            style={{
              transform: `rotateY(${angleStep * 3}deg) translateZ(${radius}px)`,
            }}
          >
            {/* Header: Exact slide title and number requested */}
            <div className="flex items-center justify-between border-b border-cyan/20 pb-3 flex-shrink-0">
              <div className="flex items-center gap-3">
                <span className="font-mono text-cyan text-xs font-bold px-2.5 py-1 border border-cyan/30 rounded bg-cyan/10 tracking-wider">
                  SYS_PROJECTS: 04
                </span>
                <span className="font-mono text-xs text-cyan-bright font-bold uppercase tracking-widest">
                  Proyectos Estrella
                </span>
              </div>
              <span className="font-mono text-xs text-cyan font-bold tracking-widest">CORE ECOSYSTEM</span>
            </div>

            {/* Content area: 100% space filled with the 5 projects */}
            <div className="my-auto flex-1 flex flex-col justify-center py-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 w-full">
                {spotlightProjects.slice(0, 5).map((p, idx) => {
                  const targetUrl = p.homepageUrl || p.repoUrl;
                  const isLargeCard = idx === 0; // HomeDir takes 2 cols on tablet or prominent slot
                  return (
                    <div
                      key={p.name}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(selectedProject?.name === p.name ? null : p);
                      }}
                      className={`interactive-card cursor-pointer group p-3.5 rounded-xl border border-cyan/25 bg-[#081524] hover:border-cyan hover:bg-[#0c1e34] transition-all flex items-center justify-between gap-3 shadow-md ${
                        isLargeCard ? "sm:col-span-2 lg:col-span-2" : ""
                      }`}
                    >
                      <div className="min-w-0 flex-1 text-left">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-display font-black text-cyan text-sm sm:text-base group-hover:text-cyan-bright transition-colors truncate">
                            {p.name}
                          </span>
                          <span className="font-mono text-[9px] px-1.5 py-0.5 rounded border border-cyan/30 text-cyan-dim uppercase font-bold flex-shrink-0">
                            {p.language}
                          </span>
                        </div>
                        <p className="text-slate-300 text-xs leading-relaxed line-clamp-2 font-normal">
                          {p.description}
                        </p>
                        <div className="mt-1.5 text-[10px] font-mono text-cyan-dim truncate">
                          {p.authors?.[0]?.name || "OS Santiago"}
                        </div>
                      </div>

                      <div className="flex-shrink-0 flex flex-col items-center justify-center p-1.5 rounded-lg border border-cyan/30 bg-[#020509] group-hover:border-cyan transition-colors">
                        <QRCodeSVG value={targetUrl} size={50} />
                        <span className="text-[8px] font-mono text-cyan font-bold mt-1 tracking-tighter uppercase">
                          QR
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-cyan/20 pt-3 flex items-center justify-between font-mono text-xs text-cyan-dim font-medium flex-shrink-0">
              <span>HOMEDIR // ARTEMISA // ADEV // JOIDY // DEVOPSDAYS</span>
              <span className="text-cyan font-bold">TOCA CUALQUIER PROYECTO PARA QR GRANDE</span>
            </div>

            {/* EXPANDED MODAL OVERLAY */}
            {selectedProject && (
              <div
                className="absolute inset-0 z-50 rounded-2xl bg-[#030812]/98 p-6 flex flex-col items-center justify-center text-center animate-in fade-in duration-150"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProject(null);
                }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProject(null);
                  }}
                  className="absolute top-4 right-4 p-2 rounded-full border border-cyan/40 bg-void text-cyan hover:bg-cyan/20 transition-all cursor-pointer"
                  title="Cerrar QR"
                >
                  <IconX size={18} />
                </button>

                <div className="font-mono text-xs text-cyan font-bold px-3 py-1 rounded border border-cyan/40 bg-cyan/10 mb-2 uppercase tracking-widest">
                  {selectedProject.language}
                </div>

                <h4 className="font-display text-2xl font-black text-cyan mb-2">
                  {selectedProject.name}
                </h4>

                <p className="text-slate-200 text-xs sm:text-sm max-w-md mb-4 leading-relaxed font-sans">
                  {selectedProject.description}
                </p>

                <div className="p-3 rounded-2xl border-2 border-cyan/50 bg-[#020509] shadow-2xl my-1">
                  <QRCodeSVG
                    value={selectedProject.homepageUrl || selectedProject.repoUrl}
                    size={160}
                  />
                </div>

                <p className="font-mono text-xs text-cyan-bright mt-4 font-bold tracking-wider">
                  ESCANEA PARA ABRIR REPOSITORIO
                </p>

                <div className="mt-1 font-mono text-[11px] text-cyan-dim">
                  {selectedProject.homepageUrl || selectedProject.repoUrl}
                </div>
              </div>
            )}
          </div>

          {/* ================= FACE 4: HAPPY HOUR EVENT ================= */}
          <div
            className="display-3d-face absolute inset-0 rounded-2xl border border-cyan/40 bg-[#060e18] p-7 sm:p-9 flex flex-col justify-between shadow-2xl"
            style={{
              transform: `rotateY(${angleStep * 4}deg) translateZ(${radius}px)`,
            }}
          >
            <div className="flex items-center justify-between border-b border-cyan/20 pb-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-cyan text-xs font-bold px-2.5 py-1 border border-cyan/30 rounded bg-cyan/10 tracking-wider">
                  SYS_EVENT: 05
                </span>
                <span className="font-mono text-xs text-cyan-bright font-bold uppercase tracking-widest">
                  Evento Destacado
                </span>
              </div>
              <span className="font-mono text-xs text-cyan font-bold tracking-widest">MEETUP RECAP</span>
            </div>

            <div className="my-auto max-w-2xl mx-auto flex flex-col md:flex-row items-center gap-6">
              <div className="relative w-full md:w-1/2 aspect-[4/3] rounded-xl overflow-hidden border border-cyan/40 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/events/happy-hour-november-2024/photo-06.webp"
                  alt="Happy Hour November 2024 - Foto Oficial"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70" />
                <span className="absolute bottom-2.5 left-2.5 text-xs font-mono font-bold text-cyan bg-black/80 px-2 py-0.5 rounded border border-cyan/30">
                  Foto Oficial Comunidad
                </span>
              </div>

              <div className="w-full md:w-1/2 text-left space-y-3">
                <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-cyan px-2.5 py-1 rounded-lg bg-cyan/15 border border-cyan/30">
                  <IconCalendarEvent size={15} />
                  <span>21 de Noviembre, 2024</span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-extrabold text-cyan tracking-tight">
                  {happyHourEvent?.name || "Happy Hour November 2024"}
                </h3>

                <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-normal">
                  {happyHourEvent?.description ||
                    "Encuentro presencial de la comunidad Open Source Santiago: networking, debate técnico sobre desarrollo open source, cultura DevOps y colaboración libre."}
                </p>

                <div className="space-y-1 text-xs font-mono text-cyan-bright font-medium">
                  <div>📍 Lugar: Santiago Centro, Chile</div>
                  <div>👥 Asistentes: Desarrolladores, SysAdmins, DevOps, DevSecOps</div>
                  <div>🍻 Formato: Mesa redonda abierta y networking</div>
                </div>
              </div>
            </div>

            <div className="border-t border-cyan/20 pt-3 flex items-center justify-between font-mono text-xs text-cyan-dim font-medium">
              <span>SANTIAGO CENTRO - CHILE</span>
              <span className="text-cyan font-bold">NOS VEMOS EN EL PRÓXIMO ENCUENTRO</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
