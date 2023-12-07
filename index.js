const { ServiceBusClient } = require("@azure/service-bus");

async function main() {
    

    const connectionString = process.env.AZURE_SERVICE_BUS_CONNECTION_STRING;
    const queueName = process.env.AZURE_SERVICE_BUS_QUEUE_NAME;

    const serviceBusClient = new ServiceBusClient(connectionString);
    const receiver = serviceBusClient.createReceiver(queueName);

    try {
        console.log("Receiving messages...");

        receiver.subscribe({
            processMessage: async (message) => {
                console.log(`Received message: ${message.body}`);
                // Your event-driven processing logic goes here
            },
            processError: async (error) => {
                console.error("Error occurred:", error);
            },
        });

        // Keep the program running
        await new Promise((resolve) => setTimeout(resolve, 60000)); // Keep receiving messages for 1 minute
    } finally {
        await receiver.close();
        await serviceBusClient.close();
    }
}

main().catch((err) => {
    console.error("Error:", err);
});
