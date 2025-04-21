import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from '../Auth.module.css';
import {
	EmailInput,
	PasswordInput,
	Button
} from "@ya.praktikum/react-developer-burger-ui-components";

export const LoginPage = () => {
	const navigate = useNavigate();

	const [form, setForm] = React.useState({
		email: '',
		password: ''
	});

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		navigate('/');
	};

	return (
		<div className={`${styles.wrapper} mt-15`}>
			<h2 className="text text_type_main-large mb-6">Вход</h2>
			<form onSubmit={handleSubmit} className={`${styles.form} mt-6`}>
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
					Войти
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
