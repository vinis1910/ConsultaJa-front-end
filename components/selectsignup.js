const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#fff",
    padding: "32px 24px",
    borderRadius: "8px",
    boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
    minWidth: "280px",
    textAlign: "center",
  },
  button: {
    margin: "12px 8px 0 8px",
    padding: "10px 24px",
    borderRadius: "5px",
    border: "none",
    background: "#1976d2",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "16px",
  },
  close: {
    position: "absolute",
    top: 12,
    right: 18,
    fontSize: 22,
    background: "none",
    border: "none",
    cursor: "pointer",
  },
};

const ChooseSignupTypeModal = ({ open, onClose, onChoose }) => {
  if (!open) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={{ ...modalStyles.modal, position: "relative" }}>
        <button style={modalStyles.close} onClick={onClose} aria-label="Fechar">
          ×
        </button>
        <h2>Como deseja se cadastrar?</h2>
        <button style={modalStyles.button} onClick={() => onChoose("paciente")}>
          Paciente
        </button>
        <button style={modalStyles.button} onClick={() => onChoose("medico")}>
          Médico
        </button>
      </div>
    </div>
  );
};

export default ChooseSignupTypeModal;
