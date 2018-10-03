import { ViewController, NavParams, ModalController } from 'ionic-angular';
import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormatterService } from '../../services/formater.service';
import { Gnome } from '../../models/gnome';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {

    readonly listedProperties = ['age', 'weight', 'height', 'hair_color', 'professions'];
    readonly gnome: Gnome;

    constructor(
        private readonly navParams: NavParams,
        private readonly modalCtrl: ModalController,
        private readonly viewCtrl: ViewController,
        private readonly dataService: DataService,
        public formatterService: FormatterService
    ) {
        this.gnome = this.navParams.get('gnome');
    }

    openFriend(friendName: string): void {
        let friend: Gnome;
        this.dataService.getGnomes(friendName).subscribe(gs => {
            if (gs !== []) {
                friend = gs[0];
            }
        });
        const detailsModal = this.modalCtrl.create(DetailsPage, { gnome : friend });
        detailsModal.present()
            .catch((err: string) => { throw new Error(err); });
    }

    close(): void {
        this.viewCtrl.dismiss()
            .catch((err: string) => { throw new Error(err); });
    }
}
