import React, {useMemo} from 'react';
import styles from '@utils/order-detais.module.css';
import {CurrencyIcon, FormattedDate} from '@ya.praktikum/react-developer-burger-ui-components';

interface Ingredient {
	_id: string;
	name: string;
	image: string;
	price: number;
}

interface OrderCardProps {
	number: number,
	name: string,
	ingredients: string[] | any,
	allIngredients: Ingredient[],
	price: number,
	created_at: string,
	image?: unknown,
	onClick?: () => any;
	status:any
}

export const OrderCard: React.FC<OrderCardProps> =
	({
		 number,
		 name,
		 created_at,
		 ingredients,
		 price,
		 allIngredients,
		 onClick,status
	 }) => {
		const ingredientsMap = useMemo(() => {
			const map: { [key: string]: Ingredient } = {};
			allIngredients.forEach(item => {
				map[item._id] = item;
			});
			return map;
		}, [allIngredients]);

		const ingredientObjects = ingredients

		const ingLength = ingredientObjects.length;
		const hasMore = ingLength > 5;

		return (
			<li className={styles.order_card} onClick={onClick} style={{ cursor: 'pointer' }}>
				<div className={styles.header}>
					<p className="text text_type_digits-default">#{number}</p>
					<FormattedDate className="text text_color_inactive" date={new Date(created_at)}/>
				</div>
				<h3 className={`text text_type_main-medium mt-2 ${styles.parag}`}>{name}</h3>
				<p className={'text text_type_main-default mt-2 text_color_success'}>{status}</p>

				<div className={styles.footer}>
					<div className={styles.ingredients}>
						{ingredientObjects.slice(0, 5).map((ing: any, idx: number) => (
							<div key={`${ing._id}-${idx}`}
								 style={{zIndex: 6 - idx}}
								 className={styles.ingredient_wrapper}

							>
								<img
									src={ing.image}
									alt={ing.name}
									className={styles.ingredient_img}
								/>
							</div>
						))}
						{hasMore && <div className={styles.extra}>+{ingLength - 5}</div>}
					</div>
					<div className={styles.price}>
						<span className="text_type_digits-default">{price}</span>
						<CurrencyIcon type="primary"/>
					</div>
				</div>
			</li>
		);
	};
