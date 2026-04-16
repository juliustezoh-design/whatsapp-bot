const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("auth");

    const sock = makeWASocket({
        auth: state,
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("messages.upsert", async (m) => {
        const msg = m.messages[0];
        if (!msg.message) return;

        const text =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text;

        console.log("Message:", text);

        if (text && text.toLowerCase() === "hi") {
            await sock.sendMessage(msg.key.remoteJid, {
                text: "Hello 👋 I am your Railway bot"
            });
        }
    });
}

startBot();
