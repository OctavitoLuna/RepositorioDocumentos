import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const USER_ICON_ACTUAL_SIZE = "100px";
const TITLE_FONT_SIZE = "40px";
const SMALL_ICON_SVG_SIZE = "26px";
const LABEL_FONT_SIZE = "19px";
const INPUT_FONT_SIZE = "20px";
const BUTTON_FONT_SIZE = "24px";
const MESSAGE_FONT_SIZE = "18px";
const MODAL_WIDTH = "530px";
const MODAL_PADDING_VERTICAL = "40px";
const MODAL_PADDING_HORIZONTAL = "40px";
const CLOSE_BUTTON_FONT_SIZE = "30px";

const PALETTE = {
  BACKGROUND_MODAL: "#F6EEE3",
  PRIMARY_ACCENT_BLUE: "#2F4F8B",
  SECONDARY_ACCENT_GOLD: "#E1B85D",
  SUCCESS_GREEN: "#166D3B",
  TEXT_DARK: "#25384F",
  TEXT_MUTED: "#78909C",
  ERROR_RED: "#E57373",
  WHITE: "#FFFFFF",
  CONTOUR_COLOR: "#000000",
  BUTTON_HOVER_BLUE: "#4A6FA8",
};

const EyeIconShow = ({ color, size = SMALL_ICON_SVG_SIZE }) => (
  <svg
    viewBox="0 0 24 24"
    style={{ width: size, height: size, fill: color, display: "block" }}
  >
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
  </svg>
);

const EyeIconHide = ({ color, size = SMALL_ICON_SVG_SIZE }) => (
  <svg
    viewBox="0 0 24 24"
    style={{ width: size, height: size, fill: color, display: "block" }}
  >
    <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.75C21.27 7.61 17 4.5 12 4.5c-1.6 0-3.14.35-4.54.96l1.56 1.56C9.74 7.13 10.85 7 12 7zm-1.07 5.53l2.81 2.81c-.71.15-1.44.26-2.19.26-2.76 0-5-2.24-5-5 0-.75.11-1.48.26-2.19l2.81 2.81c.11.7.42 1.34.81 1.81zM2.71 3.27L1.44 4.54l2.02 2.02C2.03 7.95 1.16 9.77 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l1.53 1.53 1.27-1.27L2.71 3.27z" />
  </svg>
);

