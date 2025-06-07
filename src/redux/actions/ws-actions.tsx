import { createAction } from '@reduxjs/toolkit';

export const wsInit = createAction('WS_ALL_ORDERS_INIT');
export const wsOpen = createAction('WS_ALL_ORDERS_OPEN');
export const wsClose = createAction('WS_ALL_ORDERS_CLOSE');
export const wsError = createAction<Event>('WS_ALL_ORDERS_ERROR');
export const wsMessage = createAction<{
	orders: any[];
	total: number;
	totalToday: number;
}>('WS_ALL_ORDERS_MESSAGE');
export const wsClosed = createAction('WS_ALL_ORDERS_CLOSED');
export const wsActionsAll = {
	wsInit: wsInit.type,
	onOpen: wsOpen.type,
	wsClosed:wsClosed.type,
	onClose: wsClose.type,
	onMessage: wsMessage.type,
};