import { Link } from "react-router-dom";
import styles from '../Auth.module.css';
import {
	EmailInput,
	PasswordInput,
	Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

export const RegisterPage = ({handleSubmit}) => {

	const [form, setForm] = React.useState({
		email: '',
		password: '',
		login:'',
	});

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};

	return (
		<div className={`${styles.wrapper} mt-15`}>
			<h2 className="text text_type_main-large mb-6">Регистрация</h2>
			<form onSubmit={handleSubmit} className={`${styles.form} mt-6`}>
				<EmailInput
					onChange={handleChange}
					value={form.login}
					name="login"
					placeholder="Логин"
					isIcon={false}
					extraClass="mb-6"
				/>
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
				<Button htmlType="submit" type="primary" size="large" >
					Зарегистрироваться
				</Button>
			</form>

			<div className={`${styles.links} mt-20`}>
				<p className="text text_type_main-default text_color_inactive mt-4">
					Уже зарегистрированы?{" "}
					<Link to="/login" className={styles.link}>Войти</Link>
				</p>
			</div>
		</div>
	);
};
