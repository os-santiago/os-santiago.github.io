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
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [isPreloaded, setIsPreloaded] = useState<boolean>(false);
  const [preloadCount, setPreloadCount] = useState<number>(0);

  // 3D rotation states
  const [manualRotX, setManualRotX] = useState<number>(-4);
  const [manualRotY, setManualRotY] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{
    x: number;
    y: number;
    rotX: number;
    rotY: number;
  }>({
    x: 0,
    y: 0,
    rotX: -4,
    rotY: 0,
  });

  const totalFaces = 5;
  const AUTOPLAY_INTERVAL_MS = 10000;
  const TICK_INTERVAL_MS = 100;

  // Staff list with exact linkedins & Sebithaz added
  const staffMembers = [
    {
      userId: "axel-damage",
      displayName: "NULL",
      github: "Axel-DaMage",
      avatarUrl: "https://avatars.githubusercontent.com/u/178504369?v=4",
      linkedin: "https://www.linkedin.com/in/axel-moraga/",
      role: "STAFF",
    },
    {
      userId: "scanalesespinoza",
      displayName: "Sergio Canales",
      github: "scanalesespinoza",
      avatarUrl: "https://avatars.githubusercontent.com/u/11546953?v=4",
      linkedin: "https://www.linkedin.com/in/sergio-canales-espinoza/",
      role: "STAFF",
    },
    {
      userId: "caiodonascimento",
      displayName: "Caio Medeiros",
      github: "caiodonascimento",
      avatarUrl: "https://avatars.githubusercontent.com/u/16939674?v=4",
      linkedin: "https://www.linkedin.com/in/caiodona/",
      role: "STAFF",
    },
    {
      userId: "pcastelo",
      displayName: "Pablo Castelo",
      github: "pcastelo",
      avatarUrl: "https://avatars.githubusercontent.com/u/10425803?v=4",
      linkedin: "https://www.linkedin.com/in/pablocastelo/",
      role: "STAFF",
    },
    {
      userId: "vectorg99",
      displayName: "Diego Hernandez",
      github: "VECTORG99",
      avatarUrl: "https://avatars.githubusercontent.com/u/205457455?v=4",
      linkedin: "https://www.linkedin.com/in/vectorg99/",
      role: "STAFF",
    },
    {
      userId: "sebithaz-dev",
      displayName: "Seb",
      github: "Sebithaz-dev",
      avatarUrl: "https://avatars.githubusercontent.com/u/172279538?v=4",
      linkedin: "https://www.linkedin.com/in/sebastian-escobar-37b7a8287/",
      role: "STAFF",
    },
  ];

  // Specific requested projects: Homedir, Artemisa, ADEV, Joidy, devopsdays, DataGestor (6 projects for balanced 3x2 grid)
  const requestedProjectKeys = [
    "homedir",
    "artemisa",
    "adev",
    "joidy",
    "devopsdays",
    "datagestor",
  ];
  const spotlightProjects = projects.filter((p) =>
    requestedProjectKeys.some((k) => p.name.toLowerCase().includes(k)),
  );

  const happyHourEvent = events.find(
    (e) => e.id === "happy-hour-november-2024",
  );

  const nextFace = useCallback(() => {
    setCurrentFace((prev) => prev + 1);
    setProgress(0);
  }, []);

  const prevFace = useCallback(() => {
    setCurrentFace((prev) => prev - 1);
    setProgress(0);
  }, []);

  // Preload and cache all assets (photos, logos, avatar images, and QRs) upfront
  useEffect(() => {
    const urlsToPreload = [
      "/logo.png",
      "/events/happy-hour-november-2024/photo-06.webp",
      ...staffMembers.map((m) => m.avatarUrl),
      ...staffMembers.map(
        (m) =>
          "https://quickchart.io/qr?text=" +
          encodeURIComponent(m.linkedin) +
          "&size=435&ecLevel=Q&margin=1&dark=00f0ff&light=00000000&format=svg",
      ),
      // All QR codes used in the kiosk
      "https://quickchart.io/qr?text=" +
        encodeURIComponent("https://discord.gg/3eawzc9ybc") +
        "&size=435&ecLevel=Q&margin=1&dark=00f0ff&light=00000000&format=svg",
      "https://quickchart.io/qr?text=" +
        encodeURIComponent("https://github.com/os-santiago") +
        "&size=435&ecLevel=Q&margin=1&dark=00f0ff&light=00000000&format=svg",
      "https://quickchart.io/qr?text=" +
        encodeURIComponent("https://homedir.opensourcesantiago.io") +
        "&size=435&ecLevel=Q&margin=1&dark=00f0ff&light=00000000&format=svg",
      ...spotlightProjects.map(
        (p) =>
          "https://quickchart.io/qr?text=" +
          encodeURIComponent(p.homepageUrl || p.repoUrl) +
          "&size=480&ecLevel=Q&margin=1&dark=00f0ff&light=00000000&format=svg",
      ),
    ];

    let loaded = 0;
    const total = urlsToPreload.length;

    const timer = setTimeout(() => {
      // Fallback safe timeout to ensure kiosk displays even on slow network
      setIsPreloaded(true);
    }, 3500);

    urlsToPreload.forEach((url) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loaded++;
        setPreloadCount(Math.round((loaded / total) * 100));
        if (loaded >= total) {
          clearTimeout(timer);
          setIsPreloaded(true);
        }
      };
      img.src = url;
    });

    return () => clearTimeout(timer);
  }, []);

  // 60FPS fluid progress timer using requestAnimationFrame
  useEffect(() => {
    if (!isAutoPlay || isDragging || !isPreloaded) return;

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
    if (
      target.closest("button") ||
      target.closest("a") ||
      target.closest(".interactive-card")
    )
      return;

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
    const nextX = Math.max(
      -60,
      Math.min(60, dragStartRef.current.rotX - deltaY * 0.35),
    );

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
      className="relative flex h-screen w-screen touch-none flex-col items-center justify-center overflow-hidden bg-[#020509] font-sans antialiased select-none [*]:select-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Kiosk High-Performance Preloader Screen */}
      {!isPreloaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020509] p-6 text-center select-none">
          <div className="relative mb-6 h-20 w-20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="OS Santiago Logo"
              className="border-cyan/40 h-full w-full animate-pulse rounded-full border-2 object-cover"
            />
          </div>

          <div className="text-cyan mb-2 font-mono text-xs font-bold tracking-widest uppercase">
            OPEN SOURCE SANTIAGO // MODO DISPLAY
          </div>

          <div className="mb-4 font-mono text-xs text-slate-300">
            Caché y precarga de componentes y QRs... {preloadCount}%
          </div>

          <div className="bg-cyan/15 border-cyan/30 h-1.5 w-64 overflow-hidden rounded-full border">
            <div
              className="bg-cyan h-full transition-all duration-150 ease-out"
              style={{ width: `${preloadCount}%` }}
            />
          </div>

          <div className="text-cyan-dim mt-4 font-mono text-[10px] tracking-widest uppercase">
            OPTIMIZADO PARA PANTALLAS Y STANDS
          </div>
        </div>
      )}

      {/* Subtle Matrix / Data Rain */}
      <DataRain className="pointer-events-none opacity-10" density={0.12} />

      {/* Perspective Floor */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(0,240,255,0.03)_0%,rgba(2,5,9,0.98)_100%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 240, 255, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.12) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          transform: "perspective(800px) rotateX(70deg) scale(3)",
          transformOrigin: "center 90%",
        }}
      />

      {/* Top 10-Second Countdown line */}
      <div className="bg-cyan/10 absolute top-0 right-0 left-0 z-40 h-1">
        <div
          className={`bg-cyan h-full ${isAutoPlay ? "opacity-100" : "opacity-30"}`}
          style={{
            width: `${progress}%`,
            transition: isAutoPlay ? "none" : "opacity 0.3s",
          }}
        />
      </div>

      {/* Only essential button: Pause / Play toggle */}
      <div className="absolute top-6 right-8 z-40">
        <button
          onClick={() => setIsAutoPlay((prev) => !prev)}
          className={`flex cursor-pointer items-center gap-2.5 rounded-full border px-4 py-2 font-mono text-xs tracking-wider shadow-lg transition-colors duration-200 ${
            isAutoPlay
              ? "border-cyan/50 text-cyan hover:border-cyan bg-[#06111e]"
              : "border-cyan/25 text-cyan-dim hover:text-cyan hover:border-cyan/50 bg-[#020509]"
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
      <div className="display-3d-stage pointer-events-auto relative flex h-full w-full items-center justify-center overflow-hidden">
        <div
          className="display-3d-prism relative h-[480px] w-[340px] sm:h-[530px] sm:w-[580px] md:h-[560px] md:w-[720px]"
          style={{
            transform: `rotateX(${manualRotX}deg) rotateY(${totalRotY}deg)`,
            transition: isDragging
              ? "none"
              : "transform 1.1s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {/* ================= FACE 0: INTRODUCCION & COMUNIDAD ================= */}
          <div
            className="display-3d-face border-cyan/40 absolute inset-0 flex flex-col justify-between rounded-2xl border bg-[#060e18] p-7 shadow-2xl sm:p-9"
            style={{
              transform: `rotateY(0deg) translateZ(${radius}px)`,
            }}
          >
            <div className="border-cyan/20 flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-3">
                <span className="text-cyan border-cyan/30 bg-cyan/10 rounded border px-2.5 py-1 font-mono text-xs font-bold tracking-wider">
                  SYS_INFO: 01
                </span>
                <span className="text-cyan-bright font-mono text-xs font-bold tracking-widest uppercase">
                  Comunidad Abierta
                </span>
              </div>
              <div className="text-cyan-dim flex items-center gap-2 font-mono text-xs">
                <span className="bg-cyan h-2 w-2 rounded-full" />
                <span className="tracking-widest">SANTIAGO / LATAM</span>
              </div>
            </div>

            <div className="my-auto space-y-5 text-center">
              <div className="border-cyan/40 bg-void-deep inline-flex rounded-full border-2 p-1.5 shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png"
                  alt="OS Santiago Logo"
                  className="h-20 w-20 rounded-full object-cover sm:h-24 sm:w-24"
                />
              </div>

              <div>
                <h2 className="text-cyan font-display text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
                  Open Source Santiago
                </h2>
                <p className="text-cyan-bright mt-2 font-mono text-xs font-semibold tracking-widest uppercase sm:text-sm">
                  Comunidad, Código Abierto y Colaboración Real
                </p>
              </div>

              <p className="mx-auto max-w-xl font-sans text-xs leading-relaxed font-normal text-slate-200 sm:text-sm md:text-base">
                Somos un espacio comunitario de desarrolladores, ingenieros de
                software, arquitectos y creadores en Chile y Latinoamérica.
                Impulsamos proyectos reales, cultura DevOps, InnerSource y
                desarrollo aumentado asistido por IA (ADEV) con rigor técnico,
                mentoría e inclusión activa.
              </p>
            </div>

            <div className="border-cyan/20 text-cyan-dim flex items-center justify-between border-t pt-3 font-mono text-xs font-medium">
              <span>EST. 2024 / SANTIAGO, CHILE</span>
              <span className="text-cyan font-bold tracking-wider">
                ROTACIÓN AUTOMÁTICA O ARRASTRA →
              </span>
            </div>
          </div>

          {/* ================= FACE 1: QRS DE UNION Y REDES ================= */}
          <div
            className="display-3d-face border-cyan/40 absolute inset-0 flex flex-col justify-between rounded-2xl border bg-[#060e18] p-7 shadow-2xl sm:p-9"
            style={{
              transform: `rotateY(${angleStep * 1}deg) translateZ(${radius}px)`,
            }}
          >
            <div className="border-cyan/20 flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-3">
                <span className="text-cyan border-cyan/30 bg-cyan/10 rounded border px-2.5 py-1 font-mono text-xs font-bold tracking-wider">
                  SYS_GATEWAY: 02
                </span>
                <span className="text-cyan-bright font-mono text-xs font-bold tracking-widest uppercase">
                  Escanear para Unirse
                </span>
              </div>
              <span className="text-cyan font-mono text-xs font-bold tracking-widest">
                ACCESO DIRECTO
              </span>
            </div>

            <div className="my-auto">
              <h3 className="text-cyan font-display mb-6 text-center text-xl font-extrabold tracking-tight sm:text-2xl">
                Escanea y Únete a Nuestros Canales Oficiales
              </h3>

              <div className="mx-auto grid max-w-2xl grid-cols-1 gap-5 sm:grid-cols-3">
                {/* QR Discord */}
                <div className="border-cyan/25 hover:border-cyan/50 group flex flex-col items-center rounded-2xl border bg-[#081524] p-4 transition-colors">
                  <div className="text-cyan mb-3 flex items-center gap-2 font-mono text-xs font-bold tracking-wider">
                    <IconBrandDiscord size={18} className="text-cyan" />
                    <span>DISCORD</span>
                  </div>
                  <QRCodeSVG value="https://discord.gg/3eawzc9ybc" size={135} />
                  <span className="mt-3 text-center font-mono text-xs font-medium text-slate-200">
                    Chat, debates & comunidad
                  </span>
                </div>

                {/* QR GitHub */}
                <div className="border-cyan/25 hover:border-cyan/50 group flex flex-col items-center rounded-2xl border bg-[#081524] p-4 transition-colors">
                  <div className="text-cyan mb-3 flex items-center gap-2 font-mono text-xs font-bold tracking-wider">
                    <IconBrandGithub size={18} className="text-cyan" />
                    <span>GITHUB</span>
                  </div>
                  <QRCodeSVG
                    value="https://github.com/os-santiago"
                    size={135}
                  />
                  <span className="mt-3 text-center font-mono text-xs font-medium text-slate-200">
                    Repositorios & código libre
                  </span>
                </div>

                {/* QR HomeDir */}
                <div className="border-cyan/25 hover:border-cyan/50 group flex flex-col items-center rounded-2xl border bg-[#081524] p-4 transition-colors">
                  <div className="text-cyan mb-3 flex items-center gap-2 font-mono text-xs font-bold tracking-wider">
                    <IconHome size={18} className="text-cyan" />
                    <span>HOMEDIR</span>
                  </div>
                  <QRCodeSVG
                    value="https://homedir.opensourcesantiago.io"
                    size={135}
                  />
                  <span className="mt-3 text-center font-mono text-xs font-medium text-slate-200">
                    Eventos, CFP & misiones
                  </span>
                </div>
              </div>
            </div>

            <div className="border-cyan/20 text-cyan-dim flex items-center justify-between border-t pt-3 font-mono text-xs font-medium">
              <span>ESCANEA CUALQUIER QR CON LA CÁMARA DE TU TELÉFONO</span>
              <span className="text-cyan font-bold">ACCESO 100% LIBRE</span>
            </div>
          </div>

          {/* ================= FACE 2: ORGANIZADORES ================= */}
          <div
            className="display-3d-face border-cyan/40 absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl border bg-[#060e18] p-7 shadow-2xl sm:p-9"
            style={{
              transform: `rotateY(${angleStep * 2}deg) translateZ(${radius}px)`,
            }}
          >
            <div className="border-cyan/20 flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-3">
                <span className="text-cyan border-cyan/30 bg-cyan/10 rounded border px-2.5 py-1 font-mono text-xs font-bold tracking-wider">
                  SYS_STAFF: 03
                </span>
                <span className="text-cyan-bright font-mono text-xs font-bold tracking-widest uppercase">
                  Equipo de Organización
                </span>
              </div>
              <span className="text-cyan font-mono text-xs font-bold tracking-widest">
                TOCA PARA LINKEDIN
              </span>
            </div>

            {/* Equitable 3x2 grid filling space, identical for all 6 members, click to view QR */}
            <div className="my-auto flex flex-1 flex-col justify-center py-3">
              <div className="mx-auto grid w-full max-w-2xl grid-cols-2 gap-3.5 sm:grid-cols-3">
                {staffMembers.map((member) => (
                  <div
                    key={member.userId}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMember(
                        selectedMember?.userId === member.userId
                          ? null
                          : member,
                      );
                    }}
                    className="interactive-card group border-cyan/20 hover:border-cyan flex cursor-pointer items-center gap-3.5 rounded-xl border bg-[#081524] p-4 shadow-sm transition-all hover:bg-[#0c1e34]"
                  >
                    <div className="relative flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={member.avatarUrl}
                        alt={member.displayName}
                        className="border-cyan/40 h-13 w-13 rounded-full border object-cover"
                      />
                      <span className="border-cyan absolute -right-0.5 -bottom-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border bg-[#020509]">
                        <span className="bg-cyan h-1.5 w-1.5 animate-pulse rounded-full" />
                      </span>
                    </div>

                    <div className="min-w-0 flex-1 overflow-hidden text-left">
                      <div className="mb-1 flex items-center justify-between gap-1.5">
                        <span className="group-hover:text-cyan-bright truncate font-sans text-sm font-bold text-slate-100 transition-colors">
                          {member.displayName}
                        </span>
                        <span className="text-cyan-dim py-0.2 border-cyan/20 flex-shrink-0 rounded border px-1.5 font-mono text-[9px] font-bold tracking-wider uppercase">
                          STAFF
                        </span>
                      </div>
                      <div className="text-cyan truncate font-mono text-xs font-semibold">
                        @{member.github}
                      </div>
                      <div className="text-cyan-dim mt-1.5 flex items-center justify-end font-mono text-[10px]">
                        <span className="text-cyan group-hover:text-cyan-bright flex-shrink-0 font-bold">
                          QR LINKEDIN →
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-cyan/20 text-cyan-dim flex items-center justify-between border-t pt-3 font-mono text-xs font-medium">
              <span>EQUIPO HORIZONTAL // STAFF OPEN SOURCE SANTIAGO</span>
              <span className="text-cyan font-bold">
                TOCA CUALQUIER MIEMBRO PARA QR LINKEDIN
              </span>
            </div>

            {/* EXPANDED MODAL OVERLAY FOR MEMBER LINKEDIN QR */}
            {selectedMember && (
              <div
                className="animate-in fade-in absolute inset-0 z-50 flex flex-col items-center justify-center rounded-2xl bg-[#030812]/98 p-6 text-center duration-150"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedMember(null);
                }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedMember(null);
                  }}
                  className="border-cyan/40 bg-void text-cyan hover:bg-cyan/20 absolute top-4 right-4 cursor-pointer rounded-full border p-2 transition-all"
                  title="Cerrar QR"
                >
                  <IconX size={18} />
                </button>

                <div className="relative mb-2 h-16 w-16">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedMember.avatarUrl}
                    alt={selectedMember.displayName}
                    className="border-cyan/50 h-full w-full rounded-full border-2 object-cover"
                  />
                  <span className="border-cyan absolute right-0 bottom-0 flex h-4 w-4 items-center justify-center rounded-full border bg-[#020509]">
                    <span className="bg-cyan h-2 w-2 animate-pulse rounded-full" />
                  </span>
                </div>

                <div className="text-cyan border-cyan/40 bg-cyan/10 mb-1 rounded border px-3 py-1 font-mono text-xs font-bold tracking-widest uppercase">
                  {selectedMember.role}
                </div>

                <h4 className="font-display text-cyan mb-0.5 text-2xl font-black">
                  {selectedMember.displayName}
                </h4>

                <div className="text-cyan-bright mb-3 font-mono text-xs font-semibold">
                  @{selectedMember.github}
                </div>

                <div className="border-cyan/50 my-1 rounded-2xl border-2 bg-[#020509] p-3 shadow-2xl">
                  <QRCodeSVG value={selectedMember.linkedin} size={150} />
                </div>

                <p className="text-cyan-bright mt-4 font-mono text-xs font-bold tracking-wider">
                  ESCANEA PARA CONECTAR EN LINKEDIN
                </p>

                <div className="text-cyan-dim mt-1 max-w-sm truncate font-mono text-[11px]">
                  {selectedMember.linkedin}
                </div>
              </div>
            )}
          </div>

          {/* ================= FACE 3: PROYECTOS DESTACADOS ================= */}
          <div
            className="display-3d-face border-cyan/40 absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl border bg-[#060e18] p-7 shadow-2xl sm:p-9"
            style={{
              transform: `rotateY(${angleStep * 3}deg) translateZ(${radius}px)`,
            }}
          >
            {/* Header: Exact slide title and number requested */}
            <div className="border-cyan/20 flex flex-shrink-0 items-center justify-between border-b pb-3">
              <div className="flex items-center gap-3">
                <span className="text-cyan border-cyan/30 bg-cyan/10 rounded border px-2.5 py-1 font-mono text-xs font-bold tracking-wider">
                  SYS_PROJECTS: 04
                </span>
                <span className="text-cyan-bright font-mono text-xs font-bold tracking-widest uppercase">
                  Proyectos Estrella
                </span>
              </div>
              <span className="text-cyan font-mono text-xs font-bold tracking-widest">
                ECOSISTEMA PRINCIPAL
              </span>
            </div>

            {/* Content area: 100% space filled with 6 equitable cards without mini QRs */}
            <div className="my-auto flex flex-1 flex-col justify-center py-2">
              <div className="grid w-full grid-cols-2 gap-3.5 sm:grid-cols-3">
                {spotlightProjects.slice(0, 6).map((p) => {
                  return (
                    <div
                      key={p.name}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(
                          selectedProject?.name === p.name ? null : p,
                        );
                      }}
                      className="interactive-card group border-cyan/20 hover:border-cyan flex cursor-pointer flex-col justify-between rounded-xl border bg-[#081524] p-3.5 shadow-md transition-all hover:bg-[#0c1e34]"
                    >
                      <div>
                        <div className="mb-1.5 flex items-center justify-between gap-2">
                          <span className="font-display text-cyan group-hover:text-cyan-bright truncate text-sm font-black transition-colors sm:text-base">
                            {p.name}
                          </span>
                          <span className="border-cyan/30 text-cyan-dim flex-shrink-0 rounded border px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase">
                            {p.language}
                          </span>
                        </div>
                        <p className="line-clamp-2 text-xs leading-relaxed font-normal text-slate-300">
                          {p.description}
                        </p>
                      </div>

                      <div className="border-cyan/15 text-cyan-dim mt-2 flex items-center justify-between border-t pt-1.5 font-mono text-[10px]">
                        <span className="truncate">
                          {p.authors?.[0]?.name || "OS Santiago"}
                        </span>
                        <span className="text-cyan group-hover:text-cyan-bright flex-shrink-0 font-bold">
                          VER QR →
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border-cyan/20 text-cyan-dim flex flex-shrink-0 items-center justify-between border-t pt-3 font-mono text-xs font-medium">
              <span>
                HOMEDIR // ARTEMISA // ADEV // JOIDY // DEVOPSDAYS // DATAGESTOR
              </span>
              <span className="text-cyan font-bold">
                TOCA CUALQUIER PROYECTO PARA QR GRANDE
              </span>
            </div>

            {/* EXPANDED MODAL OVERLAY */}
            {selectedProject && (
              <div
                className="animate-in fade-in absolute inset-0 z-50 flex flex-col items-center justify-center rounded-2xl bg-[#030812]/98 p-6 text-center duration-150"
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
                  className="border-cyan/40 bg-void text-cyan hover:bg-cyan/20 absolute top-4 right-4 cursor-pointer rounded-full border p-2 transition-all"
                  title="Cerrar QR"
                >
                  <IconX size={18} />
                </button>

                <div className="text-cyan border-cyan/40 bg-cyan/10 mb-2 rounded border px-3 py-1 font-mono text-xs font-bold tracking-widest uppercase">
                  {selectedProject.language}
                </div>

                <h4 className="font-display text-cyan mb-2 text-2xl font-black">
                  {selectedProject.name}
                </h4>

                <p className="mb-4 max-w-md font-sans text-xs leading-relaxed text-slate-200 sm:text-sm">
                  {selectedProject.description}
                </p>

                <div className="border-cyan/50 my-1 rounded-2xl border-2 bg-[#020509] p-3 shadow-2xl">
                  <QRCodeSVG
                    value={
                      selectedProject.homepageUrl || selectedProject.repoUrl
                    }
                    size={160}
                  />
                </div>

                <p className="text-cyan-bright mt-4 font-mono text-xs font-bold tracking-wider">
                  ESCANEA PARA ABRIR REPOSITORIO
                </p>

                <div className="text-cyan-dim mt-1 font-mono text-[11px]">
                  {selectedProject.homepageUrl || selectedProject.repoUrl}
                </div>
              </div>
            )}
          </div>

          {/* ================= FACE 4: HAPPY HOUR EVENT ================= */}
          <div
            className="display-3d-face border-cyan/40 absolute inset-0 flex flex-col justify-between rounded-2xl border bg-[#060e18] p-7 shadow-2xl sm:p-9"
            style={{
              transform: `rotateY(${angleStep * 4}deg) translateZ(${radius}px)`,
            }}
          >
            <div className="border-cyan/20 flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-3">
                <span className="text-cyan border-cyan/30 bg-cyan/10 rounded border px-2.5 py-1 font-mono text-xs font-bold tracking-wider">
                  SYS_EVENT: 05
                </span>
                <span className="text-cyan-bright font-mono text-xs font-bold tracking-widest uppercase">
                  Evento Destacado
                </span>
              </div>
              <span className="text-cyan font-mono text-xs font-bold tracking-widest">
                RESUMEN DEL ENCUENTRO
              </span>
            </div>

            <div className="mx-auto my-auto flex max-w-2xl flex-col items-center gap-6 md:flex-row">
              <div className="border-cyan/40 group relative aspect-[4/3] w-full overflow-hidden rounded-xl border md:w-1/2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/events/happy-hour-november-2024/photo-06.webp"
                  alt="Happy Hour November 2024 - Foto Oficial"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70" />
                <span className="text-cyan border-cyan/30 absolute bottom-2.5 left-2.5 rounded border bg-black/80 px-2 py-0.5 font-mono text-xs font-bold">
                  Foto Oficial Comunidad
                </span>
              </div>

              <div className="w-full space-y-3 text-left md:w-1/2">
                <div className="text-cyan bg-cyan/15 border-cyan/30 inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 font-mono text-xs font-bold">
                  <IconCalendarEvent size={15} />
                  <span>21 de Noviembre, 2024</span>
                </div>

                <h3 className="font-display text-cyan text-xl font-extrabold tracking-tight sm:text-2xl">
                  {happyHourEvent?.name || "Happy Hour November 2024"}
                </h3>

                <p className="text-xs leading-relaxed font-normal text-slate-200 sm:text-sm">
                  {happyHourEvent?.description ||
                    "Encuentro presencial de la comunidad Open Source Santiago: networking, debate técnico sobre desarrollo open source, cultura DevOps y colaboración libre."}
                </p>

                <div className="text-cyan-bright space-y-1 font-mono text-xs font-medium">
                  <div>📍 Lugar: Santiago Centro, Chile</div>
                  <div>
                    👥 Asistentes: Desarrolladores, SysAdmins, DevOps, DevSecOps
                  </div>
                  <div>🍻 Formato: Mesa redonda abierta y networking</div>
                </div>
              </div>
            </div>

            <div className="border-cyan/20 text-cyan-dim flex items-center justify-between border-t pt-3 font-mono text-xs font-medium">
              <span>SANTIAGO CENTRO - CHILE</span>
              <span className="text-cyan font-bold">
                NOS VEMOS EN EL PRÓXIMO ENCUENTRO
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
