# Sistema de Troca de Posição de Preços

Este sistema permite trocar a posição do preço à vista com o preço parcelado em produtos de e-commerce, especificamente desenvolvido para a estrutura HTML da Mormello Store.

## Arquivos

- `price-swap.css` - Estilos CSS para as transições e layout
- `price-swap.js` - Script JavaScript principal com toda a funcionalidade
- `exemplo-uso.html` - Exemplo prático de como usar o sistema

## Como usar

### 1. Incluir os arquivos

```html
<link rel="stylesheet" href="price-swap.css">
<script src="price-swap.js"></script>
```

### 2. Estrutura HTML necessária

O script funciona automaticamente com a seguinte estrutura HTML:

```html
<div class="item-description" data-store="product-item-info-[ID]">
    <div class="item-price-container">
        <span class="js-price-display item-price">R$479,99</span>
    </div>
    <div class="js-max-installments-container">
        <div class="js-max-installments product-installments">
            <span class="js-installment-amount">6</span>
            <span>x de</span>
            <span class="js-installment-price">R$80,00</span>
            <span>sem juros</span>
        </div>
    </div>
</div>
```

## Funcionalidades

### Automática
- O script inicializa automaticamente quando carregado
- Detecta todos os produtos na página
- Adiciona botões de troca individual para cada produto
- Adiciona um botão global para trocar todos os preços

### Botões de Controle
- **Botão global (canto superior direito)**: Troca todos os preços da página
- **Botões individuais**: Cada produto recebe um botão "⇅ Trocar preços"

### Métodos JavaScript

```javascript
// Trocar todos os preços
PriceSwapper.toggleAllPrices();

// Trocar preço de um produto específico
PriceSwapper.toggleProductPrice(elementoProduto);

// Usando jQuery (se disponível)
$('.produto').togglePrice();
```

## Características

### ✅ Responsivo
- Funciona em dispositivos móveis e desktop
- CSS adaptativo para diferentes tamanhos de tela

### ✅ Animações suaves
- Transições CSS para uma experiência visual agradável
- Efeitos de hover nos botões

### ✅ Compatível com carregamento dinâmico
- Observer de DOM para produtos carregados via AJAX
- Funciona com SPAs e carregamento assíncrono

### ✅ Acessível
- Botões com títulos descritivos
- Navegação por teclado suportada

### ✅ Não intrusivo
- Não modifica a estrutura HTML original
- Pode ser removido sem afetar o layout

## Personalização

### CSS
Você pode personalizar as cores e estilos editando `price-swap.css`:

```css
/* Cor do preço parcelado quando em destaque */
.price-swapped .js-installment-price {
    color: #sua-cor-aqui;
}

/* Estilo dos botões */
.price-toggle-btn {
    background: #sua-cor-de-fundo;
    color: #sua-cor-do-texto;
}
```

### JavaScript
Para customizar o comportamento, você pode modificar a classe `PriceSwapper`:

```javascript
// Exemplo: mudar o texto dos botões
addProductToggle(product, wrapper) {
    const toggleBtn = document.createElement('button');
    toggleBtn.innerHTML = 'Seu texto personalizado';
    // ... resto do código
}
```

## Exemplo de Uso

1. Abra o arquivo `exemplo-uso.html` no navegador
2. Teste os botões de troca individual e global
3. Observe as animações e transições
4. Abra o console para ver os logs de funcionamento

## Compatibilidade

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Internet Explorer 11 (com polyfills)

## Suporte

O sistema foi desenvolvido especificamente para a estrutura HTML da Mormello Store, mas pode ser adaptado para outras estruturas modificando os seletores CSS no arquivo JavaScript.

## Licença

Este código é fornecido como exemplo e pode ser usado e modificado livremente.