export default function SectionHeading({ index, label, title, children }) {
  return (
    <div className="section-heading" data-reveal>
      <p className="section-label">
        <span>{index}</span> {label}
      </p>
      <h2>{title}</h2>
      {children && <p className="section-intro">{children}</p>}
    </div>
  );
}
