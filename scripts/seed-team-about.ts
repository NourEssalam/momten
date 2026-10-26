// @ts-nocheck  (one-off demo script, not part of the app)
// Seeds team members (from media files named team_*) and the 6 About pages, in fr (default) + en + ar.
//   Run:   pnpm payload run scripts/seed-team-about.ts
//   Undo team members only:  CLEAN=1 pnpm payload run scripts/seed-team-about.ts
import { getPayload } from 'payload'
import config from '@payload-config'

// ---------- Lexical helpers ----------
const node = (type, dir, children, extra = {}) => ({ type, version: 1, format: '', indent: 0, direction: dir, children, ...extra })
const text = (t) => ({ type: 'text', version: 1, text: t, format: 0, detail: 0, mode: 'normal', style: '' })
const lexical = (l, t) => {
  const d = l === 'ar' ? 'rtl' : 'ltr'
  return { root: node('root', d, [node('paragraph', d, [text(t)], { textFormat: 0 })]) }
}

// ---------- TEAM data ----------
const AR_NAMES = {
  camille_laurent: 'كاميل لوران',
  fatima_elmasri: 'فاطمة المصري',
  layla_nasser: 'ليلى ناصر',
  youssef_benali: 'يوسف بن علي',
  karim_haddad: 'كريم حداد',
  james_smith: 'جيمس سميث',
  pierre_dupont: 'بيير دوبون',
}
const FEMALE = new Set(['fatima', 'layla', 'sara', 'sarah', 'amina', 'nour', 'mariam', 'sophie', 'marie', 'emma', 'lina', 'yasmine', 'hiba', 'salma', 'julie', 'claire'])

// fr/ar are [masculine, feminine]
const ROLES = [
  { en: 'Executive Director', fr: ['Directeur exécutif', 'Directrice exécutive'], ar: ['المدير التنفيذي', 'المديرة التنفيذية'] },
  { en: 'Programs Manager', fr: ['Responsable des programmes', 'Responsable des programmes'], ar: ['مدير البرامج', 'مديرة البرامج'] },
  { en: 'Communications Lead', fr: ['Responsable communication', 'Responsable communication'], ar: ['مسؤول التواصل', 'مسؤولة التواصل'] },
  { en: 'Partnerships Manager', fr: ['Responsable des partenariats', 'Responsable des partenariats'], ar: ['مدير الشراكات', 'مديرة الشراكات'] },
  { en: 'Field Coordinator', fr: ['Coordinateur terrain', 'Coordinatrice terrain'], ar: ['منسق ميداني', 'منسقة ميدانية'] },
  { en: 'Finance Officer', fr: ['Responsable financier', 'Responsable financière'], ar: ['مسؤول مالي', 'مسؤولة مالية'] },
  { en: 'Project Officer', fr: ['Chargé de projets', 'Chargée de projets'], ar: ['مسؤول المشاريع', 'مسؤولة المشاريع'] },
  { en: 'Volunteer Coordinator', fr: ['Coordinateur des bénévoles', 'Coordinatrice des bénévoles'], ar: ['منسق المتطوعين', 'منسقة المتطوعين'] },
]
const SOCIAL_SETS = [['Linkedin', 'Instagram'], ['Linkedin', 'Twitter'], ['Facebook', 'Instagram']]
const SOCIAL_URLS = {
  Linkedin: 'https://www.linkedin.com/',
  Instagram: 'https://www.instagram.com/',
  Twitter: 'https://twitter.com/',
  Facebook: 'https://www.facebook.com/',
}
const pretty = (s) => s.split('_').filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1)).join(' ')

