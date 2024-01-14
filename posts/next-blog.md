---
title: "Blog"
subtitle: "Como criar um blog utilizando NextJS sem saber o que você está fazendo"
date: "2024-13-01"
author: "Beatriz Gracia"
tags: ["nextjs", "frontend"]
---

Eu sou uma pessoa que valoriza muito a arte de falar sobre algo sem entender absolutamente nada sobre o que você está falando. Sério mesmo! Eu acho uma habilidade fantástica e eu queria ser mais assim na minha vida, sabe? Eu acho que para fazer algo assim é necessário um nível relativamente alto de autoestima algo que eu não necessariamente tenho (apesar de estar me contradizendo em algum nível).

#### Disclaimer

Eu não sei nem qual seria o melhor jeito de organizar as pastas em um projeto assim, dito isso, se tiver algo que seja aproveitável, aproveite.

### Como funciona?

Um blog de markdown é relativamente autoexplicativo, acho eu. Você basicamente vai ter os seus arquivos _.md_ em uma pasta e eles serão consumidos. Conceitualmente é algo bem simples. No meu caso, eu criei um arquivo chamado _postHelperFunctions.tsx_ que é basicamente uma pequena abominação com várias funções reutilizáveis.

- _getMarkdownFiles()_: Uma função que fica responsável por ir até a minha pasta /posts e pegar todos os arquivos que terminam com _.md_.
- _getSlug()_: Uma função que utiliza a última também mas que devolve uma lista de strings de slug (slug é basicamente o que vai na url quando a gente acessa um post).
- _getPostBody(slug: string)_: Essa função recupera o corpo de um post com base no slug desse post.
- _parseFrontMatter(slug: string)_: Eu acho que essa daqui merece uma parte só pra ela, então segue aí

#### Front Matter

> Front matter allows you to keep metadata attached to an instance of a content type—i.e., embedded inside a content file—and is one of the many features that gives Hugo its strength. (gohugo.io)

Basicamente, o FrontMatter é um jeito de você ter metadados de um post nele mesmo. A definição melhor escrita tá aí em cima.
Vou colocar um exemplo aqui para ficar mais simples de entender:

```markdown
---
title: "Blog"
subtitle: "Como criar um blog utilizando NextJS sem saber o que você está fazendo"
date: "2024-13-01"
author: "Beatriz Gracia"
tags: ["markdown", "nextjs", "frontend"]
---
```

No exemplo podemos ver que ele inicia com --- e tem uma estrutura de chave-valor. A função parseFrontMatter pega isso daí e transforma num objeto de tipo PostMetadata que é isso aqui:

```typescript
export interface PostMetadata {
  title: string;
  subtitle: string;
  date: string;
  author: string;
  tags: string[];
  slug: string;
}
```

Basicamente eu tiro os ---, inicializo um objeto vazio e itero por cada linha pegando a chave e o valor e faço como se fosse um _cast_ para o meu objeto criado. Ah, e pra questão das tags eu coloquei uma validação, se a chave for tags, o valor vai ser tratado como um array ao invés de um string.

Eu precisava ter feito isso? Na verdade não, pelo que eu vi já tem até dependência pronta para isso. Eu quis usar a dependência? Não.

Prosseguindo com as funções:

- _removeFrontMatter(slug: string)_: Função pra retirar a parte do frontMatter para eu poder usar só o corpo do post.
- _getTimeToRead(slug: string)_: Pega o post e calcula o tempo de leitura (fórmula retirada do primeiro resultado do Google)
- _getAllTags()_: Pega todos os posts só pra buscar as tags.
- _getSlugsByTag(tag: string)_: Nessa hora aqui eu tive a epifania que eu tava usando os slugs pra tudo. Mas daí já fiquei com preguiça de arrumar. Ele pega todos os slugs pra uma determinada tag.

_Após escrever tudo isso eu percebi que eu estou lendo os arquivos muitas vezes mas é aquilo, faz parte._

### Tailwind

Eu usei Tailwind para evitar o máximo possível fazer CSS artesanal. Meus componentes não são muito organizados porque na realidade foram fruto de uma tarde de pouco discernimento da realidade.

### Filtro

Eu não sabia muito bem como fazer o filtro (que choque) então eu tentei várias coisas, inclusive pedir ajuda ao companheiro GPT. Porém, dito isso, eu sei tão pouco sobre Next e _rendering_ de componentes que obviamente tive problemas. Em resumo, o GPT me deu userState e o NextJS gritou comigo falando sobre como eu não posso usar _hooks_ com _server rendering_.

Eu, então, fiz o que qualquer pessoa faria: não pesquisei o erro, não tentei arrumar, fingi que nem sequer enxergava o que estava acontecendo e fiz uma maneira ✨ alternativa ✨.

- Na minha página inicial eu tenho uma nuvem de tags que, ao clicar, te redirecionam pra uma url _/tags/nome-tag_.
- Recuperar o nome da tag
- Usar o nome da tag na função _getSlugsByTag(tag: string)_
- Iterar a lista de slugs para chamar o componente de card

### Fim

Eu acho que não tem mais nada que dê pra explicar, todas as escolhas aqui foram delírios de alguém que estava se sentindo excessivamente produtiva.
O código do blog está disponível no [meu github](https://github.com/whathebea/blog).

Se você não gostou, me xingue no twitter @beaexhausted
