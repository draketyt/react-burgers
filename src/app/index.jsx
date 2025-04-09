import {AppHeader} from '../components/app-header/app-header';
// @ts-ignore
import { AppMain } from "../components/App-main/app-main";

import {store}  from '../redux/store'
import {Provider} from "react-redux";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";


export const App = () => {
	return (
		<> <DndProvider backend={HTML5Backend}>
				<Provider store={store}>
			<AppHeader></AppHeader>
			<AppMain>
			</AppMain>
					</Provider>
		</DndProvider>
		</>
	);
};
