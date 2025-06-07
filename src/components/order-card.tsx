import React from 'react';
import styles from '@utils/order-detais.module.css';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

interface OrderCardProps {
    number: number,
    name: string,
    ingredients: string[],
    created_at: string,
    status?: string,
	price:number,
}

export const OrderCard: React.FC<OrderCardProps> =
    ({
         number,
         name,
         ingredients,
         price,
         created_at,
     }: OrderCardProps) => {
        return (
            <div className={styles.order_card}>
                <div className={styles.header}>
                    <p className={'text text_type_digits-default'}>#{number}</p>
                    <p className={'text text_type_digits-default'}>{created_at}</p>
                </div>
                <h3 className={` text text_type_main-medium mt-2`}>{name}</h3>
                <div className={styles.footer}>
                    <div className={styles.ingredients}>
                        {ingredients.slice(0, 5).map((img, idx) => (
                            <div
                                key={idx}
                                className={styles.ingredient_wrapper}
                                style={{zIndex: 5 - idx}}
                            >
                                <img src={img} alt="ingredient" className={styles.ingredient_img}/>
                            </div>
                        ))}
                        {ingredients.length > 5 && (
                            <div className={styles.extra}>+{ingredients.length - 5}</div>
                        )}
                    </div>
                    <div className={styles.price}>
                        <span className={'text_type_digits-default'}>{price}</span>
                        <CurrencyIcon type="primary"/>
                    </div>
                </div>
            </div>
        );
    };

