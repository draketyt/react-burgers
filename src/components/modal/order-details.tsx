import styles from "./modal.module.css";
import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FC} from "react";
import {useSelector} from "react-redux";
import {useAppSelector} from "../../redux/hooks";

export const OrderDetails:FC<OrderDetailsProps> = () : any=>{
	const orderId:number = useAppSelector((state) => state.order.orderId);
	const isLoading:boolean = useAppSelector((state) => state.order.loading);

	return(

	<div>

	{isLoading ? (
		<p className="text text_type_main-medium " >
			Оформляем заказ...
			<div className={'loader'} ></div>
		</p>

	):(
		<>
		<h1 className={`${styles.orderId} text_type_digits-large mt-20`}>{orderId}</h1>
			<p className="text_type_main-large">идентификатор заказа</p>
			<div className={styles['done-icon-wrapper']}>
				<div className={styles["circle-outer"]}>
					<div className={styles["circle-middle"]}>
						<div className={styles["circle-inner"]}>
							<CheckMarkIcon type="primary" />
						</div>
					 </div>
				</div>
			</div>
			<p className="text_type_main-medium mt-15">Ваш заказ начали готовить</p>
			<p className="text_type_main-small text_color_inactive mb-30">
		Дождитесь готовности на орбитальной станции
		</p>
	</>
)}
</div>
	)
}