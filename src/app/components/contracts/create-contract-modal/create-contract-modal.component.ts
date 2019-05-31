import {Component, OnInit} from '@angular/core';
import {ModalRef} from 'fundamental-ngx';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-create-contract-modal',
    templateUrl: './create-contract-modal.component.html',
    styleUrls: ['./create-contract-modal.component.scss']
})
export class CreateContractModalComponent implements OnInit {

    editMode = false;

    contractForm = new FormGroup({
        company: new FormControl('', [Validators.required]),
        contact: new FormControl('', [Validators.required]),
        date_signed: new FormControl('', [Validators.required]),
        type: new FormControl('', [Validators.required]),
        value: new FormControl('', [Validators.required]),
        status: new FormControl('', [Validators.required]),
    });

    selectedDay = {
        date: null
    };

    constructor(public modalRef: ModalRef) {
    }

    ngOnInit() {
        this.editMode = this.modalRef.data.editMode;
        const contract = this.modalRef.data.contract;

        if (this.editMode && contract) {
            Object.keys(contract).forEach(key => {
                if (key === 'date_signed') {
                    this.selectedDay.date = contract[key];
                }
                if (this.contractForm.controls[key]) {
                    this.contractForm.controls[key].setValue(contract[key]);
                }
            });
        }
    }

    submitForm(): void {
        const tmpObj = this.contractForm.getRawValue();
        tmpObj.date_signed = tmpObj.date_signed.date;
        this.modalRef.close(tmpObj);
    }

    printForm(): void {
        console.log(this.contractForm);
    }

}
