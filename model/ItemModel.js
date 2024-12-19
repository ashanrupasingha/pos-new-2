export default class ItemModel{

    constructor(item_code,description,unit_price,quantity) {
        this._item_code = item_code;
        this._description = description;
        this._unit_price = unit_price;
        this._quantity = quantity;
    }


    get item_code() {
        return this._item_code;
    }

    set item_code(value) {
        this._item_code = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get unit_price() {
        return this._unit_price;
    }

    set unit_price(value) {
        this._unit_price = value;
    }

    get quantity() {
        return this._quantity;
    }

    set quantity(value) {
        this._quantity = value;
    }
}