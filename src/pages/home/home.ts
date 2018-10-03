import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { DataService } from '../../services/data.service';
import { Gnome } from '../../models/gnome';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';

import { DetailsPage } from '../details/details';
import { SortPage } from '../sort/sort';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit {

    gnomes: Observable<Gnome[]>;

    // delay in milliseconds to leave the view some time to constructs new items
    private readonly delay: number = 500;

    constructor(
        private readonly modalCtrl: ModalController,
        private readonly popoverCtrl: PopoverController,
        private readonly keyboard: Keyboard,
        private readonly dataService: DataService) {
    }

    ngOnInit(): void {
        this.searchGnomes();
    }

    searchGnomes(name: string = ''): void {
        this.gnomes = this.dataService.getGnomes(name);
    }

    hideKeyboard(): void {
        this.keyboard.hide();
    }

    openSortKeyPopup(): void {
        const popover = this.popoverCtrl.create(SortPage);
        popover.present({
            ev: {
                target : {
                    getBoundingClientRect : () => ({ bottom: '10px' })
                }
            }
        })
            .catch((err: string) => { throw new Error(err); });
        popover.onDidDismiss(() => this.searchGnomes());
    }

    doInfinite(infiniteScroll): void {
        this.dataService.incrementTimes();

        this.gnomes = this.dataService
            .getGnomes()
            .pipe(
                finalize(() =>
                    setTimeout(() => infiniteScroll.complete(), this.delay)
                )
            );
    }

    viewDetails(gnome: Gnome): void {
        const detailsModal = this.modalCtrl.create(DetailsPage, { gnome });
        detailsModal.present()
            .catch((err: string) => { throw new Error(err); });
    }

}
