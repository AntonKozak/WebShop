
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";
import { FileUploadModule } from 'ng2-file-upload';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

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
  ],
  exports: [
    FontAwesomeModule,
    CarouselModule,
    NgbModule,
    ToastrModule,
    NgxSpinnerModule,
    FileUploadModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule { }
