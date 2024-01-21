---
title: "Webflux"
subtitle: "Nada muito ordenado, só o que eu precisei até agora."
date: "2024-01-20"
author: "Beatriz Gracia"
tags: ["webflux", "backend", "java"]
---

Quando eu comecei a trabalhar com Webflux eu percebi que a quantidade de conteúdo amigável era próxima de 0, tanto em português quanto em inglês. Essa semana um amigo me falou que eu saber tanto sobre isso o intimidava (e eu nem sei tanto) então deixo aqui minha dedicação.

### Esclarecimentos

Primeiro, é importante esclarecer que Webflux é um módulo do Spring e você poderia muito bem implementar assincronicidade usando, por exemplo, a classe CompletableFuture e a interface de Future. Dito isso, eu adoro coisas que facilitam minha vida e até melhoram em alguns aspectos, visto que a classe e interface possuem algumas limitações no que pode ser feito com os dados.

Segundo, eu não vou explicar o que é uma _thread_, o que significa ser _non blocking_ e nem nada disso.

### Mono e Flux

O Mono é um _publisher_ que emite no máximo um resultado. Isso quer dizer que quando você faz a operação e essa operação retorna um Mono, você vai ter 0 ou 1 resultado.

```java
Mono<String> myStringMono = Mono.just("Beatriz");
```

Você pode fazer operações nesse resultado. Por exemplo, eu recebo uma String mas eu quero retornar uma lista com essa única String, eu posso fazer usando o operador flatMap e map. Com o flatMap você vai manipular o publisher em si.

```java
Mono<List<String>> listMono = stringMono.flatMap(s -> Mono.just(Arrays.asList(s)));
```

Com o map você vai converter cada item na _stream_ para um item de saída diferente.

```java
Mono<List<String>> listMono1 = stringMono.map(s -> Arrays.asList(s));
```

Em geral, você vai conseguir usar os dois de maneira similar, apesar de que, comumente a definição é algo parecida com isso:

> map para transformações síncronas e não blocantes (1 - 1)

> flatMap para transformações assíncronas e não blocantes (1 - N) (1 - N se refere que para cada item do fluxo será transformado em um novo Publisher, quando usamos Mono esse publisher só terá um item então ficará muito próximo a um map assíncrono, na verdade)

Um exemplo de quase a mesma coisa só que mais verboso:

**RESPOSTA**

```json
{
  "page": {
    "pageNumber": 1,
    "pageSize": 1,
    "totalElements": 1
  },
  "result": {
    "code": "ABC",
    "name": "ABC S.A"
  }
}
```

**MEU OBJETO**

```json
{
  "company": {
    "code": "ABC",
    "name": "ABC S.A"
  }
}
```

Eu tenho um método chamado _getResponse()_ que me retorna uma instância de `Mono<MyApiResponse>`. Eu irei usar flatMap e map para retornar `Mono<MyObject>`

```java
public Mono<MyObject> example() {
    return getResponse().flatMap(res -> {
        MyApiResponse.Result result = res.getResult();
        MyObject myObject = MyObject.builder()
                .withCompany(result.getCode(), result.getName())
                .build();
        return Mono.just(myObject);
    });
}
```

```java
public Mono<MyObject> example2() {
    return getResponse().map(res -> {
        MyApiResponse.Result result = res.getResult();
        MyObject myObject = MyObject.builder()
                .withCompany(result.getCode(), result.getName())
                .build();
        return myObject;
    });
}
```

Agora com um exemplo em que eles dariam resultados diferentes:

Eu tenho um método responsável por fazer uma chamada HTTP Get (Depois eu falarei mais sobre o WebClient)

```java
public <T> Mono<T> doGetRequest(String url, Class<T> responseType) {
    return webClient.get()
            .uri(url)
            .retrieve()
            .bodyToMono(responseType);
}
```

E eu tenho uma api com dois endpoints: `/user` que me retorna o ID do usuário e `/user/{userId}` que retorna detalhes do usuário.

Ao usar o meu método com os dois acima, eu obteria um resultado diferente para cada um.


```java
public Mono<Void> example3() {
    String userUrl = "test/user";
    String userDetailUrl = "test/user/{userId}";

    Mono<Mono<UserDetailResponse>> userDetailResponseMono = doGetRequest(userUrl, UserApiResponse.class)
            .map(userApiResponse -> doGetRequest(userDetailUrl
                    .replace("{userId}", userApiResponse.getUserId()),
                UserDetailResponse.class));

    Mono<UserDetailResponse> userDetailResponseMono1 = doGetRequest(userUrl, UserApiResponse.class)
            .flatMap(userApiResponse -> doGetRequest(userDetailUrl
                        .replace("{userId}", userApiResponse.getUserId()),
                    UserDetailResponse.class));

    return null;
}
```

Eu acho que esse é um resumo bom o suficiente do básico.

O Flux é um _publisher_ que emite N resultados. Você pode ter 0, 1, 2... N resultados dentro de um Flux.

O Flux tem os mesmos métodos map e flatMap que eu citei para o Mono então não irei elaborar muito sobre isso. Vou mostrar como pode ser usado.

Vamos imaginar um cenário em que eu já recuperei uma lista dos usuários e eu quero usar isso para fazer várias chamadas assíncronas e paralelas, é basicamente isso que o código a seguir faz.

```java
public Flux<Void> example4() {
    String userDetailUrl = "test/user/{userId}";
    List<String> userIds = getUserIds();
    Flux<UserDetailResponse> userDetailResponseFlux = Flux.fromIterable(userIds)
            .flatMap(userId -> doGetRequest(userDetailUrl.replace("{userId}", userId),
                    UserDetailResponse.class));

    return null;
}
```

O Flux tem alguns operadores que o Mono não tem, como por exemplo `.collectList()`

```java
Mono<List<UserDetailResponse>> userDetailResponseList = userDetailResponseFlux.collectList();
```

Meio auto-explicativo, mas esse operador vai transformar aquela stream de informações com N itens em um Publisher (nesse caso, Mono) que vai ter um item, sendo esse item a lista dos objetos que haviam sido recebidos.

> Imagine que ao invés de um Flux iterando essa lista de ids você tem um forEach e para cada id você vai faz uma requisição e precisa que ela finalize para ir pra próxima (that being, blocante). Só pra imaginar mesmo.

Um outro cenário:

Chamadas paralelas, para destinos diferentes, que retornam coisas diferentes mas que você precisa para montar seu objeto final.

```java
public void example5() {
    String url1 = "test/user/1";
    String url2 = "test/user/1/history";

    Mono<Tuple2<String, String>> stringTuple2 = Mono.zip(doGetRequest(url1, String.class), 
                                                         doGetRequest(url2, String.class));
}
```

No exemplo acima nós temos uma Tuple (que, se não me engano, está também presente no Java 17) que é obtida ao utilizar o operador zip com dois métodos que retornam Mono. A Tuple é basicamente uma estrutura de tamanho fixo que consegue abrigar objetos de tipos diferentes. No caso acima, eu vou ter uma Tuple de tamanho 2 com duas Strings, porque eu cansei de criar objetos arbitrários.

É possível recuperar os resultados da Tuple para retornar outras coisas, como, por exemplo, uma lista de strings:

```java
public void example5() {
    String url1 = "test/user/1";
    String url2 = "test/user/1/history";

    Mono<Tuple2<String, String>> stringTuple2 = Mono.zip(doGetRequest(url1, String.class), 
                                                         doGetRequest(url2, String.class));

    Mono<List<String>> listMono = stringTuple2.flatMap(tuples -> {
            String firstString = tuples.getT1();
            String secondString = tuples.getT2();
            List<String> myList = new ArrayList<>();
            myList.add(firstString);
            myList.add(secondString);
            return Mono.just(myList);
    });
}
```
_A Tuple do Reactor pode ter até 8 elementos._

Isso pode ser útil quando você precisa montar um objeto de resposta que necessita de muitas informações de vários lugares. Dessa forma, você realiza as chamadas paralelamente e pode manuseá-los à sua vontade.

### WebClient 
Basicamente você faz uma chamada, é isso.

No exemplo seguinte, a gente tem um WebClient que nós usamos pra fazer uma chamada POST.
- _uri_ se refere a url a que será feita a requisição
- _bodyValue_ o objeto a ser enviado na requisição
- _retrieve_ vai recuperar a informação
- _toEntity_ vai transformar o objeto num ResponseEntity
- O retorno final é um `Mono<ResponseEntity<Object>>`

```java
Mono<ResponseEntity<Object>> object = webClient.post()
        .uri(url)
        .bodyValue(new Object())
        .retrieve()
        .toEntity(Object.class);
```

Para adicionar headers existem dois operadores que você pode usar 

- _header_ Adicionar um header com a chave e o valor
- _headers_ Adicionar todos os headers em um HttpHeaders


```java
Mono<ResponseEntity<Object>> object = webClient.post()
        .uri(url)
        .bodyValue(new Object())
        .header("Authorization", bearerToken)
        .retrieve()
        .toEntity(Object.class);
```



```java
Mono<ResponseEntity<Object>> object = webClient.post()
        .uri(url)
        .bodyValue(new Object())
        .headers(h -> h.addAll(headers))
        .retrieve()
        .toEntity(Object.class);
```

Você também pode tratar os diferentes status code de erro diretamente no fluxo reativo. Por exemplo, se eu quisesse lançar uma exceção ao receber status 500:

```java
Mono<ResponseEntity<Object>> object = webClient.post()
        .uri(url)
        .bodyValue(new Object())
        .headers(h -> h.addAll(headers))
        .retrieve()
        .onStatus(HttpStatusCode::isError, ex -> new ApiResponseException("API ERROR"))
        .toEntity(Object.class);
```
O _onStatus_ tem a opção de vários status code mas de maneira genérica, como isError, is4xxClientError e is2xxSuccessful.

Você também pode tratar os erros de status code mais específicos dessa forma:

```java
Mono<ResponseEntity<Object>> object = webClient.post()
        .uri(url)
        .bodyValue(new Object())
        .headers(h -> h.addAll(headers))
        .retrieve()
        .onStatus(HttpStatus.BAD_GATEWAY::equals, ex -> new ApiResponseException("API ERROR"))
        .toEntity(Object.class);
```

Também é possível retornar somente somente um Mono, sem o wrapper ResponseEntity.

```java
Mono<Object> objectMono = webClient.get()
        .uri(url)
        .retrieve()
        .bodyToMono(Object.class);
```

**Tratamento de erros**


```java
Mono<ResponseEntity<Object>> responseEntityMono = webClient.get()
        .uri(url)
        .retrieve()
        .toEntity(Object.class)
        .onErrorResume(WebClientResponseException.class, ex -> Mono.just(ResponseEntity.status(ex.getStatusCode()).build()));
```

Também existem os métodos doOnSucess e doOnError, em geral eles não retornam nada, servem somente para fazer alguma ação que não necessariamente retorna algo (side-effects)

```java
Mono<ResponseEntity<Object>> responseEntityMono = webClient.get()
        .uri(url)
        .retrieve()
        .toEntity(Object.class)
        .doOnSuccess(r -> logger.info("Sucess"))
        .doOnError(r -> logger.info("Error"));
```

Aqui está a configuração do WebClient que eu geralmente uso:

```java
@Component
public class WebClientBean {

    @Bean
    public WebClient webClient() {
        HttpClient httpClient = HttpClient.create().resolver(DefaultAddressResolverGroup.INSTANCE);
        return WebClient.builder()
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .build();
    }
}
```