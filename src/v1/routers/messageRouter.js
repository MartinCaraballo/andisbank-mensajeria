import express from 'express'

import {
    getMessages,
    postMessages,
    deleteMessage
} from '../controllers/messageController.js'

const router = express.Router()

/**
 * @openapi
 * /api/v1/message:
 *   get:
 *     summary: Obtener mensajes
 *     description: Obtiene una lista de mensajes basada en los parámetros de consulta proporcionados.
 *     parameters:
 *       - name: userId
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario para obtener los mensajes.
 *       - name: like
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: Filtra los mensajes que contienen el texto especificado en el campo 'like'.
 *       - name: via
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: Filtra los mensajes enviados a través del canal o método especificado.
 *       - name: origin
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: ID del usuario que envía el mensaje.
 *       - name: receptor
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: ID del usuario que recibe el mensaje.
 *       - name: from
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filtra los mensajes enviados a partir de la fecha y hora especificadas.
 *       - name: to
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filtra los mensajes enviados hasta la fecha y hora especificadas.
 *     responses:
 *       '200':
 *         description: Lista de mensajes obtenidos con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID del mensaje.
 *                   message:
 *                     type: string
 *                     description: Contenido del mensaje.
 *                   via:
 *                     type: string
 *                     description: Método de comunicación.
 *                   origin:
 *                     type: string
 *                     description: ID del originador del mensaje.
 *                   receptor:
 *                     type: string
 *                     description: ID del receptor del mensaje.
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha y hora en que se envió el mensaje.
 *       '400':
 *         description: Solicitud incorrecta, con parámetros de consulta inválidos.
 *       '500':
 *         description: Error interno del servidor.
 *     tags:
 *       - Mensajes
 */
router.get('/message', getMessages)

/**
 * @openapi
 * /api/v1/message:
 *   post:
 *     summary: Enviar un mensaje
 *     description: Envía un mensaje y devuelve un objeto de respuesta con el estado de la operación y los detalles del mensaje enviado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID del usuario que envía el mensaje.
 *               message:
 *                 type: string
 *                 description: Contenido del mensaje.
 *               via:
 *                 type: string
 *                 description: Canal o método a través del cual se envía el mensaje.
 *               origin:
 *                 type: string
 *                 description: Origen del mensaje.
 *               receptor:
 *                 type: string
 *                 description: ID del receptor del mensaje.
 *             required:
 *               - userId
 *               - message
 *               - via
 *               - origin
 *               - receptor
 *     responses:
 *       '200':
 *         description: Mensaje enviado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: Código de estado de la respuesta.
 *                 error:
 *                   type: string
 *                   description: Mensaje de error (si ocurre algún error).
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID del mensaje enviado.
 *                     message:
 *                       type: string
 *                       description: Contenido del mensaje.
 *                     via:
 *                       type: string
 *                       description: Canal o método a través del cual se envió el mensaje.
 *                     origin:
 *                       type: string
 *                       description: Origen del mensaje.
 *                     receptor:
 *                       type: string
 *                       description: ID del receptor del mensaje.
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       description: Fecha y hora en que se envió el mensaje.
 *       '400':
 *         description: Solicitud incorrecta, con datos inválidos.
 *       '500':
 *         description: Error interno del servidor.
 *     tags:
 *       - Mensajes
 */
router.post('/message', postMessages)

/**
 * @openapi
 * /api/v1/message:
 *   delete:
 *     summary: Eliminar un mensaje
 *     description: Elimina un mensaje específico basado en el ID del mensaje y devuelve un objeto de respuesta con el estado de la operación y el ID del mensaje eliminado.
 *     parameters:
 *       - name: messageId
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del mensaje que se desea eliminar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID del usuario que solicita la eliminación del mensaje.
 *             required:
 *               - userId
 *     responses:
 *       '200':
 *         description: Mensaje eliminado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: Código de estado de la respuesta.
 *                 error:
 *                   type: string
 *                   description: Mensaje de error (si ocurre algún error).
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID del mensaje eliminado.
 *       '400':
 *         description: Solicitud incorrecta, con datos inválidos.
 *       '404':
 *         description: Mensaje no encontrado con el ID especificado.
 *       '500':
 *         description: Error interno del servidor.
 *     tags:
 *       - Mensajes
 */
router.delete('/message', deleteMessage)

export default router