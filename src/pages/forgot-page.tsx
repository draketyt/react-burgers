import React, {FC, ChangeEvent, useState, FormEvent} from "react";
import { Link, useNavigate } from "react-router-dom";
import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../Auth.module.css";
import { forgotPassword } from "../redux/auth-slice";
import {useAppDispatch, useAppSelector} from "../redux/hooks";

export const ForgotPage: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [form, setForm] = useState<{ email: string }>({ email: "" });

	const isLoading = useAppSelector((state) => state.auth.isAuthLoading);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async ( e:FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const resultAction = await dispatch(forgotPassword(form.email));
		if (forgotPassword.fulfilled.match(resultAction)) {
			navigate("/reset-password", { state: { from: "forgot-password" } });
		} else {
			alert((resultAction as any).payload || "Что-то пошло не так");
		}
	};

	return (
		<div className={`${styles.wrapper} mt-15`}>
			<h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
			<form onSubmit={handleSubmit} className={`${styles.form} mt-6`}>
				<EmailInput
					onChange={handleChange}
					value={form.email}
					name="email"
					placeholder="Укажите e-mail"
					isIcon={false}
					extraClass="mb-6"
				/>
				<Button htmlType="submit" type="primary" size="large" extraClass="mt-6">
					{isLoading ? "Загрузка..." : "Восстановить"}
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
