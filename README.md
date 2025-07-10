# Microvolts Item Finder - React Version

Bem-vindo ao **Microvolts Item Finder - React Version**, uma aplicação web desenvolvida em React para facilitar a busca e visualização de itens do jogo Microvolts. Este projeto é uma reimplementação moderna baseada no [Microvolts Item Finder](https://github.com/microvolts/MicrovoltsItemFinder), com melhorias em performance, usabilidade e design.

## 🚀 Funcionalidades

- **Busca por Itens**: Pesquise itens pelo nome ou descrição com suporte a debounce para melhorar a experiência do usuário.
- **Filtragem por Tipo**: Filtre itens com base no tipo de inventário.
- **Visualização de Ícones**: Exibição de ícones dos itens com suporte a estilos personalizados.
- **Interface Responsiva**: Design adaptado para dispositivos móveis e desktops.

## 🛠️ Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript para tipagem estática.
- **Tailwind CSS**: Framework CSS para estilização rápida e responsiva.
- **react-intersection-observer**: Biblioteca para implementar lazy loading.
- **Next.js**: Framework React para renderização do lado do servidor e geração de sites estáticos.

## 📂 Estrutura do Projeto

```plaintext
src/
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── (item-finder)/
│   │   ├── constants.ts
│   │   ├── [icons.json](http://_vscodecontentref_/0)
│   │   ├── items.json
│   │   ├── page.tsx
│   │   ├── types.ts
├── components/
│   ├── ui/
│   │   ├── badge.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
├── hooks/
│   ├── useDebounce.tsx
├── lib/
│   ├── utils.ts
```

## 🖥️ Como Rodar o Projeto

### Pré-requisitos

- **Node.js** (versão 16 ou superior)
- **Gerenciador de pacotes** (npm ou yarn)

### Passos

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/seu-usuario/items-finder-react.git
   cd items-finder-react
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Inicie o servidor de desenvolvimento**:

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. **Acesse a aplicação no navegador**:

   ```
   http://localhost:3000
   ```
