# Game Update Server

Um servidor simples de atualização para jogos mobile (Android/Dalvik) com endpoints compatíveis e logging de acesso.

## Funcionalidades

O servidor fornece os seguintes endpoints para atualização de jogos:

- **GET `/live/{hash}`**: Retorna a versão atual do jogo (ex: `1.17.1`). O hash deve ser um valor hexadecimal com 64 caracteres.
- **GET `/fileinfo`**: Retorna a lista de arquivos do jogo com hashes e tamanhos no formato esperado pelo cliente.
- **GET `/versioninfo`**: Retorna apenas a string de versão.
- **GET `/logs`**: Retorna os últimos 100 logs de acesso (para monitoramento).

## Headers de Compatibilidade

Todos os endpoints retornam headers compatíveis com clientes Android/Dalvik:

- `Connection: Keep-Alive` - Mantém a conexão aberta
- `Keep-Alive: timeout=5, max=100` - Configuração de timeout
- `Cache-Control: no-cache, no-store, must-revalidate` - Previne cache
- `Access-Control-Allow-Origin: *` - Permite requisições CORS
- `Content-Type: text/plain; charset=utf-8` - Tipo de conteúdo

## Logging de Acesso

O servidor registra automaticamente todas as requisições com:

- **Timestamp**: Data e hora ISO 8601
- **Path**: Caminho da requisição
- **User-Agent**: String do cliente (ex: `Dalvik/2.1.0 (Linux; U; Android 15; SM-A145M)`)
- **Método HTTP**: GET, POST, OPTIONS, etc.
- **Status Code**: Código de resposta HTTP

Os logs são exibidos no console e armazenados em memória (últimos 1000 registros).

## Instalação Local

```bash
# Instalar dependências
pnpm install

# Executar em modo desenvolvimento
pnpm dev

# Executar testes
pnpm test

# Build para produção
pnpm build

# Executar em produção
pnpm start
```

## Deploy no Render

O projeto inclui um arquivo `render.yaml` pré-configurado para deploy automático no Render.

### Passos para Deploy:

1. Faça push do código para um repositório Git (GitHub, GitLab, etc.)
2. Acesse [render.com](https://render.com) e crie uma nova conta
3. Conecte seu repositório Git
4. Crie um novo "Web Service" apontando para este repositório
5. O Render detectará automaticamente o arquivo `render.yaml` e usará as configurações

### Variáveis de Ambiente

O servidor usa as seguintes variáveis de ambiente:

- `NODE_ENV`: Ambiente de execução (`development` ou `production`)
- `PORT`: Porta para o servidor (padrão: `3000`)

## Estrutura de Dados

### Formato do versioninfo

```
1.17.1
```

### Formato do fileinfo

```
gameassetbundles,mzZtylZ1fawV5N8D8XikRyF+5mY=,12060,0
main/gameentry,DZlCrLRuzwyuNzUZrh+p0QxJCcI=,2018,0
localization/loc,gWXz0dDNM8MJyFcAFhzbqWWqvrY=,632921,0
```

Cada linha contém: `nome_arquivo,hash_base64,tamanho_bytes,flags`

## Exemplos de Requisição

### Obter versão do jogo

```bash
curl -H "User-Agent: Dalvik/2.1.0 (Linux; U; Android 15; SM-A145M)" \
  "https://seu-servidor.onrender.com/live/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
```

### Obter lista de arquivos

```bash
curl -H "User-Agent: Dalvik/2.1.0 (Linux; U; Android 15; SM-A145M)" \
  "https://seu-servidor.onrender.com/fileinfo"
```

### Verificar logs de acesso

```bash
curl "https://seu-servidor.onrender.com/logs"
```

## Testes

O projeto inclui testes automatizados para validar:

- Compatibilidade com User-Agent Dalvik/Android
- Formato correto de respostas
- Headers CORS apropriados
- Logging de requisições

Execute os testes com:

```bash
pnpm test
```

## Arquivos Principais

- `server/gameRoutes.ts` - Definição dos endpoints e middlewares
- `server/gameData.ts` - Dados de versioninfo, fileinfo e logs
- `server/_core/index.ts` - Inicialização do servidor Express
- `server/gameRoutes.test.ts` - Testes dos endpoints
- `render.yaml` - Configuração de deploy para Render

## Notas de Segurança

- O endpoint `/logs` retorna os últimos 100 logs sem autenticação. Em produção, considere adicionar autenticação.
- Os dados de versão e arquivo são armazenados em memória. Para produção, considere usar um banco de dados.
- O servidor não implementa rate limiting. Considere adicionar isso em produção.

## Suporte

Para mais informações sobre o cliente Android/Dalvik, consulte a documentação do seu jogo específico.
