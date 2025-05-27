// Dados dos produtos por categoria
const produtosPorCategoria = {
    vestidos: [
        { id: 1, nome: 'Vestido Modal', preco: 89.99, imagem: 'images/vestido-modal.jpg', tamanhos: ['Tam. Único'], cores: ['Marrom'] }
    ],
    blusas: [
        { id: 2, nome: 'Blusa Trico', preco: 104.99, imagem: 'images/blusa-trico.jpg', tamanhos: ['Tam. Único'], cores: ['Rosa Claro', 'Rosa Forte'] }
    ],
    calcas: [
        { id: 3, nome: 'Calça Jeans Sal e Pimenta', preco: 149.99, imagem: 'images/calca-jeans-sal.jpg', tamanhos: ['38', '40'], cores: ['Preto'] },
        { id: 4, nome: 'Calça Trico', preco: 159.99, imagem: 'images/calca-trico.jpg', tamanhos: ['Tam. Único'], cores: ['Bege'] },
        { id: 5, nome: 'Calça Legging', preco: 34.99, imagem: 'images/legging-preta.jpg', tamanhos: ['P', 'M', 'G'], cores: ['Preto'] }
    ],
    body: [
        { id: 6, nome: 'Body Fivela', preco: 89.99, imagem: 'images/body-fivela.jpg', tamanhos: ['Tam. Único'], cores: ['Preto', 'Branco', 'Bege'] }
    ],
    jaquetas: [
        { id: 7, nome: 'Jaqueta jeans rosa bebê', preco: 149.99, imagem: 'images/jaqueta-jeans.jpg', tamanhos: ['Tam. Único'], cores: ['Rosa Claro / Bebê'] }
    ],
    meias: [
        { id: 8, nome: 'Meia Térmica', preco: 19.99, imagem: 'images/meias-termicas.jpg', tamanhos: ['Tam. Único'], cores: ['Preto', 'Bege'] }
    ]
};

// Variáveis globais
let categoriaAtiva = 'vestidos';
let carrinho = [];
let tamanhoSelecionado = {};
let corSelecionada = {};

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
    
    // Adicionar cores (se o produto tiver cores)
    if (produto.cores && produto.cores.length > 0) {
        // Criar container para cores se não existir no template
        let colorsSection = document.createElement('div');
        colorsSection.className = 'product-colors';
        
        let colorsLabel = document.createElement('p');
        colorsLabel.className = 'colors-label';
        colorsLabel.textContent = 'Cor:';
        colorsSection.appendChild(colorsLabel);
        
        let colorsContainer = document.createElement('div');
        colorsContainer.className = 'colors-buttons';
        colorsSection.appendChild(colorsContainer);
        
        // Inserir após os tamanhos
        const productInfo = card.querySelector('.product-info');
        const addButton = card.querySelector('.add-to-cart-button');
        productInfo.insertBefore(colorsSection, addButton);
        
        // Variável para armazenar a cor selecionada
        if (!corSelecionada[produto.id]) {
            corSelecionada[produto.id] = produto.cores[0]; // Seleciona a primeira cor por padrão
        }
        
        produto.cores.forEach(cor => {
            const colorButton = document.createElement('button');
            colorButton.classList.add('color-button');
            colorButton.setAttribute('data-color', cor);
            
            // Definir estilo do botão baseado na cor
            colorButton.style.backgroundColor = getColorCode(cor);
            
            // Adicionar título para mostrar o nome da cor ao passar o mouse
            colorButton.title = cor;
            
            // Adicionar classe 'selected' se for a cor selecionada
            if (corSelecionada[produto.id] === cor) {
                colorButton.classList.add('selected');
            }
            
            colorButton.addEventListener('click', () => {
                // Remover seleção anterior
                colorsContainer.querySelectorAll('.color-button').forEach(btn => {
                    btn.classList.remove('selected');
                });
                
                // Adicionar seleção atual
                colorButton.classList.add('selected');
                
                // Salvar cor selecionada
                corSelecionada[produto.id] = cor;
            });
            
            colorsContainer.appendChild(colorButton);
        });
    }
    
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
        }
    });
    
    return card;
}

// Função auxiliar para converter nomes de cores em códigos hexadecimais
function getColorCode(corNome) {
    const coresMap = {
        'Preto': '#000000',
        'Branco': '#FFFFFF',
        'Rosa': '#FFC0CB',
        'Rosa Claro': '#FFCCE6',
        'Rosa Forte': '#FF1493',
        'Rosa Claro / Bebê': '#FFC0CB',
        'Azul': '#0000FF',
        'Azul Claro': '#ADD8E6',
        'Azul Escuro': '#00008B',
        'Vermelho': '#FF0000',
        'Verde': '#008000',
        'Amarelo': '#FFFF00',
        'Roxo': '#800080',
        'Cinza': '#808080',
        'Marrom': '#A52A2A',
        'Bege': '#F5F5DC',
        'Dourado': '#FFD700',
        'Prata': '#C0C0C0',
        'Floral': '#FFCBDB',
        'Listrada': '#DCDCDC',
        'Estampado': '#E6E6FA',
        'Liso': '#F0F8FF'
        // Adicione mais cores conforme necessário
    };
    
    return coresMap[corNome] || '#CCCCCC'; // Cor padrão se não encontrar
}

// Adicionar produto ao carrinho
function adicionarAoCarrinho(produto) {
    const tamanho = tamanhoSelecionado[produto.id];
    const cor = corSelecionada[produto.id];
    
    // Verificar se um tamanho foi selecionado
    if (!tamanho) {
        alert('Por favor, selecione um tamanho');
        return;
    }
    
    // Verificar se uma cor foi selecionada (se o produto tiver cores)
    if (produto.cores && produto.cores.length > 0 && !cor) {
        alert('Por favor, selecione uma cor');
        return;
    }
    
    // Verificar se o produto já está no carrinho
    const itemExistente = carrinho.find(
        item => item.id === produto.id && item.tamanho === tamanho && item.cor === cor
    );
    
    if (itemExistente) {
        // Atualizar quantidade
        itemExistente.quantidade += 1;
    } else {
        // Adicionar novo item
        carrinho.push({
            ...produto,
            tamanho,
            cor,
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
        if (item.cor) {
            mensagem += `Cor: ${item.cor}\n`;
        }
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
    const numeroWhatsApp = '5511999999999';
    
    // Codificar mensagem para URL
    const mensagemCodificada = encodeURIComponent(mensagem);
    
    // Criar link do WhatsApp
    const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;
    
    // Abrir link em nova aba
    window.open(linkWhatsApp, '_blank');
}

// Adicionar estilos para mensagem de sucesso e botões de cores
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
    
    .product-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
    }
    
    .product-colors {
        margin-bottom: var(--spacing-md);
    }

    .colors-label {
        font-size: 0.9rem;
        color: var(--color-text);
        margin-bottom: var(--spacing-sm);
    }

    .colors-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-sm);
    }

    .color-button {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 1px solid var(--color-border);
        cursor: pointer;
        transition: all var(--transition-normal);
    }

    .color-button:hover {
        transform: scale(1.1);
    }

    .color-button.selected {
        box-shadow: 0 0 0 2px var(--color-secondary);
    }
`;
document.head.appendChild(style);
