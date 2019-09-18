import links from '../../assets/text/links.json';


export default {
    rus: [
        {
            question: `В чем принимаются ставки?`,
            answer: `Сейчас ETH<br/>
                     В будущих обновлениях будут добавлены GET, EOS и TRX`,
            href: 'currency',
        },
        {
            question: `Как распределяются внесенные средства?`,
            answer: `98% — на выплаты в играх<br/> 
            2% — комиссия казино (техобслуживание, маркетинг, admins profit) <br/>
            0.002 ETH — в банк лотереи от каждой ставки, независимо от ее размера.
            <br/>
            <br/>
            А после запуска инвестиционной биржи <br/>
            95% — на выплаты в играх <br/>
            0,5% — комиссия казино (техобслуживание, маркетинг, admins profit) </br>
            4,5% — прибыль для всех держателей токенов  GET </br>
            0.002 ETH — в банк лотереи от каждой ставки, независимо от ее размера. </br>
    `,
            href: 'distributed',
        },
        {
            question: `Как формируется банк лотереи?`,
            answer: `0.002 ETH перечисляется в банк лотереи от каждой ставки, независимо от ее размера. <br/> 
      Лотерея разыгрывается 1 раз в неделю.`,
            href: 'ottery-bank',
        },
        {
            question: `Как принять участие в розыгрыше банка лотереи?`,
            answer: `Чтобы принять участие в розыгрыше необходимо отправить бесплатные токены BET на адрес смарт контракта.
			<br/> BET начисляются игрокам за каждые 1 ETH оборота раз в сутки.
      `,
            href: 'take-part',
        },
        {
            question: `BET token`,
            answer: `Токен с бесконечной эмиссией, который начисляется кратно каждому 1 ETH оборота ваших ставок. <br/> 
			Данные токены можно будет обменять на инвестиционные токены GET после запуска Биржи. <br/>
			Всего на бирже будет выделено 10.000 токенов GET для обмена на бонусные токены BET.
      `,
            href: 'bet-token',
        },
        {
            question: `Кто является владельцем базы игроков?`,
            answer: `Казино работает на смарт-контрактах сети Ethereum и не хранит данные о пользователях системы, участие является абсолютно анонимным.`,
            href: 'owner',
        },
        {
            question: `Что такое смарт-казино? <br/> И чем оно отличается от классического казино?`,
            answer: `
		Cмарт-казино функционирует на основе смарт-контрактов, а значит, сумма выигрыша расчитывается и отправляется на криптовалютный кошелек игрока автоматически, все транзакции проводятся напрямую без участия третьих лиц. Cмарт казино — полностью децентрализованная система, обеспечивающая максимально справедливую и прозрачную систему для индустрии казино, а так же обеспечивает низкую комиссию при выводе выйгрыша.
<br/>
Данные в блокчейне нельзя изменить, хранятся они одновременно на множестве компьютеров, что делает систему честной и снижает риски обмана. Кроме этого, вся информация публична для каждого и игроки всегда могут проверить ее.
<br/>
Изучить аудит нашего смарт-контракта можно <a href="${ links.incryptoPDF }">Тут</a>
`,
            href: 'smart-casino',
        },
        {
            question: `Может ли казино как-то повлиять на исход игры?`,
            answer: `Нет, казино никак не может повлиять на исход игры, т.к. регулируется смарт-контрактом. <br/> 
			Выйгрышное число записывается в хэш, когда совершается ставка, и изменить его после отправки является технически невозможным.
      `,
            href: 'influence',
        },
        {
            question: `Расскажите подробнее про смарт-контракт и хэш`,
            answer: `1. Система загадывает число и отправляет вам его хэш  <br/>
			2. Вы отправляете транзакцию с вашей ставкой и хэшом числа из предыдущего шага. <br/>
			3. Когда транзакция подтверждается сетью, смарт-контракт запоминает детали ставки и хэш числа. <br/>
			4. Смарт-контракт принимает транзакцию тогда и только тогда, когда хэш присланного числа совпадает с запомненным. <br/>
			5. Смарт-контракт соединяет число и хэш блока ставки, чтобы получить случайное число. <br/>
			6. Полученное число используется для определения исхода ставки. В случае выигрыша, смарт-контракт отправляет вам Эфир. <br/>
			<br/>
			Соединение числа с хэшом блока делает невозможным влияние на результат со стороны майнеров. Система не может влиять на результат, несмотря на то, что числа генерируются нашим сервером, мы не можем предсказывать хэши блоков. Все вышеизложенное явялется общедоступной информацией о <a href="https://en.wikipedia.org/wiki/Commitment_scheme">"commitment scheme"</a> 
      `,
            href: 'sc-details',
        },
        {
            question: `Как проверить честность казино? MD5 и тд`,
            answer: `На площадке GetETH внедрена технология контроля честности MD5. Принцип работы: платформа генерирует последовательность выпадения цифр до совершения ставки игроком и шифрует ее. Пользователь получает цифровую подпись, а после сыгранной ставки - исходный текст, который можно проверить на любом сервисе md5. Если хэши совпадают - честность игры доказана. <br/> 
			Также экспертная компания ХХ провела независимый аудит смарт-контракта GetETH и предоставила гарантию честности проведения игровой деятельности на платформе. Пользователи могут запросить статистику игр за определенный период времени в любой момент.
      `,
            href: 'honesty',
        },
        {
            question: `Как начать играть?`,
            answer: `Зайти на сайт и подключить кошелек. <br/>
			<br/>
			Кошелек Trust для мобильных девайсов и планшетов. <br/>
			Кошелек Metamask для остальных web браузеров.
      `,
            href: 'start',
        },
        {
            question: `Как установить кошелек Metamask на компьютер?`,
            answer: `Metamask это расширение для браузера Chrome. <br/>
			1. Скачать MetaMask можно по <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn">ссылке</a><br/>
			2. Нажмите Add to Chrome, чтобы установить MetaMask как расширение Google Chrome. <br/>
			3. Нажмите Add Extension, чтобы подтвердить действие, после чего MetaMask будет добавлен. Вы можете увидеть его в правом верхнем углу. <br/>
      `,
            href: 'mtm',
        },
        {
            question: `Как установить кошелек Trust на телефон или планшет?`,
            answer: `Скачайте приложение и следуйте инструкции в своем гаджете. <br/>
			Приложение для Android в <a href="https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp&hl=en">Play Market</a><br/>
			Приложение для iOS в <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn">Apple Store</a>  
      `,
            href: 'trw',
        },
        {
            question: `Нужно ли проходить KYC?`,
            answer: `Нет, мы ценим анонимность наших пользователей.`,
            href: 'k-y-c',
        },
        {
            question: `Какой размер минимальной/максимальной ставки?`,
            answer: `Минимальный 0.01 ETH. <br/>
			Максимальный не ограничен.
      `,
            href: 'min-max-bet',
        },
        {
            question: `Что делать, если средства не пришли на счёт при вводе/выводе?`,
            answer: `Обращайтесь к поддержке смарт-казино.`,
            href: 'input-output',
        },
        {
            question: `Что делать, если произошёл разрыв соединения во время игры?`,
            answer: `После восстановаления связи проверьте, прошла ли транзакция. <br/>
			Если прошла, то игра продолжается, если нет — повторите действия снова.
      `,
            href: 'disconnection',
        },
        {
            question: `Каким образом вы обеспечиваете безопасность моих средств?`,
            answer: `Мы не имеем доступа к вашему кошельку.`,
            href: 'guarantee',
        },
        {
            question: `Я допустил ошибку, размещая ставку. Что мне делать?`,
            answer: `Отменить ставку невозможно. Будьте внимательны каждый раз.`,
            href: 'mistake',
        },
    ],

    eng: [
        {
            question: 'Bets in which currencies are accepted?',
            answer: 'ETH only currently<br/>GET, EOS and TRX will be added in future updates.',
            href: 'currency',
        },
        {
            question: 'How funds are distributed?',
            answer: `98% - for payments in games <br/>
            2% — casino fee (maintenance, marketing, admins profit)  <br/>
            0.002 ETH —to the lottery bank of each bet, regardless of its size. </br>
            </br>
            After the launch of the exchange </br>
            95% - for payments in games </br>
            0.5% - casino fee (maintenance, marketing, admins profit) </br>
            4.5% - profit for all holders of GET tokens </br>
            0.002 ETH - to the lottery bank of each bet, regardless of its size. </br>


    `,
            href: 'distributed',
        },
        {
            question: 'How is the lottery bank formed?',
            answer: `0.002 ETH of each bet is transferred to the lottery bank, regardless of the size of the bet. <br/> The lottery is drawn once a week.
    `,
            href: 'lottery-bank',
        },
        {
            question: 'How to take part in the lottery bank drawn?',
            answer: `To participate in drawn send free GET tokens to the smart contract address. GET are charged for each 1ETH of turnover.`,
            href: 'take-part',
        },
        {
            question: 'BET token',
            answer: `A token with endless emission that is charged for buying bets in a smart casino. These tokens can be exchanged for investment GET tokens with a ratio of ХХ : 1, i.e. XX GET = 1 BET token. BET tokens are calculated in multiples of every 1 ETH of your bet turnover.`,
            href: 'bet-token',
        },
        {
            question: 'Who is the owner of the player base?',
            answer: `The casino operates on Ethereum's smart contracts network and does not store users data, the participation is absolutely anonymous.`,
            href: 'owner',
        },
        {
            question: `What is a smart casino? <br/> And how does it differ from the classic casino?`,
            answer: `Smart Casino operates on the basis of smart contracts, which means that the winning amount is calculated and sent to the player's cryptocurrency wallet automatically, all transactions are carried out directly without the participation of third parties. Smart Casino is a completely decentralized system that provides the fairest and transparent system for the casino industry, and also provides a low withdrawal commission. The data in the blockchain cannot be changed, they are stored simultaneously on multiple computers, which makes the system fair and reduces the risk of fraud. In addition, all information is public for everyone and players can check it any time they need. You can study the audit of our smart contract <a href="${ links.incryptoPDF }">here</a>.`,
            href: 'smart-casino',
        },
        {
            question: `Can the casino somehow influence the outcome of the game?`,
            answer: `No, the casino can in no way affect the outcome of the game, because it is regulated by a smart contract. <br/>
			The winning number is written to the hash when the bet is made and it is technically impossible to change this number after sending.
      `,
            href: 'influence',
        },
        {
            question: `Smart contract and hash in details`,
            answer: `1. The system makes a number and sends you its hash <br/>
			2. You send a transaction with your bet and a hash of the number from the previous step. <br/>
			3. When the transaction is confirmed by the network, the smart contract memorizes the bet details and hash of the number. <br/>
			4. A smart contract accepts a transaction if only the hash of the sent number matches the memorized one. <br/>
			5. A smart contract connects the number and hash of the bet block to get a random number. <br/>
			6. The resulting number is used to determine the outcome of the bet. In case of winning, the smart contract sends you the Ethereum. <br/>
			<br/>
			The connection of the number and the block hash makes it impossible to influence the result from the miners. The system can not affect the result: despite the fact that the numbers are generated by our server, we cannot predict the hashes of the blocks. Everything described above is the well-known <a href="https://en.wikipedia.org/wiki/Commitment_scheme">"commitment scheme"</a> 
      `,
            href: 'sc-details',
        },
        {
            question: `How to check casino honesty? MD5 and so on`,
            answer: `The GetETH site has implemented MD5 honesty control technology. How it works: the platform generates and encrypts a sequence of numbers before the player makes a bet. The user receives a digital signature, and after the bet is played - the source code, which can be checked on any md5 service. If the hashes match, the integrity of the game is proven. <br/>
			The expert company XX also conducted an independent audit of the GetETH smart contract and provided a guarantee of the honesty of the gaming activity on the platform. Users can request game statistics for a specific period of time.
      `,
            href: 'honesty',
        },
        {
            question: `How to start playing?`,
            answer: `Visit the site and enable the wallet. <br/>
				Trust wallet for mobile devices and tablets. <br/>
				Metamask wallet for other web browsers.
        `,
            href: 'start',
        },
        {
            question: `How to install Metamask wallet on the computer?`,
            answer: `Metamask is a Chrome browser extension. <br/>
			1. Download MetaMask <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn">here</a>. <br/>
			2. Click Add to Chrome to install MetaMask as an extension to Google Chrome. <br/>
			3. Click Add Extension to confirm the action, after which MetaMask will be added. You can see it in the upper right corner.
        `,
            href: 'mtm',
        },
        {
            question: `How to install Trust wallet on a phone or a tablet?`,
            answer: `Download the app and follow the instructions in your gadget. <br/>
			Android app in the <a href="https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp&hl=en">Play Market</a>  <br/>
      App for iOS in <a href="https://itunes.apple.com/by/app/trust-ethereum-wallet/id1288339409?mt=8">Apple Store</a>`,
            href: 'trw',
        },
        {
            question: `Do I need to pass KYC?`,
            answer: `No, we appreciate the anonymity of our users.`,
            href: 'k-y-c',
        },
        {
            question: `What is the minimum / maximum bet?`,
            answer: `Minimum bet is 0.01 ETH. <br/>
			Maximum bet is unlimited.
      `,
            href: 'min-max-bet',
        },
        {
            question: `What to do if the funds do not come to the account during the input / output?`,
            answer: `Contact smart casino support service.
      `,
            href: 'input-output',
        },
        {
            question: `What to do if there was a disconnection during the game?`,
            answer: `After restoring the connection, check if the transaction has passed. <br/>
			If passed, the game continues, if not - repeat the action again.
      `,
            href: 'disconnection',
        },
        {
            question: `Where can I learn the history of my bets?`,
            answer: `In the block Game History
      `,
            href: 'history',
        },
        {
            question: `How do you guarantee the safety of my funds?`,
            answer: `We do not have an access to your wallet.
      `,
            href: 'guarantee',
        },
        {
            question: `I made a mistake while making a bet. What should I do?`,
            answer: `It is impossible to cancel the bet. Next time be careful.
      `,
            href: 'mistake',
        },
    ],
};
