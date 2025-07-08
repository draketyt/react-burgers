import React, {FC,  useMemo, useRef, useState} from "react";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientsTabs } from "./ingredientsTabs";
import {useDrag} from "react-dnd";
import {Location, NavigateFunction, useLocation, useNavigate} from "react-router-dom";
import {useAppSelector} from "../../../../redux/hooks";



export const IngredientItem:FC<IngredientItemProps> = ({ image, price, name, ingredient }) => {
	const selectedBun:any = useAppSelector((state) => state.cart.selectedBun);
	const selectedIngredients:any = useAppSelector((state) => state.cart.selectedIngredients);
	const navigate:NavigateFunction = useNavigate();
	const location:Location = useLocation();

	const count:number = selectedIngredients.filter((item:any):boolean => item._id === ingredient._id).length;
	const isBunSelected:boolean = selectedBun && selectedBun._id === ingredient._id;
	const bunCount:boolean|number = isBunSelected ? 2 : 0;

	const handleClick:any= ():any => {
		navigate(`/ingredients/${ingredient._id}`, { state: { background: location } });
	};

	const [{ isDragging }, drag] = useDrag({
		type: "ingredient",
		item: { id: ingredient._id, type: ingredient.type },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	return (
		<div
			data-cy="ingredient-card"
			ref={drag}
			className={`ingredient-item ml-5 p-4 ${isDragging ? "dragging" : ""}`}
			draggable
			data-id={ingredient._id}
			onClick={handleClick}
		>
			<div>
				{(count > 0 || bunCount > 0) && (
					<Counter
						count={count + bunCount}
						size={count < 10 ? "default" : "small"}
						extraClass="m-1 counter"
					/>
				)}
				<img className="ingredient-image" src={image} alt={name} />
			</div>
			<div className="ingredient-price">
				<span className="text text_type_digits-medium pt-4">{price}</span>
				<CurrencyIcon type="primary" />
			</div>
			<p className="text_type_main-medium title-name">{name}</p>
		</div>
	);
};
export const IngredientsList:FC<IngredientsListProps> = ({onIngredientClick }:IngredientsListProps) => {
	const { items: ingredients, isLoading, hasError } = useAppSelector((state) => state.ingredients);
	const [activeTab, setActiveTab] = useState("one");


	const containerRef:any = useRef(null);
	const sectionRefs:any = {
		one: useRef(null),
		two: useRef(null),
		three: useRef(null),
	};
	const onScroll:any = ():void => {
		if (!containerRef.current) return;

		const containerTop:any = containerRef.current.getBoundingClientRect().top + 100;

		let closestTab:string = "one";
		let minDistance:number = Infinity;
		for (const tab in sectionRefs) {
			const ref:any = sectionRefs[tab];
			if (!ref.current) continue;

			const distance:number = Math.abs(ref.current.getBoundingClientRect().top - containerTop);
			if (distance < minDistance) {
				minDistance= distance
				closestTab = tab
			}
		}

		setActiveTab(closestTab);
	};


	const buns:any=  useMemo(():any=>ingredients.filter((item:any):boolean => item.type === "bun"),[ingredients]);
	const sauces:any = useMemo(():any=>ingredients.filter((item:any):boolean => item.type === "sauce"),[ingredients]);
	const mains:any = useMemo(():any=>ingredients.filter((item:any):boolean => item.type === "main"),[ingredients])
	if (isLoading) {
		return <div className="loader" />;
	}

	if (hasError) {
		return <p className="text text_type_main-medium mt-10">Ошибка загрузки. Попробуйте позже.</p>;
	}
	return (

		<>
			<IngredientsTabs activeTab={activeTab} setActiveTab={setActiveTab} onIngredientClick={undefined} />
			<div className="ingredients custom-scroll"  ref={containerRef} onScroll={onScroll}>
				<div id="buns" ref={sectionRefs.one}  className="ingredients pt-10">
					<p className="text_type_main-large title">Булки</p>
					<div className="grid pt-6">
						<ul className="ingredient-items custom-scroll">
							{buns.map((item:any):any => (
								<li key={item._id}>
								<IngredientItem
									image={item.image_large} price={item.price} name={item.name}
												ingredient={item} 		onIngredientClick={onIngredientClick}

								/>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div id="sauces" ref={sectionRefs.two} className="ingredients pt-10" >
					<p className="text_type_main-large title">Соусы</p>
					<div className="grid pt-6">
						<ul className="ingredient-items custom-scroll">
							{sauces.map((item:any):any => (
								<li key={item._id}>
									<IngredientItem image={item.image_large} price={item.price} name={item.name}
													ingredient={item} 		onIngredientClick={onIngredientClick}

									/>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div id="mains" ref={sectionRefs.three} className="ingredients pt-10">
					<p className="text_type_main-large title">Начинки</p>
					<div className="grid pt-6">
						<ul className="ingredient-items custom-scroll">
							{mains.map((item:any):any=> (
								<li key={item._id}>
									<IngredientItem image={item.image_large} price={item.price} name={item.name}
													ingredient={item} 		onIngredientClick={onIngredientClick}

									/>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};

