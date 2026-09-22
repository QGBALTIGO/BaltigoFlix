# Baltigo Offline

Landing page responsiva do modo offline da Baltigo.

## URL
Publicada na pasta `/offline/`, sem alterar a home principal do BaltigoFlix.

## Planos
- Bronze Semanal — R$ 7,90 / 7 dias
- Ouro Mensal — R$ 17,90 / 30 dias
- Diamante Anual — R$ 79,90 / 365 dias
- Diamante Vitalício — R$ 249,90 / sem prazo de expiração

O Bronze não inclui pedidos prioritários. Ouro e Diamante incluem pedidos prioritários ilimitados.

## Configurar checkout
No fim de `index.html`, preencha o objeto:

```js
const CONFIG = {
  checkout: {
    bronze: "",
    ouro: "",
    anual: "",
    vitalicio: ""
  },
  support: "https://t.me/QGSuporteBot"
};
```

## Seções
Hero, mockup de download, métricas do acervo, fluxo em 3 passos, casos de uso, benefícios, quatro planos, comparativo, bloco da coxinha, FAQ e CTA final.
