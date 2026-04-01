import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import {
  AURA_STYLE_GLYPHS,
  BADGE_STYLE_GLYPHS,
  GROWTH_STAGE_CONFIGS,
  SPECIES_TEMPLATE_CONFIGS,
  THEME_SKIN_CONFIGS,
} from '../domain/mascotSystem'
import type {
  BuddyMood,
  Companion,
  GrowthStage,
  Hat,
  SpeciesTemplate,
} from '../domain/types'
import { GROWTH_STAGE_LABELS, HAT_LABELS, RARITY_STARS } from '../domain/types'

type Props = {
  companion: Companion
  mood: BuddyMood
  speaking: boolean
  reaction: string | null
}

const MOOD_LABELS: Record<BuddyMood, string> = {
  idle: 'idle orbit',
  happy: 'companion purr',
  thinking: 'thinking loop',
}

const ORIGINAL_IDLE_SEQUENCE = [0, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 2, 0, 0, 0]

const ORIGINAL_CAT_FRAMES = [
  [
    '            ',
    '   /\\_/\\\\    ',
    '  ( {E}   {E})  ',
    '  (  ω  )   ',
    '  (")_(")   ',
  ],
  [
    '            ',
    '   /\\_/\\\\    ',
    '  ( {E}   {E})  ',
    '  (  ω  )   ',
    '  (")_(")~  ',
  ],
  [
    '            ',
    '   /\\-/\\\\    ',
    '  ( {E}   {E})  ',
    '  (  ω  )   ',
    '  (")_(")   ',
  ],
] as const

const ORIGINAL_HAT_LINES: Record<Hat, string> = {
  none: '',
  crown: '   \\^^^/    ',
  tophat: '   [___]    ',
  propeller: '    -+-     ',
  halo: '   (   )    ',
  wizard: '    /^\\     ',
  beanie: '   (___)    ',
  tinyduck: '    ,>      ',
}

function baseOriginalEye(companion: Companion): string {
  if (companion.shiny) return '✦'

  switch (companion.rarity) {
    case 'common':
      return '·'
    case 'uncommon':
      return '°'
    case 'rare':
      return '✦'
    case 'epic':
      return '◉'
    case 'legendary':
      return '@'
  }
}

function currentOriginalEye(companion: Companion, mood: BuddyMood): string {
  if (mood === 'thinking') return '-'
  if (mood === 'happy' && companion.rarity !== 'common') return '✦'
  return baseOriginalEye(companion)
}

function renderOriginalCatSprite(
  companion: Companion,
  frame: number,
  eye: string,
  blink: boolean,
): string[] {
  const body = ORIGINAL_CAT_FRAMES[frame]!.map((line) =>
    line.split('{E}').join(blink ? '-' : eye),
  )
  const lines = [...body]

  if (companion.accessorySet.head !== 'none' && !lines[0]!.trim()) {
    lines[0] = ORIGINAL_HAT_LINES[companion.accessorySet.head]
  }

  if (!lines[0]!.trim()) {
    lines.shift()
  }

  return lines
}

