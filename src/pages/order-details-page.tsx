import React, { FC, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '@utils/order-detais.module.css';

import { OrderCard } from '../components/order-card';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { WS_PROFILE_ORDERS_INIT, WS_PROFILE_ORDERS_CLOSE} from '../redux/actions/ws-actions';
import {fetchIngredients} from "../redux/ingredientsSlice";

export const OrderDetailsPage: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const { orders, connected} = useAppSelector((state:any) => state.wsOrdersProfile);
	const ingredientsAll= useAppSelector(state => state.ingredients.items);

	useEffect(() => {

		const token = localStorage.getItem('accessToken')?.replace('Bearer ', '');
		if (token) {
			dispatch({ type: WS_PROFILE_ORDERS_INIT, payload: `?token=${token}` });
		}

		return () => {
			dispatch({ type: WS_PROFILE_ORDERS_CLOSE });
		};
	}, [dispatch]);

	const processedOrders = useMemo(() => {
		return orders.map((order: { ingredients: any[]; }) => {
			const orderIngredients = order.ingredients
				.map((id: any) => ingredientsAll.find((ing:any) => ing._id === id))
				.filter(Boolean);

			const price:number = orderIngredients.reduce((sum, ing:any) => sum + (ing?.price || 0), 0);

			return {
				...order,
				ingredients: orderIngredients,
				price
			};
		});
	}, [orders, ingredientsAll]);
	if (!connected) return <div className="loader"></div>;
	if (!processedOrders.length) return <p className="text text_type_main-medium">Нет заказов</p>;	console.log(processedOrders)

	return (
		<main className={`${styles.main} custom-scroll`}>
			<h1 className={'text text_type_main-medium mb-6'}>История заказов</h1>

			{processedOrders.map((order:any) => (
				<OrderCard
					key={order._id}
					number={order.number}
					name={order.name}
					created_at={order.createdAt}
					price={order.price}
					allIngredients={ingredientsAll}
					ingredients={order.ingredients}
					onClick={() => navigate(`${order._id}`, { state: { background: location } })}
					status={order.status}
				/>
			))}
		</main>
	);
};
