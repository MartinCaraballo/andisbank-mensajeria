import { getMessagesValidator, postMessageValidator, deleteMessageValidator } from "../validators/messageValidator.js"
import { get, save, remove } from "../services/messageService.js"

export const getMessages = async (req, res) => {
    const { query, body } = req
    const { data, error } = getMessagesValidator(query, body)

    if (error) {
        res.json({ 
            status: 0,
            error
        })
        return
    }

    const { userId, messageQueryModel } = data

    res.json({
        status: 200,
        data: get(userId, messageQueryModel)
    })
}

export const postMessages = async (req, res) => {
    const { query, body } = req
    const { data, error } = postMessageValidator(query, body)

    if (error) {
        res.json({
            status: 0,
            error
        })
        return
    }

    const { userId, messageModel } = data    

    res.json({
        status: 200,
        data: save(userId, messageModel)
    })
}

export const deleteMessage = async (req, res) => {
    const { query, body } = req
    const { data, error } = deleteMessageValidator(query, body)

    if (error) {
        res.json({
            status: 0,
            error
        })
    }

    const { userId, messageId } = data

    res.json({
        status: 200,
        data: remove(userId, messageId)
    })
}