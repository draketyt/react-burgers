import {Link, useNavigate} from "react-router-dom";
import styles from '../Auth.module.css';
import {
	EmailInput,
	PasswordInput,
	Button, Input
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {useDispatch} from "react-redux";
import {registerUser} from "../redux/auth-slice";

export const RegisterPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [form, setForm] = React.useState({
		email: '',
		password: '',
		name:'',
	});
	const handleSend = (e)=>{
		e.preventDefault();
		dispatch(registerUser([form.email,form.password,form.name]))
			.unwrap()

			.then(() => navigate('/'))
			.catch((err) => console.log("Ошибка регистрации:", err));

	}

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
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
					placeholder="Логин"
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
					<Link className={styles.link} to='/login'>Войти</Link>
				</p>
			</div>
		</div>
	);
};
