# ConAnimal 

## Descrição
O **ConAnimal** é uma plataforma desenvolvida para facilitar a gestão de animais resgatados por ONGs, como a Con Animal. A aplicação permite registrar, acompanhar e gerenciar dados de animais em abrigos e lares temporários, incluindo histórico clínico, localização e status de adoção, proporcionando maior transparência e eficiência nas operações da ONG.

## Tecnologias
- **MongoDB** (banco de dados)
- **Node.js** (backend)
- **Bootstrap** (templates)
- **Multer** (upload de imagens)
- **MVC** (padrão de arquitetura)

## Instalação
1. **Clone o repositório:**
   ```bash
   git clone https://github.com/TocMaria/con-animal.git
   ```

2. **Navegue até o diretório do projeto:**
   ```bash
   cd conanimal
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Conecte-se ao MongoDB:**  
   Para criar uma conta e configurar o cluster, siga o tutorial em: [MongoDB Atlas - Tutorial](https://www.mongodb.com/pt-br/docs/atlas/)

5. **Configure o arquivo `.env` na pasta raiz do repositório (con-animal):**  
   Defina as variáveis de ambiente necessárias (ex: URL do MongoDB, credenciais de API).

6. **Execute o servidor:**  
   Para rodar a aplicação, execute o comando:
   ```bash
   node server.js
   ```


Projeto entregue ao Curso EaD de Bacharelado em Engenharia de Software como pré-requisito obrigatório à obtenção do título de Bacharel em Engenharia de Software.
