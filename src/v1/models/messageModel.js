export default class MessageModel {
    constructor({ message, via, origin, receptor }) {
        this.id = undefined
        this.message = message
        this.via = via
        this.origin = origin
        this.receptor = receptor
        this.date = new Date()
    }
    setId(id) {
        this.id = id
    }
}