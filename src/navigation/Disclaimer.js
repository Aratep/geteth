import React from 'react';
import {connect} from 'react-redux';
import Meta from "../components/Meta";


const padding = 50;

const disclaimer = ({lang}) => {
    return (
        <div
            className="disclaimer"
            style={{
                width: '100%',
                background: '#fff',
                color: '#000',
                fontWeight: 400,
                padding: '40px 0'
            }}
        >
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 offset-lg-1">
                        <p style={{textDecoration: 'underline'}}>
                            <span style={{marginLeft: padding}} /> DISCLAIMER
                        </p>
                        <p style={{margin: 0}}>
                            <span style={{marginLeft: padding}} />
                            This is not a call to action! Any kind of participation in this
                            exchange of tokens is invalid if prohibited by law. This document
                            has been written for information only and doesn’t impose any
                            juridical obligations on the authors or any third party. GETETH
                            Operator project doesn’t make any declarations (explicit or
                            implicit) and doesn’t bear responsibility for using information
                            included in the document. Information in the document has been
                            included in the document for guidance only and doesn't form
                            recommendation for investments. Users of this document should act
                            on their own opinion and should be cautious prior to act, or
                            refrain from actions based on this document. The content of the
                            document can be updated or changed. The actual version of the
                            document can be found at GETETH Operator.io
                        </p>
                        <p style={{margin: 0}}>
                            <span style={{marginLeft: padding}} />
                            GETETH Operator waives any financial liability for any direct or
                            indirect loss incurred by the purchaser of tokens in connection
                            with his own incorrect expectations based on information obtained
                            from this document, as well as other documents related to the
                            token sale.
                        </p>
                        <p style={{margin: 0}}>
                            <span style={{marginLeft: padding}} />
                            Since GETETH tokens are based on the Etherium protocol, any
                            malfunctions, breakages, errors in the code, and failures of the
                            Etherium protocol may significantly and negatively impact on the
                            GETETH token. GETETH Operator disclaims any liability with regard
                            to such errors and malfunctions in the Etherium protocol.
                        </p>
                        <p style={{margin: 0}}>
                            <span style={{marginLeft: padding}} />A personal key or a
                            combination of personal keys are is necessary for accessing and
                            disposition of GETETH tokens in the User Account, the wallet
                            (account) or the centralized repository. The loss of a personal
                            key connected to the User Account, the wallet, or the repository
                            containing the GETETH tokens, due to loss or theft, will result
                            the loss of GETETH tokens. In such event, any third party who
                            obtained a personal key will get the access to the User Account,
                            wallet or repository and get the opportunity to unlawfully seize
                            GETETH tokens. GETETH Operator is released from any responsibility
                            for the loss/theft of the personal key, regardless the fault of
                            the token holder.
                        </p>
                        <p style={{margin: 0}}>
                            <span style={{marginLeft: padding}} />
                            INFORMATION PRESENTED ON THIS WEB SITE FOR INFORMATION PURPOSES
                            ONLY. IT IS NOT A RECOMMENDATION, ADVICE, OFFER, OR SOLLICITATION
                            TO BUY OR SELL A PRODUCT OR SERVICE NOR AN OFFICIAL CONFIRMATION
                            OF ANY TRANSACTION. IT IS DIRECTED AT PERSONS WHO ARE
                            PROFESSIONALS AND IS NOT INTENDED FOR RETAIL CUSTOMER USE.
                        </p>
                        <p style={{margin: 0}}>
                            <span style={{marginLeft: padding}} />
                            PLEASE READ THIS DISCLAIMER SECTION CAREFULLY. IF YOU ARE IN ANY
                            DOUBT AS TO THE ACTION YOU SHOULD CONSULT YOUR LEGAL, FINANCIAL,
                            TAX, OR OTHER PROFESSIONAL ADVISOR(S). The information set forth
                            below may not be exhaustive and does not imply any elements of a
                            contractual relationship. While we make every effort to ensure
                            that any material on this web site is accurate and up to date,
                            such material in no way constitutes the provision of professional
                            advice does not guarantee, and accepts no legal liability
                            whatsoever arising from or connected to, the accuracy,
                            reliability, currency, or completeness of any material contained
                            on this web site.
                        </p>
                        <p style={{margin: 0}}>
                            <span style={{marginLeft: padding}} />
                            Investors and potential GETETH holders should seek appropriate
                            independent professional advice prior to relying on, or entering
                            into any commitment or transaction based on, material published on
                            this web site, which is purely published for reference purposes
                            only GETETH will not be intended to constitute securities in any
                            jurisdiction on this web site does not constitute a prospectus or
                            offer document of any sort and is not intended to constitute an
                            offer of securities or a solicitation for investment in securities
                            in any jurisdiction GETETH does not provide any opinion on any
                            advice to purchase, sell, or otherwise transact with GETETH and
                            the fact of presentation of this web site shall not form the basis
                            of, or be relied upon in connection with, any contract or
                            investment decision.
                        </p>
                        <p style={{margin: 0}}>
                            <span style={{marginLeft: padding}} />
                            No person is bound to enter into any contract or binding legal
                            commitment in relation to the sale and purchase of GETETH, and no
                            fiat currency or other form of payment is to be accepted on the
                            basis of this web site.
                        </p>
                        <p style={{margin: 0}}>
                            <span style={{marginLeft: padding}} />
                            This web site is for information purposes only. We do not
                            guarantee the accuracy of or the conclusions reached on this web
                            site, and does not make and expressly disclaims all
                            representations and warranties, express, implied, statutory or
                            otherwise, what so ever, including, but not limited to warranties
                            of merchantability, fitness for a particular purpose, suitability,
                            usage, title or non-infringement the contents of this web site are
                            free from and that such contents will not infringe third party
                            rights and its affiliates shall have no liability for damages of
                            any kind arising out of the use, reference to, or reliance on this
                            web site or any of the content contained herein, even if advised
                            of the possibility of such damages.
                        </p>
                        <p style={{margin: 0}}>
                            <span style={{marginLeft: padding}} />
                            In no event will GETETH investors, platform users and members or
                            its affiliates be liable to any person or entity for any damages,
                            losses, liabilities, costs or expenses of any kind, whether direct
                            or indirect, compensatory, incidental, actual, exemplary, punitive
                            or special for the use of, reference to, or reliance on this web
                            site or any of the content contained herein, including, without
                            limitation, any loss of business, revenues, profits, data, use,
                            goodwill or other intangible losses GETETH makes no
                            representations or warranties whether express or implied, and
                            disclaims all liability arising from any information stated in the
                            web site.
                        </p>
                        <p style={{margin: 0}}>
                            <span style={{marginLeft: padding}} />
                            Please note that contents of this web site may be altered or
                            updated at any time in future by the project’s management team.
                            The information content has been prepared solely in respect of
                            GETETH offering are being offered in any jurisdiction pursuant
                            does not constitute an offer or invitation to any person to
                            subscribe for or purchase shares, rights are not being presently
                            offered to be registered under securities act of any country, or
                            under any securities laws of any state
                        </p>
                        <p style={{margin: 0}}>
                            <span style={{marginLeft: padding}} />
                            The tokens referred to on this web site not been registered,
                            approved, or disapproved by the 86 securities and (exchange &
                            commission, any state securities commission in the United States
                            or any other regulatory authority, nor any of the foregoing
                            authorities examined or approved the characteristics or the
                            economic realities of this token sale or the accuracy or the
                            adequacy of the information and Exchange Commission, any state
                            securities commission in the United States or any other regulatory
                            authority, nor any of the foregoing authorities examined or
                            approved the characteristics or the economic realities of this
                            token sale or the accuracy or the adequacy of the information
                            contained on this web site under the US Securities Act of 1933 as
                            amended, or under the securities laws of any state of the United
                            States of America or any other jurisdiction.
                        </p>
                        <p style={{margin: 0}}>
                            <span style={{marginLeft: padding}} />
                            Purchasers of the tokens referred to this web site should be aware
                            that they bear any risks involved in acquisition of GETETH, if
                            any, for an indefinite period of time some of the statements on
                            the web site include forward looking statements which reflect
                            current views with respect to product development, execution
                            roadmap, financial performance, business strategy and future
                            plans, both with respect to the company and the sectors and
                            industries in which the company operates. Statements which include
                            the words ''expects'', ''intends'', ''plans'', ''believes'',
                            ''projects'', ''anticipates'', ''will'', ''targets'', ''aims'',
                            ''may'', ''would'', ''could'', ''continue'' and similar are of a
                            future or forward-looking nature. All forward-looking statements
                            address matters that involve risks and uncertainties. Accordingly,
                            there are or will be important factors that could cause the
                            group’s actual results to differ materially from those indicated
                            in these statements any forward looking statements on this web
                            site reflect the company s current views with respect to future
                            events and are subject to these and other risks, uncertainties and
                            assumptions relating to the Company's operations, results of
                            operations and growth strategy. These forward-looking statements
                            are made only as of the date of the web site. Subject to industry
                            acceptable disclosure and transparency rules and common practices,
                            the company undertakes no obligation publicly to update or review
                            any forward-looking statement, whether as result of new
                            information, future developments or otherwise. All subsequent
                            written and oral forward looking statements attributable to the
                            GETETH or individuals acting on behalf of GETETH are expressly
                            qualified in their entirety by this paragraph statement on the web
                            site is intended as a profit forecast and no statement on the web
                            site should be interpreted to mean that the earnings of GETETH for
                            the current or future years would be as may be implied on this web
                            site. By agreeing to acquire GETETH the reader hereby acknowledges
                            that he/she has read and understand the notices and disclaimers
                            set out above and contained in this Whitepaper. No regulatory
                            authority has examined or approved any of the information set out
                            in this Whitepaper. Thus, no action has been or will be taken
                            under the laws, regulatory requirements or rules of any
                            jurisdiction. The publication, distribution or dissemination of
                            this Whitepaper does not imply that the applicable laws,
                            regulatory requirements or rules have been complied with. Please
                            refer to our website for terms conditions of participating on the
                            GETETH.
                        </p>
                        <p style={{textDecoration: 'underline'}}>
                            <span style={{marginLeft: padding}} />
                            TOKEN DESCRIPTION
                        </p>
                        <p style={{margin: 0}}>
                            <span style={{marginLeft: padding}} />
                            Tokens GETETH are released in ecosystem on blockchain Etherium and
                            represent a digital asset transferred under smart-contract based
                            on ERC20 standard.
                        </p>
                        <p style={{margin: 0}}>
                            <span style={{marginLeft: padding}} />
                            GETETH tokens that are offered for purchase during the token sale
                            are not securities and not meant for trading on the securities
                            market and stock exchanges.
                        </p>
                        <p style={{margin: 0}}>
                            <span style={{marginLeft: padding}} />
                            GETETH do not represent a loan to anyone. GETETH are neither debt
                            obligations nor bonds in any form.
                        </p>
                        <p style={{margin: 0}}>
                            <span style={{marginLeft: padding}} />
                            Acquisition of GETETH tokens through participation in token sale
                            or in secondary market does not provide token holders with any
                            rights to receive financial or any other assets of GETETH or any
                            other third party.
                        </p>
                        <p style={{margin: 0}}>
                            <span style={{marginLeft: padding}} />
                            GETETH Tokens do not provide with the rights in respect to share
                            in capital of GETETH Operator or any other third party, or its
                            property, the guarantee to receive of dividends, the distribution
                            of revenues or granting of voting rights arising from such
                            participation.{' '}
                        </p>
                        <p style={{margin: 0}}>
                            <span style={{marginLeft: padding}} />
                            Acquisition of GETETH tokens does not represent the exchange of
                            digital assets to any form of participation in GETETH Operator or
                            any other third party or to stake in its property and assets,
                            including intellectual property.{' '}
                        </p>{' '}
                        <p style={{textDecoration: 'underline'}}>
                            <span style={{marginLeft: padding}} />
                            LEGAL ASPECTS
                        </p>
                        <p style={{margin: 0}}>
                            <span style={{marginLeft: padding}} />
                            Cryptographic tokens GETETH are not securities in any jurisdiction
                            in the world. The present document, describing the token, is not a
                            financial prospectus within the meaning defined by the legislation
                            on securities and futures.
                        </p>
                        <p style={{margin: 0}}>
                            <span style={{marginLeft: padding}} />
                            This document and any other document or material issued in
                            connection with the token sale is exclusively intended for the
                            confidential use of those to whom this document is made available
                            and can not be reproduced, disclosed to any third party or used
                            for any other purpose without the prior written permission of
                            GETETH Operator. Each potential buyer of GETETH tokens, reading
                            this document, agrees not to make copies or to disclose the
                            contents of this document to any third party.
                        </p>
                        <ul>
                            <li>
                                will keep information and data contained herein confidential;
                            </li>
                            <li>
                                received this document and / or acquired tokens GETETH
                                Operator.io legally according to all jurisdictions he/she is
                                subject to without attempting to circumvent any restrictions on
                                the realization of tokens to citizens and residents of countries
                                where such actions are prohibited or restricted;
                            </li>
                            <li>
                                complies with all applicable laws of the country of residence or
                                actual location with respect to the acquisition of tokens;
                            </li>
                            <li>
                                acquires GETETH tokens for personal use only, not for third
                                parties;
                            </li>
                            <li>
                                accepts and confirms that the tokens acquired shall not be
                                interpreted, classified or treated as currency, equities,
                                shares, options or derivative instruments relating to such bonds
                                or shares.
                            </li>
                        </ul>
                        <p style={{textDecoration: 'underline'}}>
                            <span style={{marginLeft: padding}} />
                            COPYRIGHT
                        </p>
                        <p style={{margin: 0}}>
                            <span style={{marginLeft: padding}} />
                            All the rights for intellectual property created during the game
                            without any limitations belongs to GETETH Operator Such property
                            include names, images, concepts, ideas, inventions, constructions,
                            codes, insights, processes, marks, methods, software,
                            compositions, formulae and data, whether patented or not, whether
                            having trademarks and not having ones. Any kind of use of this
                            material without approval from developers is strictly prohibited.{' '}
                        </p>
                        <p style={{textDecoration: 'underline'}}>
                            <span style={{marginLeft: padding}} />
                            RISKS
                        </p>
                        <p style={{margin: 0}}>
                            <span style={{marginLeft: padding}} />
                            The team is not responsible for any losses related to issues with
                            GETETH Operator software. The team reserves the right to cancel
                            token distribution at any time. Development process of GETETH
                            Operator can be stopped for a variety of reasons, including
                            absence of interest at general public, absence of financial
                            sources, bankruptcy of the company, death of key developers etc.
                            Under no circumstances GETETH Operator or its affiliated parties
                            bear responsibility before any person or company for any kind of
                            losses, obligations, costs and expenses of any kind, whether they
                            are direct on indirect, compensation, accidental, actual,
                            exemplary, punitive or special for using links to or opening this
                            technical document, as well as for any content including but not
                            limited to loss of business, loss of profits, loss of data,
                            goodwill or any other intangible losses.
                        </p>
                    </div>
                </div>
            </div>
            <Meta page='disclaimer' />
        </div>
    );
};

export default connect(state => ({
    lang: state.lang
}))(disclaimer);
