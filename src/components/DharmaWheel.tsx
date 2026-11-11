/** The Dharmachakra: eight spokes for the Eightfold Path. */
export default function DharmaWheel({ className = "" }: { className?: string }) {
  const spokes = Array.from({ length: 8 }, (_, i) => i * 45);
  return (
    <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" className={className} aria-hidden="true">
      <circle cx="100" cy="100" r="96" strokeWidth="0.6" strokeDasharray="1 5" />
      <circle cx="100" cy="100" r="84" strokeWidth="2.4" />
      <circle cx="100" cy="100" r="74" strokeWidth="0.8" />
      <circle cx="100" cy="100" r="17" strokeWidth="2" />
      <circle cx="100" cy="100" r="6" strokeWidth="1.2" />
      {spokes.map((a) => (
        <g key={a} transform={`rotate(${a} 100 100)`}>
          <path d="M100 83V26" strokeWidth="2" strokeLinecap="round" />
          <path d="M100 26c-5 6-5 12 0 17 5-5 5-11 0-17Z" strokeWidth="1" fill="currentColor" fillOpacity="0.25" />
          <circle cx="100" cy="6" r="2.4" fill="currentColor" stroke="none" />
        </g>
      ))}
    </svg>
  );
}