// ---------- ABOUT data ----------
// items: [ {en:[title, body], fr:[...], ar:[...]}, x3 ]
const PAGES = [
  {
    slug: 'history', en: 'Our History', fr: 'Notre histoire', ar: 'تاريخنا',
    items: [
      { en: ['How it all began', 'Our organization started as a small group of volunteers who believed that local communities can drive their own change. Our first project was a neighborhood clean-up that brought many families together.'],
        fr: ['Les débuts', "Notre organisation est née d'un petit groupe de bénévoles convaincus que les communautés locales peuvent être à l'origine de leur propre changement. Notre premier projet a rassemblé de nombreuses familles autour d'un nettoyage de quartier."],
        ar: ['كيف بدأ كل شيء', 'بدأت منظمتنا كمجموعة صغيرة من المتطوعين آمنوا بأن المجتمعات المحلية قادرة على صنع التغيير بنفسها. وجمع مشروعنا الأول عائلات كثيرة في حملة لتنظيف الحي.'] },
      { en: ['Growing together', 'Over the years our programs expanded to new regions, supported by partners, donors and a growing network of committed volunteers.'],
        fr: ['Grandir ensemble', "Au fil des années, nos programmes se sont étendus à de nouvelles régions, grâce à nos partenaires, à nos donateurs et à un réseau grandissant de bénévoles engagés."],
        ar: ['النمو معًا', 'على مر السنين توسعت برامجنا لتصل إلى مناطق جديدة، بدعم من الشركاء والمانحين وشبكة متنامية من المتطوعين الملتزمين.'] },
      { en: ['Where we are today', 'Today we run programs in education, environment and community development, guided by the same values that inspired our first steps.'],
        fr: ["Où nous en sommes aujourd'hui", "Aujourd'hui, nous menons des programmes en éducation, en environnement et en développement local, guidés par les valeurs qui ont inspiré nos premiers pas."],
        ar: ['أين نحن اليوم', 'نقوم اليوم بتنفيذ برامج في التعليم والبيئة والتنمية المحلية، مسترشدين بالقيم نفسها التي ألهمت خطواتنا الأولى.'] },
    ],
  },
  {
    slug: 'impact', en: 'Our Impact', fr: 'Notre impact', ar: 'أثرنا',
    items: [
      { en: ['Community Programs', 'Our community programs offer training, health awareness and local services to thousands of people every year.'],
        fr: ['Programmes communautaires', "Nos programmes communautaires offrent chaque année des formations, de la sensibilisation à la santé et des services de proximité à des milliers de personnes."],
        ar: ['البرامج المجتمعية', 'تقدّم برامجنا المجتمعية كل عام التدريب والتوعية الصحية والخدمات المحلية لآلاف الأشخاص.'] },
      { en: ['Environmental Projects', 'From tree planting to waste reduction, our environmental projects protect natural resources for future generations.'],
        fr: ['Projets environnementaux', "De la plantation d'arbres à la réduction des déchets, nos projets environnementaux protègent les ressources naturelles pour les générations futures."],
        ar: ['المشاريع البيئية', 'من زراعة الأشجار إلى تقليل النفايات، تحمي مشاريعنا البيئية الموارد الطبيعية للأجيال القادمة.'] },
      { en: ['Youth Empowerment', 'We help young people build skills, find opportunities and lead projects that matter to their communities.'],
        fr: ['Autonomisation des jeunes', "Nous aidons les jeunes à développer leurs compétences, à saisir des opportunités et à mener des projets utiles à leurs communautés."],
        ar: ['تمكين الشباب', 'نساعد الشباب على بناء مهاراتهم وإيجاد الفرص وقيادة مشاريع تهمّ مجتمعاتهم.'] },
    ],
  },
  {
    slug: 'values', en: 'Our Values', fr: 'Nos valeurs', ar: 'قيمنا',
    items: [
      { en: ['Integrity', 'We act with honesty and transparency in everything we do, and we are accountable to the people we serve.'],
        fr: ['Intégrité', "Nous agissons avec honnêteté et transparence en toutes circonstances, et nous rendons des comptes aux personnes que nous servons."],
        ar: ['النزاهة', 'نتصرف بصدق وشفافية في كل ما نقوم به، ونتحمل مسؤوليتنا أمام الأشخاص الذين نخدمهم.'] },
      { en: ['Solidarity', 'We believe in working together and in sharing knowledge, resources and responsibility.'],
        fr: ['Solidarité', "Nous croyons au travail collectif et au partage des connaissances, des ressources et des responsabilités."],
        ar: ['التضامن', 'نؤمن بالعمل معًا وبتقاسم المعرفة والموارد والمسؤولية.'] },
      { en: ['Sustainability', 'We design our work to last, respecting people and the environment today and tomorrow.'],
        fr: ['Durabilité', "Nous concevons notre action pour qu'elle dure, dans le respect des personnes et de l'environnement, aujourd'hui comme demain."],
        ar: ['الاستدامة', 'نصمم عملنا ليستمر، محترمين الإنسان والبيئة اليوم وغدًا.'] },
    ],
  },
  {
    slug: 'vision', en: 'Our Vision', fr: 'Notre vision', ar: 'رؤيتنا',
    items: [
      { en: ['A fairer future', 'We imagine a society where everyone has equal access to opportunities, knowledge and a healthy environment.'],
        fr: ['Un avenir plus juste', "Nous imaginons une société où chacun a un accès égal aux opportunités, au savoir et à un environnement sain."],
        ar: ['مستقبل أكثر عدلاً', 'نتخيل مجتمعًا يحصل فيه الجميع على فرص متساوية للوصول إلى المعرفة وإلى بيئة صحية.'] },
      { en: ['Empowered communities', 'We see communities that take initiative, solve their own challenges and support one another.'],
        fr: ['Des communautés autonomes', "Nous voyons des communautés qui prennent des initiatives, relèvent leurs propres défis et se soutiennent mutuellement."],
        ar: ['مجتمعات متمكنة', 'نرى مجتمعات تبادر وتحلّ تحدياتها بنفسها وتدعم بعضها بعضًا.'] },
      { en: ['Looking ahead', 'Our goal is to reach more regions and build lasting partnerships that multiply our impact.'],
        fr: ["Regarder vers l'avenir", "Notre objectif est d'atteindre davantage de régions et de bâtir des partenariats durables qui multiplient notre impact."],
        ar: ['نظرة إلى المستقبل', 'هدفنا أن نصل إلى مناطق أكثر ونبني شراكات دائمة تضاعف أثرنا.'] },
    ],
  },
  {
    slug: 'mission', en: 'Our Mission', fr: 'Notre mission', ar: 'مهمتنا',
    items: [
      { en: ['What we do', 'We design and deliver programs that strengthen communities through education, environmental action and youth leadership.'],
        fr: ['Ce que nous faisons', "Nous concevons et menons des programmes qui renforcent les communautés par l'éducation, l'action environnementale et le leadership des jeunes."],
        ar: ['ما نقوم به', 'نصمم وننفذ برامج تقوّي المجتمعات من خلال التعليم والعمل البيئي وقيادة الشباب.'] },
      { en: ['How we work', 'We listen first, build with local partners and measure results openly so every project stays useful and accountable.'],
        fr: ['Notre façon de travailler', "Nous écoutons d'abord, nous construisons avec des partenaires locaux et nous mesurons les résultats en toute transparence."],
        ar: ['كيف نعمل', 'نستمع أولاً، ونبني مع الشركاء المحليين، ونقيس النتائج بشفافية ليبقى كل مشروع مفيدًا وخاضعًا للمساءلة.'] },
      { en: ['Who we serve', 'Families, students, farmers and young people who want to improve their lives and their surroundings.'],
        fr: ['Qui nous servons', "Les familles, les étudiants, les agriculteurs et les jeunes qui veulent améliorer leur vie et leur environnement."],
        ar: ['من نخدم', 'العائلات والطلاب والمزارعين والشباب الذين يريدون تحسين حياتهم ومحيطهم.'] },
    ],
  },
  {
    slug: 'who-we-are', en: 'Who We Are', fr: 'Qui sommes-nous', ar: 'من نحن',
    items: [
      { en: ['Our people', 'We are a diverse team of professionals and volunteers united by a shared commitment to community service.'],
        fr: ['Notre équipe', "Nous sommes une équipe diverse de professionnels et de bénévoles unis par un engagement commun envers le service communautaire."],
        ar: ['فريقنا', 'نحن فريق متنوع من المهنيين والمتطوعين يجمعنا التزام مشترك بخدمة المجتمع.'] },
      { en: ['Our approach', 'We combine local knowledge with practical expertise to deliver projects that respond to real needs.'],
        fr: ['Notre approche', "Nous associons connaissance du terrain et expertise pratique pour mener des projets qui répondent à de vrais besoins."],
        ar: ['نهجنا', 'نجمع بين المعرفة المحلية والخبرة العملية لننفذ مشاريع تلبي احتياجات حقيقية.'] },
      { en: ['Join us', 'Whether you volunteer, partner or support our work, there is a place for you in our community.'],
        fr: ['Rejoignez-nous', "Que vous soyez bénévole, partenaire ou soutien, il y a une place pour vous dans notre communauté."],
        ar: ['انضم إلينا', 'سواء تطوعت أو شاركت أو دعمت عملنا، هناك مكان لك في مجتمعنا.'] },
    ],
  },
]

