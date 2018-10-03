import { DataService } from './data.service';
import { Gnome } from '../models/gnome';
import { Observable } from 'rxjs';
import { defer } from 'rxjs/observable/defer';
import { Town } from '../models/town';
let httpClientSpy: { get: jasmine.Spy };

const gnomes: Gnome[] = [
    {
        id: 0,
        name: 'Tobus Quickwhistle',
        thumbnail: 'foobar',
        age: 306,
        weight: 39.065952,
        height: 107.75835,
        hair_color: 'Pink',
        professions: ['Metalworker', 'Woodcarver', 'Stonecarver', 'Tinker', 'Tailor', 'Potter'],
        friends: ['Cogwitz Chillwidget', 'Tinadette Chillbuster']
    },
    {
        id: 1,
        name: 'Fizkin Voidbuster',
        thumbnail: 'foobar',
        age: 288,
        weight: 35.279167,
        height: 110.43628,
        hair_color: 'Green',
        professions: ['Brewer', 'Medic'],
        friends: []
    }];
const town: Town = { Brastlewark: gnomes };

export function asyncData<T>(data: T) {
    return Observable.defer(() => Promise.resolve(data));
}

describe('DataService', () => {
    let dataService: DataService;
    beforeEach(() => {
      httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
      dataService = new DataService(<any> httpClientSpy);
    });

    describe('getGnomes', () => {
        beforeEach(() => httpClientSpy.get.and.returnValue(defer(() => Promise.resolve(town))));

        it('should return ascending sorted gnomes by name from HttpClient', () => {
            dataService.getGnomes()
                .subscribe(
                    gs => expect(gs).toEqual([gnomes[1], gnomes[0]], 'expected gnomes'),
                    fail
                );
            expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
        });

        it('should return expected gnomes without calling the server twice', done => {
            dataService.getGnomes().subscribe();
            // to let time this.gnomes to be initialized the first time via the http request
            setTimeout(() => {
              dataService.getGnomes().subscribe();
              expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
              done();
            }, 0);
        });
    });

    describe('changeSortOrder', () => {
        it('should inverse ascending variable value', () => {
            dataService.changeSortOrder();
            expect(dataService.getAscending()).toBeFalsy();
        });
    });
});
