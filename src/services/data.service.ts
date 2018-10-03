import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Gnome } from '../models/gnome';
import { Town } from '../models/town';
import { map, pluck, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

export type data = number | string | string[];

@Injectable()
export class DataService {

    sortKey: string = 'name';
    readonly town: string = 'Brastlewark';

    private readonly baseUrl: string = 'https://raw.githubusercontent.com/rrafols/mobile_test/master';
    private readonly range: number = 20;
    private times: number = 1;
    private lastSearch: string = '';
    private ascending: boolean = true;
    private gnomes: Gnome[];

    constructor(
        private readonly http: HttpClient
    ) {
    }

    changeSortOrder(): void {
        this.ascending = !this.ascending;
    }

    getAscending(): boolean {
        return this.ascending;
    }

    incrementTimes(): void {
        this.times++;
    }

    getGnomes(name: string = this.lastSearch): Observable<Gnome[]> {
        // keep the last term searched
        this.lastSearch = name;
        // get data from either the server or the stored Observable if defined
        const obs = this.gnomes ? of(this.gnomes) : this.http.get<Town>(`${this.baseUrl}/data.json`).pipe(
            pluck<Town, Gnome[]>(this.town),
            tap(gnomes => this.gnomes = gnomes)
        );
        // perform the filtering, the sort and slice it for better performance
        return obs.pipe(
            map(gs => gs
                .filter(g => g.name.toLocaleLowerCase().indexOf(name.toLocaleLowerCase()) > -1)
                .sort((a, b) => (this.ascending ? 1 : -1) * this.sortGnomes(a, b))
                .slice(0, this.range * this.times)
            )
        );
    }

    private sortGnomes(a: Gnome, b: Gnome): number {
        if (Array.isArray(a[this.sortKey])) {
            return a[this.sortKey].length - b[this.sortKey].length;
        } else if (typeof a[this.sortKey] === 'string') {
            if (a[this.sortKey] < b[this.sortKey]) { return -1; }
            if (a[this.sortKey] > b[this.sortKey]) { return 1; }
            return 0;
        }
        return a[this.sortKey] - b[this.sortKey];
    }
}
