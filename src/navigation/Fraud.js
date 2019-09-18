import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';
import { connect } from 'react-redux';
import links from "../assets/text/links.json";
import Meta from "../components/Meta";


const Fraud = ({ lang }) => {
    return lang === 'rus' ? (
        <div className='index-page-container'>
            <Header isOnExchange isOnMain />
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-lg-10 col-md-11">
                        <Title>Какие риски?</Title>
                        <Paragraph>
                            Реальность такова, что в сети немало криптовалютных проектов, которые созданы для обмана
                            участников. Участников вовлекают в проект ложными обещаниями значительного дохода. Основная
                            же модель получения прибыли остается скрытой от пользователей, а все финансовые поступления
                            и выплаты контролируются одним человеком или группой лиц. Однако обман возможен, только если
                            злоумышленник получит доступ к деньгам. В противном случае теряется сам смысл совершения
                            мошеннических действий. В GetETH никто не сможет завладеть деньгами участников.
                            Смарт-контракт продолжит работать вне зависимости от желаний конкретного человека, даже если
                            он – владелец смарт-контракта.
                        </Paragraph>
                        <Paragraph>
                            Благодаря использованию смарт-контракта защита инвестиций обеспечивается честным
                            распределением комиссий, а размер пассивного дохода участника зависит только от количества
                            купленных токенов. Данные факты были подтверждены в ходе{' '}
                            <a style={{ color: '#0081FF' }} href={ links.incryptoPDF } target="_blank" rel='noopener noreferrer'>
                                независимого аудита
                            </a>{' '}
                            профессиональной команды разработчика блокчейн-решений Incrypto.
                        </Paragraph>
                        <Paragraph>
                            Существенным фактором финансовой устойчивости платформы является дополнительный доход от
                            комиссии за сделки в онлайн-казино на блокчейн.
                        </Paragraph>
                    </div>
                </div>
            </div>
            <Footer isOnExchange />
            <Meta page='risks' />
        </div>
    ) : (
        <div className='index-page-container'>
            <Header isOnExchange isOnMain />
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-lg-10 col-md-11">
                        <Title>What about risks?</Title>
                        <Paragraph>
                            Sadly, there’s a huge amount of cryptocurrency projects aimed at deceiving clients. Users
                            are attracted with vain promises of high profit. The basic profit-making model stays hidden
                            from clients, and all financial deposits and withdrawals are controlled by one person or a
                            group of people. A fraud is possible if a scammer gets access to money. Otherwise, there’s
                            no point in tricky actions. In GetETH project, no one can get access to users’ funds. The
                            smart contract will continue running regardless of one’s intentions, even if it’s the owner
                            of the smart contract.
                        </Paragraph>
                        <Paragraph>
                            Thanks to smart contract technology, investments are protected due to fair commission
                            distribution, and the amount of user’s passive income depends on the number of purchased
                            tokens. The scheme was approved during the{' '}
                            <a style={{ color: '#0081FF' }} href={ links.incryptoPDF } target="_blank" rel='noopener noreferrer'>
                                independent test{' '}
                            </a>{' '}
                            performed by Incrypto, the professional blockchain solution developer.
                        </Paragraph>
                    </div>
                </div>
            </div>
            <Footer isOnExchange />
            <Meta page='risks' />
        </div>
    );
};

export default connect(state => ({
    lang: state.lang,
}))(Fraud);

const Title = styled.h1`
    text-align: center;
    font-weight: bold;
`;

const Paragraph = styled.p`
    &:last-child {
        margin-bottom: 80px;
    }
`;
