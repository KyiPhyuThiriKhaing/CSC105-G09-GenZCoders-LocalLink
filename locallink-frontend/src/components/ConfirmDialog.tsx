import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

type ConfirmDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "success" | "primary";
};

export default function ConfirmDialog({
  isOpen,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "primary",
}: ConfirmDialogProps) {
  const getConfirmButtonClasses = () => {
    switch (variant) {
      case "danger":
        return "bg-red-600 text-white hover:bg-red-700";
      case "success":
        return "bg-green-600 text-white hover:bg-green-700";
      case "primary":
      default:
        return "bg-(--color-brand-primary) text-white hover:opacity-90";
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-[rgba(31,18,51,0.45)] backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-(--color-ink-border-faint) bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-xl">
          <div className="flex flex-col gap-2">
            <Dialog.Title className="text-lg font-semibold text-(--color-ink-strong)">
              {title}
            </Dialog.Title>
            <Dialog.Description className="text-sm text-(--color-text-muted)">
              {description}
            </Dialog.Description>
          </div>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4">
            <Dialog.Close asChild>
              <button
                type="button"
                className="mt-2 inline-flex items-center justify-center rounded-lg border border-(--color-ink-border-soft) bg-white px-4 py-2 font-semibold text-(--color-ink-strong) transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 sm:mt-0"
              >
                {cancelText}
              </button>
            </Dialog.Close>
            <button
              type="button"
              onClick={() => {
                onConfirm();
                onOpenChange(false);
              }}
              className={`inline-flex items-center justify-center rounded-lg px-4 py-2 font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 ${getConfirmButtonClasses()}`}
            >
              {confirmText}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}