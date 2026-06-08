// admin.js
let agendamentosAtuais = [];

function verificarSenha() {
    const senha = document.getElementById('senhaAdmin').value;
    if(senha === 'ray2025') {
        document.getElementById('adminLogin').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'block';
        carregarAgendamentos();
    } else alert('Senha incorreta!');
}
function logout() { document.getElementById('adminLogin').style.display = 'flex'; document.getElementById('adminPanel').style.display = 'none'; }
function carregarAgendamentos() {
    agendamentosAtuais = JSON.parse(localStorage.getItem('agendamentos') || '[]');
    const hoje = new Date().toISOString().split('T')[0];
    document.getElementById('totalAgendamentos').innerText = agendamentosAtuais.length;
    document.getElementById('agendamentosHoje').innerText = agendamentosAtuais.filter(a => a.data === hoje).length;
    document.getElementById('totalClientes').innerText = [...new Set(agendamentosAtuais.map(a => a.nome))].length;
    renderizarTabela(agendamentosAtuais);
}
function renderizarTabela(lista) {
    const tbody = document.getElementById('agendamentosBody');
    tbody.innerHTML = '';
    lista.forEach(ag => {
        const row = tbody.insertRow();
        row.insertCell(0).innerText = ag.nome;
        row.insertCell(1).innerText = ag.telefone;
        row.insertCell(2).innerText = ag.email;
        row.insertCell(3).innerText = ag.servico;
        row.insertCell(4).innerText = ag.data;
        row.insertCell(5).innerText = ag.horario;
        row.insertCell(6).innerHTML = `<button onclick="editarAgendamento(${ag.id})"><i class="fas fa-edit"></i></button><button onclick="excluirAgendamento(${ag.id})"><i class="fas fa-trash"></i></button>`;
    });
}
function filtrarTabela() {
    const busca = document.getElementById('searchCliente').value.toLowerCase();
    const filtrados = agendamentosAtuais.filter(ag => ag.nome.toLowerCase().includes(busca));
    renderizarTabela(filtrados);
}
function filtrarPorData() {
    const data = document.getElementById('filtroData').value;
    if(data) renderizarTabela(agendamentosAtuais.filter(ag => ag.data === data));
    else renderizarTabela(agendamentosAtuais);
}
function excluirAgendamento(id) {
    if(confirm('Excluir?')) {
        agendamentosAtuais = agendamentosAtuais.filter(ag => ag.id !== id);
        localStorage.setItem('agendamentos', JSON.stringify(agendamentosAtuais));
        carregarAgendamentos();
    }
}
function editarAgendamento(id) {
    const ag = agendamentosAtuais.find(a => a.id === id);
    if(ag) {
        const novo = prompt('Editar nome:', ag.nome);
        if(novo) { ag.nome = novo; localStorage.setItem('agendamentos', JSON.stringify(agendamentosAtuais)); carregarAgendamentos(); }
    }
}
function exportarCSV() {
    let csv = "Nome,Telefone,Email,Serviço,Data,Horário\n";
    agendamentosAtuais.forEach(ag => csv += `${ag.nome},${ag.telefone},${ag.email},${ag.servico},${ag.data},${ag.horario}\n`);
    const blob = new Blob([csv], {type:'text/csv'}); const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'agendamentos.csv'; link.click();
}
function exportarExcel() {
    let html = `<table border="1"><tr><th>Nome</th><th>Telefone</th><th>Email</th><th>Serviço</th><th>Data</th><th>Horário</th></tr>`;
    agendamentosAtuais.forEach(ag => html += `<tr><td>${ag.nome}</td><td>${ag.telefone}</td><td>${ag.email}</td><td>${ag.servico}</td><td>${ag.data}</td><td>${ag.horario}</td></tr>`);
    html += `</table>`;
    const blob = new Blob([html], {type:'application/vnd.ms-excel'}); const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'agendamentos.xls'; link.click();
}
document.getElementById('senhaAdmin')?.addEventListener('keypress', e => { if(e.key === 'Enter') verificarSenha(); });