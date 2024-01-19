import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface Props {
  message: string;
}

@Component({
  selector: 'app-alert-dialog',
  template: `
    <!-- alert-dialog.component.html -->
    <h1 mat-dialog-title style="margin: 0; padding: 10px;">Atención</h1>
    <div
      mat-dialog-content
      style="min-width: 300px; max-width: 500px; width: auto;"
    >
      <p style="margin: 10px 0;">{{ data.message }}</p>
    </div>
    <div mat-dialog-actions align="end" style="padding: 10px;">
      <button mat-button mat-dialog-close style="margin-top: 10px;">
        Cerrar
      </button>
    </div>
  `,
})
export class AlertDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Props) {}
}
