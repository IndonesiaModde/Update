# Guia de Deployment

Este documento descreve como fazer deploy do Game Update Server em diferentes plataformas.

## Deploy no Render

O Render é a plataforma recomendada para deploy deste servidor. O projeto já inclui um arquivo `render.yaml` pré-configurado.

### Passos para Deploy:

1. **Preparar o repositório Git**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Game Update Server"
   git remote add origin https://github.com/seu-usuario/game-update-server.git
   git push -u origin main
   ```

2. **Conectar ao Render**
   - Acesse [render.com](https://render.com)
   - Clique em "New +" e selecione "Web Service"
   - Conecte seu repositório GitHub
   - Selecione o repositório `game-update-server`

3. **Configurar o Serviço**
   - O Render detectará automaticamente o arquivo `render.yaml`
   - Verifique as configurações:
     - **Build Command**: `pnpm install && pnpm build`
     - **Start Command**: `pnpm start`
     - **Environment**: Node

4. **Variáveis de Ambiente**
   - No painel do Render, adicione as variáveis de ambiente:
     - `NODE_ENV`: `production`
     - `PORT`: `3000` (ou deixe em branco para usar a porta padrão)

5. **Deploy**
   - Clique em "Create Web Service"
   - O Render iniciará o build automaticamente
   - Após o build, seu servidor estará disponível em: `https://seu-app-name.onrender.com`

### URL do Servidor

Após o deploy, você terá uma URL como:
```
https://game-update-server.onrender.com
```

Use esta URL para acessar os endpoints:
- `https://game-update-server.onrender.com/live/{hash}`
- `https://game-update-server.onrender.com/fileinfo`
- `https://game-update-server.onrender.com/versioninfo`

## Deploy Local

Para testar o servidor localmente:

```bash
# Instalar dependências
pnpm install

# Executar em modo desenvolvimento
pnpm dev

# O servidor estará disponível em http://localhost:3000
```

## Deploy em Outras Plataformas

### Heroku

```bash
# Criar aplicação
heroku create seu-app-name

# Deploy
git push heroku main

# Ver logs
heroku logs --tail
```

### Railway

```bash
# Instalar CLI
npm i -g @railway/cli

# Login
railway login

# Deploy
railway up
```

### DigitalOcean App Platform

1. Conecte seu repositório GitHub
2. Selecione o branch para deploy
3. Configure as variáveis de ambiente
4. Clique em "Deploy"

## Monitoramento

### Logs do Render

Para visualizar os logs do seu servidor no Render:

1. Acesse o painel do Render
2. Selecione seu serviço
3. Clique em "Logs"
4. Você verá os logs em tempo real

### Verificar Saúde do Servidor

```bash
curl https://seu-servidor.onrender.com/api/trpc/health
```

Resposta esperada:
```json
{
  "status": "ok",
  "timestamp": "2026-05-10T00:25:00.000Z"
}
```

### Verificar Endpoints

```bash
# Testar versioninfo
curl https://seu-servidor.onrender.com/versioninfo

# Testar fileinfo
curl https://seu-servidor.onrender.com/fileinfo

# Testar logs
curl https://seu-servidor.onrender.com/logs
```

## Variáveis de Ambiente

O servidor valida as seguintes variáveis de ambiente:

| Variável | Valor Padrão | Descrição |
| --- | --- | --- |
| `NODE_ENV` | `development` | Ambiente de execução (`development` ou `production`) |
| `PORT` | `3000` | Porta para o servidor (1-65535) |

## Troubleshooting

### Erro: "Port already in use"

Se a porta padrão está em uso, o servidor tentará usar a próxima porta disponível automaticamente.

### Erro: "Invalid NODE_ENV"

Verifique se `NODE_ENV` está definido como `development` ou `production`.

### Erro: "Invalid PORT"

Verifique se `PORT` é um número válido entre 1 e 65535.

### Logs não aparecem

Os logs são exibidos no console. No Render, você pode visualizá-los na seção "Logs" do painel.

## Atualizações

Para atualizar o servidor:

1. Faça as alterações no código
2. Commit e push para o repositório
3. O Render detectará automaticamente a mudança e iniciará um novo deploy

```bash
git add .
git commit -m "Update: descrição das mudanças"
git push origin main
```

## Segurança

- Sempre use `NODE_ENV=production` em produção
- Não exponha dados sensíveis nos logs
- Considere adicionar autenticação para o endpoint `/logs`
- Implemente rate limiting em produção

## Suporte

Para mais informações sobre o Render, consulte a [documentação oficial](https://render.com/docs).
