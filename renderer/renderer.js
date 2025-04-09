window.addEventListener('DOMContentLoaded', async () => {
    if (document.querySelector('#form-produto')) {
      document.querySelector('#form-produto').addEventListener('submit', async (e) => {
        e.preventDefault();
        const nome = document.getElementById('nome').value;
        const preco = parseFloat(document.getElementById('preco').value);
        await window.api.addProduct({ nome, preco });
        alert('Produto cadastrado!');
        e.target.reset();
      });
    }
  
    if (document.querySelector('#lista-produtos')) {
      const produtos = await window.api.getProducts();
      const lista = document.getElementById('lista-produtos');
      lista.innerHTML = '';
      produtos.forEach(prod => {
        const li = document.createElement('li');
        li.textContent = `${prod.nome} - R$ ${prod.preco.toFixed(2)}`;
        lista.appendChild(li);
      });
    }
  });
  