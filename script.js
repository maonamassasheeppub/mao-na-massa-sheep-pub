let carrinho = []

function adicionarCarrinho(nome, preco30, preco40) {
  if (preco40 && preco40 !== preco30) {
    const escolha = confirm(`Deseja adicionar qual versão da "${nome}"?\nOK = 40cm | Cancelar = 30cm`)
    const tamanho = escolha ? '40cm' : '30cm'
    const preco = escolha ? preco40 : preco30
    adicionarItem(`${nome} (${tamanho})`, preco)
  } else {
    adicionarItem(nome, preco30)
  }
}
function adicionarItem(nome, preco) {
  const itemExistente = carrinho.find(item => item.nome === nome)
  if (itemExistente) {
    itemExistente.quantidade += 1
  } else {
    carrinho.push({ nome, preco, quantidade: 1 })
  }
  atualizarCarrinho()
  abrirCarrinho()
}

function atualizarCarrinho() {
  const lista = document.getElementById('lista-carrinho')
  const total = document.getElementById('total-carrinho')
  lista.innerHTML = ''

  let totalCarrinho = 0

  carrinho.forEach(item => {
    const li = document.createElement('li')
    li.innerHTML = `
      ${item.nome} x${item.quantidade} - R$ ${(item.preco * item.quantidade).toFixed(2)}
      <button onclick="removerItem('${item.nome}')" style="float:right; background:none; border:none; color:#c0392b; font-weight:bold; cursor:pointer;">&times;</button>
    `
    lista.appendChild(li)
    totalCarrinho += item.preco * item.quantidade
  })

  total.textContent = totalCarrinho.toFixed(2)
}

function removerItem(nome) {
  carrinho = carrinho.filter(item => item.nome !== nome)
  atualizarCarrinho()
}

function abrirCarrinho() {
  document.getElementById('carrinho').classList.add('ativo')
}

function fecharCarrinho() {
  document.getElementById('carrinho').classList.remove('ativo')
}

function enviarPedido() {
  if (carrinho.length === 0) {
    alert('Seu carrinho está vazio!')
    return
  }

  let mensagem = 'Olá! Gostaria de fazer o seguinte pedido:%0A%0A'
  let total = 0

  carrinho.forEach(item => {
    const subtotal = item.preco * item.quantidade
    mensagem += `- ${item.nome} x${item.quantidade} = R$ ${subtotal.toFixed(2)}%0A`
    total += subtotal
  })

  mensagem += `%0ATotal: R$ ${total.toFixed(2)}%0A%0A 
  OBS: Valor poderá ser alterado!%0A%0A 
  -Endereço para entrega:  `
  
  const telefone = '5542988710058'
  const url = `https://wa.me/${telefone}?text=${mensagem}`
  window.open(url, '_blank')
}

function adicionarComPrecoPrompt(nome) {
  let precoStr = prompt('Digite o preço para "' + nome + '" (ex: 65 ou 65,00):')
  if (!precoStr) return
  precoStr = precoStr.replace(',', '.').replace(/[^\d.]/g, '')
  const preco = parseFloat(precoStr)
  if (isNaN(preco)) {
    alert('Preço inválido. Tente novamente.')
    return
  }
  adicionarItem(nome, preco)
  abrirCarrinho()
}


