import * as Dialog from "@radix-ui/react-dialog";

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
  return (
    <Dialog.Root>
      <Dialog.Trigger disabled={disabled} style={triggerStyle} className={triggerClassName}>
        {trigger}
      </Dialog.Trigger>
      <Dialog.Portal
        className="col-c-c"
        container={document.body}
        style={{
          background: "red",
        }}
      >
        <Dialog.Overlay />
        <div
          className="fadeIn col-c-c"
          style={{ width: "100vw", height: "100vh", top: 0, left: 0, position: "absolute", ...backgroundStyle }}
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
      </Dialog.Portal>
    </Dialog.Root>
  );
}
