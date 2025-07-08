export const SET_BUN = (bun:string):{type:any; payload:string} => ({
	type: "SET_BUN",
	payload: bun,
});
export const ADD_INGREDIENT = (ingredient:any) => ({
	type: "ADD_INGREDIENT",
	payload: ingredient,
});
export const REMOVE_INGREDIENT = (index:any) => ({
	type: "REMOVE_INGREDIENT",
	payload: index,
});
export const MOVE_INGREDIENT= ({fromIndex, toIndex}:any) => ({
	type: "MOVE_INGREDIENT",
	payload: { fromIndex, toIndex }
});
export const CLEAR_CART = "CLEAR_CART"
