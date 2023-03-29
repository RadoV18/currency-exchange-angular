import { Component } from '@angular/core';
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {

  constructor(private keycloakService: KeycloakService) { }

  redirect() {
    const roles = this.keycloakService.getUserRoles();
    if(roles.includes('ADMIN')) {
      window.location.href = '/exchanges';
    } else {
      window.location.href = '/';
    }
  }

}
