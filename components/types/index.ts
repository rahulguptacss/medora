import siteJson from '../data/data.json';

export interface LinkType {
  name: string;
  href: string;
  active?: boolean;
  children?: LinkType[];
}

export type NavItem = LinkType;

export interface TopbarSocialItem {
  icon: string;
  href: string;
}

export interface TopbarContactItem {
  icon: string;
  label?: string;
  value: string;
  href?: string;
}

export interface TopbarData {
  tagline?: string;
  mobile_call_text?: string;
  socials?: TopbarSocialItem[];
  contact_info?: TopbarContactItem[];
}

export interface HeaderData {
  logo?: string;
  logo_text?: string;
  links?: LinkType[];
  button_text?: string;
  button_text_mobile?: string;
  button_link?: string;
}

export interface PageComponent {
  key: string;
  component: string;
  sectionKey?: string;
}

export interface PageMeta {
  title: string;
  pageName: string;
  metadata: { title: string; description?: string };
  components?: PageComponent[];
}

export interface HeroSectionData {
  badge_text?: string;
  title_line1?: string;
  title_line2?: string;
  title_highlight?: string;
  title_line3?: string;
  description?: string;
  image?: string;
  primary_button?: {
    text: string;
    href: string;
  };
  floating_badge?: {
    value: string;
    label: string;
  };
  slides?: any[];
}

export interface AboutFeature {
  title: string;
  icon?: string;
}

export interface AboutCard {
  title: string;
  description: string;
  icon?: string;
}

export interface AboutData {
  subtitle?: string;
  title_line1?: string;
  title_highlight?: string;
  title_line2?: string;
  description?: string;
  features?: AboutFeature[];
  cards?: AboutCard[];
  button?: {
    text: string;
    href: string;
  };
  image?: string;
}

export interface StatItem {
  value: string;
  label: string;
  icon: string;
}

export interface StatsData {
  items?: StatItem[];
}

export interface ProductItem {
  title: string;
  image?: string;
  link?: string;
  icon: string;
}

export interface ProductsData {
  subtitle?: string;
  title_line1?: string;
  title_highlight?: string;
  description?: string;
  items?: ProductItem[];
  button?: {
    text: string;
    href: string;
  };
}

export interface ManufacturingFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface ManufacturingData {
  subtitle?: string;
  title_line1?: string;
  title_line2?: string;
  title_highlight?: string;
  description?: string;
  features?: ManufacturingFeature[];
  button?: {
    text: string;
    href: string;
  };
  images?: string[];
}

export interface CertificationItem {
  image: string;
  alt: string;
}

export interface CertificationsData {
  subtitle?: string;
  title_line1?: string;
  title_highlight?: string;
  description?: string;
  bg_image?: string;
  items?: CertificationItem[];
}

export interface ReviewItem {
  text: string;
  author: string;
  role: string;
  image?: string;
  rating?: number;
}

export interface TestimonialsData {
  subtitle?: string;
  title_line1?: string;
  title_highlight?: string;
  description?: string;
  reviews?: ReviewItem[];
}

export interface CtaBannerData {
  subtitle?: string;
  title_line1?: string;
  title_line2?: string;
  description?: string;
  image?: string;
  button?: {
    text: string;
    href: string;
  };
}

export interface ContactFormCard {
  title?: string;
  subtitle?: string;
  subjects?: string[];
  placeholders?: {
    name?: string;
    email?: string;
    phone?: string;
    subject?: string;
    message?: string;
  };
  button_text?: string;
  success_title?: string;
  success_message?: string;
}

export interface ContactInfoCard {
  title?: string;
  address?: string;
  phone?: string;
  email?: string;
  working_hours?: string;
}

export interface ContactSectionData {
  subtitle?: string;
  title?: string;
  titleHighlight?: string;
  description?: string;
  form_card?: ContactFormCard;
  info_card?: ContactInfoCard;
  map?: {
    embed_url?: string;
    office_name?: string;
    office_address?: string;
  };
}

export interface FooterData {
  logo?: string;
  logo_text?: string;
  description?: string;
  quick_links_title?: string;
  quick_links?: { name: string; href: string }[];
  product_range_title?: string;
  product_range?: { name: string; href: string }[];
  contact_title?: string;
  contact_info?: { icon?: string; text?: string; href?: string }[];
  copyright?: string;
  socials?: TopbarSocialItem[];
}

export const siteData = siteJson;
export { siteJson };
export const common = siteJson?.common || {};
export const pages: Record<string, any> = siteJson?.pages || (siteJson as any)?.categories?.Healthcare?.templateComponents?.['template-1']?.pages || {};
export const sections: Record<string, any> = siteJson?.sections || (siteJson as any)?.categories?.Healthcare?.templateComponents?.['template-1']?.sections || {};

export function toSlug(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
