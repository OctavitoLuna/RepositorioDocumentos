import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Ajustes de tamaño para hacer el modal más pequeño
const USER_ICON_ACTUAL_SIZE = "80px";
const TITLE_FONT_SIZE = "36px";
const SMALL_ICON_SVG_SIZE = "24px";
const LABEL_FONT_SIZE = "17px";
const INPUT_FONT_SIZE = "18px";
const BUTTON_FONT_SIZE = "22px";
const MESSAGE_FONT_SIZE = "16px";
const MODAL_WIDTH = "450px"; // Ancho más pequeño
const MODAL_PADDING_VERTICAL = "30px";
const MODAL_PADDING_HORIZONTAL = "30px";
const CLOSE_BUTTON_FONT_SIZE = "50px";

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

const InicioSesion = ({ isOpen, onLogin, onClose }) => {
  // Estados para los campos del formulario
  const [usuario, setUsuario] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  // Estado para mostrar/ocultar contraseña
  const [showPassword, setShowPassword] = useState(false);
  // Estado para el indicador de carga
  const [loading, setLoading] = useState(false);
  // Estado para el mensaje de feedback al usuario
  const [mensaje, setMensaje] = useState(null);
  // Estado para el tipo de mensaje (éxito o error)
  const [mensajeTipo, setMensajeTipo] = useState(null);
  // Estado para controlar la visibilidad del modal (para animaciones)
  const [isVisible, setIsVisible] = useState(isOpen);

  // Sincroniza el estado interno `isVisible` con la prop `isOpen`
  // También resetea los campos y mensajes cuando el modal se abre
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

  // Variantes de animación para los inputs (Framer Motion)
  const inputVariants = {
    focus: {
      scale: 1.01,
      boxShadow: `0 0 0 2px ${PALETTE.SECONDARY_ACCENT_GOLD}`,
      transition: { duration: 0.2 },
    },
  };

  // Variantes de animación para los botones (Framer Motion)
  const buttonVariants = {
    hover: {
      backgroundColor: PALETTE.BUTTON_HOVER_BLUE,
      scale: 1.02,
      transition: { duration: 0.15 },
    },
    tap: { scale: 0.98 },
  };

  // Variantes de animación para el fondo del modal (Framer Motion)
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  // Variantes de animación para el modal en sí (Framer Motion)
  const modalVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
    exit: { scale: 0.95, opacity: 0, transition: { duration: 0.2 } },
  };

  // Variantes de animación para el icono de usuario (Framer Motion)
  const iconVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { delay: 0.2, type: "spring", stiffness: 120 },
    },
    exit: { y: -20, opacity: 0, transition: { duration: 0.1 } },
  };

  // Maneja el envío del formulario de login
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    setMensaje(null); // Limpia cualquier mensaje anterior
    setMensajeTipo(null); // Limpia el tipo de mensaje anterior

    // Validación básica de campos vacíos
    if (!usuario || !contrasenia) {
      setMensaje("Por favor, rellena todos los campos.");
      setMensajeTipo('error');
      return;
    }

    setLoading(true); // Activa el estado de carga
    try {
      // Realiza la petición al backend para iniciar sesión
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: usuario, contraseña: contrasenia }),
      });

      // Siempre intenta parsear la respuesta JSON, incluso si es un error
      const data = await res.json();
      console.log("Respuesta completa del backend (frontend):", data);
      console.log("Status HTTP de la respuesta (frontend):", res.status);

      // Si la respuesta HTTP es exitosa (código 2xx)
      if (res.ok) {
        setMensaje("¡Sesión iniciada correctamente!");
        setMensajeTipo('success');

        // Llama a la función `onLogin` pasada por props para manejar el éxito en el componente padre
        if (onLogin) {
            onLogin(data.user, data.token); // Pasa el objeto de usuario y el token
        }

        // Cierra el modal después de un breve retraso para que el usuario vea el mensaje de éxito
        setTimeout(() => {
          setIsVisible(false); // Inicia la animación de salida del modal
        }, 1000); // 1 segundo
      } else {
        // Si la respuesta HTTP indica un error
        const errorMessage = data.error || data.mensaje || "Error al iniciar sesión. Credenciales incorrectas.";
        setMensaje(errorMessage);
        setMensajeTipo('error');
        // El modal no se cierra automáticamente en caso de error, para que el usuario pueda corregir
      }
    } catch (error) {
      // Captura errores de red (ej. servidor no disponible, problemas de CORS)
      console.error("Error de conexión o en el fetch:", error);
      setMensaje("Error de conexión con el servidor. Intenta de nuevo más tarde.");
      setMensajeTipo('error');
    } finally {
      setLoading(false); // Desactiva el estado de carga al finalizar la operación
    }
  };

  // Maneja el cierre del modal
  const handleClose = () => {
    setIsVisible(false); // Inicia la animación de salida
  };

  // Se ejecuta cuando la animación de salida de AnimatePresence ha terminado
  const onExitComplete = () => {
    if (onClose) onClose(); // Llama a la función `onClose` del padre
  };

  // Estilos en línea para los elementos del formulario y el modal
  const labelStyle = {
    fontSize: LABEL_FONT_SIZE,
    color: PALETTE.TEXT_DARK,
    marginBottom: "8px",
    display: "block",
    textAlign: "left",
    fontWeight: 500,
    fontFamily: "'Playfair Display', serif",
  };

  const inputBaseStyle = {
    width: "100%",
    padding: "14px 16px",
    fontSize: INPUT_FONT_SIZE,
    border: `1px solid ${PALETTE.TEXT_MUTED}`,
    borderRadius: "8px",
    backgroundColor: PALETTE.WHITE,
    color: PALETTE.TEXT_DARK,
    fontFamily: "'Playfair Display', serif",
    boxSizing: "border-box",
    marginBottom: "20px",
  };

  const passwordInputStyle = {
    ...inputBaseStyle,
    paddingRight: "50px",
    marginBottom: "0",
  };

  const iconContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "30px",
    width: USER_ICON_ACTUAL_SIZE,
    height: USER_ICON_ACTUAL_SIZE,
    margin: "0 auto 30px auto",
  };

  const modalStyle = {
    backgroundColor: PALETTE.BACKGROUND_MODAL,
    borderRadius: "15px",
    width: MODAL_WIDTH,
    padding: `${MODAL_PADDING_VERTICAL} ${MODAL_PADDING_HORIZONTAL}`,
    textAlign: "center",
    fontFamily: "'Playfair Display', serif",
    boxShadow: `0 8px 20px ${PALETTE.CONTOUR_COLOR}40`,
    border: `1px solid ${PALETTE.CONTOUR_COLOR}`,
    position: "relative",
  };

  const mensajeStyle = {
    marginBottom: "20px",
    fontWeight: "bold",
    color: mensajeTipo === 'success' ? PALETTE.SUCCESS_GREEN : PALETTE.ERROR_RED,
    fontFamily: "'Playfair Display', serif",
    fontSize: MESSAGE_FONT_SIZE,
    minHeight: "25px", // Mantiene el espacio incluso si no hay mensaje
  };

  const passwordInputContainerStyle = {
    position: "relative",
    width: "100%",
    marginBottom: "20px",
  };

  const passwordToggleButtonStyle = {
    position: "absolute",
    top: "50%",
    right: "15px",
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
    marginBottom: "35px",
    textTransform: "uppercase",
    letterSpacing: "2px",
    fontFamily: "'Playfair Display', serif",
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "10px", // Ajustado para que esté un poco más bajo y no choque con el borde superior del navegador
    right: "15px",
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
    zIndex: 100001, // AUMENTADO: Asegura que esté por encima del modal y todo lo demás
  };

  const submitButtonStyle = {
    width: "100%",
    padding: "16px",
    fontSize: BUTTON_FONT_SIZE,
    fontWeight: 700,
    border: "none",
    borderRadius: "8px",
    backgroundColor: PALETTE.PRIMARY_ACCENT_BLUE,
    color: PALETTE.WHITE,
    cursor: loading ? "not-allowed" : "pointer",
    textTransform: "uppercase",
    opacity: loading ? 0.8 : 1,
    fontFamily: "'Playfair Display', serif",
    marginTop: "20px",
    transition: "background-color 0.15s ease-in-out",
  };

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {isVisible && ( // Renderiza el modal solo si `isVisible` es true
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
            zIndex: 99999, // Z-index muy alto para el fondo
          }}
        >
          <motion.div
            key="modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ ...modalStyle, zIndex: 100000 }} // Z-index aún más alto para el modal
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
