const messages = {}

const getNextMessageId = (userId) => {
    const userMsg = messages[userId]
    if (!userMsg) {
        return 1
    }

    let maxId = 0
    for (let m of userMsg) {
        const id = m.id
        if (maxId < id) {
            maxId = id
        }
    }

    return maxId + 1
}

export const get = (userId, messageQueryModel) => {
    const userMsg = messages[userId]
    if (!userMsg) {
        return []
    }
    
    const result = []
    for (let m of userMsg) {
        if (
            (!messageQueryModel.like || m.message.includes(messageQueryModel.like)) &&
            (!messageQueryModel.via || m.via == messageQueryModel.via) &&
            (!messageQueryModel.origin || m.origin.startsWith(messageQueryModel.origin)) &&
            (!messageQueryModel.receptor || m.receptor.startsWith(messageQueryModel.receptor)) &&
            (!messageQueryModel.from || new Date(messageQueryModel.from) < m.date) &&
            (!messageQueryModel.to || m.date < new Date(messageQueryModel.to))
        ) {
            result.push(m)
        }
    }

    console.log('messages', messages)
    return result
}

export const save = (userId, messageModel) => {
    const nextMessageId = getNextMessageId(userId)
    messageModel.setId(nextMessageId)

    const userMsg = messages[userId]

    if (!userMsg) {
        messages[userId] = [messageModel]
    } else {
        userMsg.push(messageModel)
    }

    console.log('messages', messages)
    return messageModel
}

export const remove = (userId, messageId) => {
    const userMsg = messages[userId]
    if (!userMsg) {
        return
    }

    const newMessages = []
    let i = 0
    while (userMsg[i] && userMsg[i].id != messageId) {
        i++
    }

    if (!userMsg[i]) {
        return 
    }

    console.log('messages', messages)
    return { id: userMsg.splice(i, 1)[0].id }
}
