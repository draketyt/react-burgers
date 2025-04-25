import {getUser, logoutUser, updateUser} from "../redux/auth-slice";
import {useDispatch, useSelector} from "react-redux";
import {Link, NavLink, useNavigate} from "react-router-dom";
import styles from '@utils/profile-style.module.css'
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useEffect, useState} from "react";

export const ProfilePage=()=>{
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector(state => state.auth);

	const [form, setForm] = useState({
		name: "",
		email: "",
		password: ""
	});
	const [initialForm, setInitialForm] = useState(form);
	useEffect(() => {
		dispatch(getUser());
	}, [dispatch]);
	useEffect(() => {
		if (user) {
			setForm({ name: user.name, email: user.email, password:  "" });
			setInitialForm({ name: user.name, email: user.email, password:  ""});
		}
	}, [user]);
		const handleChange = e => {
		setForm( prev=>({ ...prev, [e.target.name]: e.target.value }));
	};
	const handleCancel = () => {
		setForm(initialForm);
	};

	const handleSubmit = e => {
		e.preventDefault();
		dispatch(updateUser(form));
	};
	const handleLogout = () => {
		dispatch(logoutUser())
			.unwrap()
			.then(() => navigate("/login"))
			.catch(err => console.log("Ошибка выхода:", err));
	};
	const isFormChanged =
		form.name !== initialForm.name ||
		form.email !== initialForm.email ||
		form.password !== "";

	return(
		<section className={`${styles.main} mt-25`}>
			<aside className={`${styles.sidebar} mr-15`}>
				<nav className={styles.nav}>
					<NavLink
						to="/profile-page"
						className={` ${styles.link} ${styles.active} text_type_main-large  `}
					>
						Профиль
					</NavLink>
					<NavLink
						to="/profile/orders"
						className={`${styles.link} text_type_main-large text_color_inactive`}
					>
						История заказов
					</NavLink>

				</nav>
				<button onClick={handleLogout} className={`${styles.link} ${styles.logout} text_type_main-large text_color_inactive mb-20 mt-10`}>
					Выход
				</button>
				<p className={'text_type_main-small text_color_inactive'}>
					В этом разделе вы можете {''}<br/> изменить свои персональные данные
				</p>
			</aside>
			<form className={`${styles.inputs}`} onSubmit={handleSubmit}>
				<Input
					value={form.name}
					name={'name'}
					icon="EditIcon"
					placeholder="Имя"
					onChange={handleChange}
					isIcon={true}
					extraClass="mb-6"
				/>
				<EmailInput
					value={form.email}
					onChange={handleChange}
					name={'email'}
					placeholder="e-mail"
					isIcon={true}
					extraClass="mb-6"
				/>
				<PasswordInput
					value={form.password}
					onChange={handleChange}
					name={'password'}
					placeholder="Пароль"
					icon="EditIcon"
					extraClass="mb-6"
				/>
				{	isFormChanged && (
					<div className={styles.buttonBlock}>
						<Button htmlType="submit" type="primary" size="medium">Сохранить</Button>
						<Button type="secondary" size="medium" onClick={handleCancel}>Отмена</Button>
					</div>
				)}
			</form>
		</section>

	)
}