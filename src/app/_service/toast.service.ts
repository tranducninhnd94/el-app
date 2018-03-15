import { ToastsManager, ToastContainer, ToastOptions, Toast } from 'ng2-toastr/ng2-toastr';
import { Injectable } from '@angular/core';

@Injectable()
export class ToastService {
    constructor(public toastr: ToastsManager) {

    }

    showSuccess(message) {
        this.toastr.success(message);
    }

    showError(message) {
        this.toastr.error(message);
    }

    showWarning(message) {
        this.toastr.warning(message);
    }

    showInfo(message, options) {
        this.toastr.info(message, null, options);
    }

    showCustom() {
        this.toastr.custom('<div class="alert alert-primary" role="alert">This is a primary alert—check it out!</div>', null, { enableHTML: true, toastLife: 1000 });
    }
}