// Dados dos produtos por categoria
const produtosPorCategoria = {
    vestidos: [
        { id: 1, nome: 'Vestido Longo Floral', preco: 189.90, imagem: '/images/vestido-longo.jpg', tamanhos: ['P', 'M', 'G'] },
        { id: 2, nome: 'Vestido Midi Elegante', preco: 159.90, imagem: '/images/vestido-midi.jpg', tamanhos: ['P', 'M', 'G'] },
        { id: 3, nome: 'Vestido Curto Casual', preco: 129.90, imagem: '/images/vestido-curto.jpg', tamanhos: ['P', 'M', 'G'] },
        { id: 4, nome: 'Vestido Festa Premium', preco: 249.90, imagem: '/images/vestido-festa.jpg', tamanhos: ['P', 'M', 'G'] },
    ],
    blusas: [
        { id: 5, nome: 'Blusa Manga Bufante', preco: 89.90, imagem: '/images/blusa-bufante.jpg', tamanhos: ['P', 'M', 'G'] },
        { id: 6, nome: 'Blusa Cropped Moderna', preco: 69.90, imagem: '/images/blusa-cropped.jpg', tamanhos: ['P', 'M', 'G'] },
        { id: 7, nome: 'Camisa Social Feminina', preco: 119.90, imagem: '/images/camisa-social.jpg', tamanhos: ['P', 'M', 'G'] },
        { id: 8, nome: 'Blusa Ombro a Ombro', preco: 79.90, imagem: '/images/blusa-ombro.jpg', tamanhos: ['P', 'M', 'G'] },
    ],
    calcas: [
        { id: 9, nome: 'Calça Jeans Skinny', preco: 149.90, imagem: '/images/calca-skinny.jpg', tamanhos: ['36', '38', '40', '42'] },
        { id: 10, nome: 'Calça Pantalona', preco: 159.90, imagem: '/images/calca-pantalona.jpg', tamanhos: ['36', '38', '40', '42'] },
        { id: 11, nome: 'Calça Alfaiataria', preco: 179.90, imagem: '/images/calca-alfaiataria.jpg', tamanhos: ['36', '38', '40', '42'] },
        { id: 12, nome: 'Calça Legging Premium', preco: 99.90, imagem: '/images/calca-legging.jpg', tamanhos: ['P', 'M', 'G'] },
    ],
    saias: [
        { id: 13, nome: 'Saia Midi Plissada', preco: 119.90, imagem: '/images/saia-plissada.jpg', tamanhos: ['P', 'M', 'G'] },
        { id: 14, nome: 'Saia Longa Estampada', preco: 139.90, imagem: '/images/saia-longa.jpg', tamanhos: ['P', 'M', 'G'] },
        { id: 15, nome: 'Saia Jeans Curta', preco: 99.90, imagem: '/images/saia-jeans.jpg', tamanhos: ['36', '38', '40', '42'] },
        { id: 16, nome: 'Saia Envelope', preco: 109.90, imagem: '/images/saia-envelope.jpg', tamanhos: ['P', 'M', 'G'] },
    ],
    conjuntos: [
        { id: 17, nome: 'Conjunto Blazer e Calça', preco: 299.90, imagem: '/images/conjunto-blazer.jpg', tamanhos: ['P', 'M', 'G'] },
        { id: 18, nome: 'Conjunto Top e Saia', preco: 189.90, imagem: '/images/conjunto-top.jpg', tamanhos: ['P', 'M', 'G'] },
        { id: 19, nome: 'Conjunto Moletom Elegante', preco: 219.90, imagem: '/images/conjunto-moletom.jpg', tamanhos: ['P', 'M', 'G'] },
        { id: 20, nome: 'Conjunto Alfaiataria', preco: 259.90, imagem: '/images/conjunto-alfaiataria.jpg', tamanhos: ['P', 'M', 'G'] },
    ],
    acessorios: [
        { id: 21, nome: 'Bolsa Estruturada', preco: 159.90, imagem: '/images/bolsa-estruturada.jpg', tamanhos: ['Único'] },
        { id: 22, nome: 'Colar Elegante', preco: 79.90, imagem: '/images/colar.jpg', tamanhos: ['Único'] },
        { id: 23, nome: 'Lenço de Seda', preco: 69.90, imagem: '/images/lenco.jpg', tamanhos: ['Único'] },
        { id: 24, nome: 'Cinto Fino Feminino', preco: 59.90, imagem: '/images/cinto.jpg', tamanhos: ['P', 'M', 'G'] },
    ],
};

