import { IconType } from "react-icons";

export type mainMenuType = {
  name: string;
  href: string;
};

export type footerMenuType = {
  name: string;
  href: string;
  category: string;
};

export type socialsType = {
  name: string;
  href: string;
  Icon: IconType;
};

export type contactInfoType = {
  type: "address" | "phone" | "email"; // Define what type of info it is
  value: string; // The content (address, phone number, or email)
  link?: string; // Optional: The link to make it clickable (for phone/email)
};

export type partnerType = {
  name: string;
  alt: string;
};
