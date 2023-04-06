# Sistema de Controle de Ar-Condicionado

O Sistema de Controle de Ar-Condicionado é uma solução desenvolvida por [Ruan Gustavo](mailto:ruan.gustavo@escolar.ifrn.edu.br) e
[Marcos Fábio](mailto:marcos.fabio@escolar.ifrn.edu.br) para a tarefa manual de desligar os aparelhos de ar-condicionado no Instituto Federal do Rio Grande do Norte. Este microserviço back-end é responsável por gerenciar e controlar os ar-condicionados do _campus_ remotamente por meio do protocolo MQTT.

## Sumário

- [Visão geral](#visão-geral)
- [Tecnologias](#tecnologias)
- [Funcionalidades](#funcionalidades)

## Visão geral

Na escola IFRN, gerenciar e desligar os aparelhos de ar-condicionado é uma tarefa manual e demorada. Este projeto visa automatizar e simplificar o processo, fornecendo uma interface administrativa para controlar os aparelhos de ar-condicionado remotamente. Este microserviço back-end se comunica com o aplicativo front-end e os microcontroladores `ESP8266` nos aparelhos de ar-condicionado para fornecer um controle e gerenciamento dos dispositivos.

## Tecnologias

- **Protocolo MQTT:** Um protocolo de mensagens utilizado para comunicação entre o microserviço back-end e os microcontroladores ESP8266 nos aparelhos de ar-condicionado.

- **Express.js:** Um framework de aplicação web minimalista e flexível para Node.js, usado na criação de APIs RESTful que servem como back-end para o sistema de controle de ar-condicionado.

- **PostgresSQL:** Um banco de dados SQL, utilizado para armazenar e gerenciar informações dos aparelhos de ar-condicionado e usuários.

## Funcionalidades

- **Controle remoto dos aparelhos de ar-condicionado:** Ligar e desligar os aparelhos de ar-condicionado remotamente usando o protocolo MQTT.

- **Gerenciamento de aparelhos de ar-condicionado:** Adicionar, atualizar e excluir aparelhos de ar-condicionado, bem como gerenciar suas configurações.

- **Filtragem e ordenação:** Pesquisar e filtrar aparelhos de ar-condicionado por sala ou temperatura.

- **Autenticação:** Proteger o aplicativo através da implementação de autenticação e autorização de usuário.
