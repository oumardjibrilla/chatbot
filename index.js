const message_user = document.querySelector('#message-user');
const bouttou_send = document.querySelector('.boutton-send');
const contenaire_message = document.querySelector('.contenue-message');

// Étapes du questionnaire
let etape = 0;
let userData = {};

// Questions du bot
const questions = [
    {
        texte: "Bonjour ! Bienvenue dans notre bijouterie en ligne ✨.\nQuel type de bijou cherchez-vous ?\n1- Bagues\n2- Colliers\n3- Bracelets\n4- Montres\n5- Autre",
        valid: ["1", "2", "3", "4", "5"]
    },
    {
        texte: "Dans quel matériau souhaitez-vous votre bijou ?\n1- Or\n2- Argent\n3- Diamant\n4- Autre",
        valid: ["1", "2", "3", "4"]
    },
    {
        texte: "Parfait ! Pour que nous puissions vous contacter, veuillez nous fournir votre adresse email :",
        valid: "email"
    },
    {
        texte: "Merci. Quel est votre numéro WhatsApp ?",
        valid: "whatsapp"
    }
];

// Fonction pour ajouter un message
function addMessage(text, sender = "chat-assistant") {
    const div = document.createElement("div");
    div.classList.add(sender);
    div.textContent = text;
    contenaire_message.appendChild(div);
    contenaire_message.scrollTop = contenaire_message.scrollHeight;
}

// Vérification d'email
function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

/* verification du numero de telephone */
function isValidWhatsApp(num) {
    return /^[0-9]{8,15}$/.test(num);
}


function botResponse(userText) {
    if (etape === 0) {
        if (questions[0].valid.includes(userText)) {
            userData.typeBijou = userText;
            etape++;
            addMessage(questions[1].texte);
        } else {
            addMessage("❌ Choix invalide. Merci de répondre entre 1 et 5.");
        }
    } else if (etape === 1) {
        if (questions[1].valid.includes(userText)) {
            userData.materiau = userText;
            etape++;
            addMessage(questions[2].texte);
        } else {
            addMessage("❌ Choix invalide. Merci de répondre entre 1 et 4.");
        }
    } else if (etape === 2) {
        if (isValidEmail(userText)) {
            userData.email = userText;
            etape++;
            addMessage(questions[3].texte);
        } else {
            addMessage("❌ Email invalide. Exemple : client@gmail.com");
        }
    } else if (etape === 3) {
        if (isValidWhatsApp(userText)) {
            userData.whatsapp = userText;
            etape++;
            addMessage("✅ Merci! J'enregistre vos informations...");
            setTimeout(() => {
                addMessage("✨ Parfait! Vos informations ont été enregistrées. Nous vous contacterons bientôt avec nos meilleures offres.");
            }, 1500);
        } else {
            addMessage("❌ Numéro WhatsApp invalide. Veuillez entrer uniquement des chiffres (8 à 15).");
        }
    }
}

// Premier message du bot
addMessage(questions[0].texte);

// Quand on clique sur envoyer
bouttou_send.addEventListener("click", () => {
    const userText = message_user.value.trim();
    if (userText === "") return;

    addMessage(userText, "user-assistant");
    message_user.value = "";

    botResponse(userText);
});

// Envoi avec Entrée
message_user.addEventListener("keypress", function(e) {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        bouttou_send.click();
    }
});

window.visualViewport.addEventListener("resize", () => {
  document.querySelector("header").style.top = window.visualViewport.offsetTop + "px";
  document.querySelector(".chat-footer").style.bottom = (window.innerHeight - window.visualViewport.height) + "px";
});
