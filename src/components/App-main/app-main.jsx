import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

export const AppMain=  () =>{
	const [current, setCurrent] = React.useState('one');

	return(
		<>
			<main style={{textAlign:"left", display:'flex',alignContent:'center',justifyContent:'center', flexDirection:'column',alignItems:'center' }}>
				<h1> составь бутербродиксы</h1>
			<div style={{ display: 'flex' }}>
				<Tab value='one' active={current === 'one'} onClick={setCurrent}>
					Булки
				</Tab>
				<Tab value='two' active={current === 'two'} onClick={setCurrent}>
					Соусы
				</Tab>
				<Tab value='three' active={current === 'three'} onClick={setCurrent}>
					Начинки
				</Tab>
			</div>
				<div>
					<ul>
						<li>
						</li>
					</ul>

				</div>
		</main>

		</>
	);

}