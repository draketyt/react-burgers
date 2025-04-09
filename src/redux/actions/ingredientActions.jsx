export const SET_BUN = (bun) => ({
	type: "SET_BUN",
	payload: bun,
});
export const ADD_INGREDIENT = (ingredient) => ({
	type: "ADD_INGREDIENT",
	payload: ingredient,
});
export const REMOVE_INGREDIENT = (index) => ({
	type: "REMOVE_INGREDIENT",
	payload: index,
});
export const MOVE_INGREDIENT = (fromIndex,toIndex) => ({
	type: "MOVE_INGREDIENT",
	payload: { fromIndex, toIndex }
});
export const CLEAR_CART = "CLEAR_CART"
