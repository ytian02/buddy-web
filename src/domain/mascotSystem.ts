import type {
  AuraStyle,
  BadgeStyle,
  GrowthStage,
  SpeciesTemplate,
  ThemeSkin,
} from './types'

export type SpeciesTemplateConfig = {
  label: string
  signal: string
  promptNoun: string
  temperament: string
}

export type ThemeSkinConfig = {
  label: string
  accent: string
  secondaryAccent: string
  visor: string
  aura: string
  rune: string
  shell: string
  description: string
}

export type GrowthStageConfig = {
  label: string
  shortLabel: string
  headScale: number
  bodyScale: number
  bodyLift: number
  orbitRings: number
  description: string
}

export const SPECIES_TEMPLATE_CONFIGS: Record<SpeciesTemplate, SpeciesTemplateConfig> = {
  cat: {
    label: 'Cat Rig',
    signal: '<purr.sys>',
    promptNoun: 'cyber cat',
    temperament: 'sharp and companionable',
  },
  bird: {
    label: 'Bird Rig',
    signal: '<chirp.proc>',
    promptNoun: 'cyber bird',
    temperament: 'nimble and bright',
  },
  spirit: {
    label: 'Spirit Rig',
    signal: '<wisp.loop>',
    promptNoun: 'signal spirit',
    temperament: 'mysterious and gentle',
  },
}

export const THEME_SKIN_CONFIGS: Record<ThemeSkin, ThemeSkinConfig> = {
  signal: {
    label: 'Signal Skin',
    accent: '#ffbb52',
    secondaryAccent: '#7cded0',
    visor: '#123833',
    aura: 'rgba(255, 187, 82, 0.26)',
    rune: 'rgba(124, 222, 208, 0.38)',
    shell: 'rgba(9, 15, 14, 0.94)',
    description: 'The default Buddy skin: terminal amber, calm green, and low-noise cyber glow.',
  },
  grove: {
    label: 'Grove Skin',
    accent: '#9ed07a',
    secondaryAccent: '#f2c76c',
    visor: '#18352c',
    aura: 'rgba(158, 208, 122, 0.24)',
    rune: 'rgba(242, 199, 108, 0.34)',
    shell: 'rgba(10, 19, 15, 0.95)',
    description: 'An example alternate theme skin with softer botanical energy over the same mascot rig.',
  },
}

export const GROWTH_STAGE_CONFIGS: Record<GrowthStage, GrowthStageConfig> = {
  hatchling: {
    label: 'Hatchling',
    shortLabel: 'H1',
    headScale: 1.08,
    bodyScale: 0.88,
    bodyLift: 16,
    orbitRings: 1,
    description: 'Short-faced, wide-eyed, and compact. The first stable Buddy shell.',
  },
  buddy: {
    label: 'Buddy',
    shortLabel: 'B2',
    headScale: 1,
    bodyScale: 1,
    bodyLift: 10,
    orbitRings: 2,
    description: 'The balanced main-stage mascot with clear silhouette and stronger cyber details.',
  },
  evolved: {
    label: 'Evolved',
    shortLabel: 'E3',
    headScale: 0.95,
    bodyScale: 1.08,
    bodyLift: 6,
    orbitRings: 3,
    description: 'A more mature shell with stronger body presence, extra orbit energy, and denser chest lines.',
  },
}

export const BADGE_STYLE_GLYPHS: Record<BadgeStyle, string> = {
  none: '--',
  core: '[]',
  leaf: '<>',
  rune: '{}',
}

export const AURA_STYLE_GLYPHS: Record<AuraStyle, string> = {
  none: 'off',
  signal: 'sig',
  grove: 'grv',
  stardust: 'std',
}
