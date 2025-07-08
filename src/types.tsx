//OrderModal

interface OrderModalProps {
	orderId: string | number | null | undefined;
	order: {
		orderId: string | number;
		loading: boolean;
	} | null;
	onClose: () => void;
	isLoading: boolean;
}

interface OrderDetailsProps {

	order: {
		orderId: string | number;
		loading: boolean;
	};
}

interface Order {
	orderId: string | number;
	loading: boolean;
}

//BurgerComp
interface BurgerCompProps {
	setIsModalOpen: boolean | any;
	isAuthenticated: boolean;
	createOrder: any;
	i: any;

}

//ProtectedRoute
interface ProtectedRouteProps {
	children?: Node | any;
	anonymous?: boolean;
	redirectTo?: string;
	fromForgot?: boolean;

}

//DraggableIngredientItemProps
interface DraggableIngredientItemProps {
	ingredient: {
		_id: string;
		name: string;
		price: number;
		image: string;
	};
	index: number;
	moveIngredient: Function;
	deleteIng: Function;
}

interface IngredientsProps {
	onIngredientClick: any;
	activeTab: any;
	setActiveTab: any;
}

interface IngredientItemProps {
	image: string;
	price: number;
	name: string;
	ingredient: {
		_id: string;
		name: string;
		type: string;
		proteins: number;
		fat: number;
		carbohydrates: number;
		calories: number;
		price: number;
		image: string;
		image_large: string;
		image_mobile: string;
	};
	onIngredientClick: any

}

interface IngredientsListProps {
	onIngredientClick: any;
}

interface IngredientDetails {
	ingredient?: object;
	propIngredient?: any;
	ingredientId?: string;
}

type IngredientDetailsTypes = {
	ingredients: any
	state: any;
	ingredient: any;
	item: any;
}

interface IngredientModalProps {
	onClose: any;
	ingredientId: string;

}

interface ModalOverlayProps {
	onClose: () => void,
	onClick?: () => void
}
interface IUser {
	email: string;
	name: string;
}


