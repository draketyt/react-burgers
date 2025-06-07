import { Middleware } from 'redux';

export const socketMiddleware = ({ wsUrl, wsActions }: any): Middleware => {
	let socket: WebSocket | null = null;
	let url = wsUrl
	return store => next =>( action:any) => {
		const { dispatch, getState } = store;
		const {
			wsInit,
			onOpen,
			onClose,
			onError,
			onMessage,
			wsSend,
			wsClosed
		} = wsActions;
		const createSocket = () => {
			socket = new WebSocket(url);

			socket.onopen = () => {
				console.log('WS OPEN');
				onOpen && dispatch({ type: onOpen });
			};

			socket.onerror = (event) => {
				console.error('WS ERROR', event);
				onError && dispatch({ type: onError, payload: event });
			};

			socket.onmessage = (event) => {
				try {
					const data = JSON.parse(event.data);
					onMessage && dispatch({ type: onMessage, payload: data });
				} catch (err) {
					console.error('WS MESSAGE PARSE ERROR', err);
				}
			};

			socket.onclose = (event) => {
				console.warn('WS CLOSED', event);
				onClose && dispatch({ type: onClose });
			};
		};
		switch (action.type) {
			case wsInit:

				if (socket !== null) {
					if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
						setTimeout(() => {
							createSocket();
						}, 150);
						return;
					}
				}
				socket = new WebSocket(url)

				socket.onopen = () => {
					console.log('WS OPEN');
					onOpen && dispatch({ type: onOpen });
				};

				socket.onerror = (event) => {
					console.error('WS ERROR', event);
					onError && dispatch({ type: onError, payload: event });
				};

				socket.onmessage = (event) => {
					try {
						const data = JSON.parse(event.data);
						onMessage && dispatch({ type: onMessage, payload: data });
					} catch (err) {
						console.error('WS MESSAGE PARSE ERROR', err);
					}
				};

				socket.onclose = (event) => {
					console.warn('WS CLOSED', event);
					onClose && dispatch({ type: onClose });
				};
				break;

			case wsSend:
				if (socket?.readyState === WebSocket.OPEN) {
					socket.send(JSON.stringify(action.payload));
				}
				break;

			case wsClosed:
				socket?.close();
				socket = null;
				break;
		}

		return next(action);
	};
};