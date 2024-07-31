describe("테스트 연습1", () => {
  it("테스트1", () => {
    cy.visit("/");

    // cy.intercept({
    //   method: "GET",
    //   url: "http://3.38.76.39:8080/posts?page=0&size=12&sortby=latest",
    // });

    cy.get("[data-cy=ham]").should("be.visible").as("ham");
    cy.get("@ham").click();

    cy.get("[data-cy=travel]").should("be.visible").as("travel");
    cy.get("@travel").click();

    cy.url().should("include", "/travel");

    cy.get("[data-cy=남자만]").should("be.visible").as("man");
    cy.get("@man").click();
  });

  it("마이페이지 가기", () => {
    cy.visit("/mypage");

    cy.get("[data-cy=nickname]").should("be.visible").as("nickname");
    cy.get("@nickname").type("ㄴ나ㅣ러마ㅣ너리");

    cy.visit("/");
  });
});
