import orderReducer, { clearOrder, createOrder } from './orderSlice';

describe('orderSlice reducer', () => {
	beforeEach(() => localStorage.clear());

	it('initialState', () => {
		expect(orderReducer(undefined, { type: '@@INIT' })).toEqual({
			orderId: null,
			loading: false,
			error: null,
			orderData: null,
		});
	});

	it('createOrder.pending', () => {
		const state = orderReducer(undefined, { type: createOrder.pending.type });
		expect(state).toMatchObject({ loading: true, error: null });
	});

	it('createOrder.fulfilled', () => {
		const state = orderReducer(
			undefined,
			{ type: createOrder.fulfilled.type, payload: 42 }
		);
		expect(state).toMatchObject({ loading: false, orderId: 42 });
	});

	it('createOrder.rejected', () => {
		const state = orderReducer(
			undefined,
			{ type: createOrder.rejected.type, payload: 'Network error' }
		);
		expect(state).toMatchObject({ loading: false, error: 'Network error' });
	});

	it('clearOrder', () => {
		const withOrder = { orderId: 1, loading: true, error: 'e', orderData: null };
		const state = orderReducer(withOrder, clearOrder());
		expect(state).toEqual({ orderId: null, loading: false, error: null, orderData: null });
	});
});
