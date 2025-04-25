import {AppHeader} from '../components/app-header/app-header';
// @ts-ignore
import {BrowserRouter,Route,Routes} from "react-router-dom";
import { useDispatch} from "react-redux";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {ProtectedRoute} from "@pages/protected-route";
import {LoginPage} from "@pages/login-page";
import {HomePage} from "@pages/home-page";
import {RegisterPage} from "@pages/register-page";
import {ForgotPage} from "@pages/forgot-page";
import {ResetPage} from "@pages/reset-page";
import {NotFoundPage} from "@pages/not-found-page";
import {useEffect} from "react";
import {fetchUserData } from "../redux/auth-slice";
import {ProfilePage} from "@pages/profile-page";


export const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchUserData ());
	}, [dispatch]);

	return (

		<BrowserRouter>
			<DndProvider backend={HTML5Backend}>
			<AppHeader></AppHeader>
				<Routes>
					<Route path='/profile' element={

						<ProfilePage/>

					}/>
					<Route path='/' element={
						<ProtectedRoute>

							<HomePage />
						</ProtectedRoute>
					} />
					<Route path='/login' element={
						<ProtectedRoute onlyUnauth>
							<LoginPage />
						</ProtectedRoute>
					} />
					<Route path='/register' element={
						<ProtectedRoute onlyUnauth>
						<RegisterPage />
					</ProtectedRoute>}/>
					<Route path='/forgot-password'  element={<ProtectedRoute onlyUnauth><ForgotPage/> </ProtectedRoute>}/>
					<Route path='/reset-password'  element={
						<ProtectedRoute fromForgot>
							<ResetPage />
						</ProtectedRoute>

						}/>
					{/*<Route path='/ingredients/:id' element={<ProtectedRoute element={<IngredientPage/>}/>}/>*/}
					<Route path='*' element={
						<ProtectedRoute>
							<NotFoundPage />
						</ProtectedRoute>
					} />

				</Routes>
		</DndProvider>
		</BrowserRouter>
	);
};
