import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  async presentToast({
    message,
    position = 'bottom',
    duration = 2000,
  }: {
    message: string;
    position?: 'top' | 'middle' | 'bottom';
    duration?: number | undefined;
  }) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: position,
    });
    await toast.present();
  }
}
