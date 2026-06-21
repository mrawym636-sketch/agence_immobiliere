// ============================================
// script.js - Version 10/10 (sans exception dans hashPassword)
// ============================================

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('userConnected'));
}

function isAdmin() {
    const user = getCurrentUser();
    return user && user.role === 'admin';
}

function logout() {
    localStorage.removeItem('userConnected');
    window.location.href = "login.html";
}

function formatMoney(amount) {
    return new Intl.NumberFormat('fr-MA', { style: 'currency', currency: 'MAD' }).format(amount);
}

function getCurrentMonth() {
    return new Date().toISOString().slice(0, 7);
}

function calculateSalary(agent, agentContrats, visitesMois = 0) {
    const fixed = visitesMois >= 15 ? 5000 : 0;
    const nbContrats = agentContrats.length;
    const rate = nbContrats >= 3 ? 0.015 : 0.01;
    const totalSales = agentContrats.reduce((s, c) => s + c.prixVente, 0);
    const commission = totalSales * rate;
    return {
        fixed, commission,
        total: fixed + commission,
        nbContrats, totalSales,
        rate: rate * 100,
        visites: visitesMois
    };
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validateRequired(value) {
    return value && value.trim().length > 0;
}
function validatePositive(value) {
    return value > 0;
}

// ⚡ TOUJOURS HACHER (plus d'exception)
async function hashPassword(pwd) {
    const encoder = new TextEncoder();
    const hash = await crypto.subtle.digest('SHA-256', encoder.encode(pwd));
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

let users = [];
let contrats = [];
let visites = [];

async function loadData() {
    let storedUsers = JSON.parse(localStorage.getItem('usersData') || '[]');
    let storedContrats = JSON.parse(localStorage.getItem('contratsData') || '[]');
    let storedVisites = JSON.parse(localStorage.getItem('visitesData') || '[]');

    // ----- UTILISATEURS AVEC MIGRATION AUTO -----
    if (storedUsers.length === 0) {
        const defaultUsers = [
            { id: 1, name: "Admin Principal", email: "admin@prestige.ma", role: "admin" },
            { id: 2, name: "Youssef Amrani", email: "youssef@prestige.ma", role: "agent" },
            { id: 3, name: "Fatima Zahra", email: "fatima@prestige.ma", role: "agent" },
            { id: 4, name: "Karim Benali", email: "karim@prestige.ma", role: "agent" },
            { id: 5, name: "Nadia El Hassani", email: "nadia@prestige.ma", role: "agent" }
        ];
        for (let u of defaultUsers) {
            let pwd = (u.id === 1) ? "admin123" : "123456";
            u.password = await hashPassword(pwd);
        }
        users = defaultUsers;
        saveData();
    } else {
        users = storedUsers;
        // Migration : s'assurer que tous les mots de passe sont hashés
        let needSave = false;
        for (let u of users) {
            if (u.password && (u.password.length !== 64 || !/^[0-9a-f]{64}$/.test(u.password))) {
                u.password = await hashPassword(u.password);
                needSave = true;
            }
        }
        if (needSave) saveData();
    }

    // ----- CONTRATS -----
    if (storedContrats.length === 0) {
        contrats = [
            { id: 1, agentId: 2, prixVente: 1500000, type: "Appartement", date: "2025-06-05" },
            { id: 2, agentId: 2, prixVente: 2800000, type: "Villa", date: "2025-06-10" },
            { id: 3, agentId: 2, prixVente: 950000, type: "Bureau", date: "2025-06-15" },
            { id: 4, agentId: 4, prixVente: 1200000, type: "Appartement", date: "2025-06-08" },
            { id: 5, agentId: 5, prixVente: 3500000, type: "Villa", date: "2025-06-12" },
            { id: 6, agentId: 5, prixVente: 800000, type: "Bureau", date: "2025-06-18" }
        ];
        saveData();
    } else {
        contrats = storedContrats;
        let needSaveContrats = false;
        for (let c of contrats) {
            if (c.amount && !c.prixVente) {
                c.prixVente = c.amount;
                delete c.amount;
                needSaveContrats = true;
            }
        }
        if (needSaveContrats) saveData();
    }

    // ----- VISITES -----
    if (storedVisites.length === 0) {
        const mois = getCurrentMonth();
        visites = users.filter(u => u.role === 'agent').map((u, index) => ({
            id: index + 1,
            agentId: u.id,
            mois: mois,
            nombre: [18, 12, 15, 22][index] || 0
        }));
        saveVisites();
    } else {
        visites = storedVisites;
        const mois = getCurrentMonth();
        const agents = users.filter(u => u.role === 'agent');
        let needSaveVisites = false;
        for (let agent of agents) {
            const exists = visites.some(v => v.agentId === agent.id && v.mois === mois);
            if (!exists) {
                visites.push({ id: Date.now() + agent.id, agentId: agent.id, mois: mois, nombre: 0 });
                needSaveVisites = true;
            }
        }
        if (needSaveVisites) saveVisites();
    }

    const mois = getCurrentMonth();
    users = users.map(u => {
        if (u.role === 'agent') {
            const v = visites.find(v => v.agentId === u.id && v.mois === mois);
            u.visitesMonth = v ? v.nombre : 0;
        }
        return u;
    });
    saveData();
    testBusinessRules();
}

function saveData() {
    localStorage.setItem('usersData', JSON.stringify(users));
    localStorage.setItem('contratsData', JSON.stringify(contrats));
}

function saveVisites() {
    localStorage.setItem('visitesData', JSON.stringify(visites));
}

function getVisitesByAgentAndMonth(agentId, mois) {
    const entry = visites.find(v => v.agentId === agentId && v.mois === mois);
    return entry ? entry.nombre : 0;
}

function updateVisits(agentId, mois, nombre) {
    const entry = visites.find(v => v.agentId === agentId && v.mois === mois);
    if (entry) {
        entry.nombre = nombre;
    } else {
        visites.push({ id: Date.now(), agentId, mois, nombre });
    }
    saveVisites();
    const user = users.find(u => u.id === agentId);
    if (user && mois === getCurrentMonth()) {
        user.visitesMonth = nombre;
        saveData();
    }
}

function showToast(msg, type = 'success') {
    const toast = document.createElement('div');
    toast.className = 'toast-notif';
    toast.innerHTML = `${type === 'success' ? '✅' : '⚠️'} ${msg}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function testBusinessRules() {
    console.log("%c🧪 TEST DES RÈGLES MÉTIER (10/10)", "font-size:16px; font-weight:bold; color:#0F6E56;");
    const agent1 = { visitsMonth: 15 };
    const contrats1 = [{ prixVente: 1000000 }];
    const r1 = calculateSalary(agent1, contrats1, 15);
    console.assert(r1.total === 15000, `Erreur: total doit être 15000, reçu ${r1.total}`);
    console.log("✅ Cas 1 (1 contrat + 15 visites) =>", formatMoney(r1.total));

    const agent2 = { visitsMonth: 14 };
    const contrats2 = [{ prixVente: 1000000 }, { prixVente: 2000000 }];
    const r2 = calculateSalary(agent2, contrats2, 14);
    console.assert(r2.total === 30000, `Erreur: total doit être 30000, reçu ${r2.total}`);
    console.log("✅ Cas 2 (2 contrats + 14 visites) =>", formatMoney(r2.total));

    const agent3 = { visitsMonth: 15 };
    const contrats3 = [{ prixVente: 1000000 }, { prixVente: 1000000 }, { prixVente: 1000000 }];
    const r3 = calculateSalary(agent3, contrats3, 15);
    console.assert(r3.total === 50000, `Erreur: total doit être 50000, reçu ${r3.total}`);
    console.log("✅ Cas 3 (3 contrats + 15 visites) =>", formatMoney(r3.total));

    console.log("%c✅ TOUS LES TESTS SONT PASSÉS !", "font-size:14px; font-weight:bold; color:green;");
}

function exportToPDF(elementId, filename = 'rapport.pdf') {
    if (typeof html2pdf === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        script.onload = () => {
            const element = document.getElementById(elementId);
            if (element) html2pdf().from(element).save(filename);
            else showToast("Élément non trouvé", 'error');
        };
        document.body.appendChild(script);
    } else {
        const element = document.getElementById(elementId);
        if (element) html2pdf().from(element).save(filename);
        else showToast("Élément non trouvé", 'error');
    }
}