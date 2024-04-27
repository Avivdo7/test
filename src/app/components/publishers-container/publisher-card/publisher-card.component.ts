import { Component, Input } from '@angular/core';
import { Publisher, Domain } from '../publishers-container.component';
import { DomainCardComponent } from '../domain-card/domain-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-publisher-card',
  standalone: true,
  imports: [DomainCardComponent, CommonModule],
  templateUrl: './publisher-card.component.html',
  styleUrl: './publisher-card.component.css',
})
export class PublisherCardComponent {
  @Input() publisher!: Publisher;
  @Input() allPublishers!: Publisher[];
  
  showForm: boolean = false;
  formValue = { domain: '', desktopAds: 0, mobileAds: 0 };

  constructor() {}

  addDomain(domainName: string, mobileAds: string, desktopAds: string): void {
    const parsedMobileAds = parseInt(mobileAds, 10);
    const parsedDesktopAds = parseInt(desktopAds, 10);

    if (domainName && !isNaN(parsedMobileAds) && !isNaN(parsedDesktopAds)) {
      let existingPublisher = null;

      for (const pub of this.allPublishers) {
        if (pub.domains.some(domain => domain.domain.toLowerCase() === domainName.toLowerCase())) {
          existingPublisher = pub;
          break;
        }
      }

      if (!existingPublisher) {
        const newDomain: Domain = {
          domain: domainName,
          desktopAds: parsedDesktopAds,
          mobileAds: parsedMobileAds,
        };
        this.publisher.domains.push(newDomain);
        this.showForm = false;
        alert('New domain added successfully.');
      } else {
        alert(`This domain is already configured on: ${existingPublisher.publisher}.`);
      }
    }
  }
  
}
