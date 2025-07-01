// websockets/socketMiddleware.ts

import { Middleware } from 'redux';

interface WSActions {
	wsInit: string;
	onOpen?: string;
	onClose?: string;
	onError?: string;
	onMessage?: string;
	wsSend?: string;
	wsClosed?: string;
}

interface SocketMiddlewareParams {
	wsUrl: string;
	wsActions: WSActions;
}

export const socketMiddleware = ({ wsUrl, wsActions }: SocketMiddlewareParams): Middleware => {
	let socket: WebSocket | null = null;
	let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
	let manualClose = false;
	return store => next => (action:any ) => {
		const { dispatch } = store;
		const {
			wsInit,
			onOpen,
			onClose,
			onError,
			onMessage,
			wsSend,
			wsClosed
		} = wsActions;

		if ((action.type === wsInit)){
			const tokenSuffix = typeof action.payload === 'string' ? action.payload : '';
			const fullUrl = wsUrl + tokenSuffix;

			socket = new WebSocket(fullUrl);

			socket.onopen = () => {
				console.log('WS OPEN:', fullUrl);
				if (onOpen) dispatch({ type: onOpen });
				if (reconnectTimer) {
					clearTimeout(reconnectTimer);
					reconnectTimer = null;
				}
			};

			socket.onerror = (event) => {
				console.error('WS ERROR:', event);
				if (onError) dispatch({ type: onError, payload: event });
			};

			socket.onmessage = (event) => {
				try {
					const data = JSON.parse(event.data);
					if (data?.message === 'Invalid or missing token') {
						console.warn('Токен недействителен');
						if (onError) dispatch({ type: onError, payload: data.message });
						socket?.close();
						return;
					}

					if (onMessage) dispatch({ type: onMessage, payload: data });
				} catch (err) {
					console.error('WS MESSAGE PARSE ERROR:', err);
				}
			};

			socket.onclose = (event) => {
				console.warn('WS CLOSED:', event);
				console.log(`WebSocket закрыт: код=${event.code}, причина=${event.reason}, wasClean=${event.wasClean}`);

				if (onClose) dispatch({ type: onClose });
				if (!manualClose) {
					if (!reconnectTimer) {
						reconnectTimer = setTimeout(() => {
							dispatch({ type: wsInit, payload: tokenSuffix });
						}, 3000);
					}
				} else {
					socket = null;
				}
				console.log(manualClose)
			};
		}

		if (action.type === wsSend && socket?.readyState === WebSocket.OPEN) {
			socket?.send(JSON.stringify({ ...action.payload }));
		}

		if (action.type === wsClosed && socket) {
			socket.close();
			socket = null;
		}

		return next(action);
	};
};
