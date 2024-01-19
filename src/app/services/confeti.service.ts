import { Injectable } from '@angular/core';
import confetti from 'canvas-confetti';

@Injectable({
  providedIn: 'root',
})
export class ConfetiService {
  lanzarConfeti(): void {
    // Crear un elemento canvas
    const canvas = document.createElement('canvas');

    // Establecer el estilo del canvas para evitar desplazamiento adicional
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none'; // Ignorar los eventos del ratón
    canvas.style.zIndex = '9999';

    // Agregar el canvas al cuerpo del documento
    document.body.appendChild(canvas);

    // Crear la instancia de confetti con el canvas específico
    const myConfetti = confetti.create(canvas, {
      resize: true,
      useWorker: true,
    });

    // Lanzar el confeti
    myConfetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    // Eliminar el canvas después de un tiempo
    setTimeout(() => {
      document.body.removeChild(canvas);
    }, 5000);
  }
}
