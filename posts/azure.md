---
title: "Estudos para AZ-204"
subtitle: "Devaneios de alguém que gosta de escrever"
date: "2024-01-14"
author: "Beatriz Gracia"
tags: ["pessoal", "azure"]
---

Onde eu trabalho existem aquelas auto-avaliações de desempenho semestralmente. E eu, como jovem, ingênua que sou, decidi colocar que iria tirar a AZ-204 nesse semestre que estamos. Amanhã eu irei fazer o pedido do voucher mas pasme, para poder fazer a prova e realmente tirar a certificação, vou ter que estudar. Esse post na verdade não será um post, será mais como um diário com as minhas anotações até então. Algumas serão retroativas visto que já estou estudando há alguns dias mas de resto, como diria Ludmilla, é hoje (ou pelo menos se inicia).

## Conteúdos
_A divisão de conteúdos será feita pela divisão da própria prova e algumas anotações do lab da OReilly. Todo conteúdo é baseado na documentação e nos guias do Microsoft Learning_

1. [Implement Azure App Service Web Apps](#implement-azure-app-service-web-apps)
2. [Connect to and Consume Azure Services and Third-Party Services](#connect-to-and-consume-azure-services-and-third-party-services)
3. [Develop Azure Compute Solutions](#develop-azure-compute-solutions)
4. [Develop for Azure storage](#develop-for-azure-storage)
5. [Develop solutions that use Azure Blob Storage](#develop-solutions-that-use-azure-blob-storage)
6. [Implement Azure App Service Web Apps](#implement-azure-app-service-web-apps)
7. [Implement Azure Functions](#implement-azure-functions)
8. [Implement Azure Security](#implement-azure-security)
9. [Monitor, troubleshoot, and optimize Azure Solutions](#monitor-troubleshoot-and-optimize-azure-solutions)

## Implement Azure App Service Web Apps
**Objetivos:**
- Descrever os componentes chave do Azure App Service
- Explicar como que o Azure App Service lida com atenticação e autorização
- Identificar métodos de controle de tráfego inbound e outbound na aplicação
- Deploy de uma aplicação para o App Service usando linha de comando

#### Pontos Iniciais
> Azure App Service is an HTTP-based service for hosting web applications, REST APIs, and mobile back ends. You can develop in your favorite programming language or framework. Applications run and scale with ease on both Windows and Linux-based environments. - Microsoft Learning

- Suporte default para auto-scaling
- Suporte para CI/CD

**LINUX**
- Pode hospedar nativamente no Linux
- Suporte para containeres Linux (WebApp for Containers)
_Recuperar lista_
```bash
az webapp list-runtimes --os-type linux
```
_Limitações_
- Não tem suporte no tier SHARED
- O portal da Azure só mostra features que estão habilitadas para o Linux
- Ao utilizar imagens built-in o código e os arquivos ficam alocados em um storage volume suportado pelo Azure Storage. A latência de disco é maior nesse volume então para um cenário de aplicações que exijam muita leitura de arquivos, o ideal é usar uma imagem personalizada.

_Criando um Service App_

```bash
New-AzWebApp -Name "NOME_UNICO" -ResourceGroupName "RESOURCE_GROUP" -AppServicePlan "SERVICE_PLAN_UTILIZADO"
```

#### Autenticação e Autorização
- É um módulo separado que pode ser habilitado (ou não)
- Autentica os usuários usando o ID (_Identity Provider_)
- Valida, guarda e atualiza os tokens
- Gerenci as sessões autenticadas
- Injeta as informações de identidade nos headers da requisição



## Connect to and Consume Azure Services and Third-Party Services
// TODO

## Develop Azure Compute Solutions
// TODO
## Develop for Azure storage
// TODO
## Develop solutions that use Azure Blob Storage
// TODO
## Implement Azure Functions
// TODO
## Implement Azure Security
// TODO
## Monitor, troubleshoot, and optimize Azure Solutions
// TODO