import { timeout } from 'rxjs/operators';
import { Settings } from './../../models/Settings';
import { SettingsService } from './../../services/settings.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings: Settings;

  constructor(
    private router: Router,
    private flashMessage: FlashMessagesService,
    private settingsService: SettingsService,
  ) { }

  ngOnInit() {
    this.settings = this.settingsService.getSettings();
  }

  onSubmit() {
    this.settingsService.changeSettings(this.settings);
    this.flashMessage.show('Settings saved', {
      cssClass: 'alert-succss', timeout: 4000
    });
  }
}
