/**
 * Script para trocar a posição do preço à vista com o preço parcelado
 * Funciona com a estrutura HTML da loja Mormello Store
 */

class PriceSwapper {
    constructor() {
        this.isSwapped = false;
        this.products = [];
        this.init();
    }

    init() {
        // Aguarda o DOM estar carregado
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        // Encontra todos os produtos na página
        this.findProducts();
        
        // Prepara cada produto para a troca
        this.products.forEach(product => this.prepareProduct(product));
        
        // Adiciona botão de toggle global (opcional)
        this.addGlobalToggle();
        
        // Observa mudanças no DOM para produtos carregados dinamicamente
        this.observeDOM();
    }

    findProducts() {
        // Busca por containers de produtos baseado na estrutura fornecida
        const productContainers = document.querySelectorAll('[data-store*="product-item-info"]');
        
        this.products = Array.from(productContainers).map(container => {
            const priceContainer = container.querySelector('.item-price-container');
            const installmentContainer = container.querySelector('.js-max-installments-container');
            
            if (priceContainer && installmentContainer) {
                return {
                    container: container,
                    priceContainer: priceContainer,
                    installmentContainer: installmentContainer,
                    isSwapped: false
                };
            }
            return null;
        }).filter(Boolean);

        console.log(`PriceSwapper: Encontrados ${this.products.length} produtos`);
    }

    prepareProduct(product) {
        // Adiciona classes CSS necessárias
        product.container.classList.add('price-swap-container');
        
        // Cria wrapper para facilitar a troca de posições
        const wrapper = document.createElement('div');
        wrapper.className = 'price-elements-wrapper';
        
        // Move os elementos de preço para o wrapper
        const parent = product.priceContainer.parentNode;
        parent.insertBefore(wrapper, product.priceContainer);
        
        wrapper.appendChild(product.priceContainer);
        wrapper.appendChild(product.installmentContainer);
        
        // Adiciona botão de toggle individual para cada produto
        this.addProductToggle(product, wrapper);
        
        // Atualiza referência do wrapper
        product.wrapper = wrapper;
    }

    addProductToggle(product, wrapper) {
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'price-toggle-btn';
        toggleBtn.innerHTML = '⇅ Trocar preços';
        toggleBtn.title = 'Clique para trocar a posição dos preços';
        
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleProduct(product);
        });
        
        wrapper.appendChild(toggleBtn);
        product.toggleBtn = toggleBtn;
    }

    addGlobalToggle() {
        // Adiciona um botão global para trocar todos os preços de uma vez
        const globalToggle = document.createElement('div');
        globalToggle.innerHTML = `
            <button id="global-price-toggle" class="price-toggle-btn" style="
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
                background: #007bff;
                color: white;
                border: none;
                padding: 8px 12px;
                font-size: 14px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            ">
                🔄 Trocar todos os preços
            </button>
        `;
        
        document.body.appendChild(globalToggle);
        
        document.getElementById('global-price-toggle').addEventListener('click', () => {
            this.toggleAll();
        });
    }

    toggleProduct(product) {
        // Adiciona classe de transição
        product.wrapper.classList.add('price-transition');
        
        setTimeout(() => {
            if (product.isSwapped) {
                // Volta ao estado original
                product.container.classList.remove('price-swapped');
                product.toggleBtn.innerHTML = '⇅ Trocar preços';
                product.isSwapped = false;
            } else {
                // Troca as posições
                product.container.classList.add('price-swapped');
                product.toggleBtn.innerHTML = '⇅ Voltar original';
                product.isSwapped = true;
            }
            
            // Remove classe de transição
            setTimeout(() => {
                product.wrapper.classList.remove('price-transition');
            }, 300);
        }, 50);
    }

    toggleAll() {
        this.isSwapped = !this.isSwapped;
        
        this.products.forEach(product => {
            if (product.isSwapped !== this.isSwapped) {
                this.toggleProduct(product);
            }
        });
        
        // Atualiza texto do botão global
        const globalBtn = document.getElementById('global-price-toggle');
        if (globalBtn) {
            globalBtn.innerHTML = this.isSwapped ? 
                '🔄 Voltar preços originais' : 
                '🔄 Trocar todos os preços';
        }
    }

    observeDOM() {
        // Observer para produtos carregados dinamicamente
        const observer = new MutationObserver((mutations) => {
            let hasNewProducts = false;
            
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const newProducts = node.querySelectorAll('[data-store*="product-item-info"]');
                        if (newProducts.length > 0) {
                            hasNewProducts = true;
                        }
                    }
                });
            });
            
            if (hasNewProducts) {
                setTimeout(() => {
                    this.findProducts();
                    this.products.forEach(product => {
                        if (!product.container.classList.contains('price-swap-container')) {
                            this.prepareProduct(product);
                        }
                    });
                }, 100);
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Método público para uso externo
    static toggleAllPrices() {
        if (window.priceSwapper) {
            window.priceSwapper.toggleAll();
        }
    }

    // Método público para trocar preço de um produto específico
    static toggleProductPrice(productElement) {
        if (window.priceSwapper) {
            const product = window.priceSwapper.products.find(p => 
                p.container === productElement || 
                p.container.contains(productElement)
            );
            if (product) {
                window.priceSwapper.toggleProduct(product);
            }
        }
    }
}

// Inicializa automaticamente quando o script é carregado
window.priceSwapper = new PriceSwapper();

// Expõe métodos globais para uso externo
window.PriceSwapper = PriceSwapper;

// Para compatibilidade com jQuery, se disponível
if (typeof jQuery !== 'undefined') {
    jQuery.fn.togglePrice = function() {
        this.each(function() {
            PriceSwapper.toggleProductPrice(this);
        });
        return this;
    };
}