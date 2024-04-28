import {Component, Input} from '@angular/core';
import {Domain} from "../publishers-container.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { DomainService } from '../../../services/domain.service';

@Component({
  selector: 'app-domain-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './domain-card.component.html',
  styleUrl: './domain-card.component.css'
})
export class DomainCardComponent {
  @Input() domain!: Domain;
  
  isEdit: boolean = false;
  _domain!: Domain;

  constructor(private domainService: DomainService) {}

  ngOnInit(): void {
    this._domain = JSON.parse(JSON.stringify(this.domain));
  }

  toggleEdit() {
    this.isEdit = !this.isEdit;
  }

  editDomain() {
    const parsedDesktopAds = parseInt(this._domain.desktopAds as any, 10);
    const parsedMobileAds = parseInt(this._domain.mobileAds as any, 10);
  
    if (isNaN(parsedDesktopAds) || parsedDesktopAds < 0 ||
        isNaN(parsedMobileAds) || parsedMobileAds < 0) {
      alert('Both Desktop Ads and Mobile Ads must be positive integers.');
      return;
    }
  
    this._domain.desktopAds = parsedDesktopAds;
    this._domain.mobileAds = parsedMobileAds;
  
    if (this._domain.domain !== this.domain.domain) {
      this.domainService.isDomainUnique(this._domain.domain).subscribe(isUnique => {
        if (isUnique) {
          this.updateDomain();
        } else {
          alert('Domain name already exists. Choose a different name.');
          this._domain.domain = this.domain.domain;
        }
      });
    } else {
      this.updateDomain();
    }
  }
  
  updateDomain() {
    this.domain = JSON.parse(JSON.stringify(this._domain));
    this.toggleEdit();
  }
}
