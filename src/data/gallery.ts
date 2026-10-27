/** THE GALLERY — EDIT THIS FILE. 8 photos from public/images/gallery/. */

export type GalleryImage = {
  id: string;
  src: string;
  caption: string;
  /** Feeds the masonry's varied heights. */
  span: "tall" | "short" | "wide";
};

export const gallery: GalleryImage[] = [
  {
    id: "gallery-1",
    src: "/images/gallery/gallery-1.jpg",
    caption: "The pass, mid-service",
    span: "tall",
  },
  {
    id: "gallery-2",
    src: "/images/gallery/gallery-2.jpg",
    caption: "Plating, before the table sees it",
    span: "short",
  },
  {
    id: "gallery-3",
    src: "/images/gallery/gallery-3.jpg",
    caption: "Morning prep",
    span: "short",
  },
  {
    id: "gallery-4",
    src: "/images/gallery/gallery-4.jpg",
    caption: "The dining room",
    span: "wide",
  },
  {
    id: "gallery-5",
    src: "/images/gallery/gallery-5.jpg",
    caption: "Seafood, straight off the ice",
    span: "tall",
  },
  {
    id: "gallery-6",
    src: "/images/gallery/gallery-6.jpg",
    caption: "Service at full room",
    span: "short",
  },
  {
    id: "gallery-7",
    src: "/images/gallery/gallery-7.jpg",
    caption: "The last table of the night",
    span: "short",
  },
  {
    id: "gallery-8",
    src: "/images/gallery/gallery-8.jpg",
    caption: "A celebration, plated",
    span: "wide",
  },
];
