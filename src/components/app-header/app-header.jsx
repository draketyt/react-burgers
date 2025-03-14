import {
	BurgerIcon,
	ListIcon,
	Logo,
	ProfileIcon,
	Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
export const AppHeader = () => {
	// @ts-ignore
	return (
		<>
			<header
				style={{
					background: '#1C1C21',
				}}
				className='p-5'>
				<nav style={{}} className='pt-4 pb-4'>
					<ul
						style={{
							textAlign:'center',
							listStyle: 'none',
							display: 'flex',
							justifyContent: 'space-between',
							flexDirection: 'row',
							gap:'8px',
							alignItems: 'center',
							textWrap: 'nowrap',
							fontWeight: '700',
						}}>
						<li className='nav__list-item primary pb-4 pt-4 pr-2 pl-5 '>
							<BurgerIcon type='primary' className='icon' />
							<span className='icon-li1'>Конструктор</span>
						</li>

						<li className='nav__list-item secondary pb-4 pt-4 pr-2 pl-5  '>
							<ListIcon type='secondary' className='icon' />
							<span>Лента заказов</span>
						</li>
						<li>
						<Logo className='logo mr-25'/>
							</li>


						<li className='nav__list-item secondary pb-4 pt-4 pr-2 pl-5 mr-20'>
							<ProfileIcon type='secondary' className='icon' />
							<span>Личный кабинет</span>
						</li>
					</ul>
				</nav>
			</header>

		</>
	);
};
