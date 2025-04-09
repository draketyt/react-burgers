import React from "react";
import styles from "./modal.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({ onClose }) => {
	return <div className={styles.overlay} onClose={onClose}></div>;
};

ModalOverlay.propTypes = {
	onClose: PropTypes.func.isRequired,
};
export default ModalOverlay;
