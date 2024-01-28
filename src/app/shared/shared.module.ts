
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";
import { FileUploadModule } from 'ng2-file-upload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TimeagoModule } from 'ngx-timeago';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FontAwesomeModule,
    CarouselModule,
    NgbModule,
    NgxSpinnerModule.forRoot(
      {
        type: 'pacman',
      }
    ),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    FileUploadModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    FormsModule,
    TimeagoModule.forRoot(),
  ],
  exports: [
    FontAwesomeModule,
    CarouselModule,
    NgbModule,
    ToastrModule,
    NgxSpinnerModule,
    FileUploadModule,
    ReactiveFormsModule,
    PaginationModule,
    TimeagoModule,
    FormsModule
  ],
})
export class SharedModule { }
