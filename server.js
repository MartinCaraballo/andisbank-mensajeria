import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

// Cargar el archivo .proto
const packageDef = protoLoader.loadSync("messaging.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);

// Asignar el paquete correcto desde el archivo .proto
const MessagePackage = grpcObject.andisbank.mensajeria;

// Almacén de mensajes (simulación)
const Messages = [];

// Implementación de GetMessage
function GetMessage(call, callback) {
    const messageId = call.request.id;
    const message = Messages.find(msg => msg.id === messageId);
    if (message) {
        callback(null, message);
    } else {
        callback({
            code: grpc.status.NOT_FOUND,
            details: "Message not found"
        });
    }
}

// Implementación de SendMessage
function SendMessage(call, callback) {
    const data = call.request;

    // Agregar un nuevo mensaje con un id único
    const newMessageData = { ...data, id: Messages.length + 1 };
    Messages.push(newMessageData);
  
    // Devolver el nuevo mensaje como respuesta
    callback(null, newMessageData);
}

// Implementación de DeleteMessage
function DeleteMessage(call, callback) {
    const messageId = call.request.id;
    const index = Messages.findIndex(msg => msg.id === messageId);

    if (index !== -1) {
        Messages.splice(index, 1); // Eliminar el mensaje
        callback(null, { message: 'Message deleted successfully' });
    } else {
        callback({
            code: grpc.status.NOT_FOUND,
            details: "Message not found"
        });
    }
}

// Crear el servidor gRPC y añadir el servicio
const server = new grpc.Server();
server.addService(MessagePackage.Message.service, { 
    GetMessage,
    SendMessage,
    DeleteMessage,
});

// Iniciar el servidor en el puerto 4000, `start()` ya no es necesario
server.bindAsync("0.0.0.0:4000", grpc.ServerCredentials.createInsecure(), () => {
    console.log("gRPC Server running at http://0.0.0.0:4000");
});
