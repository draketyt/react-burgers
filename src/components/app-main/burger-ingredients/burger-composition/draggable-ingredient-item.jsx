import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const IngredientItem = ({ ingredient, index, moveIngredient }) => {
	const ref = useRef(null);

	const [{ isOver }, drop] = useDrop({
		accept: 'ingredient',
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
		hover: (draggedItem) => {

			if (!draggedItem || typeof draggedItem.index !== 'number') return;


			if (draggedItem.index !== index) {

				moveIngredient(draggedItem.index, index);
				draggedItem.index = index;
			}
		},
	});


	const [{ isDragging }, drag] = useDrag({
		type: 'ingredient',
		item: () => ({ id: ingredient._id, index}),
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	drag(drop(ref));

	return (
		<li
			ref={ref}
			className="order__item"
			style={{
				opacity: isDragging ? 0.5 : 1,
				border: isOver ? '2px solid #4C4CFF' : 'none',
				borderRadius: '8px',
				transition: 'border 0.1s ease',
			}}
		>
			<DragIcon type="primary" />
			<ConstructorElement
				text={ingredient.name}
				price={ingredient.price}
				thumbnail={ingredient.image}
			/>
		</li>
	);
};

export default IngredientItem;
