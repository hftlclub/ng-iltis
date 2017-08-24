import {
  Component,
  Output,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'il-upload-box',
  templateUrl: './upload-box.component.html',
  styleUrls: ['./upload-box.component.scss']
})
export class UploadBoxComponent implements OnInit {
  @Output() fileSelected = new EventEmitter<File>();

  inputEl: HTMLInputElement;
  labelEl: HTMLElement;
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('inputLabel') inputLabel: ElementRef;

  constructor() {}

  ngOnInit() {
    this.inputEl = this.fileInput.nativeElement;
    this.labelEl = this.inputLabel.nativeElement;

    this.labelEl.addEventListener('dragenter', this.stopEvent, false);
    this.labelEl.addEventListener('dragover', this.stopEvent, false);
  }

  showImage() {}

  stopEvent(e: Event) {
    e.stopPropagation();
    e.preventDefault();
  }

  onDrop(e: any) {
    e.stopPropagation();
    e.preventDefault();
    this.fileSelected.emit(e.dataTransfer.files[0]);
  }

  onSelect() {
    this.fileSelected.emit(this.inputEl.files[0]);
  }
}
