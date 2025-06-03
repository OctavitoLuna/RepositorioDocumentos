import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Ajustes de tamaño y estilos para un modal más profesional y compacto
const USER_ICON_ACTUAL_SIZE = "80px";
const TITLE_FONT_SIZE = "38px";
const SMALL_ICON_SVG_SIZE = "24px";
const LABEL_FONT_SIZE = "17px";
const INPUT_FONT_SIZE = "18px";
const BUTTON_FONT_SIZE = "22px";
const MESSAGE_FONT_SIZE = "16px";
const MODAL_WIDTH = "450px"; // Ancho fijo para mantener la forma
const MODAL_PADDING_VERTICAL = "40px";
const MODAL_PADDING_HORIZONTAL = "40px";
const CLOSE_BUTTON_FONT_SIZE = "50px";

const PALETTE = {
  BACKGROUND_MODAL: "#FDFDFD", // Un blanco suave y moderno
  PRIMARY_ACCENT_BLUE: "#2F4F8B", // Azul profundo y elegante
  SECONDARY_ACCENT_GOLD: "#E1B85D", // Dorado vibrante para acentos
  SUCCESS_GREEN: "#28a745", // Verde estándar para éxito
  TEXT_DARK: "#25384F", // Texto oscuro principal
  TEXT_MUTED: "#78909C", // Gris para texto secundario
  ERROR_RED: "#dc3545", // Rojo estándar para errores
  WHITE: "#FFFFFF",
  CONTOUR_COLOR: "rgba(0,0,0,0.1)", // Contorno muy sutil para el modal
  BUTTON_HOVER_BLUE: "#3a5f9e", // Azul ligeramente más oscuro al hover
  BACKGROUND_OVERLAY: "rgba(0,0,0,0.6)", // Oscurece el fondo 3D sin desenfocarlo
};

// Icono de ojo para mostrar contraseña
const EyeIconShow = ({ color, size = SMALL_ICON_SVG_SIZE }) => (
  <svg
    viewBox="0 0 24 24"
    style={{ width: size, height: size, fill: color, display: "block" }}
  >
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
  </svg>
);

// Icono de ojo para ocultar contraseña
const EyeIconHide = ({ color, size = SMALL_ICON_SVG_SIZE }) => (
  <svg
    viewBox="0 0 24 24"
    style={{ width: size, height: size, fill: color, display: "block" }}
  >
    <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.75C21.27 7.61 17 4.5 12 4.5c-1.6 0-3.14.35-4.54.96l1.56 1.56C9.74 7.13 10.85 7 12 7zm-1.07 5.53l2.81 2.81c-.71.15-1.44.26-2.19.26-2.76 0-5-2.24-5-5 0-.75.11-1.48.26-2.19l2.81 2.81c.11.7.42 1.34.81 1.81zM2.71 3.27L1.44 4.54l2.02 2.02C2.03 7.95 1.16 9.77 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l1.53 1.53 1.27-1.27L2.71 3.27z" />
  </svg>
);

// Icono de usuario SVG con animaciones de Framer Motion
const UserProfessionalIcon = ({ size = USER_ICON_ACTUAL_SIZE, color = PALETTE.PRIMARY_ACCENT_BLUE }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={color}
  >
    {/* Animación para la cabeza */}
    <motion.circle
      cx="12"
      cy="7"
      r="4"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.05, duration: 0.3, ease: "easeOut" }} // Delay y duración reducidos
    />
    {/* Animación para el cuerpo */}
    <motion.path
      d="M12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.15, duration: 0.4, ease: "easeOut" }} // Delay y duración reducidos
    />
  </svg>
);

