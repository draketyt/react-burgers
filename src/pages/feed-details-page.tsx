import styles from '@utils/order-detais.module.css'
import {FC, useEffect, useMemo} from "react";
import { OrderCard } from "../components/order-card";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { wsClose, wsClosed, wsInit} from "../redux/actions/ws-actions";
import { useNavigate, useLocation } from "react-router-dom";

export const OrderFeedDetailsPage: FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useAppDispatch();
	const { orders, connected } = useAppSelector(state => state.wsOrders);
	const ingredientsAll = useAppSelector(state => state.ingredients.items);
	useEffect(() => {

		dispatch(wsInit());

		return () => {
			dispatch(wsClose());
			dispatch(wsClosed());
		};
	}, [dispatch]);
	const processedOrders = useMemo(() => {
		return orders.map(order => {
			const orderIngredients = order.ingredients
				.map(id => ingredientsAll.find((ing:any) => ing._id === id))
				.filter((ing) => ing);

			const price = orderIngredients.reduce((sum, ing:any) => sum + (ing?.price || 0), 0);

			return {
				...order,
				ingredients: orderIngredients,
				price
			};
		});
	}, [orders, ingredientsAll]);
	if (!connected) return <div className={'loader'}></div>;
	if (!processedOrders.length) return <p>Заказы не найдены</p>;


	return (
		<section className={`${styles.orderList} mt-15 custom-scroll`}>

			<main className={`${styles.main} custom-scroll`}>
				<h1 className={'text text_type_main-medium'}>Лента Заказов </h1>
				{processedOrders.map(order => (
					<OrderCard
						key={order._id}
						number={order.number}
						name={order.name}
						created_at={order.createdAt}
						price={order.price}
						allIngredients={ingredientsAll}
						ingredients={order.ingredients}
						onClick={() => navigate(`${order._id}`, {state: {background: location}})}
							status={location.pathname==='/profile/orders'?order.status: ''}			/>
				))}
			</main>
			<aside className={`${styles.main1} pl-15`}>
				<div className={`${styles.orders} pb-15 `}>
					<ul className={styles.ordersDone}>
						<p className={'text text_type_main-large pb-6'}>Готовы:</p>
						<li className="text text_type_digits-default text_color_success mb-2">034533</li>
						<li className="text text_type_digits-default text_color_success mb-2">034532</li>
						<li className="text text_type_digits-default text_color_success mb-2">034530</li>
						<li className="text text_type_digits-default text_color_success mb-2">034527</li>
						<li className="text text_type_digits-default text_color_success mb-2">034525</li>
					</ul>
					<ul className={styles.ordersProcess}>
						<p className={'text text_type_main-large pb-6'}>В работе:</p>
						<li className="text text_type_digits-default mb-2">034538</li>
						<li className="text text_type_digits-default mb-2">034541</li>
						<li className="text text_type_digits-default mb-2">034542</li>
					</ul>
				</div>
				<p className={'text text_type_main-large'}>Выполнено за все время:</p>
					<p className={`${styles.allOrders} text text_type_digits-large mb-15`}>28 752</p>
				<p className={'text text_type_main-large'}>Выполнено за сегодня:</p>
				<p className={`${styles.allOrders} text text_type_digits-large `}>138</p>
			</aside>
		</section>
	);
};

