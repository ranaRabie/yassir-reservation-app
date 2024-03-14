import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

When("I visit duckduckgo.com", () => {
  cy.visit("https://www.duckduckgo.com");
});

Then("I should see a search bar", () => {
  cy.get("input").should(
    "have.attr",
    "placeholder",
    "Search without being tracked"
  );
});

When("User is in the reservation list section", () => {
  cy.visit("/");
});

Then("List of reservations for upcoming days are displayed", () => {
  cy.get("#reservation-list").should('exist');
  cy.get("#reservation-list tbody").find("tr").should("have.length", 20);
});

When("User click on show filters button", () => {
  cy.get("#toggle-filters").click();
});

When("User filters by date, status, shift and area", () => {
  cy.get("#dateFormControlSelect").type("2018-08-06");
  cy.get("#shiftFormControlSelect").select("BREAKFAST")
  cy.get("#statusFormControlSelect").select("CHECKED OUT");
  cy.get("#areaFormControlSelect").select("BAR");
  cy.get("button").contains("submit").click();
});

Then("List of reservations is updated based on the filters selected", () => {
  cy.get("#reservation-list tbody").find("tr").should("have.length", 1);
});

When("User searches by name and surname of the reservation", () => {
  cy.get("#fNameFormControlSelect").type("Yuri");
  cy.get("#lNameFormControlSelect").type("Burchell");
  cy.get("button").contains("submit").click();
});

Then("Displays the results for the specified name and surname in the list", () => {
  cy.get("#reservation-list tbody tr").find("td").eq(1).should('contain.text', "Yuri");
  cy.get("#reservation-list tbody tr").find("td").eq(2).should('contain.text', "Burchell");
});

When("User clicks on a field to sort", () => {
  cy.get("#sort-id").click();
});

Then("List of reservations is updated based on the sorting applied", () => {
  cy.get("#reservation-list tbody tr").find("td").eq(0).should('contain.text', "20");
});

Then("User should see the filters section", () => {
  cy.get("#filters-section").should('be.exist');
});

Then("User should not see the filters section", () => {
  cy.get("#filters-section").should("not.exist");
});

When("User searches by wrong name and wrong surname of the reservation", () => {
  cy.get("#fNameFormControlSelect").type("ABC");
  cy.get("#lNameFormControlSelect").type("XYZ");
  cy.get("button").contains("submit").click();
});

Then("User should see no data section", () => {
  cy.get(".no-data-card").should("exist");
});
