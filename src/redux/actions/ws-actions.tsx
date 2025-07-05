import { createAction } from '@reduxjs/toolkit';

export const WS_ORDERS_ON_OPEN = 'WS_ORDERS_ON_OPEN';
export const WS_ORDERS_ON_CLOSE = 'WS_ORDERS_ON_CLOSE';
export const WS_ORDERS_ON_ERROR = 'WS_ORDERS_ON_ERROR';
export const WS_ORDERS_ON_MESSAGE = 'WS_ORDERS_ON_MESSAGE';

export const wsInit = createAction('WS_ALL_ORDERS_INIT');
export const wsOpen = createAction('WS_ALL_ORDERS_OPEN');
export const wsClose = createAction('WS_ALL_ORDERS_CLOSE');
export const wsError = createAction<Event>('WS_ALL_ORDERS_ERROR');
export const wsMessage = createAction<{
	orders: any[];
	total: number;
	totalToday: number;
}>('WS_ALL_ORDERS_MESSAGE');
export const wsSend = createAction<{ token: string }>('WS_SEND');
export const wsClosed = createAction('WS_ALL_ORDERS_CLOSED');
export const wsActionsAll = {
	wsInit: wsInit.type,
	onOpen: wsOpen.type,
	wsClosed:wsClosed.type,
	onClose: wsClose.type,
	onMessage: wsMessage.type,
	wsSend: wsSend.type
};
export const WS_PROFILE_ORDERS_INIT = 'WS_PROFILE_ORDERS_INIT';
export const WS_PROFILE_ORDERS_SEND = 'WS_PROFILE_ORDERS_SEND';
export const WS_PROFILE_ORDERS_CLOSE = 'WS_PROFILE_ORDERS_CLOSE';

export const wsActionsProfile = {
	wsInit: WS_PROFILE_ORDERS_INIT,
	wsSend: WS_PROFILE_ORDERS_SEND,
	wsClosed: WS_PROFILE_ORDERS_CLOSE,
	onOpen: WS_ORDERS_ON_OPEN,
	onClose: WS_ORDERS_ON_CLOSE,
	onError: WS_ORDERS_ON_ERROR,
	onMessage: WS_ORDERS_ON_MESSAGE,
};