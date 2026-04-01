import type { Companion, Hat, Species } from './types'

const BODIES: Record<Species, string[][]> = {
  duck: [
    ['    __      ', '  <(o )___  ', '   (  ._>   ', '    `--~    '],
    ['    __      ', '  <(o )___  ', '   (  ._>   ', '    `--~~   '],
    ['    __      ', '  <(o )___  ', '   (  .__>  ', '    `--~    '],
  ],
  goose: [
    ['     (o>    ', '     ||     ', '   _(__)_   ', '    ^^^^    '],
    ['    (o>     ', '     ||     ', '   _(__)_   ', '    ^^^^    '],
    ['     (o>>   ', '     ||     ', '   _(__)_   ', '    ^^^^    '],
  ],
  blob: [
    ['   .----.   ', '  ( o  o )  ', '  (      )  ', '   `----~   '],
    ['  .------.  ', ' (  o  o  ) ', ' (        ) ', '  `------~  '],
    ['    .--.    ', '   (o  o)   ', '   (    )   ', '    `--~    '],
  ],
  cat: [
    ['   /\\_/\\\\   ', '  ( o   o)  ', '  (  =^= )  ', '  (")__(")  '],
    ['   /\\_/\\\\   ', '  ( o   o)  ', '  (  =^= )  ', '  (")__(")~ '],
    ['   /\\-/\\\\   ', '  ( o   o)  ', '  (  =^= )  ', '  (")__(")  '],
  ],
  dragon: [
    ['  /^\\\\  /^\\\\ ', ' <  o  o  > ', ' (   ~~   ) ', '  `-vvvv-~  '],
    ['  /^\\\\  /^\\\\ ', ' <  o  o  > ', ' (        ) ', '  `-vvvv-~  '],
    ['   ~    ~   ', ' <  o  o  > ', ' (   ~~   ) ', '  `-vvvv-~  '],
  ],
  octopus: [
    ['   .----.   ', '  ( o  o )  ', '  (______)  ', '  /\\/\\/\\/\\  '],
    ['   .----.   ', '  ( o  o )  ', '  (______)  ', '  \\/\\/\\/\\/  '],
    ['     o      ', '  ( o  o )  ', '  (______)  ', '  /\\/\\/\\/\\  '],
  ],
  owl: [
    ['   /\\  /\\   ', '  ((o)(o))  ', '  (  ><  )  ', '   `----~   '],
    ['   /\\  /\\   ', '  ((o)(o))  ', '  (  ><  )  ', '   .----.   '],
    ['   /\\  /\\   ', '  ((o)(-))  ', '  (  ><  )  ', '   `----~   '],
  ],
  penguin: [
    ['  .---.     ', '  (o>o)     ', ' /(   )\\\\    ', '  `---~     '],
    ['  .---.     ', '  (o>o)     ', ' |(   )|    ', '  `---~     '],
    ['  .---.     ', '  (o>o)     ', ' /(   )\\\\    ', '   ~ ~      '],
  ],
  turtle: [
    ['   _,--._   ', '  ( o  o )  ', ' /[______]\\\\ ', '  ``    ``  '],
    ['   _,--._   ', '  ( o  o )  ', ' /[______]\\\\ ', '   ``  ``   '],
    ['   _,--._   ', '  ( o  o )  ', ' /[======]\\\\ ', '  ``    ``  '],
  ],
  snail: [
    [' o    .--.  ', '  \\\\  ( @ )  ', '   \\\\_`--~   ', '  ~~~~~~~   '],
    ['  o   .--.  ', '  |  ( @ )  ', '   \\\\_`--~   ', '  ~~~~~~~   '],
    [' o    .--.  ', '  \\\\  ( @  ) ', '   \\\\_`--~   ', '   ~~~~~~   '],
  ],
  ghost: [
    ['   .----.   ', '  / o  o \\\\  ', '  |      |  ', '  ~`~``~`~  '],
    ['   .----.   ', '  / o  o \\\\  ', '  |      |  ', '  `~`~~`~`  '],
    ['    ~  ~    ', '  / o  o \\\\  ', '  |      |  ', '  ~~`~~`~~  '],
  ],
  axolotl: [
    ['}~(______)~{', '}~(o .. o)~{', '  ( .--. )  ', '  (_/  \\\\_)  '],
    ['~}(______){~', '~}(o .. o){~', '  ( .--. )  ', '  (_/  \\\\_)  '],
    ['}~(______)~{', '}~(o .. o)~{', '  (  --  )  ', '  ~_/  \\\\_~  '],
  ],
  capybara: [
    ['  n______n  ', ' ( o    o ) ', ' (   oo   ) ', '  `------~  '],
    ['  n______n  ', ' ( o    o ) ', ' (   Oo   ) ', '  `------~  '],
    ['    ~  ~    ', '  u______n  ', ' ( o    o ) ', '  `------~  '],
  ],
  cactus: [
    [' n  ____  n ', ' | |o  o| | ', ' |_|    |_| ', '   |    |   '],
    ['    ____    ', ' n |o  o| n ', ' |_|    |_| ', '   |    |   '],
    [' n        n ', ' |  ____  | ', ' | |o  o| | ', ' |_|    |_| '],
  ],
  robot: [
    ['   .[||].   ', '  [ o  o ]  ', '  [ ==== ]  ', '  `------~  '],
    ['   .[||].   ', '  [ o  o ]  ', '  [ -==- ]  ', '  `------~  '],
    ['     *      ', '   .[||].   ', '  [ o  o ]  ', '  `------~  '],
  ],
  rabbit: [
    ['   (\\\\__/ )  ', '  ( o  o )  ', ' =(  ..  )= ', '  (")__(")  '],
    ['   (|__/ )  ', '  ( o  o )  ', ' =(  ..  )= ', '  (")__(")  '],
    ['   (\\\\__/ )  ', '  ( o  o )  ', ' =( .  . )= ', '  (")__(")  '],
  ],
  mushroom: [
    [' .-o-OO-o-. ', '(__________)', '   | o  o|  ', '   |____|   '],
    [' .-O-oo-O-. ', '(__________)', '   | o  o|  ', '   |____|   '],
    ['   . o  .   ', ' .-o-OO-o-. ', '(__________)', '   |____|   '],
  ],
  chonk: [
    ['  /\\\\    /\\\\ ', ' ( o    o ) ', ' (   ..   ) ', '  `------~  '],
    ['  /\\\\    /|  ', ' ( o    o ) ', ' (   ..   ) ', '  `------~  '],
    ['  /\\\\    /\\\\ ', ' ( o    o ) ', ' (   ..   ) ', '  `------~~ '],
  ],
}

