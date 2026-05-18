"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";

interface GalleryPhoto {
  src: string;
  alt: string;
  caption: string;
  category: "presenting" | "academic" | "personal";
  objectPosition?: string;
}

// Moved inside component for localization

export function PhotoGallery({ lang = "en" }: { lang?: "en" | "ar" }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categoryLabels: Record<string, string> = {
    all: lang === 'ar' ? "الكل" : "All Photos",
    presenting: lang === 'ar' ? "العروض التقديمية" : "Presentations",
    academic: lang === 'ar' ? "أكاديمي" : "Academic",
    personal: lang === 'ar' ? "شخصي" : "Personal",
  };

  const photos: GalleryPhoto[] = [
    {
      src: "/images/gallery/hsa_presenting.jpg",
      alt: lang === 'ar' ? "تقديم نتائج تدريب مجموعة هائل سعيد أنعم" : "Presenting HSA Group internship findings",
      caption: lang === 'ar' ? "التدريب العملي — مجموعة HSA" : "Internship Placement — HSA Group",
      category: "presenting",
      objectPosition: "center 35%",
    },
    {
      src: "/images/gallery/research_defense.jpg",
      alt: lang === 'ar' ? "تقديم فرضيات البحث لجمهور أكاديمي" : "Presenting research hypotheses to academic audience",
      caption: lang === 'ar' ? "عرض فرضيات البحث" : "Research Hypotheses Presentation",
      category: "academic",
      objectPosition: "center 55%",
    },
    {
      src: "/images/gallery/casual_portrait.jpg",
      alt: lang === 'ar' ? "صورة شخصية في الليل" : "Casual portrait at night",
      caption: lang === 'ar' ? "بعد العمل" : "After Hours",
      category: "personal",
      objectPosition: "center 55%",
    },
  ];

  const filteredPhotos =
    activeFilter === "all"
      ? photos
      : photos.filter((p) => p.category === activeFilter);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % filteredPhotos.length : null
    );
  }, [filteredPhotos.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null
        ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length
        : null
    );
  }, [filteredPhotos.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  return (
    <section id="gallery" className="gallery-section">
      <div className="gallery-container">
        {/* Section Header */}
        <FadeIn>
          <div className="gallery-header">
            <div className="gallery-header-icon">
              <Camera className="h-5 w-5" />
            </div>
            <h2 className="gallery-title">{lang === 'ar' ? "في العمل" : "In Action"}</h2>
            <p className="gallery-subtitle">
              {lang === 'ar' 
                ? "لمحات من العروض التقديمية، الأبحاث، والرحلة وراء البيانات."
                : "Moments from presentations, research, and the journey behind the data."}
            </p>
          </div>
        </FadeIn>

        {/* Category Filters */}
        <FadeIn delay={0.05}>
          <div className="gallery-filters">
            {Object.entries(categoryLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`gallery-filter-btn ${
                  activeFilter === key ? "active" : ""
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Bento Grid */}
        <FadeIn delay={0.1}>
          <div className="gallery-grid">
            <AnimatePresence mode="popLayout">
              {filteredPhotos.map((photo, index) => (
                <motion.div
                  key={photo.src}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="gallery-card"
                  onClick={() => openLightbox(index)}
                >
                  <div className="gallery-card-inner">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="gallery-card-img"
                      style={{
                        objectPosition: photo.objectPosition || "center center",
                      }}
                    />

                    {/* Hover Overlay */}
                    <div className="gallery-card-overlay">
                      <div className="gallery-card-caption">
                        <span className="gallery-card-category">
                          {categoryLabels[photo.category]}
                        </span>
                        <p className="gallery-card-title">{photo.caption}</p>
                      </div>
                      <div className="gallery-card-zoom">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                          <line x1="11" y1="8" x2="11" y2="14" />
                          <line x1="8" y1="11" x2="14" y2="11" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </FadeIn>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="lightbox-container"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                className="lightbox-close"
                onClick={closeLightbox}
                aria-label="Close lightbox"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Navigation */}
              <button
                className="lightbox-nav lightbox-nav--prev"
                onClick={lang === 'ar' ? goNext : goPrev}
                aria-label="Previous photo"
              >
                <ChevronLeft className={`h-6 w-6 ${lang === 'ar' ? 'rotate-180' : ''}`} />
              </button>
              <button
                className="lightbox-nav lightbox-nav--next"
                onClick={lang === 'ar' ? goPrev : goNext}
                aria-label="Next photo"
              >
                <ChevronRight className={`h-6 w-6 ${lang === 'ar' ? 'rotate-180' : ''}`} />
              </button>

              {/* Image */}
              <div className="lightbox-image-wrapper">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={filteredPhotos[lightboxIndex].src}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.25 }}
                    className="lightbox-image-container"
                  >
                    <Image
                      src={filteredPhotos[lightboxIndex].src}
                      alt={filteredPhotos[lightboxIndex].alt}
                      fill
                      sizes="90vw"
                      className="lightbox-img"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Caption */}
              <div className="lightbox-caption">
                <p className="lightbox-caption-title">
                  {filteredPhotos[lightboxIndex].caption}
                </p>
                <p className="lightbox-caption-counter">
                  {lightboxIndex + 1} / {filteredPhotos.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
