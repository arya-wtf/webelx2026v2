import heroMarkdown from './md/01-hero.md?raw'
import trustStripMarkdown from './md/02-trust-strip.md?raw'
import portfolioMarkdown from './md/03-portfolio-highlight.md?raw'
import aiNativeMarkdown from './md/04-how-ai-native-solves-it.md?raw'
import problemSolutionMarkdown from './md/05-problem-solution.md?raw'
import numbersMarkdown from './md/06-numbers.md?raw'
import servicesMarkdown from './md/07-services-by-stage.md?raw'
import industriesMarkdown from './md/08-industries.md?raw'
import howWeWorkMarkdown from './md/09-how-we-work.md?raw'
import testimonialsMarkdown from './md/10-testimonials.md?raw'
import fitCheckMarkdown from './md/11-who-were-not-for.md?raw'
import processMarkdown from './md/12-how-we-work-v2.md?raw'
import stillReadingMarkdown from './md/13-still-reading.md?raw'

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function section(markdown, heading) {
  const pattern = new RegExp(`^## ${escapeRegExp(heading)}\\s*$([\\s\\S]*?)(?=^## |(?![\\s\\S]))`, 'mi')
  const match = markdown.match(pattern)
  return match ? match[1].trim() : ''
}

function subsections(markdown, heading) {
  const parent = section(markdown, heading)
  const result = {}
  const pattern = /^### (.+?)\s*$([\s\S]*?)(?=^### |(?![\s\S]))/gim
  let match

  while ((match = pattern.exec(parent)) !== null) {
    result[match[1].trim()] = match[2].trim()
  }

  return result
}

function list(markdown, heading) {
  return section(markdown, heading)
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => line.slice(2).trim())
}

function field(block, label) {
  const pattern = new RegExp(`^${escapeRegExp(label)}:\\s*(.+)$`, 'mi')
  const match = block.match(pattern)
  return match ? match[1].trim() : ''
}

function paragraphAfter(block, label) {
  const pattern = new RegExp(`^${escapeRegExp(label)}:\\s*([\\s\\S]*?)(?=\\n\\n[A-Za-z][A-Za-z &+\\-']*:\\s|\\n\\n[A-Za-z][A-Za-z &+\\-']*:\\n|\\n\\nServices:|\\n\\nDeliverables:|(?![\\s\\S]))`, 'mi')
  const match = block.match(pattern)
  return match ? match[1].trim() : ''
}

function nestedList(block, label) {
  const pattern = new RegExp(`^${escapeRegExp(label)}:\\s*$([\\s\\S]*?)(?=\\n\\n[A-Za-z][A-Za-z &+\\-']*:\\s|(?![\\s\\S]))`, 'mi')
  const match = block.match(pattern)
  if (!match) return []

  return match[1]
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => line.slice(2).trim())
}

function parseColonItems(markdown, heading) {
  return list(markdown, heading).map((item) => {
    const [title, ...rest] = item.split(':')
    return {
      title: title.trim(),
      text: rest.join(':').trim(),
    }
  })
}

function parseRows(markdown, heading) {
  return Object.entries(subsections(markdown, heading)).map(([title, block]) => ({
    title,
    kicker: field(block, 'Kicker'),
    headline: field(block, 'Headline'),
    copy: paragraphAfter(block, 'Copy'),
    cta: field(block, 'CTA'),
  }))
}

function parseStats(markdown) {
  return Object.entries(subsections(markdown, 'Stats')).map(([label, block]) => {
    const value = field(block, 'Value')
    const match = value.match(/^(\d+)(.*)$/)
    return {
      val: match ? Number(match[1]) : 0,
      suf: match ? match[2] : '',
      lab: label.toUpperCase(),
      desc: paragraphAfter(block, 'Description'),
      src: field(block, 'Source'),
    }
  })
}

function parseStage(block) {
  return {
    h: field(block, 'Headline').replaceAll('. ', '.\n').toUpperCase(),
    p: paragraphAfter(block, 'Copy'),
    cta: field(block, 'CTA'),
    items: nestedList(block, 'Services'),
  }
}

function parseStep([fallbackTitle, block]) {
  const title = fallbackTitle.replace(/^\d+\s+/, '')
  return {
    time: field(block, 'Time') || field(block, 'Time Label') || fallbackTitle,
    timeLabel: field(block, 'Time Label') || title,
    t: title.toUpperCase(),
    desc: paragraphAfter(block, 'Description'),
    deliverables: nestedList(block, 'Deliverables'),
  }
}

function parseIndustries(markdown) {
  return Object.entries(subsections(markdown, 'Industries')).map(([name, block]) => ({
    name,
    count: field(block, 'Count'),
    tagline: field(block, 'Tagline'),
    desc: paragraphAfter(block, 'Description'),
  }))
}

function parseTestimonials(markdown) {
  return Object.entries(subsections(markdown, 'Quotes')).map(([name, block]) => ({
    kind: 'quote',
    logo: field(block, 'Logo'),
    text: field(block, 'Quote'),
    name,
    role: field(block, 'Role'),
  }))
}

function parseRejects(markdown) {
  return list(markdown, "We Don't Take On").map((item) => {
    const [title, aside = ''] = item.split(/\s+Aside:\s*/i)
    return {
      t: title.trim(),
      aside: aside.trim(),
    }
  })
}

