import React from 'react';
import styles from './order-modal.module.css';
import { CloseIcon, CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const OrderModal = ({ orderId, isOpen, onClose }) => {
	if (!orderId) return null;

	return (
		<div className={`${styles.modal} ${!isOpen ? styles.hidden : ''}`}>
			<span className={styles.modal__close} onClick={onClose}>
				<CloseIcon type="primary" className={styles.icon} />
			</span>

			<h1 className={`${styles.orderId} text_type_digits-large mt-30`}>{orderId}</h1>
			<p className="text_type_main-large mt-30">идентификатор заказа</p>

			<div className={styles['done-icon-wrapper']}>
				<div className={styles['circle-outer']}>
					<div className={styles['circle-middle']}>
						<div className={styles['circle-inner']}>
							<CheckMarkIcon type="primary" />
						</div>
					</div>
				</div>
			</div>

			<p className="text_type_main-medium mt-15">Ваш заказ начали готовить</p>
			<p className="text_color_inactive mb-30">
				Дождитесь готовности на орбитальной станции
			</p>
		</div>
	);
};

export default OrderModal;
