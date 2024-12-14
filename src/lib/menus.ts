import {
  contactInfoType,
  footerMenuType,
  mainMenuType,
  socialsType,
  partnerType,
} from "./types/menu-types";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export const mainMenu: mainMenuType[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  // {
  //   name: "Programs",
  //   href: "/Programs",
  // },
  // {
  //   name: "Events",
  //   href: "/events",
  // },
  {
    name: "Contact",
    href: "/contact",
  },
  {
    name: "blog",
    href: "/blog",
  },
];

export const footerMenu: footerMenuType[] = [
  {
    name: "Get Involved",
    href: "/get-involved",
    category: "Engagement",
  },

  {
    name: "Blog",
    href: "/blog",
    category: "News and Updates",
  },
  {
    name: "Programs",
    href: "/programs",
    category: "Engagement",
  },
  {
    name: "Upcoming Events",
    href: "/upcoming-events",
    category: "News and Updates",
  },
  {
    name: "Archive",
    href: "/archive",
    category: "News and Updates",
  },
  {
    name: "Policies",
    href: "/policies",
    category: "General Information",
  },
  {
    name: "Locations",
    href: "/locations",
    category: "General Information",
  },
  {
    name: "Contact Us",
    href: "/contact-us",
    category: "General Information",
  },
  {
    name: "About",
    href: "/about",
    category: "General Information",
  },
];

export const socials: socialsType[] = [
  {
    name: "facebook",
    href: "https://www.facebook.com/nour.IJHSapiens/",
    Icon: FaFacebook,
  },
  {
    name: "instagram",
    href: "https://www.instagram.com/momtan.tn",
    Icon: FaInstagram,
  },
  {
    name: "twitter",
    href: "https://twitter.com/momtan_tn",
    Icon: FaTwitter,
  },
  {
    name: "youtube",
    href: "https://www.youtube.com/channel/UCqZ1kP9sZd4VQKZDw5f9mWw",
    Icon: FaYoutube,
  },
];

export const contactInfo: contactInfoType[] = [
  {
    type: "address",
    value: "Rue Kalila et Demna, Cité Riadh, 4023, Sousse, Tunisia.",
  },
  {
    type: "phone",
    value: "+216 73 300 014",
    link: "tel:+216 73 300014",
  },
  {
    type: "phone",
    value: "56 323 264",
    link: "tel:56 323 264",
  },
  {
    type: "email",
    value: "organisation.citoyennete.dhd@gmail.com",
    link: "mailto:organisation.citoyennete.dhd@gmail.com",
  },
];

export const partnersLogos: partnerType[] = [
  {
    name: "moura9iboun",
    alt: "logo of moura9iboun",
  },
  {
    name: "channel",
    alt: "logo of channel",
  },
  {
    name: "moura9iboun1",
    alt: "logo of moura9iboun",
  },

  {
    name: "moura9iboun2",
    alt: "logo of moura9iboun",
  },
  {
    name: "Opera_GX",
    alt: "logo of Opera_GX",
  },
  {
    name: "vodafone",
    alt: "logo of vodafone",
  },
];
