# api-disfrutaparaguay

Docs: https://disfruta-paraguay.gitbook.io/docs/

API - Disfruta Paraguay

## RFs (Requisitos funcionais)

- [] Deve ser possível se cadastrar;
- [] Deve ser possível se autenticar;
- [] Deve ser possível obter o perfil de um usuário logado;
- [] Deve ser possível visualizar eventos após fazer login;
- [] Deve ser possível buscar eventos pelo nome;
- [] Deve ser possível fazer parte de um evento;

## RNs (Regras de negócio)

- [] Usuário não deve visualizar eventos se não tiver sua filiação aprovada;
- [] Usuário não deve participar de eventos se não tiver sua filiação aprovada;
- [] Usuário deve verificar qual status de sua aplicação quando consultar;
- [] Usuário não pode se cadastrar com e-mail já existente;
- [] A aprovação de usuários na plataforma só pode ser feita por administradores;

## RNFs (Requisitos não funcionais)

- [] A senha do usuário precisa estar criptografada;
- [] Iremos utilizar PostgreSQL para a persistencia de dados;
- [] O usuário deve ser identificado por um JWT (JSON Web Token);
- [] Utilizaremos alguma estratégia de cache como Redis;
