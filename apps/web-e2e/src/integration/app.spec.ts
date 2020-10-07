/// <reference types="cypress" />
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/index.d.ts" />
import { getGreeting } from '../support/app.po';

describe('web', () => {
  // beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    cy.loginByAuth0Api('test@podhola.net', 'Test_54321')

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Web App');
  });
});
