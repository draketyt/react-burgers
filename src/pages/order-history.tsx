import {FC, useEffect} from "react";
import { OrderFeedCurrent } from "@pages/order-feed-current-page";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {fetchIngredients} from "../redux/ingredientsSlice";
import {wsClose, wsClosed, wsInit} from "../redux/actions/ws-actions";
import styles from "@utils/order-detais.module.css";
import Modal from "../components/modal/modal";
import {useNavigate, useParams} from "react-router-dom";
export const OrderHistoryPage: FC = () => {
	const { orders, connected } = useAppSelector(state => state.wsOrders);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { id: orderId } = useParams();
	const order = orders.find(o => o._id === orderId);
	useEffect(() => {
		dispatch(fetchIngredients());
		dispatch(wsInit());
		return () => {
			dispatch(wsClose());
			dispatch(wsClosed());
		};
	}, [dispatch]);
	if (!connected || !orders.length) {
		return <p>Загрузка заказов...</p>;
	}
	const handleClickVisible= (orderId:any)=>{
		navigate(`/profile/orders/${orderId}`, { state: { background: location } });
	}
	const handleClose = () => {
		navigate(-1);
	};

	return (
		<>
			<Modal onClose={handleClose}>
			<section className={styles.orderInfo} >
				<ul>
					{order ? (
						<OrderFeedCurrent
							key={order._id}
							name={order.name}
							number={order.number}
							status={order.status}
							created_at={order.createdAt}
							ingredientsIds={order.ingredients}
							handleClickVisible={() => handleClickVisible(order._id)}
						/>
					) : (
						<p>Заказ не найден</p>
					)}
				</ul>
			</section>

			</Modal>
		</>
	);
};
