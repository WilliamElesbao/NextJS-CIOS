# TM-CIOS - USER GUIDE

## Login 🔐

O login só pode ser realizado com uma conta ***@tmsa.ind.br***. Clique no botão "**Entrar com Microsoft**". Se ainda não estiver logado na plataforma, você será redirecionado para a tela de *login/autenticação* da *Microsoft*. Após conluir o login, você será redirecionado automaticamente para a plataforma CIOS.

![login-page.png](/tm-cios/login-page.png)

## Primeiros Passos 🚶🏻

Ao acessar o sistema pela primeira vez, você verá a seguinte tela:

Na esquerda, encontra-se a barra lateral com as opções de navegação. Vá em "**Settings**" para acessar a tela de Configurações, onde configuraremos alguns equipamentos para controle e os motivos das movimentações de entrada e saída (check-in e check-out, respectivamente).

![dashboard-page.png](/tm-cios/dashboard-page.png)

### Configurando Motivos e Equipamentos ⚙️

##### Motivos 🗒️

Nessa primeira versão, podemos realizar as configurações de motivos e equipamentos.  
Clique em **Novo** para abrir o formulário para cadastrar um novo motivo, insira o **Nome do motivo** e a **Descrição do motivo** e clique em **Cadastrar**

Após cadastrar o motivo o mesmo será exibido na tabela junto aos demais já cadastrados.

![reasons-session.png](/tm-cios/reasons-session.png)

##### Equipamentos 💻

O passo a passo para cadastrar um **Equipamento** são os mesmos para cadastrar um **Motivo**, porém na sessão de Equipamentos. Aqui está um equipamento já cadastrado.

![equipment-session.png](/tm-cios/equipment-session.png)

O sistema busca com base nos *usuários* que acessaram e os lista no *primeiro seletor*, e no seletor à *direita* indica as *permissões/privilégios deste usuário*.

**Técnico**: pode criar, visualizar e editar somente status de associado ou não um determinado equipamento à um usuário vinculado à um registro.

**Administrador**: tem as mesmas permissões do Técnico, porém pode editar a condição dos equipamentos entre **NOVO | USADO | DESCARTE** e o fluxo deste equipamento **CHECK-IN** (entrada) | **CHECK-OUT** (saída)

![permission-session.png](/tm-cios/permission-session.png)

### Criando um Registro 📑

Na barra de navegação à esquerda, selecione "**Registro**" para acessar a tela de Registros e criar um **registro**.

Clique em **Novo**

![record-page.png](/tm-cios/record-page.png)

Aqui está um exemplo de criação de um registro:

> Todos os campos obrigatórios serão destacados caso haja a tentativa de submeter/enviar/salvar um registro onde há a pendência de preenchimento do campo solicitado.

-   **Detalhes da entrega**
    
    -   ***Quem entregou*** → Funcionário responsável pela entrega
    -   ***Comodatário*** → Dono/Utilizador do(s) equipamento(s)
    -   ***Centro de Custo*** → Centro de custo do comodatário
    -   ***Gestor*** → Gestor do comodatário
    -   ***Data*** → Data da entrega/recebimento dos equipamentos
    -   ***Turno*** → Turno desta entrega/recebimento dos equipamentos
-   **Chamado relacionado**
    
    -   ***Número do chamado (SATI)*** → número do chamado que está relacionado com esse registro
    -   ***Observaçõe gerais*** → comentário adicional para descrever detalhes para esse registro.
-   ***Sessão para cadastrar os equipamentos relacionados à esse registro***
    
    -   Essa sessão é dedicada para cadastrar equipamentos que estão relacionados com esse registro, caso precise adicionar mais linhas/equipamentos, clique em ***\+ Linha*** e, para remover, clique no ícone de ***lixeira*** para excluir a linha/equipamento desejado.
-   ***Abaixo da lista de equipamentos, é possível anexar as imagens dos equipamentos para salvar junto à esse registro***
    
    -   Exemplo na imagem abaixo:

![new-record-page.png](/tm-cios/new-record-page.png)

