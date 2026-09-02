import { Course } from './types';

export const COURSES: Course[] = [
  {
    id: "c1",
    title: "Introducción a la Ciberseguridad",
    provider: "Cisco",
    hours: 6,
    modules: [
      { id: "c1m1", title: "Módulo 1: La necesidad de la ciberseguridad" },
      { id: "c1m2", title: "Módulo 2: Ataques, conceptos y técnicas" },
      { id: "c1m3", title: "Módulo 3: Protección de sus datos y su privacidad" },
      { id: "c1m4", title: "Módulo 4: Protección de la organización" },
      { id: "c1m5", title: "Módulo 5: Su futuro será en la ciberseguridad?" }
    ]
  },
  {
    id: "c2",
    title: "Introducción a la Ciencia de Datos",
    provider: "Cisco",
    hours: 6,
    modules: [
      { id: "c2m1", title: "Módulo 1: Conceptos básicos de la ciencia de datos" },
      { id: "c2m2", title: "Módulo 2: Recopilación y preparación de datos" },
      { id: "c2m3", title: "Módulo 3: Análisis y visualización" },
      { id: "c2m4", title: "Módulo 4: Introducción al aprendizaje automático" }
    ]
  },
  {
    id: "c3",
    title: "Introducción a la IA moderna",
    provider: "Cisco",
    hours: 6,
    modules: [
      { id: "c3m1", title: "Módulo 1: Fundamentos de la IA" },
      { id: "c3m2", title: "Módulo 2: Casos de uso de IA" },
      { id: "c3m3", title: "Módulo 3: Impacto de la IA en la sociedad" }
    ]
  },
  {
    id: "c4",
    title: "Linux Unhatched",
    provider: "Cisco",
    hours: 8,
    modules: [
      { id: "c4m1", title: "Módulo 1: Conceptos básicos de Linux" },
      { id: "c4m2", title: "Módulo 2: Navegación de línea de comandos" },
      { id: "c4m3", title: "Módulo 3: Administración básica de archivos y directorios" }
    ]
  },
  {
    id: "c5",
    title: "Cloud Digital Leader",
    provider: "Google Skills",
    hours: 9,
    badge: "Insignia",
    modules: [
      { id: "c5m1", title: "Módulo 1: Introducción a Cloud" },
      { id: "c5m2", title: "Módulo 2: Innovación con datos" },
      { id: "c5m3", title: "Módulo 3: Infraestructura y seguridad de Cloud" }
    ]
  },
  {
    id: "c6",
    title: "English for IT: Advice and Time",
    provider: "Cisco",
    hours: 15,
    badge: "Certificación",
    modules: [
      { id: "c6m1", title: "Módulo 1: IT Advice Terminology" },
      { id: "c6m2", title: "Módulo 2: Giving and Requesting Advice" },
      { id: "c6m3", title: "Módulo 3: Time Management Concepts" },
      { id: "c6m4", title: "Módulo 4: Final Certification Assessment" }
    ]
  }
];

export const TOTAL_HOURS = COURSES.reduce((sum, course) => sum + course.hours, 0);
export const TOTAL_MODULES = COURSES.reduce((sum, course) => sum + course.modules.length, 0);
export const DEADLINE = new Date("2026-10-15T00:00:00");
