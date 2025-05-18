import React, {FC} from "react";
import styles from "./modal.module.css";
import PropTypes from "prop-types";

const ModalOverlay:FC<ModalOverlayProps> = ({onClose, onClick}) => {
	return <div className={styles.overlay} onClick={onClose}></div>;
};


export default ModalOverlay;
