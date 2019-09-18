import text from '../../assets/text/comparison.json';

export const comparisions = lang => [
    {
        advantage: text[lang].advantages.buy,
        geteth: {
            value: '10%',
            advantage: true,
        },
        ect: {
            value: '12%',
            advantage: false,
        },
        pantheon: {
            value: '10%',
            advantage: true,
        },
        cmt: {
            value: '10%',
            advantage: true,
        },
        powh: {
            value: '10%',
            advantage: true,
        },
    },
    {
        advantage: text[lang].advantages.sell,
        geteth: {
            value: '5%',
            advantage: true,
        },
        ect: {
            value: '6-30%',
            advantage: false,
        },
        pantheon: {
            value: '5%',
            advantage: true,
        },
        cmt: {
            value: '5%',
            advantage: true,
        },
        powh: {
            value: '10%',
            advantage: false,
        },
    },
    {
        advantage: text[lang].advantages.admin,
        geteth: {
            value: text[lang].no,
            advantage: true,
        },
        ect: {
            value: text[lang].yes,
            advantage: false,
        },
        pantheon: {
            value: text[lang].no,
            advantage: true,
        },
        cmt: {
            value: text[lang].no,
            advantage: true,
        },
        powh: {
            value: text[lang].no,
            advantage: true,
        },
    },
    {
        advantage: text[lang].advantages.audit,
        geteth: {
            value: text[lang].yes,
            advantage: true,
        },
        ect: {
            value: text[lang].no,
            advantage: false,
        },
        pantheon: {
            value: text[lang].yes,
            advantage: true,
        },
        cmt: {
            value: text[lang].yes,
            advantage: true,
        },
        powh: {
            value: text[lang].yes,
            advantage: true,
        },
    },
    {
        advantage: text[lang].advantages.instruction,
        geteth: {
            value: text[lang].yes,
            advantage: true,
        },
        ect: {
            value: text[lang].no,
            advantage: false,
        },
        pantheon: {
            value: text[lang].no,
            advantage: false,
        },
        cmt: {
            value: text[lang].no,
            advantage: false,
        },
        powh: {
            value: text[lang].yes,
            advantage: true,
        },
    },
    {
        advantage: text[lang].advantages.refProgramm,
        geteth: {
            value: '5%',
            advantage: true,
        },
        ect: {
            value: '2%',
            advantage: false,
        },
        pantheon: {
            value: '3.3%',
            advantage: false,
        },
        cmt: {
            value: '3.3%',
            advantage: false,
        },
        powh: {
            value: '3.3%',
            advantage: false,
        },
    },
    {
        advantage: text[lang].advantages.otherProductsIncome,
        geteth: {
            value: text[lang].yes,
            advantage: true,
        },
        ect: {
            value: text[lang].yes,
            advantage: true,
        },
        pantheon: {
            value: text[lang].no,
            advantage: false,
        },
        cmt: {
            value: text[lang].no,
            advantage: false,
        },
        powh: {
            value: text[lang].yes,
            advantage: true,
        },
    },
    {
        advantage: text[lang].advantages.minDeoposit,
        geteth: {
            value: text[lang].no,
            advantage: true,
        },
        ect: {
            value: text[lang].yes,
            advantage: false,
        },
        pantheon: {
            value: text[lang].yes,
            advantage: false,
        },
        cmt: {
            value: text[lang].yes,
            advantage: false,
        },
        powh: {
            value: text[lang].yes,
            advantage: false,
        },
    },
];

