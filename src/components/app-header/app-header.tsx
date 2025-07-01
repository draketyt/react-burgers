import {
	BurgerIcon,
	ListIcon,
	Logo,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import {Link} from "react-router-dom";
export const AppHeader = () => {
	return (
		<>
			<header

				className='header p-5'>
				<nav  className='pl-25 pt-4 pb-4 pr-25' >
					<ul className={'nav__list'}>
						<li className='nav__list-item primary pb-4 pt-4 pr-2 pl-5 '>
							<BurgerIcon type='secondary' className='icon' />
							<span className='icon-li1'>
								<Link to={'/'} className=" link text text_type_main-medium text_color_inactive">Конструктор</Link>
							</span>
						</li>

						<li className='nav__list-item secondary pb-4 pt-4 pr-2 pl-5  '>
							<ListIcon type='secondary' className='icon' />
							<span>
								<Link to={'/order-list'} className={`link text text_type_main-medium text_color_inactive`} >История Заказов</Link></span>
						</li>
						<Logo className='logo mr-25'/>


						<li className='nav__list-item secondary pb-4 pt-4 pr-2 pl-5 '>
							<ProfileIcon type='secondary' className='icon' />
							<span>
								<Link to={'profile'} className={`link text text_type_main-medium text_color_inactive`}>Личный кабинет</Link>
							</span>
						</li>
					</ul>
				</nav>
			</header>

		</>
	);
};
