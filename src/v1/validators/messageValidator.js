import  MessageQueryModel from "../models/messageQueryModel.js"
import  MessageModel from "../models/messageModel.js"

const vias = ['whatsapp', 'email']

function isDateValid(str) {
    return !isNaN(new Date(str));
}  

export const getMessagesValidator = (query, body) => {
    const {
        userId,
        like,
        via,
        origin,
        receptor,
        from,
        to
    } = query

    let error = undefined
    if (!userId) {
        error = "Not valid query param: userId" 
    } else if (via && !vias.includes(via)) {
        error = "Not valid query param: via"
    } else if (from && !isDateValid(from)) {
        error = "Not valid query param: from"
    } else if (to && !isDateValid(to)) {
        error = "Not valid query param: to"
    }

    if (error) {
        return { error }
    }

    const messageQueryModel = new MessageQueryModel({
        like,
        via,
        origin,
        receptor,
        from,
        to
    })

    return { data: { userId, messageQueryModel } }
}

export const postMessageValidator = (query, body) => {
    const { userId, message, via, origin, receptor } = body

    let error = undefined
    if (!userId) {
        error = "Not valid body key: userId"
    } else if (!message) {
        error = "Not valid body key: message"
    } else if (!via || !vias.includes(via)) {
        error = "Not valid body key: via"
    } else if (!origin) {
        error = "Not valid body key: origin"
    } else if (!receptor) {
        error = "Not valid body key: receptor"
    }

    if (error) {
        return { error }
    }

    const messageModel = new MessageModel({ message, via, origin, receptor })
    return { data: { userId, messageModel } }
}

export const deleteMessageValidator = (query, body) => {
    const { messageId } = query
    const { userId } = body

    let error = undefined
    if (!userId) {
        error = "Not valid body key: userId"
    } else if (!messageId) {
        error = "Not valid query param: messageId"
    }

    if (error) {
        return { error }
    }

    return { data: { messageId, userId } }
}