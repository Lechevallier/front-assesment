import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormatterService } from '../../services/formater.service';
import { ViewController } from 'ionic-angular';

@Component({
    selector: 'page-sort',
    templateUrl: 'sort.html'
})
export class SortPage {

    readonly sortableProperties = ['name', 'age', 'weight', 'height', 'professions', 'friends'];

    constructor(
        public dataService: DataService,
        public formatterService: FormatterService,
        private readonly viewCtrl: ViewController) {
    }

    close(): void {
        this.viewCtrl.dismiss()
            .catch((err: string) => { throw new Error(err); });
    }
}
