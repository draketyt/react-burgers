import styles from "@utils/profile-style.module.css";
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getUser, updateUser } from "../redux/auth-slice";

interface ProfileFormState {
	email: string;
	password: string;
	name: string;
}

export const FormProfile = () => {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.auth);

	const [form, setForm] = useState<ProfileFormState>({
		name: "",
		email: "",
		password: "",
	});

	const [initialForm, setInitialForm] = useState<ProfileFormState>({
		name: "",
		email: "",
		password: "",
	});

	useEffect(() => {
		dispatch(getUser());
	}, [dispatch]);

	useEffect(() => {
		if (user) {
			const updatedForm = {
				name: user.name,
				email: user.email,
				password: "",
			};
			setForm(updatedForm);
			setInitialForm(updatedForm);
		}
	}, [user]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleCancel = (): void => {
		setForm(initialForm);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		dispatch(updateUser(form));
	};

	const isFormChanged: boolean =
		form.name !== initialForm.name ||
		form.email !== initialForm.email ||
		form.password !== "";

	return (
		<form className={styles.inputs} onSubmit={handleSubmit}>
			<Input
				value={form.name}
				name="name"
				icon="EditIcon"
				placeholder="Имя"
				onChange={handleChange}
				extraClass="mb-6"
			/>
			<EmailInput
				value={form.email}
				onChange={handleChange}
				name="email"
				placeholder="e-mail"
				isIcon={true}
				extraClass="mb-6"
			/>
			<PasswordInput
				value={form.password}
				onChange={handleChange}
				name="password"
				placeholder="Пароль"
				icon="EditIcon"
				extraClass="mb-6"
			/>
			{isFormChanged && (
				<div className={styles.buttonBlock}>
					<Button htmlType="submit" type="primary" size="medium">
						Сохранить
					</Button>
					<Button htmlType="button" type="secondary" size="medium" onClick={handleCancel}>
						Отмена
					</Button>
				</div>
			)}
		</form>
	);
};