export const copy = {
  hero: {
    eyebrow: section(heroMarkdown, 'Eyebrow'),
    headline: section(heroMarkdown, 'Headline'),
    rotatingWords: list(heroMarkdown, 'Rotating Words'),
    subheadline: section(heroMarkdown, 'Subheadline'),
    primaryCta: section(heroMarkdown, 'Primary CTA'),
    secondaryCta: section(heroMarkdown, 'Secondary CTA'),
  },
  trustStrip: {
    eyebrow: section(trustStripMarkdown, 'Eyebrow'),
    ratings: list(trustStripMarkdown, 'Ratings'),
    workingWithEyebrow: section(trustStripMarkdown, 'Working With Eyebrow'),
    supportingCopy: section(trustStripMarkdown, 'Supporting Copy'),
    badges: parseColonItems(trustStripMarkdown, 'Badges'),
  },
  portfolio: {
    eyebrow: section(portfolioMarkdown, 'Eyebrow'),
    headline: section(portfolioMarkdown, 'Headline'),
    body: section(portfolioMarkdown, 'Body'),
    cta: section(portfolioMarkdown, 'CTA'),
    cards: Object.entries(subsections(portfolioMarkdown, 'Portfolio Cards')).map(([title, block]) => ({
      title,
      tag: field(block, 'Tag'),
      sub: block.replace(/^Tag:.+$/im, '').trim(),
    })),
  },
  aiNative: {
    eyebrow: section(aiNativeMarkdown, 'Eyebrow'),
    headline: section(aiNativeMarkdown, 'Headline'),
    withoutLabel: section(aiNativeMarkdown, 'Without Elux Label'),
    withoutHeadline: section(aiNativeMarkdown, 'Without Elux Headline'),
    withoutItems: parseColonItems(aiNativeMarkdown, 'Without Elux Items'),
    withoutResult: section(aiNativeMarkdown, 'Without Elux Result'),
    withLabel: section(aiNativeMarkdown, 'With Elux Label'),
    withHeadline: section(aiNativeMarkdown, 'With Elux Headline'),
    withItems: parseColonItems(aiNativeMarkdown, 'With Elux Items'),
    withResult: section(aiNativeMarkdown, 'With Elux Result'),
  },
  problemSolution: {
    eyebrow: section(problemSolutionMarkdown, 'Eyebrow'),
    headline: section(problemSolutionMarkdown, 'Headline'),
    rows: parseRows(problemSolutionMarkdown, 'Rows'),
  },
  numbers: {
    eyebrow: section(numbersMarkdown, 'Eyebrow'),
    headline: section(numbersMarkdown, 'Headline'),
    supportingCopy: section(numbersMarkdown, 'Supporting Copy'),
    stats: parseStats(numbersMarkdown),
    methodologyNote: section(numbersMarkdown, 'Methodology Note'),
    cta: section(numbersMarkdown, 'CTA'),
  },
  services: {
    eyebrow: section(servicesMarkdown, 'Eyebrow'),
    headline: section(servicesMarkdown, 'Headline'),
    stages: Object.fromEntries(
      Object.entries(subsections(servicesMarkdown, 'Stages')).map(([stage, block]) => [stage, parseStage(block)])
    ),
  },
  industries: {
    eyebrow: section(industriesMarkdown, 'Eyebrow'),
    headline: section(industriesMarkdown, 'Headline'),
    supportingCopy: section(industriesMarkdown, 'Supporting Copy'),
    industries: parseIndustries(industriesMarkdown),
    caseTags: list(industriesMarkdown, 'Case Tags'),
  },
  howWeWork: {
    eyebrow: section(howWeWorkMarkdown, 'Eyebrow'),
    headline: section(howWeWorkMarkdown, 'Headline'),
    supportingCopy: section(howWeWorkMarkdown, 'Supporting Copy'),
    steps: Object.entries(subsections(howWeWorkMarkdown, 'Steps')).map(parseStep),
    loopCopy: section(howWeWorkMarkdown, 'Loop Copy'),
  },
  testimonials: {
    eyebrow: section(testimonialsMarkdown, 'Eyebrow'),
    headline: section(testimonialsMarkdown, 'Headline'),
    quotes: parseTestimonials(testimonialsMarkdown),
    videoIds: list(testimonialsMarkdown, 'Video IDs'),
  },
  fitCheck: {
    eyebrow: section(fitCheckMarkdown, 'Eyebrow'),
    headline: section(fitCheckMarkdown, 'Headline'),
    supportingCopy: section(fitCheckMarkdown, 'Supporting Copy'),
    rejects: parseRejects(fitCheckMarkdown),
    accepts: list(fitCheckMarkdown, "We're Built For"),
    cta: section(fitCheckMarkdown, 'CTA'),
  },
  process: {
    eyebrow: section(processMarkdown, 'Eyebrow'),
    headline: section(processMarkdown, 'Headline'),
    supportingCopy: section(processMarkdown, 'Supporting Copy'),
    steps: Object.entries(subsections(processMarkdown, 'Steps')).map(parseStep),
    loopCopy: section(processMarkdown, 'Loop Copy'),
  },
  stillReading: {
    eyebrow: section(stillReadingMarkdown, 'Eyebrow'),
    headline: section(stillReadingMarkdown, 'Headline'),
    primaryCta: section(stillReadingMarkdown, 'Primary CTA'),
    secondaryCta: section(stillReadingMarkdown, 'Secondary CTA'),
  },
}
