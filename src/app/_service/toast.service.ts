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

    showInfo(message) {
        this.toastr.info(message);
    }
}
