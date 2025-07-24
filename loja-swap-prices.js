/**
 * SCRIPT PARA TROCAR POSIÇÃO: PREÇO À VISTA ↔ PARCELADO
 * Para implementar na loja - Adicione antes do </body>
 * Autor: Assistente AI
 * Versão: 1.0
 */

(function() {
    'use strict';
    
    // Configurações
    const CONFIG = {
        selectors: {
            productContainer: '[data-store*="product-item-info"]',
            priceContainer: '.item-price-container',
            installmentsContainer: '.js-max-installments-container',
            priceDisplay: '.js-price-display',
            comparePrice: '.js-compare-price-display',
            installments: '.js-max-installments'
        },
        styles: {
            priceParcelado: {
                fontWeight: 'bold',
                color: '#2d5aa0',
                fontSize: '1.15em',
                lineHeight: '1.3'
            },
            precoVista: {
                fontSize: '0.9em',
                color: '#666',
                fontWeight: 'normal'
            }
        }
    };

    // Função para aplicar estilos CSS dinamicamente
    function aplicarEstilos() {
        if (document.getElementById('swap-prices-styles')) return;

        const style = document.createElement('style');
        style.id = 'swap-prices-styles';
        style.textContent = `
            /* TROCA DE POSIÇÃO DOS PREÇOS */
            .item-price-container {
                display: flex !important;
                flex-direction: column !important;
                gap: 8px !important;
            }
            
            .js-max-installments-container {
                order: 1 !important;
                margin-bottom: 10px !important;
            }
            
            .item-price-container .js-price-display {
                order: 2 !important;
            }
            
            .item-price-container .js-compare-price-display {
                order: 3 !important;
            }
            
            .js-max-installments,
            .js-max-installments .product-installments {
                font-weight: bold !important;
                color: #2d5aa0 !important;
                font-size: 1.15em !important;
                line-height: 1.3 !important;
            }
            
            .js-installment-amount,
            .js-installment-price {
                font-weight: bold !important;
                color: #2d5aa0 !important;
            }
            
            .js-price-display.item-price {
                font-size: 0.9em !important;
                color: #666 !important;
                font-weight: normal !important;
            }
            
            .js-compare-price-display.price-compare {
                font-size: 0.85em !important;
                color: #999 !important;
                text-decoration: line-through !important;
            }
            
            @media (max-width: 768px) {
                .js-max-installments {
                    font-size: 1.1em !important;
                }
                .js-price-display.item-price {
                    font-size: 0.85em !important;
                }
                .item-price-container {
                    gap: 6px !important;
                }
            }
        `;
        
        document.head.appendChild(style);
        console.log('✅ Estilos de troca de preços aplicados');
    }

    // Função para reorganizar fisicamente os elementos (alternativa ao CSS)
    function reorganizarPrecos() {
        const produtos = document.querySelectorAll(CONFIG.selectors.productContainer);
        let contador = 0;

        produtos.forEach(produto => {
            const containerPreco = produto.querySelector(CONFIG.selectors.priceContainer);
            const containerParcelas = produto.querySelector(CONFIG.selectors.installmentsContainer);

            if (containerPreco && containerParcelas) {
                // Verifica se já foi reorganizado
                if (containerParcelas.dataset.swapped === 'true') return;

                // Move o container de parcelas para antes do container de preços
                containerPreco.parentNode.insertBefore(containerParcelas, containerPreco);
                
                // Marca como reorganizado
                containerParcelas.dataset.swapped = 'true';
                contador++;
            }
        });

        if (contador > 0) {
            console.log(`✅ ${contador} produtos reorganizados`);
        }
    }

    // Observer para detectar novos produtos carregados dinamicamente
    function observarMudancas() {
        const observer = new MutationObserver(function(mutations) {
            let novosElementos = false;

            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    const nodes = Array.from(mutation.addedNodes);
                    
                    // Verifica se há novos produtos
                    const temProdutos = nodes.some(node => {
                        return node.nodeType === 1 && (
                            node.matches && node.matches(CONFIG.selectors.productContainer) ||
                            node.querySelector && node.querySelector(CONFIG.selectors.productContainer)
                        );
                    });

                    if (temProdutos) {
                        novosElementos = true;
                    }
                }
            });

            if (novosElementos) {
                // Aguarda um pouco para garantir que o DOM foi atualizado
                setTimeout(() => {
                    reorganizarPrecos();
                }, 150);
            }
        });

        // Observa mudanças em todo o documento
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        console.log('🔍 Observer de mudanças ativado');
    }

    // Função principal de inicialização
    function inicializar() {
        console.log('🚀 Iniciando sistema de troca de preços...');

        // Aplica estilos CSS
        aplicarEstilos();

        // Reorganiza produtos existentes (opcional - use apenas se o CSS não funcionar)
        // reorganizarPrecos();

        // Ativa observer para novos produtos
        observarMudancas();

        // Reaplica em mudanças de página (SPA)
        if (window.history && window.history.pushState) {
            const originalPushState = window.history.pushState;
            window.history.pushState = function() {
                originalPushState.apply(window.history, arguments);
                setTimeout(aplicarEstilos, 100);
            };

            window.addEventListener('popstate', function() {
                setTimeout(aplicarEstilos, 100);
            });
        }

        console.log('✅ Sistema de troca de preços ativo');
    }

    // Aguarda o DOM estar pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializar);
    } else {
        inicializar();
    }

    // Expõe funções globalmente para debug/uso manual
    window.LojaSwapPrices = {
        aplicarEstilos: aplicarEstilos,
        reorganizarPrecos: reorganizarPrecos,
        inicializar: inicializar
    };

})();