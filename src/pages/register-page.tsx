import React, { FC, FormEvent, ChangeEvent, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import {
	EmailInput,
	PasswordInput,
	Button,
	Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../Auth.module.css";
import { registerUser } from "../redux/auth-slice";
import {useAppDispatch, useAppSelector} from "../redux/hooks";

interface RegisterFormState{
	email:string ;
	password:string ;
	name:string ;

}
export const RegisterPage: FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const isLoading = useAppSelector(
		(state) => state.auth.isAuthLoading
	);

	const [form, setForm] = useState<RegisterFormState>({
		email: "",
		password: "",
		name: "",
	});

	const handleSend = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await dispatch(registerUser(form)).unwrap();
			navigate("/");
		} catch (err) {
			console.error("Ошибка регистрации:", err);
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className={`${styles.wrapper} mt-15`}>
			<h2 className="text text_type_main-large mb-6">Регистрация</h2>
			<form onSubmit={handleSend} className={`${styles.form} mt-6`}>
				<Input
					onChange={handleChange}
					value={form.name}
					name="name"
					placeholder="Имя"
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
					extraClass="mb-6"
				/>
				<Button htmlType="submit" type="primary" size="large">
					{isLoading ? "Регистрируем..." : "Зарегистрироваться"}
				</Button>
			</form>
			<div className={`${styles.links} mt-20`}>
				<p className="text text_type_main-default text_color_inactive mt-4">
					Уже зарегистрированы?{" "}
					<Link className={styles.link} to="/login">
						Войти
					</Link>
				</p>
			</div>
		</div>
	);
};
