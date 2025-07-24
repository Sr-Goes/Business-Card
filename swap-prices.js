// JavaScript para trocar a posição do preço à vista com o preço parcelado

// Função principal para reorganizar os preços
function swapPricePositions() {
    // Seleciona todos os containers de produto na página
    const productContainers = document.querySelectorAll('[data-store*="product-item-info"]');
    
    productContainers.forEach(container => {
        const priceContainer = container.querySelector('.item-price-container');
        const installmentsContainer = container.querySelector('.js-max-installments-container');
        
        if (priceContainer && installmentsContainer) {
            // Move o container de parcelas para antes do container de preços
            priceContainer.parentNode.insertBefore(installmentsContainer, priceContainer);
        }
    });
}

// Função para aplicar estilos via JavaScript (alternativa ao CSS)
function applySwapStyles() {
    // Verifica se o estilo já foi aplicado
    if (document.getElementById('swap-prices-styles')) {
        return;
    }

    const style = document.createElement('style');
    style.id = 'swap-prices-styles';
    style.textContent = `
        /* Reorganizar o container de preços usando flexbox */
        .item-price-container {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
        
        /* Reordenar elementos usando CSS Order */
        .item-price-container .js-price-display {
            order: 2; /* Preço à vista vai para baixo */
        }
        
        .item-price-container .js-compare-price-display {
            order: 3; /* Preço comparativo vai para o final */
        }
        
        .js-max-installments-container {
            order: 1; /* Preço parcelado vai para cima */
            margin-bottom: 8px;
        }
        
        /* Estilização adicional para destacar o preço parcelado */
        .js-max-installments {
            font-weight: bold;
            color: #2d5aa0;
            font-size: 1.1em;
        }
        
        /* Reduzir destaque do preço à vista */
        .js-price-display {
            font-size: 0.9em;
            color: #666;
        }
        
        /* Manter o preço comparativo discreto */
        .price-compare {
            text-decoration: line-through;
            color: #999;
            font-size: 0.85em;
        }
    `;
    
    document.head.appendChild(style);
}

// Função para observar mudanças no DOM (útil para páginas dinâmicas)
function observeProductChanges() {
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                // Verifica se novos produtos foram adicionados
                const addedNodes = Array.from(mutation.addedNodes);
                const hasProductNodes = addedNodes.some(node => 
                    node.nodeType === 1 && 
                    (node.querySelector && node.querySelector('[data-store*="product-item-info"]'))
                );
                
                if (hasProductNodes) {
                    // Aguarda um pouco para garantir que o DOM foi atualizado
                    setTimeout(swapPricePositions, 100);
                }
            }
        });
    });
    
    // Observa mudanças em todo o body
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Inicialização
function initPriceSwap() {
    // Aplica os estilos
    applySwapStyles();
    
    // Reorganiza os preços existentes
    swapPricePositions();
    
    // Observa mudanças para páginas dinâmicas
    observeProductChanges();
    
    console.log('Sistema de troca de posição dos preços inicializado');
}

// Executar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPriceSwap);
} else {
    initPriceSwap();
}

// Exportar funções para uso manual se necessário
window.swapPricePositions = swapPricePositions;
window.applySwapStyles = applySwapStyles;