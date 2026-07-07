import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Strategic templates by business segment
const FALLBACKS: Record<string, string> = {
  escritorio: `### 🏢 Estratégia de TV Corporativa para Escritórios & Corporações

Sua comunicação interna precisa ser ágil e engajadora para conectar equipes remotas e presenciais. Aqui está seu plano de conteúdo personalizado:

#### 1. Canais e Divisões de Tela Recomendados
* **Zona Principal (60%):** Metas mensais, conquistas de colaboradores (Aniversariante do Mês, Boas-vindas), avisos da diretoria em vídeo.
* **Zona Lateral (30%):** Feed de Notícias RSS, Previsão do tempo local, Próximas reuniões.
* **Ticker Inferior (10%):** Frase motivacional ou avisos curtos (ex: "Favor atualizar o ponto até sexta-feira").

#### 2. Calendário de Conteúdo Sugerido
* **Segunda-feira:** Vídeo do CEO ou resumo dos objetivos da semana.
* **Quarta-feira:** Destaques de bem-estar ou "Dica do Especialista".
* **Sexta-feira:** Fotos de happy hour e aniversariantes do final de semana.

#### 3. ROI Estimado
* **Redução de 75%** no envio de e-mails internos ignorados.
* **Aumento de 40%** na absorção de comunicados institucionais.
* **Engajamento:** Equipes alinhadas produzem até 21% mais.

*Pronto para ver isso rodando em suas TVs? Fale agora mesmo com nossos especialistas para agendarmos uma demonstração real!*`,

  varejo: `### 🛍️ Estratégia de Mídia Indoor para Varejo, Lojas e Supermercados

Sua tela deve ser uma máquina de conversão e ponto de contato visual imediato com o consumidor. Aqui está seu plano de conteúdo personalizado:

#### 1. Divisão de Tela Estratégica
* **Zona Principal (70%):** Vídeos de alta qualidade dos produtos mais vendidos, ofertas-relâmpago e promoções sazonais.
* **Zona Lateral (20%):** Feed de entretenimento (curiosidades, notícias) para reter a atenção do cliente e diminuir a percepção do tempo de espera.
* **Ticker Inferior (10%):** Código QR Code com link para o Instagram da loja ou cupom de desconto exclusivo.

#### 2. Dicas de Promoção Dinâmica
* Altere ofertas de acordo com o horário (ex: café da manhã vs. almoço em supermercados).
* Use campanhas dinâmicas integradas a tabelas de preços ou atualize ofertas em menos de 10 segundos pelo celular.

#### 3. ROI Estimado
* **Aumento de até 33%** nas vendas de itens promovidos em tela.
* **Diminuição de 45%** na percepção de tempo de espera em filas.
* **Upgrade Visual:** Visual moderno e tecnológico para seu ponto de venda.

*Quer converter mais clientes no PDV hoje? Fale agora mesmo com nosso time comercial!*`,

  academia: `### 🏋️ Estratégia de Mídia Indoor para Academias e Box de Crossfit

Mantenha seus alunos focados, motivados e informados sobre as novidades da academia. Aqui está seu plano de conteúdo personalizado:

#### 1. Divisão de Tela Recomendada
* **Zona Principal (65%):** Vídeos de treinos, demonstração de execução correta de exercícios, e avisos de novos horários ou modalidades de aulas.
* **Zona Lateral (25%):** Quadro de Destaques (Aluno em Destaque, Recordes) e fotos de eventos da academia.
* **Ticker Inferior (10%):** Alertas rápidos (ex: "Mantenha as anilhas guardadas") e horários de aulas especiais.

#### 2. Engajamento dos Alunos
* Incentive posts com a hashtag da sua academia no Instagram e mostre em tempo real na tela!
* Promova produtos adicionais como suplementos, parcerias locais e venda de planos anuais diretamente na TV.

#### 3. ROI Estimado
* **Redução de 30%** na taxa de cancelamento (churn) devido a maior sensação de pertencimento.
* **Aumento de 25%** na receita de vendas de produtos internos (suplementos, roupas).
* **Comunicação Direta:** Redução de custos com cartazes e panfletos impressos.

*Mude a experiência da sua academia agora. Fale com um especialista da Meu Comercial!*`,

  clinica: `### 🏥 Estratégia de TV Corporativa para Clínicas, Hospitais e Consultórios

Transforme a sala de espera em um ambiente acolhedor, educativo e esteticamente profissional. Aqui está seu plano de conteúdo personalizado:

#### 1. Divisão de Tela Humanizada
* **Zona Principal (60%):** Dicas de saúde preventiva, vídeos institucionais apresentando a equipe médica e os novos procedimentos disponíveis.
* **Zona Lateral (30%):** Notícias de fontes confiáveis, previsão do tempo, horário de atendimento.
* **Ticker Inferior (10%):** Alertas gerais e orientações sanitárias importantes.

#### 2. Gestão de Espera Ativa
* Intercale dicas de saúde com curiosidades leves para acalmar pacientes ansiosos.
* Utilize a divisão de tela com integração opcional de senhas de atendimento (TV + Chamada de Senha).

#### 3. ROI Estimado
* **Redução de 60%** na ansiedade de espera dos pacientes.
* **Aumento de 20%** no agendamento de exames e procedimentos adicionais recomendados na tela.
* **Imagem Profissional:** Transmita credibilidade e tecnologia aos seus pacientes.

*Torne sua clínica referência em inovação. Solicite contato de um consultor hoje!*`,

  geral: `### 📺 Estratégia de TV Corporativa e Mídia Indoor

A comunicação visual é a forma mais poderosa de se conectar com seu público. Aqui está o plano de conteúdo estratégico para o seu negócio:

#### 1. Pilares da Comunicação Eficiente
* **Clareza Visual:** Fontes grandes, textos objetivos e contraste de cores de alto padrão (exatamente como as telas da Meu Comercial oferecem).
* **Atualização Centralizada:** Nada de pen drives. Atualize suas telas remotamente a partir de qualquer computador ou smartphone.
* **Conteúdo Misto:** Alterne vídeos institucionais, avisos rápidos, notícias do dia e previsão do tempo para manter a audiência engajada.

#### 2. Como Começar Rápido
1. Escolha a quantidade de pontos de TV que seu espaço precisa.
2. Utilize nossos players compactos plug-and-play (basta conectar no HDMI e Wi-Fi).
3. Gerencie tudo pela nossa plataforma em nuvem segura e intuitiva.

*Fale com nossos consultores para desenhar o plano de implantação ideal para sua empresa!*`
};

// API: Strategic consultation
app.post("/api/consult", async (req, res) => {
  const { segment, additionalInfo } = req.body;
  
  if (!segment) {
    return res.status(400).json({ error: "O segmento é obrigatório." });
  }

  const normalizedSegment = String(segment).toLowerCase().trim();
  const infoText = additionalInfo ? String(additionalInfo).trim() : "";

  console.log(`Recebida consulta para o segmento: ${normalizedSegment}. Detalhes adicionais: ${infoText}`);

  const answer = FALLBACKS[normalizedSegment] || FALLBACKS.geral;
  await new Promise((resolve) => setTimeout(resolve, 800));
  return res.json({ 
    success: true, 
    answer: answer + `\n\n*(Nota: Esta estratégia foi preparada com base no segmento selecionado. Para soluções personalizadas e integradas, fale com nosso time!)*`
  });
});

// Setup Vite Dev Server / Static files handler
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Iniciando servidor em modo DESENVOLVIMENTO com Vite...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Iniciando servidor em modo PRODUÇÃO...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Meu Comercial Server está rodando na porta ${PORT}`);
  });
}

startServer();