// ---- DB ----
const payload = await getPayload({ config })

// ===== TEAM =====
const media = await payload.find({ collection: 'media', where: { filename: { like: 'team_' } }, limit: 200, depth: 0, pagination: false, sort: 'filename' })
const teamMedia = media.docs.filter((m) => m.filename?.startsWith('team_'))

if (process.env.CLEAN) {
  const res = await payload.delete({ collection: 'team', where: { image: { in: teamMedia.map((m) => m.id) } } })
  console.log(`Deleted ${res.docs.length} seeded team members`)
  process.exit(0)
}

console.log(`Found ${teamMedia.length} team_* images`)
let teamCreated = 0
for (const [i, m] of teamMedia.entries()) {
  const already = await payload.count({ collection: 'team', where: { image: { equals: m.id } } })
  if (already.totalDocs) {
    console.log(`skip team (exists): ${m.filename}`)
    continue
  }
  const key = m.filename.replace(/^team_/, '').replace(/\.[^.]+$/, '')
  const latin = pretty(key)
  const female = FEMALE.has(key.split('_')[0].toLowerCase())
  const g = female ? 1 : 0
  const role = ROLES[i % ROLES.length]
  const set = SOCIAL_SETS[i % SOCIAL_SETS.length]

  const doc = await payload.create({
    collection: 'team',
    locale: 'fr',
    data: {
      name: latin,
      position: role.fr[g],
      image: m.id,
      socials: set.map((name) => ({ name, url: SOCIAL_URLS[name] })),
    },
  })
  await payload.update({ collection: 'team', id: doc.id, locale: 'en', data: { name: latin, position: role.en } })
  await payload.update({ collection: 'team', id: doc.id, locale: 'ar', data: { name: AR_NAMES[key] || latin, position: role.ar[g] } })
  teamCreated++
  console.log(`✓ team: ${latin} (${role.en})`)
}

