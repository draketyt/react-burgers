import { getUser, logoutUser } from "../redux/auth-slice";
import {NavLink, Outlet, useLocation, useNavigate} from "react-router-dom";
import styles from "@utils/profile-style.module.css";
import { useAppDispatch } from "../redux/hooks";
import {useEffect} from "react";
import {WS_PROFILE_ORDERS_CLOSE, WS_PROFILE_ORDERS_INIT} from "../redux/actions/ws-actions";

export const ProfilePage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const handleLogout = (): void => {
		dispatch(logoutUser())
			.unwrap()
			.then(() => navigate("/login"))
			.catch((err) => console.log("Ошибка выхода:", err));


	};

	return (
		<section className={`${styles.main} mt-25`}>
			<aside className={`${styles.sidebar} mr-15`}>
				<nav className={styles.nav}>
					<NavLink to="/profile" className={`${styles.link} text_type_main-large ${location.pathname === "/profile"?'text_color_primary':'text_color_inactive'}`}>
						Профиль
					</NavLink>
					<NavLink
						to="/profile/orders"
						className={`${styles.link} text_type_main-large ${location.pathname === "/profile/orders"?'text_color_primary':'text_color_inactive'}`}
					>
						История заказов
					</NavLink>
				</nav>
				<button
					onClick={handleLogout}
					className={`${styles.link} ${styles.logout} text_type_main-large text_color_inactive mb-20 mt-10`}
				>
					Выход
				</button>
				<p className="text_type_main-small text_color_inactive">
					В этом разделе вы можете <br/>
					{location.pathname === "/profile"
						? "Измените свои персональные данные"
						: "Просмотрите историю заказов"}
				</p>
			</aside>

			<Outlet />
		</section>
	);
};
