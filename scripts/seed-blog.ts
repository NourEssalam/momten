// @ts-nocheck  (one-off demo script, not part of the app)
// Seeds 18 demo posts, each filled in fr (default) + en + ar.
//   Run:   pnpm payload run scripts/seed-blog.ts
//   Undo:  CLEAN=1 pnpm payload run scripts/seed-blog.ts
import { getPayload } from 'payload'
import config from '@payload-config'

const LOCALES = ['fr', 'en', 'ar'] // fr first: it is the default locale

const TAGS = [
  { fr: 'Technologie', en: 'Technology', ar: 'التكنولوجيا' },
  { fr: 'Entreprise', en: 'Business', ar: 'الأعمال' },
  { fr: 'Design', en: 'Design', ar: 'التصميم' },
  { fr: 'Agriculture', en: 'Agriculture', ar: 'الزراعة' },
  { fr: 'Style de vie', en: 'Lifestyle', ar: 'نمط الحياة' },
]

// tags = indexes into TAGS
const TOPICS = [
  { slug: 'how-ai-is-changing-small-businesses', tags: [0, 1], en: 'How AI Is Changing Small Businesses', fr: "Comment l'IA transforme les petites entreprises", ar: 'كيف يغيّر الذكاء الاصطناعي الشركات الصغيرة' },
  { slug: 'building-a-brand-people-remember', tags: [1, 2], en: 'Building a Brand People Remember', fr: 'Construire une marque dont on se souvient', ar: 'بناء علامة تجارية لا تُنسى' },
  { slug: 'smart-irrigation-for-modern-farms', tags: [3], en: 'Smart Irrigation for Modern Farms', fr: "L'irrigation intelligente pour les fermes modernes", ar: 'الريّ الذكي للمزارع الحديثة' },
  { slug: 'design-principles-for-clean-websites', tags: [2, 0], en: 'Design Principles for Clean Websites', fr: 'Principes de design pour des sites épurés', ar: 'مبادئ التصميم للمواقع النظيفة' },
  { slug: 'remote-work-habits-that-actually-work', tags: [4, 1], en: 'Remote Work Habits That Actually Work', fr: 'Des habitudes de télétravail qui fonctionnent vraiment', ar: 'عادات العمل عن بُعد التي تنجح فعلاً' },
  { slug: 'a-beginners-guide-to-content-marketing', tags: [1], en: "A Beginner's Guide to Content Marketing", fr: 'Guide du débutant du marketing de contenu', ar: 'دليل المبتدئين إلى التسويق بالمحتوى' },
  { slug: 'healthy-routines-for-busy-professionals', tags: [4], en: 'Healthy Routines for Busy Professionals', fr: 'Des routines saines pour les professionnels occupés', ar: 'روتين صحي للمهنيين المشغولين' },
  { slug: 'organic-farming-trends-this-year', tags: [3], en: 'Organic Farming Trends This Year', fr: "Les tendances de l'agriculture biologique cette année", ar: 'اتجاهات الزراعة العضوية هذا العام' },
  { slug: 'why-speed-matters-for-your-website', tags: [0], en: 'Why Speed Matters for Your Website', fr: 'Pourquoi la vitesse compte pour votre site web', ar: 'لماذا تهمّ سرعة موقعك الإلكتروني' },
  { slug: 'photography-tips-for-product-pages', tags: [2], en: 'Photography Tips for Product Pages', fr: 'Conseils photo pour vos pages produits', ar: 'نصائح التصوير لصفحات المنتجات' },
  { slug: 'growing-your-audience-on-social-media', tags: [1], en: 'Growing Your Audience on Social Media', fr: "Développer son audience sur les réseaux sociaux", ar: 'تنمية جمهورك على وسائل التواصل' },
  { slug: 'the-power-of-black-and-white-design', tags: [2], en: 'The Power of Black and White Design', fr: 'La puissance du design en noir et blanc', ar: 'قوة التصميم بالأبيض والأسود' },
  { slug: 'managing-a-small-team-with-confidence', tags: [1, 4], en: 'Managing a Small Team With Confidence', fr: 'Diriger une petite équipe avec confiance', ar: 'قيادة فريق صغير بثقة' },
  { slug: 'sustainable-water-use-in-agriculture', tags: [3], en: 'Sustainable Water Use in Agriculture', fr: "Utilisation durable de l'eau en agriculture", ar: 'الاستخدام المستدام للمياه في الزراعة' },
  { slug: 'email-newsletters-that-get-read', tags: [1], en: 'Email Newsletters That Get Read', fr: 'Des newsletters qui sont vraiment lues', ar: 'نشرات بريدية تُقرأ فعلاً' },
  { slug: 'from-idea-to-launch-in-30-days', tags: [1, 0], en: 'From Idea to Launch in 30 Days', fr: "De l'idée au lancement en 30 jours", ar: 'من الفكرة إلى الإطلاق في 30 يومًا' },
  { slug: 'mobile-first-design-explained', tags: [2, 0], en: 'Mobile-First Design Explained', fr: 'Le design mobile-first expliqué', ar: 'تصميم الجوال أولاً: شرح مبسّط' },
  { slug: 'telling-stories-with-data', tags: [0], en: 'Telling Stories With Data', fr: 'Raconter des histoires avec les données', ar: 'رواية القصص بالبيانات' },
]

