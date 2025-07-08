import {BASE_URL} from "../../../src/redux/auth-slice";

describe("Конструктор бургера", () => {
	const SELECTORS = {
		ingCard: '[data-cy="ingredient-card"]',
		dropTop: '[data-cy="drop-top"]',
		dropMiddle: '[data-cy="drop-middle"]',
		dropBottom: '[data-cy="drop-bottom"]',
		constructorIngredient: '[data-cy="constructor-ingredient"]',
		placeOrder: '[data-cy="place-order"]',
		orderModal: '[data-cy="order-modal"]',
		orderNumber: '[data-cy="order-number"]',
		modalClose: '[data-cy="modal-close"]',
	};

	beforeEach(() => {
		cy.intercept("GET", "https://norma.nomoreparties.space/api/ingredients", {
			fixture: "ingredients.json",
		});
		cy.intercept("POST", "https://norma.nomoreparties.space/api/orders", {
			statusCode: 200,
			body: { success: true, order: { number: 83139 } },
		}).as("createOrder");
		cy.request('POST', `${BASE_URL}/api/auth/login`, {
			email: 'lupen91102@mail.xn--ru31-o5d7cwa13zalupa715',
			password: '123456789',
		}).then((response) => {
			expect(response.status).to.eq(200);
			window.localStorage.setItem('accessToken', response.body.accessToken);
		});
		cy.visit("/");
	});

	it("должен собрать бургер и оформить заказ", () => {
		cy.get(SELECTORS.ingCard).should("have.length.at.least", 1);

		cy.get('[data-cy="ingredient-card"][data-id="643d69a5c3f7b9001cfa093c"]')
			.trigger("dragstart");
		cy.get(SELECTORS.dropTop).trigger("drop");

		cy.get('[data-cy="ingredient-card"][data-id="643d69a5c3f7b9001cfa0941"]')
			.first()
			.trigger("dragstart");
		cy.get(SELECTORS.dropMiddle).trigger("drop");


		cy.get(SELECTORS.constructorIngredient).should("have.length", 1);

		cy.get(SELECTORS.placeOrder).should("not.be.disabled").click();

		cy.wait('@createOrder',{timeout:25000})

		cy.get(SELECTORS.orderModal)
			.should("be.visible")
			.and("contain.text", "83139");

		cy.get(SELECTORS.orderModal).should('be.visible');
		cy.get(SELECTORS.modalClose).click({ force: true });
		cy.get(SELECTORS.orderModal).should('not.exist');
	});
});
