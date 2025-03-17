import {
	BurgerIcon,
	ListIcon,
	Logo,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
export const AppHeader = () => {
	// @ts-ignore
	return (
		<>
			<header
				style={{
				}}
				className='header p-5'>
				<nav  className='pl-25 pt-4 pb-4 pr-25' >
					<ul
						style={{
							listStyle: 'none',
							display: 'flex',
							justifyContent: 'space-between',
							flexDirection: 'row',
							gap:'8px',
							alignItems: 'center',
							textWrap: 'nowrap',
						}}>
						<li className='nav__list-item primary pb-4 pt-4 pr-2 pl-5 '>
							<BurgerIcon type='primary' className='icon' />
							<span className='icon-li1'><p className="text text_type_main-medium">
Конструктор</p></span>
						</li>

						<li className='nav__list-item secondary pb-4 pt-4 pr-2 pl-5  '>
							<ListIcon type='secondary' className='icon' />
							<span><p className="text text_type_main-medium">Лента заказов</p></span>
						</li>
						<Logo className='logo mr-25' style={{flexGrow:'1'}}/>


						<li className='nav__list-item secondary pb-4 pt-4 pr-2 pl-5 mr-20'>
							<ProfileIcon type='secondary' className='icon' />
							<span><p className="text text_type_main-medium">Личный кабинет</p></span>
						</li>
					</ul>
				</nav>
			</header>

		</>
	);
};
