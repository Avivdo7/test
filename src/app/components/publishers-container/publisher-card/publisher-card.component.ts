import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Publisher, Domain } from '../publishers-container.component';
import { DomainCardComponent } from '../domain-card/domain-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-publisher-card',
  standalone: true,
  imports: [DomainCardComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './publisher-card.component.html',
  styleUrls: ['./publisher-card.component.css'],
})
export class PublisherCardComponent implements OnInit {
  @Input() publisher!: Publisher;
  @Input() allPublishers!: Publisher[];
  
  domainForm!: FormGroup;
  showForm: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.domainForm = this.fb.group({
      domain: ['', Validators.required],
      mobileAds: [0, [Validators.required, Validators.min(0)]],
      desktopAds: [0, [Validators.required, Validators.min(0)]]
    });
  }

  addDomain(): void {
    if (this.domainForm.valid) {
      const { domain, mobileAds, desktopAds } = this.domainForm.value;
      const existingPublisher = this.allPublishers.find(pub => 
        pub.domains.some(d => d.domain.toLowerCase() === domain.toLowerCase())
      );

      if (!existingPublisher) {
        this.publisher.domains.push({ domain, desktopAds, mobileAds });
        this.showForm = false;
        alert('New domain added successfully.');
        this.domainForm.reset();
      } else {
        alert(`This domain is already configured on: ${existingPublisher.publisher}.`);
      }
    }
  }
}
