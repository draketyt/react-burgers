import {BASE_URL} from "../../../../redux/auth-slice";

describe("Конструктор бургера", {execTimeout: 90000},() => {
	beforeEach(() => {
		cy.intercept("GET", `${BASE_URL}/api/ingredients`, { fixture: `${BASE_URL}` });
		cy.intercept("POST", `${BASE_URL}/api/orders`, {
			statusCode: 200,
			body: { success: true, order: { number: 777 } },
		}).as("createOrder");

		window.localStorage.setItem("accessToken", "Bearer mocktoken");

		cy.visit("/");
	});


	it("перетаскивает ингредиенты и создает заказ", () => {

		cy.get('[data-cy="ingredient-card"]')
			.first()
			.trigger("dragstart");

		cy.get('[data-cy="drop-top"]').trigger("drop");

		cy.get('[data-cy="ingredient-card"]')
			.eq(1)
			.trigger("dragstart");

		cy.get('[data-cy="drop-middle"]').trigger("drop");

		cy.get('[data-cy="ingredient-card"]')
			.eq(2)
			.trigger("dragstart");

		cy.get('[data-cy="drop-bottom"]').trigger("drop");

		cy.get('[data-cy="constructor-ingredient"]').should("have.length", 1);

		cy.get('[data-cy="place-order"]').click();

		cy.wait("@createOrder");
		cy.exec('print cypress.config.ts',{timeout: 65000})

		cy.get('[data-cy="order-modal"]').should("exist");

		cy.screenshot("order-modal", { timeout: 60000 });

		cy.get('[data-cy="order-modal"]').contains("777 ");
		cy.get('[data-cy="modal-close"]').click();
		cy.get('[data-cy="order-modal"]').should("not.exist");
	});
});