function MascotHat({ hat, accent }: { hat: Hat; accent: string }): JSX.Element | null {
  const style = {
    fill: 'var(--buddy-shell)',
    stroke: accent,
    strokeWidth: 4,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  switch (hat) {
    case 'none':
      return null
    case 'halo':
      return (
        <g className="hat-layer">
          <ellipse cx="180" cy="72" rx="44" ry="11" fill="none" stroke={accent} strokeWidth="4" />
          <ellipse cx="180" cy="72" rx="28" ry="6" fill="rgba(255,255,255,0.08)" />
        </g>
      )
    case 'crown':
      return (
        <g className="hat-layer">
          <path d="M136 112 L148 72 L172 100 L180 66 L192 100 L214 72 L226 112 Z" style={style} />
          <circle cx="148" cy="72" r="4" fill={accent} />
          <circle cx="180" cy="66" r="4" fill={accent} />
          <circle cx="214" cy="72" r="4" fill={accent} />
        </g>
      )
    case 'tophat':
      return (
        <g className="hat-layer">
          <rect x="146" y="64" width="68" height="34" rx="9" style={style} />
          <rect x="132" y="96" width="96" height="12" rx="6" style={style} />
          <rect x="146" y="78" width="68" height="7" fill={accent} opacity="0.22" />
        </g>
      )
    case 'propeller':
      return (
        <g className="hat-layer hat-propeller">
          <rect x="172" y="70" width="16" height="28" rx="6" style={style} />
          <path d="M180 66 C150 42, 132 46, 116 58" fill="none" stroke={accent} strokeWidth="4" strokeLinecap="round" />
          <path d="M180 66 C210 42, 228 46, 244 58" fill="none" stroke={accent} strokeWidth="4" strokeLinecap="round" />
          <circle cx="180" cy="66" r="6" fill={accent} />
        </g>
      )
    case 'wizard':
      return (
        <g className="hat-layer">
          <path d="M140 112 L180 44 L220 112 Z" style={style} />
          <path d="M128 112 H232" fill="none" stroke={accent} strokeWidth="4" strokeLinecap="round" />
          <circle cx="174" cy="74" r="4" fill={accent} />
          <circle cx="194" cy="90" r="3" fill={accent} />
        </g>
      )
    case 'beanie':
      return (
        <g className="hat-layer">
          <path d="M142 104 Q180 56 218 104" style={style} />
          <rect x="140" y="98" width="80" height="18" rx="9" style={style} />
          <circle cx="180" cy="56" r="8" fill={accent} />
        </g>
      )
    case 'tinyduck':
      return (
        <g className="hat-layer">
          <ellipse cx="204" cy="78" rx="18" ry="12" fill="var(--buddy-shell)" stroke={accent} strokeWidth="4" />
          <circle cx="198" cy="76" r="3" fill={accent} />
          <path d="M214 80 L228 84 L214 88 Z" fill={accent} />
          <path d="M196 68 Q206 60 216 66" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" />
        </g>
      )
  }
}

function TemplateTail({
  speciesTemplate,
  stage,
}: {
  speciesTemplate: SpeciesTemplate
  stage: GrowthStage
}): JSX.Element {
  if (speciesTemplate === 'bird') {
    return (
      <path
        className="mascot-tail"
        d={stage === 'evolved'
          ? 'M226 252 C258 240, 278 222, 282 196 C254 206, 238 218, 226 232'
          : 'M222 252 C246 242, 264 226, 268 204 C244 212, 230 224, 222 236'}
      />
    )
  }

  if (speciesTemplate === 'spirit') {
    return (
      <path
        className="mascot-tail"
        d={stage === 'evolved'
          ? 'M230 252 C276 232, 286 190, 248 170 C228 160, 228 184, 238 198 C252 216, 244 236, 214 248'
          : 'M226 252 C262 236, 272 202, 244 184 C226 174, 224 196, 234 208 C246 222, 238 238, 212 248'}
      />
    )
  }

  return (
    <path
      className="mascot-tail"
      d={stage === 'evolved'
        ? 'M224 252 C278 234, 290 178, 248 154 C230 144, 224 172, 238 188 C254 208, 246 234, 212 244'
        : 'M220 252 C264 236, 276 188, 242 164 C224 152, 220 178, 232 194 C244 210, 238 232, 210 242'}
    />
  )
}

function TemplateEars({ speciesTemplate }: { speciesTemplate: SpeciesTemplate }): JSX.Element {
  switch (speciesTemplate) {
    case 'bird':
      return (
        <>
          <path className="mascot-ear" d="M118 132 C126 92, 138 72, 154 60 L154 122 Z" />
          <path className="mascot-ear" d="M206 122 L206 60 C222 72, 234 92, 242 132 Z" />
        </>
      )
    case 'spirit':
      return (
        <>
          <path className="mascot-ear" d="M122 130 C114 92, 122 62, 148 48 C144 84, 150 106, 160 124 Z" />
          <path className="mascot-ear" d="M200 124 C210 106, 216 84, 212 48 C238 62, 246 92, 238 130 Z" />
        </>
      )
    case 'cat':
      return (
        <>
          <path className="mascot-ear" d="M118 130 L138 60 L164 128 Z" />
          <path className="mascot-ear" d="M196 128 L222 60 L242 130 Z" />
        </>
      )
  }
}

function TemplateDetails({ speciesTemplate }: { speciesTemplate: SpeciesTemplate }): JSX.Element | null {
  if (speciesTemplate === 'bird') {
    return (
      <>
        <path className="mascot-wing-line" d="M124 232 C136 218, 150 212, 168 212" />
        <path className="mascot-wing-line" d="M236 232 C224 218, 210 212, 192 212" />
      </>
    )
  }

  if (speciesTemplate === 'spirit') {
    return (
      <>
        <path className="mascot-wisp" d="M120 188 C104 182, 98 170, 104 160" />
        <path className="mascot-wisp" d="M240 188 C256 182, 262 170, 256 160" />
      </>
    )
  }

  return (
    <>
      <path className="mascot-whisker" d="M86 174 H120" />
      <path className="mascot-whisker" d="M92 190 H122" />
      <path className="mascot-whisker" d="M240 174 H274" />
      <path className="mascot-whisker" d="M238 190 H268" />
    </>
  )
}

function OrbitRings({ count }: { count: number }): JSX.Element {
  const radii = [86, 104, 122]

  return (
    <>
      {radii.slice(0, count).map((radius, index) => (
        <circle
          className="mascot-orbit"
          cx="180"
          cy="176"
          key={radius}
          r={radius}
          style={{ opacity: 0.22 - index * 0.04 }}
        />
      ))}
    </>
  )
}

function ChestCore({ stage, badge }: { stage: GrowthStage; badge: string }): JSX.Element {
  return (
    <g className="mascot-core">
      <path className="mascot-circuit" d="M164 228 H196" />
      <path className="mascot-circuit" d="M180 228 V252" />
      <circle className="mascot-node" cx="180" cy="228" r="5" />
      <circle className="mascot-node" cx="154" cy="252" r="4" />
      <circle className="mascot-node" cx="206" cy="252" r="4" />
      <path className="mascot-circuit" d="M180 252 H154" />
      <path className="mascot-circuit" d="M180 252 H206" />
      {stage !== 'hatchling' ? (
        <>
          <path className="mascot-circuit" d="M154 252 V266" />
          <path className="mascot-circuit" d="M206 252 V266" />
          <circle className="mascot-node" cx="154" cy="270" r="3.5" />
          <circle className="mascot-node" cx="206" cy="270" r="3.5" />
        </>
      ) : null}
      {stage === 'evolved' ? (
        <>
          <path className="mascot-circuit" d="M148 216 H212" />
          <path className="mascot-circuit" d="M180 216 V204" />
          <circle className="mascot-node" cx="180" cy="200" r="3.5" />
        </>
      ) : null}
      <text className="mascot-badge-text" x="180" y="244">
        {badge}
      </text>
    </g>
  )
}

function MoodFace({
  mood,
  speaking,
}: {
  mood: BuddyMood
  speaking: boolean
}): JSX.Element {
  if (mood === 'happy') {
    return (
      <>
        <path className="mascot-eye" d="M142 172 L154 162 L166 172" />
        <path className="mascot-eye" d="M194 172 L206 162 L218 172" />
        <path className="mascot-mouth" d="M166 196 Q180 206 194 196" />
      </>
    )
  }

  if (mood === 'thinking') {
    return (
      <>
        <path className="mascot-eye" d="M142 170 H166" />
        <path className="mascot-eye" d="M194 170 H218" />
        <path className="mascot-mouth" d="M168 198 Q180 190 192 198" />
        <circle className="mascot-thought" cx="228" cy="144" r="4" />
        <circle className="mascot-thought" cx="242" cy="132" r="5" />
      </>
    )
  }

  return (
    <>
      <path className="mascot-eye" d="M142 172 L154 164 L166 172" />
      <path className="mascot-eye" d="M194 172 L206 164 L218 172" />
      <path className="mascot-mouth" d="M168 196 Q180 202 192 196" />
      {speaking ? <path className="mascot-mouth" d="M174 204 H186" /> : null}
    </>
  )
}

function OriginalTerminalBuddy({
  companion,
  mood,
  reaction,
}: {
  companion: Companion
  mood: BuddyMood
  reaction: string | null
}): JSX.Element {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setTick((value) => value + 1), 500)
    return () => window.clearInterval(id)
  }, [])

  const eye = currentOriginalEye(companion, mood)
  const { frame, blink } = useMemo(() => {
    if (reaction || mood === 'thinking') {
      return {
        frame: tick % ORIGINAL_CAT_FRAMES.length,
        blink: false,
      }
    }

    const step = ORIGINAL_IDLE_SEQUENCE[tick % ORIGINAL_IDLE_SEQUENCE.length]!
    return step === -1
      ? {
          frame: 0,
          blink: true,
        }
      : {
          frame: step % ORIGINAL_CAT_FRAMES.length,
          blink: false,
        }
  }, [mood, reaction, tick])

  const sprite = renderOriginalCatSprite(companion, frame, eye, blink)
  const faceSignature = `=${blink ? '-' : eye}ω${blink ? '-' : eye}=`

  return (
    <div className="origin-shell">
      <div className="origin-pre-wrap">
        <pre className="origin-pre">{sprite.join('\n')}</pre>
      </div>
      <p className="origin-face-signature">{faceSignature}</p>
      <p className="origin-origin-note">terminal familiar // lives beside the chat box</p>
    </div>
  )
}

