import {AppHeader} from '../components/app-header/app-header';
import { Route,  Routes, useLocation, useNavigate,} from "react-router-dom";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {LoginPage} from "@pages/login-page";
import {HomePage} from "@pages/home-page";
import {OrderFeedCurrent} from "@pages/order-feed-current-page"
import {OrderFeedPage} from "@pages/feed-page"
import {RegisterPage} from "@pages/register-page";
import {ForgotPage} from "@pages/forgot-page";
import {ResetPage} from "@pages/reset-page";
import {NotFoundPage} from "@pages/not-found-page";
import {useEffect} from "react";
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

export const App = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const background = location.state?.background;
	useEffect(() => {
		dispatch(fetchUserData());
	}, []);
	return (
		<DndProvider backend={HTML5Backend}>
			<AppHeader />

			<Routes location={background || location}>
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
					<Route index element={<FormProfile />} />
					<Route path="orders" element={<OrderDetailsPage />} />
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
					path="/order-list"
					element={
						<OrderFeedPage/>
					}

				/>

				<Route path="*" element={<NotFoundPage />} />
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
							<Modal onClose={() => navigate(-1)}>
								<OrderHistoryPage />
							</Modal>
						}
					/>
					<Route
						path="/order-list/:id"
						element={
							<Modal onClose={() => navigate(-1)}>
								<OrderHistoryPage />
							</Modal>
						}
					/>
				</Routes>
			)}
		</DndProvider>
	);
};