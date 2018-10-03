import { Injectable } from '@angular/core';

@Injectable()
export class FormatterService {

    keyLabel(key: string): string {
        switch (key) {
        case 'name':
            return 'Name';
        case 'age':
            return 'Age';
        case 'weight':
            return 'Weight';
        case 'height':
            return 'Height';
        case 'hair_color':
            return 'Hair color';
        case 'professions':
            return 'Professions';
        case 'friends':
            return 'Friends';
        default :
            return '';
        }
    }

}
