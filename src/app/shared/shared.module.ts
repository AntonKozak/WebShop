import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";

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
  ],
  exports: [
    FontAwesomeModule,
    CarouselModule,
    NgbModule,
    ToastrModule,
    NgxSpinnerModule,
  ],
})
export class SharedModule { }
