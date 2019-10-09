import { timeout, switchMap } from 'rxjs/operators';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Client } from './../../models/Client';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;
  params$: Observable<ParamMap>;
  client$: Observable<Client>;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    // Get Id from url
    // this.id = this.route.snapshot.params['id'];

    // Declare client stream:
    this.client$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.clientService.getClient(params.get('id'));
      })
    );

    this.client$.subscribe(client => {
      if (client != null) {
        if (client && client.balance > 0) {
          this.hasBalance = true;
        }
      }
      this.client = client;
    });

    // this.route.paramMap.subscribe(params => {
    //   this.id = params.get('id');
    // });

    // // Get client
    // this.clientService.getClient(this.id).subscribe(client => {
    //   if (client != null) {
    //     if (client && client.balance > 0) {
    //       this.hasBalance = true;
    //     }
    //   }
    //   this.client = client;
    // });
  }

  updateBalance() {
    this.clientService.updateClient(this.client);
    this.flashMessage.show('Balance updated', {
      cssClass: 'alert-success', timeout: 4000
    });
  }

  onDeleteClick() {
    if (confirm('Are you sủa?')) {
      this.clientService.deleteClient();
      this.flashMessage.show('Client Removed', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/']);
    }
  }
}
