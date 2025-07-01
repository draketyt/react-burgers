import styles from "@utils/order-detais.module.css";
import {FC, useMemo} from "react";
import { useAppSelector} from "../redux/hooks";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";

interface OrderFeedCurrentProps {
	name: string,
	number: number,
	status: string,
	created_at: string,
	ingredientsIds: string[],
	handleClickVisible?:any;
}

export const OrderFeedCurrent: FC<OrderFeedCurrentProps> =
	({
		 name,
		 number,
		 status,
		 created_at,
		 ingredientsIds,
		 handleClickVisible
	}) => {
	const ingredientsAll = useAppSelector(state => state.ingredients.items);

	const groupedIngredients = useMemo((): any[] => {
		const countMap: Record<string, number> = {};
		ingredientsIds.forEach((id: any) => {
			countMap[id] = (countMap[id] || 0) + 1;
		});

		return Object.entries(countMap).map(([id, count]) => {
			const ingredient: any = ingredientsAll.find((item: any) => item._id === id);
			if (!ingredient) return null;

			return {
				...ingredient,
				count,
				totalPrice: ingredient.price * count,
			};
		}).filter(Boolean);
	}, [ingredientsIds, ingredientsAll]);
	const totalPrice = useMemo(() => {
		return groupedIngredients.reduce((acc, item) => acc + item.totalPrice, 0);
	}, [groupedIngredients]);
	console.log(groupedIngredients)

	return (
		<li className={styles.list} onClick={handleClickVisible}>
			<p className={'text text_type_digits-medium mb-10 '}>#{number}</p>
			<p className={'text text_type_main-large mb-3'}>{name}</p>
			<p className={'text text_type_main-default text_color_success'}>{status}</p>
			<div className={styles.sostav}>
				<p className={`text text_type_main-large text-left pb-5 `}>Cостав:</p>
			</div>
			<div className={styles.ingredientsArray}>
			{groupedIngredients.map((item: any) => (

				<li className={styles.ingredientRow} key={item._id}>
					<div className={styles.imgWrapper}>
						<img src={item.image} alt={item.name} className={styles.img}/>
					</div>

					<p className={`text text_type_main-default pr-5`}>{item.name}</p>
					<div className={styles.price}>
						<span className="text text_type_digits-default">{item.count} x {item.price}</span>
						<CurrencyIcon type="primary"/>
					</div>
				</li>

			))}
			</div>
			<footer className={`${styles.footerOrder} mt-10`}>
				<FormattedDate className="text text_color_inactive " date={new Date(created_at)}></FormattedDate>
				<p className={'text text_type_digits-default'}>{totalPrice} <CurrencyIcon type="primary"/></p>
			</footer>
		</li>
	)
}