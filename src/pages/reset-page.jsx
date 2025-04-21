import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from '../Auth.module.css';
import {
	EmailInput,
	PasswordInput,
	Button
} from "@ya.praktikum/react-developer-burger-ui-components";

export const ResetPage = () => {
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
		navigate('/')
	};

	return (
		<div className={`${styles.wrapper} mt-25`}>
			<h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
			<form onSubmit={handleSubmit} className={`${styles.form} mt-6`}>
				<PasswordInput
					onChange={handleChange}
					value={form.password}
					name="password"
					placeholder={'Введите новый пароль'}
					extraClass="mb-6 "
				/>
				<EmailInput
					onChange={handleChange}
					value={form.email}
					name="email"
					placeholder={'Введите код из письма'}
					isIcon={false}
					extraClass="mb-6"
				/>

				<Button htmlType="submit" type="primary" size="large" extraClass={'mt-6'}>
					Сохранить
				</Button>
			</form>
			<div className={`${styles.links} mt-20`}>
				<p className="text text_type_main-default text_color_inactive mt-4">
					Вспомнили пароль?{" "}
					<Link to="/login" className={styles.link}>Войти</Link>
				</p>
			</div>
		</div>
	);
};