const InicioSesion = ({ onLogin, onClose }) => {
  const [usuario, setUsuario] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  const inputVariants = {
    focus: {
      scale: 1.01,
      boxShadow: `0 0 0 2px ${PALETTE.SECONDARY_ACCENT_GOLD}`,
      transition: { duration: 0.2 },
    },
  };

  const buttonVariants = {
    hover: {
      backgroundColor: PALETTE.BUTTON_HOVER_BLUE,
      scale: 1.02,
      transition: { duration: 0.15 },
    },
    tap: { scale: 0.98 },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const modalVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
    exit: { scale: 0.95, opacity: 0, transition: { duration: 0.2 } },
  };

  const iconVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { delay: 0.2, type: "spring", stiffness: 120 },
    },
    exit: { y: -20, opacity: 0, transition: { duration: 0.1 } },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);
    if (!usuario || !contrasenia) {
      setMensaje("Por favor, rellena todos los campos");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: usuario.trim(), contraseña: contrasenia.trim() }),
      });
      
      const data = await res.json();
      if (res.ok) {
        setMensaje("¡Sesión iniciada correctamente!");
        onLogin(data.user);  // <- usa "user" que devuelve el backend
        setTimeout(() => setIsVisible(false), 1500);
      } else {
        setMensaje(data.error || data.mensaje || "Credenciales incorrectas");
      }
    } catch {
      setMensaje("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  const onExitComplete = () => {
    if (onClose) onClose();
  };

  const labelStyle = {
    fontSize: LABEL_FONT_SIZE,
    color: PALETTE.TEXT_DARK,
    marginBottom: "10px",
    display: "block",
    textAlign: "left",
    fontWeight: 500,
    fontFamily: "'Playfair Display', serif",
  };

  const inputBaseStyle = {
    width: "100%",
    padding: "16px 18px",
    fontSize: INPUT_FONT_SIZE,
    border: `1px solid ${PALETTE.TEXT_MUTED}`,
    borderRadius: "10px",
    backgroundColor: PALETTE.WHITE,
    color: PALETTE.TEXT_DARK,
    fontFamily: "'Playfair Display', serif",
    boxSizing: "border-box",
    marginBottom: "30px",
  };

  const passwordInputStyle = {
    ...inputBaseStyle,
    paddingRight: "60px",
    marginBottom: "0",
  };

  const iconContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "40px",
    width: USER_ICON_ACTUAL_SIZE,
    height: USER_ICON_ACTUAL_SIZE,
    margin: "0 auto 40px auto",
  };

  const modalStyle = {
    backgroundColor: PALETTE.BACKGROUND_MODAL,
    borderRadius: "20px",
    width: MODAL_WIDTH,
    padding: `${MODAL_PADDING_VERTICAL} ${MODAL_PADDING_HORIZONTAL}`,
    textAlign: "center",
    fontFamily: "'Playfair Display', serif",
    boxShadow: `0 10px 30px ${PALETTE.CONTOUR_COLOR}40`,
    border: `2px solid ${PALETTE.CONTOUR_COLOR}`,
    position: "relative",
  };

  const mensajeStyle = {
    marginBottom: "30px",
    fontWeight: "bold",
    color:
      mensaje === "¡Sesión iniciada correctamente!"
        ? PALETTE.SUCCESS_GREEN
        : PALETTE.ERROR_RED,
    fontFamily: "'Playfair Display', serif",
    fontSize: MESSAGE_FONT_SIZE,
    minHeight: "30px",
  };

  const passwordInputContainerStyle = {
    position: "relative",
    width: "100%",
    marginBottom: "30px",
  };

  const passwordToggleButtonStyle = {
    position: "absolute",
    top: "50%",
    right: "20px",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: PALETTE.TEXT_MUTED,
    lineHeight: 1,
  };

  const titleStyle = {
    fontSize: TITLE_FONT_SIZE,
    fontWeight: 700,
    color: PALETTE.TEXT_DARK,
    marginBottom: "45px",
    textTransform: "uppercase",
    letterSpacing: "3px",
    fontFamily: "'Playfair Display', serif",
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "15px",
    right: "20px",
    background: "none",
    border: "none",
    fontSize: CLOSE_BUTTON_FONT_SIZE,
    cursor: "pointer",
    color: PALETTE.TEXT_MUTED,
    lineHeight: 1,
    padding: "0",
    outline: "none",
    transition: "transform 0.2s ease-in-out",
    userSelect: "none",
  };

  const submitButtonStyle = {
    width: "100%",
    padding: "18px",
    fontSize: BUTTON_FONT_SIZE,
    fontWeight: 700,
    border: "none",
    borderRadius: "10px",
    backgroundColor: PALETTE.PRIMARY_ACCENT_BLUE,
    color: PALETTE.WHITE,
    cursor: loading ? "not-allowed" : "pointer",
    textTransform: "uppercase",
    opacity: loading ? 0.8 : 1,
    fontFamily: "'Playfair Display', serif",
    marginTop: "25px",
    transition: "background-color 0.15s ease-in-out",
  };

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {isVisible && (
        <motion.div
          key="backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.65)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <motion.div
            key="modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={modalStyle}
          >
            <motion.button
              onClick={handleClose}
              whileHover={{ scale: 1.2, color: PALETTE.ERROR_RED }}
              style={closeButtonStyle}
              aria-label="Cerrar"
            >
              &times;
            </motion.button>

            <div style={iconContainerStyle}>
              <motion.div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: PALETTE.TEXT_MUTED,
                  borderRadius: "50%",
                }}
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              />
            </div>

            <h2 style={titleStyle}>Inicio de Sesión</h2>

            {mensaje && <p style={mensajeStyle}>{mensaje}</p>}

            <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
              <label htmlFor="usuario" style={labelStyle}>
                Usuario
              </label>
              <motion.input
                type="text"
                id="usuario"
                placeholder="Escribe tu usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                variants={inputVariants}
                whileFocus="focus"
                style={inputBaseStyle}
              />

              <label htmlFor="contrasenia" style={labelStyle}>
                Contraseña
              </label>
              <div style={passwordInputContainerStyle}>
                <motion.input
                  type={showPassword ? "text" : "password"}
                  id="contrasenia"
                  placeholder="Introduce tu contraseña"
                  value={contrasenia}
                  onChange={(e) => setContrasenia(e.target.value)}
                  variants={inputVariants}
                  whileFocus="focus"
                  style={passwordInputStyle}
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={passwordToggleButtonStyle}
                  whileHover={{ opacity: 0.7, scale: 1.1 }}
                  title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? (
                    <EyeIconHide color={PALETTE.TEXT_MUTED} size={SMALL_ICON_SVG_SIZE} />
                  ) : (
                    <EyeIconShow color={PALETTE.TEXT_MUTED} size={SMALL_ICON_SVG_SIZE} />
                  )}
                </motion.button>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                style={submitButtonStyle}
              >
                {loading ? "Accediendo..." : "ACCEDER"}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InicioSesion;
