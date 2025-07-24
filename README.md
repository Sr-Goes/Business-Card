# Troca de Posição: Preço à Vista ↔ Preço Parcelado

Este projeto contém scripts para trocar a posição do preço à vista com o preço parcelado em produtos de e-commerce.

## Arquivos Disponíveis

### 1. `swap-prices.css`
Solução puramente CSS que utiliza Flexbox e a propriedade `order` para reorganizar os elementos.

**Como usar:**
```html
<link rel="stylesheet" href="swap-prices.css">
```

### 2. `swap-prices.js`
Solução JavaScript que move fisicamente os elementos no DOM e também aplica estilos.

**Como usar:**
```html
<script src="swap-prices.js"></script>
```

### 3. `swap-price-position.html`
Arquivo de demonstração que mostra o antes e depois da aplicação do CSS.

## Como Funciona

### Estrutura Original:
```
📦 Produto
├── 💰 Preço Comparativo (R$599,99 - riscado)
├── 💵 Preço à Vista (R$479,99)
└── 💳 Preço Parcelado (6x de R$80,00 sem juros)
```

### Estrutura Após Aplicação:
```
📦 Produto
├── 💳 Preço Parcelado (6x de R$80,00 sem juros) ← Destaque
├── 💵 Preço à Vista (R$479,99) ← Menos destaque
└── 💰 Preço Comparativo (R$599,99 - riscado)
```

## Implementação

### Opção 1: CSS Puro (Recomendado)
Mais performático e não requer JavaScript:

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="swap-prices.css">
</head>
<body>
    <!-- Seu HTML de produtos aqui -->
</body>
</html>
```

### Opção 2: JavaScript
Melhor para sites dinâmicos que carregam produtos via AJAX:

```html
<!DOCTYPE html>
<html>
<head>
    <!-- CSS opcional se não quiser usar o JS para estilos -->
    <link rel="stylesheet" href="swap-prices.css">
</head>
<body>
    <!-- Seu HTML de produtos aqui -->
    <script src="swap-prices.js"></script>
</body>
</html>
```

### Opção 3: Inline (Para testes rápidos)
```html
<style>
.item-price-container {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.item-price-container .js-price-display {
    order: 2;
}

.item-price-container .js-compare-price-display {
    order: 3;
}

.js-max-installments-container {
    order: 1;
    margin-bottom: 8px;
}

.js-max-installments {
    font-weight: bold;
    color: #2d5aa0;
    font-size: 1.1em;
}

.js-price-display {
    font-size: 0.9em;
    color: #666;
}
</style>
```

## Seletores Utilizados

O código funciona com a estrutura HTML fornecida, utilizando estas classes:

- `.item-price-container` - Container dos preços
- `.js-price-display` - Preço à vista
- `.js-compare-price-display` - Preço comparativo (riscado)
- `.js-max-installments-container` - Container do preço parcelado
- `.js-max-installments` - Preço parcelado

## Compatibilidade

- ✅ CSS Grid/Flexbox: Todos os navegadores modernos
- ✅ JavaScript: IE11+ e todos os navegadores modernos
- ✅ Mobile: Totalmente responsivo

## Personalização

Você pode ajustar as cores, tamanhos e espaçamentos editando as variáveis CSS:

```css
.js-max-installments {
    font-weight: bold;
    color: #2d5aa0; /* Cor do preço parcelado */
    font-size: 1.1em; /* Tamanho do preço parcelado */
}

.js-price-display {
    font-size: 0.9em; /* Tamanho do preço à vista */
    color: #666; /* Cor do preço à vista */
}
```

## Teste

Abra o arquivo `swap-price-position.html` no navegador para ver a demonstração funcionando.