/**
 * THE EVENTS — EDIT THIS FILE.
 *
 * 3 event photos in public/images/events/ plus a background for the section.
 */

export type EventPackage = {
  id: string;
  name: string;
  image: string;
  tagline: string;
  body: string;
  includes: string[];
  /** "from" price per guest. */
  from: number;
  bestFor: string;
};

export const events: EventPackage[] = [
  {
    id: "event-birthday",
    name: "Birthdays & Celebrations",
    image: "/images/events/event-birthday.jpg",
    tagline: "The table, already set",
    body: "Celebrations run end to end: the menu is agreed in advance, the cake is finished with your inscription, and everything lands when you said it would.",
    includes: [
      "Menu agreed and confirmed in writing",
      "Celebration cake with your inscription",
      "Delivery and setup included",
      "Staffed service for the evening",
    ],
    from: 65,
    bestFor: "Up to 40 guests",
  },
  {
    id: "event-private",
    name: "Private Dining",
    image: "/images/events/event-private.jpg",
    tagline: "Six seats, one room, no interruptions",
    body: "The front dining room is yours for the evening. A fixed menu, a seated service, and a chef in the room who cooked all of it.",
    includes: [
      "Exclusive use of the dining room",
      "Fixed tasting menu for the table",
      "Table service throughout",
      "Wine and pairing on request",
    ],
    from: 95,
    bestFor: "2 to 6 guests",
  },
  {
    id: "event-custom",
    name: "Bespoke & Corporate",
    image: "/images/events/event-custom.jpg",
    tagline: "Built around your brief",
    body: "Client dinners, launches and long-table events. Tell us the brief and we will write the menu around it — dietary requirements, timings and budget all handled.",
    includes: [
      "Menu written to your brief",
      "Dietary requirements handled",
      "Branded or neutral service",
      "Invoicing and booking paperwork",
    ],
    from: 55,
    bestFor: "Any guest count",
  },
];
