import ingredientsReducer, {
	fetchIngredientsRequest,
	fetchIngredientsSuccess,
	fetchIngredientsFailed,
} from './ingredientsSlice';

describe('ingredientsSlice reducer', () => {
	const items = [{ _id: '1', name: 'Мясо' }];

	it('initialState', () => {
		expect(ingredientsReducer(undefined, { type: '@@INIT' })).toEqual({
			items: [],
			isLoading: false,
			hasError: false,
		});
	});

	it('fetchIngredientsRequest', () => {
		const state = ingredientsReducer(undefined, fetchIngredientsRequest());
		expect(state).toMatchObject({ isLoading: true, hasError: false });
	});

	it('fetchIngredientsSuccess', () => {
		const state = ingredientsReducer(undefined, fetchIngredientsSuccess(items));
		expect(state).toMatchObject({ isLoading: false, items });
	});

	it('fetchIngredientsFailed', () => {
		const state = ingredientsReducer(undefined, fetchIngredientsFailed());
		expect(state).toMatchObject({ isLoading: false, hasError: true });
	});
});
