// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import * as jwt from "jsonwebtoken";

// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
  console.log('Custom command example: Login', email, password);
});
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("loginByAuth0Api", (username: string, password: string) => {
  cy.log(`Logging in as ${username}`);
  const client_id = Cypress.env("NX_AUTH0_CLIENTID");
  const client_secret = Cypress.env("NX_AUTH0_CLIENT_SECRET");
  const audience = Cypress.env("NX_AUTH0_AUDIENCE");
  const scope = "read:sample";
  const grant_type = 'password';

  cy.request({
    method: "POST",
    url: `https://${Cypress.env("NX_AUTH0_DOMAIN")}/oauth/token`,
    body: {
      grant_type,
      username,
      password,
      audience,
      scope,
      client_id,
      client_secret,
    },
  }).then(({ body }) => {
    console.log('*** body', body);
    window.localStorage.setItem("auth0Cypress", JSON.stringify(body));

    cy.visit("/");
  });
});
