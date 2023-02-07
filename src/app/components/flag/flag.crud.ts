import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Flag } from 'src/app/models/Flag';
import { FlagService } from './flag.service';

@Component({
  selector: 'flag-crud',
  templateUrl: './flag.crud.html',
  styleUrls: ['./flag.crud.scss'],
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
  providers: [MessageService, ConfirmationService],
})
export class FlagCrud implements OnInit {
  initialFlagState = { name: '', app: { name: '' }, value: false };
  dialog: boolean = false;
  flags: Flag[] = [];
  flag: Flag = this.initialFlagState;
  submitted: boolean = false;

  constructor(
    private service: FlagService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadTableData();
  }

  loadTableData() {
    this.service.findAll(true).subscribe((data) => (this.flags = data));
  }

  openNew() {
    this.flag = this.initialFlagState;
    this.submitted = false;
    this.dialog = true;
  }

  hideDialog() {
    this.dialog = false;
    this.submitted = false;
  }

  saveFlag() {
    this.submitted = true;
    if (this.flag.name.trim()) {
      if (this.flag._id) {
        this.performUpdate();
      } else {
        this.performSave();
      }
    }
  }

  editFlag(flag: Flag) {
    this.flag = { ...flag };
    this.dialog = true;
  }

  deleteFlag(flag: Flag) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${this.flag.name} ?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.delete(flag._id ?? '').subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: `Flag ${this.flag.name} was deleted successfully`,
            life: 3000,
          });
          this.loadTableData();
        });
      },
    });
  }

  private performSave() {
    this.service.create(this.flag).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Flag ${this.flag.name} was stored successfully`,
        life: 3000,
      });
      this.flag = this.initialFlagState;
      this.hideDialog();
      this.loadTableData();
    });
  }

  private performUpdate() {
    this.service.update(this.flag).subscribe((data) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Flag ${data.name} was updated successfully`,
        life: 3000,
      });
      this.flag = this.initialFlagState;
      this.hideDialog();
      this.loadTableData();
    });
  }
}
