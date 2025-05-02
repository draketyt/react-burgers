import React, {useEffect} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import styles from '../Auth.module.css';
import {
	EmailInput,
	PasswordInput,
	Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {verifyUser} from "../redux/auth-slice";

export const LoginPage = () => {
	const isLoading = useSelector(state => state.auth.isAuthLoading);
	const { isAuthenticated } = useSelector(state => state.auth);
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [form, setForm] = React.useState({
		email: '',
		password: ''
	});
	useEffect(() => {
		if (isAuthenticated) {
			const from = location.state?.from?.pathname || '/';
			navigate(from, { replace: true });
		}
	}, [isAuthenticated]);
	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};


	const handleLogin = (e) => {
		e.preventDefault();
		dispatch(verifyUser({ email: form.email, password: form.password }))
			.unwrap()
			.then(() => navigate('/'))
			.catch(err => console.log('Ошибка авторизации:', err));
	};

	return (
		<div className={`${styles.wrapper} mt-15`}>
			<h2 className="text text_type_main-large mb-6">Вход</h2>
			<form onSubmit={handleLogin} className={`${styles.form} mt-6`}>
				<EmailInput
					onChange={handleChange}
					value={form.email}
					name="email"
					isIcon={false}
					extraClass="mb-6"
				/>
				<PasswordInput
					onChange={handleChange}
					value={form.password}
					name="password"
					extraClass="mb-6 "
				/>
				<Button htmlType="submit" type="primary" size="large" extraClass={'mt-6'}>
					{isLoading?'Вход...':'Войти'}
				</Button>
			</form>

			<div className={`${styles.links} mt-20`}>
				<p className="text text_type_main-default text_color_inactive">
					Вы — новый пользователь?{" "}
					<Link to="/register" className={styles.link}>Зарегистрироваться</Link>
				</p>
				<p className="text text_type_main-default text_color_inactive mt-4">
					Забыли пароль?{" "}
					<Link to="/forgot-password" className={styles.link}>Восстановить пароль</Link>
				</p>
			</div>
		</div>
	);
};
