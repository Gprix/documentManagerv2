export type BackdropStyle = "glass" | "dark" | "none";

export interface ModalProps {
  children: React.ReactNode;
  className?: string;
  backdrop?: BackdropStyle;
  type?: "boxed" | "unboxed";
  onClose: () => void;
}

export interface BackdropProps {
  backdrop: BackdropStyle;
  onClick?: () => void;
}

export interface NewModalProps {
  className?: string;
  children?: React.ReactNode;
  title?: string;
  onClose?: () => void;
  isOpened?: boolean;
  showCloseButton?: boolean;
  closeButtonClassName?: string;
}
