import React, {FC, useEffect, useState} from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./modal-overlay";
interface ModalProps{
	title?: string;
	children: React.ReactNode;
	onClose: () => void;
	onClick?: () => void;
}
const modalRoot:any = document.getElementById("modals");

const Modal:FC<ModalProps> = ({ title, children, onClose }) => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(():any => {
		const timer = setTimeout(():void => setIsVisible(true), 10);
		const handleEsc = (e:KeyboardEvent):void => {
			if (e.key === "Escape") {
				handleClose();
			}
		};
		document.addEventListener("keydown", handleEsc);

		return ()=> {
			clearTimeout(timer);
			document.removeEventListener("keydown", handleEsc);
		};
	}, []);

	const handleClose = ():void => {
		setIsVisible(false);
		setTimeout(():any => onClose(), 300);
	};



	return ReactDOM.createPortal(
		<div className={`${styles.overlay} ${isVisible ? styles.open : styles.hidden}`} onClick={handleClose}>
			<ModalOverlay onClose={onClose} onClick={handleClose} />
			<div className={`${styles.modal} ${isVisible ? styles.open : styles.hidden}`} onClick={(e:any):void => e.stopPropagation()}>
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



export default Modal;
