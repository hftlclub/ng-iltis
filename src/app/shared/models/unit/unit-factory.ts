import { ValueChecker } from '../../valuechecker';
import { Unit } from './';

export class UnitFactory {

    static empty(): Unit {
        return new Unit(0, '', '');
    }

    static fromObj(obj: any): Unit {

        let unit = UnitFactory.empty();

        if (obj.id) unit.id = obj.id;
        else if (ValueChecker.validNumber(obj.unitId)) {
            unit.id = obj.unitId;
        }

        if (obj.short) unit.short = obj.short;
        else if (ValueChecker.validString(obj.unitShort)) {
            unit.short = obj.unitShort.trim();
        }

        if (obj.full) unit.full = obj.full;
        else if (ValueChecker.validString(obj.unitFull)) {
            unit.full = obj.unitFull.trim();
        }

        return unit;
    }

}