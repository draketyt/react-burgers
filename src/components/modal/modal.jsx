import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./modal-overlay";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("modals");

const Modal = ({ title, children, onClose }) => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {

		const timer = setTimeout(() => setIsVisible(true), 10);


		const handleEsc = (e) => {
			if (e.key === "Escape") {
				handleClose();
			}
		};
		document.addEventListener("keydown", handleEsc);

		return () => {
			clearTimeout(timer);
			document.removeEventListener("keydown", handleEsc);
		};
	}, []);

	const handleClose = () => {
		setIsVisible(false);
		setTimeout(onClose(),300);
	};	const closeModal = () => {
		setIsVisible(false);
		setTimeout(onClose(),300);
	};

	return ReactDOM.createPortal(
		<div className={`${styles.overlay} ${isVisible ? styles.open : styles.hidden}`} onClick={closeModal}>
			<ModalOverlay onClick={handleClose} />
			<div className={`${styles.modal} ${isVisible ? styles.open : styles.hidden}`} onClick={(e) => e.stopPropagation()}>
				<button className={styles.modal__close} onClick={handleClose}>
					<CloseIcon type="primary" />
				</button>
				{title && <h2 className="text text_type_main-large mb-4">{title}</h2>}
				{children}
			</div>
		</div>,
		modalRoot
	);
};

Modal.propTypes = {
	title: PropTypes.string,
	children: PropTypes.node.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default Modal;
