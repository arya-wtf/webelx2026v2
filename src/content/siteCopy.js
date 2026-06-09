import siteCopyMarkdown from './md/site-copy.md?raw'

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function section(markdown, heading) {
  const pattern = new RegExp(`^## ${escapeRegExp(heading)}\\s*$([\\s\\S]*?)(?=^## |^# |^---|(?![\\s\\S]))`, 'mi')
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
    sprint: field(block, 'Sprint'),
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



// Helper: extract a named page/section block by its # heading
function pageBlock(heading) {
  const pattern = new RegExp(`^# ${escapeRegExp(heading)}\\s*$([\\s\\S]*?)(?=^# |(?![\\s\\S]))`, 'mi')
  const match = siteCopyMarkdown.match(pattern)
  return match ? match[1] : ''
}

const heroMd = pageBlock('01 Hero')
const trustStripMd = pageBlock('02 Credibility Bar')
const portfolioMd = pageBlock('03 Portfolio Highlight')
const theShiftMd = pageBlock('04 The Shift')
const aiNativeMd = pageBlock('04 How AI-Native Solves It')
const problemSolutionMd = pageBlock('05 Problem Solution')
const numbersMd = pageBlock('06 Numbers')
const servicesMd = pageBlock('07 Services By Stage')
const aiStackMd = pageBlock('07 The AI Stack')
const industriesMd = pageBlock('08 Industries')
const howWeWorkMd = pageBlock('09 How We Work')
const ownProductsMd = pageBlock('09 Own Products')
const testimonialsMd = pageBlock('10 Testimonials')
const fitCheckMd = pageBlock("11 Who We're Not For")
const processMd = pageBlock('12 How We Work V2')
const stillReadingMd = pageBlock('13 Still Reading')

export const copy = {
  hero: {
    eyebrow: section(heroMd, 'Eyebrow'),
    headline: section(heroMd, 'Headline'),
    rotatingWords: list(heroMd, 'Rotating Words'),
    subheadline: section(heroMd, 'Subheadline'),
    primaryCta: section(heroMd, 'Primary CTA'),
    secondaryCta: section(heroMd, 'Secondary CTA'),
  },
  trustStrip: {
    eyebrow: section(trustStripMd, 'Eyebrow'),
    ratings: list(trustStripMd, 'Ratings'),
    workingWithEyebrow: section(trustStripMd, 'Working With Eyebrow'),
    supportingCopy: section(trustStripMd, 'Supporting Copy'),
    badges: parseColonItems(trustStripMd, 'Badges'),
  },
  portfolio: {
    eyebrow: section(portfolioMd, 'Eyebrow'),
    headline: section(portfolioMd, 'Headline'),
    body: section(portfolioMd, 'Body'),
    cta: section(portfolioMd, 'CTA'),
    cards: Object.entries(subsections(portfolioMd, 'Portfolio Cards')).map(([title, block]) => ({
      title,
      tag: field(block, 'Tag'),
      sub: block.replace(/^Tag:.+$/im, '').trim(),
    })),
  },
  theShift: {
    eyebrow: section(theShiftMd, 'Eyebrow'),
    headline: section(theShiftMd, 'Headline'),
    body: section(theShiftMd, 'Body'),
    items: parseColonItems(theShiftMd, 'Items'),
  },
  ownProducts: {
    eyebrow: section(ownProductsMd, 'Eyebrow'),
    headline: section(ownProductsMd, 'Headline'),
    body: section(ownProductsMd, 'Body'),
    cta: section(ownProductsMd, 'CTA'),
    products: Object.entries(subsections(ownProductsMd, 'Products')).map(([title, block]) => ({
      title,
      tag: field(block, 'Tag'),
      link: field(block, 'Link'),
      status: field(block, 'Status'),
      desc: paragraphAfter(block, 'Description'),
    })),
  },
  aiNative: {
    eyebrow: section(aiNativeMd, 'Eyebrow'),
    headline: section(aiNativeMd, 'Headline'),
    withoutLabel: section(aiNativeMd, 'Without Elux Label'),
    withoutHeadline: section(aiNativeMd, 'Without Elux Headline'),
    withoutItems: parseColonItems(aiNativeMd, 'Without Elux Items'),
    withoutResult: section(aiNativeMd, 'Without Elux Result'),
    withLabel: section(aiNativeMd, 'With Elux Label'),
    withHeadline: section(aiNativeMd, 'With Elux Headline'),
    withItems: parseColonItems(aiNativeMd, 'With Elux Items'),
    withResult: section(aiNativeMd, 'With Elux Result'),
  },
  problemSolution: {
    eyebrow: section(problemSolutionMd, 'Eyebrow'),
    headline: section(problemSolutionMd, 'Headline'),
    rows: parseRows(problemSolutionMd, 'Rows'),
  },
  numbers: {
    eyebrow: section(numbersMd, 'Eyebrow'),
    headline: section(numbersMd, 'Headline'),
    supportingCopy: section(numbersMd, 'Supporting Copy'),
    stats: parseStats(numbersMd),
    methodologyNote: section(numbersMd, 'Methodology Note'),
    cta: section(numbersMd, 'CTA'),
  },
  services: {
    eyebrow: section(servicesMd, 'Eyebrow'),
    headline: section(servicesMd, 'Headline'),
    supportingCopy: section(servicesMd, 'Supporting Copy'),
    stages: Object.fromEntries(
      Object.entries(subsections(servicesMd, 'Stages')).map(([stage, block]) => [stage, parseStage(block)])
    ),
  },
  industries: {
    eyebrow: section(industriesMd, 'Eyebrow'),
    headline: section(industriesMd, 'Headline'),
    supportingCopy: section(industriesMd, 'Supporting Copy'),
    industries: parseIndustries(industriesMd),
    caseTags: list(industriesMd, 'Case Tags'),
  },
  howWeWork: {
    eyebrow: section(howWeWorkMd, 'Eyebrow'),
    headline: section(howWeWorkMd, 'Headline'),
    supportingCopy: section(howWeWorkMd, 'Supporting Copy'),
    steps: Object.entries(subsections(howWeWorkMd, 'Steps')).map(parseStep),
    loopCopy: section(howWeWorkMd, 'Loop Copy'),
  },
  testimonials: {
    eyebrow: section(testimonialsMd, 'Eyebrow'),
    headline: section(testimonialsMd, 'Headline'),
    quotes: parseTestimonials(testimonialsMd),
    videoIds: list(testimonialsMd, 'Video IDs'),
  },
  fitCheck: {
    eyebrow: section(fitCheckMd, 'Eyebrow'),
    headline: section(fitCheckMd, 'Headline'),
    supportingCopy: section(fitCheckMd, 'Supporting Copy'),
    accepts: list(fitCheckMd, "We're Built For"),
    cta: section(fitCheckMd, 'CTA'),
  },
  process: {
    eyebrow: section(processMd, 'Eyebrow'),
    headline: section(processMd, 'Headline'),
    supportingCopy: section(processMd, 'Supporting Copy'),
    steps: Object.entries(subsections(processMd, 'Steps')).map(parseStep),
    loopCopy: section(processMd, 'Loop Copy'),
  },
  aiStack: {
    headline: section(aiStackMd, 'Headline'),
    logos: section(aiStackMd, 'Logos'),
  },
  stillReading: {
    eyebrow: section(stillReadingMd, 'Eyebrow'),
    headline: section(stillReadingMd, 'Headline'),
    primaryCta: section(stillReadingMd, 'Primary CTA'),
    secondaryCta: section(stillReadingMd, 'Secondary CTA'),
  },
}
