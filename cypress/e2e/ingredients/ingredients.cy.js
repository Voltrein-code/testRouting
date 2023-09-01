const { title } = require("process");

describe("Тестируем работу модального окна", () => {
  it("Запуск приложения", () => {
   
    cy.visit("http://localhost:3000");
    cy.location().should((location) => {
      expect(location.origin).to.eq("http://localhost:3000");
    });

    //перехватываю запрос с ингредиентами
    cy.intercept("GET", "https://norma.nomoreparties.space/api/ingredients", {
      fixture: "getIngredients.json",
    }).as("getIngredients");

    cy.get("button").contains("Оформить заказ").should("exist").as("order-btn");
    cy.get("@order-btn").should("to.be.disabled");

    // Конструктор
    cy.get('[data-test="constructor"]').as("constructor");
    cy.get('[data-test="total"]').as("total");
    // "Булка"
    cy.get('[data-test_id="643d69a5c3f7b9001cfa093d"]').as("bun");

    //Ингредиенты
    cy.get('[data-test_id="643d69a5c3f7b9001cfa0943"]').as("Sauce");
    cy.get('[data-test_id="643d69a5c3f7b9001cfa0941"]').as("main");
    cy.get('[data-test_id="643d69a5c3f7b9001cfa0945"]').as("Sauce2");
    cy.get('[data-test_id="643d69a5c3f7b9001cfa093e"]').as("main2");

    //Проверяю что конструктор пуст
    cy.get("@constructor").children().children().should("not.be.exist");

    // Перетаскиваем bun в конструктор
    cy.get("@bun").trigger("dragstart");
    cy.get("@constructor").trigger("drop");

    // Перетаскиваем Sauce в конструктор
    cy.get("@Sauce").trigger("dragstart");
    cy.get("@constructor").trigger("drop");

    // Перетаскиваем main в конструктор
    cy.get("@main").trigger("dragstart");
    cy.get("@constructor").trigger("drop");

    // Перетаскиваем Sauce2 в конструктор
    cy.get("@Sauce2").trigger("dragstart");
    cy.get("@constructor").trigger("drop");

    // Перетаскиваем main2 в конструктор
    cy.get("@main2").trigger("dragstart");
    cy.get("@constructor").trigger("drop");

    //Проверяю что конструктор не пустой
    cy.get("@constructor").children().children().should("to.be.exist");

    //Проверяем сумму заказа
    cy.get("@total").should("have.text", "3556");

    //кнопка оформления заказа
    cy.get("@order-btn").should("not.be.disabled");
    cy.get("@order-btn").click();

    //Проверяем эндпоинт после перенаправления на страницу авторизации
    cy.location().should((location) =>
      expect(location.pathname).to.eq("/login")
    );

    //Авторизовываемся
    cy.get('[data-test="loginEmaile"]').as("loginEmaile");
    cy.get('[data-test="loginPassword"]').as("loginPassword");
    cy.get('[data-test="login-form"]').as("loginForm");

    cy.get("@loginEmaile")
      .type("sh95@bk.ru") // Вводим текст в инпут
      .should("have.value", "sh95@bk.ru"); // Проверяем, что значение инпута действительно изменилось на то которое указали
    cy.get("@loginPassword")
      .type("qwerty123")
      .should("have.value", "qwerty123");

    cy.get("@loginForm").find("button").click();

    //После перехода проверяем эндпоинт и оформляем заказ
    cy.get("button").contains("Оформить заказ").should("exist").as("order-btn");

    // Перехватываем POST-запрос и возвращаем ответ из фикстуры
    cy.intercept("POST", "https://norma.nomoreparties.space/api/orders", {
      fixture: "resOrder.json",
    }).as("postOrder");

    // Выполняем действия, которые вызывают POST-запрос
    cy.get("@order-btn").click();

    // Дожидаемся завершения перехвата
    cy.wait("@postOrder").then((interception) => {
      // Получаем ответ из перехвата и проверяем его, если необходимо
      const responseBody = interception.response.body;
      // Здесь вы можете выполнить проверки на содержимое ответа
      // Пример проверки, что статус код ответа равен 200
      expect(interception.response.statusCode).to.equal(200);
      // Пример проверки, что ответ содержит определенные данные
      expect(responseBody).to.have.property("name");
      expect(responseBody).to.have.property("success");
      expect(responseBody).to.have.property("order");
    });

    // Ждем, пока запрос завершится
    cy.get('[data-test="modal"]').as("modal");
    cy.get('[data-test="order_num"]').as("orderNumber");
    cy.get('[data-test="order_title"]').as("orderTitle");
    cy.get('[data-test="order_status"]').as("orderStatus");
    cy.get('[data-test="order_text"]').as("orderText");

    cy.get("@modal").should("exist");
    cy.get("@orderNumber").should("have.text", "18492");
    cy.get("@orderTitle").should("have.text", "идентификатор заказа");
    cy.get("@modal").should(($modal) => {
      expect($modal).to.have.descendants("img");
    });
    cy.get("@orderStatus").should("have.text", "ваш заказ начали готовить");
    cy.get("@orderText").should(
      "have.text",
      "Дождитесь готовности на орбитальной станции"
    );

    //Закрытие модального окна
    cy.get('[data-test="close"]').as("close");
    cy.get("@close").click();

    //Проверяем что заказ очистился и кнопка не активна и мы перешли на главной странице
    cy.location().should((location) => expect(location.pathname).to.eq("/"));
    cy.get("@order-btn").should("to.be.disabled");
    cy.get("@total").should("have.text", "0");
    cy.get("@constructor").children().children().should("not.exist");

    //Проверяем модальные окна по клику
    cy.get("@Sauce").click("center");
    cy.get("@modal").should("exist");
    cy.location().should((location) =>
      expect(location.pathname).to.eq("/ingredients/643d69a5c3f7b9001cfa0943")
    );
    cy.get("@modal").should("contain.text", "Детали ингредиента");
    cy.get("@modal").should("contain.text", "Калории,ккал");
    cy.get("@modal").should("contain.text", "Белки, г");
    cy.get("@modal").should("contain.text", "Жиры, г");
    cy.get("@modal").should("contain.text", "Углеводы, г");

    cy.get("@modal").should("contain.text", "14");
    cy.get("@modal").should("contain.text", "50");
    cy.get("@modal").should("contain.text", "22");
    cy.get("@modal").should("contain.text", "11")
   
    //Проверяем содержится ли картинка в попапе
    cy.get("@modal").should(($modal) => {
      expect($modal).to.have.descendants("img");
    });
    cy.get("@close").click();
    cy.location().should((location) =>
    expect(location.pathname).to.eq("/")
  );
  });
});
