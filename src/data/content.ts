import truckMuralCutout from '../assets/truck-mural-cutout.jpg';
import helmetMural from '../assets/helmet-mural.jfif';
import motorcycleMural from '../assets/motorcycle-mural.jpg';

export type Banner = {
  id: string;
  src: string;
  alt: string;
  objectPosition: string;
  /** Extra zoom beyond the square crop's plain object-fit: cover, for a
   *  tighter, closer-in look. 1 = no extra zoom. */
  scale: number;
  headline: string;
  /** Where this tile links to. */
  href: string;
  /** Override for narrow (portrait phone) viewports, where the tiles stack
   *  full-width instead of sitting side by side — object-fit: cover crops
   *  differently once the square's own width changes at that breakpoint. */
  objectPositionMobile?: string;
  /** 'contain' shows the whole photo letterboxed instead of cropping it to
   *  fill the square — for a source photo too wide (or with a subject too
   *  tall) to crop to 1:1 without cutting part of it off. Default 'cover'. */
  objectFit?: 'cover' | 'contain';
};

export const banners: Banner[] = [
  {
    id: 'hero-banner-1',
    src: truckMuralCutout,
    alt: "Hand-painted monster truck wall mural in a child's bedroom",
    objectPosition: 'center',
    scale: 1.15,
    headline: 'Kids rooms.',
    href: '/residential-murals',
  },
  {
    id: 'hero-banner-2',
    src: helmetMural,
    alt: 'Hand-painted American football helmet mural in a commercial space',
    objectPosition: 'center',
    scale: 1.1,
    headline: 'Commercial.',
    href: '/commercial-wall-murals',
  },
  {
    id: 'hero-banner-3',
    src: motorcycleMural,
    alt: 'Hand-painted motorcycle mural extending across a wall',
    objectPosition: '80% center',
    scale: 1,
    headline: 'Man cave.',
    href: '/residential-murals',
  },
];

export type Testimonial = { quote: string; name: string };

export const testimonials: Testimonial[] = [
  {
    quote:
      '“Our son’s room went from a plain box to a bedroom he wants to show everyone. The whole job took two days and there wasn’t a drop of paint anywhere it shouldn’t be.”',
    name: 'Emma T., parent',
  },
  {
    quote:
      '“The quote tool gave us a sensible starting price straight away, and the final number after the site visit was almost exactly what we expected. No surprises.”',
    name: 'James O., parent',
  },
  {
    quote:
      '“We used them for a mural in our café. Professional from the first visit, and they worked around our opening hours so we didn’t lose a day of trade.”',
    name: 'Priya K., commercial mural',
  },
  {
    quote:
      '“Booked in about a month ahead, which was exactly what we were told to expect. Two days of painting and our daughter’s woodland mural was done.”',
    name: 'Alex R., parent',
  },
];

export type ProcessStep = { title: string; body: string };

/** Shorter copy used on Landing's "How it works". Process page has its own fuller copy. */
export const howItWorks: ProcessStep[] = [
  {
    title: 'Site visit',
    body: 'We visit in person to measure the wall and talk through the design you have in mind.',
  },
  {
    title: 'Booked in',
    body: "You're booked in for your mural, with 50% paid upfront.",
  },
  {
    title: 'Design agreed',
    body: 'Your artwork is designed in digital format and agreed with you before we paint a thing.',
  },
  {
    title: 'Painted on site',
    body: "We paint directly onto your wall, ready to enjoy as soon as we're done.",
  },
];

export const processSteps: ProcessStep[] = [
  {
    title: 'Site visit',
    body: 'We visit in person to measure the wall, look at the room and light, and talk through the design you have in mind.',
  },
  {
    title: 'Booked in',
    body: "You're booked in for your mural, with 50% paid upfront. Typical waiting time from booking to start is 3–4 weeks.",
  },
  {
    title: 'Design agreed',
    body: 'Your artwork is designed in digital format and agreed with you before we paint a thing.',
  },
  {
    title: 'Painted on site',
    body: 'We paint directly onto your wall for the number of days agreed at the site visit, tidying up at the end of each day. No printed panels, no vinyl. Just paint on plaster.',
  },
];

export type FaqItem = { question: string; answer: string };

export const faqItems: FaqItem[] = [
  {
    question: 'What paint do you use, and is it safe for kids’ rooms?',
    answer:
      "We use low-VOC, water-based acrylics with a washable matte finish, the same category of paint used elsewhere in the room. It's safe for kids' bedrooms once dry.",
  },
  {
    question: 'How long does a mural take?',
    answer:
      'It depends on the size and detail of the design. Most bedroom murals take one to three days on site. We confirm the exact number of days at your site visit, then book you in. Typical waiting time from booking to start is 3–4 weeks.',
  },
  {
    question: 'How does pricing and payment work?',
    answer:
      'Most designs are £120 per square metre of wall. Use the instant quote tool for an estimate, then we confirm the final price at the site visit. A 50% deposit is taken upfront for materials, with the balance due on completion.',
  },
  {
    question: 'Do I need to prepare the wall first?',
    answer:
      "Just make sure the wall is clear of furniture and hangings, and that it's in normal decorative condition. We'll flag anything else, like patching or a fresh base coat, at the site visit.",
  },
  {
    question: 'Do you only paint kids’ bedrooms?',
    answer:
      'Most of our work is kids’ bedrooms, but we take on adult bedrooms and residential or commercial spaces too, including offices, shops, restaurants and more.',
  },
  {
    question: 'What if I’m not sure about the design yet?',
    answer:
      "That's fine. Get an instant estimate based on your wall size, then we'll talk through the design properly at the site visit before anything's booked in.",
  },
];

export const PRICE_PER_SQM = 120;

// Not an exhaustive administrative list — the well-known towns across each
// county, for the locations page. See Locations.tsx for the "further
// afield" note covering anywhere not listed here.
export const surreyTowns = [
  'Guildford',
  'Woking',
  'Epsom',
  'Reigate',
  'Redhill',
  'Camberley',
  'Farnham',
  'Dorking',
  'Leatherhead',
  'Staines-upon-Thames',
  'Esher',
  'Weybridge',
  'Godalming',
  'Haslemere',
  'Cranleigh',
  'Caterham',
  'Oxted',
  'Banstead',
  'Walton-on-Thames',
  'Chertsey',
  'Egham',
  'Horley',
  'Frimley',
  'East Molesey',
];

export const westSussexTowns = [
  'Chichester',
  'Worthing',
  'Crawley',
  'Horsham',
  'Bognor Regis',
  'Haywards Heath',
  'Burgess Hill',
  'East Grinstead',
  'Littlehampton',
  'Shoreham-by-Sea',
  'Midhurst',
  'Petworth',
  'Arundel',
  'Billingshurst',
  'Storrington',
  'Henfield',
  'Steyning',
  'Pulborough',
  'Selsey',
  'Rustington',
  'Southwater',
  'Hurstpierpoint',
  'Lancing',
];
