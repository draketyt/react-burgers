import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import './styles.css';
import {Provider} from "react-redux";
import {store } from './redux/store'
import {BrowserRouter} from "react-router-dom";
const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(
	<BrowserRouter>
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>
	</BrowserRouter>
);
