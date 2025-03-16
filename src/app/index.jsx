import {AppHeader} from '../components/app-header/app-header';
import {AppMain} from "../components/app-main/app-main";
import IngredientsGroup from "../components/app-main/burger-ingredients/Ingredients-group/Ingredients-group";
export const App = () => {
	return (
		<>
			<AppHeader></AppHeader>
			<AppMain>
				<IngredientsGroup></IngredientsGroup>
			</AppMain>
		</>
	);
};
