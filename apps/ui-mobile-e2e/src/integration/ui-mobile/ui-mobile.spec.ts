describe('ui-mobile: UiMobile component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=uimobile--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to ui-mobile!');
  });
});
