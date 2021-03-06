import {Component, OnDestroy, OnInit} from '@angular/core';
import {OffersService} from './offers.service';
import {OffersModel} from './offers.model';
import {PlacesService} from '../places.service';
import {Place} from '../place.model';
import {IonItemSliding, LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {
  offers: Place[];
  isLoading = false;
  private placesSub: Subscription;

  constructor(private offersService: OffersService,
              private router: Router,
              private placesService: PlacesService,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {
  this.placesSub = this.placesService.places.subscribe(places => {
      this.offers = places;
    });
  }

  ionViewWillEnter() {
    this.loadingCtrl.create({message: 'Fetching places...'}).then(
        loadingEl => {
          loadingEl.present();
          this.placesService.fetchPlaces().subscribe(() => {
            loadingEl.dismiss();
          });
        }
    );
  }

  onEdit(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit', offerId]);
    console.log(offerId);
  }

  ngOnDestroy(): void {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }

}
