import React from "react";
import Timer from "../../components/Header/Timer";
import text from "../../assets/text/lotery.json";

const russianFlyingFormText = `<p>Чтобы принять участие в розыгрыше лотереи — необходимо отправить бесплатные токены BET на адрес смарт контракта через модуль в блоке: Купить билеты 
</p>
<p>Лотерея разыгрывается 1 раз в неделю.</p>
<p>BET - это токен с бесконечной эмиссией, который начисляется за каждые 1 ETH оборота ваших ставок. 1 ETH оборота = 100 BET токенов. Начисление токена происходит 1 раз в сутки. </p>`;

const englishFlyingFormText = `<p>To participate in the lottery draw - you need to send free BET tokens to the smart contract address through the module in the block: Buy tickets 
</p>
<p>Lottery is played once a week.</p>
<p>BET is an infinite emission token that is credited for every 1 ETH turnover of your bets. 1 ETH turnover = 100 BET tokens. The token is charged once a day.</p>`;

export default ({ potNumber, total, lang, lotteryTime, openFlyingForm }) => (
  <div className="pot exchange-item">
    <div>
      <div className="ticket-wrap">
        <div className="ticket">
          <div className="ticket-description">{`${
            text[lang].pot.ticketDescription[0]
          } ${potNumber} ${text[lang].pot.ticketDescription[1]}`}</div>
          <div className="ticket-value">
            {total} <span>ETH</span>
          </div>
        </div>
      </div>
      <div
        className="link"
        onClick={() =>
          openFlyingForm(
            lang === "rus" ? russianFlyingFormText : englishFlyingFormText
          )
        }
      >
        {text[lang].pot.howToPlay}
      </div>
    </div>
    <div>
      <div className="drawing">next drawing</div>
      <Timer lotteryTimer={true} importantTime={lotteryTime} />
    </div>
  </div>
);