const InicioSesion = ({ isOpen, onLogin, onClose }) => {
  const [usuario, setUsuario] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [mensajeTipo, setMensajeTipo] = useState(null);
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    setIsVisible(isOpen);
    if (isOpen) {
      setUsuario("");
      setContrasenia("");
      setMensaje(null);
      setMensajeTipo(null);
      setLoading(false);
    }
  }, [isOpen]);

  // Variantes de animación para el fondo del modal (Framer Motion)
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }, // Transición más rápida
    exit: { opacity: 0, transition: { duration: 0.2 } },    // Transición más rápida
  };

  // Variantes de animación para el modal en sí (Framer Motion)
  const modalVariants = {
    hidden: { scale: 0.95, opacity: 0, y: -20 }, // Ligeramente más pequeño y menos desplazamiento
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 150, // Más rígido para una aparición más rápida
        damping: 20,    // Menos amortiguación
        when: "beforeChildren",
        staggerChildren: 0.07, // Retraso entre la animación de los hijos (más rápido)
      },
    },
    exit: { scale: 0.9, opacity: 0, y: -20, transition: { duration: 0.2 } }, // Animación de salida más rápida y pronunciada
  };

  // Variantes para los elementos dentro del modal (usando staggerChildren)
  const itemVariants = {
    hidden: { y: 15, opacity: 0 }, // Menos desplazamiento inicial
    visible: { y: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } }, // Duración reducida
  };

  // Variantes de animación para los inputs
  const inputVariants = {
    focus: {
      scale: 1.005,
      boxShadow: `0 0 0 3px ${PALETTE.SECONDARY_ACCENT_GOLD}80`,
      transition: { duration: 0.2 },
    },
  };

  // Variantes de animación para los botones
  const buttonVariants = {
    hover: {
      backgroundColor: PALETTE.BUTTON_HOVER_BLUE,
      scale: 1.01,
      transition: { duration: 0.15 },
    },
    tap: { scale: 0.99 },
  };

  // Variantes para mensajes (éxito/error)
  const messageVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);
    setMensajeTipo(null);

    if (!usuario || !contrasenia) {
      setMensaje("Por favor, rellena todos los campos.");
      setMensajeTipo('error');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: usuario, contraseña: contrasenia }),
      });

      const data = await res.json();
      console.log("Respuesta completa del backend (frontend):", data);
      console.log("Status HTTP de la respuesta (frontend):", res.status);

      if (res.ok) {
        setMensaje("¡Sesión iniciada correctamente!");
        setMensajeTipo('success');
        if (onLogin) {
          onLogin(data.user, data.token);
        }
        setTimeout(() => {
          setIsVisible(false);
        }, 1200); // Dar más tiempo para ver el mensaje de éxito
      } else {
        const errorMessage = data.error || data.mensaje || "Error al iniciar sesión. Credenciales incorrectas.";
        setMensaje(errorMessage);
        setMensajeTipo('error');
      }
    } catch (error) {
      console.error("Error de conexión o en el fetch:", error);
      setMensaje("Error de conexión con el servidor. Intenta de nuevo más tarde.");
      setMensajeTipo('error');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const onExitComplete = () => {
    if (onClose) onClose();
  };

  // --- Estilos CSS ---
  const labelStyle = {
    fontSize: LABEL_FONT_SIZE,
    color: PALETTE.TEXT_DARK,
    marginBottom: "8px",
    display: "block",
    textAlign: "left",
    fontWeight: 600,
    fontFamily: "'Playfair Display', serif",
  };

  const inputBaseStyle = {
    width: "100%",
    padding: "15px 18px",
    fontSize: INPUT_FONT_SIZE,
    border: `1px solid ${PALETTE.TEXT_MUTED}40`,
    borderRadius: "10px",
    backgroundColor: PALETTE.WHITE,
    color: PALETTE.TEXT_DARK,
    fontFamily: "'Roboto', sans-serif",
    boxSizing: "border-box",
    marginBottom: "20px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.03) inset",
  };

  const passwordInputStyle = {
    ...inputBaseStyle,
    paddingRight: "50px",
    marginBottom: "0",
  };

  const passwordInputContainerStyle = {
    position: "relative",
    width: "100%",
    marginBottom: "20px",
  };

  const passwordToggleButtonStyle = {
    position: "absolute",
    right: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: "none",
    zIndex: 2,
    color: PALETTE.TEXT_MUTED,
  };

  const iconContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "35px",
    width: USER_ICON_ACTUAL_SIZE,
    height: USER_ICON_ACTUAL_SIZE,
    margin: "0 auto 35px auto",
    backgroundColor: PALETTE.PRIMARY_ACCENT_BLUE + "20",
    borderRadius: "50%",
    boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
  };

  const modalStyle = {
    backgroundColor: PALETTE.BACKGROUND_MODAL,
    borderRadius: "20px",
    width: MODAL_WIDTH,
    padding: `${MODAL_PADDING_VERTICAL} ${MODAL_PADDING_HORIZONTAL}`,
    textAlign: "center",
    fontFamily: "'Playfair Display', serif",
    boxShadow: `0 10px 30px ${PALETTE.CONTOUR_COLOR}`,
    border: `1px solid ${PALETTE.CONTOUR_COLOR}`,
    position: "relative",
    overflow: "hidden",
  };

  const titleStyle = {
    fontSize: TITLE_FONT_SIZE,
    fontWeight: 700,
    color: PALETTE.TEXT_DARK,
    marginBottom: "40px",
    textTransform: "uppercase",
    letterSpacing: "2px",
    fontFamily: "'Playfair Display', serif",
    position: "relative",
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "15px",
    right: "15px",
    background: "none",
    border: "none",
    fontSize: CLOSE_BUTTON_FONT_SIZE,
    cursor: "pointer",
    color: PALETTE.TEXT_MUTED,
    lineHeight: 1,
    padding: "0",
    outline: "none",
    transition: "transform 0.2s ease-in-out, color 0.2s ease-in-out",
    userSelect: "none",
    zIndex: 100001,
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
    opacity: loading ? 0.9 : 1,
    fontFamily: "'Roboto', sans-serif",
    marginTop: "25px",
    transition: "background-color 0.15s ease-in-out, transform 0.1s ease-in-out",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  };

  // Estilo para el spinner
  const spinnerStyle = {
    border: "4px solid rgba(255, 255, 255, 0.3)",
    borderTop: `4px solid ${PALETTE.WHITE}`,
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    animation: "spin 1s linear infinite",
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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 99999,
          }}
        >
          {/* El overlay de color oscuro, sin blur para dejar el fondo 3D visible */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: PALETTE.BACKGROUND_OVERLAY, // Solo color oscuro
              zIndex: 0, // Debajo del modal
            }}
          ></div>

          <motion.div
            key="modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ ...modalStyle, zIndex: 100000 }}
          >
            <motion.button
              onClick={handleClose}
              whileHover={{ scale: 1.2, color: PALETTE.ERROR_RED }}
              style={closeButtonStyle}
              aria-label="Cerrar"
            >
              &times;
            </motion.button>

            {/* Agrupamos el icono y el título para una animación de entrada más cohesionada */}
            <motion.div variants={itemVariants}>
              <div style={iconContainerStyle}>
                <UserProfessionalIcon /> {/* Icono animado */}
              </div>
              <h2 style={titleStyle}>Inicio de Sesión</h2>
            </motion.div>

            <AnimatePresence mode="wait">
              {mensaje && (
                <motion.p
                  key="message"
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  style={{
                    marginBottom: "20px",
                    fontWeight: "bold",
                    color: mensajeTipo === 'success' ? PALETTE.SUCCESS_GREEN : PALETTE.ERROR_RED,
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: MESSAGE_FONT_SIZE,
                    minHeight: "25px",
                  }}
                >
                  {mensaje}
                </motion.p>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
              {/* Cada campo y su label se animan individualmente con itemVariants */}
              <motion.div variants={itemVariants}>
                <label htmlFor="usuario" style={labelStyle}>
                  Correo Electrónico
                </label>
                <motion.input
                  type="email"
                  id="usuario"
                  placeholder="Escribe tu correo electrónico"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  variants={inputVariants}
                  whileFocus="focus"
                  style={inputBaseStyle}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
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
                    whileHover={{ opacity: 0.8, scale: 1.05 }}
                    title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? (
                      <EyeIconHide color={PALETTE.TEXT_MUTED} size={SMALL_ICON_SVG_SIZE} />
                    ) : (
                      <EyeIconShow color={PALETTE.TEXT_MUTED} size={SMALL_ICON_SVG_SIZE} />
                    )}
                  </motion.button>
                </div>
              </motion.div>

              {/* El botón de acceder también se anima con itemVariants */}
              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  disabled={loading}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  style={submitButtonStyle}
                >
                  {loading ? (
                    <>
                      <motion.div
                        style={spinnerStyle}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      ACCEDIENDO...
                    </>
                  ) : (
                    "ACCEDER"
                  )}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InicioSesion;