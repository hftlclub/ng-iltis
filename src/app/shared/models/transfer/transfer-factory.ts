import { ValueChecker } from '../../valuechecker';
import { Transfer } from './';
import { ProductFactory } from '../product';
import { SizeTypeFactory } from '../sizetype';

export class TransferFactory {

    static empty(): Transfer {
        return new Transfer(0, ProductFactory.empty(), SizeTypeFactory.empty(), 0, null);
    }

    static fromObj(obj: any): Transfer {

        let transfer = TransferFactory.empty();

        if (obj.id) transfer.id = obj.id;
        else if (ValueChecker.validNumber(obj.transferId)) {
            transfer.id = obj.transferId;
        }

        if (obj.product) transfer.product = ProductFactory.fromObj(obj.product);
        else if (ValueChecker.validNumber(obj.refProduct)) {
            transfer.product = ProductFactory.fromObj(obj);
        }

        if (obj.sizeType) transfer.sizeType = SizeTypeFactory.fromObj(obj.sizeType);
        else if (ValueChecker.validNumber(obj.refSizeType)) {
            transfer.sizeType = SizeTypeFactory.fromObj(obj);
        }

        if (obj.change) transfer.change = obj.change;
        else if (ValueChecker.validNumber(obj.transferChangeStorage)) {
            transfer.change = obj.transferChangeStorage;
        }

        if (obj.timestamp) transfer.timestamp = new Date (obj.timestamp);
        else if (ValueChecker.validDate(obj.transferTS)) {
            transfer.timestamp = obj.transferTS;
        }

        return transfer;
    }

}