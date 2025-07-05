import {FC, useEffect, useMemo} from "react";
import { OrderFeedCurrent } from "@pages/order-feed-current-page";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import styles from "@utils/order-detais.module.css";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {WS_PROFILE_ORDERS_INIT, wsInit} from "../redux/actions/ws-actions";

export const OrderHistoryPage: FC = () => {
	const location = useLocation();
	const isFeed = location.pathname.startsWith('/feed');
	const { orders,connected  } = useAppSelector(state =>
		isFeed ? state.wsOrders : state.wsOrdersProfile
	);
	const dispatch = useAppDispatch();
	const { id: orderId } = useParams();
	const navigate = useNavigate();
	const order = useMemo(() => {
		if (!orderId || !orders.length) return undefined;
		return orders.find((o:any) => o._id === orderId);
	}, [orders, orderId]);
	useEffect(() => {
		const token = localStorage.getItem("accessToken")?.replace("Bearer ", "");
		if (!connected) {
			if (isFeed) {
				dispatch(wsInit());
			} else if (token) {
				dispatch({ type: WS_PROFILE_ORDERS_INIT, payload: `?token=${token}` });
			}
		}
	}, [dispatch, connected, isFeed]);

	if (!orders.length) {
		return <div className={'loader'}></div>;
	}

	const handleClickVisible = (orderId: string) => {
		navigate(`/profile/orders/${orderId}`, { state: { background: location } });
	};


	console.log("order", order);

	return (
		<section className={styles.orderInfo}>

				{order ? (

					<OrderFeedCurrent
						key={order._id}
						name={order.name}
						number={order.number}
						status={order.status}
						created_at={order.createdAt}
						ingredientsIds={order.ingredients}
						onClick={handleClickVisible}
					/>

				) : (
					<p>Заказ не найден</p>
				)}

		</section>
	);
};
