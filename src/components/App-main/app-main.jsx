import {ConstructorElement, Tab} from "@ya.praktikum/react-developer-burger-ui-components";
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
				<div className='mt-5' style={{
					border:'2px solid red',
					width:'40%',
					height:"auto",
					textAlign:'center',

				}}>
					<ul style={{
						listStyle:'none',
						display:'flex',
						flexDirection:'column',
						gap:'8px',
						justifyContent:"center",
						textAlign:'left'
					}}>
						<p className="text text_type_main-large">Булки</p>





					</ul>
					<div className='pt-6'>1231</div>

				</div>
		</main>

		</>
	);

}