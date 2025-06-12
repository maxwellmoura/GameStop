# 🛑 Jogo Stop (Adedonha) - React

Este é um projeto de um jogo estilo *Stop* (também conhecido como Adedonha), desenvolvido com **React** e **React Router**. Os jogadores escolhem seus nomes, sorteiam uma categoria, selecionam letras e pontuam conforme as respostas possíveis. O jogo possui controle de tempo, pontuação, turnos e correção de jogadas.

## 🚀 Funcionalidades

- Cadastro de jogadores com quantidade e nomes dinâmicos
- Sorteio de categorias aleatórias
- Seleção de letras em ordem de turno
- Temporizador de 3 minutos por rodada
- Pontuação automática ao clicar em "STOP"
- Correção de jogadas (duplo clique em letra usada)
- Detecção automática de empate ou vencedor
- Interface responsiva e amigável

## 🎮 Como Jogar

1. Acesse a **Home** e insira o número de jogadores.
2. Digite os nomes de cada jogador.
3. Clique em **Iniciar Jogo**.
4. Sorteie uma categoria.
5. Cada jogador, na sua vez, escolhe uma letra.
6. Clique em **STOP** para confirmar a jogada e passar a vez.
7. Caso necessário, clique **duas vezes** em uma letra já usada para corrigir a jogada.
8. O jogo termina ao acabar o tempo ou usar todas as letras.
9. O vencedor será exibido automaticamente.

## 🧱 Tecnologias Utilizadas

- React
- React Router DOM
- CSS Puro (responsivo)
- JavaScript moderno (ES6+)

## 🗂️ Estrutura de Pastas
/src
├── components
│ ├── HomePage.jsx
│ └── GamePage.jsx
├── styles
│ └── styles.css
├── App.jsx
└── index.js

## 🧠 Lógica do Jogo

- Um jogador por vez pode clicar em uma letra.
- Ao clicar em **STOP**, o jogador pontua (se tiver escolhido uma letra válida) e o turno passa.
- Se uma letra for usada incorretamente, qualquer jogador pode corrigir clicando **duas vezes** sobre ela (só com o tempo parado).
- O tempo e a vez são restaurados conforme o momento da correção.
- O jogo termina quando o tempo acaba ou todas as letras são usadas.

## 📦 Instalação e Execução

1. Clone o repositório:

git clone https://github.com/seu-usuario/jogo-stop-react.git
cd jogo-stop-react

2. Instale as dependências:
npm install

3.Inicie o servidor de desenvolvimento:
npm start
O projeto estará acessível em http://localhost:3000.

✍️ Personalização
const categories = [
  'Nome', 'Cidade', 'Animal', 'Cor', 'Fruta', ...
];  

✨ Melhorias Futuras
Adição de perguntas e respostas por categoria.

Validação automática de respostas.  
Histórico de partidas.  
Exportação dos resultados.  
Integração com banco de dados e autenticação de usuários.  

📸 Capturas de Tela  
![Logo do Inicio do Jogo](https://raw.githubusercontent.com/maxwellmoura/GameStop/main/assets/TelaInicial.JPG)
![Logo do Escolhas dos Jogadores](https://raw.githubusercontent.com/maxwellmoura/GameStop/main/assets/TelaEscolhas.JPG)
![Logo do Jogo](https://raw.githubusercontent.com/maxwellmoura/GameStop/main/assets/TelaDoJogo.JPG)
![Logo do Vencedor](https://raw.githubusercontent.com/maxwellmoura/GameStop/main/assets/TelaVencedor.JPG)

📄 Licença  
Este projeto está sob a licença MIT. Sinta-se à vontade para modificá-lo, distribuí-lo e utilizá-lo como base para novos jogos!  

Divirta-se com o jogo Stop! ✋😄  

🧑‍💻 Autor  
Desenvolvido por [Maxwell].  
Contribuições e sugestões são bem-vindas!  
