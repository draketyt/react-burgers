import {AppHeader} from '../components/app-header/app-header';
import { Route,  Routes, useLocation, useNavigate,} from "react-router-dom";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {LoginPage} from "@pages/login-page";
import {HomePage} from "@pages/home-page";
import {OrderFeedPage} from "@pages/feed-page"
import {RegisterPage} from "@pages/register-page";
import {ForgotPage} from "@pages/forgot-page";
import {ResetPage} from "@pages/reset-page";
import {NotFoundPage} from "@pages/not-found-page";
import {useEffect, useRef} from "react";
import {fetchUserData } from "../redux/auth-slice";
import {ProfilePage} from "@pages/profile-page";
import {ProtectedRoute} from "../components/protected-route";
import Modal from "../components/modal/modal";
import {IngredientDetails} from "../components/modal/ingredient-details";
import {IngredientDetailsPage} from "@pages/ingredient-page";
import {useAppDispatch} from "../redux/hooks";
import {OrderHistoryPage} from "@pages/order-history";
import {OrderDetailsPage} from "@pages/order-details-page";
import {FormProfile} from "@utils/form-profile";
import {fetchIngredients} from "../redux/ingredientsSlice";

export const App = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const background =location.state?.background
	const routesLocation = background
	// по поводу последних двух пунктов, у меня все работает
	//Не могу попасть на страницу логина через нажатие на Личный кабинет в хэдере. Этот пункт меню должен отправлять на логин, если пользователь еще не авторизован, и в личный кабинет, если уже авторизован
	// Не идет переход на ленту заказов при клике в хэдере на пункт меню
	//про эти два пункта.
	useEffect(() => {
		dispatch(fetchIngredients());
		dispatch(fetchUserData());




	}, []);
	return (
		<DndProvider backend={HTML5Backend}>
			<AppHeader />

			<Routes location={routesLocation}>
				<Route path="/" element={<HomePage />} />
				<Route path="/ingredients/:id" element={<IngredientDetailsPage />} />
				<Route
					path="/profile"
					element={
						<ProtectedRoute>
							<ProfilePage />
						</ProtectedRoute>
					}
				>
					<Route index element={
						<FormProfile />
					} />
					<Route path="orders" element={

						<OrderDetailsPage />

					} />
					<Route
						path="/profile/orders/:id"
						element={
							<ProtectedRoute>
								<OrderHistoryPage />
							</ProtectedRoute>
						}
					/>
				</Route>
				<Route
					path="/login"
					element={
							<LoginPage />
					}
				/>
				<Route
					path="/register"
					element={
						<ProtectedRoute anonymous>
							<RegisterPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/forgot-password"
					element={
						<ProtectedRoute anonymous>
							<ForgotPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/reset-password"
					element={
						<ProtectedRoute anonymous fromForgot>
							<ResetPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/feed"
					element={
						<OrderFeedPage/>
					}

				/>
				<Route
					path="/feed/:id"
					element={
						<OrderHistoryPage/>
					}

				/>

				<Route path="*" element={<NotFoundPage />} />
				<Route path="/feed/:id" element={<OrderHistoryPage />} />

			</Routes>

			{background && (
				<Routes>
					<Route
						path="/ingredients/:id"
						element={
							<Modal onClose={() => navigate(-1)}>
								<IngredientDetails />
							</Modal>
						}
					/>
					<Route
						path="/profile/orders/:id"
						element={

							<Modal onClose={() => navigate('/profile/orders')}>
								<OrderHistoryPage />
							</Modal>

						}
					/>
					<Route
						path="/feed/:id"
						element={
							<Modal onClose={() => navigate('/feed')}>
								<OrderHistoryPage />
							</Modal>
						}
					/>
				</Routes>
			)}
		</DndProvider>
	);
};