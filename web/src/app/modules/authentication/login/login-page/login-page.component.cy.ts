import { MountConfig } from 'cypress/angular';
import { LoginPageComponent } from './login-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { paths } from '../../_common/spec/constants';

describe('LoginPageComponent', () => {
  const config: MountConfig<LoginPageComponent> = {
    imports: [RouterTestingModule, FormsModule, ReactiveFormsModule],
  };

  it('should mount', () => {
    cy.mount(LoginPageComponent, config);
  });

  it('should have a input of type password', () => {
    cy.mount(LoginPageComponent, config);
    cy.get(paths.passwordInput).should('have.attr', 'type', 'password');
  });

  it('should have a input of type email', () => {
    cy.mount(LoginPageComponent, config);
    cy.get(paths.loginInput).should('have.attr', 'type', 'email');
  });

  it('should have a input email with values', () => {
    cy.mount(LoginPageComponent, config);
    cy.get(paths.loginInput).type('username');
    cy.get(paths.loginInput).should('have.length.gte', 0);

  });
  it('should have a input password with values', () => {
    cy.mount(LoginPageComponent, config);
    cy.get(paths.passwordInput).type('password');
    cy.get(paths.passwordInput).should('have.length.gte', 0);
  });
});
