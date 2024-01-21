import { Component, Input } from '@angular/core';
import { Member } from '../../../models/member';
import { GalleryItem } from 'ng-gallery';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss']
})
export class PhotoEditorComponent {
  @Input() member: Member | undefined;
  images: GalleryItem[] = [];

  
}