const HAT_LINES: Record<Hat, string> = {
  none: '',
  crown: '   \\^^^/    ',
  tophat: '   [___]    ',
  propeller: '    -+-     ',
  halo: '   (   )    ',
  wizard: '    /^\\     ',
  beanie: '   (___)    ',
  tinyduck: '    ,>      ',
}

export function renderSprite(companion: Companion, frame: number): string[] {
  const frames = BODIES[companion.species]
  const body = frames[frame % frames.length]!.map((line) =>
    line.split('o').join(companion.eye),
  )

  if (companion.hat === 'none') {
    return body
  }

  return [HAT_LINES[companion.hat], ...body]
}

export function spriteFrameCount(species: Species): number {
  return BODIES[species].length
}

export function renderFace(companion: Companion): string {
  switch (companion.species) {
    case 'duck':
    case 'goose':
      return `(${companion.eye}>`
    case 'blob':
      return `(${companion.eye}${companion.eye})`
    case 'cat':
      return `=${companion.eye}^${companion.eye}=`
    case 'dragon':
      return `<${companion.eye}~${companion.eye}>`
    case 'octopus':
      return `~(${companion.eye}${companion.eye})~`
    case 'owl':
      return `(${companion.eye})(${companion.eye})`
    case 'penguin':
      return `(${companion.eye}>)`
    case 'turtle':
      return `[${companion.eye}_${companion.eye}]`
    case 'snail':
      return `${companion.eye}(@)`
    case 'ghost':
      return `/${companion.eye}${companion.eye}\\`
    case 'axolotl':
      return `}${companion.eye}.${companion.eye}{`
    case 'capybara':
      return `(${companion.eye}oo${companion.eye})`
    case 'cactus':
      return `|${companion.eye}  ${companion.eye}|`
    case 'robot':
      return `[${companion.eye}${companion.eye}]`
    case 'rabbit':
      return `(${companion.eye}..${companion.eye})`
    case 'mushroom':
      return `|${companion.eye}  ${companion.eye}|`
    case 'chonk':
      return `(${companion.eye}.${companion.eye})`
  }
}