const COPY = {
  en: {
    dir: 'ltr',
    intro: (t) => `This article walks through "${t}" step by step.`,
    excerpt: (t) => `Discover practical ideas and clear steps to put "${t}" into action, with simple examples you can apply to your own projects today.`,
    h: ['Start with the goal', 'Measure what matters', 'Keep improving'],
    p: [
      'Every project starts with a simple question: what are we trying to achieve? Before choosing tools or setting deadlines, take a moment to define the outcome in plain words.',
      'Once the goal is clear, break the work into small steps that can be tested quickly. Small wins build momentum, and they reveal problems while they are still cheap to fix.',
      'A few well-chosen numbers tell you more than a long report, and they make it easy to explain your progress to clients, partners and teammates.',
      'Review what worked, drop what did not, and share the lessons with your team so the next project starts from a stronger place.',
    ],
  },
  fr: {
    dir: 'ltr',
    intro: (t) => `Cet article passe en revue « ${t} », étape par étape.`,
    excerpt: (t) => `Découvrez des idées pratiques et des étapes claires autour du thème « ${t} », avec des exemples simples à appliquer dès aujourd'hui dans vos projets.`,
    h: ["Commencer par l'objectif", 'Mesurer ce qui compte', 'Continuer à progresser'],
    p: [
      "Chaque projet commence par une question simple : que cherchons-nous à accomplir ? Avant de choisir des outils ou de fixer des échéances, prenez le temps de définir le résultat attendu avec des mots clairs.",
      "Une fois l'objectif clair, découpez le travail en petites étapes faciles à tester. Les petites victoires créent de l'élan et révèlent les problèmes tant qu'ils sont encore simples à corriger.",
      "Quelques chiffres bien choisis en disent plus qu'un long rapport et facilitent le suivi avec vos clients, vos partenaires et votre équipe.",
      "Analysez ce qui a fonctionné, abandonnez le reste et partagez les enseignements pour que le prochain projet démarre sur de meilleures bases.",
    ],
  },
  ar: {
    dir: 'rtl',
    intro: (t) => `يستعرض هذا المقال موضوع «${t}» خطوة بخطوة.`,
    excerpt: (t) => `اكتشف أفكارًا عملية وخطوات واضحة حول «${t}»، مع أمثلة بسيطة يمكنك تطبيقها في مشاريعك منذ اليوم. ابدأ القراءة الآن.`,
    h: ['ابدأ بالهدف', 'قِس ما يهم', 'واصل التحسين'],
    p: [
      'يبدأ كل مشروع بسؤال بسيط: ماذا نريد أن نحقق؟ قبل اختيار الأدوات أو تحديد المواعيد، خُذ لحظة لتعريف النتيجة المطلوبة بكلمات واضحة.',
      'عندما يتضح الهدف، قسّم العمل إلى خطوات صغيرة يسهل اختبارها بسرعة. الإنجازات الصغيرة تصنع الزخم وتكشف المشكلات وهي لا تزال سهلة الحل.',
      'بضعة أرقام مختارة بعناية تخبرك أكثر من تقرير طويل، وتسهّل عليك شرح تقدمك للعملاء والشركاء وأعضاء الفريق.',
      'راجع ما نجح، وتخلَّ عمّا لم ينجح، وشارك الدروس مع فريقك ليبدأ المشروع القادم من أرضية أقوى.',
    ],
  },
}