Após finalizar a criação do registro, você será redirecionado automaticamente para a tela inicial da seção "**Registros**". Um **e-mail será enviado** ao c**olaborador responsável pela entrega** **e** ao colaborador marcado como **comodatário dos equipamentos**.

Um exemplo de como o e-mail é enviado:

O e-mail separa e agrupa automaticamente os equipamentos que foram selecionado como **Entrada (Check-in)** e como **Saída (Check-out)** e os exibe no e-mail separadamente.

![e-mail-example.png](/tm-cios/e-mail-example.png)

### Visualizando Registro

Na tela de registros, há 4 abas:

-   **Todos os registros**: Todos os registros criados.
-   **Entrada**: Todos os equipamentos com status de **Entrada check-in**.
-   **Saída**: Todos os equipamentos com status de **Saída check-out**.
-   **Descarte**: Todos os equipamentos com status de **Descarte**.

![record-page-tabs.png](/tm-cios/record-page-tabs.png)

Para visualizar os detalhes de um registro, clique nos três pontinhos **"..."** na linha do registro desejado e selecione "***Visualizar Registros Vinculados***".

Você será redirecionado para a tela que exibe os detalhes daquele registro e outros registros associados ao usuário (comodatário).

![view-record-details.png](/tm-cios/view-record-details.png)

Nessa tela com os detalhes do registro é possível **dissociar um equipamento que anteriormente estava associado ao comodatário**.

Clique no botão para dissociar e o status será atualizado e uma mensagem será exibida, informando que o status foi atualizado.

![is-associated-true.png](/tm-cios/is-associated-true.png)  
![is-associated-true.png](/tm-cios/is-associated-false.png)

> Um usuário com permissão de Administrador agora pode alterar alguns status, como Condição e Fluxo, como mostra o exemplo abaixo:

Clique sobre o badge com o status e um seletor para alterar será exibido. Basta alterar o status e o mesmo será atualizado.

![admin-can-edit-flow-and-condition.png](/tm-cios/admin-can-edit-flow-and-condition.png)

### Dashboard

-   **Cards superiores (Novos | Usados)**
    -   Esses cards são renderizados para cada equipamento cadastrado;
    -   Os cards contabilizam os equipamentos com status (flow/fluxo) de **Entrada (Check-in)**, equipamentos que **Não estão associados ao usuário** e os separa entre **Novo** e **Usado** conforme informado na criação do registro.

> Equipamentos com status de **Associado à algum usuário**, status de **Saída (Check-out)** e status de **Descarte** não são considerados nesta contagem.

> O Funcionamento dos cards consiste em, relacionar para cada equipamento o seu respectivo **Serial Number** e **Patrimônio** com base nisso, é verificado o último status para esse equipamento e caso seu último status seja: **Entrada (Check-in)** e **Não associado** ele contabiliza e depois os separa entre **Novo** e **Usado**.

-   **Card à direita**
    
    -   exibe os detalhes do **último registro criado**, bem como, seus equipamentos selecionados como **Entrada (Check-in)** e seus equipamentos selecionados como **Saída (Check-out)**, **caso existam**.
    -   Exibe, também, os **Anexos relacionados** à esse registro, **caso existam**.
-   **Tabela**
    
    -   A tabela exibe os **últimos 5 registros** criados e, no **card à direita**, os **detalhes do último registro criado**.

![dashboard-page-dark-blue.png](/tm-cios/dashboard-page-dark-blue.png)

### Sing Out

Para sair da aplicação, clique sobre sua **Foto de perfil** e selecione "**Sair**". Você será **redirecionado** novamente para a tela de **SignIn/Login**.

![login-page-dark-orange.png](/tm-cios/signout.png)  
![login-page-dark-orange.png](/tm-cios/login-page-dark-orange.png)

### Extras

#### Temas

Os temas podem ser acessados no menu de navegação à esquerda na parte inferior

![themes.png](/tm-cios/themes.png)

> Projeto para controle de entrada e saída de equipamentos da TI visando manter a relação das movimentações destes equipamentos relacionando-os com os funcionários.

> Project and Documentation developed by: William Elesbão - 2024/July
