import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";
import { connect } from "react-redux";
import links from "../assets/text/links";
import Meta from "../components/Meta";


const Guarantees = ({ lang }) => {
    return lang === "rus" ? (
        <div className='index-page-container'>
            <Header isOnExchange={true} isOnMain={true} />
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-lg-10 col-md-11">
                        <Title>Гарантии участникам</Title>
                        <Paragraph>
                            Операции с криптовалютой требуют особого внимания и здорового
                            скептицизма. Мы последовательно работаем над снижением рисков для
                            инвесторов. Команда разработчиков сделала GetETH исключительно
                            надежным инструментом, но не даем абсолютных гарантий. Вот
                            перечень наиболее значимых угроз и способы управления этими
                            рисками:
                        </Paragraph>
                        <Subtitle>Безопасность от взлома</Subtitle>
                        <Paragraph>
                            Кража ETH и токенов остается самой важной угрозой для любого
                            проекта на виртуальной машине Ethereum. В GetETH признали
                            реальность этой угрозы безопасности и провели независимый аудит
                            кода смарт-контракта от команды профессионалов Incrypto.{" "}
                            <a
                                style={{ color: "#0081FF" }}
                                href={ links.incryptoPDF }
                                target="_blank"
                                rel='noopener noreferrer'
                            >
                                Результаты аудита
                            </a>{" "}
                            указывают на исключительную надежность используемых решений,
                            поэтому участники могут не переживать о сохранности собственных
                            средств.{" "}
                        </Paragraph>
                        <Subtitle>Защита от мошенничества</Subtitle>
                        <Paragraph>
                            Код однажды запущенного смарт-контракта не получится изменить. Для
                            участников платформы GetETH это означает, что управление
                            инвестированными средствами осуществляется только смарт-контрактом
                            и никем более. В обход инструкций смарт-контракта деньги забрать
                            невозможно: даже разработчики не смогли бы этого сделать.{" "}
                        </Paragraph>
                        <Subtitle>Постоянный доход</Subtitle>
                        <Paragraph>
                            Движущая сила проекта – торговые операции. Взимаемые комиссии
                            служат источником для выплаты дивидендов держателям токенов.
                            Прекращение операций может произойти только в случае одновременной
                            потери заинтересованности в получении пассивного дохода всеми
                            участниками платформы. Такой вариант развития событий
                            представляется крайне маловероятным. Однако, от других проектов
                            GetETH выделяет наличие дополнительного источника дохода от
                            онлайн-казино. Благодаря этому преимуществу, подобная ситуация
                            означает постоянство выплат.
                        </Paragraph>
                        <Subtitle>Бессрочная поддержка</Subtitle>
                        <Paragraph>
                            Честный и беспристрастный код смарт-контракта будет продолжать
                            работать, даже если разработчики перестанут поддерживать проект.
                            Это утверждение касается всех выплат: они полностью
                            автоматизированы и выполняются вне зависимости от желания
                            владельцев проекта.
                        </Paragraph>
                    </div>
                </div>
            </div>
            <Footer isOnExchange={true} />
            <Meta page='warranties' />
        </div>
    ) : (
        <div className='index-page-container'>
            <Header isOnExchange={true} isOnMain={true} />
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-lg-10 col-md-11">
                        <Title>Warranties for participants</Title>
                        <Paragraph>
                            Cryptocurrency operations should be treated with particular
                            attention and a bit of skepticism. We reduce risks for investors
                            step by step. GetETH developer team has made it a very reliable
                            instrument, but we cannot provide any absolute warranties. Read
                            the list of the most considerable vulnerabilities and ways to
                            control the risks:
                        </Paragraph>
                        <Subtitle> Protection against hacking</Subtitle>
                        <Paragraph>
                            Stealing of ETH and other tokens is the biggest threat for any
                            project running on the Ethereum virtual machine. Recognizing this
                            danger, GetETH developers have performed an independent audit of
                            the smart contract with the help of Incrypto professionals. The{" "}
                            <a
                                style={{ color: "#0081FF" }}
                                href={ links.incryptoPDF }
                                target="_blank"
                                rel='noopener noreferrer'
                            >
                                test results
                            </a>{" "}
                            prove exceptional safety of implemented solutions, so participants
                            don’t have to worry about the security of their funds.
                        </Paragraph>
                        <Subtitle>Protection against fraud</Subtitle>
                        <Paragraph>
                            Once a smart contract is launched, its code cannot be altered. For
                            GetETH users it means their investments are controlled by the
                            smart contract only. It’s impossible to withdraw funds by
                            sidestepping the smart contract: even developers cannot do that.
                        </Paragraph>
                        <Subtitle>Constant profit</Subtitle>
                        <Paragraph>
                            Trading operations are the main project’s drive. Fees serve to pay
                            dividends for token holders. Ceasing of transactions can happen
                            only if every single platform user loses interest in getting their
                            passive income simultaneously. This is a highly unlikely
                            situation. Besides, GetETH has an additional source of income –
                            the online casino. It guarantees the consistency of payments.
                        </Paragraph>
                        <Subtitle>All-time support</Subtitle>
                        <Paragraph>
                            Unbiased and fair smart contract code will continue running even
                            if developers stop maintaining the project. It applies to all
                            payments: they are fully automated and are made regardless of
                            project developers’ interests.
                        </Paragraph>
                    </div>
                </div>
            </div>
            <Footer isOnExchange={true} />
            <Meta page='warranties' />
        </div>
    );
};

export default connect(state => ({
    lang: state.lang
}))(Guarantees);

const Title = styled.h1`
  text-align: center;
  font-weight: bold;
`;

const Subtitle = styled.h3`
  text-align: center;
  font-weight: bold;
`;

const Paragraph = styled.p`
  &:last-child {
    margin-bottom: 80px;
  }
`;
