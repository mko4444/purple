import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

export default function DialogComponent({
  children,
  style,
  trigger,
  triggerStyle,
  triggerClassName,
  backgroundStyle,
  disabled,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  trigger: React.ReactNode;
  triggerStyle?: React.CSSProperties;
  triggerClassName?: string;
  backgroundStyle?: React.CSSProperties;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger disabled={disabled} style={triggerStyle} className={triggerClassName}>
        {trigger}
      </Dialog.Trigger>
      <div
        className="fadeIn col-c-c"
        style={{
          pointerEvents: open ? "all" : "none",
          width: "100vw",
          height: "100vh",
          top: 0,
          left: 0,
          position: "absolute",
          ...backgroundStyle,
        }}
      >
        <Dialog.Content
          className="fadeIn"
          style={{
            zIndex: 1000,
            ...style,
          }}
        >
          {children}
        </Dialog.Content>
      </div>
    </Dialog.Root>
  );
}
