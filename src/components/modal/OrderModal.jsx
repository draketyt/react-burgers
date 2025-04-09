import React from 'react';
import PropTypes from "prop-types";
import Modal from "./modal";
import { OrderDetails } from "./order-details";

const OrderModal = ({ orderId, onClose }) => {
	if (!orderId) return null;

	return (
		<Modal title="Детали заказа" onClose={onClose}>
			<OrderDetails orderId={orderId} />
		</Modal>
	);
};

OrderModal.propTypes = {
	orderId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onClose: PropTypes.func.isRequired,
};

export default OrderModal;
