import { Component, OnInit } from '@angular/core';
import { combineLatestInit } from 'rxjs/internal/observable/combineLatest';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  constructor() { }

  public sporocilo = {
    ime: '',
    email: '',
    msg: ''
  }

  public mail(): void {

    var email = this.sporocilo.email;
    var body = "* Name of the sender: " + this.sporocilo.ime + "\n\n* Email of the sender: " + this.sporocilo.email + "\n\n* Message: " + this.sporocilo.msg;
    var subject = "Contact us - Email: " + email;
    var mailto_link = 'mailto:contactus@recipes.com?subject=' + subject + '&body=' + encodeURIComponent(body);
    window.location.href = mailto_link;
  }

  ngOnInit(): void {
  }

}
