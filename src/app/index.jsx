import {AppHeader} from '../components/app-header/app-header';
// @ts-ignore
import {BrowserRouter,Route,Routes} from "react-router-dom";
import {store}  from '../redux/store'
import {Provider} from "react-redux";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {ProtectedRoute} from "@pages/protected-route";
import {LoginPage} from "@pages/login-page";
import {HomePage} from "@pages/home-page";
import {RegisterPage} from "@pages/register-page";
import {ForgotPage} from "@pages/forgot-page";
import {ResetPage} from "@pages/reset-page";
import {NotFoundPage} from "@pages/not-found-page";


export const App = () => {
	return (

		<BrowserRouter>
			<DndProvider backend={HTML5Backend}>
				<Provider store={store}>
			<AppHeader></AppHeader>

				<Routes>
					<Route path='/' element={<ProtectedRoute element={<HomePage/>}/>}/>
					<Route path='/login'  element={<LoginPage/>}/>
					<Route path='/register' element={<RegisterPage/>}/>
					<Route path='/forgot-password'  element={<ForgotPage/>}/>
					<Route path='/reset-password'  element={<ResetPage/>}/>
					{/*<Route path='/ingredients/:id' element={<ProtectedRoute element={<IngredientPage/>}/>}/>*/}
					<Route path='*' element={<ProtectedRoute element={<NotFoundPage/>}/>}/>

				</Routes>


					</Provider>
		</DndProvider>
		</BrowserRouter>
	);
};