// Variáveis globais
let categoriaAtiva = 'vestidos';
let carrinho = [];
let tamanhoSelecionado = {};

// Elementos DOM
const menuToggle = document.getElementById('menu-toggle');
const menuMobile = document.getElementById('menu-mobile');
const categoryLinks = document.querySelectorAll('.category-link');
const categoryTitle = document.getElementById('category-title');
const productsGrid = document.getElementById('products-grid');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const floatingCart = document.getElementById('floating-cart');
const whatsappButton = document.getElementById('whatsapp-button');
const productTemplate = document.getElementById('product-template');
const currentYearElement = document.getElementById('current-year');

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Atualizar o ano atual no footer
    currentYearElement.textContent = new Date().getFullYear();
    
    // Carregar produtos da categoria inicial
    carregarProdutos(categoriaAtiva);
    
    // Configurar eventos
    setupEventListeners();
});

// Configurar todos os event listeners
function setupEventListeners() {
    // Toggle do menu mobile
    menuToggle.addEventListener('click', () => {
        menuMobile.classList.toggle('active');
        
        // Alternar ícone do botão
        const icon = menuToggle.querySelector('i');
        if (menuMobile.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Links de categorias
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const categoria = link.getAttribute('data-category');
            
            // Atualizar categoria ativa
            categoriaAtiva = categoria;
            
            // Atualizar classes ativas
            categoryLinks.forEach(l => l.classList.remove('active'));
            document.querySelectorAll(`[data-category="${categoria}"]`).forEach(l => l.classList.add('active'));
            
            // Atualizar título
            categoryTitle.textContent = link.textContent;
            
            // Carregar produtos da categoria
            carregarProdutos(categoria);
            
            // Fechar menu mobile se estiver aberto
            if (menuMobile.classList.contains('active')) {
                menuMobile.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Botão de WhatsApp
    whatsappButton.addEventListener('click', enviarParaWhatsApp);
}

// Carregar produtos da categoria selecionada
function carregarProdutos(categoria) {
    // Limpar grid de produtos
    productsGrid.innerHTML = '';
    
    // Obter produtos da categoria
    const produtos = produtosPorCategoria[categoria];
    
    // Criar e adicionar cards de produtos
    produtos.forEach(produto => {
        const productCard = criarCardProduto(produto);
        productsGrid.appendChild(productCard);
    });
}

// Criar card de produto
function criarCardProduto(produto) {
    // Clonar template
    const card = productTemplate.content.cloneNode(true);
    
    // Preencher dados do produto
    card.querySelector('.product-name').textContent = produto.nome;
    card.querySelector('.product-price').textContent = `R$ ${produto.preco.toFixed(2)}`;
    
    // Adicionar tamanhos
    const sizesContainer = card.querySelector('.sizes-buttons');
    produto.tamanhos.forEach(tamanho => {
        const sizeButton = document.createElement('button');
        sizeButton.classList.add('size-button');
        sizeButton.textContent = tamanho;
        sizeButton.addEventListener('click', () => {
            // Remover seleção anterior
            sizesContainer.querySelectorAll('.size-button').forEach(btn => {
                btn.classList.remove('selected');
            });
            
            // Adicionar seleção atual
            sizeButton.classList.add('selected');
            
            // Salvar tamanho selecionado
            tamanhoSelecionado[produto.id] = tamanho;
        });
        
        // Se já tiver um tamanho selecionado para este produto
        if (tamanhoSelecionado[produto.id] === tamanho) {
            sizeButton.classList.add('selected');
        }
        
        sizesContainer.appendChild(sizeButton);
    });
    
    // Configurar botão de adicionar ao carrinho
    const addButton = card.querySelector('.add-to-cart-button');
    addButton.addEventListener('click', () => {
        adicionarAoCarrinho(produto);
    });
    
    // Configurar botão de favorito
    const wishlistButton = card.querySelector('.wishlist-button');
    wishlistButton.addEventListener('click', (e) => {
        e.preventDefault();
        const icon = wishlistButton.querySelector('i');
        
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');

            // Adicionar imagem do produto
const productImage = card.querySelector('.product-image');
const placeholder = productImage.querySelector('.product-image-placeholder');
if (placeholder) {
    // Criar elemento de imagem
    const img = document.createElement('img');
    img.src = produto.imagem;
    img.alt = produto.nome;
    img.className = 'product-img';
    
    // Substituir placeholder pela imagem
    productImage.replaceChild(img, placeholder);
        }
    });
    
    return card;
}

// Adicionar produto ao carrinho
function adicionarAoCarrinho(produto) {
    const tamanho = tamanhoSelecionado[produto.id];
    
    // Verificar se um tamanho foi selecionado
    if (!tamanho) {
        alert('Por favor, selecione um tamanho');
        return;
    }
    
    // Verificar se o produto já está no carrinho
    const itemExistente = carrinho.find(
        item => item.id === produto.id && item.tamanho === tamanho
    );
    
    if (itemExistente) {
        // Atualizar quantidade
        itemExistente.quantidade += 1;
    } else {
        // Adicionar novo item
        carrinho.push({
            ...produto,
            tamanho,
            quantidade: 1
        });
    }
    
    // Atualizar interface
    atualizarCarrinho();
    
    // Mostrar mensagem de sucesso
    const mensagem = document.createElement('div');
    mensagem.classList.add('success-message');
    mensagem.textContent = 'Produto adicionado ao carrinho!';
    document.body.appendChild(mensagem);
    
    // Remover mensagem após 3 segundos
    setTimeout(() => {
        mensagem.classList.add('fade-out');
        setTimeout(() => {
            document.body.removeChild(mensagem);
        }, 300);
    }, 2000);
}

// Atualizar interface do carrinho
function atualizarCarrinho() {
    // Calcular total de itens
    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    
    // Atualizar contadores
    cartCount.textContent = totalItens;
    cartTotal.textContent = totalItens;
    
    // Mostrar/esconder botão flutuante
    if (totalItens > 0) {
        floatingCart.classList.add('active');
    } else {
        floatingCart.classList.remove('active');
    }
}

// Enviar pedido para WhatsApp
function enviarParaWhatsApp() {
    // Verificar se o carrinho está vazio
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio');
        return;
    }
    
    // Construir mensagem
    let mensagem = 'Olá! Gostaria de fazer um pedido:\n\n';
    
    // Adicionar itens do carrinho
    carrinho.forEach(item => {
        mensagem += `*${item.nome}*\n`;
        mensagem += `Tamanho: ${item.tamanho}\n`;
        mensagem += `Quantidade: ${item.quantidade}\n`;
        mensagem += `Preço unitário: R$ ${item.preco.toFixed(2)}\n`;
        mensagem += `Subtotal: R$ ${(item.preco * item.quantidade).toFixed(2)}\n\n`;
    });
    
    // Adicionar total
    const total = carrinho.reduce(
        (soma, item) => soma + item.preco * item.quantidade, 0
    );
    
    mensagem += `*Total do pedido: R$ ${total.toFixed(2)}*`;
    
    // Número de WhatsApp da loja (substituir pelo número real)
    const numeroWhatsApp = '5551980506578';
    
    // Codificar mensagem para URL
    const mensagemCodificada = encodeURIComponent(mensagem);
    
    // Criar link do WhatsApp
    const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;
    
    // Abrir link em nova aba
    window.open(linkWhatsApp, '_blank');
}

// Adicionar estilos para mensagem de sucesso
const style = document.createElement('style');
style.textContent = `
    .success-message {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: var(--color-success);
        color: white;
        padding: 12px 24px;
        border-radius: 50px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideUp 0.3s ease;
    }
    
    .fade-out {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    @keyframes slideUp {
        from {
            transform: translate(-50%, 20px);
            opacity: 0;
        }
        to {
            transform: translate(-50%, 0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
