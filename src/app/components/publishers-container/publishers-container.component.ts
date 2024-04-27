import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PublisherCardComponent } from './publisher-card/publisher-card.component';
import { PublisherService } from '../../services/publisher.service';

export type Publisher = {
  publisher: string;
  domains: Array<Domain>;
};

export type Domain = {
  domain: string;
  desktopAds: number;
  mobileAds: number;
};

@Component({
  selector: 'app-publishers-container',
  standalone: true,
  imports: [PublisherCardComponent, CommonModule, HttpClientModule],
  templateUrl: './publishers-container.component.html',
  styleUrl: './publishers-container.component.css',
})
export class PublishersContainerComponent implements OnInit {
  showAddPublisherForm: boolean = false;
  data: Array<Publisher> = [];

  constructor(private publisherService: PublisherService) {}

  ngOnInit(): void {
    this.loadPublishers();
  }

  loadPublishers(): void {
    this.publisherService.getAllPublishers().subscribe({
      next: (publishers) => {
        console.log('Publishers loaded:', publishers);
        this.data = publishers;
      },
      error: (err) => console.error('Failed to load publishers:', err),
    });
  }

  addPublisher(publisherName: string): void {
    if (publisherName) {
      this.publisherService
        .addPublisher({ publisher: publisherName, domains: [] })
        .subscribe({
          next: (publisher) => {
            this.data.push(publisher); // Add the new publisher to the local array
          },
          error: (err) => console.error('Error adding publisher:', err),
        });
    }
    this.showAddPublisherForm = false;
  }
}
