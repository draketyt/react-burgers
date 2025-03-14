import { clsx } from 'clsx';
import { useState } from 'react';
import s from './app.module.scss';
import reactLogo from './assets/react.svg';
import { ReactComponent as TypescriptLogo } from './assets/typescript.svg';
import { add } from '@utils/one';
import { AppHeader } from '@components/app-header/app-header';
import {AppMain} from "../components/App-main/app-main";
export const App = () => {
	return (
		<>
			<AppHeader></AppHeader>
			<AppMain></AppMain>
		</>
	);
};
