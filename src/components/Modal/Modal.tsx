import { FC, useEffect } from "react";
import styles from "./styles.module.scss";
import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { ModalProps } from "./interface";
const Modal: FC<ModalProps> = ({
  active,
  children,
  hiddenZindex = -1,
  activeZindex = 10,
  className,
  activeClassName,
  closeClick,
}) => {
  const [open, setOpen] = useState(active);
  const elRef = useRef<HTMLDivElement | null>(null);
  const timeRef = useRef<any>();
  useEffect(() => {
    if (active) {
      requestAnimationFrame(() => {
        if (elRef && elRef.current) {
          elRef.current.style.zIndex = `${activeZindex}`;
          elRef?.current?.classList.toggle(
            `${activeClassName ? activeClassName : styles.active}`
          );
          document.body.style.overflow = "hidden";
        }
      });
    } else {
      requestAnimationFrame(() => {
        elRef?.current?.classList?.toggle(
          `${activeClassName ? activeClassName : styles.active}`
        );
        document.body.style.overflow = "";
      });
    }
  }, [active]);

  useEffect(() => {
    window.addEventListener("click", closeClick);

    return () => window.removeEventListener("click", closeClick);
  }, []);

  const condition = () => {
    return active || (!active && open);
  };

  return (
    <>
      {condition() && (
        <>
          {createPortal(
            <div
              ref={elRef}
              onTransitionEnd={() => {
                setOpen(active);
                if (!active && elRef && elRef.current) {
                  elRef.current.style.zIndex = String(hiddenZindex);
                }
              }}
              className={`${className ? className : styles.container} ${
                open && (activeClassName ? activeClassName : styles.active)
              }`}
            >
              <div className={styles.childCont}>{children}</div>
            </div>,
            document.body
          )}
        </>
      )}
    </>
  );
};

export default Modal;
