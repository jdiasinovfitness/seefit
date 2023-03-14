import { MountConfig } from 'cypress/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { paths } from '../_common/spec/constants';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  const config: MountConfig<LoginComponent> = {
    imports: [RouterTestingModule, FormsModule, ReactiveFormsModule],
  };

  it('should mount', () => {
    cy.mount(LoginComponent, config);
  });

  it('should have a input of type password', () => {
    cy.mount(LoginComponent, config);
    cy.get(paths.passwordInput).should('have.attr', 'type', 'password');
  });

  it('should have a input of type email', () => {
    cy.mount(LoginComponent, config);
    cy.get(paths.loginInput).should('have.attr', 'type', 'email');
  });

  it('should have a input email with values', () => {
    cy.mount(LoginComponent, config);
    cy.get(paths.loginInput).type('username');
    cy.get(paths.loginInput).should('have.length.gte', 0);
  });
  it('should have a input password with values', () => {
    cy.mount(LoginComponent, config);
    cy.get(paths.passwordInput).type('password');
    cy.get(paths.passwordInput).should('have.length.gte', 0);
  });
});