export const textPage = {
    eng: {
        textTitle: address => `JOIN A RELIABLE INVESTMENT PROJECT DRIVEN BY <a href="https://etherscan.io/address/${address}" target="_blank">Ethereum SMART CONTRACT</a>`,
        textPreview: [
            'The participation in the project is completely anonymous',
            'Unlimited income on your deposit from GetETH Exchange and Casino profits',
            'Funds are distributed by the smart contract without any interference of developers',
            'The smart contract was <a href="https://incrypto.io/audit/GETETH_EXCHANGE.pdf" target="_blank">checked by Incrypto</a>, no backdoors and vulnerabilities were found',
            'Referral program and large bonuses',
        ],
        balance: 'Token balance',
        priceTitle: 'Tokens price',
        save: 'Savings',
        revenue: [
            'From CASINO',
            'From INVEST',
            'From Referral program',
            'Current balance',
        ],
        result: ['Widthdrawal', 'ReInvest', 'Transfer Tokens'],
        stat: ['Statistics of your income', 'Day', 'Week', 'Month', 'All the time'],
        tar: ['Cost vs ETH/contact', 'Forecasting of amount'],
        count: ['Token vs ETH/contract', 'Forecasting of prices'],
        buying: ['Buying tokens', 'To enrollment', 'Purchase fee', 'Buy Tokens'],
        selling: ['Selling tokens', 'Sell Tokens', 'Purchase fee', 'Sell Tokens'],
        ref: [
            'Your referral link',
            'Rewards of the referral program',
            'Data on awards are not yet available',
        ],
        price: ['PRICE', 'TOTAL SUPPLY', 'BALANCE', 'YOUR TRANSACTIONS'],
        adv: 'ADVANTAGES',
        walletsWarning: 'Do not send your ETH from exchange-traded wallets to the GetETH smart contract or your GET tokens will be lost!',
        investedNotify: (txHash, buyer, amount) => `${buyer} <a href="https://etherscan.io/tx/${txHash}" target="_blank">invested ${amount} ETH</a>`,
        textCalculator: 'The limit for the purchase is 5 ETH per day from one wallet',
        textCalculatorSell: 'There are no limits for sale',
        calculatorGuide: '<a href="https://drive.google.com/file/d/1L2q8h21gdVDiIFAGEMxHK21gDzH6zthM/view" target="_blank">Full investment instructions</a>',
        transactionShow: 'Show transactions',
        transactionHide: 'Hide transactions',
        risks: 'Risks',
        guarante: 'Guarantees'
    },
    rus: {
        textTitle: address => `СТАНЬ УЧАСТНИКОМ НАДЕЖНОГО ИНВЕСТ ПРОЕКТА НА <a href="https://etherscan.io/address/${address}" target="_blank">СМАРТ-КОНТРАКТЕ Ethereum</a>`,
        textPreview: [
            'Участие в проекте полностью анонимно',
            'Неограниченный доход на ваш депозит от прибыли GetETH Exchange и Casino',
            'Средства распределяются смарт-контрактом без вмешательства разработчиков',
            'Смарт-контракт <a href="https://incrypto.io/audit/GETETH_EXCHANGE.pdf" target="_blank">проверен в Incrypto</a>, бэкдоров и уязвимостей не обнаружено',
            'Реферальная программа и большие бонусы',
        ],
        balance: 'Баланс токенов',
        priceTitle: 'Цена токена',
        save: 'Дивиденды',
        revenue: ['Казино', 'Инвестиции', 'Реферальная программа', 'Актуальный баланс'],
        result: ['   Вывод   ', 'Реинвест', 'Перевод токенов'],
        stat: ['Статистика доходности', 'День', 'Неделя', 'Месяц', 'За все время'],
        // tar: ['ЦЕНА vs ETH/смарт-контракт', 'Прогноз роста цены'],
        tar: ['Сколько я заработаю', 'Прогноз роста цены'],
        count: ['Прогноз количества токенов', 'Прогноз количества токенов'],
        buying: ['Покупка токенов', 'Вы получите', 'Комиссия', 'Купить'],
        selling: ['Продажа токенов', 'Продать', 'Комиссия', 'Продать'],
        ref: [
            'Ваша реферальная ссылка',
            'Начисления по реферальной программе',
            'Данные о начислениях пока отсутствуют',
        ],
        price: [
            'ЦЕНА',
            'В ОБРАЩЕНИИ',
            'СМАРТ-КОНТРАКТ',
            'ВАШИ ТРАНЗАКЦИИ'
        ],
        adv: 'ПРЕИМУЩЕСТВА',
        walletsWarning: 'Не отправляйте ваши ETH с биржевых кошельков на адрес смарт-контракта GetETH, иначе ваши токены GET будут потеряны!',
        investedNotify: (txHash, buyer, amount) => `${buyer} <a href="https://etherscan.io/tx/${txHash}" target="_blank">инвестировал ${amount} ETH</a>`,
        textCalculator: 'Лимит на покупку равен 5 ETH в сутки с одного кошелька',
        textCalculatorSell: 'Лимитов на продажу нет',
        calculatorGuide: '<a href="https://drive.google.com/file/d/13te9EZN4QjMlMfRnc6XrPpqcooTUvQ79/view" target="_blank">Полная инструкция по инвестированию</a>',
        transactionShow: 'Показать транзакции',
        transactionHide: 'Скрыть транзакции',
        risks: 'Риски',
        guarante: 'Гарантии'
    },
};
