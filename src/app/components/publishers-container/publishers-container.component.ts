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
  errorMessage: string = '';

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
            this.data.push(publisher);
            this.errorMessage = '';
          },
          error: (error) => {
            this.errorMessage = error.message;
          },
        });
    }
    this.showAddPublisherForm = false;
  }

  // In PublishersContainerComponent

  updatePublisher(publisher: Publisher): void {
    const updatedDetails = {
      publisher: publisher.publisher,
      domains: publisher.domains,
    };
    this.publisherService
      .updatePublisher(publisher.publisher, updatedDetails)
      .subscribe({
        next: (updatedPublisher) => {
          const index = this.data.findIndex(
            (p) => p.publisher === publisher.publisher
          );
          if (index !== -1) {
            this.data[index] = updatedPublisher;
          }
        },
        error: (error) => {
          this.errorMessage = 'Failed to update publisher.';
        },
      });
  }

  deletePublisher(publisher: Publisher): void {
    this.publisherService.deletePublisher(publisher.publisher).subscribe({
      next: () => {
        this.data = this.data.filter(
          (p) => p.publisher !== publisher.publisher
        );
      },
      error: (error) => {
        console.error('Failed to delete publisher:', error);
        this.errorMessage = 'Failed to delete publisher.';
      },
    });
  }
}