// ===== ABOUT PAGES =====
const existing = await payload.find({ collection: 'about-pages', limit: 100, depth: 0, locale: 'all', pagination: false })
const norm = (s) => String(s || '').trim().toLowerCase()

for (const p of PAGES) {
  const titles = [p.en, p.fr, p.ar].map(norm)
  const match = existing.docs.find((d) => d.slug === p.slug || Object.values(d.title || {}).some((v) => titles.includes(norm(v))))

  const rowsFr = p.items.map((it) => ({ title: it.fr[0], content: lexical('fr', it.fr[1]) }))
  const doc = match
    ? await payload.update({ collection: 'about-pages', id: match.id, locale: 'fr', data: { title: p.fr, accordions: rowsFr } })
    : await payload.create({ collection: 'about-pages', locale: 'fr', data: { title: p.fr, slug: p.slug, accordions: rowsFr } })

  for (const l of ['en', 'ar']) {
    await payload.update({
      collection: 'about-pages',
      id: doc.id,
      locale: l,
      data: {
        title: p[l],
        accordions: doc.accordions.map((row, i) => ({ id: row.id, title: p.items[i][l][0], content: lexical(l, p.items[i][l][1]) })),
      },
    })
  }
  console.log(`${match ? '↻ updated' : '✓ created'} about page: ${p.en} (slug: ${doc.slug})`)
}

console.log(`Done: ${teamCreated} team members created, ${PAGES.length} about pages seeded`)
process.exit(0)
