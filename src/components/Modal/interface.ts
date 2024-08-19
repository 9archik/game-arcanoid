export interface ModalProps {
  active: boolean;
  children: React.ReactNode;
  hiddenZindex?: number;
  activeZindex?: number;
  className?: string;
  activeClassName?: string;
  closeClick: () => void;
}
