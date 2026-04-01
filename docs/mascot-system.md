# Buddy Mascot System

## Summary

Buddy Web now treats the pet as a mascot system rather than a pile of unrelated creatures.

The core idea is:

- one primary mascot identity: `buddy-core`
- one stable base rig
- layered species templates
- layered theme skins
- layered accessories
- visual growth stages

This keeps the product recognizable while still leaving room for future customization and progression.

## Design rules

### 1. Buddy is a flagship mascot first

- The default experience should always feel like the same Buddy product character.
- New appearances should read as variants of Buddy, not as unrelated pets.
- Visual experimentation should happen inside the system, not by replacing the whole character every time.

### 2. Silhouette before detail

- The mascot should stay readable at a glance without relying on text labels.
- The face should stay short and broad enough to avoid a plush or overly goofy look.
- Technology cues should grow from the body itself, not be pasted onto the background.

### 3. Cyber pet, not hard robot

- Keep the mascot intelligent, lightly witty, and companionable.
- Avoid fully robotic, cold, or hostile shapes.
- Avoid plush-toy softness and avoid anime-illustration complexity.
- Use a restrained visual vocabulary:
  - visor
  - glow lines
  - small nodes and circuit marks
  - orbit rings
  - low-frame idle animation

## System layers

### Base rig

- The single source of truth for proportions and shared body structure.
- Controls:
  - head/body balance
  - face position
  - chest core placement
  - paw and tail anchor points

### Species template

- A silhouette family layered on top of the base rig.
- Current planned families:
  - `cat`
  - `bird`
  - `spirit`
- Templates may change ears, tail language, whiskers or wisps, and accent details.
- Templates must not replace the overall rig proportions.

### Theme skin

- A theme layer that changes palette and material language.
- Current skins:
  - `signal`: default cyber skin
  - `grove`: softer example alternate skin
- Theme skins may change:
  - accent colors
  - visor treatment
  - aura glow
  - rune density
- Theme skins must not alter the mascot identity.

### Accessory set

- Accessories are small additive layers, not a new character system.
- Current structure:
  - `head`
  - `badge`
  - `aura`
- Accessories may reinforce rarity, mood, or theme, but should not dominate the silhouette.

### Growth stage

- Growth is visual and identity-preserving.
- Current stages:
  - `hatchling`
  - `buddy`
  - `evolved`
- Growth should change:
  - head/body balance
  - orbit density
  - chest circuit complexity
  - overall presence
- Growth should not feel like switching to a different creature.

## Customization constraints

Future user customization should stay inside these safe boundaries:

- allowed:
  - switch species template
  - switch theme skin
  - switch accessories
  - switch stage if gameplay allows it
- not allowed by default:
  - free-form body editing
  - arbitrary face dragging
  - per-part shape distortion outside the rig system

This keeps the project maintainable and helps most user-created variants still look good.

## Current defaults

- mascot identity: `buddy-core`
- default species template: `cat`
- default theme priority: `signal`
- example alternate theme: `grove`
- stage progression path:
  - hatchling -> buddy -> evolved

## Expansion rules

When adding a new template, skin, or stage:

1. Keep the base rig intact.
2. Reuse the existing mood system.
3. Avoid one-off visual tricks that only work for a single variant.
4. Make sure the result still reads as Buddy from a distance.
5. Update this document and `docs/decisions.md` if the system boundary changes.
