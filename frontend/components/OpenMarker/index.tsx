import { chevronRight } from "@/svg";
import classNames from "classnames";

export default function OpenMarker({ open }: { open: boolean }) {
  return (
    <div
      className={classNames([
        "open-marker",
        {
          open,
        },
      ])}
    >
      {chevronRight}
    </div>
  );
}
