import { Validator } from '../validator';
import { SizeType } from '../sizetype/sizetype';

export class SizeTypeFactory {

    static empty(): SizeType {
        return new SizeType(0, 0, '', false);
    }

    static fromObj(obj: any): SizeType {

        let sizeType = SizeTypeFactory.empty();

        if (Validator.validNumber(obj.id)) {
            sizeType.id = obj.id;
        }

        if (Validator.validNumber(obj.amount)) {
            sizeType.amount = obj.amount;
        }

        if (Validator.validString(obj.description)) {
            sizeType.description = obj.description.trim();
        }

        sizeType.deleted = !!Validator.validNumber(obj.deleted);

        return sizeType;
    }

}
