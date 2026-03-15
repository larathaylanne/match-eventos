# Histórias de Usuário — ArenaMatch

## Sobre o Projeto

O **ArenaMatch** é uma plataforma digital que conecta usuários aos eventos que acontecem na Arena de Pernambuco.  
O sistema recomenda eventos com base nos interesses dos usuários e permite que eles indiquem interesse ou confirmem presença em eventos.

O objetivo da plataforma é **aumentar a ocupação da Arena de Pernambuco**, facilitando a descoberta de eventos e promovendo maior engajamento do público.

---

# Histórias de Usuário

## História 1 — Criar conta

**Como** visitante da plataforma  
**Quero** criar uma conta  
**Para** acessar recomendações de eventos da Arena de Pernambuco.

### Cenário BDD

Cenário: Criar conta com sucesso  

Dado que estou na página inicial  
Quando clico no botão "Criar conta"  
E preencho meus dados corretamente  
Então minha conta deve ser criada com sucesso  

---

## História 2 — Fazer login

**Como** usuário cadastrado  
**Quero** fazer login na plataforma  
**Para** acessar minhas recomendações de eventos.

### Cenário BDD

Cenário: Login realizado com sucesso  

Dado que possuo uma conta cadastrada  
Quando informo meu email e senha  
Então devo acessar minha conta no sistema  

---

## História 3 — Selecionar interesses

**Como** usuário  
**Quero** selecionar meus interesses  
**Para** receber recomendações de eventos relevantes.

### Cenário BDD

Cenário: Escolher interesses  

Dado que estou configurando meu perfil  
Quando seleciono categorias de interesse  
Então o sistema deve salvar minhas preferências  

---

## História 4 — Visualizar eventos recomendados

**Como** usuário  
**Quero** visualizar eventos recomendados  
**Para** descobrir atividades na Arena de Pernambuco.

### Cenário BDD

Cenário: Visualizar lista de eventos  

Dado que estou logado no sistema  
Quando acesso a página de eventos  
Então devo visualizar eventos recomendados para mim  

---

## História 5 — Demonstrar interesse em um evento

**Como** usuário  
**Quero** indicar interesse em um evento  
**Para** salvar o evento em minha lista.

### Cenário BDD

Cenário: Curtir evento  

Dado que estou visualizando um evento  
Quando clico no botão "Tenho interesse"  
Então o evento deve ser salvo na minha lista de interesse  

---

## História 6 — Ver número de participantes

**Como** usuário  
**Quero** visualizar quantas pessoas confirmaram presença  
**Para** saber o nível de popularidade do evento.

### Cenário BDD

Cenário: Visualizar participantes  

Dado que estou na página de um evento  
Quando visualizo suas informações  
Então devo ver a quantidade de participantes confirmados  

---

## História 7 — Confirmar presença em evento

**Como** usuário  
**Quero** confirmar presença em um evento  
**Para** indicar que estarei presente.

### Cenário BDD

Cenário: Confirmar presença  

Dado que estou visualizando um evento  
Quando clico em "Confirmar presença"  
Então devo ser adicionado à lista de participantes  

---

## História 8 — Visualizar pessoas que irão ao evento

**Como** usuário  
**Quero** visualizar quem também irá ao evento  
**Para** encontrar amigos ou pessoas com interesses semelhantes.

### Cenário BDD

Cenário: Visualizar lista de participantes  

Dado que estou na página de um evento  
Quando acesso a lista de participantes  
Então devo visualizar usuários que aceitaram aparecer publicamente  

---

## História 9 — Receber recomendações de novos eventos

**Como** usuário  
**Quero** receber recomendações de novos eventos  
**Para** descobrir atividades futuras na Arena.

### Cenário BDD

Cenário: Receber recomendação  

Dado que tenho interesses cadastrados  
Quando novos eventos são adicionados  
Então devo receber recomendações relevantes  

---

## História 10 — Visualizar meus eventos salvos

**Como** usuário  
**Quero** visualizar eventos que demonstrei interesse  
**Para** acompanhar eventos que pretendo participar.

### Cenário BDD

Cenário: Visualizar eventos salvos  

Dado que estou logado no sistema  
Quando acesso minha lista de eventos  
Então devo visualizar eventos que marquei como interesse
