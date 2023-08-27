export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="badge" style={{ whiteSpace: "nowrap" }}>
      {children}
    </div>
  );
}
