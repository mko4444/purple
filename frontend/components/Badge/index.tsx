export default function Badge({ children, style }: { children: React.ReactNode; style?: any }) {
  return (
    <div className="badge" style={{ whiteSpace: "nowrap", ...style }}>
      {children}
    </div>
  );
}
