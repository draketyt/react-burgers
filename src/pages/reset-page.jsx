import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from '../Auth.module.css';
import {
	PasswordInput,
	Button, Input
} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {resetPassword} from "../redux/auth-slice";

export const ResetPage = () => {
	const isLoading = useSelector(state => state.auth.isAuthLoading);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [form, setForm] = React.useState({
		password: '',
		token: ''
	});

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const result = await dispatch(resetPassword(form));
		if (resetPassword.fulfilled.match(result)) {
			navigate('/login', { replace: true });
		} else {
			alert(result.payload || "Ошибка при сбросе пароля");
		}
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
				<Input
					onChange={handleChange}
					value={form.token}
					name="token"
					placeholder={'Введите код из письма'}
					isIcon={false}
					extraClass="mb-6"
				/>

				<Button htmlType="submit" type="primary" size="large" extraClass={'mt-6'}>
					{isLoading? 'Сравниваем код...':'Сохранить'}
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
