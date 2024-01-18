import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <div class="branding">
      <a href="/" class="d-flex items-center">
        <img
          src="./assets/images/logos/dark-logo.svg"
          class="align-middle m-2 branding-logo"
          alt="logo"
        />
      </a>
      <h3>Geeks Castle</h3>
    </div>
  `,
})
export class BrandingComponent {
  constructor() {}
}