function SystemMascot({
  companion,
  mood,
  speaking,
  reaction,
}: Props): JSX.Element {
  const skin = THEME_SKIN_CONFIGS[companion.themeSkin]
  const stage = GROWTH_STAGE_CONFIGS[companion.growthStage]
  const template = SPECIES_TEMPLATE_CONFIGS[companion.speciesTemplate]
  const stageStyle = {
    '--buddy-accent': skin.accent,
    '--buddy-secondary': skin.secondaryAccent,
    '--buddy-aura': companion.shiny ? 'rgba(255, 244, 196, 0.34)' : skin.aura,
    '--buddy-rune': skin.rune,
    '--buddy-shell': skin.shell,
    '--buddy-visor': skin.visor,
  } as CSSProperties

  const headTransform = `translate(180 176) scale(${stage.headScale}) translate(-180 -176)`
  const bodyTransform = `translate(180 ${190 - stage.bodyLift}) scale(${stage.bodyScale}) translate(-180 -190)`

  return (
    <section
      className={`buddy-stage mood-${mood}${companion.shiny ? ' is-shiny' : ''}`}
      style={stageStyle}
    >
      <div className="stage-hud">
        <span className="stage-pill">buddy-core</span>
        <span className="stage-pill subtle">
          {template.signal} // {skin.label}
        </span>
      </div>

      {reaction ? <div className="speech-bubble">{reaction}</div> : null}

      <div className="stage-shell">
        <div className="stage-glow stage-glow-primary" />
        <div className="stage-glow stage-glow-secondary" />

        <svg
          aria-label={`${companion.name} mascot`}
          className="buddy-mascot"
          role="img"
          viewBox="0 0 360 360"
        >
          <OrbitRings count={stage.orbitRings} />

          <g className="mascot-runes">
            <text x="50" y="98">
              {AURA_STYLE_GLYPHS[companion.accessorySet.aura]}
            </text>
            <text x="268" y="110">
              {BADGE_STYLE_GLYPHS[companion.accessorySet.badge]}
            </text>
            <text x="58" y="270">
              {'//'}
            </text>
            <text x="268" y="254">
              {stage.shortLabel}
            </text>
          </g>

          <g className="mascot-tail-layer">
            <TemplateTail speciesTemplate={companion.speciesTemplate} stage={companion.growthStage} />
          </g>

          <g className="mascot-body" transform={bodyTransform}>
            <path className="mascot-body-core" d="M112 256 C112 210, 138 186, 180 186 C222 186, 248 210, 248 256 C248 292, 220 314, 180 314 C140 314, 112 292, 112 256 Z" />
            <path className="mascot-belly" d="M138 254 C138 226, 154 210, 180 210 C206 210, 222 226, 222 254 C222 274, 204 290, 180 290 C156 290, 138 274, 138 254 Z" />
            <path className="mascot-paw" d="M122 302 C132 292, 150 290, 162 296 C172 302, 170 312, 158 318 C146 324, 128 320, 122 302 Z" />
            <path className="mascot-paw" d="M198 296 C210 290, 228 292, 238 302 C232 320, 214 324, 202 318 C190 312, 188 302, 198 296 Z" />
            <ChestCore badge={BADGE_STYLE_GLYPHS[companion.accessorySet.badge]} stage={companion.growthStage} />
            <TemplateDetails speciesTemplate={companion.speciesTemplate} />
          </g>

          <g className="mascot-head" transform={headTransform}>
            <TemplateEars speciesTemplate={companion.speciesTemplate} />
            <path className="mascot-head-shell" d="M120 220 L120 142 C120 110, 144 92, 180 92 C216 92, 240 110, 240 142 L240 220 C240 244, 220 260, 196 260 H164 C140 260, 120 244, 120 220 Z" />
            <path className="mascot-visor" d="M136 144 H224 C228 144, 232 148, 232 152 V188 C232 192, 228 196, 224 196 H136 C132 196, 128 192, 128 188 V152 C128 148, 132 144, 136 144 Z" />
            <path className="mascot-nose" d="M174 184 L180 190 L186 184" />
            <MoodFace mood={mood} speaking={speaking} />
            <MascotHat accent={skin.accent} hat={companion.accessorySet.head} />
          </g>

          {companion.accessorySet.aura !== 'none' ? (
            <g className="mascot-aura-dust">
              <circle cx="114" cy="134" r="4" />
              <circle cx="246" cy="120" r="3" />
              <circle cx="268" cy="210" r="4" />
            </g>
          ) : null}
        </svg>

        <div className="stage-floor" />
      </div>

      <div className="stage-caption">
        <div>
          <p className="stage-name">{companion.name}</p>
          <p className="stage-subtitle">
            {MOOD_LABELS[mood]} // {template.label} // {HAT_LABELS[companion.accessorySet.head]}
          </p>
        </div>
        <span className="stage-rarity">
          {GROWTH_STAGE_LABELS[companion.growthStage]} {RARITY_STARS[companion.rarity]}
        </span>
      </div>
    </section>
  )
}

