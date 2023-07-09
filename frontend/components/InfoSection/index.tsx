import { londrina } from "@/util/fonts";
import OpenMarker from "../OpenMarker";

export default function InfoSection({
  children,
  title,
  openTab,
  setOpenTab,
  tabId,
}: {
  children: React.ReactNode | React.ReactNode[];
  title: string;
  openTab: string | null;
  setOpenTab: (tabId: string | null) => void;
  tabId: string;
}) {
  const isOpen: boolean = openTab === tabId;

  function onToggleOpen() {
    setOpenTab(isOpen ? null : tabId);
  }

  return (
    <div className="info-section">
      <button className="info-section--header" onClick={onToggleOpen}>
        <h2 className="info-section--title" style={londrina.style}>
          {title}
        </h2>
        <OpenMarker open={isOpen} />
      </button>
      <div />
      <div className="info-section--children" style={{ maxHeight: isOpen ? 1000 : 0 }}>
        {children}
        <div />
        <div />
      </div>
    </div>
  );
}
