import styles from '@utils/order-detais.module.css'
import {FC, useEffect, useMemo} from "react";
import { OrderCard } from "../components/order-card";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { wsClose, wsClosed, wsInit} from "../redux/actions/ws-actions";
interface OrderFeedDetailsPageProps{
 totalPrice?:any;

}
export const OrderFeedDetailsPage:FC<OrderFeedDetailsPageProps> = ({totalPrice}): any => {
	const dispatch = useAppDispatch();
	const orderId = useAppSelector((state) => state.order.orderId);
	const order = useAppSelector((state) =>state.wsOrders.orders);
	const loading = useAppSelector((state) => state.order.loading);

	console.log('orderId from state:', orderId);
	console.log('order from state:', order);
	useEffect(() => {
		dispatch(wsInit());

		return () => {
			dispatch(wsClose());
			dispatch(wsClosed());
		};
	}, [dispatch]);

	const randomPrice:number=useMemo(():any=> {
		return (Math.floor(Math.random() * 1513 * 0.5))
	},[])
	if (loading) return <p>Загрузка...</p>;
	if (!order) return <p>Заказ не найден</p>;



	return (
		<section className={`${styles.orderList} mt-15`}>
			<main className={styles.main}>
				{order.slice(0,25).map((order:any) => (
					<OrderCard
						key={orderId}
						number={order.number}
						name={order.name}
						ingredients={order.ingredients}
						price={randomPrice}
						created_at={order.createdAt}
						status={order.status}
					/>
				))}
			</main>
		</section>
	);
};
