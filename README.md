<h1 class="toc-header" id="tm-cios-user-guide"> TM-CIOS - USER GUIDE</h1>
<h2 class="toc-header" id="login"> Login 🔐</h2>
<p>O login só pode ser realizado com uma conta <em><strong>@tmsa.ind.br</strong></em>. Clique no botão "<strong>Entrar com Microsoft</strong>". Se ainda não estiver logado na plataforma, você será redirecionado para a tela de <em>login/autenticação</em> da <em>Microsoft</em>. Após conluir o login, você será redirecionado automaticamente para a plataforma CIOS.</p>
<p><img alt="login-page.png" src="/tm-cios/login-page.png"></p>
<h2 class="toc-header" id="primeiros-passos"> Primeiros Passos 🚶🏻</h2>
<p>Ao acessar o sistema pela primeira vez, você verá a seguinte tela:</p>
<p>Na esquerda, encontra-se a barra lateral com as opções de navegação. Vá em "<strong>Settings</strong>" para acessar a tela de Configurações, onde configuraremos alguns equipamentos para controle e os motivos das movimentações de entrada e saída (check-in e check-out, respectivamente).</p>
<p><img alt="dashboard-page.png" src="/tm-cios/dashboard-page.png"></p>
<h3 class="toc-header" id="configurando-motivos-e-equipamentos-️"> Configurando Motivos e Equipamentos ⚙️</h3>
<h5 class="toc-header" id="motivos-️"> Motivos 🗒️</h5>
<p>Nessa primeira versão, podemos realizar as configurações de motivos e equipamentos.<br>
Clique em <strong>Novo</strong> para abrir o formulário para cadastrar um novo motivo, insira o <strong>Nome do motivo</strong> e a <strong>Descrição do motivo</strong> e clique em <strong>Cadastrar</strong></p>
<p>Após cadastrar o motivo o mesmo será exibido na tabela junto aos demais já cadastrados.</p>
<p><img alt="reasons-session.png" src="/tm-cios/reasons-session.png"></p>
<h5 class="toc-header" id="equipamentos"> Equipamentos 💻</h5>
<p>O passo a passo para cadastrar um <strong>Equipamento</strong> são os mesmos para cadastrar um <strong>Motivo</strong>, porém na sessão de Equipamentos. Aqui está um equipamento já cadastrado.</p>
<p><img alt="equipment-session.png" src="/tm-cios/equipment-session.png"></p>
<p>O sistema busca com base nos <em>usuários</em> que acessaram e os lista no <em>primeiro seletor</em>, e no seletor à <em>direita</em> indica as <em>permissões/privilégios deste usuário</em>.</p>
<p><strong>Técnico</strong>: pode criar, visualizar e editar somente status de associado ou não um determinado equipamento à um usuário vinculado à um registro.</p>
<p><strong>Administrador</strong>: tem as mesmas permissões do Técnico, porém pode editar a condição dos equipamentos entre <strong>NOVO | USADO | DESCARTE</strong> e o fluxo deste equipamento <strong>CHECK-IN</strong> (entrada) | <strong>CHECK-OUT</strong> (saída)</p>
<p><img alt="permission-session.png" src="/tm-cios/permission-session.png"></p>
<h3 class="toc-header" id="criando-um-registro"> Criando um Registro 📑</h3>
<p>Na barra de navegação à esquerda, selecione "<strong>Registro</strong>" para acessar a tela de Registros e criar um <strong>registro</strong>.</p>
<p>Clique em <strong>Novo</strong></p>
<p><img alt="record-page.png" src="/tm-cios/record-page.png"></p>
<p>Aqui está um exemplo de criação de um registro:</p>
<blockquote class="is-warning">
<p>Todos os campos obrigatórios serão destacados caso haja a tentativa de submeter/enviar/salvar um registro onde há a pendência de preenchimento do campo solicitado.</p>
</blockquote>
<ul>
<li>
<p><strong>Detalhes da entrega</strong></p>
<ul>
<li><em><strong>Quem entregou</strong></em> → Funcionário responsável pela entrega</li>
<li><em><strong>Comodatário</strong></em> → Dono/Utilizador do(s) equipamento(s)</li>
<li><em><strong>Centro de Custo</strong></em> → Centro de custo do comodatário</li>
<li><em><strong>Gestor</strong></em> → Gestor do comodatário</li>
<li><em><strong>Data</strong></em> → Data da entrega/recebimento dos equipamentos</li>
<li><em><strong>Turno</strong></em> → Turno desta entrega/recebimento dos equipamentos</li>
</ul>
</li>
<li>
<p><strong>Chamado relacionado</strong></p>
<ul>
<li><em><strong>Número do chamado (SATI)</strong></em> → número do chamado que está relacionado com esse registro</li>
<li><em><strong>Observaçõe gerais</strong></em> → comentário adicional para descrever detalhes para esse registro.</li>
</ul>
</li>
<li>
<p><em><strong>Sessão para cadastrar os equipamentos relacionados à esse registro</strong></em></p>
<ul>
<li>Essa sessão é dedicada para cadastrar equipamentos que estão relacionados com esse registro, caso precise adicionar mais linhas/equipamentos, clique em <em><strong>+ Linha</strong></em> e, para remover, clique no ícone de <em><strong>lixeira</strong></em> para excluir a linha/equipamento desejado.</li>
</ul>
</li>
<li>
<p><em><strong>Abaixo da lista de equipamentos, é possível anexar as imagens dos equipamentos para salvar junto à esse registro</strong></em></p>
<ul>
<li>Exemplo na imagem abaixo:</li>
</ul>
</li>
</ul>
<p><img alt="new-record-page.png" src="/tm-cios/new-record-page.png"></p>
<p>Após finalizar a criação do registro, você será redirecionado automaticamente para a tela inicial da seção "<strong>Registros</strong>". Um <strong>e-mail será enviado</strong> ao c<strong>olaborador responsável pela entrega</strong> <strong>e</strong> ao colaborador marcado como <strong>comodatário dos equipamentos</strong>.</p>
<p>Um exemplo de como o e-mail é enviado:</p>
<p>O e-mail separa e agrupa automaticamente os equipamentos que foram selecionado como <strong>Entrada (Check-in)</strong> e como <strong>Saída (Check-out)</strong> e os exibe no e-mail separadamente.</p>
<p><img alt="e-mail-example.png" src="/tm-cios/e-mail-example.png"></p>
<h3 class="toc-header" id="visualizando-registro"> Visualizando Registro</h3>
<p>Na tela de registros, há 4 abas:</p>
<ul>
<li><strong>Todos os registros</strong>: Todos os registros criados.</li>
<li><strong>Entrada</strong>: Todos os equipamentos com status de <strong>Entrada check-in</strong>.</li>
<li><strong>Saída</strong>: Todos os equipamentos com status de <strong>Saída check-out</strong>.</li>
<li><strong>Descarte</strong>: Todos os equipamentos com status de <strong>Descarte</strong>.</li>
</ul>
<p><img alt="record-page-tabs.png" src="/tm-cios/record-page-tabs.png"></p>
<p>Para visualizar os detalhes de um registro, clique nos três pontinhos <strong>"..."</strong> na linha do registro desejado e selecione "<em><strong>Visualizar Registros Vinculados</strong></em>".</p>
<p>Você será redirecionado para a tela que exibe os detalhes daquele registro e outros registros associados ao usuário (comodatário).</p>
<p><img alt="view-record-details.png" src="/tm-cios/view-record-details.png"></p>
<p>Nessa tela com os detalhes do registro é possível <strong>dissociar um equipamento que anteriormente estava associado ao comodatário</strong>.</p>
<p>Clique no botão para dissociar e o status será atualizado e uma mensagem será exibida, informando que o status foi atualizado.</p>
<p><img alt="is-associated-true.png" src="/tm-cios/is-associated-true.png"><br>
<img alt="is-associated-true.png" src="/tm-cios/is-associated-false.png"></p>
<blockquote class="is-info">
<p>Um usuário com permissão de Administrador agora pode alterar alguns status, como Condição e Fluxo, como mostra o exemplo abaixo:</p>
</blockquote>
<p>Clique sobre o badge com o status e um seletor para alterar será exibido. Basta alterar o status e o mesmo será atualizado.</p>
<p><img alt="admin-can-edit-flow-and-condition.png" src="/tm-cios/admin-can-edit-flow-and-condition.png"></p>
<h3 class="toc-header" id="dashboard"> Dashboard</h3>
<ul>
<li><strong>Cards superiores (Novos | Usados)</strong>
<ul>
<li>Esses cards são renderizados para cada equipamento cadastrado;</li>
<li>Os cards contabilizam os equipamentos com status (flow/fluxo) de <strong>Entrada (Check-in)</strong>, equipamentos que <strong>Não estão associados ao usuário</strong> e os separa entre <strong>Novo</strong> e <strong>Usado</strong> conforme informado na criação do registro.</li>
</ul>
</li>
</ul>
<blockquote class="is-info">
<p>Equipamentos com status de <strong>Associado à algum usuário</strong>, status de <strong>Saída (Check-out)</strong> e status de <strong>Descarte</strong> não são considerados nesta contagem.</p>
</blockquote>
<blockquote class="is-warning">
<p>O Funcionamento dos cards consiste em, relacionar para cada equipamento o seu respectivo <strong>Serial Number</strong> e <strong>Patrimônio</strong> com base nisso, é verificado o último status para esse equipamento e caso seu último status seja: <strong>Entrada (Check-in)</strong> e <strong>Não associado</strong> ele contabiliza e depois os separa entre <strong>Novo</strong> e <strong>Usado</strong>.</p>
</blockquote>
<ul>
<li>
<p><strong>Card à direita</strong></p>
<ul>
<li>exibe os detalhes do <strong>último registro criado</strong>, bem como, seus equipamentos selecionados como <strong>Entrada (Check-in)</strong> e seus equipamentos selecionados como <strong>Saída (Check-out)</strong>, <strong>caso existam</strong>.</li>
<li>Exibe, também, os <strong>Anexos relacionados</strong> à esse registro, <strong>caso existam</strong>.</li>
</ul>
</li>
<li>
<p><strong>Tabela</strong></p>
<ul>
<li>A tabela exibe os <strong>últimos 5 registros</strong> criados e, no <strong>card à direita</strong>, os <strong>detalhes do último registro criado</strong>.</li>
</ul>
</li>
</ul>
<p><img alt="dashboard-page-dark-blue.png" src="/tm-cios/dashboard-page-dark-blue.png"></p>
<h3 class="toc-header" id="sing-out"> Sing Out</h3>
<p>Para sair da aplicação, clique sobre sua <strong>Foto de perfil</strong> e selecione "<strong>Sair</strong>". Você será <strong>redirecionado</strong> novamente para a tela de <strong>SignIn/Login</strong>.</p>
<p><img alt="login-page-dark-orange.png" src="/tm-cios/signout.png"><br>
<img alt="login-page-dark-orange.png" src="/tm-cios/login-page-dark-orange.png"></p>
<h3 class="toc-header" id="extras"> Extras</h3>
<h4 class="toc-header" id="temas"> Temas</h4>
<p>Os temas podem ser acessados no menu de navegação à esquerda na parte inferior</p>
<p><img alt="themes.png" src="/tm-cios/themes.png"></p>
<blockquote>
<p>Projeto para controle de entrada e saída de equipamentos da TI visando manter a relação das movimentações destes equipamentos relacionando-os com os funcionários.</p>
</blockquote>
<blockquote>
<p>Versão 0.0.1 - © 2024 | Desenvolvido por TI - TMSA</p>
</blockquote>
<blockquote>
<p>Project and Documentation developed by: William Elesbão - 2024/July</p>
</blockquote>
