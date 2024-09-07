export default class MessageQueryModel {
    constructor({
        like,
        via,
        origin,
        receptor,
        from,
        to
    }) {
        this.like = like
        this.via = via
        this.origin = origin
        this.receptor = receptor
        this.from = from
        this.to = to
    }
}