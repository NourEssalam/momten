import {
  aboutAccordionType,
  BlogPostType,
  eventMetaDataType,
  infoIntroType,
} from "./types/global-types";

export const eventPlaceholder: eventMetaDataType[] = [
  {
    title: "Annual Development Forum in Sousse",
    start: "Sep 22, 2022 10:00:00",
    end: "Sep 25, 2022 12:00:00",
    thumbnail: "01-event-sample-img.jpg",
    thumbnailAlt: "University of Southern California",
    location: "Sousse, Tunisia", // Added location
  },
  {
    title: "Consectetur adipiscing elit",
    start: "Oct 10, 2023 09:00:00",
    end: "Oct 12, 2023 11:30:00",
    thumbnail: "02-event-sample-img.jpg",
    thumbnailAlt: "University of Carolina",
    location: "Chapel Hill, North Carolina, USA", // Added location
  },
];

// Added infoIntro for the About page

export const infoIntro: infoIntroType[] = [
  {
    title: "Our Mission & Vision",
    description:
      "Discover our mission to inspire positive change and our vision for a better, connected Tunisia.",
    image: {
      src: "/img/gallery/activities.jpg", // Replace with actual image path
      alt: "Illustration of mission and vision",
    },
    links: [
      { text: "Our Mission", url: "/mission" },
      { text: "Our Vision", url: "/vision" },
    ],
  },
  {
    title: "Sustainable Development Goals",
    description:
      "Learn how we align with the SDGs to tackle Tunisia’s key challenges and promote sustainability.",
    image: {
      src: "/img/gallery/E_SDG_logo_UN_emblem_square_trans_WEB.webp", // Replace with actual image path
      alt: "Sustainable Development Goals representation",
    },
    links: [
      { text: "Our SDGs", url: "/sdgs" },
      { text: "Our Work", url: "/work" },
    ],
  },
  {
    title: "Our History",
    description:
      "Explore our journey and the key milestones that define our organization’s impact on Tunisian society.",
    image: {
      src: "/img/gallery/meeting leaders.jpg", // Replace with actual image path
      alt: "Timeline of our history",
    },
    links: [
      { text: "Our History", url: "/history" },
      { text: "Milestones", url: "/milestones" },
    ],
  },
];

export const aboutAccordion: aboutAccordionType[] = [
  {
    title: "Our Mission",
    slug: "mission",
    accordions: [
      {
        title: "Our Mission Statement",
        content:
          "We are committed to creating a better, more connected Tunisia by focusing on sustainable development and social responsibility. We are committed to creating a better, more connected Tunisia by focusing on sustainable development and social responsibility.",
      },
      {
        title: "Why Our Mission Matters",
        content:
          "Our mission is critical to addressing societal challenges and fostering a sense of community and belonging among Tunisians.",
      },
      {
        title: "How We Plan to Achieve It",
        content:
          "We achieve our mission through various programs, education initiatives, and community projects that drive positive change.",
      },
    ],
  },
  {
    title: "Our Vision",
    slug: "vision",
    accordions: [
      {
        title: "Our Vision for the Future",
        content:
          "We envision a Tunisia where every citizen is empowered, educated, and has the resources to thrive.",
      },
      {
        title: "Long-Term Goals",
        content:
          "Our long-term goal is to build a sustainable and inclusive society that benefits all Tunisians.",
      },
      {
        title: "Our Approach",
        content:
          "We focus on collaboration and innovation to address current and future challenges, ensuring a brighter future for generations to come.",
      },
    ],
  },
  {
    title: "Sustainable Development Goals",
    slug: "sdgs",
    accordions: [
      {
        title: "What Are the SDGs?",
        content:
          "The Sustainable Development Goals (SDGs) are a set of global objectives aimed at ending poverty, protecting the planet, and ensuring prosperity for all.",
      },
      {
        title: "How We Support the SDGs",
        content:
          "Our programs align with key SDGs to tackle pressing issues like poverty, education, and environmental sustainability in Tunisia.",
      },
      {
        title: "SDG-Focused Initiatives",
        content:
          "We implement initiatives that directly address specific SDGs, including clean energy, gender equality, and reduced inequalities.",
      },
    ],
  },
  {
    title: "Our Work",
    slug: "work",
    accordions: [
      {
        title: "Overview of Our Work",
        content:
          "Our organization engages in a wide variety of projects that aim to uplift communities and address Tunisia's most pressing challenges.",
      },
      {
        title: "Community Programs",
        content:
          "We work closely with local communities to implement projects that have a tangible, positive impact on people's lives.",
      },
      {
        title: "Results and Impact",
        content:
          "Our efforts have led to measurable improvements in areas such as education, sustainability, and social cohesion.",
      },
    ],
  },
  {
    title: "Our History",
    slug: "history",
    accordions: [
      {
        title: "The Early Days",
        content:
          "Our organization was founded with the vision of making Tunisia a better place, starting with grassroots community work.",
      },
      {
        title: "Major Milestones",
        content:
          "Throughout our journey, we have hit several key milestones that have defined the growth and success of our initiatives.",
      },
      {
        title: "Challenges Overcome",
        content:
          "Despite facing many challenges, our resilience and determination have allowed us to overcome obstacles and continue making an impact.",
      },
    ],
  },
  {
    title: "Milestones",
    slug: "milestones",
    accordions: [
      {
        title: "Key Achievements",
        content:
          "We are proud of our achievements, including launching multiple successful programs and forming strategic partnerships.",
      },
      {
        title: "Growth Over the Years",
        content:
          "Our organization has grown steadily, expanding both in terms of reach and the scale of our projects.",
      },
      {
        title: "Looking Forward",
        content:
          "As we continue to grow, we remain committed to our mission and excited for what the future holds.",
      },
    ],
  },
];

// export const blogPosts: BlogPostType[] = [
//   {
//     title: "Empowering Citizens for Sustainable Growth",
//     slug: "empowering-citizens-sustainable-growth",
//     publishDate: "2024-10-05",
//     content:
//       "In this post, we explore how active citizenship can drive sustainable development across Tunisia and the role of our community programs in fostering positive change.",
//     author: "Amira Ben Youssef",
//     image: {
//       imgSrc: "/img/posts/post-1.jpg",
//       alt: "Citizens gathered for a community event",
//     },
//   },

// ];