export function BuddySprite({
  companion,
  mood,
  speaking,
  reaction,
}: Props): JSX.Element {
  const shouldUseOriginalDisplay =
    companion.speciesTemplate === 'cat' && companion.themeSkin === 'signal'
  const stageStyle = {
    '--buddy-accent': '#ffbb52',
    '--buddy-secondary': '#7cded0',
    '--buddy-aura': companion.shiny ? 'rgba(255, 244, 196, 0.34)' : 'rgba(255, 187, 82, 0.24)',
    '--buddy-rune': 'rgba(124, 222, 208, 0.28)',
    '--buddy-shell': 'rgba(9, 15, 14, 0.94)',
    '--buddy-visor': '#123833',
  } as CSSProperties

  if (!shouldUseOriginalDisplay) {
    return (
      <SystemMascot
        companion={companion}
        mood={mood}
        speaking={speaking}
        reaction={reaction}
      />
    )
  }

  return (
    <section
      className={`buddy-stage buddy-stage-origin mood-${mood}${companion.shiny ? ' is-shiny' : ''}`}
      style={stageStyle}
    >
      <div className="stage-hud">
        <span className="stage-pill">terminal familiar</span>
        <span className="stage-pill subtle">
          lives beside the chat box // signal skin
        </span>
      </div>

      {reaction ? <div className="speech-bubble">{reaction}</div> : null}

      <div className="stage-shell stage-shell-origin">
        <div className="stage-glow stage-glow-primary" />
        <div className="stage-glow stage-glow-secondary" />
        <OriginalTerminalBuddy
          companion={companion}
          mood={mood}
          reaction={reaction}
        />
        <div className="stage-floor" />
      </div>

      <div className="stage-caption">
        <div>
          <p className="stage-name">{companion.name}</p>
          <p className="stage-subtitle">
            terminal companion // {GROWTH_STAGE_LABELS[companion.growthStage]} // {HAT_LABELS[companion.accessorySet.head]}
          </p>
        </div>
        <span className="stage-rarity">
          original cat {RARITY_STARS[companion.rarity]}
        </span>
      </div>
    </section>
  )
}
