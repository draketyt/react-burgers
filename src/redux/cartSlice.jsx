
const initialState = {
	selectedBun: null,
	selectedIngredients: [],
};

const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SET_BUN":
			return { ...state, selectedBun: action.payload};

		case "ADD_INGREDIENT":
			return { ...state, selectedIngredients: [...state.selectedIngredients, action.payload] };

		case "REMOVE_INGREDIENT": {
			const newIngredients = [...state.selectedIngredients];
			newIngredients.splice(action.payload, 1);
			return {
				...state,
				selectedIngredients: newIngredients
			};
		}

		case "CLEAR_CART":
			return { selectedBun: null, selectedIngredients: [] };
		case "MOVE_INGREDIENT": {
			const { fromIndex, toIndex } = action.payload;

			const updatedIngredients = [...state.selectedIngredients];

			if (
				fromIndex < 0 ||
				toIndex < 0 ||
				fromIndex >= updatedIngredients.length ||
				toIndex >= updatedIngredients.length
			) {
				return state;
			}

			const [movedItem] = updatedIngredients.splice(fromIndex, 1);

			updatedIngredients.splice(toIndex, 0, movedItem);

			return {
				...state,
				selectedIngredients: updatedIngredients,
			};
		}

		default:
			return state;
	}
};

export default cartReducer;


