import { useState, useEffect } from "react";
export function PopMessage({ message, type, time }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, time * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [show]);

  const styles = {
    popMessage: {
      display: show ? "block" : "none",
      position: "fixed",
      top: "30%",
      left: "50%",
      transform: "translateX(-50%)",
      color: "#ffffff",
      maxWidth: "550px",
      padding: "10px",
      zIndex: 10000,
      boxShadow: "var(--box-shadow-heavy)",
      borderRadius: "5px",
      animation: "popMessageAnimation 0.2s ease",
    },
    error: {
      backgroundColor: "var(--red)",
    },
    success: {
      backgroundColor: "var(--green)",
    },
  };

  return (
    <div
      className="pop-message"
      style={{
        ...styles.popMessage,
        ...(type === "error" ? styles.error : styles.success),
      }}
    >
      <h2>{message}</h2>
    </div>
  );
}
