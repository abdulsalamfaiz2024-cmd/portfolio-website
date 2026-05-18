interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
}

export function SectionHeading({ label, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-16">
      <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
        {label}
      </p>
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-3xl text-base md:text-lg text-slate-600 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