// ---- Lexical helpers ----
const node = (type, dir, children, extra = {}) => ({ type, version: 1, format: '', indent: 0, direction: dir, children, ...extra })
const text = (t) => ({ type: 'text', version: 1, text: t, format: 0, detail: 0, mode: 'normal', style: '' })
const para = (t, d) => node('paragraph', d, [text(t)], { textFormat: 0 })
const head = (t, d) => node('heading', d, [text(t)], { tag: 'h2' })

const body = (l, title) => {
  const c = COPY[l]
  const d = c.dir
  return {
    root: node('root', d, [
      para(c.intro(title), d),
      head(c.h[0], d), para(c.p[0], d), para(c.p[1], d),
      head(c.h[1], d), para(c.p[2], d),
      head(c.h[2], d), para(c.p[3], d),
    ]),
  }
}

// Validate excerpt length (your field requires 100 < length < 300) before touching the DB
for (const t of TOPICS) {
  for (const l of LOCALES) {
    const n = COPY[l].excerpt(t[l]).length
    if (!(n > 100 && n < 300)) throw new Error(`Excerpt length ${n} out of range: ${t.slug} (${l})`)
  }
}

// ---- DB ----
const payload = await getPayload({ config })

if (process.env.CLEAN) {
  const res = await payload.delete({ collection: 'posts', where: { slug: { in: TOPICS.map((t) => t.slug) } } })
  console.log(`Deleted ${res.docs.length} seeded posts`)
  process.exit(0)
}

const media = await payload.find({ collection: 'media', where: { mimeType: { like: 'image' } }, limit: 100, depth: 0, pagination: false })
if (!media.docs.length) throw new Error('No images found in the media library')

const users = await payload.find({ collection: 'users', limit: 1, depth: 0 })
const author = users.docs[0]
if (!author) throw new Error('No user found to use as author')

// Tags: reuse by French title, otherwise create; then fill en/ar titles
const tagIds = []
for (const t of TAGS) {
  const found = await payload.find({ collection: 'tag', where: { title: { equals: t.fr } }, locale: 'fr', limit: 1, depth: 0 })
  let id = found.docs[0]?.id
  if (!id) id = (await payload.create({ collection: 'tag', locale: 'fr', data: { title: t.fr } })).id
  for (const l of ['en', 'ar']) {
    await payload.update({ collection: 'tag', id, locale: l, data: { title: t[l] } })
  }
  tagIds.push(id)
}

let created = 0
for (const [i, t] of TOPICS.entries()) {
  const exists = await payload.find({ collection: 'posts', where: { slug: { equals: t.slug } }, limit: 1, depth: 0, locale: 'fr' })
  if (exists.totalDocs) {
    console.log(`skip (exists): ${t.slug}`)
    continue
  }

  const localized = (l) => ({
    title: t[l],
    slug: t.slug,
    excerpt: COPY[l].excerpt(t[l]),
    tag: t.tags.map((n) => tagIds[n]),
    content: body(l, t[l]),
  })

  const doc = await payload.create({
    collection: 'posts',
    locale: 'fr',
    data: {
      image: media.docs[i % media.docs.length].id,
      authors: [author.id],
      publishedAt: new Date(Date.now() - i * 4 * 86400000).toISOString(),
      ...localized('fr'),
    },
  })
  if (created === 0) console.log(`first post OK. slug saved as: "${doc.slug}"`)

  for (const l of ['en', 'ar']) {
    await payload.update({ collection: 'posts', id: doc.id, locale: l, data: localized(l) })
  }
  created++
  console.log(`✓ ${t.slug}`)
}

console.log(`Done: ${created} posts created`)
process.exit(0)
