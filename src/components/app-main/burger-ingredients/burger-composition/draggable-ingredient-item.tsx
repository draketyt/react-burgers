import React, {FC, useRef} from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const DraggableIngredientItem:FC<DraggableIngredientItemProps> = ({ ingredient, index, moveIngredient,deleteIng }) => {
	const ref = useRef(null);
	const [{ isOver }, drop] =  useDrop({
		accept: 'ingredient',
		collect: (monitor):{isOver:boolean} => ({
			isOver: monitor.isOver(),
		}),
		drop: (draggedItem:any):void => {
			if (draggedItem.index !== index) {
				moveIngredient(draggedItem.index, index);
				draggedItem.index=index
			}
		},
	});


	const [{ isDragging }, drag] = useDrag({
		type: 'ingredient',
		item: {
			id: ingredient._id,
			fromConstructor: true,
			index,
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});
	const style:any = {
		opacity: isDragging ? 0.5 : 1,
		border: isOver ? '5px dashed #4C4CFF' : 'none',
		borderRadius: '14px',
		transition: 'border 0.1s ease',
		cursor: 'grab',
		padding:'4px',
		textAlign: 'center',
	};
	drag(drop(ref));

	return (
		<li
			ref={ref}
			className="order__item"
			style={style}
		>
			<DragIcon type="primary" />
			<ConstructorElement
				text={ingredient.name}
				price={ingredient.price}
				thumbnail={ingredient.image}
				handleClose={():any => deleteIng(index)}
			/>
		</li>
	);
};

export default DraggableIngredientItem ;
