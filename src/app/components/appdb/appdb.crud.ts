import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AppDb } from 'src/app/models/AppDb';
import { AppdbService } from './appdb.service';

@Component({
  selector: 'appdb-crud',
  templateUrl: './appdb.crud.html',
  styleUrls: ['./appdb.crud.scss'],
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
export class AppDbCrud implements OnInit {
  appDbDialog: boolean = false;
  appsDb: AppDb[] = [];
  appDb: AppDb = { name: '' };
  submitted: boolean = false;

  constructor(
    private service: AppdbService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadTableData();
  }

  loadTableData() {
    this.service.findAll().subscribe((data) => (this.appsDb = data));
  }

  openNew() {
    this.appDb = { name: '' };
    this.submitted = false;
    this.appDbDialog = true;
  }

  hideDialog() {
    this.appDbDialog = false;
    this.submitted = false;
  }

  saveApp() {
    this.submitted = true;
    if (this.appDb.name.trim()) {
      if (this.appDb._id) {
        this.performUpdate();
      } else {
        this.performSave();
      }
    }
  }

  editApp(appDb: AppDb) {
    this.appDb = { ...appDb };
    this.appDbDialog = true;
  }

  deleteApp(appDb: AppDb) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${this.appDb.name} ?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.delete(appDb._id ?? '').subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: `App ${this.appDb.name} was deleted successfully`,
            life: 3000,
          });
          this.loadTableData();
        });
      },
    });
  }

  private performSave() {
    this.service.create(this.appDb).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `App ${this.appDb.name} was stored successfully`,
        life: 3000,
      });
      this.appDb = { name: '' };
      this.hideDialog();
      this.loadTableData();
    });
  }

  private performUpdate() {
    this.service.update(this.appDb).subscribe((data) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `App ${data.name} was updated successfully`,
        life: 3000,
      });
      this.appDb = { name: '' };
      this.hideDialog();
      this.loadTableData();
    });
  }
}
