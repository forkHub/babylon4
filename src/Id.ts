export class Id {
    private _id: number = 0;

    public get id(): number {
        this._id++;
        return this._id;
    }

    public set id(value: number) {
        this._id = value;
    }

    toDbo(): number {
        return this._id
    }

}