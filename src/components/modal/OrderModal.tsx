import React from 'react';
import Modal from './modal';
import { OrderDetails } from './order-details';
import {useAppSelector} from "../../redux/hooks";


const OrderModal: React.FC<OrderModalProps> = ({ orderId, onClose }) => {
	if (!orderId) return null;

	const order: Order = useAppSelector((state: any) => ({
		orderId: state.order.orderId,
		loading: state.order.loading,
	}));

	return (
		<Modal title="Детали заказа" onClose={onClose}>
			<OrderDetails order={order} />
		</Modal>
	);
};

export default OrderModal;
