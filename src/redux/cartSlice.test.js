import cartReducer from './cartSlice';

describe('cartReducer', () => {
	const bun   = { id: 'bun1',   name: 'Булка'  };
	const ingA  = { id: 'ingA',   name: 'Салат'  };
	const ingB  = { id: 'ingB',   name: 'Сыр'    };

	it('initialState', () => {
		expect(cartReducer(undefined, { type: '@@INIT' })).toEqual({
			selectedBun: null,
			selectedIngredients: [],
		});
	});

	it('SET_BUN', () => {
		const state = cartReducer(undefined, { type: 'SET_BUN', payload: bun });
		expect(state.selectedBun).toEqual(bun);
	});

	it('ADD_INGREDIENT', () => {
		const state = cartReducer(undefined, { type: 'ADD_INGREDIENT', payload: ingA });
		expect(state.selectedIngredients).toEqual([ingA]);
	});

	it('REMOVE_INGREDIENT', () => {
		const start = { selectedBun: null, selectedIngredients: [ingA, ingB] };
		const state = cartReducer(start, { type: 'REMOVE_INGREDIENT', payload: 0 });
		expect(state.selectedIngredients).toEqual([ingB]);
	});

	it('MOVE_INGREDIENT', () => {
		const start = { selectedBun: null, selectedIngredients: [ingA, ingB] };
		const state = cartReducer(start, {
			type: 'MOVE_INGREDIENT',
			payload: { fromIndex: 0, toIndex: 1 },
		});
		expect(state.selectedIngredients).toEqual([ingB, ingA]);
	});

	it('CLEAR_CART', () => {
		const start = { selectedBun: bun, selectedIngredients: [ingA] };
		const state = cartReducer(start, { type: 'CLEAR_CART' });
		expect(state).toEqual({ selectedBun: null, selectedIngredients: [] });
	});
});
