import React from "react";
import { ConstructorElement, Tab, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
export const AppMain = () => {
	const [current, setCurrent] = React.useState("one");

	return (
		<main className='main' >
			<div className={'left__Panel'}>
				<p className='text text_type_main-large mb-5 mt-10 title'>Соберите бургер</p>

				<div className={'tabs mb-4'}>
					<Tab value="one" active={current === "one"} onClick={setCurrent}>
						Булки
					</Tab>
					<Tab value="two" active={current === "two"} onClick={setCurrent}>
						Соусы
					</Tab>
					<Tab value="three" active={current === "three"} onClick={setCurrent}>
						Начинки
					</Tab>
				</div>

				<div className={'ingredients pt-10'}>
					<p className={`text_type_main-large Title`}>Булки</p>
					<div className={'grid pt-6'}>
						<ConstructorElement text="Краторная булка N-200i" price={20} />
						<ConstructorElement text="Флуоресцентная булка R2-D3" price={20} />
					</div>

					<p className={`text_type_main-large title pt-10`}>Соусы</p>
					<div className={'grid pt-6'}>
						<ConstructorElement text="Соус Spicy-X" price={30} />
						<ConstructorElement text="Соус фирменный Space Sauce" price={30} />
					</div>
				</div>
			</div>

			<div className={'right__Panel mt-25 ml-10'}>
				<div className={'order__List'}>
					<ConstructorElement type="top" isLocked={true} text="Краторная булка N-200i (верх)" price={20} />
					<ConstructorElement text="Соус традиционный галактический" price={300} />
					<ConstructorElement text="Мясо бессмертных моллюсков Protostomia" price={300} />
					<ConstructorElement text="Плоды Фалленианского дерева" price={80} />
					<ConstructorElement text="Хрустящие минеральные кольца" price={80} />
					<ConstructorElement type="bottom" isLocked={true} text="Краторная булка N-200i (низ)" price={20} />
				</div>

				<div className={'order__Summary mt-10 mr-7'}>
					<div className={'price__Container mr-10'}>
						<span className="text text_type_digits-medium">610</span>
						<CurrencyIcon type="primary" />
					</div>
					<Button type="primary" size="medium" >
						Оформить заказ
					</Button>
				</div>
			</div>
		</main>
	);
};
